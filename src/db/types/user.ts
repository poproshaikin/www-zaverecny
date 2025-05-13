import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>;