import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient, Prisma } from '@prisma/client';

import { Query } from './resolvers';
import { Mutation } from './resolvers';
import { typeDefs } from './schema';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
}
  

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
