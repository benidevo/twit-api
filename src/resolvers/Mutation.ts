import { Post } from '@prisma/client';
import { Context } from '../index';

interface PostCreateInputDto {
  title: string;
  content: string;
}
interface PostCreateOutputDto {
  errors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    parent,
    { title, content }: PostCreateInputDto,
    { prisma }: Context
  ): Promise<PostCreateOutputDto> => {
    if (!title || !content) {
      return {
        errors: [
          {
            message: 'title and content are required',
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
  }
};
