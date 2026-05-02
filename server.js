const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/" || req.url === "/books") {
    filePath = "./public/books.html";
    serveFile(filePath, "text/html", res);
  } else if (req.url === "/features") {
    filePath = "./public/features.html";
    serveFile(filePath, "text/html", res);
  } else if (req.url === "/about") {
    filePath = "./public/about.html";
    serveFile(filePath, "text/html", res);
  } else if (req.url === "/contact") {
    filePath = "./public/contact.html";
    serveFile(filePath, "text/html", res);
  } else if (req.url === "/css/style.css") {
    filePath = "./public/css/style.css";
    serveFile(filePath, "text/css", res);
  } else if (req.url === "/js/books.js") {
    filePath = "./public/js/books.js";
    serveFile(filePath, "application/javascript", res);
  } else if (req.url === "/api/books" && req.method === "GET") {
    fs.readFile("./books.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error reading books");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  }
  // API to add new book
  else if (req.url === "/api/books" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newBook = JSON.parse(body);
      newBook.id = Date.now().toString();

      fs.readFile("./books.json", "utf8", (err, data) => {
        let books = [];
        if (!err && data) {
          books = JSON.parse(data);
        }
        books.push(newBook);

        fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            res.end("Error saving book");
            return;
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newBook));
        });
      });
    });
  }
  // API to update book
  else if (req.url.startsWith("/api/books/") && req.method === "PUT") {
    const id = req.url.split("/")[3];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const updatedData = JSON.parse(body);

      fs.readFile("./books.json", "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end("Error reading books");
          return;
        }
        let books = JSON.parse(data);

        for (let i = 0; i < books.length; i++) {
          if (books[i].id === id) {
            books[i].title = updatedData.title;
            books[i].author = updatedData.author;
            books[i].category = updatedData.category;
            books[i].quantity = updatedData.quantity;
            break;
          }
        }

        fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            res.end("Error updating book");
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Book updated" }));
        });
      });
    });
  }
  // API to delete book
  else if (req.url.startsWith("/api/books/") && req.method === "DELETE") {
    const id = req.url.split("/")[3];

    fs.readFile("./books.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error reading books");
        return;
      }
      let books = JSON.parse(data);
      books = books.filter((book) => book.id !== id);

      fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
        if (err) {
          res.writeHead(500);
          res.end("Error deleting book");
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Book deleted" }));
      });
    });
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

// Function to serve files
function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
