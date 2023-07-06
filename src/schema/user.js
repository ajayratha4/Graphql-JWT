module.exports = `
  type Token {
    token: String!
  }
  type User {
    _id: ID!
    name: String!
  }
  extend type Query {
    users: [User!]
  }
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
  }
`;
