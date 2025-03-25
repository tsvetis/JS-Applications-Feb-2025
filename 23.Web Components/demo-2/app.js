import { html, render } from "./node_modules/lit-html/lit-html.js";

const template = (title, content) => html`
  <style>
    article {
      margin: 24px;
      background-color: #fff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }

    article h2 {
      background: #ccc;
      padding: 8px 16px;
    }

    article div {
      padding: 24px;
    }
  </style>

  <article>
    <h2>${title}</h2>
    <div>
      <p>${content}</p>
    </div>
  </article>
`;

class MyArticle extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    render(template("Title", "Content"), this.shadowRoot, {
      host: this,
    });
  }
}

customElements.define("my-article", MyArticle);
