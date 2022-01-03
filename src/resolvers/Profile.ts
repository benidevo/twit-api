import { Context } from '..';

interface ProfileParentType {
    id: string;
    bio: string;
    userId: string;
}

export const Profile = {
    user: (parent: ProfileParentType, __: any, { prisma }: Context) => {
        return prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        });
    }
};
