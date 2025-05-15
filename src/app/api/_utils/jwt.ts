'use server'

import jwt from 'jsonwebtoken'
import { JwtPayload } from '@/types/zod-schemas'

const secret = process.env.JWT_SECRET as string

export async function generateToken(payload: JwtPayload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' })
}

export async function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, secret)
        if (typeof decoded === 'string') {
            return null
        }
        return decoded as JwtPayload
    } catch (error) {
        return null
    }
}
