# 🌱 GreenThumb

A full-stack MERN application that helps plant enthusiasts track their plants, manage watering schedules, and connect with a community of fellow plant lovers.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ Features

### 🪴 Plant Management
- **Add Plants**: Track your plants with custom names, watering frequencies, images, and notes
- **Smart Watering Reminders**: Visual indicators for plants that need watering today or are overdue
- **One-Click Watering**: Update watering status with a single click
- **Plant Gallery**: Beautiful card-based layout displaying all your plants

### 💬 Community Forum
- **Create Posts**: Share plant tips, questions, and experiences with the community
- **Image Sharing**: Attach images to your posts
- **Comments**: Engage with other users through comments
- **User Avatars**: Automatically generated avatars for each user

### 🔐 Authentication
- **User Registration**: Secure account creation with password hashing
- **JWT Authentication**: Token-based authentication for secure API access
- **Protected Routes**: Dashboard and features accessible only to authenticated users

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: Real-time feedback for user actions
- **Glass Morphism Effects**: Modern, elegant design aesthetic
- **Status Indicators**: Color-coded badges for plant watering status

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GreenThumb
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will open at `http://localhost:5173`

## 📁 Project Structure

```
GreenThumb/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   ├── Plant.js
│   │   └── Post.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── plantRoutes.js
│   │   └── postRoutes.js
│   ├── server.js          # Express server setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Navbar.jsx
    │   │   └── Toast.jsx
    │   ├── pages/         # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AddPlant.jsx
    │   │   └── Forum.jsx
    │   ├── App.jsx        # Main app component
    │   ├── App.css        # Global styles
    │   └── main.jsx       # Entry point
    └── package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Plants
- `GET /api/plants` - Get all plants for authenticated user
- `POST /api/plants` - Add a new plant
- `PUT /api/plants/:id/water` - Update plant watering status
- `DELETE /api/plants/:id` - Delete a plant

### Forum Posts
- `GET /api/posts` - Get all forum posts
- `POST /api/posts` - Create a new post
- `POST /api/posts/comment/:id` - Add a comment to a post

## 🎯 Key Features Explained

### Smart Watering System
The application calculates the next watering date based on:
- Last watered date
- Watering frequency (in days)
- Automatically highlights plants that are overdue or due today

### Optimistic UI Updates
For better user experience, the UI updates immediately when:
- Watering a plant
- Deleting a plant
- Adding comments

### Avatar Generation
User avatars are automatically generated using the DiceBear API based on usernames.

## 🔒 Security Features
- Passwords hashed using bcryptjs
- JWT tokens for secure authentication
- Protected API routes with authentication middleware
- Token validation on each request

## 📱 Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author
Built with 💚 by plant enthusiasts, for plant enthusiasts

## 🙏 Acknowledgments
- Plant icons and imagery from various sources
- Avatar generation by [DiceBear](https://dicebear.com/)
- Placeholder images from [Placehold.co](https://placehold.co/)

---

**Happy Planting! 🌿**
