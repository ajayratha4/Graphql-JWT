const { getUsers, createUser } = require("./service/user.service");

module.exports = {
  Query: {
    users: async (_parent, _args, context) => {
      if (!context.token) {
        throw new Error("Authentication required.");
      }
      const users = await getUsers();
      return users;
    },
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, context) => {
      return await createUser(username, email, password);
    },
  },
};
