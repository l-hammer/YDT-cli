const chalk = require('chalk')

exports.info = (msg) => {
  console.log(chalk.yellow(`\n 🔊 ${msg}\n`))
}

exports.error = (msg) => {
  console.log(chalk.red(`\n 💥 Error:${msg}\n`))
}

exports.success = (msg) => {
  console.log(chalk.green(`\n ✅ ${msg}\n`))
}