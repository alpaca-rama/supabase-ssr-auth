'use client';

import React, {useState} from "react";
import {useMediaQuery} from "@/app/_hooks/use-media-query";
import {Button} from "@/app/_components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/app/_components/ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/_components/ui/sheet";
import {ScrollArea} from "@/app/_components/ui/scroll-area";
import AddProductForm from "@/app/_components/AddProductForm";

interface AddSheetDrawerProps {
    buttonText: string;
    title: string;
    description?: string;
}

export function AddSheetDrawer({buttonText, title, description}: AddSheetDrawerProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                {/*<SheetTrigger>*/}
                    <Button variant="default" onClick={() => setOpen(true)}>{buttonText}</Button>
                {/*</SheetTrigger>*/}
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                        <AddProductForm buttonText={buttonText} setOpen={setOpen} className={'px-4'}/>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {/*<DrawerTrigger asChild>*/}
                <Button variant="default" onClick={() => setOpen(true)}>{buttonText}</Button>
            {/*</DrawerTrigger>*/}
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <ScrollArea className={'overflow-y-auto'}>
                    <AddProductForm buttonText={buttonText} setOpen={setOpen} className={'px-4'}/>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}
