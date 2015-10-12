import request from 'request'
import hyper from 'virtual-dom/h'

import parse from './html2h'

export default function dom(url) {
  return new Promise((resolve, rej) => {
    request(url, (err, response, body) => {
      if (err) {
        return rej(err)
      }
      try {
        parse(body, (e, scr) => {
          var h = hyper
          var result
          if (e) {
            return rej(e)
          }

          try {
            result = eval(['h("document", [', trim(scr), '])'].join(''))
          } catch (evalErr) {
            console.log(evalErr.stack)
            result = scr
          }

          resolve(result)
        })
      } catch (e) {
        return rej(e)
      }
    })
  })
}

function trim(str) {
  return str && str.trim && str.trim().replace(/(^\s+)|(\s+$)/g, '')
}
