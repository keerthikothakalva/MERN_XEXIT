const memoryStore = {
  users: [],
  employees: [],
  tokens: [],

  reset() {
    this.users = [];
    this.employees = [];
    this.tokens = [];
  }
};

module.exports = memoryStore;
