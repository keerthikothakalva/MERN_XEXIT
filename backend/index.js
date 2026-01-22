const cors = require('cors');
const express = require('express');
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
// ROUTES (CORRECTLY SEPARATED)
// =====================
const authRouter = require('./routes/auth.route.js');
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.route.js');

app.use('/api/auth', authRouter);
app.use('/api/user', employeeRouter);
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
