# Matchmaking App

## 📌 Project Overview
This is a **local job-matching and chat platform**, similar to Naukri, but designed to work with a **local database**. Users can **sign up, log in, view projects, apply**, and **chat with other users** in real-time. The app is optimized for fast message retrieval and a seamless user experience.

## ✨ Features
- **User Authentication** – Login and Signup with a local database.
- **Project Listings** – Browse available projects and apply.
- **Chat System** – Message other users instantly.
- **Local Storage** – Uses a JSON-based local database to manage users, projects, and messages.
- **Optimized Chat** – Ensures fast message updates between users.

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/matchmaking-app.git
cd matchmaking-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Local JSON Server
```sh
npx json-server --watch db.json --port 3001
```
This will run a local database server at `http://localhost:3001`

### 4️⃣ Start the Frontend App
```sh
npm run dev
```
Your app will now be accessible at `http://localhost:5173`

## 🔑 User Login & Signup Process
1. **Signup (If No Account)**  
   - Open the app and go to the **Signup page**.
   - Enter your **name, email, and password**.
   - Click **Sign Up** – your account will be stored locally.

2. **Login**  
   - If you already have an account, go to the **Login page**.
   - Enter your registered **email and password**.
   - Click **Login** – You’ll be redirected to the dashboard.

## 🛠 How to Use the App
- After **logging in**, users can:
  - **View projects** and apply to the ones they like.
  - **Chat with other users** in real-time.
  - **Access messages instantly** thanks to the optimized chat system.

## 📢 Future Enhancements
- Implementing **JWT authentication** for security.
- Adding a **database backend (Node.js + MongoDB)**.
- Enhancing chat with **WebSockets for real-time updates**.

## 💡 Contributing
Feel free to **fork this project, improve it, and submit pull requests**! 😊

## 📄 License
MIT License - Free to use and modify.

