const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose.connect("mongodb://localhost:27017/books");

mongoose.connection.once("open", () => {
  console.log("Mongoose connected to mongodb server!");
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}, and graphql http server running at /graphql`
    );
  });
});
