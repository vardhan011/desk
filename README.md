Front Desk System 

This is a Front Desk Management System . The application focuses on managing patient queues and doctor appointments in a clinic setup. The system is developed using NestJS (Backend) and Next.js (Frontend), with MySQL as the database.
Tech Stack 🛠️

    Backend: NestJS + TypeORM

    Frontend: Next.js 14 (App Router)

    Database: MySQL (Hosted on Railway)

    ORM: TypeORM

    Deployment: Railway (Database), Localhost (App - Pending deployment)

Features Implemented ✅

    User Authentication (JWT-based)

    Doctor Module (CRUD)

    Queue Management (Add to Queue, View Current Queue)

    Appointment Module (Book, Reschedule, Cancel)

    Database Integration with MySQL

    Modular Folder Structure for NestJS

    API integration for frontend (in progress)


How to Run Locally 🖥️
1. Clone the repository

git clone https://github.com/vardhan011/desk.git
cd desk

2. Setup Backend

cd front-desk-backend
npm install

3. Configure .env

Create a .env file in front-desk-backend/ and add:

DATABASE_URL=mysql://root:<password>@<host>:<port>/railway
JWT_SECRET=your_jwt_secret

4. Run Backend Server

npm run start:dev

5. Setup Frontend

cd ../frontdesk-frontend
npm install
npm run dev
