// Store books array
var books = [];
var editingBookId = null;

// Load books when page loads
window.onload = function() {
    loadBooks();
};

// Function to load all books from server
function loadBooks() {
    fetch('/api/books')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            books = data;
            displayBooks();
        })
        .catch(function(error) {
            console.log('Error loading books:', error);
        });
}

// Function to display books on page
function displayBooks() {
    var grid = document.getElementById('booksGrid');
    
    if (books.length === 0) {
        grid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">No books available. Add your first book!</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        html += '<div class="book-card">';
        html += '<h3>' + book.title + '</h3>';
        html += '<p><strong>Author:</strong> ' + book.author + '</p>';
        html += '<p><strong>Category:</strong> ' + book.category + '</p>';
        html += '<p><strong>Quantity:</strong> ' + book.quantity + '</p>';
        html += '<div class="book-actions">';
        html += '<button class="btn btn-edit" onclick="editBook(\'' + book.id + '\')">Edit</button>';
        html += '<button class="btn btn-danger" onclick="deleteBook(\'' + book.id + '\')">Delete</button>';
        html += '</div>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

// Function to open modal for adding new book
function openAddModal() {
    editingBookId = null;
    document.getElementById('modalTitle').innerHTML = 'Add New Book';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.getElementById('bookModal').style.display = 'block';
}

// Function to edit a book
function editBook(id) {
    var book = null;
    for (var i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            book = books[i];
            break;
        }
    }
    
    if (!book) return;

    editingBookId = id;
    document.getElementById('modalTitle').innerHTML = 'Edit Book';
    document.getElementById('bookId').value = id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('category').value = book.category;
    document.getElementById('quantity').value = book.quantity;
    document.getElementById('bookModal').style.display = 'block';
}

// Function to close modal
function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
    editingBookId = null;
}

// Handle form submission
document.getElementById('bookForm').onsubmit = function(e) {
    e.preventDefault();

    var bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value)
    };

    if (editingBookId) {
        // Update existing book
        fetch('/api/books/' + editingBookId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            for (var i = 0; i < books.length; i++) {
                if (books[i].id === editingBookId) {
                    books[i].title = bookData.title;
                    books[i].author = bookData.author;
                    books[i].category = bookData.category;
                    books[i].quantity = bookData.quantity;
                    break;
                }
            }
            displayBooks();
            closeModal();
        })
        .catch(function(error) {
            console.log('Error updating book:', error);
            alert('Error updating book. Please try again.');
        });
    } else {
        // Add new book
        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(newBook) {
            books.push(newBook);
            displayBooks();
            closeModal();
        })
        .catch(function(error) {
            console.log('Error adding book:', error);
            alert('Error adding book. Please try again.');
        });
    }
};

// Function to delete a book
function deleteBook(id) {
    var confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    fetch('/api/books/' + id, { method: 'DELETE' })
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var newBooks = [];
            for (var i = 0; i < books.length; i++) {
                if (books[i].id !== id) {
                    newBooks.push(books[i]);
                }
            }
            books = newBooks;
            displayBooks();
        })
        .catch(function(error) {
            console.log('Error deleting book:', error);
            alert('Error deleting book. Please try again.');
        });
}

// Close modal when clicking outside
window.onclick = function(event) {
    var modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
};
