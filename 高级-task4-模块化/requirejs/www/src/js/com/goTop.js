/*
* @Author: Marte
* @Date:   2017-07-19 14:34:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-07-19 14:49:57
*/

'use strict';

define(['jquery'], function($){
  function GoTop($btn){
    this.$btn = $btn;
    this.bindEvent();
  }

  GoTop.prototype.bindEvent = function(){

    this.$btn.on('click', function(e){
      $(document).scrollTop(0);
    });
  }

  return GoTop;
});
