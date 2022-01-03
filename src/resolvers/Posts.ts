import { Context } from '..';
import { userLoader } from '../loaders/userLoader';

interface PostParentType {
    authorId: string;
}

export const Post = {
    author: (parent: PostParentType, __: any, { prisma }: Context) => {
        return userLoader.load(parent.authorId);
    }
};
