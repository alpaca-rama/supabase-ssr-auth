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
import {Contact, User, Settings2, Cog} from 'lucide-react';

export default function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical size={'18'}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div className={'flex justify-center items-center gap-2'}>
                        <Link href={'/account'}>
                            <div className={'flex justify-center items-center gap-2'}>
                                <Contact size={20}/>
                                My Account
                            </div>
                        </Link>
                        <ThemeToggle className={'md:hidden'}/>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className={'my-2'} />

                <DropdownMenuItem>
                    <Link href={'/account/profile'}>
                        <div className={'flex justify-center items-center gap-2'}>
                            <User size={16}/>
                            Profile
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'/account/preferences'}>
                        <div className={'flex justify-center items-center gap-2'}>
                            <Settings2 size={16}/>
                            Preferences
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'account/settings'}>
                        <div className={'flex justify-center items-center gap-2'}>
                            <Cog size={16}/>
                            Settings
                        </div>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <SignOutActionForm/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}