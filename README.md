# `domhb`: A tiny, safe HTML builder for the DOM

Build DOM elements without the `document.createElement()` boilerplate using declarative arrays. No frameworks, no state, just plain JavaScript.

## Installation

`domhb` is a client-side ESM-only library available from npm or a CDN.

### From npm

```
npm install domhb
```

```js
import hb from 'domhb';
```

### From CDN

```js
import hb from 'https://esm.run/domhb';
```

## Usage

```ts
import hb, { type DOMElement } from 'domhb';

const elem: DOMElement = [
  'div',
  {
    className: 'btn'
  },
  [
    ['div'],
    ['button', {
      style: {
        backgroundColor: 'cyan'
      },
      dataset: {
        theme: 'light'
      },
      disabled: true
    }],
    ['p', {}, 'Paragraph']
  ]
];

// DOM Element
const domElem = hb(elem);

/*
<div class="btn">
  <div></div>
  <button style="background-color: cyan;" data-theme="light" disabled=""></button>
  <p>Paragraph</p>
</div>
*/

document.querySelector('#target').appendChild(domElem);
```

## Why?

I occasionally need to dynamically add elements to my websites that don't justify the overhead of a framework like React - there's no state and no reactivity, so React is overkill. Usually I'd use `document.createElement()` for this, but this approach very quickly becomes hard to manage. It's also hard to understand the structure of the elements from a glance. `domhb` offers a clean, declarative alternative for static or once-off DOM generation.
