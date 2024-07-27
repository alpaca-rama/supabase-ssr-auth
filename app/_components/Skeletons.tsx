import {Skeleton} from "@/app/_components/ui/skeleton";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/app/_components/ui/table";
import ProductDropdownMenu from "@/app/_components/ProductMenu";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/app/_components/ui/card";


export function ProductTableSkeletonFull() {
    const rowCount: number = 10;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className={'w-[150px] h-[40px] rounded-full'}/></CardTitle>
                    <CardDescription>
                        <Skeleton className={'w-[300px] h-[30px] rounded-full'}/>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Skeleton className={'w-[90px] h-[20px] rounded-full'}/></TableHead>
                                <TableHead className="hidden md:table-cell"><Skeleton
                                    className={'w-[80px] h-[20px] rounded-full'}/></TableHead>
                                <TableHead><Skeleton className={'w-[120px] h-[20px] rounded-full'}/></TableHead>
                                <TableHead><Skeleton className={'w-[70px] h-[20px] rounded-full'}/></TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({length: rowCount}).map((_, index) => (
                                <TableRow>
                                    <TableCell className="font-medium"><Skeleton
                                        className={'w-[90px] h-[10px] rounded-full'}/></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton
                                        className={'w-[80px] h-[10px] rounded-full'}/></TableCell>
                                    <TableCell><Skeleton className={'w-[120px] h-[10px] rounded-full'}/></TableCell>
                                    <TableCell><Skeleton className={'w-[70px] h-[10px] rounded-full'}/></TableCell>
                                    <TableCell><Skeleton className={'w-[10px] h-[25px] rounded-full'}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <Skeleton className={'w-[200px] h-[5px] rounded-full'}/>
                    </div>
                </CardFooter>
            </Card>
            <div className={'mt-5 flex w-full justify-center'}>
                <Skeleton className={'w-[500px] h-[30px] rounded-full'}/>
            </div>
        </>
    )
}

export function ProductTableSkeletonTableRow() {
    const rowCount: number = 10;

    return (
        <>
            {Array.from({length: rowCount}).map((_, index) => (
                <TableRow>
                    <TableCell className="font-medium"><Skeleton
                        className={'w-[90px] h-[10px] rounded-full'}/></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton
                        className={'w-[80px] h-[10px] rounded-full'}/></TableCell>
                    <TableCell><Skeleton className={'w-[120px] h-[10px] rounded-full'}/></TableCell>
                    <TableCell><Skeleton className={'w-[70px] h-[10px] rounded-full'}/></TableCell>
                    <TableCell><Skeleton className={'w-[10px] h-[25px] rounded-full'}/></TableCell>
                </TableRow>
            ))}
        </>
    )
}

export function PaginationSkeleton() {
    return (
        <div className={'mt-5 flex w-full justify-center'}>
            <Skeleton className={'w-[500px] h-[30px] rounded-full'}/>
        </div>
    )
}
