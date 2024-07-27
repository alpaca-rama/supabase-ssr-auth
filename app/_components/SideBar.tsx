import SideBarNav from "@/app/_components/SideBarNav";
import SidebarFooter from "@/app/_components/SidebarFooter";
import MobileNav from "@/app/_components/MobileNav";

export default function SideBar() {
    return (
        <aside className="hidden border-r bg-muted/40 md:block">
            <div className="flex max-h-screen flex-col gap-2 sticky top-0 h-screen overflow-y-auto">
                <SideBarNav/>
                <SidebarFooter/>
            </div>
        </aside>
    )
}