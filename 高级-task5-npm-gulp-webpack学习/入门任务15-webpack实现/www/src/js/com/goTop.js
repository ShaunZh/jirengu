/*
* @Author: Marte
* @Date:   2017-07-19 14:34:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-25 11:15:20
*/

'use strict';

//var $ = require('detached-jquery-1.9.1"');
//var $ = require('../lib/jquery-1-9-1.min.js');

const $ = require('jquery');
//import $ from 'jquery'

// const $ = require("expose-loader?$!jquery");
   function GoTop($btn){
    this.$btn = $btn;
    this.bindEvent();
  }

  GoTop.prototype.bindEvent = function(){

    this.$btn.on('click', function(e){
      $(document).scrollTop(0);
    });
  }

module.exports = GoTop;

