/*
* @Author: Marte
* @Date:   2017-06-19 15:00:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-19 15:07:04
*/

'use strict';

function getFriends(friend) {
    console.log('hhh');
    var friendsList = doument.querySelector('.friends-list');
    friend.forEach(function(val){
        var li = document.createElement('li');
        var content = document.createTextNode(val);
        li.appendChild(content);
        friendsList.appendChild(li);
        console.log('进入' + val);
    });
}

getFriends(friends);