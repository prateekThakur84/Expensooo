
# 💸 Expenso – Personal Finance Tracker (MERN + Charts + PWA)

**Expenso** is a modern, full-stack personal finance tracking application built with the MERN stack. It helps users **track income and expenses**, **visualize financial data**, and **download insightful reports** — all through a secure, fast, and responsive interface.

From **interactive charts** and **Excel exports** to **receipt uploads**, Expenso makes managing finances simple, visual, and accessible.

---

## 🌐 Live Demo

🔗 **Frontend (Vercel)**: [https://expensooo.vercel.app/dashboard](https://expensooo.vercel.app)  
📁 **GitHub Repo**: [https://github.com/prateekThakur84/expensooo](https://github.com/prateekThakur84/expensooo)

---

## ⚙️ Key Features

- 🔐 **Authentication & Authorization**  
  Secure login/signup using **JWT** and protected API routes.

- 💰 **Income & Expense Tracking**  
  Add, view, and delete transactions with real-time UI updates.

- 📊 **Financial Data Visualization**  
  Pie and bar charts using **Recharts** for clear financial insights.

- 📥 **Excel Report Download**  
  Generate and export `.xlsx` income reports with **xlsx**.

- ☁️ **Receipt Image Uploads**  
  Upload images using **Multer + Cloudinary** for storage and access.

- 📱 **Progressive Web App (PWA)**  
  Installable on devices with offline access using service workers.

- 🖥️ **Responsive UI**  
  Clean, mobile-first design using **Tailwind CSS** and **React**.

---

## 🧰 Tech Stack

### 🖥 Frontend
- React (v19)
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Emoji Picker
- React Hot Toast
- PWA Support (`vite-plugin-pwa`)

### ⚙️ Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Multer + Cloudinary (for file uploads)
- xlsx (for exporting data)
- dotenv
- CORS

---

## 🚀 Getting Started

### 🔙 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

## 📈 Example Use Cases

- Visualize monthly spending through charts  
- Export income records for tax or budgeting  
- Track and manage all transactions from one dashboard

---

## 📌 Future Enhancements

- ✅ Category-based filtering and analytics  
- 🌙 Dark Mode support  
- 📅 Recurring transactions  
- 📊 Budget planning and savings goals  
- 👥 Multi-user role management (Admin/User)

---

## 🧑‍💻 Author

**[Prateek Thakur](https://github.com/prateekThakur84)**  
Full-Stack Web Developer • React & Node.js Enthusiast

---

## 🪪 License

This project is open-source and available under the **MIT License**.

---

> 💬 *Feel free to fork, star ⭐, and contribute to Expenso. Feedback and collaboration are always welcome!*
