'use client';

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
import {Database} from "@/app/_types/supabase";
import {Separator} from '@/app/_components/ui/separator';
import React, {useTransition} from "react";
import {toast} from "sonner";
import {updateProduct, updateProfile} from "@/app/_lib/data-service";
import {Product, Profile} from "@/app/_types/database";
import profileSchema from "@/app/_schemas/profileSchema";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card"
import {createClient} from "@/app/_utils/supabase/client";


interface EditProfileFormProps {
    profileData: Profile;
}

export default function EditProfileForm({profileData,}: EditProfileFormProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
        }
    });

    async function handleUpdateProfile(formData: FormData) {
        formData.append('id', profileData.id);
        if (profileData.email !== null) formData.append('email', profileData.email);

        startTransition(() => {
            toast.promise(
                updateProfile(formData),
                {
                    loading: 'Updating profile...',
                    success: `Updated profile successfully!`,
                    error: 'Error updating profile',
                }
            );
        });
    }

    return (
        <div>
            <Card className={'w-full'}>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Add or update your information below</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form action={handleUpdateProfile} id={'login-form'} className="space-y-4 mx-4 md:mx-2">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Update your first name" type={'text'} {...field}
                                                   className={'text-base'}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Update your last name" type="text" {...field}
                                                   className={'text-base'}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder={`${profileData.email}`}
                                                   disabled={true}
                                                   type="text" {...field}
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
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                {/*<CardFooter>*/}
                {/*    <p>Card Footer</p>*/}
                {/*</CardFooter>*/}
            </Card>
        </div>
    );
}
