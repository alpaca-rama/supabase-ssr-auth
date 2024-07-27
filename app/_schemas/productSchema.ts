import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters'}),
    category: z.string().min(1, {message: 'Category must be at least 1 characters'}),
    description: z.string().min(15, {message: 'Description must be at least 15 characters'}),
    price: z.number().min(0, {message: 'Price must be at 0 or more'}),
});

export default productSchema;
