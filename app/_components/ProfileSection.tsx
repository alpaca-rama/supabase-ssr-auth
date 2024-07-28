import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";
import ProfileMenu from "@/app/_components/ProfileMenu";
import {createClient} from "@/app/_utils/supabase/server";
import {User} from "@supabase/supabase-js";

interface ProfileSectionProps {
    user: User | null;
}

export default function ProfileSection({user}: ProfileSectionProps) {
    return (
        <div className={'mt-2 flex justify-between items-center'}>
            <div className={'flex justify-center items-center gap-2'}>
                <Avatar>
                    <AvatarImage src={'#'}/>
                    <AvatarFallback>FB</AvatarFallback>
                </Avatar>
                <div>
                    <p className={'font-medium text-sm'}>{user?.user_metadata.name}</p>
                    <p className={'font-extralight text-xs'}>{user?.email}</p>
                </div>
            </div>
            <ProfileMenu />
        </div>
    )
}