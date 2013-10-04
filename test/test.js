/*global poma */
describe('poma', function() {

  var el = document.body.querySelector('#fixture')
  var noop = function(e) {}

  describe('@instance', function() {
    it('is accessible in the global namespace', function() {
      expect(poma).not.to.be(null)
    })

  })


  describe('#matches', function() {
    it('sets poma.matches to a function', function() {
      expect(typeof poma.matches).to.be('function')
    })
  })


  describe('#on', function() {
    it('adds an event listener', function() {
      var callback = sinon.spy()
      poma.on(el, 'click', callback)
      el.click()
      expect(callback.called).to.be.ok()
      poma.off(el, 'click', callback)
    })

    it('returns the node for chaining ', function() {
      var node = poma.on(el, 'click', noop)
      expect(node).to.be(el)
      poma.off(el, 'click', noop)
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
  })


  describe('#once', function() {
    it('only responds to a single call', function() {
      var callback = sinon.spy()
      poma.once(el, 'click', callback)
      el.click()
      el.click()
      expect(callback.calledOnce).to.be.ok()
    })
  })

});

