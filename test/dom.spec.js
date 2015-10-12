import fs from 'fs'
import path from 'path'
import nock from 'nock'

import dom from '../src/dom'

before(cb => {
  fs.readFile(path.join(__dirname, './siteA.html'), (err, siteA) => {
    nock('http://a.com/')
    .get('/')
    .reply(200, siteA.toString())
    cb()
  })
})

describe('dom', () => {
  it('should be able to load two page from urls', (done) => {
    dom('http://a.com/')
    .then(vTree => {
      vTree.should.be.exist
      vTree.should.be.String
      vTree.tagName.should.be.equal('DOCUMENT')
      done()
    })
    .catch(err => {
      console.log('error', err.stack)
      done()
    })
  })
})
