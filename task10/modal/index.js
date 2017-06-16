/*
* @Author: Marte
* @Date:   2017-06-16 21:38:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-16 21:38:25
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


var clickMe= document.querySelector('.click-me');
var modalCancel = document.querySelector('.modal .cancel');
var modalClose = document.querySelector('.modal .close-modal');
var modal = document.querySelector('.modal');
var fade = document.querySelector('.fade');

addEvent(clickMe, 'click', function(e){
  modal.classList.add('modal-active');
  fade.classList.add('fade-active');
});

addEvent(modalCancel, 'click', function(e){
  modal.classList.remove('modal-active');
  fade.classList.remove('fade-active');
});

addEvent(modalClose, 'click', function(e){
  modal.classList.remove('modal-active');
  fade.classList.remove('fade-active');
});












