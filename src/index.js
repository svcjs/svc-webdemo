import { states, storage, actions, route, http } from 'lib/service'
import Login from './views/common/Login'
import Main from './views/common/Main'
import accountActions from './actions/common/accounts'
import groupActions from './actions/demo/groups'
// import appleActions from './actions/demo/apples'
// import orangeActions from './actions/demo/oranges'
// import bananaActions from './actions/demo/bananas'

// 注册服务
actions.register('accounts', accountActions);
actions.register('groups', groupActions);
// actions.register('apples', appleActions);
// actions.register('oranges', orangeActions);
// actions.register('bananas', bananaActions);

// 选择器
window.$ = function (selector) {
  if (!selector) return document.body
  return document.querySelector(selector)
}

// 设置根路由Root
route.Root = {
  getSubView(subName){
    switch (subName) {
      case 'login':
        return new Login()
      case 'main':
        return new Main()
    }
  }
}

// 从路由入口启动
route.bindHash()

states.bind('accountLogined', (data) => {
  if (data.accountLogined) {
    if (location.hash.length < 2 || !location.hash.substring(2).startsWith('main')) {
      route.go('/main/score')
    } else {
      route.go(location.hash.substring(1))
    }
  } else {
    route.go('/login')
  }
})

window.addEventListener('load', () => {
  actions.call('accounts.hello').catch((err) => {
    $().innerHTML = '<h3>' + err.message + '</h3>'
  })
})

