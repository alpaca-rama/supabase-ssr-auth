import LoginForm from "@/app/_components/LoginForm";
import {createClient} from "@/app/_utils/supabase/server";
import {redirect} from "next/navigation";

export default async function LoginPage({searchParams}: { searchParams: { message: string }; }) {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (user) return redirect("/dashboard");

    return (
        <div className={'flex items-center justify-center md:items-center md:justify-center min-h-screen'}>
            <LoginForm searchParams={searchParams} />
        </div>
    )
}