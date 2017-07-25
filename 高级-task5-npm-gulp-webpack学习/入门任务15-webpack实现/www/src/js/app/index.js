/*
* @Author: Marte
* @Date:   2017-07-18 17:15:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-25 11:15:18
*/
 var $ = require("jquery");

//import $ from "jquery"

// const $ = require("expose-loader?$!jquery");
var Carousel = require('../com/carousel.js'),
    WaterFall = require('../com/waterFall.js'),
    goTop = require('../com/goTop.js');

function app(){

  var $header = $('header');
  var pannerHeight = $('.banner').height() - 100;

  new goTop($('.go-top-btn'));
  Carousel.init($('.carousel'));
  WaterFall.init($('.water-fall'));

  $(document).on('scroll', function(e){
    if ($(document).scrollTop() >= pannerHeight)
    {
      if (!$header.hasClass('active-header-tab')){
        $header.addClass('active-header-tab');
      }
    } else{
      if ($header.hasClass('active-header-tab')){
        $header.removeClass('active-header-tab');
      }
    }

  });
}

app();