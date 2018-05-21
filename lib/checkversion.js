/**
 * Created by LHammer on 18/05/19.
 * @description check version of node and ydt-cli.
 */
const semver = require('semver'); // 版本比较
const request = require('request'); // 发送http请求
const updateNotifier = require('update-notifier'); // 升级通知
const logger = require('../lib/logger');
const packageConfig = require('../package.json');

module.exports = done => {
  const requiredVersion = packageConfig.engines.node;

  if (!semver.satisfies(process.version, requiredVersion)) {
    logger.error(
      `You are using Node ${process.version}, but this version of ydt-cli ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
    )
    process.exit(1)
  }

  request({
    url: 'https://registry.npmjs.org/ydt-cli',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        updateNotifier({
          pkg: {
            name: 'ydt-cli',
            version: latestVersion
          },
          updateCheckInterval: 0
        }).notify({
          isGlobal: true,
          shouldNotifyInNpmScript: true,
          message: 'A newer version of ydt-cli is available.'
        });
      }
    }
    done()
  })
}