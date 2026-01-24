const memoryStore = {
  users: [],
  employees: [],
  tokens: [],
  exitResponses: [],

  reset() {
    this.users = [];
    this.employees = [];
    this.tokens = [];
    this.exitResponses = [];
  }
};

module.exports = memoryStore;
