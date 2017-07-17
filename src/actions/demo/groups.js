let _topGroups = [
  {id: '1', name: '高中'},
  {id: '2', name: '初中'},
  {id: '3', name: '小学'},
]

let _groups = {
  '1': [
    {id: '0', name: '高中语文'},
    {id: '1', name: '高中数学'},
    {id: '2', name: '高中英语'},
    {id: '3', name: '高中物理'},
    {id: '4', name: '高中化学'},
    {id: '5', name: '高中生物'}
  ],
  '2': [
    {id: '6', name: '初中语文'},
    {id: '7', name: '初中数学'},
    {id: '8', name: '初中英语'},
    {id: '9', name: '科学'},
  ],
  '3': [
    {id: '10', name: '小学语文'},
    {id: '11', name: '小学数学'},
    {id: '12', name: '小学英语'},
  ]
}

module.exports = {

  getTopGroups: function ({states, resolve, reject}, args) {
    states.set('currentTopGroups', _topGroups)
    resolve()
  },

  _getGroups: {
    topGroup: {
      type: 'string'
    },
  },
  getGroups: function ({states, resolve, reject}, {topGroup}) {
    states.set('currentGroups', _groups[topGroup])
    resolve()
  },

};
