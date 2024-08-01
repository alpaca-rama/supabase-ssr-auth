import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";
import ProfileMenu from "@/app/_components/ProfileMenu";
import Link from "next/link";
import {ProfileData} from "@/app/_types/database";

interface ProfileSectionProps {
    profileData: ProfileData;
}

export default function ProfileSection({profileData: {first_name, last_name, email}}: ProfileSectionProps) {
    const fullName = `${first_name} ${last_name}`;
    const initials = `${first_name?.slice(0,1)}${last_name?.slice(0,1)}`;

    return (
        <div className={'mt-2 flex justify-between items-center'}>
            <div className={'flex justify-center items-center gap-2'}>
                <Link href={'/account/profile'}>
                    <Avatar>
                        <AvatarImage src={'#'}/>
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Link>
                <div>
                    <p className={'font-medium text-sm'}>{fullName}</p>
                    <p className={'font-extralight text-xs'}>{email}</p>
                </div>
            </div>
            <ProfileMenu/>
        </div>
    )
}