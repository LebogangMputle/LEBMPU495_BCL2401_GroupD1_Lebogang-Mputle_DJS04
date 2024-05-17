# DJS03 Reflection: Book Connect - Abstractions

## The original code was restructured to enhance readability, maintainability, and future expandability.
## Object Usage:
1.Data related to books, authors, and genres is organized into separate objects (books, authors, genres) for better data management and clarity.
2.The BOOKS_PER_PAGE constant is used to control the number of books displayed per page, making it easier to adjust this value.

## Function Breakdown:
1. getElement: Retrieves DOM elements using a selector (similar to jQuery).
2. createBookPreviews: Creates and appends book previews to the list container.
3. createOptions: Creates and appends options to a select element (filters).
4. applyTheme: Applies a theme (light or night) based on the provided theme value.
5. updateShowMoreButton: Updates the "Show more" button based on remaining books.
6. Each function performs a specific task, improving code organization and reusability.

## Event Listeners:
1. Event listeners are placed within specific functions to handle user interactions and update the application state accordingly.

## Benefits of Abstraction:
1. Maintainability:
   - Smaller, well-defined functions are easier to understand, modify, and debug.
   - Changes can be localized within functions, reducing the risk of unintended consequences in other parts of the code.
2. Readability:
   - Descriptive function names and object structures enhance code clarity.
3. Extensibility:
   -New functionalities can be added by creating new functions or modifying   existing ones without affecting the core logic. For example, additional search filters or sorting criteria could be implemented with minimal changes to the existing structure.

## Challenges and Solutions:
1. Balancing Abstraction:
   - Overly granular function decomposition could lead to unnecessary complexity. The refactored code strikes a balance between creating well-defined functions and maintaining a logical flow.
2. Event Listener Placement:
   - Deciding where to place event listeners to ensure proper interaction handling required careful consideration. The final structure places event listeners within relevant functions to maintain a clear association between actions and their effects.

##  Deepening JavaScript Understanding:
1. Object-Oriented Programming Principles
   - The use of objects promotes object-oriented principles, making the code more organized and adaptable
2. Functional Programming Concepts:
   - Breaking down the code into smaller functions with clear responsibilities aligns with functional programming principles, enhancing reusability and testability (although full-fledged functional programming wasn't implemented).

3. importance of Readability and Maintainability:
   - The refactoring process emphasized the value of writing clean, well-structured code that is easy to understand and maintain for both the developer and future collaborators.

## Conclusion:
In conclusion, refactoring the JavaScript code for the book list application resulted in a more maintainable, readable, and extensible codebase. The use of objects, functions, and abstraction principles promotes a well-structured and adaptable foundation for future development.
