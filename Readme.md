# poma
Minimal utility library for working with [`Node`][node],
[`NodeList`][nodelist] and [`Event`][event] objects in modern browsers.
Utilizes a functional style without extending any of the built-in DOM
objects.


## Installation

```bash
$ component install mkitt/poma
```


## API

### poma.on(node, type, fn)
`@returns node`

Wrapper around `addEventListener`. Handles either [`Node`][node] or
[`NodeList`][nodelist] elements.


```javascript
poma.on(elements, 'tap', tapped)
```


### poma.off(node, type, fn)
`@returns node`

Wrapper around `removeEventListener`. Handles either [`Node`][node] or
[`NodeList`][nodelist] elements.

```javascript
poma.off(elements, 'tap', tapped)
```


### poma.once(node, type, fn)
`@returns node`

Adds the event listener(s) and removes them after the first call.
Handles either [`Node`][node] or [`NodeList`][nodelist] elements.

```javascript
poma.once(elements, 'tap', tapped)
```

### poma.event(type, data={})
`@returns Event`

Create a custom [`event`][event] with an optional data object.

```javascript
poma.event('custom:event', {bling: 1})
```


### poma.trigger(node, type|event, data={})
`@returns node`

Dispatches a custom event from the node, with an optional data object.
The second option can either be an `eventType` string or an
[`Event`][event] object. If it's an [`Event`][event] object, the `data`
parameter is ignored. Handles either [`Node`][node] or
[`NodeList`][nodelist] elements.

```javascript
// create and dispatch an event..
poma.trigger(document, 'custom:event', {bling: 1})

// dispatch an already created event..
var event = poma.event('custom:event', {bling: 1})
poma.trigger(element, event)
```


### poma.matches
Normalizes the browser name for [`Element.matches`][matches] as a cached
variable.

```javascript
if (poma.matches.bind(node)(selector)) {
  nodes.push(node)
}
```


### poma.parentSelector(node, selector)
Returns the first parent element that [`matches`][matches] the
`selector` starting at `node` as a [`Node`][node] object. The `selector`
can either be a `class`, `id` or a `tag`.

```javascript
var parent = poma.parentSelector(child, '.box')
```


### poma.parentSelectorAll(node, selector)
Returns all parent elements which [`match`][matches] the `selector`
starting at `node` as a native [`Array`][array] object. The `selector`
can either be a `class`, `id` or a `tag`.

```javascript
var parents = poma.parentSelectorAll(child, 'div')
```


### poma.remove(node)
`@returns node`

Removes the `node` and all of it's children from the DOM.

```javascript
var removed = poma.remove(parent)
```


### poma.plugin(object, fn)
`@returns poma.fn` or `Error`

Allows for creating a reference to another object's method within the
`poma` object. If a [`function`][function] of the same name already
exists, the reference is not created and an error is logged.

```javascript
var obj = {noop: function(){}, remove: function(){}}

// obj.noop can be accessed via poma.noop
poma.plugin(obj, 'noop')
poma.noop()

// reference not created, the original poma.remove function is preserved
poma.plugin(obj, 'remove')
```

## Dollar Sign
Scope the `poma` object to the `$`, for easier reference after the
`poma` library has loaded.


```javascript
if (!window.$)
  window.$ = window.poma

$.on(elements, 'tap', tapped)
```


<!-- Links -->
[node]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[event]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[matches]: https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
 
