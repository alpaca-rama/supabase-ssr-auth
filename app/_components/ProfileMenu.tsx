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
                        My Account
                        <ThemeToggle className={'md:hidden'}/>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem><Link href={'#'}>Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'#'}>Billing</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'#'}>Team</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'#'}>Subscription</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={'flex justify-center items-center'}>
                    <SignOutActionForm />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}