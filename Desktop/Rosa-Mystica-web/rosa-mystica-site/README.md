# Rosa Mystica India – Web Project

This is a full-stack e-commerce platform for Rosa Mystica India built using:

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Supabase) or MongoDB (Atlas)
- **Hosting:** Vercel (frontend), Render (backend)

## Project Structure


## Getting Started

1. `cd client && npm start` – to run frontend
2. `cd server && npm run dev` – to run backend

rosa-mystica-site/
├── client/ # React frontend
├── server/ # Node backend
└── database/ # Optional SQL files


rosa-mystica-site/
│
├── client/              # React frontend (Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/              # Node.js + Express backend (Render)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── database/            # Optional: SQL schema, ER diagrams, backups
