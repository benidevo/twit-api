import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
  }
  type Mutation {
    postCreate(title: String!, content: String!): PostOutputType!
  }

  type Error {
    message: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    profile: Profile!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    createdAt: String!
  }

  type PostOutputType {
    errors: [Error!]!
    post: Post
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }
`;
