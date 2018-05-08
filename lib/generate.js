/**
 * Created by LHammer on 18/05/07.
 * @description generate project template.
 */
const getOptions = require('../lib/options')
const logger = require('../lib/logger')

module.exports = function generate (name, src) {
  const opts = getOptions(name, src)
  console.log(name)
  console.log(opts)
  console.log(src)
  logger.success('Generated "%s".', name)
}
