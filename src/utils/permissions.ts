import { Context } from '../index';

interface canUserMutatePostParams {
    userId: string;
    postId: string;
    prisma: Context['prisma'];
}

export const canUserMutatePost = async ({
    postId,
    userId,
    prisma
}: canUserMutatePostParams) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return {
            errors: [
                {
                    message: 'user not found'
                }
            ],
            post: null
        };
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });

    if (post?.authorId !== user.id) {
        return {
            errors: [
                {
                    message: 'you can only modify your own posts'
                }
            ],
            post: null
        };
    }
};
