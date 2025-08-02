<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
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


>>>>>>> 661772c0b5b588a1cd11af9fbffc136174cd9e3d
