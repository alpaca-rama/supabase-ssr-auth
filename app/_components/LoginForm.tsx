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
import {emailLogin, emailSignup} from "@/app/login/actions";
import OAuthButtons from "@/app/login/oauth-signin";


export default function LoginForm({searchParams,}: { searchParams: { message: string }; }) {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

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
                    <form id={'login-form'} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" type={'email'} {...field} className={'text-base'} />
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
                                        <Input placeholder="Enter your password" type="password" {...field} className={'text-base'} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                            <Button
                                className="w-full"
                                formAction={emailLogin}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
                <OAuthButtons />
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Button
                        variant={'link'}
                        form={'login-form'}
                        formAction={emailSignup}
                        className={'underline underline-offset-2'}
                    >
                        Sign up
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
