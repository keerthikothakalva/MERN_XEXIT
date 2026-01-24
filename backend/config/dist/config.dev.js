"use strict";

var mongoose = require('mongoose');

var connectMongoDB = function connectMongoDB() {
  return regeneratorRuntime.async(function connectMongoDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI not found');
            process.exit(1);
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGODB_URI));

        case 4:
          console.log('MongoDB connected');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('MongoDB connection failed:', _context.t0.message);
          process.exit(1);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = connectMongoDB;
//# sourceMappingURL=config.dev.js.map
