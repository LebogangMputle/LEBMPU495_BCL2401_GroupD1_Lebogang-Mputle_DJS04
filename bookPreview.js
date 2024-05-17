//import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
 
export class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
  
    static get observedAttributes() {
      return ["title", "author", "image", "id"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    render() {
      this.shadow.innerHTML = `
        <button class="preview" data-preview="${this.getAttribute("id")}">
          <img class="preview__image" src="${this.getAttribute("image")}" />
          <div class="preview__info">
            <h3 class="preview__title">${this.getAttribute("title")}</h3>
            <div class="preview__author">${this.getAttribute("author")}</div>
          </div>
        </button>
      `;
    }
  }
  
  customElements.define("book-preview", BookPreview);
  