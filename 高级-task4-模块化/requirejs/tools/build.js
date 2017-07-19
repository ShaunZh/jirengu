/*
* @Author: Marte
* @Date:   2017-07-19 15:15:06
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 16:46:28
*/

({
  // 这里使用的baseUrl 而不是 base，
  // 要将这个路径对应到main.js 的 requirejs.config 中base 的路径下
  baseUrl: '../www/src/js',
  paths:{
    // 这里的路径是相对于baseUrl的
    jquery: 'lib/jquery-1-9-1.min',
  },
  name: 'main',
  out: '../www/dist/js/index.merge.min.js'
})