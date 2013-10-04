window.zip = (function() {

  var zip = function() {}

  zip.matches = (function() {
    var b = document.body
    return b.matches || b.webkitMatchesSelector || b.mozMatchesSelector || b.msMatchesSelector
  })();


  zip.on = function(node, type, fn) {
    node.addEventListener(type, fn, false)
    return node
  }

  zip.off = function(node, type, fn) {
    node.removeEventListener(type, fn, false)
    return node
  }

  zip.once = function(node, type, fn) {
    var handler = function(e) {
      node.removeEventListener(type, handler, false)
      fn(e)
    }
    node.addEventListener(type, handler, false)
    return node
  }

  zip.trigger = function(node, type, data) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    e.eventName = type
    e.target = node
    e.data = data || {}
    node.dispatchEvent(e)
    return node
  }

  zip.parentSelector = function(element, selector) {
    while (element) {
      if (zip.matches.bind(element)(selector)) {
        return element
      } else {
        element = element.parentNode
      }
    }
    return false
  }

  zip.parentSelectorAll = function(element, selector) {
    console.error('zip.parentSelectorAll is not implemented!!!')
  }

  // http://stackoverflow.com/questions/5080028/what-is-the-most-efficient-way-to-concatenate-n-arrays-in-javascript
  // http://jsperf.com/multi-array-concat/7
  zip.concat = function() {
    console.error('zip.concat is not implemented!!!')
  }


  zip.remove = function(node) {
    return node.parentNode.removeChild(node)
  }

  zip.offset = function(node) {
    console.error('zip.offset is not implemented!!!')
  }

  zip.position = function(node) {
    console.error('zip.position is not implemented!!!')
  }


  zip.plugin = function(object, fn) {
    if (zip[fn]) {
      console.error('function already exists on zip', object, fn)
      return false
    }
    zip[fn] = object[fn]
    return zip[fn]
  }

  return zip

})();

