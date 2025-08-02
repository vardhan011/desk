

# 🏥 Front Desk Management System

A **Full-Stack Front Desk Application** to manage **patient queues** and **doctor appointments** at clinics. Built with **NestJS (Backend)** and **Next.js 14 (Frontend)**, using **MySQL** for database management.

---

## 🚀 Tech Stack

| Frontend  | Backend | Database | ORM    | Deployment |
|-----------|---------|----------|--------|------------|
| Next.js 14 (App Router) | NestJS + TypeORM | MySQL (Railway) | TypeORM | Railway (DB), Localhost (App) |

---

## ✨ Features Implemented

- 🔒 JWT-based **User Authentication**
- 🩺 **Doctor Module** (CRUD operations)
- 📋 **Queue Management** (Add to Queue, View Current Queue)
- 📅 **Appointment Module** (Book, Reschedule, Cancel)
- 🗄️ **Database Integration with MySQL**
- 🗂️ Modular folder structure (NestJS)
- 🔗 **API integration with frontend (In Progress)**

---

## 📂 Project Structure

desk/
├── front-desk-backend/ --> NestJS Backend (API, Services)
├── frontdesk-frontend/ --> Next.js 14 Frontend (App Router)


---

## 🖥️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/vardhan011/desk.git
cd desk

2. Setup Backend

cd front-desk-backend
npm install

Create .env file:

DATABASE_URL=mysql://root:<password>@<host>:<port>/railway
JWT_SECRET=your_jwt_secret

Run Backend Server:

npm run start:dev

3. Setup Frontend

cd ../frontdesk-frontend
npm install
npm run dev
