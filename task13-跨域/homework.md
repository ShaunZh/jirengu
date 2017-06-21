1. 什么是同源策略
**浏览器**出于安全考虑，只允许**本域**下的接口交互；**不同源**的客户端脚本，在**没有明确授权**的前提下，**不允许**读写对方资源
**注意**：是浏览器会阻止跨域访问，并不是服务器端不响应请求

## 本域指的是？
- **同协议**：如都是http或https
- **同域名**：如都是http://smallmage.com/a和http://smallmage.com/b
- **同端口**：如都是80端口

2. 什么是跨域？跨域有几种实现形式
跨域就是指不同域的接口相互访问
实现方法：
- **jsonp**
  原理：利用script标签的开发策略（也就是不受同源策略的限制），网页可以得到从其他来源动态产生的json数据，而这种使用模式就是jsonp；利用jsonp抓取的并不是json数据，而是JavaScript，用JavaScript解释器运行
- **CORS**
  cross-origin resource sharing（跨域资源共享）
  原理：前端用XMLHttpRequest发送请求进行跨域访问时，浏览器检测到是跨域，会在请求头里添加“origin”，后端回复数据时添加头信息：`"Access-Control-Allow-Origin"`，浏览器检测接收的信息中是否包含`"Access-Control-Allow-Origin"`，有则处理响应，没有则抛出XMLHttpRequest异常；
- **降域**
当两个页面都使用同一个基础域名，并且使用相同的协议、端口，可以使用降域来实现跨域访问
如：
```
页面A的URL: http://a.smallmage.com/a.html
页面B的URL: http://b.smallmage.com/a.html
设置它们两个页面的：window.domain = "smallmage.com"
```
这样两个网页就可以通信了
- **使用HTML5的postmessage**（适用于两个iframe或两个页面之间）
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

5.  根据视频里的讲解演示三种以上跨域的解决方式 ，写成博客方式
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