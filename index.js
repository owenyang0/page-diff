require('babel/register')
var app = require('./src')

app
.diff('https://test.aami.com.au/', 'https://www.aami.com.au/')
.then(function (patches) {
  // console.log(patches.map(function(p){
  //   return {
  //     patch: p.patch.value,
  //     tag: p.vNode.tagName
  //   }
  // }))
  console.log(patches)
})
.catch(console.log)
