const userSchema = require("./user");

const baseSchema = `
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [baseSchema, userSchema];
