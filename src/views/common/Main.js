import { states, storage, actions, route, http, tpl } from 'lib/service'
import Result from '../demo/Result'

export default class {
  constructor () {
    this.html = require('./Main.html')
    this.stateBinds = ['currentTopGroups', 'currentGroups']
    this.routeBinds = ['selectedTopGroup', 'selectedGroup']
  }

  getSubView (subName) {
    switch (subName) {
      case 'score':
        return new Result('成绩')
      case 'homework':
        return new Result('作业')
      case 'test':
        return new Result('考试')
    }
  }

  onShow (path, nextPath, nextView) {
    actions.call('groups.getTopGroups').then(() => {
      this.selectTopGroup(this.data.selectedTopGroup, true)
    })
  }

  selectTopGroup (topGroup, isAuto) {
    this.setData({selectedTopGroup: topGroup})
    if(!isAuto){
      this.setData({selectedGroup: null})
      states.set({selectedGroupInfo: null})
    }
    actions.call('groups.getGroups', {topGroup:topGroup}).then(() => {
      if (this.data.selectedGroup) {
        this.selectGroup(this.data.selectedGroup, isAuto)
      }
    })
  }

  selectGroup (group) {
    this.setData({selectedGroup: group})
    for(let groupInfo of states.state.currentGroups){
      if(groupInfo.id === group){
        states.set({selectedGroupInfo: groupInfo})
        break
      }
    }
  }


}