// Import book data
import { books, authors, genres, BOOKS_PER_PAGE, } from "./data.js";
import { BookPreview } from "./bookPreview.js"
// State variables
let page = 1
let matches = books; // Initially show all books

 // Your book data
 customElements.define('book-preview', BookPreview);

function createBookPreviews(books, container) {
  // const fragment = document.createDocumentFragment();
  books.forEach(({ author, id, image, title }) => {
    const preview = document.createElement("book-preview");
    preview.setAttribute("title", title);
    preview.setAttribute("author", authors[author]);
    preview.setAttribute("image", image);
    preview.setAttribute("id", id);
    container.appendChild(preview);
  });
  // container.appendChild(fragment)
}

const getElement = (selector) => document.querySelector(selector);

const createOptions = (options, defaultOption, container) => {
  const fragment = document.createDocumentFragment();
  const firstOption = document.createElement("option");
  firstOption.value = "any";
  firstOption.innerText = defaultOption;
  fragment.appendChild(firstOption);
  Object.entries(options).forEach(([id, name]) => {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};

// Theme functionality
const applyTheme = (theme) => {
    const isNight = theme === "night";
    document.documentElement.style.setProperty(
      "--color-dark",
      isNight ? "255, 255, 255" : "10, 10, 20"
    );
    document.documentElement.style.setProperty(
      "--color-light",
      isNight ? "10, 10, 20" : "255, 255, 255"
    );
  };
  

// "Show more" button logic
const updateShowMoreButton = () => {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  const button = getElement("[data-list-button]");
  button.innerText = `Show more (${remainingBooks})`;
  button.disabled = remainingBooks <= 0;
  button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">(${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
};

// Event listener functions
const closeOverlay = (selector) => {
    getElement(selector).open = false;
  };
  
  const openOverlay = (selector, focusSelector = null) => {
    getElement(selector).open = true;
    if (focusSelector) getElement(focusSelector).focus();
  };
  
  const applySearchFilters = (filters) => {
    return books.filter((book) => {
      const titleMatch =
        filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === "any" || book.author === filters.author;
      const genreMatch = filters.genre === "any" || book.genres.includes(filters.genre);
      return titleMatch && authorMatch && genreMatch;
    });
  };

  //check for a stored theme preference in local storage
  const getStoredTheme = () => {
    return localStorage.getItem("theme") || "day"; // Default to "day" if not found
  };
  
  
  getElement("[data-search-cancel]").addEventListener("click", () =>
    closeOverlay("[data-search-overlay]")
  );
  getElement("[data-settings-cancel]").addEventListener("click", () =>
    closeOverlay("[data-settings-overlay]")
  );
  getElement("[data-header-search]").addEventListener("click", () =>
    openOverlay("[data-search-overlay]", "[data-search-title]")
  );
  getElement("[data-header-settings]").addEventListener("click", () =>
    openOverlay("[data-settings-overlay]")
  );
  getElement("[data-list-close]").addEventListener("click", () =>
    closeOverlay("[data-list-active]")
  );

  //theme setting submission handler
  getElement("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    closeOverlay("[data-settings-overlay]");
  });
  
  
  getElement("[data-search-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    matches = applySearchFilters(filters);
    page = 1;
    getElement("[data-list-message]").classList.toggle(
      "list__message_show",
      matches.length < 1
    );
    getElement("[data-list-items]").innerHTML = "";
    createBookPreviews(
      matches.slice(0, BOOKS_PER_PAGE),
      getElement("[data-list-items]")
    );
    updateShowMoreButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeOverlay("[data-search-overlay]");
  });
  
  getElement("[data-list-button]").addEventListener("click", () => {
    createBookPreviews(
      matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE),
      getElement("[data-list-items]")
    );
    page += 1;
    updateShowMoreButton();
  });

  getElement("[data-list-items]").addEventListener("click", (event) => {
    const pathArray = Array.from(event.composedPath());
    const active = pathArray.find((node) => node?.dataset?.preview);
    if (active) {
      const book = books.find((book) => book.id === active.dataset.preview);
      if (book) {
        getElement("[data-list-active]").open = true;
        getElement("[data-list-blur]").src = book.image;
        getElement("[data-list-image]").src = book.image;
        getElement("[data-list-title]").innerText = book.title;
        getElement("[data-list-subtitle]").innerText = `${
          authors[book.author]
        } (${new Date(book.published).getFullYear()})`;
        getElement("[data-list-description]").innerText = book.description;
      }
    }
  });

// Initial setup
createOptions(genres, "All Genres", getElement("[data-search-genres]"));
createOptions(authors, "All Authors", getElement("[data-search-authors]"));
applyTheme(
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"
); // Apply initial theme
createBookPreviews(
    matches.slice(0, BOOKS_PER_PAGE), 
    getElement("[data-list-items]")
);
updateShowMoreButton();
//Stored the theme in the local storage
const initialTheme = getStoredTheme();
applyTheme(initialTheme);
localStorage.setItem("theme", initialTheme);

