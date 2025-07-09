import type { DeepPartial } from 'utility-types';

type ElementNames = keyof HTMLElementTagNameMap

type DisallowedProperties = 'innerText' | 'innerHTML' | 'setAttribute' | 'setAttributeNS' |
  'setAttributeNode' | 'setAttributeNodeNS' | 'setCustomValidity' | 'setRangeText' | 'classList'

type BaseElementWithAttributes<K extends ElementNames> = [
  tagName: K,
  attributes?: Omit<DeepPartial<HTMLElementTagNameMap[K]>, DisallowedProperties>,
  children?: string | DOMElement | DOMElement[]
]

export type DOMElement = {
  [K in ElementNames]: BaseElementWithAttributes<K>
}[ElementNames]

function isDOMElement(value: unknown): value is DOMElement {
  return Array.isArray(value) && typeof value[0] === 'string';
}

export default function hb(elem: DOMElement): Element {
  if (!Array.isArray(elem) || (elem as any[]).length === 0) {
    throw new Error('Element must be an array');
  }

  const [type, attrs, content] = elem;
  const domElem = document.createElement(type);
  Object.entries(attrs || {})
    .forEach(([attr, value]) => {
      // Some attributes, like style, are objects that require individually setting values
      if (typeof value === 'object') {
        Object.entries(value)
          .forEach(([k, v]) => {
            domElem[attr][k] = v;
          });
      } else {
        domElem[attr] = value;
      }
    });

  if (content) {
    if (typeof content === 'string') {
      domElem.textContent = content;
    } else if (Array.isArray(content)) {
      if (isDOMElement(content)) {
        domElem.appendChild(hb(content));
      } else {
        for (const c of content) {
          domElem.appendChild(hb(c));
        }
      }
    } else {
      throw new Error('Content must be either a string, a DOMElement, or an array of the latter');
    }
  }

  return domElem;
}
