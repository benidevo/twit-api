import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient, Prisma } from '@prisma/client';

import { Query } from './resolvers';
import { Mutation } from './resolvers';
import { typeDefs } from './schema';
import { getUserFromToken } from './utils/getUserFromToken';

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >;
    userId: string | null;
}

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    context: async ({ req }): Promise<Context> => {
        const userInfo = await getUserFromToken(req.headers.authorization);
        return {
            prisma,
            userId: userInfo?.userId
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
