// ------------------ IMPORT REQUIRED PACKAGES ------------------
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// ------------------ CREATE EXPRESS APP ------------------
const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(cors());
app.use(bodyParser.json());

// Serve static files (CSS, JS, jQuery)
app.use(express.static(path.join(__dirname, "public")));

// ------------------ HOME ROUTE (MANDATORY FOR RAILWAY) ------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ------------------ PORT CONFIGURATION ------------------
const PORT = process.env.PORT || 3000;

// ------------------ DUMMY DATA ------------------

// Users data
let users = [];

// Books data
let books = [
  {
    id: 1,
    title: "JavaScript Basics",
    author: "John Doe",
    category: "Programming",
    price: 500
  },
  {
    id: 2,
    title: "HTML & CSS",
    author: "Jane Smith",
    category: "Web",
    price: 400
  }
];

// Orders data
let orders = [];

// ------------------ API ROUTES ------------------

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

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

