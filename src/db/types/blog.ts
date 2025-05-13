import { z } from 'zod';

export const blog = z.object({
    id: z.string().uuid(),

});