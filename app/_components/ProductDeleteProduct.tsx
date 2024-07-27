'use server'

import {Button} from "@/app/_components/ui/button";
import {Trash2} from "lucide-react";

export default async function ProductDeleteProduct() {
    return (
        <form action={''}>
            <Button
                variant={'outline'}
                size={'default'}
                className={''}
            >
                {/*<Trash2 size={'18'}/>*/}
                Delete
            </Button>
        </form>
    )
}