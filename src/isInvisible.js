export default function isInvisible(patch) {
  if (patch.vNode &&
    patch.vNode.properties &&
    patch.vNode.properties.hidden) {
    return false
  } else if (patch.vNode &&
    patch.vNode.properties &&
    patch.vNode.properties.type === 'hidden') {
    return false
  }
  return true
}
