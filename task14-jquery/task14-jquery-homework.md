1. jQuery 能做什么？
jQuery是一个js库，它封装了js常用的功能代码，提供了一种简便的js设计模式，优化了HTML的文档操作、事件处理、动画设计和ajax交互，兼容各种主流浏览器
2. jQuery 对象和 DOM 原生对象有什么区别？如何转化？
jquery对象可以使用jquery的对象方法，DOM原生对象只能使用DOM原生对象的方法与属性。
两者之间的转化：
如对于一个特定结果集，我们想获取到指定index的jQuery对象，可以使用eq方法
$('div').eq(3); // 获取结果集中的第四个jQuery对象
$('div')[2]或者$('div').get(2);  // 获取的是DOM原生对象，通过[]或get()进行转换了

3. jQuery中如何绑定事件？bind、unbind、delegate、live、on、off都有什么作用？推荐使用哪种？使用on绑定事件使用事件代理的写法？
**绑定事件的方法**
  - .bind()：为一个元素绑定一个或多个事件，在.bind()绑定事件的时候，这些元素必须已经存在
  - .unbind()：解除该元素绑定的事件
  - .delegate()：为所有匹配选择器（selector参数）的元素绑定一个或多个事件处理函数，基于一个指定的根元素的子集，匹配的元素包括那些目前已经匹配到的元素，也包括那些今后可能匹配到的元素。
  ```js
  $("table").delegate("td", "click", function() {
  $(this).toggleClass("chosen");
    });
  ```
  - .live()：附加一个事件处理器到匹配目前选择器的所有元素，现在和未来。
  - **.on()（推荐使用）：在选定的元素上绑定一个或多个事件处理函数。**
  - **.off()（推荐使用）：移除选定元素上使用on()绑定的事件**
在jquery1.7之前提供了很多绑定事件的方法，后来统一使用on()/off()方法；
on()方法进行事件绑定，off()方法用于移除使用on()方法绑定的事件，推荐使用on()和off()方法绑定事件和移除事件

**on绑定事件的写法**：
语法： on(events,[selector],[data],handler)； 
概述：在选择元素上绑定一个或多个事件的事件处理函数。
参数说明：
 - events:一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"keydown.myPlugin" 。
 - selector:一个选择器字符串用于过滤器的触发事件的选择器元素的后代。如果选择的< null或省略，当它到达选定的元素，事件总是触发。
 - data:当一个事件被触发时要传递event.data给事件处理函数。
 - handler:事件被触发时，执行的函数。若该函数只是要执行return false的话，那么该参数位置可以直接简写成 false，**当为false时，表示阻止冒泡和默认行为**
**示例**：
  - `$( "form" ).on( "submit", false );`：false表示阻止冒泡和默认行为
  - ```js 
   function myHandler( event ) {
  alert( event.data.foo );
}
$( "p" ).on( "click", { foo: "bar" }, myHandler );```
    `{ foo: "bar" }`：表示当事件触发时，传入的参数，可以通过event.data获取
4. jQuery 如何展示/隐藏元素？
  **展示元素：`ele.show()`和`ele.fadeIn()`**
    这两个方法的参数类似，故只列出show方法的参数，以做说明
    - element.show()：最简单的方式，直接将ele显示出来；如：`$( ".target" ).show();`
    - element.show([duration][,complete])：以一定的时间来显示element，显示完成后执行complete；如果省略complete，则表示显示完成后不做任何事情，如：
    ```js 
     $( "#book" ).show( "slow", function() {
        // Animation complete.
     }
    ```
  **隐藏元素：`ele.hide()`和`ele.fadeOut()**
    hide方法与show方法实现效果相反，参数均相同，只不过效果是隐藏
5. jQuery 动画如何使用？
  **语法**
  `.animate( properties [, duration ] [, easing ] [, complete ] )`
  **示例**

6. 如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？
  `$("target").html()`：当html方法中有值时，表示设置，当没有值时，表示获取
  `$("target").text()`：当text方法中有值时，表示设置，当没有值时，表示获取

7. 如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？
  `$("target").val()`：设置或获取元素属性，有值时，表示设置
  `$("target").attr()`：设置或获取元素属性，没有值时，表示获取

8. [代码示例8](http://js.jirengu.com/jixi)
9. [代码9、代码10和代码11合在一起](http://js.jirengu.com/yaben)