import {z} from "zod";
import {maxUsernameLength, minUsernameLength} from "@/types/db/user";

export const JwtPayloadSchema = z.object({
    userId: z.string().uuid(),
    username: z.string().min(minUsernameLength).max(maxUsernameLength),
});

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;