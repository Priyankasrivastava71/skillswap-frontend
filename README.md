# SkillSwap – Frontend

SkillSwap is a full-stack skill exchange platform where users can offer skills, request skills, schedule sessions, leave feedback, and build ratings.

It includes smart skill matching, top-rated users, community posts with comments, resource sharing, notifications, dashboard analytics, and a fully responsive dark-mode UI.

This repository contains the frontend application built with React and Tailwind CSS.

---

## Deployment Link 

Frontend Live URL:
https://skillswap-frontend-two.vercel.app


## 🚀 Live Backend API

Backend Deployment Link:  
👉 https://skillswap-backend-5k4u.onrender.com

---

## Login Credentials (Demo Account)
Email: masai@gmail.com
Password: 12345678


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

VITE_API_URL=https://skillswap-backend-5k4u.onrender.com/api


4. Start development server:

npm run dev

---

## 🌐 API Integration

The frontend communicates with the backend via Axios.

Base URL is configured in:

src/api/axios.js


---

## 📱 Responsive Design

- Mobile-first layout
- Sidebar with hamburger menu
- Clean dashboard layout
- Optimized card components

---


## 👩‍💻 Author

Developed as a full-stack project demonstrating:
- Authentication flow
- CRUD operations
- Role-based interactions
- State management
- Modern UI/UX design

---

## Screenshot
Login - https://drive.google.com/file/d/1hlsV0j4PbWPhb8cr7icfW30_yJb7sa_M/view?usp=sharing

Dashboard- https://drive.google.com/file/d/1VpcLRwCiiIMr8WJO92zn1sTfz1c593PS/view?usp=sharing

Explor - https://drive.google.com/file/d/1DDJABkmZcHF0k7df_rfM3npH8ig73VGf/view?usp=sharing

Post - https://drive.google.com/file/d/1WShI5NXxEVpiMydf0gQpkWkx6Prc_5l9/view?usp=sharing

Request - https://drive.google.com/file/d/1r6BcuOp8a-XXRPXb0b1rUbrwSq_FfUBl/view?usp=sharing

Calendar - https://drive.google.com/file/d/1KTLY8uJgFoCR6fATVI_2CPcSzqV_G5pT/view?usp=sharing

Resource - https://drive.google.com/file/d/1ESITJtVMLMJFHpbzsdN5aDujfWuh6WaR/view?usp=sharing

Profile - https://drive.google.com/file/d/1yDZlAQdYy1Bv61fNWUWuzh1zoUbGqxfW/view?usp=sharing


## Video Walkthrough Link

https://drive.google.com/file/d/1mQoe2D1DPAkyguwEnsh9OVLP_VwMnZze/view?usp=sharing

