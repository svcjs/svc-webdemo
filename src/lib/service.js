import { Action, SimpleChecker } from 'svc-action'
import { State } from 'svc-state'
import { Storage, SyncedStorageProvider } from 'svc-storage'
import { Http, Route } from 'svc-web'

let states = new State('binds')
let storage = new Storage()
let http = new Http('//' + location.host)
let route = new Route(states)
storage.setProvider(new SyncedStorageProvider(localStorage, 'getItem', 'setItem', 'removeItem'))

let actions = new Action({
  states: states,
  storage: storage,
  route: route,
  http: http
})

actions.addFilter(SimpleChecker)

http.transmitHeaders.push('SID')

export { states, storage, actions, route, http }
