const cors = require('cors');
const express = require('express');
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.route.js');
// const connectMongoDB = require('./config/config.js'); // TEMPORARILY DISABLED
require('dotenv').config();

const app = express();

// Cypress expects 3001
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', employeeRouter);
app.use('/api/admin', adminRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});
