## HTML5是什么？有哪些新特性？有哪些新增标签？如何让低版本的 IE 支持 HTML5新标签
**HTML5**: 是超文本标记语言的第五次重大修改，属于一个标准规范
**新特性**：
- **语义特性：**
- **本地存储特性**：基于HTML5开发的网页APP拥有更短的启动时间，更快的联网速度，这主要得益于 **[HTML5 App Cache](https://www.html5rocks.com/zh/tutorials/appcache/beginner/)以及本地存储功能**，[Indexed DB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)（HTML5本地存储最重要的技术之一）
- **设备兼容特性**：html5提供的数据与应用接入开放接口，使外部应用可以直接于浏览器内部的数据直接相连
- **连接特性**：拥有更有效的服务器连接推送技术，Server-Sent Event和WebSockets就是其中的两种特性，这两个特性能够帮助我们实现服务器将数据“推送”到客户端的功能。
[WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
[Server-Sent Events 教程](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
- **网页多媒体特性**：支持网页端的Audio、video等多媒体功能，基于SVG、Canvas、WebGL及CSS3的3D功能
- **性能与集成特性**：HTML5通过XMLHttpRequiest2技术，解决以前的跨域问题
- **CSS3特性**

**新增标签**

| 元素 | 描述:|
|-----    |------- |
|  canvas|标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API
|audio|定义音频内容|
|video|定义视频或movie|
|source|定义多媒体资源，如<video>、<audio>|
|header|定义文档头部区域|
|section|定义文档中的区块信息|
|footer|定义文档底部区域|
|aside|定义页面内容之外的区域，如侧边栏|
|article|定义页面正文内容|
|nav|定义导航栏|
|details|用于描述文档或文档某个部分的细节|
|dialog|定义对话框|
|time|定义时间、日期|
|datalist|定义选项列表。与 input 元素配合使用该元素，来定义 input 可能的值|
|figure|规定独立的流内容（图片、图像、代码等）|
|keygen |规定用于表单的密钥对生成器字段|
|output|定义不同类型的输出，比如脚本的输出|
|progress   |定义任何类型的任务的进度|
|bdi|设置一段文本，使其脱离其父元素的文本方向设置|
|summary|标签包含details元素的标题|
|embed|定义嵌入的内容，比如插件|
|track|为诸如 <video> 和 <audio> 元素之类的媒介规定外部文本轨道|
|figcaption |定义 <figure> 元素的标题
|mark|定义带标号的文本|
|meter  |定义度量衡。仅用于已知最大和最小值的度量|
|ruby   |定义 ruby 注释（中文注音或字符）|
|rt |定义字符（中文注音或字符）的解释或发音|
|rp |在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容|
|wbr    |规定在文本中的何处适合添加换行符|

**如何让低版本的 IE 支持 HTML5新标签**
- **使用js**：通过js创造html5标签，然后添加CSS样式
  ```
  (function(){
    var a = ['section', 'header', 'footer', 'nav', 'aside'];
    for (var i = 0; i < a.length; i++) {
      document.createElement(a[i]);
    }
  })();
  ```
- **使用html5shiv**
```
<!--[if lt IE 9]> 
    <script src="bower_components/html5shiv/dist/html5shiv.js"></script>
<![endif]-->
```
[html5shiv介绍](https://github.com/aFarkas/html5shiv)

---
## input 有哪些新增类型？
- email
- url
- range
- number
- tel
- date
- month
- week
- time
- datetime

---
## 浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据。

sessionStorage、localStorage和cookie 这三者都是用于浏览器端存储数据，而且都是**字符串类型的键值对**。

区别在于：

- **数据传输方面**：在每个http请求中都会附加cookie信息，cookie中的信息能够被推送到服务器端；而sessionStorage和localStorage不会被推送到服务器端
- **存储大小不同**：cookie最大支持4KB，而sessionStorage和localStorage一般在5~10MB
- **生命周期**：默认情况下，cookie开始于浏览器启动，结束于浏览器关闭，但是可以手动设置cookie的过期时间，同时，到期后被删除；而对于sessionStorage和localStorage，没有过期时间，原则上只要不手动删除，其会一直被保存在本地上
- **被创造的初衷不同**：sessionStorage和localStorage都属于WebStorage，创建他们的目的就是用于存储客户端数据；
而cookie最早在网景的浏览器中被支持，主要目的是为了**辨别用户身份**而存储在本地终端的数据。

参考：[在HTML5的时代,重新认识Cookie](https://juejin.im/post/59708bbe518825103c098332)

### cookie
cookie是存放在客户端的小型文本文件，主要用于**辨别用户身份**而存储在本地终端上的数据。可以包含若干键值对，每个键值对可以设置过期时间，到期会被删除，在每个HTTP请求时，都会将其附加的cookie头字段，cookie的最大限制为4kb

**cookie的缺陷**
- cookie会被附加在每个http请求中，因此会无形中增加流量
- 由于http请求中的cookie是明文传输，因此有安全问题（除非使用https）
- cookie的大小限制是4kb，对于负责的存储需求可能不够用



###sessionStorage和localStorage
**概念**

这两者都是**本地存储**，均**不会**被发送到服务器端，其主要在**生命周期**上有比较明显的区别；localStorage的生命周期更长，没有过期时间，原则上要等到通过JavaScript将内容清除掉或者清空cookie时才会消失；而sessionStorage则在Browser或Tab被关闭时就会清空

**浏览器支持情况**
这两者都都需要浏览器的API支持，浏览器的支持情况如下：
 ![image.png](http://upload-images.jianshu.io/upload_images/2310756-dd0c662c306882dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**使用**
通过`window.localStorage`和`window.sessionStorage`这而两个对象进行操作

以操作`localStorage`为例:
- **从存储中获取值**
`window.localStorage.getItem('key') `

  ```
function setStyles() {
  var currentColor = localStorage.getItem('bgcolor');
  var currentFont = localStorage.getItem('font');
  var currentImage = localStorage.getItem('image');

  document.getElementById('bgcolor').value = currentColor;
  document.getElementById('font').value = currentFont;
  document.getElementById('image').value = currentImage;

  htmlElem.style.backgroundColor = '#' + currentColor;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute('src', currentImage);
}
```
- **在存储中设置值**
`window.localStorage.setItem`可以从存储中获取指定的数据项或者设置新的数据项，该方法接受两个参数——要创建/修改的数据项的键，和对应的值。
```
function populateStorage() {
  localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
  localStorage.setItem('font', document.getElementById('font').value);
  localStorage.setItem('image', document.getElementById('image').value);

  setStyles();
}
```
- **通过 StorageEvent 响应存储的变化**
无论何时，storage对象发生变化时（即创建/更新/删除，重复设置相同的项不会触发，storage.clear()方法至多触发一次），都会触发StorageEvent事件
`window.addEventListener('storage', function(){});`
示例：
```js
window.addEventListener('storage', function(e) {  
  document.querySelector('.my-key').textContent = e.key;
  document.querySelector('.my-old').textContent = e.oldValue;
  document.querySelector('.my-new').textContent = e.newValue;
  document.querySelector('.my-url').textContent = e.url;
  document.querySelector('.my-storage').textContent = e.storageArea;
});
```
  **注意**：在同一个页面内发生的改变不会起作用——在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用。在其他域名下的页面不能访问相同的 Storage 对象。

- **删除数据记录**
`window.localStorage.removeItem()`：接收一个参数，要删除的数据项key值
`window.localStorage.clear()`：不接收参数，只是简单的清空域名对应的整个存储数据

**参考：**
- [使用 Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [[HTML5]簡述HTML5的Client端暫存-localStorage/sessionStorage](https://dotblogs.com.tw/jimmyyu/archive/2011/03/27/html5-client-storage.aspx)
- [Storing Objects in HTML5 localStorage](https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage)
- [HTML5本地存储：SessionStorage, LocalStorage, Cookie](http://harttle.com/2015/08/16/localstorage-sessionstorage-cookie.html)
- [What is the difference between localStorage, sessionStorage, session and cookies?](https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies)
---


## 写出如下 CSS3效果的简单事例
1. 圆角， 圆形
2. div 阴影
3. 2D 转换：放大、缩小、偏移、旋转
4. 3D 转换：移动、旋转
5. 背景色渐变
6. 过渡效果
7. 动画
[演示](http://js.jirengu.com/gitiq)

## 实现如下全屏图加过渡色的效果（具体效果随意）
[演示](http://js.jirengu.com/qowar)

## 写出如下 loading 动画效果
- [loading1](http://js.jirengu.com/vicit)
- [loading2](http://js.jirengu.com/qonog)

