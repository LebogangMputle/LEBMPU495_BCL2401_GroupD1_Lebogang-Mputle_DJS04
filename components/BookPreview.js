

class BookPreview extends HTMLElement {
  constructor() {
    super();
    // ... component logic goes here
    const getElement = (selector) => document.querySelector(selector);
    const createBookPreviews = (books, container) => {
      const fragment = document.createDocumentFragment();
      books.forEach(({ author, id, image, title }) => {
        const element = document.createElement("button");
        element.classList = "preview";
        element.dataset.preview = id;
        element.innerHTML = `
          <img class="preview__image" src="${image}" />
          <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
          </div>
        `;
        fragment.appendChild(element);
      });
      container.appendChild(fragment);
    };
  }
}