window.poma = (function() {

  var poma = function() {}

  poma.matches = (function() {
    var b = document.body
    return b.matches || b.webkitMatchesSelector || b.mozMatchesSelector || b.msMatchesSelector
  })();


  poma.on = function(node, type, fn) {
    node.addEventListener(type, fn, false)
    return node
  }

  poma.off = function(node, type, fn) {
    node.removeEventListener(type, fn, false)
    return node
  }

  poma.once = function(node, type, fn) {
    var handler = function(e) {
      node.removeEventListener(type, handler, false)
      fn(e)
    }
    node.addEventListener(type, handler, false)
    return node
  }

  poma.trigger = function(node, type, data) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    e.eventName = type
    e.target = node
    e.data = data || {}
    node.dispatchEvent(e)
    return node
  }

  poma.parentSelector = function(element, selector) {
    while (element) {
      if (poma.matches.bind(element)(selector)) {
        return element
      } else {
        element = element.parentNode
      }
    }
    return false
  }

  poma.parentSelectorAll = function(element, selector) {
    console.error('poma.parentSelectorAll is not implemented!!!')
  }

  // http://stackoverflow.com/questions/5080028/what-is-the-most-efficient-way-to-concatenate-n-arrays-in-javascript
  // http://jsperf.com/multi-array-concat/7
  poma.concat = function() {
    console.error('poma.concat is not implemented!!!')
  }


  poma.remove = function(node) {
    return node.parentNode.removeChild(node)
  }

  poma.offset = function(node) {
    console.error('poma.offset is not implemented!!!')
  }

  poma.position = function(node) {
    console.error('poma.position is not implemented!!!')
  }


  poma.plugin = function(object, fn) {
    if (poma[fn]) {
      console.error('function already exists on poma', object, fn)
      return false
    }
    poma[fn] = object[fn]
    return poma[fn]
  }

  return poma

})();

