import d from 'virtual-dom/diff'

import dom from './dom'
import isInvisible from './isInvisible'

export default {
  diff,
  patchFilter
}

function diff(urlA, urlB) {
  return Promise.all([dom(urlA), dom(urlB)])
    .then(([domA, domB]) => {
      var patches = d(domA, domB)
      return Promise.resolve(patchFilter(patches))
    })
}

function patchFilter(patches) {
  const {a, ...others} = patches

  return Object.keys(others)
    .filter(key => isInvisible(others[key]))
    .map(key => others[key])
}
