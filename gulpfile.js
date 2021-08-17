/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-17 16:39:58
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-17 16:43:10
 */
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify'); 

exports.default = function() {
  return src('build/src/*/*.js')
    // gulp-uglify 插件并不改变文件名
    .pipe(uglify()) 
    .pipe(dest('output/'));
}