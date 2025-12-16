PROJECT CONTEXT — READ FULLY AND FOLLOW STRICTLY

Project Title:
MERN Stack – Development Plant Care Community (GreenThumb)

Academic Context:
This is a B.Tech Computer Science Engineering Semester III college project.
The implementation MUST reflect a beginner-to-intermediate student level.
This is NOT a professional, startup, or production-grade system.

--------------------------------------------------

PROBLEM STATEMENT:

Gardeners and plant enthusiasts often need a simple way to keep track of their plants,
basic care schedules, and ask questions to other gardeners. The goal of this project
is to build a basic Plant Care Community web application that allows users to:

- Log plant details
- View simple watering reminders
- Ask and answer plant care questions in a community forum

The focus of this project is understanding MERN stack fundamentals such as CRUD operations,
authentication, and frontend–backend interaction. This is a learning-focused prototype.

--------------------------------------------------

FEATURE REQUIREMENTS (STRICT — DO NOT ADD EXTRA FEATURES):

1. USER AUTHENTICATION
- User registration and login
- JWT-based authentication implemented using Node.js and Express
- Single user role only
- Token passed via HTTP headers
- No refresh tokens
- No third-party authentication services

2. PLANT MANAGEMENT
- Users can add plants with:
  - Plant name
  - Watering frequency (text or number)
  - Optional notes
- Users can view a list of plants added by them
- Store next watering date in MongoDB
- Display watering reminder date on UI only
- No automatic notifications or alerts

3. CARE REMINDERS
- Reminders are UI-level simulation only
- Display stored reminder date as text
- No cron jobs
- No background services
- No email, SMS, or push notifications

4. COMMUNITY FORUM
- Users can create forum posts with:
  - Title
  - Description
- Users can view all posts
- Users can add simple comments to posts
- Comments are flat (no nested replies)
- No likes, reactions, moderation, or real-time updates

--------------------------------------------------

MANDATORY TECH STACK (DO NOT DEVIATE):

Frontend:
- React (plain React, no framework)
- Functional components only
- useState and useEffect hooks only
- Axios for API calls
- Plain CSS for styling

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT for authentication

API Testing:
- Thunder Client (VS Code extension)

--------------------------------------------------

ARCHITECTURE RULES:

- Use a simple folder structure:
  /models
  /routes
  /controllers
- One responsibility per file
- No abstraction layers
- No service layers
- Some repeated code is acceptable
- Prefer clarity over reusability

--------------------------------------------------

STRICTLY FORBIDDEN (DO NOT USE, DO NOT MENTION):

Frontend:
- Next.js
- useContext, useReducer
- Custom hooks
- Redux, Zustand, React Query
- Tailwind CSS
- ShadCN or any UI libraries
- Animation libraries

Backend:
- Supabase
- Firebase
- WebSockets or Socket.IO
- Cron jobs or background workers
- GraphQL
- Advanced middleware patterns

General:
- AI or ML features
- Image recognition
- Email, SMS, or push notifications
- Clean Architecture
- Microservices
- Performance optimization
- Scalability discussions
- TypeScript
- Docker
- CI/CD pipelines
- Cloud deployment platforms
- Automated testing

--------------------------------------------------

UI / UX LIMITATIONS:

- Basic forms
- Simple tables and lists
- Minimal navigation
- No animations
- No advanced interactions
- Functionality over design polish

--------------------------------------------------

DOCUMENTATION & LANGUAGE RULES:

- Use simple, student-level explanations
- Avoid professional or marketing language
- Do NOT use words like:
  “scalable”, “optimized”, “enterprise-grade”, “industry-ready”
- Emphasize learning objectives and basic MERN concepts

--------------------------------------------------

CODING STYLE RULE:

- Code must look student-written
- Slight repetition is acceptable
- Avoid clever tricks
- Every line of code must be explainable calmly in a viva
- If something feels advanced, simplify it

--------------------------------------------------

FINAL ENFORCEMENT RULE:

If any feature, pattern, or implementation detail feels beyond
a Semester III MERN syllabus, it must NOT be used.

Always choose the simplest possible implementation.
