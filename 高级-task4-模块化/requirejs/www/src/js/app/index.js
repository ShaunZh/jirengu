/*
* @Author: Marte
* @Date:   2017-07-18 17:15:50
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 15:00:30
*/


define(['jquery', 'com/carousel', 'com/waterFall', 'com/goTop'], function($, Carousel, WaterFall, goTop){
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

  })
});