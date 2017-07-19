1. 为什么要使用模块化？
- 解决命名冲突
- 便于依赖管理
- 提高代码可读性
- 代码解耦，提高复用性
2. CMD、AMD、CommonJS 规范分别指什么？有哪些应用
**CommonJS**
Node应用由模块组成，采用CommonJS模块规范。
**规范特点：**
- CommonJS规范加载模块是**同步的**，也就是只有加载完成后，才能执行后面的操作，由于这个特性，CommonJS模块一般只用于**服务器端**，而不用于浏览器端
- 所有代码均运行在**模块作用域**，不会污染全局变量；也就是说模块内部的变量，无法被外部模块调用，除非将其定义为global对象的属性
- 模块加载顺序，按照其在代码中的书写顺序进行加载
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后将运行结果缓存，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须**清除缓存**

**语法特点**
- **定义模块**： 定义模块 根据CommonJS规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性
- **模块输出**：模块只有一个出口——`module.exports`对象，我们需要把模块希望输出的内容放入该对象上
- **加载模块**：加载模块使用`require`方法，该方法读取一个文件并执行，返回文件内部的`module.exports`对象

**代码示例**
```
// 模块定义 myModel.js

var name = 'Byron';
function printName(){
    console.log(name);
}
function printFullName(firstName){
    console.log(firstName + name);
}
module.exports = {
    printName: printName,
    printFullName: printFullName
}

// 在其他文件中加载模块
var nameModule = require('./myModel.js');
nameModule.printName();
```

**AMD**
AMD 即 `Asynchronous Module Definition`（**异步模块定义**），它是一个在**浏览器端**进行模块化开发的规范

因为该规范不是JavaScript原生支持的，因此使用该规范进行开发时，需要用到对应的库函数，如：`RequireJS`

RequireJS主要解决两个问题：
- 多个js文件可能有依赖问题，被依赖的文件需要早于依赖它的文件被加载
- js加载的时候浏览器会停止渲染，加载的文件越多，页面失去响应的时间越长

**语法**
**定义模块**
AMD规范定义了`define()函数`，它是一个全局变量，用于定于模块，语法：
    `define(id?, dependencies?, factory);`
- id：可选参数，用于定于模块的标识，如果没有提供该参数，模块名则为脚本文件名
- dependencies：当前模块依赖的模块名称数组
- factory：工厂方法，模块初始化要执行的函数或对象，如果是函数，它应该只被执行一次；如果是对象，此对象应该为模块的输出值

**加载模块**
在页面上使用`require()`函数加载模块，语法：
`require([dependencies], function(){});`
requiire接收两个参数：
1. 第一个参数是一个数组，表示所依赖的模块
2. 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数的形式传入该函数，从而在函数内部就可以使用这些模块
**注意：** require()函数在加载依赖的模块时是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块加载完成后才会执行，**解决了依赖问题*


**例子**：
```
// 定义一个myModule.js模块
define(['dependency1', 'dependency2'], function(){
  var name = 'hexon';
  function sayName(){
    console.log(name);
  }
  return {
    sayName: sayName
  };
});

// 加载模块
require(['myModule'], function(my){
  my.sayName();  
});
```
**示例解析**
- 通过define定义个模块，该模块的名字没有写明
- 'dependency1'和''dependency2'为该模块所依赖的文件
- 当依赖的文件加载完成后，执行function，返回一个对象，对象中包含需要提供给外部调用的内容，这里提供了一个`sayName`方法
- 通过`require`加载模块，`'myModule'`为需要加载的模块，my为`'myModule'`模块的别名，通过`my`来调用`myModule`模块内的资源


**AMD规范与CommonJS规范的兼容性**

CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。


**CMD**
CMD即`Common Module Definition`通用模块定义，CMD规范是国内发展而来的，CMD的代表库有SeaJS，SeaJS要解决的问题和RequireJS一样，只不过在模块定义方式和模块加载时机上有所不同，SeaJS是需要时才去加载，而RequireJS是预先加载好
**语法**
SeaJS推崇一个模块一个文件，遵循统一写法，使用`define`关键字定义一个模块
**define**
`define(factory)`

**Module Context**
```define(function(require, exports, module) {

  // The module code goes here

});
```

**示例代码**
A typical sample
```
math.js

define(function(require, exports, module) {
  exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
      sum += args[i++];
    }
    return sum;
  };
});
increment.js

define(function(require, exports, module) {
  var add = require('math').add;
  exports.increment = function(val) {
    return add(val, 1);
  };
});
program.js

define(function(require, exports, module) {
  var inc = require('increment').increment;
  var a = 1;
  inc(a); // 2

  module.id == "program";
});
```


3. 使用 requirejs 完善入门任务15，包括如下功能：
[预览](http://smallmage.com/jirengu/requirejs/src/index.html)