'use client';

import {PanelLeftOpen, PanelLeftClose} from "lucide-react";
import {Button} from "@/app/_components/ui/button";
import {useState} from "react";

export default function SideBarToggle() {
    const [collapseSidebarToggle, setCollapseSidebarToggle] = useState(false);

    return (
        <Button
            variant="outline"
            size="icon" className="ml-auto h-8 w-8"
            onClick={(prev) => setCollapseSidebarToggle(!prev)}
        >
            {collapseSidebarToggle ?
                <PanelLeftOpen className="h-4 w-4"/> :
                <PanelLeftClose className="h-4 w-4"/>
            }
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}