1. jQuery 中， $(document).ready()是什么意思？
  表示加载完成HTML（构建完DOM树）时，执行该函数

2. $node.html()和$node.text()的区别?
  html()方法是在node下添加子元素，node原来的子元素会被新元素替换
  text()方法是修改node的文本节点内容

3. $.extend 的作用和用法? 
  - 当提供两个或多个对象给extend时，对象的所有属性会被添加到目标对象上
  - 当只有一个参数提供时，意味着目标参数被省略，jquery对象本身被认为是目标对象，这样，我们就可以在jquery的命名空间下添加新的功能；有利于插件开发者向jquery添加新函数

4. jQuery 的链式调用是什么？
  在jquery中，每一步的操作，返回的都是一个jquery对象，所以不同的操作可以连接在一起，如：`　$('div').find('h3').eq(2).html('Hello');`

5. jQuery 中 data 函数的作用
  - 可以在匹配元素上存储任意类型的数据
  - 可以用data函数访问自定义属性的值

6. 写出以下功能对应的 jQuery 方法：
  - 给元素 $node 添加 class active，给元素 $noed 删除 class active
    `$node.addClass("active")`——添加
    `$node.removeClass("active")`——添加
  - 展示元素$node, 隐藏元素$node
    `$node.show()`或`$(node).fadeIn()`——展示
    `$node.hide()`或`$(node).fadeOut()`——隐藏
  - 获取元素$node 的 属性: id、src、title， 修改以上属性
    `$node.attr('id')`：获得id值并返回，如果有第二个参数表示设置id值
    `$node.attr('src')`：获得src值并返回，如果有第二个参数表示设置src值
    `$node.attr('title')`：获得title值并返回，如果有第二个参数表示设置title值
  - 给$node 添加自定义属性data-src
    `$node.attr("data-src", "newSrc")`
  - 在$ct 内部最开头添加元素$node
    `$ct.prepend($node)`
  - 在$ct 内部最末尾添加元素$node
    `$node.appendTo($ct)`
  - 删除$node
    `$node.remove()`移除node和它内部的所有元素，同时也会移除其上面的事件
    `$node.detach()`相对于remove()方法，其不会移除node上的事件
  - 把$ct里内容清空
    `$node.empty()`相比于remove()方法，该方法不会移除自身
  - 在$ct 里设置 html <div class="btn"></div>
    `$ct.append('<div class="btn"></div>')`
  - 获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
    `$node.width()`——宽度
    `$node.height()`——高度
  - 获取窗口滚动条垂直滚动距离
    `$node.scrollTop()`
  - 获取$node 到根节点水平、垂直偏移距离
    `$node.offset().top`
  - 修改$node 的样式，字体颜色设置红色，字体大小设置14px
    `$node.css({"color":"red", "font-size": "14px"})`
  - 遍历节点，把每个节点里面的文本内容重复一遍
    ```js 
      $node.each(function(){
        $(this).text( $(this).text() +  $(this).text());
        });
    ```
  - 从$ct 里查找 class 为 .item的子元素
    `$ct.find(".item")`
  - 获取$ct 里面的所有孩子
    `$ct.childrent()` 
  - 对于$node，向上找到 class 为'.ct'的父亲，在从该父亲找到'.panel'的孩子
    `$node.parent(".ct").children(".pannel")`
  - 获取选择元素的数量
    $node.length
  - 获取当前元素在兄弟中的排行
    $node.index()

7. 用jQuery实现以下操作
  http://js.jirengu.com/gokid

8. loadmore加载更多
  ```html 
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset='utf-8'>
    <meta name=viewport content="width=device-width, initial-scale=1">
    <script
      src="https://code.jquery.com/jquery-3.2.1.min.js"
      integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
      crossorigin="anonymous"></script>

    <title>ajax实践——loadmore</title>
    <style type="text/css" media="screen">
      *{
        margin: 0;
        padding: 0;
      }
      ul li{
        list-style: none;
      }
      .loade-more-container {
        width: 150px;
        height: 40px;
        margin: 10px auto;
        position: relative;
      }
      .item-container>li {
        margin: 10px;
        border: 1px solid ;
        padding: 5px;
      }
      .item-container>li:hover{
        background-color: #4FE41A;
      }
      .load-more-btn {
        padding: 10px; 0;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        background-color: #56F54C;
      }
      .load-more-btn:hover {
        cursor: pointer;
      }
      .no-data-load{
        position: absolute;
        top: -70%;
        opacity: 0;
        font-size: 18px;
        color: #6F6B6B;
      }
      .unfade{
        opacity: 1;
        -webkit-transition: opacity .4s linear;
           -moz-transition: opacity .4s linear;
            -ms-transition: opacity .4s linear;
             -o-transition: opacity .4s linear;
                transition: opacity .4s linear;
      }
      .fade{
        opacity: 0;
        -webkit-transition: opacity .3s linear;
           -moz-transition: opacity .3s linear;
            -ms-transition: opacity .3s linear;
             -o-transition: opacity .3s linear;
                transition: opacity .3s linear;
      }
      .loading-word{
        opacity: 0;
      }
      .loading{
        background: rgba(255, 255, 255, .8) url('https://i.stack.imgur.com/FhHRx.gif') center center no-repeat;
      }
    </style>
</head>
<body>
    <ul class="item-container"></ul>
    <div class="loade-more-container">
        <span class="no-data-load">到底了、大兄弟</span>
        <button class="load-more-btn "><span class="load-word">加载更多</span></button>
    </div>
    <script>
      var loadMoreBtn = $('.load-more-btn').eq(0);
      var itemContainer = $('.item-container').eq(0);
      var noDataLoad = $('.no-data-load').eq(0);
      var loadWord = $('.load-word').eq(0);

      var sendData = {
        url: "/loadmore",
        type: "get",
        data: {
          index: 0,
          length: 5
        }
      };
      loadMoreBtn.on('click', function(e){
        e.preventDefault();
        loading();
        var xhr = $.ajax({
          url: sendData["url"],
          type: sendData["type"],
          data: sendData["data"]
        });
        xhr.done(function(data){
          dealData(data);
        });
        xhr.fail(function(data){
          alert('通信异常');
        });
        xhr.always(function(){
          loadComplete();
        });
      });

      function dealData(d) {
        var status = d["status"];
        if (status === 200) {           // 返回正确数据
          render(d['data']);
          sendData["data"]["index"]++;
        } else if (status === 401) {     // 没有数据了
          noDataDeal();
        } else if (status === 402) {
          alert('发送的数据错误');
        }
      }

      function render(d) {
        var fragment = document.createDocumentFragment();
        d.forEach(function(val) {
          itemContainer.append(`<li>${val}</li>`);
        });

      }

      function noDataDeal() {
        noDataLoad.addClass('unfade');
        setTimeout(function(){
          noDataLoad.removeClass("unfade");
          noDataLoad.addClass("fade");
          setTimeout(function(){
            noDataLoad.removeClass("fade");
          }, 300);
        }, 800);
      }

      function loading(){
        loadMoreBtn.addClass("loading");
        loadWord.addClass('loading-word');
      }

      function loadComplete(){
        loadMoreBtn.removeClass("loading");
        loadWord.removeClass('loading-word');
      }
    </script>
</body>
</html>
  ```
9. 天气
  http://js.jirengu.com/kuqen