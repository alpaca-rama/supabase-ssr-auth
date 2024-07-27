'use client';

import {DeleteProductDialogDrawer} from "@/app/_components/DeleteProductDialogDrawer";
import {EditProductSheetDrawer} from "@/app/_components/EditProductSheetDrawer";
import {Product} from "@/app/_types/database";

interface ProductMenuProps {
    product: Product;
    classname?: string;
}

export default function ProductMenu({product, classname}: ProductMenuProps) {
    return (
        <div className={classname}>
            <EditProductSheetDrawer product={product} />
            <DeleteProductDialogDrawer product={product}/>
        </div>
    );
}