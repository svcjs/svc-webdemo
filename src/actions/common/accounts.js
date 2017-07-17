import sha1 from 'sha1';
import crypt from 'crypt';

module.exports = {

  hello: function ({actions, storage, states, resolve, reject}) {
    storage.get(['clientId', 'accountId', 'accountSecret']).then((data) => {
      if (data.accountId && data.accountSecret) {
        actions.call('.login', {account: data.accountId, secret: data.accountSecret}).then((logined) => {
          resolve()
        }).catch(reject)
      } else {
        states.set('accountLogined', false)
        resolve()
      }
    })
  },

  _login: {
    account: {
      type: 'string',
      checker: '^.{3,20}$'
    },
    password: {
      type: 'string',
      checker: '.{3,}'
    }
  },
  login: function ({storage, states, resolve, reject}, args) {
    if (args.password) {
      args.password = crypt.bytesToBase64(sha1(args.account + args.password, {asBytes: true}))
    }

    storage.set({
      accountId: args.account,
      accountSecret: crypt.bytesToBase64(sha1('Secret1234567'))
    })

    states.set({
      accountId: args.account,
      accountName: '测试账号',
      accountLogined: true
    })
    resolve()
  },

  logout: function ({resolve, reject}, {}) {
    storage.set({
      accountId: null,
      accountSecret: null
    })

    states.set({
      accountId: null,
      accountName: null,
      accountLogined: false
    })
    resolve()
  },

};
