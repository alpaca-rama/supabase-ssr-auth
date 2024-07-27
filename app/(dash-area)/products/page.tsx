import {Suspense} from "react";
import ProductTable from "@/app/_components/ProductTable";
import {getFilteredProducts, getProductCount} from "@/app/_lib/data-service";
import AdminSearch from "@/app/_components/AdminSearch";
import PaginationButtons from "@/app/_components/Pagination";
import {ProductTableSkeletonFull} from "@/app/_components/Skeletons";
import {PRODUCTS_PER_PAGE} from "@/app/_data/constants";
import {AddProductSheetDrawer} from "@/app/_components/AddProductSheetDrawer";

interface ProductsPageProps {
    query?: string;
    page?: string;
}

export default async function ProductsPage({searchParams}: { searchParams?: ProductsPageProps }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const products = await getFilteredProducts(query, currentPage);
    const totalProducts = await getProductCount(query);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Products Page</h1>
            <div className={'flex justify-around items-center gap-6'}>
                <AdminSearch/>
                <AddProductSheetDrawer/>
            </div>
            <Suspense key={query + currentPage} fallback={<ProductTableSkeletonFull/>}>
                <ProductTable
                    products={products}
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                />
                <div className="mt-5 flex w-full justify-center">
                    <PaginationButtons totalPages={Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}/>
                </div>
            </Suspense>
        </div>
    );
}