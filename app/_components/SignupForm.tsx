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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import {emailSignup} from "@/app/login/actions";
import OAuthButtons from "@/app/login/oauth-signin";
import signupSchema from "@/app/_schemas/signupSchema";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Separator} from '@/app/_components/ui/separator';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full"
            type="submit"
            disabled={pending}
        >
            {pending ? 'Signing up...' : 'Sign up'}
        </Button>
    );
}


export default function SignupForm({searchParams,}: { searchParams: { message: string }; }) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    });

    async function onSubmit(formData: FormData) {
        setServerError(null);

        try {
            const data = {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                confirm_password: formData.get('confirm_password') as string
            };

            const result = await emailSignup(data);
            if (result.error) {
                setServerError(typeof result.error === 'string' ? result.error : 'Signup failed. Please try again.');
            } else if (result.success) {
                router.push('/login?message=Signup successful. Please log in.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setServerError('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <Card className="mx-2 max-h-fit max-w-fit">
            <CardHeader>
                <CardTitle className="text-2xl">Sign up</CardTitle>
                <CardDescription>
                    Enter your details below to sign up for an account, or sign up with a social login
                </CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-col gap-4'}>
                <Form {...form}>
                    <form action={onSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" type={'text'} {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input placeholder="Enter your last name" type={'text'} {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input placeholder="Enter your email" type={'email'} {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field, fieldState: { error }}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your password" type="password" {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage>{error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm your password" type="password" {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {serverError && (
                            <div className="text-sm font-medium text-destructive">
                                {serverError}
                            </div>
                        )}
                        {searchParams.message && (
                            <div className="text-sm font-medium text-destructive">
                                {searchParams.message}
                            </div>
                        )}

                        <div className='flex flex-col gap-2'>
                            <SubmitButton />
                        </div>
                    </form>
                </Form>

                <div className="flex justify-center items-center my-4">
                    <Separator className="w-[30%]"/>
                    <span className="px-4 text-sm text-muted-foreground">
                        or sign up with
                    </span>
                    <Separator className="w-[30%]"/>
                </div>

                <OAuthButtons buttonText={'Sign up'}/>
            </CardContent>
        </Card>
    );
}
