import { Context } from '../index';

interface PostCreateDto {
  title: string;
  content: string;
}
export const Mutation = {
  postCreate: async (
    parent,
    { title, content }: PostCreateDto,
    { prisma }: Context
  ) => {
    const user = await prisma.post.create({
      data: {
        title,
        content,
        authorId: '268a8e6e-a9a6-4a05-90e1-a689abc7c096'
      }
    });

    return {
      errors: [],
      data: user
    };
  }
};
