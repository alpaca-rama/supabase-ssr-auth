import { z } from 'zod';

const signupSchema = z.object({
    first_name: z.string().min(3, {message: 'First name must be at least 3 characters'}).max(25),
    last_name: z.string().min(3, {message: 'Last name must be at least 3 characters'}).max(25),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirm_password: z.string()
}).refine(
    data => data.password === data.confirm_password,
    {
        message: "Passwords do not match",
        path: ['confirm_password'],
    }
);

export default signupSchema;
