import React from "react";
import {getUserProfile} from "@/app/_lib/data-service";
import {Profile} from "@/app/_types/database";
import EditProfileForm from "@/app/_components/EditProfileForm";

export default async function ProfilePage() {
    const profileData: Profile = await getUserProfile();

    return (
        <div>
            <h1>Profile Page</h1>

            <EditProfileForm profileData={profileData} />
        </div>
    )
}