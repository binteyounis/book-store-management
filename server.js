// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (CSS, JS, jQuery)
app.use(express.static(path.join(__dirname, "public")));

// ------------------ PAGE ROUTES ------------------

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

// Admin page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

// ------------------ Dummy Data ------------------

let users = [];

let books = [
  { id: 1, title: "JavaScript Basics", author: "John Doe", category: "Programming", price: 500 },
  { id: 2, title: "HTML & CSS", author: "Jane Smith", category: "Web", price: 400 }
];

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

  res.json({ success: !!user });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

