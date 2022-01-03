import { User } from '@prisma/client';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { Context } from '../../index';

interface AuthInputDto {
    email: string;
    name: string;
    password: string;
}
interface AuthOutputDto {
    errors: {
        message: string;
    }[];
    token: string | null;
}

export const authMutation = {
    signup: async (
        parent: any,
        { email, name, password }: AuthInputDto,
        { prisma }: Context
    ): Promise<AuthOutputDto> => {
        if (!email || !name || !password) {
            return {
                errors: [
                    {
                        message: 'email, name and password are required'
                    }
                ],
                token: null
            };
        }

        if (!validator.isEmail(email)) {
            return {
                errors: [
                    {
                        message: 'invalid email'
                    }
                ],
                token: null
            };
        }

        if (!validator.isLength(password, { min: 6 })) {
            return {
                errors: [
                    {
                        message: 'password must be at least 6 characters'
                    }
                ],
                token: null
            };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            });

            await prisma.profile.create({
                data: {
                    bio: '',
                    userId: user.id
                }
            });

            const token = await jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET
            );
            return {
                errors: [],
                token
            };
        } catch (err) {
            if (err.code === 'P2002') {
                return {
                    errors: [
                        {
                            message: 'user already exists'
                        }
                    ],
                    token: null
                };
            }
            return {
                errors: [
                    {
                        message: 'internal server error'
                    }
                ],
                token: null
            };
        }
    }
};
