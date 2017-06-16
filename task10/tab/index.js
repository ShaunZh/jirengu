/*
* @Author: Marte
* @Date:   2017-06-16 21:28:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-16 21:29:54
*/

'use strict';
function getEvent(e){
  return e || window.event;
}

function getTarget(e){
  return e.target || e.srcElement;
}

function addEvent(node, type, handler){
  if (!node) {
    return false;
  } else if (node.addEventListener) {
    node.addEventListener(type, handler, false);
    return true;
  } else if (node.attatchEvent) {
    node['e' + type + handler] = handler;
    node[type + handler] = function() {
      node['e' + type + handler](window.event);
    };
    node.attachEvent('on' + type, node[type + handler]);
    return false;
  }
  return false;
}

function removeEvent(node, type, handler) {
  if (!node) {
    return false;
  } else if (node.removeEventListener) {
    node.removeEventListener(type, handler, false);
    return true;
  } else if (node.detachEvent) {
    node.detachEvent('on' + type, node[type + handler]);
    node[type + handler] = null;
    return true;
  }
  return false;
}


var nav = document.querySelector('.nav-tab');
var content = document.querySelector('.content');

addEvent(nav, 'click', function(e){
  var event = getEvent(e),
      target = getTarget(event);

  //判断目标对象是否为li元素
  if (target.tagName.toLowerCase() === 'li') {
    var navStr = target.className.toLowerCase().match(/\bnav\d+\b/);
    //判断目标对象是否包含有名为 nav 的类值
    if (navStr.length > 0) {
        // 获得nav的编号
        var navNumber = navStr[0].substr(3);
        // 根据编号，查看是否有对应的内容可以显示，有则处理，没有则不处理
        var cont = content.querySelector('.cont-' + navNumber);
        // 说明找到了
        if (cont !== null) {
          // 将显示的li 的className中的active删除
          var activeEle = content.querySelector('.active');
          // 如果在content中没有找到有显示出来的内容，则将第一个子元素显示出来
          if (activeEle !== null) {
            activeEle.classList.remove('active');
          }
          cont.classList.add('active');
        }
    }
  }
});
















