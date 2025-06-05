![logo](https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg)
# **ArDe: Arte y Decoración** 🖼️

**ArDe** is a project focused on redefining the concept of independent online commerce tailored to the art world. It implements the best visual methods to attract new audiences, distribute artist information, and reach a wider audience. In addition, it includes its own online store, from which to manage the purchase and sale of works, as well as order and shipping management. **ArDe** focuses on ensuring self-management for independent or emerging artists.

---

## 📌 **Table of Contents**
1. [⚙️ Installation and Requirements](#installation-and-requirements)
2. [🎨 App Design](#app-design)
3. [🏗️ Project Architecture](#project-architecture)
4. [💻 Technologies Used](#technologies-used)
5. [📚 Libraries](#libraries)
6. [🧪 Test Screenshots](#test-screenshots)
7. [🚀 Next Steps](#next-steps)


## ⚙️ Installation and Requirements

### **Prerequisites**  

>[!IMPORTANT]
Before you start, ensure you have the following installed:
- **Node.js** (Download from [here](https://nodejs.org/))
- **npm** (comes with Node.js)

### **Installation Steps**

1. **Clone the repository**  
   Use Git to clone the repository to your local machine:

   ```bash
   git clone https://github.com/pablo-jm/ArDe

2. **Install the dependencies**
    Navigate to the project folder and install the required dependencies

   ```bash
   cd ArDe
   cd ArDe-front
   npm install
   
3. **Run the application**
   Start the development server using the following command

   ```bash
   npm run dev

4. **Run the application server (back)**
   Start the development server using the following command

   ```bash
   cd ..
   cd ArDe-back
   node app.js

---

## 🎨 **App Design**

### 🖥️ Desktop Version  

| Home Page | Shop Page | Shop Preview | Shopping Cart |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Home_Page_il4ytx.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Home_Page_il4ytx.png) | [![Shop Page](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Shop_Page_pl9u7y.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Shop_Page_pl9u7y.png) | [![Shop Preview](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139790/Shop_preview_sizkld.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139790/Shop_preview_sizkld.png) | [![ Shopping Cart]()]() |


### 🖥️ Mobile Version  

| Home Page | Shop Page | Shop Preview | Shopping Cart |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749140012/Home_Page_Mobile_nzoz2a.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749140012/Home_Page_Mobile_nzoz2a.png) |

---

## 🏗️ **Project Architecture**


### **Backend Structure**

📁 ArDe

├── 📁 ArDe-Back

      ├── 📁 controllers
      │└── 📄 AuthController.js
      ├── 📁 coverage
      ├── 📁 database
      ├── 📁 middleware
      │   └── 📄 verifyAdmin.js
      ├── 📁 models
      │   └── 📄 EventModel.js
      ├── 📁 node_modules
      ├── 📁 routes
      │   └── 📄 auth.router.js
      ├── 📁 tests
      │   └── 📄 authController.test.js
      ├── 📁 utils
      ├── 📄 .babelrc
      ├── 📄 .gitignore
      ├── 📄 app.js
      ├── 📄 package-lock.json
      └── 📄 package.json



### **Frontend Structure**

📁 ArDe

├── 📁 ArDe-Front

      ├── 📂 coverage
      ├── 📂 node_modules
      ├── 📂 public
      ├── 📂 src
      │   ├── 📂 assets
      │   ├── 📂 components
      │   │   ├── 📂 AuthButton
      │   │   │   ├── 📄 AuthButton.jsx
      │   │   │   └── 📄 AuthButton.css
      │   │   ├── 📂 CatalogueSelection 
      │   │   ├── 📂 ContactSection
      │   │   ├── 📂 EventsSection
      │   │   ├── 📂 Footer
      │   │   └── 📂 Header       
      │   │       
      │   ├── 📂 pages
      │   │   ├── 📂 Admin
      │   │   │   ├── 📄 Dashboard.jsx
      │   │   │   └── 📄 Dashboard.css
      │   │   ├── 📂 Home
      │   │   └── 📂 Shop
      │   │       
      │   ├── 📂 router
      │   │   └── 📄 Router.jsx
      │   │
      │   ├── 📂 services
      │   ├── 📄 App.css
      │   ├── 📄 App.jsx
      │   ├── 📄 index.css
      │   ├── 📄 main.jsx
      │   └── 📄 setupTests.js
      ├── 📄 .gitignore
      ├── 📄 eslint.config.js
      ├── 📄 index.html
      ├── 📄 package-lock.json
      ├── 📄 package.json
      └── 📄 vite.config.js

---

## 📚 **Libraries**

- @cloudinary/react
- jsonwebtoken
- bcrypt
- react
- react-dom
- react-router-dom
- sweetalert2

---

## 💻 **Technologies Used**

This project utilizes the following technologies:

### Frontend
- **React**: Frontend JavaScript library for building user interfaces
- **React Router**: For handling navigation within the app
- **Vite**: Modern build tool and development server
- **CSS3**: Custom styling for components
- **JavaScript (ES6+)**: Modern JavaScript features
- **HTML5**: Semantic markup structure
- **ESLint**: Code linting and formatting for frontend

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB and Node.js
- **JWT (JSON Web Tokens)**: For authentication and authorization
- **bcrypt**: Password hashing library
- **Jest**: JavaScript testing framework
- **Babel**: JavaScript compiler for ES6+ features
- **Nodemon**: Development server auto-restart

---

## 🧪 **Test Screenshots**

**Front Test**

| Test Name         | Screenshot |
|------------------|------------|
| **Header Test**  | ![Header Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749138084/Captura_de_pantalla_2025-05-25_172759_wbm7c2.png) |
| **Auth Button Test (Also header)** | ![Auth Button Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749138135/Captura_de_pantalla_2025-05-26_180918_lbki9j.png) |
| **Footer Test**  | ![Footer Test]() |
| **Catalogue Test** | ![Catalogue Test]() |
| **Events Test**    | ![Events Test]() |



**Back Test**

| Test Name         | Screenshot |
|------------------|------------|
| **Auth and User Controllers Test**  | ![Auth Controller Test and User Controller Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749138018/Captura_de_pantalla_2025-05-26_180744_lgcciz.png) |


## 🚀 **Next Steps**

- 
