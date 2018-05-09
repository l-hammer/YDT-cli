/**
 * Created by LHammer on 18/05/08.
 * @description 终端命令交互.
 */
const async = require('async') // 异步处理
const inquirer = require('inquirer') // 交互式命令行

/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */
module.exports = (prompts, data, done) => {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next)
  }, done)
}

function prompt (data, key, prompt, done) {
  inquirer.prompt([{
    type: prompt.type,
    name: key,
    message: prompt.message,
    default: prompt.default,
    choices: prompt.choices || []
  }]).then(answers => {
    const answer = answers[key]
    if (answer && typeof answer === 'string') {
      data[key] = answer
    }
    done()
  }).catch(done)
}