import { postMutation, authMutation } from './mutation/index';

export const Mutation = {
    ...postMutation,
    ...authMutation
};
