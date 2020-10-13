var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Viewer {
    allPosts: [Post]
  }

  type Post{
    description: String!
    id: ID!
    imageUrl: String!
  }
  
  type Query {
    viewer: Viewer!
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  viewer: () => {
    return {
		allPosts:[{id:1,description:"post1",imageUrl:"url1"},{id:2,description:"post2",imageUrl:"url2"}]
	};
  },
};
var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

