// 'use server'

import {signOut} from "@/app/login/actions";
import {Button} from "@/app/_components/ui/button";

export default function SignOutActionForm() {
    return (
        <form action={async () => signOut()}>
            <Button variant={'destructive'} size={'sm'} className={'mt-1'}>Sign Out</Button>
        </form>
    )
}