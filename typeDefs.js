const { gql } = require('apollo-server');

module.exports = Object.freeze({
    typeDefs: gql`
      type Dog {
          name: String
          age: Int
      }

      type User {
          id: ID
          username: String
          age: Int
          posts: [Post]
      }

      type Post {
          id: ID
          title: String
          content: String
      }

      input UserInput {
          id: ID
          username: String!
          age: Int
          posts: [PostInput]
      }

      input PostInput {
          id: ID
          title: String!
          content: String!
      }

      type Query {
          getAllDogs: [Dog]
          getDog(name: String): Dog
          getAllUsers: [User]
          getUser(id: ID): User
      }

      type Mutation {
          createUser(input: UserInput): User
      }
    `
})