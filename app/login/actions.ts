'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/_utils/supabase/server';
import loginSchema from "@/app/_schemas/loginSchema";
import signupSchema from "@/app/_schemas/signupSchema";
import {Provider} from "@supabase/auth-js";
import {getURL} from "@/app/_utils/helpers";
import {z} from "zod";


export async function emailLogin(email: string, password: string) {
    // Validate input using Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
        console.error(`Login validation error: ${JSON.stringify(result.error.issues)}`);
        return { error: 'Invalid email or password format' };
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password
    });

    if (error) {
        console.error(`Login error: ${error.message}`);
        return { error: 'Invalid email or password' };
    }

    revalidatePath('/', 'layout');
    return { success: true };
}

export async function emailSignup(data: z.infer<typeof signupSchema>) {
    const supabase = createClient();
    // Validate input using Zod
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        console.error(`Signup validation error: ${JSON.stringify(result.error.issues)}`);
        return { error: result.error.issues[0].message };
    }


    const { data: signupData, error } = await supabase.auth.signUp({
        email: result.data.email,
        password: result.data.password,
        options: {
            data: {
                first_name: result.data.first_name,
                last_name: result.data.last_name,
                email: result.data.email
            }
        }
    });

    if (error) {
        console.error(`Signup error: ${error.message}`);
        return { error: 'Error during signup. Please try again.' };
    }

    revalidatePath('/', 'layout');
    return { success: true };
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