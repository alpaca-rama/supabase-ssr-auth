'use client';

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Search} from "lucide-react";
import {Input} from "@/app/_components/ui/input";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import * as repl from "node:repl";

const formSchema = z.object({
    search: z.string(),
});

export default function AdminSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    });

    const handleSearch = useDebouncedCallback((term) => {
        // For testing at the start
        console.log(term);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`)
    }, 300);

    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     console.log(values);
    // }

    return (
        // <form>
            <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="appearance-none bg-background pl-8 shadow-none md:w-[70%] lg:w-full"
                    {...form.register('search')}
                    onChange={(e) => {handleSearch(e.target.value)}}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
        // </form>
    )
}