"use strict";

var memoryStore = {
  users: [],
  employees: [],
  tokens: [],
  reset: function reset() {
    this.users = [];
    this.employees = [];
    this.tokens = [];
  }
};
module.exports = memoryStore;
//# sourceMappingURL=memoryStore.dev.js.map
