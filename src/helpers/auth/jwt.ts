import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/types/zod-schemas'

const secret = process.env.JWT_SECRET as string;

export const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
}