// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3434433",
      },
      {
        title: "Book Two",
        author: "Janine Doe",
        isbn: "4433234",
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger delete">X</a></td>
        `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static ClearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
// Store Class: Handles Local Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books')
    }
    static removeBook(isbn) {
        
    }
}
// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent Submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
      UI.addBookToList(book);
      
      // Show success message
      UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.ClearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  // Show success message
  UI.showAlert("Book Removed", "success");
});
