'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import ProductMenu from "@/app/_components/ProductMenu";
import {Product} from "@/app/_types/database";
import {useMediaQuery} from "@/app/_hooks/use-media-query";
import {Separator} from "@/app/_components/ui/separator";

interface ProductTableProps {
    products: Product[];
    totalProducts: number;
    currentPage: number;
    productsPerPage: number;
}

export default function ProductTable({products, totalProducts, currentPage, productsPerPage}: ProductTableProps) {
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, totalProducts);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                        Manage your products and view their sales performance.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className={'text-right'}>Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className={'text-right'}>{product.price}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            <ProductMenu product={product} classname={'flex justify-center items-center gap-2'}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{totalProducts}</strong> products
                    </div>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {products.map((product) => (
                    <Card key={product.id} className={'my-2'}>
                        <div className={'flex justify-between items-center px-4'}> {/* Added px-4 for horizontal padding */}
                            <div className={'flex flex-col w-full'}>
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardDescription>{product.category}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {product.description}
                                </CardContent>
                                <Separator />
                            <CardFooter className={'flex flex-col items-end mt-2'}>
                                <ProductMenu product={product} classname={'flex gap-2'} />
                            </CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardContent>

            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{totalProducts}</strong> products
                </div>
            </CardFooter>
        </Card>
    );
}