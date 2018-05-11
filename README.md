# YDT-cli 
[![Build status](https://ci.appveyor.com/api/projects/status/u2i8y2jadt0ep6e1/branch/master?svg=true)](https://ci.appveyor.com/project/l-hammer/ydt-cli/branch/master)
[![npm](https://img.shields.io/npm/v/ydt-cli.svg?style=flat&colorB=brightgreen)](https://www.npmjs.com/package/ydt-cli)

A simple CLI for scaffolding YDTemplate projects.

## Installation

Prerequisites: Node.js (>=8.x, 10.x preferred), npm version 5+ and [Git](https://git-scm.com/).

```bash
$ npm install -g ydt-cli
```

## Usage

```bash
$ ydt -h
$ ydt list
$ ydt init -h
$ ydt init <template-name> <project-name>
$ ydt init <template-name> <project-name> --offline
```

<div align="center"><img src="static/command.jpeg" width="100%" align="center"/></div>

#### Example:

```bash
$ ydt list
```

list available official templates

<div align="center"><img src="static/templates.jpeg" width="100%" align="center"/></div>

```bash
$ ydt init YDTemplate my-project
```

The above command pulls the template from [l-hammer/YDTemplate](https://github.com/l-hammer/YDTemplate), prompts for some information, and generates the project at `./my-project/`.

<div align="center"><img src="static/generate.jpeg" width="100%" align="center"/></div>

```bash
$ ydt init YDTemplate my-project --offline
```

The above command pulls the template from local cached template([$HOME](https://www.npmjs.com/package/user-home)/.YDTemplates/YDTemplate), prompts for some information, and generates the project at `./my-project/`.

<div align="center"><img src="static/generatefromcache.jpeg" width="100%" align="center"/></div>

## Templates

> * [YDTemplate](https://github.com/l-hammer/YDTemplate) - A Flexible Template of Parcel + Vue/jQuery + Hot-reload + Node proxy/Mock data.

## Custom Templates

It's unlikely to make everyone happy with the official templates. You can simply fork an unofficial template and then use it via ydt-cli with:

```bash
$ ydt init username/<custom template> <project-name>
```

## Local Templates

Instead of a GitHub repo, you can also use a template on your local file system:

```bash
$ ydt init ~/path/<custom template> <project-name>
```

## Contributing ![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?longCache=true&style=flat-square)

- :fork_and_knife:Fork it!
- :twisted_rightwards_arrows:Create your branch: `git checkout -b my-new-feature`
- :wrench:Make your changes
- :memo:Commit your changes: `git commit -am 'Add some feature'`
- :rocket:Push to the branch: `git push origin my-new-feature`
- :tada:Submit a pull request

or submit an [issue](https://github.com/l-hammer/You-need-to-know-css/issues) - any helpful suggestions are welcomed. :stuck_out_tongue_winking_eye:

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fl-hammer%2FYDT-cli.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Fl-hammer%2FYDT-cli?ref=badge_small)

[MIT](https://github.com/l-hammer/You-need-to-know-css/blob/master/LICENSE) © 2018 LHammer