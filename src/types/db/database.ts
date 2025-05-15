import z from 'zod';

const minNameLength = 3;
const maxNameLength = 50;
const minPasswordLength = 8;

export const VirtualDbSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string().min(minNameLength).max(maxNameLength),
    password: z.string().min(minPasswordLength),
    createdAt: z.date(),
});

export type VirtualDb = z.infer<typeof VirtualDbSchema>;

export const CreateVirtualDbSchema = z.object({
    name: z.string().min(minNameLength).max(maxNameLength),
    password: z.string().min(minPasswordLength),
});

export type CreateVirtualDb = z.infer<typeof CreateVirtualDbSchema>;
