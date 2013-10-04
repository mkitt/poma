window.poma = (function() {

  var poma = function() {}

  var _metafunc = function(node) {
    return (node instanceof Node) ? '_execute' : '_executes'
  }

  poma._execute = function(node, fn) {
    var args = Array.prototype.slice.call(arguments, 2)
    node[fn].apply(node, args)
    return node
  }

  poma._executes = function(nodes, fn) {
    var args = Array.prototype.slice.call(arguments, 2)
    for (var i = 0, len = nodes.length; i < len; i += 1) {
      nodes[i][fn].apply(nodes[i], args)
    }
    return nodes
  }

// ## PUBLIC ##

  poma.on = function(node, type, fn) {
    var f = _metafunc(node)
    return poma[f](node, 'addEventListener', type, fn, false)
  }

  poma.off = function(node, type, fn) {
    var f = _metafunc(node)
    return poma[f](node, 'removeEventListener', type, fn, false)
  }

  poma.once = function(node, type, fn) {
    var handler = function(e) {
      poma.off(node, type, handler)
      fn(e)
    }
    poma.on(node, type, handler)
    return node
  }

  poma.event = function(type, data, target) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    e.eventName = type
    e.target = target || document
    e.data = data || {}
    return e
  }

  poma.trigger = function(node, type, data) {
    var e = (typeof type === 'string') ? poma.event(type, data, node) : type
    var f = _metafunc(node)
    return poma[f](node, 'dispatchEvent', e)
  }


  poma.matches = (function() {
    var b = document.body
    return b.matches || b.webkitMatchesSelector || b.mozMatchesSelector || b.msMatchesSelector
  })();

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


  poma.plugin = function(object, fn) {
    if (typeof poma[fn] === 'function')
      return console.error(fn + ' already exists on poma');
    poma[fn] = object[fn]
    return poma[fn]
  }

  return poma

})();

