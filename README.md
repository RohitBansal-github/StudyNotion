# 🚀 StudyNotion – Scalable MERN EdTech Platform  

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

</p>

<p align="center">
  A Production-Grade Learning Management System built using the MERN stack with Role-Based Access Control, Secure Authentication, Cloud Media Storage, and Scalable Architecture.
</p>

---

##  Live Demo

| Platform  | Link |
|------------|------|
| Frontend | https://your-frontend-url.vercel.app |
| Backend  | https://your-backend-url.onrender.com |

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Authentication & Security](#authentication--security)
- [API Documentation](#api-documentation)
- [Environment Variables](#️environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

##  Overview

StudyNotion is a full-stack Learning Management System (LMS) designed to simulate a real-world EdTech platform.

Designed following scalable architecture principles including separation of concerns, layered backend structure, and modular frontend design.


It supports:

- 👨‍🎓 Student enrollment & progress tracking  
- 👨‍🏫 Instructor course creation  
- 🛡 Role-based dashboards  
- ☁ Cloud-based media uploads  
- 🔐 Secure JWT authentication  

Built with scalability, modularity, and clean architecture in mind.


---

##  Features

### 👤 Authentication
- JWT-based authentication  
- Bcrypt password hashing  
- Role-based access control  
- Protected dashboard routes  
- Middleware-based token verification  

### 📚 Course Management
- Create / Edit / Delete Courses  
- Section & Subsection nesting  
- Category-based filtering  
- Course thumbnails (Cloudinary)  
- Video player integration  

### 🛒 Enrollment System
- Add to cart  
- Enroll in course  
- Track progress  

### 📊 Dashboard
- Student dashboard  
- Instructor analytics  
- Profile management  

### 📱 Responsive UI
- Mobile-first design  
- Sidebar navigation  
- Dynamic catalog dropdown  
- Filters (Category, Price, Sorting)  

---

##  Architecture

### 🔹 High-Level System Design

```text
                              ┌───────────────────────────────────────┐
                              │               Frontend                │
                              │---------------------------------------│
                              │  React.js                             │
                              │  Redux Toolkit                        │
                              │  React Router DOM                     │
                              │  Tailwind CSS                         │
                              └───────────────────────┬───────────────┘
                                                      │
                                                      │ HTTPS (REST API)
                                                      ▼
                              ┌───────────────────────────────────────┐
                              │               Backend                 │
                              │---------------------------------------│
                              │  Node.js + Express.js                 │
                              │                                       │
                              │  • Routes Layer                       │
                              │  • Controllers Layer                  │
                              │  • Service Layer                      │
                              │  • Middleware                         │
                              │      - Authentication (JWT)           │
                              │      - Role-Based Access Control      │
                              │      - Validation                     │
                              │      - Error Handler                  │
                              │  • Bcrypt (Password Hashing)          │
                              └───────────────────────┬───────────────┘
                                                      │
                ┌─────────────────────────────────────┼─────────────────────────────────────┐
                ▼                                     ▼                                     ▼
    ┌────────────────────────┐          ┌────────────────────────┐          ┌────────────────────────┐
    │        MongoDB         │          │      Cloudinary        │          │        Razorpay       │
    │------------------------│          │------------------------│          │------------------------│
    │  • Users               │          │  • Image Upload        │          │  • Payment Gateway    │
    │  • Courses             │          │  • Video Upload        │          │  • Order Creation     │
    │  • Sections/Subsections│          │  • CDN Delivery        │          │  • Signature Verify   │
    │  • Orders              │          └────────────────────────┘          └────────────────────────┘
    │  • Reviews             │
    └────────────────────────┘

```



##  Tech Stack

### Frontend
- React.js  
- Redux Toolkit  
- React Router DOM  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT  
- Bcrypt  
- Multer  
- Cloudinary  

### Database
- MongoDB Atlas  
- Mongoose ODM  

### Dev Tools
- Postman  
- Git & GitHub  
- Render / Vercel  

---

##  Project Structure

```text
StudyNotion/
│
├── client/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── Images/
│   │   │   ├── Logo/
│   │   │   └── Icons/
│   │   │
│   │   ├── components/
│   │   │
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── HighlightText.jsx
│   │   │   │   ├── ConfirmationModal.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   │
│   │   │   ├── core/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── CatalogDropdown.jsx
│   │   │   │   └── Layout.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   ├── OTPInput.jsx
│   │   │   │   ├── PrivateRoute.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   │
│   │   │   ├── filters/
│   │   │   │   ├── CategoryFilter.jsx
│   │   │   │   ├── PriceFilter.jsx
│   │   │   │   ├── SortFilter.jsx
│   │   │   │   └── FilterPanel.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── student/
│   │   │   │   │   ├── EnrolledCourses.jsx
│   │   │   │   │   ├── CourseProgress.jsx
│   │   │   │   │   └── StudentProfile.jsx
│   │   │   │   │
│   │   │   │   ├── instructor/
│   │   │   │   │   ├── AddCourse.jsx
│   │   │   │   │   ├── MyCourses.jsx
│   │   │   │   │   ├── EditCourse.jsx
│   │   │   │   │   └── InstructorAnalytics.jsx
│   │   │   │   │
│   │   │   │   └── DashboardLayout.jsx
│   │   │   │
│   │   │   └── course/
│   │   │       ├── CourseCard.jsx
│   │   │       ├── CourseDetails.jsx
│   │   │       ├── SectionAccordion.jsx
│   │   │       └── VideoPlayer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── CoursePage.jsx
│   │   │   └── ErrorPage.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── profileSlice.js
│   │   │   │   ├── courseSlice.js
│   │   │   │   └── cartSlice.js
│   │   │   │
│   │   │   └── store.js
│   │   │
│   │   ├── services/
│   │   │   ├── apiConnector.js
│   │   │   ├── endpoints.js
│   │   │   └── operations/
│   │   │       ├── authAPI.js
│   │   │       ├── courseAPI.js
│   │   │       └── profileAPI.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── constants.js
│   │   │   └── validation.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── corsOptions.js
│   │
│   ├── controllers/
│   │   ├── Auth.js
│   │   ├── Course.js
│   │   ├── Section.js
│   │   ├── SubSection.js
│   │   ├── Profile.js
│   │   └── Payment.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Section.js
│   │   ├── SubSection.js
│   │   ├── Category.js
│   │   └── Profile.js
│   │
│   ├── routes/
│   │   ├── Auth.js
│   │   ├── Course.js
│   │   ├── Profile.js
│   │   └── Payment.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── roleCheck.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── mailSender.js
│   │   ├── uploadToCloudinary.js
│   │   └── generateToken.js
│   │
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```



---

##  Authentication & Security

- Password hashing using bcrypt  
- JWT access tokens  
- Protected API routes  
- Role-based middleware  
- Secure environment variables  
- CORS configuration  
- Cloud media protection  

---

##  API Documentation

### 🔑 Auth Routes



```
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/sendOTP
POST /api/v1/auth/reset-password
```


### 📚 Course Routes


```
POST /api/v1/course/create
GET /api/v1/course/all
GET /api/v1/course/:id
PUT /api/v1/course/update
DELETE /api/v1/course/delete
```


### 👤 Profile Routes


```
GET /api/v1/profile/details
PUT /api/v1/profile/update
```


---

##  Environment Variables


Create a `.env` file in `server/`
```
PORT=4000
MONGODB_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


---

##  Getting Started

```bash
git clone https://github.com/yourusername/studynotion.git
cd studynotion
```

#### Backend Setup

```bash
cd server
npm install
npm run dev
```


#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Deployment

### Hosting Options

- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Railway / AWS EC2  
- **Database:** MongoDB Atlas  


---

## Performance Optimizations

- **Lazy Loading Components**  
  Implemented route-based code splitting to reduce initial bundle size and improve load time.

- **Optimized MongoDB Indexing**  
  Indexed frequently queried fields (e.g., courseId, userId, category) to enhance query performance.

- **Centralized Error Handling**  
  Global error-handling middleware ensures consistent API responses and easier debugging.

- **Modular Controller Logic**  
  Separation of concerns using controllers and service layers for scalability and maintainability.

- **Redux State Normalization**  
  Structured and normalized global state to prevent unnecessary re-renders and improve UI performance.

- **Image Compression Before Upload**  
  Media files are optimized before uploading to Cloudinary to reduce bandwidth and storage usage.

## Testing

- **Postman API Testing**  
  Verified all REST API endpoints including authentication, course management, and payment routes using Postman collections.

- **Route Authorization Testing**  
  Ensured protected routes are accessible only with valid JWT tokens and proper role permissions.

- **Role-Based Dashboard Validation**  
  Tested Student, Instructor, and Admin dashboards to confirm correct access control and feature visibility.

- **Responsive UI Testing**  
  Validated layout responsiveness across multiple screen sizes (mobile, tablet, desktop) using browser dev tools.


## Contributing

Contributions are welcome and appreciated! 🚀  
To contribute to this project, please follow the steps below:

1. **Fork the Repository** 

    Click the **Fork** button at the top right of this repository.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/studynotion.git
   cd studynotion
   ```

3. **Create a Feature Branch**

   ```
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

    Ensure your code follows the existing project 
    structure and coding standards.

5. **Commit Your Changes**

   ```
   git commit -m "feat: add your feature description"
   ```
6. **Push to Your Branch**

    ```
    git push origin feature/your-feature-name
    ```

7. **Open a Pull Request**

    Submit a PR with a clear description of the changes and link any related issues.

##  License

This project is licensed under the MIT License.

##  Author

***Rohit Bansal***

MERN Stack Developer | AI Enthusiast

GitHub: https://github.com/RohitBansal-github

LinkedIn: https://www.linkedin.com/in/rohit-bansal-9952312a8/




