"use strict";

var cors = require('cors');

var express = require('express');

var connectMongoDB = require('./config/config.js');

require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 3001; // =====================
// MIDDLEWARE
// =====================

app.use(cors());
app.use(express.json()); // =====================
// ROOT (CYPRESS CHECK)
// =====================

app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Server is running'
  });
}); // =====================
// ROUTES (CORRECTLY SEPARATED)
// =====================

var authRouter = require('./routes/auth.route.js');

var employeeRouter = require('./routes/employee.route.js');

var adminRouter = require('./routes/admin.route.js');

app.use('/api/auth', authRouter);
app.use('/api/user', employeeRouter);
app.use('/api/admin', adminRouter); // =====================
// DB CONNECTION
// =====================

connectMongoDB(); // =====================
// START SERVER
// =====================

app.listen(PORT, function () {
  console.log("Backend is listening on PORT ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
