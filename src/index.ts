import { ApolloServer } from 'apollo-server';
import { PrismaClient, Prisma } from '@prisma/client';

import { Query, Mutation, Profile, User, Post } from './resolvers';
import { typeDefs } from './schema';
import { getUserFromToken } from './utils/getUserFromToken';

export const prisma = new PrismaClient();

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
        Mutation,
        Profile,
        User,
        Post
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
