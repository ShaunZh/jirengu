1. ajax 是什么？有什么作用？
ajax是指使用js通过异步的方式向服务发送请求获取数据，并局部更新页面的一种技术。
其主要作用：就是异步获取数据并局部刷新，无需重新加载整个页面，用户体验好。

2. 前后端开发联调需要注意哪些事情？后端接口完成前如何 mock 数据？
需要注意：  1. ajax获取的数据格式确定
            2. css、js、图片资源的请求路径确定
在后端接口完成前，前端可以通过**anywhere**或**server-mock**造数据，只是需要与后端确定数据格式

3. 点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击?
可以设置一个变量isResponse, 在发送前判断其是否已经“响应”（isResponse = true），如果响应了则进入ajax发送请求，并将其设置为“未收到响应”（isResponse = false），当接收到了后端数据，再将设置为“已经响应”（isResponse = true），这样当重复点击时，因为还未收到后端数据，不会进入ajax请求

4. 实现加载更多的功能，效果范例258，后端在本地使用server-mock来模拟数据
项目完整代码：[task12-ajax](https://github.com/ShaunZh/jirengu/tree/master/task12-ajax/load-more)