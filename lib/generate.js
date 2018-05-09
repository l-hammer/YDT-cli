/**
 * Created by LHammer on 18/05/07.
 * @description generate project template.
 */
const Metalsmith = require('metalsmith') // 批量处理模板
const Handlebars = require('handlebars') // Mustache风格的模板引擎:{{foo}}
const chalk = require('chalk') // 终端打印信息美化
const getOptions = require('../lib/options')
const logger = require('./logger')
const ask = require('./ask')
const filter = require('./filter')

/**
 * register handlebars helper
 */
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
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
 * @param {Object} prompts
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
 * @param {Object} filters
 * @return {Function}
 */
function filterFiles (filters) {
  return (files, metalsmith, done) => {
    filter(files, filters, metalsmith.metadata(), done)
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