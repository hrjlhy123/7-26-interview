# 📝 Full Stack To-Do List App

A simple and secure full-stack web application for managing personal to-do tasks. Users can register, log in, and manage their own tasks — with full CRUD functionality and JWT-based authentication.

## 🔧 Tech Stack

### Front-end
- React
- Bootstrap 5
- React Router DOM

### Back-end
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Token) for Authentication

### Tools
- ESLint + Prettier (code formatting)
- Jest + Supertest (unit testing)
- Dotenv (environment variable management)
- GitHub

---

## 🚀 Features

### ✅ User Authentication
- Register with username, email, and password
- Secure login with JWT-based sessions
- Protected routes for logged-in users

### ✅ Task Management
- Add, edit, delete, and view tasks
- Each user only sees their own tasks
- Sorted by creation time (newest first)

### ✅ Extras
- Form validation (client + server)
- Graceful error handling
- Responsive mobile-friendly design
- Unit tests for key endpoints and components
- Ready for cloud deployment

---

## 📦 API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/register`      | Register a new user      |
| POST   | `/api/login`         | Authenticate user login  |
| GET    | `/api/tasks`         | Get user's tasks         |
| POST   | `/api/tasks`         | Create new task          |
| PUT    | `/api/tasks/:id`     | Update task              |
| DELETE | `/api/tasks/:id`     | Delete task              |

---

## 🖥️ Local Setup

### 1. Clone Repo
```bash
git clone https://github.com/hrjlhy123/7-26-interview.git
cd 7-26-interview
```

### 2. Set Up Back-end
```bash
cd server
npm install
```

#### Create `.env` file in `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
npm run dev
```

### 3. Set Up Front-end
```bash
cd ../client
npm install
npm start
```

> Frontend: http://localhost:3000  
> Backend API: http://localhost:5000/api

---

## 🧪 Testing

### Run All Tests
```bash
cd server
npm test
```

---

## 📁 Project Structure

```
client/ # Front-end (React)
server/ # Back-end (Node.js + Express)
│
├── models/ # Mongoose schemas
├── routes/ # API route handlers
├── middleware/ # Custom middleware (auth, error handling)
├── tests/ # Unit tests
```

---

## 🧠 Author

**Jack Hao**  
📧 [haoruojie@cityuniversity.edu](mailto:haoruojie@cityuniversity.edu)  
🔗 [LinkedIn](https://www.linkedin.com/in/hrjlhy)

---

## ✅ License

MIT

---

## 📌 Acknowledgements

This project is part of a Full Stack Web Developer Challenge.  
Thanks to the reviewers and mentors!
