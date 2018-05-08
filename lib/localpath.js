const path = require('path')

module.exports = {
  /**
   * 本地是否在存在当前模板
   * 
   * @returns {Boolean}
   */
  isLocalPath (templatePath) {
    return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
  },
  /**
   * 获取模板绝对路径
   * 
   * @method path.isAbsolute() 检测templatePath是否为绝对路径
   * @returns {String}
   */
  getTemplatePath (templatePath) {
    return path.isAbsolute(templatePath)
      ? templatePath
      : path.normalize(path.join(process.cwd(), templatePath))
  }
}