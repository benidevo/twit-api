import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        posts: [Post!]!
    }
    type Mutation {
        postCreate(post: PostInputType!): PostOutputType!
        postUpdate(id: String!, post: PostInputType!): PostOutputType!
        postDelete(id: String!): PostOutputType!
        postPublish(id: String!): PostOutputType!
        postUnpublish(id: String!): PostOutputType!
        signUp(name: String!, auth: AuthCredentials!): AuthOutputType!
        signIn(auth: AuthCredentials!): AuthOutputType!
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

    input PostInputType {
        title: String
        content: String
    }
    type Profile {
        id: ID!
        bio: String!
        user: User!
    }

    type AuthOutputType {
        errors: [Error!]!
        token: String
    }

    input AuthCredentials {
        email: String!
        password: String!
    }
`;
