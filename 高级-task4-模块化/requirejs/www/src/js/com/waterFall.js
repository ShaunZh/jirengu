/*
* @Author: Marte
* @Date:   2017-07-18 16:51:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 16:42:36
*/

'use strict';

define(['jquery'], function($){

  var WaterFall = (function(){

    function _WaterFall($ct){
      this.$ct = $ct;
      this.$picCt = $ct.find('.pic-ct');
      this.$loadMoreBtn = $ct.find('.load-more-btn');
      this.colHeightArr = [];
      this.pageIndex = 0;

      this.init();
      this.bindEvent();
    }

    _WaterFall.prototype.insertNode = function($node){
      this.$picCt.append($node);
    }

    _WaterFall.prototype.getNode = function(item){
      var node = '';
      node = '<li class="img-item">' +
              '<a href="' + item.url + '" class="link">' +
                '<img src="' + item.img_url + '" alt=""> ' +
              '</a>' +
              '<h4 class="header">' + item.short_name + '</h4>' +
              '<p class="desp">' + item.short_intro + '</p></li>';
      // 将node节点返回为jq对象
      return $(node);
    }


    _WaterFall.prototype.render = function(msgs){
      var _this = this;
      $.each(msgs, function(index, msg){
        var $node = _this.getNode(msg);
        $node.find('img').load(function(){
          _this.insertNode($node);
          _this.pinterestLayout($node);
        })
      })
    }




    _WaterFall.prototype.pinterestLayout = function($node){
      var minColHeight = Math.min.apply(null, this.colHeightArr),
          minColHeightIndex = this.colHeightArr.indexOf(minColHeight);

      $node.css({
        left: minColHeightIndex * this.imgItemWidth,
        top: minColHeight,
        opacity: 1
      });

      this.colHeightArr[minColHeightIndex] += $node.outerHeight(true);
      this.$picCt.height(Math.max.apply(null, this.colHeightArr));
    }

    _WaterFall.prototype.getData = function(callback){
      var _this = this;

      $.ajax({
        url: 'http://platform.sina.com.cn/slide/album_tech',
        dataType: 'jsonp',
        jsonp:"jsoncallback",
        data: {
          app_key: '1271687855',
          num: 9,
          page: this.pageIndex
        }
      }).done(function(ret){

        if(ret && ret.status && ret.status.code === "0"){
          (callback.bind(_this))(ret.data);
          _this.pageIndex++;

        }else{
          console.log('get error data');
        }
      });
    }



    _WaterFall.prototype.init = function(){

      this.imgItemWidth = this.$ct.find('.img-item').outerWidth(true);
      this.colNum = parseInt(Math.floor(this.$ct.width() / this.imgItemWidth));
      console.log(this.$ct.width());
      console.log(this.imgItemWidth);
      for (var i = 0; i < this.colNum; i++){
        this.colHeightArr[i] = 0;
      }

      this.getData(this.render);

    }


    _WaterFall.prototype.bindEvent = function(){
      var _this = this;
      this.$loadMoreBtn.on('click', function(e){
        var target = e.target;
        _this.getData(_this.render);
      })
    }




    return {
      init: function($ct){
        $.each($ct, function(index, node){
          new _WaterFall($(node));
        })

      }
    };
  })();
  return WaterFall;
});