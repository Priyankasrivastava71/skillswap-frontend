# SkillSwap – Frontend

SkillSwap is a full-stack skill exchange platform where users can offer skills, request skills, schedule sessions, and leave feedback after completing a session.

This repository contains the frontend application built with React and Tailwind CSS.

---

## 🚀 Live Backend API

Backend Deployment Link:  
👉 https://skillswap-backend-5k4u.onrender.com

---

## 🛠 Tech Stack

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Lucide Icons
- Context API (Authentication & State Management)

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes
- Persistent login state

### 👤 Profile Management
- Edit profile (name, bio, skills offered, skills wanted)
- View other users' profiles
- Display user ratings
- Feedback section on profile

### 🔎 Explore & Matching
- Browse all users
- Search users by skill
- Perfect skill match system
- Top-rated experts section

### 🔄 Skill Requests Workflow
- Send skill request
- Accept / Reject requests
- Schedule session
- Mark session as completed
- Leave feedback after session completion

### ⭐ Feedback System
- 1–5 star rating
- Optional comment
- Automatic average rating calculation
- Feedback displayed on user profile

### 💬 Community Posts
- Create post
- View posts
- Add comments
- Delete own comments
- Pagination support

### 🔔 Notifications
- Request notifications
- Session scheduled notifications
- Feedback received notifications
- Mark notifications as read

### 🌙 Dark / Light Mode
- Fully functional theme toggle
- Persistent theme preference using localStorage
- Responsive UI for all screen sizes

---

## 📂 Project Structure

src/
 ├── api/
 ├── components/
 ├── context/
 ├── pages/
 ├── routes/
 ├── App.jsx
 └── main.jsx

---

## ⚙️ Installation & Setup

1. Clone the repository:

git clone YOUR_FRONTEND_REPO_LINK
cd skillswap-frontend

2. Install dependencies:

npm install

3. Create a `.env` file in the root:

VITE_API_URL=http://localhost:5000/api

(Replace with your deployed backend URL in production.)

4. Start development server:

npm run dev

---

## 🌐 API Integration

The frontend communicates with the backend via Axios.

Base URL is configured in:

src/api/axios.js

Make sure the backend is running and CORS is properly configured.

---

## 📱 Responsive Design

- Mobile-first layout
- Sidebar with hamburger menu
- Clean dashboard layout
- Optimized card components

---

## 🎯 Future Improvements

- Real-time notifications
- Chat system
- File/resource uploads
- Advanced filtering
- Session reminders

---

## 👩‍💻 Author

Developed as a full-stack project demonstrating:
- Authentication flow
- CRUD operations
- Role-based interactions
- State management
- Modern UI/UX design

---

## 📌 Note

This is the frontend application.
Backend API must be running and connected for full functionality.