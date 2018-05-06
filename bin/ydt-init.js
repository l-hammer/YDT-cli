const path = require('path');
const program = require('commander')
const logger = require('../lib/logger')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const fs = require('fs')
const ini = require('ini')

const prompts = [
  {
    type: "string",
    name: "name",
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

const template = 'l-hammer/YDTemplate'
const projectName = program.args[0]
const tmp = './' + projectName
const to = path.resolve(projectName)

prompts[0].default = projectName

function initPackage (dir, answers) {
  const file = path.join(dir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(file, 'utf-8'))

  pkg.name = answers.name
  pkg.description = answers.description
  pkg.author = answers.author

  fs.writeFileSync(file, JSON.stringify(pkg, null, 2))
}

function initConfig (dir, answers) {
  const file = path.join(dir, 'configs/init.ini')
  const config = ini.parse(fs.readFileSync(file, 'utf-8'))

  config.type = answers.type
  config.proxyUser = answers.proxyUser
  config.serverPort = answers.serverPort

  fs.writeFileSync(file, ini.stringify(config, { section: 'section' }))
}

function initProject(src, answers) {
  initPackage(src, answers)
  initConfig(src, answers)
}

module.exports = () => {
  // 是否存在相同(同名)的模板
  if (fs.existsSync(to)) {
    inquirer.prompt([{
      type: 'comfirm',
      name: 'yes',
      message: 'Target directory exists. Continue?',
      default: 'yes'
    }]).then(answers => {
      if (answers.yes) initProject(tmp, answers);
    })
  } else {
    inquirer.prompt(prompts).then((answers) => {
      download(template, tmp, false, (err) => {
        if (err) logger.error('Failed to download repo ' + template + ': ' + err)
        initProject(tmp, answers);
      })
    })
  }
}
