/*
* @Author: Marte
* @Date:   2017-07-18 16:54:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 10:18:14
*/

'use strict';
define(['jquery'], function($){


  var Carousel =  (function(){
    // var $ = require(['jquery']);
    function _Carousel(ct){
      this.$ct = $(ct);
      this.init();
      this.bind();
      this.autoPlay();
    }

    _Carousel.prototype.init = function(){
      this.$imgs = $('.carousel__img-wrap li'),
      this.imgWidth = $('.carousel__img-wrap img').eq(0).width(),
      this.$imgWrap = $('.carousel__img-wrap').eq(0),
      this.pageIndex = 0,
      this.$next = $('.carousel--play-next'),
      this.$pre = $('.carousel--play-pre'),
      this.$index = $('.carousel__display-index li'),
      this.isCompleteAnimate = true,
      this.carouselIntervalId = 0;
    }

    _Carousel.prototype.bind = function(){
      var _this = this;

      this.$ct.on('click', function(e){
        var target = e.target;
        clearInterval(_this.carouselIntervalId);
        if (target === _this.$next.get(0)) {

          _this.playNext();
          _this.autoPlay();

        } else if (target === _this.$pre.get(0)) {

          _this.playPre();
          _this.autoPlay();

        } else if (_this.$index.index($(target)) >= 0) {
          _this.play(_this.$index.index($(target)));
          _this.autoPlay();

        } else{

        }
      });
    }

     _Carousel.prototype.autoPlay = function(){
      var _this = this;
      this.carouselIntervalId = setInterval(function(){
        _this.playNext();
      }, 2000);
    }

    _Carousel.prototype.dispIndex = function(index){
      this.$index.removeClass('active').eq(index).addClass('active');
    }

    _Carousel.prototype.playPre = function(){
      this.play(((this.pageIndex?this.pageIndex:this.$imgs.length) - 1));
    }

    _Carousel.prototype.playNext = function(){
      this.play((this.pageIndex + 1)%this.$imgs.length);
    }

    _Carousel.prototype.play = function(index){
      var _this = this;
      if (!this.isCompleteAnimate) {
        return ;
      }
      this.isCompleteAnimate = false;
      this.$imgs.eq(this.pageIndex).fadeOut('1000');
      this.$imgs.eq(index).fadeIn('1000', function() {
            _this.isCompleteAnimate = true;
      });

      this.pageIndex = index;
      this.dispIndex(this.pageIndex);
    }

    return {
        init: function($ct){
          $.each($ct, function(){
          new _Carousel($(this));
        });
      }
    }
  })();

  return Carousel;
});

