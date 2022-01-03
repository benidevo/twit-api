export const Query = {
    me: async (parent, args, { prisma, userId }) => {
        if (!userId) return null;
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    },

    profile: async (parent, { userId }, { prisma }) => {
        return await prisma.profile.findUnique({
            where: {
                userId
            }
        });
    },

    posts: (parent, args, { prisma }) => {
        return prisma.post.findMany({
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        });
    },

    user: async (parent, { userId }, { prisma }) => {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }
};
