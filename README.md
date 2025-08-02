🏥 Front Desk Management System

A Full-Stack Clinic Front Desk Application designed to manage Patient Queues and Doctor Appointments seamlessly, using modern technologies like NestJS, Next.js, and MySQL.
🛠️ Tech Stack
Component	Technology
Backend	NestJS + TypeORM
Frontend	Next.js 14 (App Router)
Database	MySQL (Railway Cloud)
ORM	TypeORM
Deployment	Railway (DB), Localhost (App - Pending Deployment)
✅ Features Implemented

    🔐 User Authentication (JWT)

    👨‍⚕️ Doctor Management (CRUD Operations)

    🧑‍🤝‍🧑 Patient Queue System (Add/View Queue)

    🗓️ Appointment Module (Book / Reschedule / Cancel)

    🗄️ MySQL Database Integration

    📦 Modular NestJS Folder Structure

    🔄 API Integration with Frontend (In Progress)

🚀 How to Run Locally
1️⃣ Clone Repository

git clone https://github.com/vardhan011/desk.git
cd desk

2️⃣ Setup Backend

cd front-desk-backend
npm install

3️⃣ Configure Environment Variables

Create a .env file inside front-desk-backend/:

DATABASE_URL=mysql://root:<password>@<host>:<port>/railway
JWT_SECRET=your_jwt_secret

4️⃣ Run Backend Server

npm run start:dev

5️⃣ Setup Frontend

cd ../frontdesk-frontend
npm install
npm run dev


