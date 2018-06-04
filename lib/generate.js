/**
 * Created by LHammer on 18/05/07.
 * @description generate project template.
 */
const Metalsmith = require('metalsmith') // 批量处理模板
const Handlebars = require('handlebars') // Mustache风格的模板引擎:{{foo}}
const render = require('consolidate').handlebars.render // 支持各种模板引擎的渲染
const chalk = require('chalk') // 终端打印信息美化
const async = require('async') // 强大的异步处理
const multimatch = require('multimatch') // 支持多个条件的匹配
const getOptions = require('../lib/options')
const logger = require('./logger')
const ask = require('./ask')
const filter = require('./filter')

/**
 * register handlebars helper
 */
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  const args = b.replace(/\s+/g, '').split(' || ');
  return args.indexOf(a) !== -1
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts meta.js中prompts对象
 * @return {Function}
 */
function askQuestions (prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters meta.js中filters对象
 * @return {Function}
 */
function filterFiles (filters) {
  return (files, metalsmith, done) => {
    filter(files, filters, metalsmith.metadata(), done)
  }
}

/**
 * Create a middleware for rename files.
 *
 * @param {Object} filters meta.js中filters对象
 * @return {Function}
 */
function renameTplFiles () {
  return (files, metalsmith, done) => {
    let tplFile, newTplFile
    const fileNames = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()

    if (metalsmithMetadata.type === 'web') {
      tplFile = 'src/web/template.tpl'
      newTplFile = `src/web/${metalsmithMetadata.name}.tpl`
    } else {
      tplFile = 'src/app/template/index.tpl'
      newTplFile = `src/app/template/${metalsmithMetadata.name}.tpl`
    }
    fileNames.forEach(file => {
      if (file === tplFile) {
        files[newTplFile] = files[file]
        delete files[file]
      }
    })
    done()
  }
}

/**
 * Create a middleware for render template files.
 *
 * @param {Object} metalsmith metalsmith对象
 */
function renderTemplateFiles (skipInterpolation) {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()

    async.each(keys, (file, next) => {
      if (skipInterpolation && multimatch([file], skipInterpolation, { dot: true }).length) {
        return next()
      }
      const str = files[file].contents.toString()
      // 跳过不符合handlebars语法的file
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }
      render(str, metalsmithMetadata, (err, res) => {
        if (err) {
          err.message = `[${file}] ${err.message}`
          return next(err)
        }
        files[file].contents = Buffer.from(res)
        next()
      })
    }, done)
  }
}

/**
 * Generate a template
 * 
 * @param {String} name e.g: test
 * @param {String} src e.g: /Users/lhammer/.YDTemplates/YDTemplate
 * @param {String} dest e.g: /Users/lhammer/work/yindou/test
 * @param {Function} done 交于下一个metalsmith插件处理
 */
module.exports = (name, src, dest, done) => {
  const opts = getOptions(name, src) // 获取模板meta配置
  const metalsmith = Metalsmith(src) // 初始化Metalsmith对象
  /**
   * 添加一些变量至metalsmith中
   * @property {Boolean} inPlace opts.complete判断是否在当前项目所在目录
   * @property {String} destDirName 项目所在在目录
   */
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: dest,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renameTplFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))

  metalsmith
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      }
    })

  return data
}