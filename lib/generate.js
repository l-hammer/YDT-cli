/**
 * Created by LHammer on 18/05/07.
 * @description generate project template.
 */
const Metalsmith = require('metalsmith') // 批量处理模板
const Handlebars = require('handlebars')
const chalk = require('chalk') // 终端打印信息美化
const getOptions = require('../lib/options')
const logger = require('../lib/logger')
const ask = require('../lib/ask')

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
 * 
 * @param {String} name e.g: test
 * @param {String} src e.g: /Users/lhammer/.YDTemplates/YDTemplate
 */
module.exports = function generate (name, src, dest, done) {
  const opts = getOptions(name, src) // 获取模板meta配置
  const metalsmith = Metalsmith(src)
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: dest,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  metalsmith.use(askQuestions(opts.prompts))

  metalsmith.clean(false)
    .source('.')
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