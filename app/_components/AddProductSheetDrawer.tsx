'use client';

import React, {useState, useTransition} from "react";
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
    SheetClose,
} from "@/app/_components/ui/sheet";
import {ScrollArea} from "@/app/_components/ui/scroll-area";
import {Separator} from "@/app/_components/ui/separator";
import {Product} from "@/app/_types/database";
import AddProductForm from "@/app/_components/AddProductForm";

interface AddProductSheetDrawerProps {
    product: Product;
}

export function AddProductSheetDrawer() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isPending, startTransition] = useTransition();

    function handleFormClose() {
        setOpen(false);
    };

    if (isDesktop) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                {/*<SheetTrigger>*/}
                <Button
                    variant="default"
                    size={'default'}
                    onClick={() => setOpen(true)}
                    disabled={isPending}
                >
                    Add Product
                </Button>
                {/*</SheetTrigger>*/}
                <SheetContent className={'border border-gray-500 overflow-y-auto'}>
                    <div className={'p-4 mt-6 border rounded'}>
                        <ScrollArea>
                            <SheetHeader>
                                <SheetTitle>Add Product</SheetTitle>
                                <Separator/>
                                <SheetDescription>
                                    Add the details for your product
                                </SheetDescription>
                                <AddProductForm onFormClose={handleFormClose} />
                            </SheetHeader>
                            <DrawerClose asChild>
                                <div className={'mx-2'}>
                                    <Button
                                        variant="outline"
                                        className={'w-full mt-2'}
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </DrawerClose>
                        </ScrollArea>
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {/*<DrawerTrigger asChild>*/}
            <Button
                variant="default"
                onClick={() => setOpen(true)}
                size={'sm'}
            >
                Add Product
            </Button>
            {/*</DrawerTrigger>*/}
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className={'mx-4'}>Add Product</DrawerTitle>
                    <DrawerDescription className={'mx-4'}>
                        Add the details for your product
                    </DrawerDescription>
                    <Separator className={'mx-4'}/>
                </DrawerHeader>
                <ScrollArea className={'overflow-y-auto mb-6'}>
                    <AddProductForm onFormClose={handleFormClose} />
                    <div className={'mx-4 mt-2'}>
                        <Button
                            variant={"outline"}
                            className={'w-full'}
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </div>
                    {/*<DrawerFooter className="pt-2">*/}
                    {/*    <DrawerClose asChild className={'w-full'}>*/}
                    {/*    </DrawerClose>*/}
                    {/*</DrawerFooter>*/}
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}
