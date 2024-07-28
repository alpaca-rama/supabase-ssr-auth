'use client';

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/app/_components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";
import {ThemeToggle} from "@/app/_components/ThemeToggle";
import {Separator} from "@/app/_components/ui/separator";
import SignOutActionForm from "@/app/_components/SignOutActionForm";
import Link from "next/link";

export default function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical size={'18'}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div className={'flex justify-center items-center gap-2'}>
                        <Link href={'/account'}>My Account</Link>
                        <ThemeToggle className={'md:hidden'}/>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem><Link href={'/account/profile'}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/account/preferences'}>Preferences</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'#'}>Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'flex justify-center items-center'}>
                    <SignOutActionForm />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}