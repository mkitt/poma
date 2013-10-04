/*global zip */
describe('zip', function() {

  var el = document.body.querySelector('#fixture')
  var noop = function(e) {}

  describe('@instance', function() {
    it('is accessible in the global namespace', function() {
      expect(zip).not.to.be(null)
    })

  })


  describe('#matches', function() {
    it('sets zip.matches to a function', function() {
      expect(typeof zip.matches).to.be('function')
    })
  })


  describe('#on', function() {
    it('adds an event listener', function() {
      var callback = sinon.spy()
      zip.on(el, 'click', callback)
      el.click()
      expect(callback.called).to.be.ok()
      zip.off(el, 'click', callback)
    })

    it('returns the node for chaining ', function() {
      var node = zip.on(el, 'click', noop)
      expect(node).to.be(el)
      zip.off(el, 'click', noop)
    })
  })


  describe('#off', function() {
    it('removes an event listener', function() {
      var callback = sinon.spy()
      zip.on(el, 'click', callback)
      zip.off(el, 'click', callback)
      el.click()
      expect(callback.called).not.to.be.ok()
    })

    it('returns the node for chaining ', function() {
      zip.on(el, 'click', noop)
      var node = zip.off(el, 'click', noop)
      expect(node).to.be(el)
    })
  })


  describe('#once', function() {
    it('only responds to a single call', function() {
      var callback = sinon.spy()
      zip.once(el, 'click', callback)
      el.click()
      el.click()
      expect(callback.calledOnce).to.be.ok()
    })
  })

});

