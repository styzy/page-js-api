import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import '../stylus/common.styl'
import '../stylus/highlight.styl'
import '../stylus/index.styl'
import pagejs, { api } from '@styzy/page-js'
import Free from '@styzy/free-js'

import md_guide from '../markdown/guide.md'
import md_configuration from '../markdown/configuration.md'
import md_parentRouter from '../markdown/parentRouter.md'
import md_childRouter from '../markdown/childRouter.md'

const free = new Free()

window.addEventListener('load', init)

function init() {
	initVersion()
	initMenu()
	initMarkdown()
	initApi()
}

function initVersion() {
	free('#version').innerHTML = pagejs.version
}

function initMenu() {
	var menuList = free('.menu')
	for (var index = 0; index < menuList.length; index++) {
		var menu = menuList[index]
		if (menu.querySelector('.menu-list') && menu.querySelector('.menu-list').querySelectorAll('.menu-item')) {
			menu.querySelector('.menu-title').addEventListener('click', function() {
				menuExpandHandler.call(this.parentNode)
			})
		}
	}

	function menuExpandHandler() {
		var isExpand = this.getAttribute('expand') === 'true'
		for (var index = 0; index < menuList.length; index++) {
			var menu = menuList[index]
			if (menu === this) {
				if (isExpand) {
					this.setAttribute('expand', 'false')
				} else {
					this.setAttribute('expand', 'true')
				}
			} else {
				menu.setAttribute('expand', 'false')
			}
		}
	}
}

function initMarkdown() {
	free('#doc').innerHTML = md_guide + md_configuration + md_parentRouter + md_childRouter
}

function initApi() {
	let configHeadArray = [
			{
				name: '属性',
				width: '5rem'
			},
			{
				name: '类型',
				width: '8rem'
			},
			{
				name: '默认值',
				width: '5rem'
			},
			{
				name: '是否必须',
				width: '4rem'
			},
			{
				name: '描述',
				width: ''
			}
		],
		extend = Symbol('extend')
	let el_config = free('#configureTableCtn')
	let el_config_table = createTable(api.configuration, configHeadArray)
	el_config.appendChild(el_config_table)

	let el_goubalRoute = free('#globalRouteTableCtn')
	let el_goubalRoute_table = createTable(api.globalRoute, configHeadArray)
	el_goubalRoute.appendChild(el_goubalRoute_table)

	let el_route = free('#routeTableCtn')
	let globalRoute = Object.assign({}, api.globalRoute)
	for (const key in globalRoute) {
		const item = globalRoute[key]
		item.default = extend
	}
	let el_route_table = createTable(Object.assign(api.route, globalRoute), configHeadArray)
	el_route.appendChild(el_route_table)

	function createTable(apiObject, headArray) {
		let el = document.createElement('table'),
			el_tr = document.createElement('tr')

		headArray.forEach(head => {
			let el_th = document.createElement('th')
			el_th.innerHTML = head.name
			el_th.style.width = head.width
			el_tr.appendChild(el_th)
		})
		el.appendChild(el_tr)

		for (const apiName in apiObject) {
			if (apiObject.hasOwnProperty(apiName)) {
				const apiItem = apiObject[apiName]
				let el_tr = document.createElement('tr'),
					el_td_name = document.createElement('td'),
					el_td_type = document.createElement('td'),
					el_td_default = document.createElement('td'),
					el_td_required = document.createElement('td'),
					el_td_desc = document.createElement('td')
				el_td_name.innerHTML = `<code>${apiName}</code>`
				el_td_type.innerHTML =
					apiItem.type instanceof Array ? apiItem.type.map(typeFun => `<code>${typeFun.name}</code>`).join(' |<br>') : apiItem.type ? `<code>${apiItem.type.name}</code>` : '任何类型'
				el_td_type.className = 'type'
				el_td_default.innerHTML =
					apiItem.default === extend ? '<code>继承globalRoute</code>' : `<code>${typeof apiItem.default === 'string' ? `'${apiItem.default}'` : JSON.stringify(apiItem.default)}</code>`
				el_td_required.innerHTML = apiItem.required ? 'true' : '-'
				let desc = apiItem.desc
				if (desc.indexOf('[') !== -1 && desc.indexOf(']') !== -1) {
					desc = desc.replace('[', '<code>')
					desc = desc.replace(']', '</code>')
				}
				el_td_desc.innerHTML = desc
				el_td_desc.style.textAlign = 'left'
				el_tr.appendChild(el_td_name)
				el_tr.appendChild(el_td_type)
				el_tr.appendChild(el_td_default)
				el_tr.appendChild(el_td_required)
				el_tr.appendChild(el_td_desc)
				el.appendChild(el_tr)
			}
		}
		return el
	}
}
