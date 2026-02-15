# Full Stack Profile Management App — gidy-profile-project

Full-stack Profile Page Replica built with React.js, Express.js, and MongoDB Atlas. Features profile viewing, editing, and a skill endorsement system with REST API integration.

---

## Tech Stack

- Frontend: React.js, Tailwind CSS, Vite
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication

---

## Features

- User registration and login
- JWT-based authentication
- Profile creation and update
- Skill endorsement system
- Secure REST API endpoints

---

## Innovation Feature

Users can endorse each other’s skills — this adds interactivity and credibility to profiles, similar to LinkedIn’s skill system. It encourages engagement and provides social proof of expertise.

---

## Setup Instructions (Local)

1. Clone the repository:

   ```bash
   git clone <https://github.com/Balaji007k/gidy-profile-project.git>
   ```

2. Install dependencies:

   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`

3. Create a `.env` file in the `server/` folder with the following values:

   ```env
   MONGO_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. Start the backend and frontend:

   - Start backend: `cd server && npm run dev`
   - Start frontend: `cd client && npm run dev`

5. Open the app in your browser:

   - http://localhost:5173

---

## 🔗 Live Link

Add your deployed URL here: `[https://balaji007k.github.io/gidy-profile-project/]`

---

## ✍️ Author

Balaji K
