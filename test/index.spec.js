import fs from 'fs'
import path from 'path'
import nock from 'nock'

import index from '../src/index'

before(cb => {
  fs.readFile(path.join(__dirname, './siteA.html'), (err, siteA) => {
    nock('http://a.com/')
    .get('/')
    .reply(200, siteA.toString())

    fs.readFile(path.join(__dirname, './siteB.html'), (err, siteB) => {
      nock('http://b.com/')
      .get('/')
      .reply(200, siteB.toString())
      cb()
    })
  })
})

describe('dom', () => {
  it('should be able to load two page from urls', (done) => {
    index.diff('http://a.com/', 'http://b.com')
    .then((patches) => {
      const {
        ...others
      } = patches

      patches.should.be.exist
      patches.should.be.String
      others.should.be.an.Object
      others.should.not.be.Empty
      done()
    })
    .catch(err => {
      console.log('error', err.stack)
      done()
    })
  })
})
