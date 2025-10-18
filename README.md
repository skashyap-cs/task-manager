#  Task Manager — Full Stack Application

A simple full-stack Task Manager built using **React (Vite)** for the frontend and **Express.js + Node.js** for the backend.

---

##  Features
- Create, edit, and delete tasks  
- Real-time data updates  
- Dark mode UI with modern layout  
- Audit Logs system for tracking actions  
- REST API integration (Express backend)  
- Deployed locally using Vite + Node

---

##  Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | JSON (temporary in-memory for demo) |
| **Version Control** | Git & GitHub |

---

##  Setup Instructions

### 1️ Clone the Repository
```bash
git clone https://github.com/skashyap-cs/task-manager.git
Backend Setup
cd backend
npm install
npm start
Backend will run on: http://localhost:4000

##Frontend Setup
cd frontend
npm install
npm run dev

##Folder Structure
task-manager/
│
├── backend/              # Express.js backend
│   ├── routes/           # API route handlers
│   ├── server.js         # Main backend entry point
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── api/          # API handler files
│   │   └── main.jsx      # React app entry
│
└── README.md             # Project documentation

##Sample UI
+-------------------------------------------+
| Task Manager                              |
|-------------------------------------------|
| ID | Title      | Description  | Created  |
|----|-------------|--------------|----------|
| 1  | Test Task  | Description  | Time     |
+-------------------------------------------+
Author

Sameer Kashyap
B.Tech in Computer Science Engineering
National Institute of Technology Karnataka, Surathkal
