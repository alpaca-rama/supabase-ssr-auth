import LoginForm from "@/app/_components/LoginForm";
import {createClient} from "@/app/_utils/supabase/server";
import {redirect} from "next/navigation";
import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger
} from '@/app/_components/ui/tabs';
import SignupForm from "@/app/_components/SignupForm";

export default async function LoginPage({searchParams}: { searchParams: { message: string }; }) {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (user) return redirect("/dashboard");

    return (
        <div className={'flex items-center justify-center md:items-center md:justify-center min-h-screen max-w-[450px] mx-auto'}>
            <Tabs defaultValue="login" className={'my-4'}>
                <TabsList className={'flex justify-between mx-3'}>
                    <TabsTrigger value="login" className={'w-full'}>Login</TabsTrigger>
                    <TabsTrigger value="signup" className={'w-full'}>Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm searchParams={searchParams}/>
                </TabsContent>
                <TabsContent value="signup">
                    <SignupForm searchParams={searchParams}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}