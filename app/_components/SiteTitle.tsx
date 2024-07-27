import Link from "next/link";
import {Package2} from "lucide-react";
import React from "react";

interface SiteTitleProps {
    title: string;
}

export default function SiteTitle({ title }: SiteTitleProps): JSX.Element {
    return (
        <div className="md:hidden flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6"/>
                <span className="">{title}</span>
            </Link>
        </div>
    )
}