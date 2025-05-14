import z from 'zod'

export const VirtualDbSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string(),
})

export type VirtualDb = z.infer<typeof VirtualDbSchema>
