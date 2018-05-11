/**
 * Created by LHammer on 18/05/06.
 * @description log message.
 */
const chalk = require('chalk')
const format = require('util').format

/**
 * Log a log `message` to the console.
 *
 * @param {String} message
 */
exports.log = (...args) => {
  const msg = format.apply(format, args)
  console.log(msg)
}

/**
 * Log a info `message` to the console.
 *
 * @param {String} message
 */
exports.info = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(`\n🔊`), msg)
}

/**
 * Log a warn `message` to the console.
 *
 * @param {String} message
 */
exports.warn = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.yellow(`\n🚨`), msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
exports.error = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.red(`\n💥 Error:`), msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console.
 *
 * @param {String} message
 */
exports.success = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.green(`\n🙌`), msg)
}