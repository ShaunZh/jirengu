1. OOP 指什么？有哪些特性
指面向对象编程；
OOP主要包括：继承、封装和多态三个特性
  - 继承： 指一个对象直接使用另一个对象的属性和方法
    js中并不存在原生的继承机制，可以通过原型链的方式实现继承
    - **"父类自身"属性和方法的继承**
    ```js 
    function Person(name, age){
      this.name = name;
      this.age = age;
      this.sayHello = function() {
        console.log('hello');
      };
    }

    Person.prototype.sayName = function(){
      console.log(this.name);
    }

    Person.prototype.sayAge = function(){
      console.log(this.age);
    }

    function Student(name, age, sex) {
      // 如果要继承其他类的属性和方法，就是需要改变this的指向——将this指向使用Student创建的实例对象；为什么是改变this的指向呢？考虑使用new创建一个对象实例需要执行的四个步骤，就可以理解为什么需要改变this了
      
      //方法一：使用call改变this，传入参数列表(call与apply不同的是call传入的是参数列表，而apply传入的是数组或类数组对象)
      Peron.call(this, name, age);

      //方法二：使用apply改变this
      Person.apply(this, arguments);

      //方法三：使用bind改变this，返回一个新函数，并且将this指向传入的第一个参数（注意：是返回一个新函数，bind后面的this指向的是使用Student创建的实例对象）
      Person.bind(this)(name, age);

      this.sex = sex;
    }

    var hexon = new Student('hexon', 17, 'male');
    console.log(hexon.name);    
    console.log(hexon.age);
    console.log(hexon.sex);
    hexon.sayHello();
    // 以下两句报错，提示hexon上没有这两个方法
    hexon.sayName();
    hexon.sayAge();

    ```
    **注意：**以上只能继承"父类自身"的属性和方法，并不能继承Person原型上的方法

    - **继承"父类"原型上的方法**
    要继承父类原型上的方法，就是要将子类的prototype指向父类的prototype
    两种方法：
    **第一种： `Object.create()`方法**
    `Object.create()`方法：创建一个拥有指定原型和若干属性的对象，并将其返回
    ```js 
    function Person(name, age){
      this.name = name;
      this.age = age;
      this.sayHello = function() {
        console.log('hello');
      };
    }

    Person.prototype.sayName = function(){
      console.log(this.name);
    }

    Person.prototype.sayAge = function(){
      console.log(this.age);
    }

    function Student(name, age, sex) {
      // 如果要继承其他类的属性和方法，就是需要改变this的指向——将this指向使用Student创建的实例对象；为什么是改变this的指向呢？考虑使用new创建一个对象实例需要执行的四个步骤，就可以理解为什么需要改变this了
      
      //方法一：使用call改变this，传入参数列表(call与apply不同的是call传入的是参数列表，而apply传入的是数组或类数组对象)
      Peron.call(this, name, age);

      //方法二：使用apply改变this
      Person.apply(this, arguments);

      //方法三：使用bind改变this，返回一个新函数，并且将this指向传入的第一个参数（注意：是返回一个新函数，bind后面的this指向的是使用Student创建的实例对象）
      Person.bind(this)(name, age);

      this.sex = sex;
    }

    // 将Student的原型指向Prson的原型对象
    Student.prototype = Object.create(Person.prototype);
    // 因为prototype原型对象中有一个constructor，它指向对象的构造函数，
    // Peroson.prototype.constructor ==> Person，因此Student.prototype.constructor ==> Person，
    // 所以需要手动将Student.prototype.constructor ==> Student
    Student.prototype.constructor = Student;
    //以上两句便完成了原型的继承


    Student.prototype.saySex = function(){
      console.log(this.sex);
    }


    var hexon = new Student('hexon', 17, 'male');
    console.log(hexon.name);    
    console.log(hexon.age);
    console.log(hexon.sex);
    hexon.sayHello();
    // 以下两句就不会报错
    hexon.sayName();    // 输出 hexon
    hexon.sayAge();     // 输出 17
    ```
    **第二种方法：**
    ```
    function fn(){}         // 创建一个空函数
    fn.prototype = Person.prototype;  // 将该函数的prototype指向Person.prototype
    Student.prototype = new fn();   // new 一个fn()对象实例，该对象实例的原型对象指向Person.prototype，这样Student.prototype就指向了Person.prototype
    ```



2. 如何通过构造函数的方式创建一个拥有属性和方法的对象? 
```js 
function Temp(name, age){
    this.name = name;
    this.age = age;
    
    this.sayName = function() {
        console.log(this.name);
    }
    this.sayAge = function(){
        console.log(this.age);
    }
}
var person = new Temp('hexon', 26);
person.sayName()
```
3. prototype 是什么？有什么特性 
prototype表示的函数属性
对于一个对象obj，`obj.__proto__`指向的是它的构造函数的原型，假设该构造函数名为`Temp`，那么`obj.__proto__ === Temp.protoType`；
对于每一个函数，都有`prototype`属性指向它的原型
prototype具有继承的特性

4. 画出如下代码的原型图
```js 
function People (name){
  this.name = name;
  this.sayName = function(){
    console.log('my name is:' + this.name);
  }
}

People.prototype.walk = function(){
  console.log(this.name + ' is walking');  
}

var p1 = new People('饥人谷');
var p2 = new People('前端');
```

5. 创建一个 Car对象，拥有属性name、color、status；拥有方法run，stop，getStatus 
创建对象的方法：对象字面量或Object构造函数、工厂模式、构造函数、构造函数结合原型
**对象字面量创建对象**
```js 
var obj = {
    name : 'hexon',
    age : 26,

    sayName : function(){
        return this.name;
    }
}
console.log(obj.sayName);
```

**Object构造函数**
```js 
var obj = new Object();
obj.name = 'hexon';
obj.age = 26;
obj.sayName = function(){
    return this.name;
}
console.log(obj.sayName());
```
使用字面量和OBject的缺点：每创建一个对象都会执行同样的代码，产生了大量的重复代码，浪费内存，同时暴露了创建对象的过程，因为这个原因，便产生了 **工厂模式**

**工厂模式**
特点：抽象了创建具体对象的过程，不暴露内部细节，
缺点：无法知道对象的类型，它们的原型都是Object
```js
function car(name, color, status){
    var obj = {
      name: name,
      color: color,
      status: status,
      
      run: function(){
        status = 'run';
      },
      
      stop: function(){
        status = 'stop';
      },
      
      getStatus: function(){
        return status;
      }
    };
  return obj;
}
var newCar = Car('兰博基尼', 'red', 'stop');
```

**构造函数**
通过构造函数来创建特定类型的对象
```js 
function Car(name, color, status){
    this.name = name;
    this.color = color;
    this.status = status;

    this.run = function(){
        this.status = 'run';
    };

    this.stop = function(){
        this.status = 'stop';
    };

    this.getStatus = function(){
        return this.status;
    }
}

var newCar = new Car('法拉利', 'red', 'stop');
```

**构造函数+原型**会创建一个方法
通过构造函数创建对象时，每次都必须重复同样的内容，占用内存，可以通过将共用方法放在原型上，可避免这个问题
```js 
function Car(name, color, status){
    this.name = name;
    this.color = color;
    this.status = status;
    
    Car.prototype.run = function(){
        this.status = 'run';
    };

    Car.prototype.stop = function(){
        this.status = 'stop';
    };

    Car.prototype.getStatus = function(){
        return this.status;
    }
}
```


6. 创建一个 GoTop 对象，当 new 一个 GotTop 
对象则会在页面上创建一个回到顶部的元素，点击页面滚动到顶部。拥有以下属性和方法
[代码示例](http://js.jirengu.com/losod);

7. 实现一个木桶布局的图片墙
[演示代码](https://output.jsbin.com/vuvizac/1)





