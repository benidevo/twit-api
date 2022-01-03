import { Post } from '@prisma/client';
import { Context } from '../../index';
import { canUserMutatePost } from '../../utils/permissions';

interface PostCreateInputDto {
    post: {
        title: string;
        content: string;
    };
}

interface PostUpdateInputDto {
    id: string;
    post: {
        title: string;
        content: string;
    };
}
interface PostOutputDto {
    errors: {
        message: string;
    }[];
    post: Post | null;
}

export const postMutation = {
    postCreate: async (
        parent,
        { post: input }: PostCreateInputDto,
        { prisma, userId }: Context
    ): Promise<PostOutputDto> => {
        if (!userId) {
            return {
                errors: [
                    {
                        message: 'you must be logged in to create a post'
                    }
                ],
                post: null
            };
        }

        const { title, content } = input;
        if (!title || !content) {
            return {
                errors: [
                    {
                        message: 'title and content are required'
                    }
                ],
                post: null
            };
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        });

        return {
            errors: [],
            post
        };
    },

    postUpdate: async (
        parent,
        { id, post: input }: PostUpdateInputDto,
        { prisma, userId }: Context
    ): Promise<PostOutputDto> => {
        if (!userId) {
            return {
                errors: [
                    {
                        message: 'unauthorized access'
                    }
                ],
                post: null
            };
        }

        const errors = await canUserMutatePost({
            postId: id,
            userId,
            prisma
        });

        if (errors) return errors;

        try {
            const post = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    ...input
                }
            });

            return {
                errors: [],
                post
            };
        } catch (err) {
            return {
                errors: [
                    {
                        message: err.meta.cause
                    }
                ],
                post: null
            };
        }
    },

    postDelete: async (parent, { id }, { prisma, userId }: Context) => {
        if (!userId) {
            return {
                errors: [
                    {
                        message: 'unauthorized access'
                    }
                ],
                post: null
            };
        }

        const error = await canUserMutatePost({
            postId: id,
            userId,
            prisma
        });

        if (error) return error;

        try {
            await prisma.post.delete({
                where: {
                    id
                }
            });
        } catch (err) {
            return {
                errors: [
                    {
                        message: err.meta.cause
                    }
                ],
                post: null
            };
        }

        return {
            errors: [],
            post: null
        };
    }
};
