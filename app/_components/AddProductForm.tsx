// 'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/app/_components/ui/form';
import {Input} from "@/app/_components/ui/input";
import {Button} from "@/app/_components/ui/button";
import productSchema from "@/app/_schemas/productSchema";
import {Textarea} from "@/app/_components/ui/textarea";
import {Separator} from '@/app/_components/ui/separator';
import React, {useTransition} from "react";
import {toast} from "sonner";
import {addProduct} from "@/app/_lib/data-service";


interface AddProductFormProps {
    onFormClose: () => void;
}

export default function AddProductForm({onFormClose}: AddProductFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            category: '',
            description: '',
            price: 0,
        }
    });

    async function handleAddProduct(formData: FormData) {
        onFormClose();

        startTransition(() => {
            toast.promise(
                addProduct(formData),
                {
                    loading: 'Adding product...',
                    success: `${formData.get('name')} has been added successfully!`,
                    error: 'Error adding product',
                }
            );
        });
    };

    return (
        <Form {...form}>
            <form action={handleAddProduct} id={'login-form'} className="space-y-4 mx-4 md:mx-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" type={'text'} {...field}
                                       className={'text-base'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product category" type="text" {...field}
                                       className={'text-base'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter product description" {...field}
                                          className={'text-base'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product description" type="text" {...field}
                                       className={'text-base'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Separator/>
                <div className='flex flex-col gap-2'>
                    <Button
                        className="w-full"
                        disabled={isPending}
                        type={'submit'}
                    >
                        Add Product
                    </Button>
                </div>
            </form>
        </Form>
    );
}
