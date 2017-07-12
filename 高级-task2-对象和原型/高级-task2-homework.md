##this 相关问题
1. apply、call 、bind有什么作用，什么区别
这三个方法均可以改变调用函数的this指向
**call()方法：**将调用函数中的this指向call方法的第一个参数，并将call方法第一个参数之后的参数列表传入调用函数中
**apply()方法：**apply方法与call方法功能类似，只不过其接受的不是参数列表，而是一个数组或类数组对象
**bind()方法：**将this指向传入的第一个参数，并返回一个新函数
利用这三个方法可以实现类属性和自身方法的继承；同时，对于一些类数组对象，因为其并不是真正的数组，所以并不存在数组方法，因此我们可以利用apply方法，让其调用数组方法

2. 以下代码输出什么?
```js 
var john = { 
  firstName: "John" 
}
function func() { 
  alert(this.firstName + ": hi!")
}
john.sayHi = func
john.sayHi()
```
输出： "John: hi!"

3. 下面代码输出什么，为什么
```js 
func() 
function func() { 
  alert(this)
}
```
输出：window
该函数内的this是在全局作用域下，所以this指向window

4. 下面代码输出什么
```js 
document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
        console.log(this);
    }, 200);
}, false);
```
第一个console.log(this)输出：**document**
第二个console.log(this)输出：**window**

5. 下面代码输出什么，why
```js 
var john = { 
  firstName: "John" 
}

function func() { 
  alert( this.firstName )
}
func.call(john)
```
输出:"John"
call方法改变了func中this的指向，将其指向john对象

6. 以下代码有什么问题，如何修改
```js 
var module= {
    
  bind: function(){

    $btn.on('click', function(){
      console.log(this) //this指什么
      this.showMsg();
    })

  },
  
  showMsg: function(){
    console.log('饥人谷');
  }
}
```
执行this.showMsg()方法时会报错，因为this指向的是$btn这个对象，而这个对象上并不存在showMsg()这个方法，因此报错；
修改方法；只需要将this指向module这个对象即可，可通过bind传入this,如下：
```js 
var module= {
  bind: function(){
    $btn.on('click', function(){
      console.log(this)  // this 指向module
      this.showMsg();
    }.bind(this));      // 这个this指向的是module对象本身
  },
  
  showMsg: function(){
    console.log('饥人谷');
  }
}
```

##原型链相关问题
7：有如下代码，解释Person、 prototype、__proto__、p、constructor之间的关联。
```js 
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('My name is :' + this.name);
}
var p = new Person("若愚")
p.sayName();
```



8. 上例中，对对象 p可以这样调用 p.toString()。toString是哪里来的? 画出原型图?并解释什么是原型链。


9. 对String做扩展，实现如下方式获取字符串中频率最高的字符 
```js 
var str = 'ahbbccdeddddfg';

str.__proto__.getMostOften = function(){
  var count = {};
  var _this = this;
 
  for(var i = 0; i < _this.length; i++) {
    if (count[_this[i]]) {
      count[_this[i]]++;  
    } else {
      count[_this[i]] = 1;
    }
  }
  
  var most = {
    word: _this[0],
    num: count[_this[0]]
  };
  
  for(var val in count){
    if (count[val] > most['num']){
      most['word'] = val;
      most['num'] = count[val];
    }
  }
  return most;
};
var ch = str.getMostOften();
console.log(ch.word);  
```

10. instanceOf有什么作用？内部逻辑是如何实现的？
用于测试一个对象在其原型链中是否存在一个构造函数的prototype属性；该函数在内部进行查找时，会根据原型链一直向上查找，如果找到了则返回true，否则返回false
```js 
function Person(name){
    this.name = name;
}

var student = new Person('hexon');

console.log(student instanceof Person)      //返回 true
console.log(student instanceof Object)      //返回 true
```

##继承相关问题
11. 继承有什么作用?
可以使用已存在的类的定义作为基类建立新的类，在新的类上增加需要属性和方法，也可以继承父类的属性和方法，方便代码的复用和扩展新的功能

12. 下面两种写法有什么区别?
```js 
//方法1
function People(name, sex){
    this.name = name;
    this.sex = sex;
    this.printName = function(){
        console.log(this.name);
    }
}
var p1 = new People('饥人谷', 2)

//方法2
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.printName = function(){
    console.log(this.name);
}
var p1 = new Person('若愚', 27);
```
方法1中将printName方法定义在构造函数上，每次使用new来生成一个Person的实例对象时，都会执行一遍printName，浪费内存，而方法2中将printName方法定义在原型链中，就不会存在方法1的问题

13. Object.create 有什么作用？兼容性如何？
创造拥有指定原型和若干属性的**对象**
兼容性： IE9+

14. hasOwnProperty有什么作用？ 如何使用？
该方法用于判断对象是否具有指定的属性，且该属性必须是自身的属性，不是继承的
```js 
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
var student = new Person('hexon', 17);
student.hasOwnProperty('name');
```
15. 如下代码中call的作用是什么?
```js 
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
function Male(name, sex, age){
    Person.call(this, name, sex);    //这里的 call 有什么作用
    this.age = age;
}
```
通过call函数，将Person中的this指向Male，让Male继承Person的this.name和this.sex属性

16. 补全代码， 实现继承 
```js 
function Person(name, sex){
    // todo ...
    this.name = name;
    this.sex = sex;
} 

Person.prototype.getName = function(){
    // todo ...
    return this.name; 
};    

function Male(name, sex, age){
   //todo ...
    Person.call(this, name, sex);
    this.age = age;
}

//todo ...
Male.prototype = Object.create(Person.prototype);
Male.prototype.constructor = Male;

Male.prototype.printName = function(){
    console.log(this.getName());
}
Male.prototype.getAge = function(){
    //todo ...
    console.log(this.age);
};

var ruoyu = new Male('若愚', '男', 27);
ruoyu.printName();
```