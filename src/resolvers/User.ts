import { Context } from '..';

export const User = {
    posts: (parent: any, args: any, { prisma }: Context) => {
        return prisma.post.findMany({
            where: {
                authorId: parent.id
            }
        });
    }
};
