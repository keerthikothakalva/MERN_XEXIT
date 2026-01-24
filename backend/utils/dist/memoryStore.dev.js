"use strict";

var memoryStore = {
  users: [],
  employees: [],
  tokens: [],
  exitResponses: [],
  reset: function reset() {
    this.users = [];
    this.employees = [];
    this.tokens = [];
    this.exitResponses = [];
  }
};
module.exports = memoryStore;
//# sourceMappingURL=memoryStore.dev.js.map
