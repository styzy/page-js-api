# 页面层路由

## 路由概念

和框架层路由类似，页面层路由提供开发者在子页面操作框架的能力。

<div class="box info">为了保证代码的可移植性，页面层路由所有的api都有非框架环境<code>polyfill（垫片）</code>，保证代码在非框架情况下仍然可以正常运行。</div>

## 路由加载

为了保证标签页和框架层的通信畅通和交互方便，我们推荐在每个标签页的 js 内加上入口方法：

```javascript
// 入口方法
window.init = function(page, globalData) {
    // TODO 业务
}
```

上面赋值给 window 对象的`init`属性的匿名方法，会被框架内部调用，调用时机是紧跟在 window 对象的`onload`钩子之后。方法传递的`page`参数就是页面层的路由实例，通过它我们可以在页面层获得和框架层近乎一样的路由能力。`globalData`为实例化参数配置中定义的全局传递参数。

下面我们就对页面层路由实例`page`进行介绍。

<h2 id="child.pageId">pageId 属性</h2>

`pageId`属性返回当前标签页的`id`

```javascript
// 获取当前标签页id
var pageId = page.pageId
```

<h2 id="child.sourcePageId">sourcePageId 属性</h2>

`sourcePageId`属性返回当前标签页的来源页面(即打开当前标签页的页面)的`id`，框架层打开的标签页，`sourcePageId`值为`null`

```javascript
// 获取来源页面id
var sourcePageId = page.sourcePageId
```

<h2 id="child.pageData">pageData 属性</h2>

`pageData`属性返回当前标签页的携带参数

```javascript
// 源页面
page.open({
    url: 'module1.html',
    data: 666
})

// module1.html
var pageData = page.pageData
console.log(pageData === 666) // true
```

<h2 id="child.globalData">globalData 属性</h2>

`globalData`属性返回全局携带参数

```javascript
// 框架层
var page = new Page({
    globalData: 'hello word'
})

page.open({
    url: 'module1.html'
})

// module1.html
var pageData = page.globalData
console.log(pageData === 'hello word') // true
```

<h2 id="child.open">open(url: String | options: Object)</h2>

页面层路由实例的`open`方法为完全引用框架层路由实例的`open`方法，具体使用说明请参考[框架层路由实例 open 方法](#open)

<h2 id="child.refresh">refresh([pageId: String])</h2>

`refresh`方法用于刷新标签页面，和框架层的`refresh`方法功能一样，只是当`pageId`省略时，默认刷新当前标签页面。

<h2 id="child.reload">reload([pageId: String])</h2>

`reload`方法用于重新加载标签页面，和框架层的`reload`方法功能一样，只是当`pageId`省略时，默认刷新当前标签页面。(`reload`会重新渲染标题和视图元素。)

<h2 id="child.redirect">redirect(url: String[, pageId: String])</h2>

`redirect`方法用于重定向标签页面，和框架层的`redirect`方法功能一样，只是当`pageId`省略时，默认重定向当前标签页面。

<h2 id="child.focus">focus(pageId: String)</h2>

`focus`方法用于为某个标签页设置焦点，参数为`pageId`

<h2 id="child.close">close([pageId: String])</h2>

`close`方法用于关闭标签页面。接收一个`pageId`参数，当该参数省略时，默认关闭当前标签页面，该方法和框架层的`cloes`不一样的是，无法使用强制关闭。

<h2 id="child.closeAll">closeAll()</h2>

`closeAll`方法用于关闭所有标签页面。和框架层的`closeAll`唯一的区别是，无法使用强制关闭。

<h2 id="child.postMessage">postMessage(payload: Any[, pageId: String])</h2>

页面层路由实例的`postMessage`方法和框架层的`postMessage`方法完全相同，具体使用说明请参考[框架层路由实例 postMessage 方法](#postMessage)

<h2 id="child.setMessageReceiver">setMessageReceiver(messageReceiver: Function)</h2>

`setMessageReceiver`方法用于设置当前标签页面的消息接收器，参数为消息接收器方法，该方法被调用时，会返回`message`消息体。

```javascript
var messageReceiver = function(message) {
    console.log(message.data)
}

page.setMessageReceiver(messageReceiver)
```

<h2 id="child.getMessageReceiver">getMessageReceiver()</h2>

`getMessageReceiver`方法返回当前标签页面的消息接收器函数，默认为`null`。

```javascript
page.getMessageReceiver() // return null

var messageReceiver = function(message) {
    console.log(message.data)
}

page.setMessageReceiver(messageReceiver)

page.getMessageReceiver() === messageReceiver // true
```

<h2 id="child.syncHeight">syncHeight()</h2>

`syncHeight`方法用来手动同步当前标签页的高度到框架层。和框架层的`syncHeight`的区别是，无法指定目标标签页面。

<h2 id="child.setTitle">setTitle(title: String)</h2>

`setTitle`方法提供手动对标签页的标题进行赋值的能力,参数为标题`title`。和框架层的`setTitle`的区别是，无法指定目标标签页面。

<h2 id="child.recoverCache">recoverCache</h2>

页面层路由实例的`recoverCache`方法和框架层的`recoverCache`方法完全相同，具体使用说明请参考[框架层路由实例 recoverCache 方法](#recoverCache)

<h2 id="child.clearCache">clearCache</h2>

页面层路由实例的`clearCache`方法和框架层的`clearCache`方法完全相同，具体使用说明请参考[框架层路由实例 clearCache 方法](#clearCache)

<h2 id="child.messageReceiver">messageReceiver（已废弃）</h2>

<div class="box danger">注意：该属性已经在<code>v1.3.0</code>版本废弃，替换方案请参考<a href="#child.setMessageReceiver">setMessageReceiver方法
</a></div>

`messageReceiver`属性用于设置当前页面的消息接收器。

```javascript
page.messageReceiver = function(message) {
    console.log(message.data)
}
```

<h2 id="child.getPageId">getPageId()（已废弃）</h2>

<div class="box danger">注意：该方法已经在<code>v1.3.0</code>版本废弃，替换方案请参考<a href="#child.pageId">pageId属性
</a></div>

`getPageId`方法返回当前标签页的`pageId`。

```javascript
var paegId = page.getPageId()
```

<h2 id="child.getSourcePageId">getSourcePageId()（已废弃）</h2>

<div class="box danger">注意：该方法已经在<code>v1.3.0</code>版本废弃，替换方案请参考<a href="#child.sourcePageId">sourcePageId属性
</a></div>

`getSourcePageId`方法返回当前标签页的来源页面的`pageId`，当来源页面为框架层时，返回值为`null`

```javascript
// 框架层
var homePageId = page.open('home.html')

// home.html
page.getSourcePageId() // return null
page.open('module.html')

// module.html
page.getSourcePageId() // return homePageId
```

<h2 id="child.getPageData">getPageData()（已废弃）</h2>

<div class="box danger">注意：该方法已经在<code>v1.3.0</code>版本废弃，替换方案请参考<a href="#child.pageData">pageData属性
</a></div>

`getPageData`方法返回`open`方法中`data`参数所传递的值。

```javascript
// 框架层
var homePageId = page.open({
    url: 'home.html',
    data: 1
})

// home.html
page.getPageData() === 1 // true
```

<h2 id="child.getGlobalData">getGlobalData()（已废弃）</h2>

<div class="box danger">注意：该方法已经在<code>v1.3.0</code>版本废弃，替换方案请参考<a href="#child.globalData">globalData属性
</a></div>

`getGlobalData`方法返回实例化参数配置中的全局传递参数。

```javascript
var globalData = page.getGlobalData()
```
