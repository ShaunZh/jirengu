1. 下面的代码输出多少？修改代码让 fnArr[i]() 输出 i。使用 两种以上的方法
    js中不存在块级作用域，退出for循环后，i仍然存在，fnArr还有可能使用i，所以并不会被释放，调用fnArr[3]访问到的还是原来的i，原来的i退出for循环后变为10，因此输出10
    ```js
    var fnArr = [];
    for (var i = 0; i < 10; i ++) {
        fnArr[i] =  function(){
            return i;
        };
    }
    console.log( fnArr[3]() );  //
    ```
    修改如下：
    - 方法1：使用闭包
    ```js
    var fnArr = [];
    for (var i = 0; i < 10; i ++) {
      fnArr[i] =  (function(i){
         return function(){
           console.log(i);
         };
      }(i));
    }
    fnArr.forEach(function(fn){
      console.log(fn());
    });
     
    ```
    - 方法2：使用ES6的let语句创建块级作用域
    ```js
    var fnArr = [];
    for (let i = 0; i < 10; i ++) {
      fnArr[i] = function(){
            console.log(i);
      }   
    }
    fnArr.forEach(function(fn){
      console.log(fn());
    });
    ```

2. 封装一个汽车对象，可以通过如下方式获取汽车状态
```js
var Car = (function(){
   var speed = 0;
   function setSpeed(s){
       speed = s
   }
   function getSpeed(){
        return speed;
   }
   function accelerate(){
        speed += 10;
   }
   function decelerate(){
        speed -= 10;
   }
   function getStatus(){
        if (speed) {
            console.log('running');
            return 'running';
        } else {
            console.log('stop');
            return 'stop';
        }
   }
   return {
      setSpeed: setSpeed,
      getSpeed: getSpeed,
      accelerate: accelerate,
      decelerate: decelerate
      getStatus: getStatus
   }
})()

Car.setSpeed(30);
Car.getSpeed(); //30
Car.accelerate();
Car.getSpeed(); //40;
Car.decelerate();
Car.decelerate();
Car.getSpeed(); //20
Car.getStatus(); // 'running';
Car.decelerate(); 
Car.decelerate();
Car.getStatus();  //'stop';
//Car.speed;  //error
```

3. 下面这段代码输出结果是? 为什么?
```js 
var a = 1;
setTimeout(function(){
    a = 2;
    console.log(a);
}, 0);
var a ;
console.log(a);
a = 3;
console.log(a);
```
依次输出： 1, 3, 2
因为setTimeout并不会立刻执行，必须等待当前没有紧急任务的时候再执行，所以最后输出2

4. 下面这段代码输出结果是? 为什么?
```js 
var flag = true;
setTimeout(function(){
    flag = false;
},0)
while(flag){}
console.log(flag);
```
因为进入到while死循环中，无输出结果，setTimeout不会执行

5. 下面这段代码输出？如何输出delayer: 0, delayer:1...（使用闭包来实现）
```js 
for(var i=0;i<5;i++){
    setTimeout((function(i){
      return function(){
        console.log('delay: ' + i);
      }
    })(i), 0);
}
```

6. 如何获取元素的真实宽高
获取id为button的宽高
```
width = document.querySelector('#button').offsetWidth;
height = document.querySelector('#button').offsetHeight;
```
这两个方法获取的宽度 = content-width + border-left + border-right + padding-left + padding-right + vertical-scrollbar（垂直方向滚动条的宽度）;
高度 = content-height + border-top + border-bottom + padding-top + padding-bottom + horizon-scrollbar（水平方向滚动条的高度）;

7. URL 如何编码解码？为什么要编码？