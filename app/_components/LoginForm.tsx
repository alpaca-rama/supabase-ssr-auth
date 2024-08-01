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
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import loginSchema from "@/app/_schemas/loginSchema";
import {emailLogin} from "@/app/login/actions";
import OAuthButtons from "@/app/login/oauth-signin";
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Separator} from '@/app/_components/ui/separator';
import {useFormStatus} from 'react-dom';

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button
            className="w-full"
            type="submit"
            disabled={pending}
        >
            {pending ? 'Logging in...' : 'Login'}
        </Button>
    );
}

export default function LoginForm({searchParams,}: { searchParams: { message: string }; }) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const {pending} = useFormStatus();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    async function onSubmit(formData: FormData) {
        setServerError(null);

        try {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const result = await emailLogin(email, password);
            if (result.error) {
                setServerError(typeof result.error === 'string' ? result.error : 'Login failed. Please try again.');
            } else if (result.success) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setServerError('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <Card className="mx-2 max-h-fit max-w-fit">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-col gap-4'}>
                <Form {...form}>
                    <form action={onSubmit} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" type={'email'} {...field}
                                               className={'text-base'}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your password" type="password" {...field}
                                               className={'text-base'}/>
                                    </FormControl>
                                    <FormMessage/>
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

                        <div className="flex justify-between items-center">
                            <Link href="#" className="text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <SubmitButton/>
                        </div>
                    </form>
                </Form>

                <div className="flex justify-center items-center my-4">
                    <Separator className="w-1/3"/>
                    <span className="px-4 text-sm text-muted-foreground">
                        or login with
                    </span>
                    <Separator className="w-1/3"/>
                </div>

                <OAuthButtons buttonText={'Login'}/>
            </CardContent>
        </Card>
    );
}
