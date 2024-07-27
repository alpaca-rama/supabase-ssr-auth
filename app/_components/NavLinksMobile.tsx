'use client';

import {navLinks} from "@/app/_data/navlinks";
import Link from "next/link";
import {SheetClose} from "@/app/_components/ui/sheet";
import React from "react";
import {usePathname} from "next/navigation";

export default function NavLinksMobile() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname?.startsWith(href);
    };

    return (
        <nav className="grid gap-2 text-lg font-medium">
            {navLinks.map((link) => (
                <Link href={link.href}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isActive(link.href) ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                      key={link.text}
                >
                    <SheetClose className={'flex gap-2 items-center w-full'}>
                        <link.icon className={'w-5 h-5'}/>
                        {link.text}
                    </SheetClose>
                </Link>
            ))}
        </nav>
    )
}