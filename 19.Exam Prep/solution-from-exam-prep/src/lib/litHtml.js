import {
  render as baseRender,
  html,
} from "./../../node_modules/lit-html/lit-html.js";

const rootEl = document.querySelector("main");

function render(template, elementToRender) {
  const el = elementToRender || rootEl;
  baseRender(template, el);
}

export { render, html };
