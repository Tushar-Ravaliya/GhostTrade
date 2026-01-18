# GhostTrade - MERN Stack Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for trading with a modern UI built with React and Vite.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start with Docker](#quick-start-with-docker)
- [Running Locally Without Docker](#running-locally-without-docker)
- [Project Structure](#project-structure)
- [Useful Commands](#useful-commands)

---

## 🎯 Project Overview

GhostTrade is a MERN stack application that combines:

- **Frontend**: Modern React UI with Vite for fast development
- **Backend**: Node.js Express server with API endpoints
- **Database**: MongoDB for data storage

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose
- **Development**: Nodemon (for hot reload)

---

## ✅ Prerequisites

Before you start, make sure you have:

1. **Git** - For cloning the repository
2. **Docker** - For containerization
3. **Docker Compose** - For managing multiple containers

If you don't have Docker installed:

- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow the [official guide](https://docs.docker.com/engine/install/)

---

## 🚀 Quick Start with Docker

The **easiest way** to run this project!

### Step 1: Clone or Copy the Project

```bash
git clone https://github.com/Tushar-Ravaliya/GhostTrade.git
cd GhostTrade
```

Or if you already have the project folder, navigate to it:

```bash
cd path/to/GhostTrade
```

### Step 2: Create Environment File

Create a `.env` file in the **root directory** (same level as `docker-compose.yml`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ghosttrade
# Add any other environment variables your backend needs
```

### Step 3: Start Everything with Docker

Run this single command in your terminal:

```bash
docker-compose up --build
```

This command will:

- ✅ Download necessary images
- ✅ Build Docker images for frontend and backend
- ✅ Start both services automatically
- ✅ Set up hot-reload for live code updates

### Step 4: Access the Application

Once you see messages like "Server running on port 5000" and "Vite dev server running":

- **Frontend**: Open your browser and go to **http://localhost:3000**
- **Backend API**: Accessible at **http://localhost:5000**

### 🛑 Stop the Application

To stop all services, press `Ctrl + C` in the terminal or run:

```bash
docker-compose down
```

---

## 💻 Running Locally Without Docker

If you prefer to run the project without Docker:

### Backend Setup

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

   The server will run on **http://localhost:5000**

### Frontend Setup

1. Open a new terminal and navigate to the client folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on **http://localhost:3000**

---

## 📁 Project Structure

```
GhostTrade/
├── docker-compose.yml    # Docker configuration for both services
├── README.md             # This file
│
├── client/               # Frontend (React + Vite)
│   ├── Dockerfile        # Frontend container configuration
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│   └── src/              # React components and styling
│
└── server/               # Backend (Node.js + Express)
    ├── Dockerfile        # Backend container configuration
    ├── package.json      # Backend dependencies
    ├── src/
    │   ├── app.js        # Express app setup
    │   ├── index.js      # Server entry point
    │   ├── controllers/   # Route controllers
    │   ├── routes/       # API routes
    │   ├── models/       # Database schemas
    │   ├── middlewares/  # Custom middlewares
    │   ├── validators/   # Input validation
    │   ├── db/           # Database connection
    │   └── utils/        # Helper functions
```

---

## 📚 Useful Commands

### Docker Commands

| Command                      | Purpose                          |
| ---------------------------- | -------------------------------- |
| `docker-compose up --build`  | Build and start all services     |
| `docker-compose up`          | Start services (without rebuild) |
| `docker-compose down`        | Stop and remove all containers   |
| `docker-compose logs`        | View logs from all services      |
| `docker-compose logs server` | View only backend logs           |
| `docker-compose logs client` | View only frontend logs          |
| `docker-compose restart`     | Restart all services             |

### Local Development Commands

**Backend**:

```bash
cd server
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
```

**Frontend**:

```bash
cd client
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

```bash
# Find and stop the process using the port
netstat -ano | findstr :3000  # On Windows
lsof -i :3000                 # On Mac/Linux
```

### Docker Not Found

Make sure Docker Desktop is running:

- **Windows/Mac**: Open Docker Desktop application
- **Linux**: Start Docker service with `sudo systemctl start docker`

### Containers Not Starting

Check logs for errors:

```bash
docker-compose logs
```

### Hot Reload Not Working

This is normal behavior. Simply stop (`Ctrl + C`) and restart:

```bash
docker-compose up
```

---

## 📝 Notes

- Both services have **volume mounts** for live code updates during development
- Backend uses **Nodemon** for automatic restart on code changes
- Frontend uses **Vite** for hot module replacement (HMR)
- Changes to code files appear immediately without rebuilding containers

---

## 👨‍💻 Author

Tushar Ravaliya

---

## 📄 License

This project is open source and available under the MIT License.

---

## ❓ Need Help?

- Check the troubleshooting section above
- Review Docker logs: `docker-compose logs`
- Make sure all prerequisites are installed
- Ensure ports 3000 and 5000 are available
