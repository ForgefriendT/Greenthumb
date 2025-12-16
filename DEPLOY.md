# Deployment Guide for GreenThumb 🌿

This guide will help you deploy your full-stack application. Since you have a **Frontend (React)** and a **Backend (Node.js/Express)**, they need to be hosted separately.

## 1. Deploy Backend (Render)
Render is a cloud provider that offers a free tier for Node.js services.

1.  **Push your Code to GitHub**: Make sure your latest code (including the backend folder) is on GitHub.
2.  **Sign Up/Login to Render**: Go to [render.com](https://render.com/) and login with your GitHub account.
3.  **Create New Web Service**:
    *   Click the "New +" button and select "Web Service".
    *   Connect your GitHub repository.
4.  **Configure Service**:
    *   **Name**: `greenthumb-api` (or similar)
    *   **Root Directory**: `backend` (Important! This tells Render where your server code is)
    *   **Environment**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables**:
    *   Scroll down to "Environment Variables" and click "Add Environment Variable".
    *   Add `MONGO_URI`: Paste your MongoDB connection string (same as in your `.env` file).
    *   Add `JWT_SECRET`: Paste your secret (same as `.env`).
6.  **Deploy**: Click "Create Web Service". Render will start building.
7.  **Copy URL**: Once deployed, you will get a URL like `https://greenthumb-api.onrender.com`. **Copy this URL**, you will need it for the frontend.

---

## 2. Deploy Frontend (GitHub Pages or Vercel)
Vercel is generally easier for React/Vite apps.

### Option A: Vercel (Recommended)
1.  **Sign Up/Login to Vercel**: Go to [vercel.com](https://vercel.com/) and login with GitHub.
2.  **Add New Project**:
    *   Click "Add New..." -> "Project".
    *   Import your `GreenThumb` repository.
3.  **Configure Project**:
    *   **Framework Preset**: Vite (should detect auto-magically).
    *   **Root Directory**: Edit this and select `frontend`.
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: The URL you copied from Render (e.g., `https://greenthumb-api.onrender.com`). **Do not add a trailing slash `/`**.
5.  **Deploy**: Click "Deploy".
6.  **Done!**: Your app is now live.

### Option B: GitHub Pages
Since you are using Vite, this requires a bit more config (setting `base` in `vite.config.js`). Vercel handles this automatically, so I highly recommend Option A for simplicity.

## 3. Testing
1.  Open your new Vercel URL.
2.  Try to Register/Login.
    *   *Note: Render free tier spins down after inactivity. The first request might take 30-60 seconds. Be patient!*
3.  Enjoy your deployed app! 🚀
