import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for demo purposes. Replace with a real DB for production.
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
];
let nextId = books.length + 1;

app.get("/", (req, res) => {
  res.json({ message: "Assignment 6 Book API is running", endpoints: ["GET /api/books", "GET /api/books/:id", "POST /api/books"] });
});

// GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET one book by id
app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

// POST create a new book
app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const book = { id: nextId++, title, author, year: year ? Number(year) : undefined };
  books.push(book);
  res.status(201).json(book);
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Book API listening on http://localhost:${port}`);
});
