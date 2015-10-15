import Table from 'cli-table'

// VirtualPatch.NONE = 0
// VirtualPatch.VTEXT = 1
// VirtualPatch.VNODE = 2
// VirtualPatch.WIDGET = 3
// VirtualPatch.PROPS = 4
// VirtualPatch.ORDER = 5
// VirtualPatch.INSERT = 6
// VirtualPatch.REMOVE = 7
// VirtualPatch.THUNK = 8

var table = new Table({
  head: ['id', 'first value', 'second value', 'tag', 'properties'],
  colWidths: [5, 50, 50, 20, 30]
})

function formatPatches (patches) {
  return patches.map(function (pc, idx) {
    return [idx].concat(format(pc))
  })
}

function format (patch) {
  var typeFuns = {
    '1': textPatch,
    '4': propPatch
  }

  return selectFormat(typeFuns, patch.type)(patch)
}

function selectFormat (mappingFuns, type) {
  return mappingFuns[type] || defaultPatch
}

function propPatch (patch) {
  var tagFuns = {
    'INPUT': inputPatch
  }

  var tag = patch.vNode.tagName
  var tagFun = selectFormat(tagFuns, tag)

  return tagFun(patch)

  function inputPatch (patch) {
    var props = patch.vNode.properties
    var outProps = ['#', props.id || 'null', ' .', props.className || 'null'].join('')

    return [
      props.value.value,
      patch.patch.value.value,
      tag,
      outProps
    ]
  }
}

function textPatch (patch) {
  return [patch.vNode.text, patch.patch.text]
}

function defaultPatch (patch) {
  var type = patch.type
  var tag = patch.vNode && patch.vNode.tagName

  return ['Haven\'t been implemented', '', 'type ' + type + ' | ' + tag]
}

export default function (patches) {
  Array.prototype.push.apply(table, formatPatches(patches))

  return table.toString()
}


