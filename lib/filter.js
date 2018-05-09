/**
 * Created by LHammer on 18/05/09.
 * @description 过滤不必要的文件.
 */
const match = require('minimatch') // glob匹配

/**
 * 在data的作用域中执行exp表达式并返回其执行得到的值
 * 
 * @param {*} exp filter中文件相应的表达式
 * @param {*} data
 * @return {Boolean}
 */
function evaluate (exp, data) {
  const fn = new Function('data', 'with (data) { return '+ exp +'}')

  return fn(data)
}

/**
 * filter ignore files
 * 
 * @param {*} files 所有文件
 * @param {*} filters 忽略文件
 * @param {*} data 
 * @param {*} done 交于下一个metalsmith插件处理
 */
module.exports = (files, filters, data, done) => {
  if (!filters) return done()

  const fileNames = Object.keys(files)
  
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob]
        // condition条件不成立，则移除
        if (!evaluate(condition, data)) {
          delete files[file]
        }
      }
    })
  })
  done()
}