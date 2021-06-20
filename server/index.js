const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const{MONGODB} = require('./config.js');


const PORT = process.env.port || 5000;

const typeDefs = gql`
    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
    }
  type Query {
    getPosts: [Post]
  }
`;


const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new Error(err);
            }
        }
    },
  };

  
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
  });



mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

  
  