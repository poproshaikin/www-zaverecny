import { z } from 'zod'

export const minUsernameLength = 3
export const maxUsernameLength = 20

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string(),
    username: z.string().min(minUsernameLength).max(maxUsernameLength),
})

export type User = z.infer<typeof UserSchema>

export const UserLoginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type UserLogin = z.infer<typeof UserLoginSchema>

export const UserRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string().min(minUsernameLength).max(maxUsernameLength),
})

export type UserRegister = z.infer<typeof UserRegisterSchema>
