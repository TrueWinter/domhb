# `domhb`: A tiny, safe HTML builder for the DOM

Build DOM elements without the `document.createElement()` boilerplate using declarative arrays. No frameworks, no state, just plain JavaScript.

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
