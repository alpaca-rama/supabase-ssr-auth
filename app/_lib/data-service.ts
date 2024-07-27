'use server';

import {createClient} from "@/app/_utils/supabase/server";
import {ascending} from "d3-array";
import {revalidatePath} from "next/cache";
import {PRODUCTS_PER_PAGE} from "@/app/_data/constants";
import {Product} from "@/app/_types/database";

//////////
// GET //
/////////

export async function getProducts(): Promise<Product[]> {
    const supabase = createClient();

    const {data, error} = await supabase
        .from('et_products')
        .select('*')


    if (error) {
        console.error(`❌ [data-service.ts - getProducts] ${error}`);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function getFilteredProducts(
    query: string,
    currentPage: number,
    pageSize: number = PRODUCTS_PER_PAGE
): Promise<Product[]> {
    const supabase = createClient();
    const startRange = (currentPage - 1) * pageSize;
    const endRange = startRange + pageSize - 1;

    // Parse the query to a number if it's numeric
    const numericQuery = parseFloat(query);
    const isNumericQuery = !isNaN(numericQuery); // Check if query is a number

    const {data, error, count} = await supabase
        .from("et_products")
        .select("*", {count: "exact"})
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%${
            isNumericQuery ? `,price.eq.${numericQuery}` : "" // Only add price filter if query is numeric
        }`)
        .range(startRange, endRange)
        .order('updated_at', {ascending: false});

    if (error) {
        console.error(`❌ [data-service.ts - getFilteredProducts] ${error}`);
        throw new Error("Products could not be loaded");
    }

    // Introduce a delay of 2 seconds (2000 milliseconds)
    // For testing purposes, obviously o_0
    // await new Promise(resolve => setTimeout(resolve, 2000));

    return data;
}

export async function getProductPages(query: string) {
    try {
        const supabase = createClient();

        // Parse the query to a number if it's numeric
        const numericQuery = parseFloat(query);
        const isNumericQuery = !isNaN(numericQuery); // Check if query is a number

        const {count} = await supabase
            .from("et_products")
            .select("*", {count: "exact"})
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%${
                isNumericQuery ? `,price.eq.${numericQuery}` : "" // Only add price filter if query is numeric
            }`)

        const totalPages = Math.ceil(Number(count) / PRODUCTS_PER_PAGE);

        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of products.");
    }
}

export async function getProductCount(query: string) {
    try {
        const supabase = createClient();

        // Parse the query to a number if it's numeric
        const numericQuery = parseFloat(query);
        const isNumericQuery = !isNaN(numericQuery); // Check if query is a number

        const {count} = await supabase
            .from("et_products")
            .select("*", {count: "exact"})
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%${
                isNumericQuery ? `,price.eq.${numericQuery}` : "" // Only add price filter if query is numeric
            }`)

        const totalProducts = Number(count);

        return totalProducts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of products.");
    }
}


// //////////
// DELETE //
////////////

export async function deleteProductById(productId: string) {
    console.log(`Attempting to delete product with ID: ${productId}`);
    const supabase = createClient();

    const { data, error } = await supabase
        .from('et_products')
        .delete()
        .eq('id', productId)
        .select();

    if (error) {
        console.error(`Error deleting product: ${error.message}`);
        throw new Error(`Error deleting product: ${error.message}`);
    }

    if (data && data.length > 0) {
        console.log(`Successfully deleted product with ID: ${productId}`);
    } else {
        console.warn(`No product found with ID: ${productId}`);
    }

    revalidatePath('/products');
}

export async function updateProduct(formData: FormData) {
    console.log(`Attempting to Update product ${formData.get('id')}`);
    const supabase = createClient();

    const id = formData.get('id');
    if (!id) {
        throw new Error('Product ID is required');
    }

    const updatedData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
    };

    const { data, error } = await supabase
        .from('et_products')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();


    if (error) {
        console.error(`Error updating product: ${error.message}`);
        throw new Error(`Error updating product: ${error.message}`);
    }

    if (data) {
        console.log(`Successfully updated product`);
    } else {
        console.warn(`No product found`);
    }

    revalidatePath('/products');
}


// //////////
// UPDATE //
////////////

export async function addProduct(formData: FormData) {
    console.log(`Attempting to add product ${formData.get('name')}`);
    const supabase = createClient();

    const addProductData = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
    };

    const { data, error } = await supabase
        .from('et_products')
        .insert(addProductData)
        .select()
        .single();


    if (error) {
        console.error(`Error adding product: ${error.message}`);
        throw new Error(`Error adding product: ${error.message}`);
    }

    if (data) {
        console.log(`Successfully added product ${formData.get('name')}`);
    } else {
        console.warn(`No product found called ${formData.get('name')}`);
    }

    revalidatePath('/products');
}