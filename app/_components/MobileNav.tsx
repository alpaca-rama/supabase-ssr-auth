import {Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription} from "@/app/_components/ui/sheet";
import {Button} from "@/app/_components/ui/button";
import {Menu} from "lucide-react";
import React from "react";
import ProfileSection from "@/app/_components/ProfileSection";
import NavLinksMobile from "@/app/_components/NavLinksMobile";
import {ProfileData} from "@/app/_types/database";

interface MobileNavProps {
    profileData: ProfileData;
}

export default function MobileNav({profileData}: MobileNavProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <SheetTitle className={'sr-only'}>Menu Title</SheetTitle>
                <SheetDescription className={'sr-only'}>Mobile menu</SheetDescription>
                <div className={'mt-4'}>
                    <NavLinksMobile />
                </div>

                <div className={'mt-auto flex flex-col'}>
                   <ProfileSection profileData={profileData} />
                </div>
            </SheetContent>
        </Sheet>
    )
}