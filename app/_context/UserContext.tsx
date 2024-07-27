"use client";

import React, { createContext, useContext, useState } from "react";
import { User as SupabaseUser } from "@supabase/auth-js";

interface UserContextType {
    user: SupabaseUser | null;
}

interface UserProviderProps {
    children: React.ReactNode;
    initialUser: SupabaseUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: UserProviderProps) {
    const [user, setUser] = useState<SupabaseUser | null>(initialUser);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
