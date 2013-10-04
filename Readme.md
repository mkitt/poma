# poma
Another minimalistic JavaScript event, selector and dom utility library
for modern browsers.

## Todo
- Write remaining functions and specs
- Document
- Add poma.position and poma.offset to issues as a feature
- Add component integration
- Make the repo public


## Installation

```bash
$ component install mkitt/poma
```


## API

### poma.on(node, type, fn)
Wrapper around `addEventListener`. Handles either [`Node`][node] or
[`NodeList`][nodelist] elements.

```javascript
poma.on(elements, 'tap', tapped)
```


### poma.off(node, type, fn)
Wrapper around `removeEventListener`. Handles either [`Node`][node] or
[`NodeList`][nodelist] elements.

```javascript
poma.off(elements, 'tap', tapped)
```


### poma.once(node, type, fn)
Adds the event listener(s) and removes it after the first call. Handles
either [`Node`][node] or [`NodeList`][nodelist] elements.

```javascript
poma.once(elements, 'tap', tapped)
```

### poma.event(type, data={}, target=document)
Create a custom event with an optional data object and target.

```javascript
poma.event('custom:event', {bling: 1}, element)
```


### poma.trigger(node, type|event, data={})
Dispatches a custom event from the node, with an optional data object.
The second option can either be an `eventType` string or a `poma.event`
object. If it's a `poma.event` object,  the `data` parameter is ignored.
Handles either [`Node`][node] or [`NodeList`][nodelist] elements.

```javascript
// create and dispatch an event..
poma.trigger(document, 'custom:event', {bling: 1})

// dispatch an already created event..
var event = poma.event('custom:event', {bling: 1}, element)
poma.trigger(element, event)
```



<!-- Links -->
[node]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[nodelist]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
 
