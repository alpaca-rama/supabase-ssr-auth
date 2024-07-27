'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/app/_utils/supabase/server';
import loginSchema from "@/app/_schemas/loginSchema";
import signupSchema from "@/app/_schemas/signupSchema";
import {Provider} from "@supabase/auth-js";
import {getURL} from "@/app/_utils/helpers";

export async function emailLogin(formData: FormData) {
    const supabase = createClient();

    // Extract data from FormData and ensure non-null values
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        console.error('Email or password is missing');
        redirect('/error?area=1');
    }

    const data = {
        email: email.toString(),
        password: password.toString(),
    };

    // Validate data using Zod
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        // Handle validation errors
        console.error(result.error.format());
        redirect('/error');
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/login?message=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function emailSignup(formData: FormData) {
    console.log(formData);
    const supabase = createClient();

    // Extract data from FormData and ensure non-null values
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        console.error('Email or password is missing');
        redirect('/error?area=2');
    }

    const data = {
        email: email as string,
        password: password as string,
    };

    // Validate data using Zod
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        // Handle validation errors
        console.error(result.error.format());
        redirect('/error?area=3');
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect('/login?message=Error signing up');
    }

    revalidatePath('/', 'layout');
    redirect('/login');
}

export async function signOut() {
    const supabase = createClient();

    await supabase.auth.signOut();

    redirect('/');
}

export async function oAuthSignIn(provider: Provider) {
    if (!provider) return redirect('/login?message=No provider selected');

    const supabase = createClient();
    const redirectUrl = getURL('/auth/callback');
    const {data, error} = await supabase.auth.signInWithOAuth({
       provider: provider,
       options: {
           redirectTo: redirectUrl,
       }
    });

    if (error) {
        redirect('/login?message=Could not authenticate user');
    }

    return redirect(data.url);
}