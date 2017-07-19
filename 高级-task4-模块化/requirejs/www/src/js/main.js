/*
* @Author: Marte
* @Date:   2017-07-17 10:02:04
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 16:46:38
*/

// 'use strict';
requirejs.config({
  // 这是使用 base 而不是 baseUrl
  base: '../src/js',
  paths: {
    jquery: 'lib/jquery-1-9-1.min',
  }
});

// 请求index模块
requirejs(['app/index']);

