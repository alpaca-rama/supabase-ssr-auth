'use client';

import SideBarNav from "@/app/_components/SideBarNav";
import SidebarFooter from "@/app/_components/SidebarFooter";
import Link from "next/link";
import {Package2} from "lucide-react";
import {dashNavLinks} from "@/app/_data/navlinks";
import React from "react";
import {usePathname} from "next/navigation";
import {Separator} from "@/app/_components/ui/separator";
import ProfileSection from "@/app/_components/ProfileSection";
import {Profile} from "@/app/_types/database";

interface SideBarProps {
    profileData: Profile;
}

export default function SideBar({profileData}: SideBarProps) {
    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname?.startsWith(href);
    };

    return (
        <aside className="hidden border-r bg-muted/40 md:block">
            <div className="flex max-h-screen flex-col gap-2 sticky top-0 h-screen overflow-y-auto">
                {/*<SideBarNav/>*/}
                {/*<SidebarFooter/>*/}

                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6"/>
                        <span className="">Site Name</span>
                    </Link>
                </div>

                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {dashNavLinks.map((link) => (
                            <Link href={link.href}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${isActive(link.href) ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                  key={link.text}
                            >
                                <link.icon className={'w-4 h-4'}/>
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto">
                    <div className={'p-4'}>
                        <Separator/>
                        <ProfileSection profileData={profileData}/>
                    </div>
                </div>
            </div>
        </aside>
    )
}