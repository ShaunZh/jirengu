1. 如何判断一个元素是否出现在窗口可视范围（浏览器的上边缘和下边缘之间，肉眼可视）。写一个函数 isVisible实现
    ```js   
    function isVisible($node){
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var offsetTop = $node.offset().top;

      if ((offsetTop > scrollTop) && (offsetTop < (scrollTop + windowHeight))){
        $node.addClass('data-visible');
        console.log('出现了');
        return true;
      }
      return false;
    }
    ```
2. 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。每次出现都在控制台打印 true 。用代码实现
    ```js 
     function isVisible($node){
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var offsetTop = $node.offset().top;

      if ((offsetTop > scrollTop) && (offsetTop < (scrollTop + windowHeight))){
        $node.addClass('data-visible');
        console.log('出现了');
        return true;
      }
      return false;
    }

    $(window).on('scroll', function(){
      isVisible($('.box1'));
    }); 
    ```
3. 当窗口滚动时，判断一个元素是不是出现在窗口可视范围。在元素第一次出现时在控制台打印 true，以后再次出现不做任何处理。用代码实现
    ```js 
    function isVisible($node){
      
      if (!$node.hasClass('data-visible')){
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var offsetTop = $node.offset().top;

        if ((offsetTop > scrollTop) && (offsetTop < (scrollTop + windowHeight))){
          // 如果第一次出现，则添加data-visible类
          $node.addClass('data-visible');
          console.log('出现了');
          return true;
        }
        return false;
      }
    }

    $(window).on('scroll', function(){
      isVisible($('.box1'));
    }); 
    ```
*[题目1、2、3的演示](http://js.jirengu.com/daje)*

4. 图片懒加载的原理是什么？
    懒加载的思路：只在需要时进行加载
    **方案1：**
      **html部分**
      + 将所有图片的img标签写入html中
      + 将所有img的src设置为一个“白图”或者是一个显示“loading”的图片，这样浏览器加载时只需要发送一个请求，因为对于相同内容的请求，浏览器会从缓存中获取数据
      + 将img的真实地址放在data-src自定义属性当中，当当前img出现在视口时，再将data-src属性值赋值给src属性

      **js部分**
      + 获取所有的img标签
      + 判断img是否出现在视口：
        ```
        if (($(this).offset().top <= $(window).scrollTop() + $(window).height()) && 
    ($(this).offset().top > $(window).scrollTop()))
        ```

      + 判断是否已经加载，通过判断img的src是否为空白图片的url，如果是，则说明没有加载，否则就是加载过的

      + 加载图片，将img的data-src赋值给src属性即可
    **方案2**
      主要通过发送ajax请求给后台获取数据，并显示在页面上
    思路：
      + 在页面的底部插入一个DOM节点，该节点的用户是无法查看到的
      + 当该DOM节点出现在视口时，就向服务器发送一条ajax请求获取数据
      + 将获取到的数据插入到DOM节点之前，这样DOM节点就又被挤到底部，因此也可以实现懒加载

5. 实现视频中的图片懒加载效果
    [代码演示](http://js.jirengu.com/xufad)
6. 实现新闻懒加载
    [代码](https://github.com/ShaunZh/jirengu/blob/master/task16-%E6%87%92%E5%8A%A0%E8%BD%BD/%E6%87%92%E5%8A%A0%E8%BD%BD%E6%96%B0%E9%97%BB/index.html)