// Fetch books on home page
$(document).ready(function () {
  $.get("/api/books", function (data) {
    data.forEach(book => {
      $("#book-list").append(`
        <div>
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>Price: ${book.price}</p>
        </div>
      `);
    });
  });
});

// Signup
function signup() {
  $.post("/api/signup", {
    name: $("#name").val(),
    email: $("#email").val(),
    password: $("#password").val()
  }, () => alert("Registered Successfully"));
}

// Login
function login() {
  $.post("/api/login", {
    email: $("#email").val(),
    password: $("#password").val()
  }, res => {
    alert(res.success ? "Login Success" : "Invalid Credentials");
  });
}

// Admin: Add Book
function addBook() {
  $.post("/api/books", {
    id: Date.now(),
    title: $("#title").val(),
    author: $("#author").val(),
    category: $("#category").val(),
    price: $("#price").val()
  }, () => alert("Book Added"));
}
