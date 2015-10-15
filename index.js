require('babel/register')
var app = require('./src')
var output = require('./src/output')

var urlA = 'https://www.npmjs.com/search?q=table'
var urlB = 'https://www.npmjs.com/search?q=cli-table'

app
  .diff(urlA, urlB)
  .then(function (patches) {
    console.log(output(patches))
  })
  .catch(console.error)
