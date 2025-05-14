import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string(),
    username: z.string().min(3).max(20),
});

export type User = z.infer<typeof UserSchema>;