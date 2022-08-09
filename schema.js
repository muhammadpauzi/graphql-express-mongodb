const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const Author = require("./models/Author");
const Book = require("./models/Book");

// const fakeBookDatabase = [
//   { name: "Book 1", pages: 432, id: 1 },
//   { name: "Book 2", pages: 32, id: 2 },
//   { name: "Book 3", pages: 532, id: 3 },
// ];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        // 'parent' adalah object diatas
        return Book.find({ authorID: parent.id });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        Author.findById(parent.authorID);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (parent, args) => {
        // console.log(parent, args);
        return Book.findById(args.id);
        // return fakeBookDatabase.find((book) => book.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return Book.find({});
      },
    },
    // author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return Author.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
