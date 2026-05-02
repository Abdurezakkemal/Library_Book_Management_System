# 📚 Library Book Management System

A simple, lightweight web-based library management system built with Node.js and vanilla JavaScript. Perfect for small libraries, personal book collections, or learning full-stack web development.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## ✨ Features

- ➕ **Add New Books** - Easily add books with title, author, category, and quantity
- 📖 **View All Books** - Browse your entire collection in a responsive grid layout
- ✏️ **Update Book Details** - Edit any book information with a simple modal form
- 🗑️ **Delete Books** - Remove books from your collection with confirmation
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 💾 **Local JSON Storage** - No database required, data stored in JSON format
- 🎨 **Modern Dark UI** - Clean, professional dark-themed interface

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your computer (v12 or higher)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. **Start the server**
   ```bash
   node server.js
   ```

3. **Open your browser**
   ```
   http://localhost:3000
   ```

That's it! No npm install, no dependencies, just pure Node.js.

## 📁 Project Structure

```
library-management-system/
├── server.js              # Node.js HTTP server with RESTful API
├── books.json             # JSON file for data storage
├── README.md              # Project documentation
├── public/                # Frontend files
│   ├── books.html         # Main books management page
│   ├── features.html      # Features showcase page
│   ├── about.html         # About page
│   ├── contact.html       # Contact information page
│   ├── css/
│   │   └── style.css      # Responsive dark-themed stylesheet
│   └── js/
│       └── books.js       # Client-side JavaScript for CRUD operations
```

## 🛠️ Technology Stack

- **Backend**: Node.js (HTTP & File System modules)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON file
- **Architecture**: RESTful API

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book by ID |
| DELETE | `/api/books/:id` | Delete a book by ID |

### Example API Usage

**Get all books:**
```javascript
fetch('/api/books')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Add a new book:**
```javascript
fetch('/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    quantity: 5
  })
});
```

## 📖 Book Data Structure

Each book contains the following fields:

```json
{
  "id": "1234567890",
  "title": "Book Title",
  "author": "Author Name",
  "category": "Fiction",
  "quantity": 5
}
```

## 🎨 Pages

- **Books** (`/books`) - Main page for managing books (CRUD operations)
- **Features** (`/features`) - Overview of system capabilities
- **About** (`/about`) - Information about the system
- **Contact** (`/contact`) - Contact form and information

## 💡 Learning Resources

This project is perfect for learning:

- Node.js HTTP server creation
- RESTful API design
- File system operations in Node.js
- Frontend-backend communication
- CRUD operations
- Responsive web design
- Vanilla JavaScript (no frameworks)

## 🔧 Customization

### Change the Port

Edit `server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

### Modify Styling

Edit `public/css/style.css` to customize colors, fonts, and layout.

### Add New Fields

1. Update the book object structure in `books.json`
2. Modify the form in `public/books.html`
3. Update the display logic in `public/js/books.js`

## 🐛 Troubleshooting

**Server won't start:**
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is already in use
- Try a different port in `server.js`

**Books not loading:**
- Check that `books.json` exists and contains valid JSON
- Open browser console (F12) to see error messages
- Verify the server is running

**Changes not appearing:**
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Restart the server

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abdrezak Kemal**
- Email: abdrezakkemal@gmail.com
- Phone: +251 945911049
- Location: Kilinto, AASTU Building

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn or if you find it useful!

## 📸 Screenshots

### Books Management Page
The main interface where you can view, add, edit, and delete books.

### Responsive Design
Works perfectly on all devices - desktop, tablet, and mobile.

---

**Built with using Node.js and Vanilla JavaScript**
