import {AddDialogDrawer} from "@/app/_components/AddDialogDrawer";
import {AddSheetDrawer} from "@/app/_components/AddSheetDrawer";

interface EmptyPlaceholderProps {
    heading: string;
    description: string;
}

export default function EmptyPlaceholder({heading, description}: EmptyPlaceholderProps) {
    return (
        <div
            className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-secondary  hover:border-primary shadow-sm"
            x-chunk="dashboard-02-chunk-1"
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    {heading}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
                <AddDialogDrawer title={'This is a title'} description={'This is the description'} buttonText={'Dialog/Sheet'} />
                <AddSheetDrawer title={'this is a title'} description={'This is the description'} buttonText={'Sheet/Sheet'} />
            </div>
        </div>
    )
}