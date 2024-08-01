import React from "react";
import {getUserProfile} from "@/app/_lib/data-service";
import {ProfileData} from "@/app/_types/database";

export default async function ProfilePage() {
    const {first_name, last_name, email}: ProfileData = await getUserProfile();

    return (
        <div>
            <h1>Profile Page</h1>

            <p>Greetings, {first_name}!</p>
        </div>
    )
}