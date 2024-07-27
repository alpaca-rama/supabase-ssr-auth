'use server';

import { deleteProductById } from '@/app/_lib/data-service';

export async function deleteProduct(productId: string) {
    try {
        await deleteProductById(productId);
    } catch (error) {
        console.error('Failed to delete product:', error);
        throw new Error('Failed to delete product');
    }
}