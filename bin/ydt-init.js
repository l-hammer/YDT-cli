
const logger = require('../lib/logger')
const download = require('download-git-repo')
const inquirer = require('inquirer')

// download('l-hammer/YDTemplate', 'test/tmp', (err) => {
//   err ? logger.error(error) : logger.success('success');
// })

const prompts = [
  {
    type: "string",
    name: "YDTemplate",
    message: "Project name",
    default: "YDTemplate"
  },
  {
    type: "string",
    name: "description",
    message: "Project description",
    default: "A YDTemplate project"
  },
  {
    type: "string",
    name: "author",
    message: "Project description",
    default: "LHammer"
  },
  {
    type: "list",
    name: "type",
    message: "Project type",
    choices: ['wx', 'h5', 'web'],
    default: 'wx'
  },
  {
    type: "string",
    name: "proxyUser",
    message: "Proxy springboard username",
    default: 'songhw'
  },
  {
    type: "string",
    name: "serverPort",
    message: "Proxy server port",
    default: '38'
  },
]

const projectName = program.args[0]
const tmp = './' + projectName

module.exports = () => {
  inquirer.prompt(prompts).then((answers) => {
    console.log(answers)

    download('l-hammer/YDTemplate', tmp, (err) => {
      err ? logger.error(error) : logger.success('success');
    })
  })
}
