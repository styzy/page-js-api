# 框架层路由

## 路由概念

实例化框架的返回值，就是框架层的路由实例，下面示例中的变量 page 就是框架层路由实例：

```javascript
// 实例化
var page = new page()
```

使用路由实例提供的 api 方法，我们可以完成各种开发需求。

<h2 id="open">open(url: String | options: Object)</h2>

作为路由最基本的功能，`open`方法是打开一切的大门，任何功能都是从这里开始。

```javascript
// 传递url
page.open('http://baidu.com')

// 等同于

// 配置options
page.open({
    url: 'http://baidu.com'
})
```

`open`方法接收一个`String`类型的`url`作为参数，也可使用路由参数`options`来自定义路由,具体请参考[options 路由参数](#options路由参数)

`open`方法在接收的参数正确的情况下，会返回`pageId`，否则返回`false`

```javascript
page.open() // return fasle
page.open('http://baidu.com') // return pageId
```

### options(路由参数)

<div id="routeTableCtn"></div>

<h2 id="refresh">refresh(pageId: String)</h2>

`refresh`方法可以刷新标签页，接收`pageId`作为参数。

```javascript
var pageId = page.open('http://baidu.com')

// 刷新页面
page.refresh(pageId)
```

<h2 id="reload">reload(pageId: String)</h2>

`reload`方法可以重新加载标签页，接收`pageId`作为参数。与`refresh`不同，`reload`会重新渲染标题和视图元素，而`refresh`只会刷新标签页内容。

```javascript
var pageId = page.open('http://baidu.com')

// 重新加载页面和标题
page.reload(pageId)
```

<h2 id="redirect">redirect(url: String, pageId: String)</h2>

`redirect`方法可以对标签页进行重定向，接收第一个参数为`url`，第二个参数为需要重定向的标签页的`pageId`

```javascript
var pageId = page.open('http://baidu.com')

// 刷新页面
page.redirect('http://qq.com', pageId)
```

<h2 id="focus">focus(pageId: String)</h2>

`focus`方法用于为某个标签页设置焦点，参数为`pageId`

```javascript
var pageId1 = page.open('http://baidu.com')
var pageId2 = page.open('http://qq.com')

// 设置第一个页面为焦点
page.focus(pageId1)
```

<h2 id="close">close(pageId: String[, isForce: Boolean])</h2>

`close`方法用于关闭标签页，接收第一个参数为`pageId`，第二个参数`isForce`表示是否强制关闭，当页面设定`closeEnable`参数为`false`时，只能通过强制来关闭。

```javascript
var pageId = page.open('http://baidu.com')
// 成功关闭
page.close(pageId)

var pageId2 = page.open({
    url: 'http://qq.com',
    // 是否允许关闭
    closeEnable: false
})

// 无法关闭
page.close(pageId2)
// 成功关闭
page.close(pageId2, true)
```

<h2 id="closeAll">closeAll([isForce: Boolean])</h2>

`closeAll`方法用于关闭所有标签页，当参数`isForce`为`true`时，将对所有标签页使用强制关闭，否则，将只会关闭所有`closeEnable`为`true`的标签页。

```javascript
page.open('http://baidu.com')
page.open({
    url: 'http://qq.com',
    closeEnable: false
})

page.closeAll() // 无法关闭全部
page.closeAll(true) // 强制关闭全部
```

<h2 id="postMessage">postMessage(payload: Any[, pageId: String])</h2>

`postMessage`方法提供了标签页之间的通信能力，第一个参数`payload`为消息附带发送的数据，支持任意类型数据，第二个参数`pageId`为目标标签页的 id,当`pageId`不传或无效时，会将消息发送给框架层。

```javascript
var homePageId = page.open('home.html')

// 向打开的home.html发送消息
page.postMessage('hello home page!', homePageId)
```

<h2 id="syncHeight">syncHeight(pageId: String)</h2>

`syncHeight`方法用来手动同步标签页的高度，当标签页的页面元素发生改变时，iframe 高度不会发生变化，这时候可以使用`syncHeight`来手动同步高度，需要传递`pageId`作为参数。

```javascript
var pageId = page.open('home.html')

// do something to change the body height of home.html

page.syncHeight(pageId)
```

<h2 id="setTitle">setTitle(pageId: String, title: String)</h2>

`setTitle`方法提供手动对标签页的标题进行赋值的能力，第一个参数为目标`pageId`，第二个参数为标题`title`

```javascript
var pageId = page.open('http://baidu.com')

page.setTiele(pageId, '我是百度，搜索大王')
```

<h2 id="recoverCache">recoverCache()</h2>

`recoverCache`方法尝试使用本地缓存将页面恢复到上一次浏览器关闭时的状态，当实例化参数`cacheEnable`为`false`时，执行本方法无效，会在控制台打印 warning 并返回`false`，当成功从本地缓存恢复页面时，返回`true`

```javascript
if (!page.recoverCache()) {
    // 加载缓存失败，重新打开首页
    page.open('home.html')
}
```

<h2 id="clearCache">clearCache()</h2>

`clearCache`方法用于手动清除本地缓存。

<h2 id="getData">getData([pageId: String])</h2>

`getData`方法用于获取框架传递的数据，当`pageId`不传或为空时，返回全局传递数据。

<div class="box warning">注意：这里返回的所有指针类型数据，都是经过克隆的数据，直接修改并不会影响到原有数据，若需修改请使用<a href="#updateData"><code>updateData</code></a>方法。</div>

```javascript
page.getData() // { test: 1 }
page.getData().test = 2
page.getData() // { test: 1 }
```

<h2 id="updateData">updateData(update: Function[ ,pageId: String])</h2>

`updateData`方法用于修改框架传递的数据，`update`为修改方法，该方法会接收原有数据的克隆数据（无法直接修改），并将返回值作为新的数据保存；`pageId`不传或为空时，表示修改全局传递数据。

```javascript
page.updateData((globalData) => {
    console.log(globalData) // { test : 1 }
    globalData.test = 2
    return { test: 3 }
})
page.getData() // { test : 3 }
```
