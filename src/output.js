import Table from 'cli-table'

var table = new Table({
  head: ['id', 'tag', 'properties', 'value']
})

function formatPatches (patches) {
  return patches.map(function (pc, idx) {
    var props = pc.vNode.properties

    return [
      idx,
      pc.vNode.tagName,
      ['#', props.id, ' .', props.className].join(''),
      pc.patch.value.value
    ]
  })
}

export default function (patches) {
  Array.prototype.push.apply(table, formatPatches(patches))

  return table.toString()
}

