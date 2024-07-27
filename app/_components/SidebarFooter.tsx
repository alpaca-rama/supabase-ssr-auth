import {Separator} from "@/app/_components/ui/separator";
import ProfileSection from "@/app/_components/ProfileSection";

export default function SidebarFooter() {
    return (
        <div className="mt-auto p-4">
            <Separator/>
            <ProfileSection />
        </div>
    )
}