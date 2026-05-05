# 👻 GhostTrade — Paper Trading Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) paper trading application that lets users practise stock trading risk-free with a **$100,000 virtual balance**. It features real-time market data, interactive stock charts, portfolio management, transaction history, and a modern UI built with React 19 and Tailwind CSS v4.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Quick Start with Docker](#-quick-start-with-docker)
- [Running Locally Without Docker](#-running-locally-without-docker)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Useful Commands](#-useful-commands)
- [Troubleshooting](#-troubleshooting)
- [Authors](#-authors)
- [License](#-license)

---

## ✨ Features

| Category | Details |
| --- | --- |
| **Risk-Free Trading** | Start with a virtual $100,000 balance to experiment with trading strategies |
| **Real-Time Market Data** | Live stock quotes, search, and top market movers via the TwelveData API |
| **Interactive Charts** | Candlestick / time-series charts powered by Lightweight Charts |
| **Portfolio Dashboard** | Track holdings, average buy price, total invested, and current value |
| **Transaction History** | Full buy/sell ledger with timestamps and balance-after tracking |
| **User Profiles** | Profile management with photo uploads via ImageKit |
| **Authentication** | JWT-based auth with bcrypt password hashing and cookie-based sessions |
| **Real-Time Updates** | Socket.IO integration for live data streaming |
| **Responsive UI** | Smooth animations via Motion (Framer Motion) and mobile-friendly layouts |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 19.2 | UI library |
| Vite | 7.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| Zustand | 5.x | Lightweight state management |
| React Router | 7.x | Client-side routing |
| Motion | 12.x | Animations & transitions |
| Lightweight Charts | 5.x | Financial chart rendering |
| Lucide React | — | Icon library |
| Axios | — | HTTP client |
| Socket.IO Client | 4.x | Real-time communication |

### Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | — | Runtime |
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| JSON Web Token | — | Authentication |
| bcrypt | 6.x | Password hashing |
| Socket.IO | 4.x | Real-time server |
| ImageKit | 6.x | Image upload & CDN |
| Multer | 2.x | File upload middleware |
| Nodemon | — | Dev hot-reload |

### DevOps & Tooling

- **Docker & Docker Compose** — Containerised development
- **Husky + lint-staged** — Pre-commit hooks
- **Prettier & ESLint** — Code formatting & linting

---

## ✅ Prerequisites

1. **Git** — For cloning the repository
2. **Node.js** (v18+) — Required for local development
3. **MongoDB** — Local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
4. **Docker & Docker Compose** — Required only if running via containers

> If you don't have Docker installed:
> - **Windows / Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
> - **Linux**: Follow the [official guide](https://docs.docker.com/engine/install/)

---

## 🔑 Environment Variables

Create a **`.env`** file in the **root directory** (same level as `docker-compose.yml`):

```env
# Server
PORT=5000
MONGO_URI=mongodb://localhost:27017/ghosttrade
JWT_SECRET=your_jwt_secret_here
CORS_ALLOWED_ORIGINS=http://localhost:3000

# TwelveData API (two keys for rate-limit rotation)
TWELVE_DATA_API_KEY=your_twelvedata_api_key
TWELVE_DATA_API_KEY2=your_twelvedata_api_key_2

# ImageKit (profile photo uploads)
IMAGEKIT_PRIVATE=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

> **Where to get API keys:**
> - **TwelveData** — Sign up at [twelvedata.com](https://twelvedata.com/) (free tier available)
> - **ImageKit** — Sign up at [imagekit.io](https://imagekit.io/) (free tier available)

---

## 🚀 Quick Start with Docker

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tushar-Ravaliya/GhostTrade.git
cd GhostTrade
```

### Step 2: Create the `.env` File

Follow the [Environment Variables](#-environment-variables) section above.

### Step 3: Start Everything

```bash
docker-compose up --build
```

This will:

- ✅ Pull and build Docker images for frontend and backend
- ✅ Start both services with hot-reload enabled
- ✅ Mount source code volumes for live updates

### Step 4: Access the Application

| Service | URL |
| --- | --- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:5000](http://localhost:5000) |

### Stop the Application

```bash
docker-compose down
```

---

## 💻 Running Locally Without Docker

### Backend

```bash
cd server
npm install
npm run dev
```

The server starts on **http://localhost:5000**.

### Frontend

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

The frontend starts on **http://localhost:3000**.

> **Note:** Make sure MongoDB is running locally or your `MONGO_URI` points to an active Atlas cluster.

---

## 📁 Project Structure

```
GhostTrade/
├── .gitignore
├── docker-compose.yml          # Multi-container orchestration
├── README.md
│
├── client/                     # Frontend — React + Vite + Tailwind v4
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── eslint.config.js
│   ├── .prettierrc
│   ├── public/                 # Static assets
│   └── src/
│       ├── main.jsx            # App entry point
│       ├── App.jsx             # Route definitions
│       ├── Layout.jsx          # Shared layout (Navbar + Footer)
│       ├── index.css           # Global styles
│       ├── store/
│       │   └── useAuthStore.js # Zustand auth state
│       ├── Components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── AboutUs/
│       │   ├── Home/
│       │   ├── LoginPage/
│       │   ├── Market/
│       │   ├── Portfolio/
│       │   └── StocksDetails/
│       └── Pages/
│           ├── Home.jsx
│           ├── Market.jsx
│           ├── Portfolio.jsx
│           ├── StockDetails.jsx
│           ├── History.jsx
│           ├── Profile.jsx
│           ├── AboutUs.jsx
│           ├── login.jsx
│           ├── Register.jsx
│           └── NotFound.jsx
│
└── server/                     # Backend — Node.js + Express 5
    ├── Dockerfile
    ├── package.json
    ├── nodemon.json
    ├── .prettierrc
    ├── Api/                    # API test files (YAML)
    ├── public/                 # Uploaded files
    └── src/
        ├── index.js            # Server entry (HTTP + Socket.IO)
        ├── app.js              # Express app & route mounting
        ├── config/
        │   ├── config.js       # Centralised env config
        │   ├── imagekit.config.js
        │   ├── multer.config.js
        │   ├── twelvedata.config.js
        │   └── twelvedata2.config.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── user.controller.js
        │   ├── market.controller.js
        │   ├── trade.controller.js
        │   └── about.controller.js
        ├── routes/
        │   ├── auth.routes.js
        │   ├── user.routes.js
        │   ├── market.route.js
        │   ├── trade.routes.js
        │   └── about.routes.js
        ├── models/
        │   ├── user.models.js
        │   ├── portfolio.model.js
        │   ├── transaction.model.js
        │   └── about.model.js
        ├── middlewares/
        │   └── auth.middleware.js
        ├── services/
        │   └── market.service.js
        ├── db/                 # Database connection
        ├── utils/
        │   ├── api-error.js
        │   ├── api-response.js
        │   └── async-handler.js
        └── validators/         # Input validation (placeholder)
```

---

## 🔌 API Endpoints

All endpoints are prefixed with **`/api/v1`**.

### Authentication — `/api/v1/auth`

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/login` | Log in with email & password |
| `POST` | `/register` | Create a new account |
| `POST` | `/logout` | Log out (clear session) |

### User — `/api/v1/user` 🔒

> All routes require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/me` | Get current user profile |
| `PUT` | `/update-profile` | Update profile details |
| `PUT` | `/upload-photo` | Upload profile photo (multipart) |
| `PUT` | `/change-password` | Change password |

### Market — `/api/v1/market`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/timeseries/:symbol` | Get time-series data for a stock |
| `GET` | `/market-movers` | Get top market gainers & losers |
| `GET` | `/quote/:symbol` | Get real-time quote for a symbol |
| `GET` | `/search?query=...` | Search for stock symbols |
| `GET` | `/logo/:symbol` | Get stock logo |

### Trade — `/api/v1/trade` 🔒

> All routes require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/buy` | Buy shares of a stock |
| `POST` | `/sell` | Sell shares of a stock |
| `GET` | `/portfolio` | Get all holdings |
| `GET` | `/portfolio/:symbol` | Get holding for a specific symbol |
| `GET` | `/transactions` | Get transaction history |

### About — `/api/v1/about`

| Method | Endpoint | Description |
| --- | --- | --- |
| — | — | About / team information endpoints |

---

## 🗄 Database Models

### User

| Field | Type | Details |
| --- | --- | --- |
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, lowercase |
| `password` | String | Hashed with bcrypt (10 rounds) |
| `mobileNo` | String | Required |
| `profilePhoto` | String | ImageKit URL |
| `status` | Enum | `active` · `inactive` · `deleted` · `banned` |
| `balance` | Number | Default: `100,000` |

### Portfolio

| Field | Type | Details |
| --- | --- | --- |
| `user` | ObjectId → User | Required |
| `symbol` | String | Uppercase, trimmed |
| `quantity` | Number | Min: 0 |
| `avgBuyPrice` | Number | Weighted average |
| `totalInvested` | Number | Cumulative cost |

> Compound unique index on `(user, symbol)`.

### Transaction

| Field | Type | Details |
| --- | --- | --- |
| `user` | ObjectId → User | Required |
| `symbol` | String | Uppercase, trimmed |
| `type` | Enum | `buy` · `sell` |
| `quantity` | Number | Min: 1 |
| `price` | Number | Price per share at execution |
| `total` | Number | `quantity × price` |
| `balanceAfter` | Number | User balance after trade |

> Indexed on `(user, createdAt)` for fast history queries.

---

## 📚 Useful Commands

### Docker

| Command | Purpose |
| --- | --- |
| `docker-compose up --build` | Build and start all services |
| `docker-compose up` | Start services (skip rebuild) |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs` | View all logs |
| `docker-compose logs server` | View backend logs only |
| `docker-compose logs client` | View frontend logs only |
| `docker-compose restart` | Restart all services |

### Local Development

**Backend:**

```bash
cd server
npm install          # Install dependencies
npm run dev          # Start dev server with Nodemon
```

**Frontend:**

```bash
cd client
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000

# Mac / Linux
lsof -i :3000
```

### Docker Not Found

Make sure Docker Desktop is running:

- **Windows / Mac** — Open the Docker Desktop application
- **Linux** — `sudo systemctl start docker`

### Containers Not Starting

```bash
docker-compose logs    # Check for errors
```

### MongoDB Connection Issues

- Verify `MONGO_URI` in your `.env` file
- Ensure MongoDB is running locally or your Atlas IP whitelist includes your address

### Hot Reload Not Working

Stop (`Ctrl + C`) and restart the containers:

```bash
docker-compose up
```

---

## 📝 Notes

- Both services use **volume mounts** for live code updates during development
- Backend uses **Nodemon** for automatic restart on file changes
- Frontend uses **Vite HMR** for instant module replacement
- The server loads `.env` from the **parent directory** (`../. env`) relative to `server/`
- Socket.IO is configured on the same HTTP server for real-time features
- CORS is restricted to origins specified in `CORS_ALLOWED_ORIGINS`

---

## 👨‍💻 Authors

- **Tushar Ravaliya**
- **Keyuri Jethwa**
- **Harshit Nananiya**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ❓ Need Help?

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review Docker logs — `docker-compose logs`
3. Ensure all [environment variables](#-environment-variables) are set correctly
4. Confirm ports **3000** and **5000** are available
