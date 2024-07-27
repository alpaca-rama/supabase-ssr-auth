'use client';

import {useState, useTransition} from "react";
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
import {Trash2} from "lucide-react";
import {toast} from "sonner";
import {deleteProduct} from "@/app/_components/DeleteProductAction";
import {Product} from "@/app/_types/database";

interface DeleteProductDialogDrawerProps {
    product: Product;
}

export function DeleteProductDialogDrawer({product}: DeleteProductDialogDrawerProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isPending, startTransition] = useTransition();

    async function handleDeleteProduct() {
        startTransition(() => {
            toast.promise(deleteProduct(product.id), {
                loading: 'Deleting product...',
                success: `${product.name} has been deleted successfully!`,
                error: 'Error deleting product',
            });
        })
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {/*<DialogTrigger asChild>*/}
                <Button
                    variant="destructive"
                    size={'sm'}
                    onClick={() => setOpen(true)}
                    disabled={isPending}
                >
                    <Trash2 size={14}/>
                </Button>
                {/*</DialogTrigger>*/}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Product Delete</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the following product? <br/>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <p className={'text-sm'}>
                            Name: <strong>{product.name}</strong> <br/>
                            Category: <strong>{product.category}</strong> <br/>
                            Description: <strong>{product.description}</strong> <br/>
                            Price: <strong>{product.price}</strong>
                        </p>
                    </div>
                    <div className={'flex justify-center items-center gap-2'}>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className={"mt-1 w-full"}
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            no
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="mt-1 w-full"
                            onClick={handleDeleteProduct}
                            disabled={isPending}
                        >
                            Yes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {/*<DrawerTrigger asChild>*/}
            <Button
                variant="destructive"
                size={'sm'}
                onClick={() => setOpen(true)}
                disabled={isPending}
            >
                <Trash2 size={14}/>
            </Button>
            {/*</DrawerTrigger>*/}
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Confirm Product Delete</DrawerTitle>
                    <DrawerDescription>
                        Are you sure you want to delete the following product? <br/>
                        Product name: <strong>{product.name}</strong> <br/>
                        Product description: <strong>{product.description}</strong>
                    </DrawerDescription>
                </DrawerHeader>
                <div className={'flex justify-center items-center gap-4 mb-5 mx-4'}>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className={"mt-1 w-full"}
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        no
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="mt-1 w-full"
                        onClick={handleDeleteProduct}
                        disabled={isPending}
                    >
                        Yes
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
