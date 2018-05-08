/**
 * Created by LHammer on 18/05/06.
 * @description 获取模板meta.json信息.
 */
const path = require('path')
const exists = require('fs').existsSync
const getGitUser = require('../lib/gituser')

/**
 * Gets the metadata from either a meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */
function getMetadata(dir) {
  let opts = {}
  const js = path.join(dir, 'configs/meta.js')

  if(exists(js)) {
    opts = require(path.resolve(js))
  }

  return opts
}

/**
 * Set a default value for a prompt question.
 *
 * @param  {Object} opts
 * @param  {String} key
 * @param  {String} val
 */
function setDefault(opts, key, val) {
  const prompts = opts.prompts || (opts.prompts = {})

  if (prompts[key]) {
    prompts[key].default = val
  }
}

/**
 * export metadata for a prompt question
 * 
 * @param {*} name 项目名称
 * @param {*} dir 本地模板路径 '/Users/lhammer/.YDTemplates/l-hammer-YDTemplate'
 */
module.exports = function options(name, dir) {
  const opts = getMetadata(dir)
  const author = getGitUser()

  setDefault(opts, 'name', name)
  if(author) {
    setDefault(opts, 'author', author)
  }

  return opts
}