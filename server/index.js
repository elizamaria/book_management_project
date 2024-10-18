const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "Author Name",
    description:
      "The story concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
    type: "Novel",
  },
  {
    id: 2,
    title: "The Great",
    author: "Author Name 2",
    description:
      "The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
    type: "Fiction",
  },
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
  const book = { id: Date.now(), ...req.body };
  books.push(book);

  res.status(201).json(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
