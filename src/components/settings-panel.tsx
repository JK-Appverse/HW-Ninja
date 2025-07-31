"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Paintbrush, Settings } from "lucide-react";

const themes = [
    { name: "Default", bg: "210 40% 98%", primary: "217.2 91.2% 59.8%" },
    { name: "Stone", bg: "240 4.8% 95.9%", primary: "24.6 95% 53.1%" },
    { name: "Rose", bg: "0 0% 100%", primary: "346.8 77.2% 49.8%" },
    { name: "Green", bg: "142.1 76.2% 96.3%", primary: "142.1 70.6% 45.3%" },
    { name: "Blue", bg: "204 100% 96.3%", primary: "217.2 91.2% 59.8%" }
];


export const SettingsPanel: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("app-theme");
        if (savedTheme) {
            applyTheme(themes.find(t => t.name === savedTheme) || themes[0]);
        }
    }, [])

    const applyTheme = (theme: {name: string, bg: string; primary: string}) => {
        const root = document.documentElement;
        root.style.setProperty("--background", theme.bg);
        root.style.setProperty("--primary", theme.primary);
        localStorage.setItem("app-theme", theme.name);
    }
  
    if (!mounted) {
      return null
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Theme</h4>
                        <p className="text-sm text-muted-foreground">
                            Customize the app's appearance.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="theme">Color</Label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {themes.map(theme => (
                                <Button 
                                    key={theme.name} 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyTheme(theme)}
                                >
                                    <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${theme.primary})`}}></div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
