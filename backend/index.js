const cors = require('cors');
const express = require('express');
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.route.js');
const connectMongoDB = require('./config/config.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// ROOT (CYPRESS CHECK)
// =====================
app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Server is running' });
});

// =====================
// ROUTES (VERY IMPORTANT)
// =====================

// Auth routes ONLY
app.use('/api/auth', employeeRouter);

// User routes ONLY
app.use('/api/user', employeeRouter);

// Admin routes ONLY
app.use('/api/admin', adminRouter);

// =====================
// DB CONNECTION
// =====================
connectMongoDB();

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});
