#!/usr/bin/env node

const program = require('commander')
const package = require('../package')

program.version(package.version)

program
  .command('init')
  .description('generate a new project from a YDTemplate')
  .alias('-i')
  .action(() => {
    require('./ydt-init')()
  })

program.parse(process.argv);

if(!program.args.length){
  program.help()
}