export const Query = {
  posts: (parent, args, { prisma }) => {
    return prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });
  }
};
