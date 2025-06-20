![logo](https://res.cloudinary.com/df9wuyrbg/image/upload/v1747153355/Logo_ARDE_black_mzmcpa.svg)
# **ArDe: Arte y Decoración** 🖼️

**ArDe** is a project focused on redefining the concept of independent online commerce tailored to the art world. It implements the best visual methods to attract new audiences, distribute artist information, and reach a wider audience. In addition, it includes its own online store, from which to manage the purchase and sale of works, as well as order and shipping management. **ArDe** focuses on ensuring self-management for independent or emerging artists.<br><br>



## 📌 **Table of Contents**
1. [⚙️ Installation and Requirements](#installation-and-requirements)
2. [🎨 App Design](#app-design)
3. [🏗️ Project Architecture](#project-architecture)
4. [💻 Technologies Used](#technologies-used)
5. [📚 Libraries](#libraries)
6. [🧪 Test Screenshots](#test-screenshots)
7. [🚀 Next Steps](#next-steps)<br><br>


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

<br>

## 🎨 **App Design**

<br>

### 🖥️ Desktop Version  

| Home Page | Shop Page | Shop Preview | Shopping Cart | Orders Section |
|-----------|----------------|------------------------|----------------|----------------|
| [![Home Page](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Home_Page_il4ytx.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Home_Page_il4ytx.png) | [![Shop Page](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Shop_Page_pl9u7y.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139648/Shop_Page_pl9u7y.png) | [![Shop Preview](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139790/Shop_preview_sizkld.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749139790/Shop_preview_sizkld.png) | [![Shopping Cart](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749314492/Shopping_Cart_xt5qgv.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749314492/Shopping_Cart_xt5qgv.png) | [![Orders section](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570629/My_orders_n8uela.png)](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570629/My_orders_n8uela.png) |

<br>

### 🖥️ Mobile Version  

| Home Page | Shop Page | Shop Preview | Shopping Cart | Orders Section |
|-----------|-----------|--------------|----------------|----------------|
| <a href="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749142154/Home_Page_Mobile_x6pid1.png"><img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749142154/Home_Page_Mobile_x6pid1.png" width="200"/></a> | <a href="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570533/Shop_Page_Mobile_gvwwqv.png"><img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570533/Shop_Page_Mobile_gvwwqv.png" width="200"/></a> | <a href="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570533/Shop_Preview_Mobile_pstv7e.png"><img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749570533/Shop_Preview_Mobile_pstv7e.png" width="200"/></a> | <a href="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749573532/Shopping_Cart_Mobile_i2wohe.png"><img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749573532/Shopping_Cart_Mobile_i2wohe.png" width="200"/></a> | <a href="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749568159/Pixel-7-Pro-480x1040_nqdyei.png"><img src="https://res.cloudinary.com/df9wuyrbg/image/upload/v1749568159/Pixel-7-Pro-480x1040_nqdyei.png" width="200"/></a> |



## 🏗️ **Project Architecture**<br>


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

<br>

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
      │   │   │   ├── 📄 AuthButton.css
      │   │   │   └── 📄 AuthButton.test.js
      │   │   │   
      │   │   ├── 📂 CatalogueSelection 
      │   │   ├── 📂 ContactSection
      │   │   ├── 📂 EventsSection
      │   │   ├── 📂 Footer
      │   │   └── 📂 Header       
      │   │       
      │   ├── 📂 pages
      │   │   ├── 📂 Admin
      │   │   │   ├── 📄 Dashboard.jsx
      │   │   │   ├── 📄 Dashboard.css
      │   │   │   └── 📄 Dashboard.test.js
      │   │   │   
      │   │   ├── 📂 Home
      │   │   └── 📂 Shop
      │   │       
      │   ├── 📂 router
      │   │   ├── 📄 Router.jsx
      │   │   └── 📄 Router.test.js
      │   │
      │   ├── 📂 services
      │   │   ├── 📄 WorkServices.jsx
      │   │   └── 📄 WorkServices.test.js
      │   │
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



## 📚 **Libraries**

- @cloudinary/react
- jsonwebtoken
- bcrypt
- react
- react-dom
- react-router-dom
- sweetalert2

<br>

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
- **MySQL**: Relational database for data storage
- **Sequelize**: ORM for MySQL and Node.js
- **JWT (JSON Web Tokens)**: For authentication and authorization
- **bcrypt**: Password hashing library
- **Jest**: JavaScript testing framework
- **Babel**: JavaScript compiler for ES6+ features
- **Nodemon**: Development server auto-restart

<br>

## 🧪 **Test Screenshots**

**Front Test**  

<br>

| Test Name        | Screenshot |
|------------------|------------|
| **Header Test**  | ![Header Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1749138084/Captura_de_pantalla_2025-05-25_172759_wbm7c2.png) |
| **Auth Button Test** | ![Auth Button Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092127/AuthButton_geuwtu.png) |
| **Footer Test**  | ![Footer Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092126/Footer_w0zqgx.png) |
| **Catalogue Test** | ![Catalogue Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092127/CatalogueSection_n9byrc.png) |
| **Events Test**    | ![Events Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092126/EventsSection_wse7pc.png) |

<br>

**Back Test**

<br>

| Test Name         | Screenshot |
|------------------|------------|
| **Auth Controller Test**  | ![Auth Controller Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092615/AuthController_o95zlc.png) | 
| **User Controller Test** | ![User Controller Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092614/UserController_jklnnk.png)|
| **Work Controller Test** | ![Work Controller Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092615/WorkController_eyiqde.png)|
| **Order Controller Test** | ![Order Controller Test](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750092615/OrderController_lw02h2.png)|


<br>

<h2><img src="https://cdn-icons-png.freepik.com/512/15879/15879294.png?ga=GA1.1.1582098037.1748944011" alt="icon" style="width: 30px; vertical-align: middle;" /> <strong>Testing Coverage</strong></h2>


<br>

| Test Type         | Screenshot |
|------------------|------------|
| **Front Coverage**  | ![Front Coverage](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750095028/Front_coverage_akty2m.png) |
| **Back Coverage** | ![Back Coverage](https://res.cloudinary.com/df9wuyrbg/image/upload/v1750095028/Back_coverage_hcqg1g.png)|

<br>

## 🚀 **Next Steps**

- Code Optimization and Encapsulation
- Increase security
- Implement Payment Gateway
- Email verification
- Option to restock sold works
- Work preview sliders
- Option to select all works (shopping cart)