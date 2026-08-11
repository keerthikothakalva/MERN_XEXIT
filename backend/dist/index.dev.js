"use strict";

var cors = require('cors');

var express = require('express');

var connectMongoDB = require('./config/config.js');

require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 3001;

var _require = require('./services/email.service.js'),
    verifyEmailConnection = _require.verifyEmailConnection;

app.use(cors());
app.use(express.json());
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Server is running'
  });
});

var authRouter = require('./routes/auth.route.js');

var employeeRouter = require('./routes/employee.route.js');

var adminRouter = require('./routes/admin.route.js');

app.use('/api/auth', authRouter);
app.use('/api/user', employeeRouter);
app.use('/api/admin', adminRouter);
connectMongoDB();
app.listen(PORT, function () {
  console.log("Backend is listening on PORT ".concat(PORT));
  verifyEmailConnection();
});
module.exports = app;
//# sourceMappingURL=index.dev.js.map
