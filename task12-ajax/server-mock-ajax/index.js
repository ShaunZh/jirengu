/*
* @Author: Marte
* @Date:   2017-06-19 15:00:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-19 17:30:27
*/

'use strict';

// function getFriends(friend) {
//     console.log('hhh');
//     var friendsList = doument.querySelector('.friends-list');
//     friend.forEach(function(val){
//         var li = document.createElement('li');
//         var content = document.createTextNode(val);
//         li.appendChild(content);
//         friendsList.appendChild(li);
//         console.log('进入' + val);
//     });
// }


var queryBtn = document.querySelector('#queryBtn');
var queryContent = document.querySelector('#query-content');
var friendsList = document.querySelector('.friends-list');

queryBtn.addEventListener('click', function(e){

    // 创建一个http请求
    var xhl = new XMLHttpRequest();
    xhl.onreadystatechange = function(){
        console.log('接受到了数据');
        if (xhl.readyState === 4 && (xhl.status === 200 || xhl.status === 304)) {
            console.log(xhl.responseText);
            render(xhl.responseText);
        }
    }
    // 启动一个针对地址为/user的get请求
    xhl.open('get', '/user?username='+queryContent.value, true);
    // 发送数据
    xhl.send();

}, false);

function render(jsonVal){
    // 将json字符串转换为JavaScript字符串
    var str = JSON.parse(jsonVal);
    var ct = document.createDocumentFragment();
    console.log(typeof str);
    console.log(str);
    str.forEach(function(val){
        var li = document.createElement('li');
        var content = document.createTextNode(val);
        li.appendChild(content);
        ct.appendChild(li);
    });
    friendsList.appendChild(ct);
}
