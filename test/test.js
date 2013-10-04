/*global poma */
describe('poma', function() {

  var el = document.getElementById('fixture')
  var divs = document.querySelectorAll('div')
  var noop = function(e) {}
  var trace = function(e) {console.log(e)}

  describe('@instance', function() {
    it('is accessible in the global namespace', function() {
      expect(poma).not.to.be(null)
    })

  })


// ## Events ##

  describe('#on', function() {
    it('adds an event listener for Node', function() {
      var callback = sinon.spy()
      poma.on(el, 'click', callback)
      el.click()
      expect(callback.called).to.be.ok()
      poma.off(el, 'click', callback)
    })

    it('returns the node for chaining for Node', function() {
      var node = poma.on(el, 'click', noop)
      expect(node).to.be(el)
      poma.off(el, 'click', noop)
    })

    it('adds event listeners for NodeList', function() {
      var callback = sinon.spy()
      poma.on(divs, 'click', callback)
      divs[1].click()
      expect(callback.called).to.be.ok()
      poma.off(divs, 'click', callback)
    })

    it('returns the node for chaining for NodeList', function() {
      var node = poma.on(divs, 'click', noop)
      expect(node).to.be(divs)
      poma.off(divs, 'click', noop)
    })
  })


  describe('#off', function() {
    it('removes an event listener', function() {
      var callback = sinon.spy()
      poma.on(el, 'click', callback)
      poma.off(el, 'click', callback)
      el.click()
      expect(callback.called).not.to.be.ok()
    })

    it('returns the node for chaining ', function() {
      poma.on(el, 'click', noop)
      var node = poma.off(el, 'click', noop)
      expect(node).to.be(el)
    })

    it('removes event listeners for NodeList', function() {
      var callback = sinon.spy()
      poma.on(divs, 'click', callback)
      poma.off(divs, 'click', callback)
      divs[1].click()
      expect(callback.called).not.to.be.ok()
    })

    it('returns the node for chaining for NodeList', function() {
      poma.on(divs, 'click', noop)
      var node = poma.off(divs, 'click', noop)
      expect(node).to.be(divs)
    })
  })


  describe('#once', function() {
    it('only responds to a single call from a Node', function() {
      var callback = sinon.spy()
      poma.once(el, 'click', callback)
      el.click()
      el.click()
      expect(callback.calledOnce).to.be.ok()
    })

    it('only responds to a single call from a NodeList', function() {
      var callback = sinon.spy()
      poma.once(divs, 'click', callback)
      divs[1].click()
      divs[0].click()
      expect(callback.calledOnce).to.be.ok()
    })
  })


  describe('#event', function() {
    var obj = {baller:1}
    var event = poma.event('custom:event', obj, el)

    it('returns an event with eventName of "custom:event"', function() {
      expect(event.eventName).to.be('custom:event')
    })

    it('returns an event with event.data set to an obj', function() {
      expect(event.data).to.be(obj)
    })

    it('returns an event with event.data set to an an empty object', function() {
      var e = poma.event('custom:event')
      expect(e.data).to.be.empty()
    })

  })

  describe('#trigger', function() {
    var obj = {baller:1}
    var event = poma.event('custom:event', obj)

    it('creates and triggers an event on the document', function() {
      var callback = sinon.spy()
      poma.once(document, 'custom:event', callback)
      poma.trigger(document, 'custom:event', obj)
      expect(callback.called).to.be.ok()
    })

    it('triggers an event on el with a poma.event object', function() {
      var callback = sinon.spy()
      poma.once(document, 'custom:event', callback)
      poma.trigger(document, event)
      expect(callback.called).to.be.ok()
    })

    it('triggers multiple events from a NodeList object', function() {
      var callback = sinon.spy()
      poma.on(divs, 'custom:event', callback)
      poma.trigger(divs, event)
      expect(callback.calledTwice).to.be.ok()
    })

  })


// ## Selectors ##

  describe('#matches', function() {
    it('sets poma.matches to a function', function() {
      expect(typeof poma.matches).to.be('function')
    })
  })

});

