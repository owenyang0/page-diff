require('babel/register')
var app = require('./src')

var output = require('./src/output')

app
.diff('https://www.baidu.com/', 'https://www.baidu.com/')
.then(function (patches) {
  console.log(output(patches))
})
.catch(console.error)
