const cors = require('cors');
const express = require('express');
const connectMongoDB = require('./config/config.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

const authRouter = require('./routes/auth.route.js');
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.route.js');

app.use('/api/auth', authRouter);
app.use('/api/user', employeeRouter);
app.use('/api/admin', adminRouter);

connectMongoDB();


app.listen(PORT, () => {
  console.log(`Backend is listening on PORT ${PORT}`);
});

module.exports = app;
