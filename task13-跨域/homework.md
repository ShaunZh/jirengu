### 什么是同源策略
**浏览器**出于安全考虑，只允许**本域**下的接口交互；**不同源**的客户端脚本，在**没有明确授权**的前提下，**不允许**读写对方资源
**注意**：是浏览器会阻止跨域访问，并不是服务器端不响应请求

**本域指的是？**
- **同协议**：如都是http或https
- **同域名**：如都是http://smallmage.com/a和http://smallmage.com/b
- **同端口**：如都是80端口

### 什么是跨域？跨域有几种实现形式
跨域就是指不同域的接口相互访问
实现方法：
#### 1. **jsonp**
  原理：利用script标签的开发策略（也就是不受同源策略的限制），网页可以得到从其他来源动态产生的json数据，而这种使用模式就是jsonp；利用jsonp抓取的并不是json数据，而是JavaScript，用JavaScript解释器运行

#### 2. **CORS**
  cross-origin resource sharing（跨域资源共享）
  CORS请求分为两种：**简单请求**和**非简单请求**
  凡是满足一下条件的就是简单请求：
>**请求方法是以下三个请求之一：**
- HEAD
- GET
- POST

>**HTTP的头信息不超出以下几种字段：**
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type只限于这三个值：`application/x-www-form-urlencoded、multipart/form-data、text/plain`

凡是不同时满足上面两个请求的，都属于非简单请求

- 简单请求
  对于简单请求，浏览器发出CORS请求，会在请求头中添加origin字段，origin字段用来说明该请求来自哪个源（协议+域名+端口），服务器根据这些信息来决定是否响应请求；如果指定的源不在服务器的许可范围之内，服务器会返回一个正常的HTTP响应，浏览器接到响应后，发现头信息里没有包含"Access-Control-Allow-Origin"字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。
  注意： 这种错误不能通过状态吗识别，因为浏览器的状态码很可能返回的是200
- 非简单请求
  非简单请求只哪些对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者Content-Type字段的类型是`application/json`。
  非简单请求在正式通信之前会**增加一次HTTP查询请求**，被称为**预检**请求；浏览器会先询问服务器当前网页的域名是否在许可范围之内，以及可以使用的方法和头信息字段，只有得到肯定的答复，浏览器才会发出正式的XMLHttpRequest，否则就报错

  博客：[跨域资源共享（CORS）](http://www.jianshu.com/p/cc9d26c6b444)

#### 3. **降域**
当两个页面都使用同一个基础域名，并且使用相同的协议、端口，可以使用降域来实现跨域访问
如：
```
页面A的URL: http://a.smallmage.com/a.html
页面B的URL: http://b.smallmage.com/a.html
设置它们两个页面的：window.domain = "smallmage.com"
```
这样两个网页就可以通信了

#### 4. **使用HTML5的postmessage**（适用于两个iframe或两个页面之间）
  - window.postMessage方法是HTML5引进的新特性
  - 可以使用它向其他页面发送数据，无论是否同源

postMessage调用语法如下：
`otherWindow.postMessage(message, targetOrigin, [transfer]);`
postMessage的接收语法如下
`window.addEventListener('message', onmessage, false);`
代码示例：
```
$('.main input').addEventListener('input', function(){
    console.log(this.value);
    window.frames[0].postMessage(this.value,'*');
})
window.addEventListener('message',function(e) {
        $('.main input').value = e.data
    console.log(e.data);
});
```

##  三种方式实现跨域访问
- 使用jsonp
```js 
<script>
  document.querySelector('.change').addEventListener('click', function(e){
    var script = document.createElement('script');
    script.src = 'http://127.0.0.1:8080/getNews?callback=appendHtml';
    document.head.appendChild(script);
    document.head.removeChild(script);
  }, false);

  function appendHtml(news) {
    var fragment = document.createDocumentFragment();
    console.log(news);
    var html = '';
    news.forEach(function(val){
      html += '<li>' + val + '</li>';
    });
    document.querySelector('.news').innerHTML = html;
  }
</script>
```

- 使用cors方式
客户端还是使用ajax发送
```js 
document.querySelector('.change').addEventListener('click', function(e){
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://127.0.0.1:8080/getNews', true);
    xhr.send();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var news = JSON.parse(xhr.responseText);
          console.log(news);
          var fragment = document.createDocumentFragment();

          var html = '';
          news.forEach(function(val){
            html += '<li>' + val + '</li>';
          });
          document.querySelector('.news').innerHTML = html;
        }
      }
    };
  }, false);
```
服务器端
```js 
app.get('/getNews', function(req, res){

    var news = [
        "第11日前瞻：中国冲击4金 博尔特再战200米羽球",
        "正直播柴飚/洪炜出战 男双力争会师决赛",
        "女排将死磕巴西！郎平安排男陪练模仿对方核心",
        "没有中国选手和巨星的110米栏 我们还看吗？",
        "中英上演奥运金牌大战",
        "博彩赔率挺中国夺回第二纽约时报：中国因对手服禁药而丢失的奖牌最多",
        "最“出柜”奥运？同性之爱闪耀里约",
        "下跪拜谢与洪荒之力一样 都是真情流露"
    ]
    var data = [];
    for(var i=0; i<3; i++){
        var index = parseInt(Math.random()*news.length);
        data.push(news[index]);
        news.splice(index, 1);
    }
    // 添加头
    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(data));
})
```
- 降域
a.html
```js 

<div class="ct">
  <h1>使用降域实现跨域</h1>
  <div class="main">
    <input type="text" placeholder="http://a.smallmage.com:8080/a.html">
  </div>

  <iframe src="http://b.smallmage.com:8080/b.html" frameborder="0" ></iframe>

</div>


<script>
//URL: http://a.jrg.com:8080/a.html
document.querySelector('.main input').addEventListener('input', function(){
  console.log(this.value);
  window.frames[0].document.querySelector('input').value = this.value;
})
document.domain = "smallmage.com"
</script>
```
b.html 
```js 
<div class="ct">
  <h1>使用降域实现跨域</h1>
  <div class="main">
    <input type="text" placeholder="http://b.smallmage.com:8080/b.html">
  </div>

</div>


<script>
//URL: http://a.jrg.com:8080/a.html
document.querySelector('.main input').addEventListener('input', function(){
  console.log(this.value);
  window.parent.document.querySelector('input').value = this.value;
})
document.domain = "smallmage.com"
</script>
</html>

```