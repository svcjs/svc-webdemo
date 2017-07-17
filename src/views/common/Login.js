import { storage, actions } from 'lib/service'

export default class {
  constructor () {
    this.html = require('./Login.html')
  }

  onShow (path, nextPath, nextView) {
    storage.get('accountId').then((value) => {
      this.$('[name=account]').value = value
    })
    this.$('[name=password]').value = ''
  }

  login () {
    actions.call('accounts.login', {account: this.$('[name=account]').value, password: this.$('[name=password]').value})
      .then(() => {
        this.$('[name=password]').value = ''
      }).catch((err) => {
      this.setData({error: err.message})
    })
  }

}
