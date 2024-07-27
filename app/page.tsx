import Link from "next/link";
import {Button} from "@/app/_components/ui/button";
import {useUser} from "@/app/_context/UserContext";
import {createClient} from "@/app/_utils/supabase/server";
import {signOut} from "@/app/login/actions";
import {ThemeToggle} from "@/app/_components/ThemeToggle";
import {getProducts} from "@/app/_lib/data-service";

export default async function HomePage() {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();

    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gray-200 p-4 shadow-md w-full">
                <div className="max-w-[64rem] mx-auto flex justify-between items-center">
                    {/* Header content here */}
                    <h1>Your Website</h1>

                    {/*Test button for ease*/}
                    <div className={'flex gap-2 justify-center items-center'}>
                        {user?.email}
                        <Link href={'/dashboard'}>
                            <Button variant={'ghost'}>Dashboard</Button>
                        </Link>
                        {user !== null ? (
                            <form action={signOut}>
                                <Button>Sign Out</Button>
                            </form>
                        ) : (
                            <Link href={'/login'}>
                                <Button>Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="bg-gray-100 w-full h-96 mb-4"> {/* Hero section */}
                    {/* Content for hero section goes here */}
                </div>
                <div className="bg-gray-100 max-w-[64rem] h-96 mx-auto"> {/* Information section */}
                    {/* Content for information section goes here */}
                </div>
            </main>

            <footer className="bg-gray-200 p-4 text-center w-full">
                <div className="max-w-[64rem] mx-auto">
                    {/* Footer content here */}
                    <p>&copy; {new Date().getFullYear()} Your Company</p>
                </div>
            </footer>
        </div>
    );
}
