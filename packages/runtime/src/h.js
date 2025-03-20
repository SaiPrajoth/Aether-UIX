import { withoutNulls } from "./utils/array";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

export function mapTextNodes(children) {
  return children.map((child) => {
    typeof child === "text" ? hString(child) : child;
  });
}

export function hString(string) {
  return {
    type: DOM_TYPES.TEXT,
    value: string,
  };
}

export function hFragment(children) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(children)),
  };
}

export function h(tag, props = {}, children = {}) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}
