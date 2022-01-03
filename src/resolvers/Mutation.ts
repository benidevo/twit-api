import { Post } from '@prisma/client';
import { Context } from '../index';

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

export const Mutation = {
    postCreate: async (
        parent,
        { post: input }: PostCreateInputDto,
        { prisma }: Context
    ): Promise<PostOutputDto> => {
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
                authorId: '268a8e6e-a9a6-4a05-90e1-a689abc7c096'
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
        { prisma }: Context
    ): Promise<PostOutputDto> => {
        let post: Post | null;
        try {
            post = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    ...input
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
			} 
        }
  
    },

    postDelete: async (parent, { id }, { prisma }: Context) => {
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
			}
		}
		
		return {
			errors: [],
			post: null
		}
    }
};
