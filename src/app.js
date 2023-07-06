const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");
const connectDB = require("./db");
const { verifyToken } = require("./utils/jwt");

require("dotenv").config();

const startExpress = async () => {
  const app = express();

  app.use(cors());
  app.use(json());
  connectDB();

  app.get("/", (req, res) => {
    res.send("Express Server restAPI");
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const contextMiddleware = expressMiddleware(server, {
    context: async ({ req }) => {
      const authorization = req.headers.authorization || "";
      try {
        const token = authorization.split(" ")[1];
        const decoded = verifyToken(token);
        if (decoded) {
          return { token: decoded };
        } else {
          return { token: null };
        }
      } catch (error) {
        return { token: null };
      }
    },
  });

  app.use("/graphql", contextMiddleware);
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
};

startExpress();
