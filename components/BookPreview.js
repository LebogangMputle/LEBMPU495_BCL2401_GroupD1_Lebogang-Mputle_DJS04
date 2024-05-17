import { authors } from "../data";
class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.shadowRoot = this.attachShadow({ mode: "open" });
      this.handleClick = this.handleClick.bind(this);
    }
  
    static get observedAttributes() {
      return ["book"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "book") {
        this.render(JSON.parse(newValue));
      }
    }
  
    render(book) {
      this.shadowRoot.innerHTML = `
        <button class="preview" data-preview="${book.id}">
          <img class="preview__image" src="${book.image}" alt="${book.title}" />
          <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${book.author}</div>
          </div>
        </button>
      `;
  
      this.shadowRoot.querySelector("button").addEventListener("click", this.handleClick);
    }
  
    handleClick(event) {
      const previewId = event.currentTarget.dataset.preview;
      // Trigger an event to notify the application about the clicked preview
      this.dispatchEvent(new CustomEvent("book-clicked", { detail: { previewId } }));
    }
  }
  
  customElements.define("book-preview", BookPreview);
  