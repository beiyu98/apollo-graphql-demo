const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const BookTypeDef = require('./BookTypeDef')

const { BookModel } = require('./db');

const {ApolloEngine} = require('apollo-engine');

const APOLLO_ENGINE_KEY = 'service:brucecodezone-1271:obwNr3WK1MOVNk5Tppk-xQ';
// 手动添加两条数据
// const books = [
//     {
//       title: "Harry Potter and the Sorcerer's stone",
//       author: 'J.K. Rowling',
//     },
//     {
//       title: 'Jurassic Park',
//       author: 'Michael Crichton',
//     },
//   ];
// books.forEach(book=>{
//   new BookModel({title:book.title,author:book.author}).save();
// });

const typeDefs = `
    type Query { 
      books:[Book],
      bookDetail:Book,
    }
    type Book { _id: String! title: String, author: String}
  `;

const resolvers = {
  Query: {
    books: async () => await BookModel.find(),
    bookDetail:async(_id)=>await BookModel.findOneById(_id),
  },
  // Mutation:{

  // },
};

const schema = makeExecutableSchema({
  typeDefs, resolvers,
});

const port = process.env.port || 8092;
const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress(
  { 
    schema,
    tracing:true,
    cacheControl:true,
   }
  ));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const engine = new ApolloEngine({
  apiKey:APOLLO_ENGINE_KEY,
});

// app.listen(port, () => {
//   console.log('express graphql server start');
// });

engine.listen({
  port:port,
  expressApp:app,
});