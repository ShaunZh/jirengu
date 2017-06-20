/*
* @Author: Marte
* @Date:   2017-06-20 09:27:19
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-20 18:52:42
*/

'use strict';

var loadMoreBtn = document.querySelector('.load-more-btn');
var itemContainer = document.querySelector('.item-container');
var noDataLoad = document.querySelector('.no-data-load');
var loadWord = document.querySelector('.load-word');


var loadMore = {
  "method": "post",
  "url": "/loadMore",
  "dataType": "json",
  "data": {
    "index": 0,
    "length": 5
  },
  "onSuccess": dealData,
  "onError": errorDeal,
  "isResponse": true,
  "loading": loading,
  "loadComplete": loadComplete
};

function ajax(inputData) {
  if (!inputData["isResponse"]){
    return ;
  }

  inputData["isResponse"] = false;

  var method = inputData["method"] || 'get',
        data = inputData["data"] || {},
        dataType = inputData["dataType"] || "json",
        url = inputData["url"],
        onSuccess = inputData["onSuccess"] || function(){},
        onError = inputData["onError"] || function(){},
        isResponse = inputData["isResponse"] || true,
        loading = inputData["loading"] || function(){};
        loadComplete = inputData["loadComplete"] || function(){};

  var xhr = new XMLHttpRequest();
  loading();
  xhr.onreadystatechange = function(){

    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = xhr.responseText;
        if (dataType === 'json') {
          data = JSON.parse(xhr.responseText);
        }
        // 数据传输正确处理
        onSuccess(data);
      } else{
        // 数据传输错误处理
        onError();
      }
      inputData["isResponse"] = true;
      loadComplete();
    }
  }
  //' nextIndex + '&length=5'
  if (method === 'get') {
    url += '?';
    for (let key in data) {
      url += key + "=" + data[key] + "&";
    }
    url = url.substr(0, url.length - 1);

    xhr.open(method, url, true);
    xhr.send();

  } else if (method === 'post') {
    let sendData = "";

    for (let key in data) {
      sendData += key + "=" + data[key] + "&";
    }

    sendData = sendData.substr(0, sendData.length - 1);

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(sendData);
  }

}

loadMoreBtn.addEventListener('click', function(e){
  var event = e || window.e;
  event.preventDefault();
  ajax(loadMore);

}, false);


function dealData(data) {
  var status = data["status"];
  if (status === 200) {           // 返回正确数据
    render(data['data']);
    loadMore["data"]["index"]++;
  } else if (status === 401) {     // 没有数据了
    noDataDeal();
  } else if (status === 402) {
    alert('发送的数据错误');
  }
}

function render(data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function(val) {
    var li = document.createElement('li');
    var content = document.createTextNode(val);
    li.appendChild(content);
    fragment.appendChild(li);
  });
  itemContainer.appendChild(fragment);
}

function noDataDeal() {
  noDataLoad.classList.add("unfade");
  setTimeout(function(){
    noDataLoad.classList.remove("unfade");
    noDataLoad.classList.add("fade");
    setTimeout(function(){
      noDataLoad.classList.remove("fade");
    }, 300);
  }, 800);
}

function errorDeal() {
  window.location.href = "404.html";
}

function loading(){
  loadMoreBtn.classList.add("loading");
  loadWord.classList.add('loading-word');
}

function loadComplete(){
  loadMoreBtn.classList.remove("loading");
  loadWord.classList.remove('loading-word');
}

