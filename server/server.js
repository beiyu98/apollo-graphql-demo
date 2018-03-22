const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

  const typeDefs = `
    type Query { books:[Book]}
    type Book { title: String, author: String}
  `;

  const resolvers = {
      Query:{books:()=>books},
  };

  const schema = makeExecutableSchema({
      typeDefs,resolvers,
  });

  const port = process.env.port || 8092;
  const app = express();
  app.use(cors());
  app.use('/graphql',bodyParser.json(),graphqlExpress({schema}));
  app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}));
  
  app.listen(port,()=>{
      console.log('express graphql server start');
  })