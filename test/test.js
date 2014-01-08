/*global poma */
describe('poma', function() {

  var fixture = document.getElementById('fixture')
  var container = document.getElementById('mocha')
  var divs = document.querySelectorAll('div')
  var noop = function(e) {}
  var trace = function(e) {console.log(e)}
  var nested = '<div id="grandparent" class="box box-grandparent">' +
                 '<div id="parent" class="box box-parent">' +
                   '<div id="child" class="box box-child">' +
                   '</div>' +
                 '</div>' +
               '</div>'


  describe('@instance', function() {
    it('is accessible in the global namespace', function() {
      expect(poma).not.to.be(null)
    })

  })


// ## Events ##

  describe('#on', function() {
    it('adds an event listener for Node', function() {
      var callback = sinon.spy()
      poma.on(fixture, 'click', callback)
      fixture.click()
      expect(callback.called).to.be.ok()
      poma.off(fixture, 'click', callback)
    })

    it('returns the node for chaining for Node', function() {
      var node = poma.on(fixture, 'click', noop)
      expect(node).to.be(fixture)
      poma.off(fixture, 'click', noop)
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
      poma.on(fixture, 'click', callback)
      poma.off(fixture, 'click', callback)
      fixture.click()
      expect(callback.called).not.to.be.ok()
    })

    it('returns the node for chaining ', function() {
      poma.on(fixture, 'click', noop)
      var node = poma.off(fixture, 'click', noop)
      expect(node).to.be(fixture)
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
      poma.once(fixture, 'click', callback)
      fixture.click()
      fixture.click()
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
    var event = poma.event('custom:event', obj)

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

  describe('#parentSelector', function() {
    var grandparent, parent, child
    beforeEach(function() {
      fixture.innerHTML = nested
      grandparent = document.getElementById('grandparent')
      parent = document.getElementById('parent')
      child = document.getElementById('child')
    })
    afterEach(function() {
      fixture.innerHTML = ''
    })

    it('selects parent from child using a common class', function() {
      expect(poma.parentSelector(child, '.box')).to.be(parent)
    })

    it('selects grandparent from child using a specific class', function() {
      expect(poma.parentSelector(child, '.box-grandparent')).to.be(grandparent)
    })

    it('selects grandparent from child using an id', function() {
      expect(poma.parentSelector(child, '#grandparent')).to.be(grandparent)
    })

    it('selects body from parent using a tag', function() {
      expect(poma.parentSelector(parent, 'body')).to.be(document.body)
    })

    it('selects the fixture from grandparent using a tag', function() {
      expect(poma.parentSelector(grandparent, 'div')).to.be(fixture)
    })

    it('returns false if no nodes are found', function() {
      expect(poma.parentSelector(child, '.null')).to.be(false)
    })
  })


  describe('#parentSelectorAll', function() {
    var grandparent, parent, child
    beforeEach(function() {
      fixture.innerHTML = nested
      grandparent = document.getElementById('grandparent')
      parent = document.getElementById('parent')
      child = document.getElementById('child')
    })
    afterEach(function() {
      fixture.innerHTML = ''
    })

    it('selects all of the .box elements from a class starting with the child', function() {
      expect(poma.parentSelectorAll(child, '.box')).to.have.length(2)
    })

    it('selects all of the div elements from a class starting with the child', function() {
      expect(poma.parentSelectorAll(child, 'div')).to.have.length(3)
    })

    it('returns false if no nodes are found', function() {
      expect(poma.parentSelectorAll(child, '.null')).to.be(false)
    })

    it('returns an array with a single element from the child', function() {
      var nodes = poma.parentSelectorAll(child, 'body')
      expect(nodes).to.have.length(1)
    })

    it('returns the body packed in an array from the child', function() {
      var nodes = poma.parentSelectorAll(child, 'body')
      expect(nodes[0]).to.be(document.body)
    })
  })


  describe('#remove', function() {
    var grandparent, parent, child
    beforeEach(function() {
      fixture.innerHTML = nested
      grandparent = document.getElementById('grandparent')
      parent = document.getElementById('parent')
      child = document.getElementById('child')
    })
    afterEach(function() {
      fixture.innerHTML = ''
    })

    it('removes a child node', function() {
      expect(fixture.querySelectorAll('.box')).to.have.length(3)
      poma.remove(child)
      expect(fixture.querySelectorAll('.box')).to.have.length(2)
    })

    it('removes child nodes', function() {
      expect(fixture.querySelectorAll('.box')).to.have.length(3)
      poma.remove(parent)
      expect(fixture.querySelectorAll('.box')).to.have.length(1)
    })

    it('returns the removed node', function() {
      expect(poma.remove(child)).to.be(child)
    })
  })


  describe('#insertAfter', function() {
    var grandparent, parent, child, element
    beforeEach(function() {
      fixture.innerHTML = nested
      grandparent = document.getElementById('grandparent')
      parent = document.getElementById('parent')
      child = document.getElementById('child')
      element = document.createElement('div')
      element.id = 'element'
    })
    afterEach(function() {
      fixture.innerHTML = ''
    })

    it('inserts the element after the grandparent', function() {
      poma.insertAfter(element, grandparent)
      expect(grandparent.nextSibling).to.be(element)
    })

    it('inserts the element after the parent', function() {
      poma.insertAfter(element, parent)
      expect(parent.nextSibling).to.be(element)
    })

    it('inserts the element after the child', function() {
      poma.insertAfter(element, child)
      expect(child.nextSibling).to.be(element)
    })

    it('returns the element that was just inserted', function() {
      var el = poma.insertAfter(element, child)
      expect(el).to.be(element)
    })
  })


  describe('#plugin', function() {
    var obj
    beforeEach(function() {
      obj = {noop: function(){}, remove: function(){}}
      poma.plugin(obj, 'noop')
    })
    afterEach(function() {
      poma.noop = null
    })

    it('creates a reference to another object method within poma', function() {
      expect(poma.noop).to.be.a('function')
    })

    it('references the object method from withing poma', function() {
      expect(poma.noop).to.be(obj.noop)
    })

    it('calls the object method from within poma', function() {
      var spy = sinon.spy(poma, 'noop')
      var callback = sinon.spy()
      poma.noop()
      expect(spy.calledOnce).to.be.ok()
    })

    it('does not overwrite an existing function within poma', function() {
      poma.plugin(obj, 'remove')
      expect(poma.remove).not.to.be(obj.remove)
    })

  })

});

