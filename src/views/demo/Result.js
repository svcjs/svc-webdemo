import { states, storage, actions, route, http, tpl } from 'lib/service'

export default class {
  constructor (title) {
    this.html = require('./Result.html')
    this.stateBinds = ['selectedGroupInfo']
    this.data = {title: title}
  }

  onShow (path, nextPath, nextView) {
  }
}
