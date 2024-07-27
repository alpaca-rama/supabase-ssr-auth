'use client';

import {useState} from "react";
import {useMediaQuery} from "@/app/_hooks/use-media-query";
import {Button} from "@/app/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
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
import {ScrollArea} from "@/app/_components/ui/scroll-area";
import AddProductForm from "@/app/_components/AddProductForm";

interface AddDialogDrawerProps {
    buttonText: string;
    title: string;
    description?: string;
}

export function AddDialogDrawer({buttonText, title, description}: AddDialogDrawerProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {/*<DialogTrigger asChild>*/}
                    <Button variant="default" onClick={() => setOpen(true)}>{buttonText}</Button>
                {/*</DialogTrigger>*/}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <AddProductForm buttonText={buttonText} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
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
