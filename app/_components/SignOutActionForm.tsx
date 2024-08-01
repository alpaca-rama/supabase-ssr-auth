import {signOut} from "@/app/login/actions";
import {Button} from "@/app/_components/ui/button";
import {LogOut} from "lucide-react";

export default function SignOutActionForm() {
    return (
        <form action={async () => signOut()}>
            <Button variant={'ghost'} size={'sm'}>
                <LogOut size={16} className={'mr-2'}/>
                Sign Out
            </Button>
        </form>
    )
}