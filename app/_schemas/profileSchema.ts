import { z } from 'zod';

const profileSchema = z.object({
    first_name: z.string().min(1).max(25).optional(),
    last_name: z.string().min(1).max(25).optional(),
    email: z.string().email().optional(),
});

export default profileSchema;
