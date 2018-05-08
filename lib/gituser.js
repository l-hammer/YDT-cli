/**
 * 获取当前git配置的用户信息
 */
const exec = require('child_process').execSync

module.exports = () => {
  let name

  try {
    name = exec('git config --get user.name')
  } catch (error) {
    console.log(error)
  }

  name = name && JSON.stringify(name.toString().trim(), null, 2).slice(1, -1)
  return name || ''
}