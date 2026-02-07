// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// PORT configuration (important for deployment)
const PORT = process.env.PORT || 3000;

// ------------------ Dummy Data ------------------

// Users data
let users = [];

// Books data
let books = [
  { id: 1, title: "JavaScript Basics", author: "John Doe", category: "Programming", price: 500 },
  { id: 2, title: "HTML & CSS", author: "Jane Smith", category: "Web", price: 400 }
];

// Orders data
let orders = [];

// ------------------ APIs ------------------

// User Registration
app.post("/api/signup", (req, res) => {
  users.push(req.body);
  res.json({ message: "User registered successfully" });
});

// User Login
app.post("/api/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Fetch Books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Add Book (Admin)
app.post("/api/books", (req, res) => {
  books.push(req.body);
  res.json({ message: "Book added successfully" });
});

// Delete Book
app.delete("/api/books/:id", (req, res) => {
  books = books.filter(book => book.id != req.params.id);
  res.json({ message: "Book deleted" });
});

// Place Order
app.post("/api/orders", (req, res) => {
  orders.push(req.body);
  res.json({ message: "Order placed successfully" });
});

// View Orders (Admin)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// ------------------ Server Start ------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
