import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const getUserFromToken = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded as {
            userId: string;
        };
    } catch (error) {
        return null;
    }
};
