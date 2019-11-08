# 配置框架

## 实例化

使用Page.js第一步需要在父页面对框架进行实例化。

```javascript
// 实例化
var page = new Page()
```

这样就简单的完成了实例化，当然你也可以通过设置 `实例化参数` 来满足各种需求，比如:

```javascript
// 使用configure实例化
var page = new Page({
	// 开发者模式
	devMode: true, 
	// 设定标题容器
	titleContainer: '#titleContainer', 
	// 设定页面容器
	viewContainer: '#viewContainer', 
	// 页面上限
	limit: 99 
})
```

具体的参数请参考 [实例化参数](#实例化参数)


## 实例化参数

<div id="configureTableCtn"></div>

其中`globalRoute`属性可配置全局路由参数，具体请查看[全局路由参数](#全局路由参数)

## 全局路由参数

每个路由的参数会自动继承全局路由的参数。

<div id="globalRouteTableCtn"></div>