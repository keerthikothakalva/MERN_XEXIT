"use strict";

var mongoose = require('mongoose');

var connectMongoDB = function connectMongoDB() {
  return regeneratorRuntime.async(function connectMongoDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (process.env.MONGODB_URI) {
            _context.next = 4;
            break;
          }

          console.warn('MONGODB_URI not found, skipping MongoDB connection');
          return _context.abrupt("return");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGODB_URI));

        case 6:
          console.log('MongoDB connected');
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('MongoDB connection failed:', _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = connectMongoDB;
//# sourceMappingURL=config.dev.js.map
