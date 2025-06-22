# 📚 Library Management API (NoSQL - MongoDB + Express)

An online library system built using **Express.js**, **MongoDB**, and **Mongoose** that supports book management and borrowing functionality.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) for books
- Borrow books with inventory check
- Aggregated summary of borrowed books
- Error handling with consistent response format
- Filtering, sorting, and limiting books via query
- Built with modular architecture

---

# API Endpoints
1. Books
- POST /api/books — create a new book

- GET /api/books — get all books (supports ?filter=GENRE&sortBy=FIELD&sort=asc|desc&limit=NUMBER)

- GET /api/books/:bookId — get book by ID

- PATCH /api/books/:bookId — update book

- DELETE /api/books/:bookId — delete book

2. Borrow
- POST /api/borrow — borrow a book
- Payload: book (ObjectId), quantity (number), dueDate (ISO date)

- GET /api/borrow — returns summary of all borrowed books
- Shows book title, isbn, and total borrowed quantity

---

# Response Format
- All responses follow this format:

1. success: true or false

2. message: brief status message

3. data: actual payload or null

4. error: error object (only on failure)

---

# Important Links
- GitHub Repository Link: 

- Live Deployment Link: 

- Video Explanation: https://drive.google.com/file/d/1diIws8ZIIjh1HI0g1X2Bp8onZS-4lE_W/view

---

# Tech Stack
1. Node.js

2. Express.js

3. TypeScript

4. MongoDB

5. Mongoose

6. Vercel