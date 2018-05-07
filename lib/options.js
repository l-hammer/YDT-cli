/**
 * Created by LHammer on 18/05/06.
 * @description 获取模板meta.json信息.
 */
const path = require('path')
const exists = require('fs').existsSync
const metadata = require('read-metadata')

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
    const req = require(path.resolve(js))
    opts = req
  }
  return opts
}

module.exports = function options(name, dir) {
  const opts = getMetadata(dir)

  return opts
}
