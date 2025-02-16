"use client";

import * as React from "react";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import {Button} from "@/app/_components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {useEffect, useState} from "react";


export function ThemeDropdown() {
    const {setTheme} = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function ThemeToggle({className}: {className?: string}) {
    const {theme, setTheme} = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    // Ensure component is mounted to avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={className}
        >
            {
                theme === 'light' ?
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"/>
                    : <MoonIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-transform duration-300 dark:-rotate-0 dark:scale-100"/>
            }
        </Button>
    );
}
