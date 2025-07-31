"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
    { name: "Default", bg: "210 40% 98%", primary: "217.2 91.2% 59.8%" },
    { name: "Stone", bg: "240 4.8% 95.9%", primary: "24.6 95% 53.1%" },
    { name: "Rose", bg: "0 0% 100%", primary: "346.8 77.2% 49.8%" },
    { name: "Green", bg: "142.1 76.2% 96.3%", primary: "142.1 70.6% 45.3%" },
    { name: "Blue", bg: "204 100% 96.3%", primary: "217.2 91.2% 59.8%" }
];


export const SettingsPanel: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("app-theme");
        if (savedTheme) {
            const foundTheme = themes.find(t => t.name === savedTheme);
            if (foundTheme) {
                applyTheme(foundTheme);
            }
        }
    }, []);

    const applyTheme = (theme: {name: string, bg: string; primary: string}) => {
        const root = document.documentElement;
        if (document.body.classList.contains('dark')) {
            // In dark mode, we just set the primary, not the background.
            root.style.setProperty("--primary", theme.primary);
            localStorage.setItem("app-theme", theme.name);
            return;
        }
        root.style.setProperty("--background", theme.bg);
        root.style.setProperty("--primary", theme.primary);
        localStorage.setItem("app-theme", theme.name);
    }
  
    // This effect ensures the theme is reapplied when switching between light/dark mode
    useEffect(() => {
        if (mounted) {
             const savedThemeName = localStorage.getItem("app-theme");
             const savedTheme = themes.find(t => t.name === savedThemeName);
             if (theme === 'dark') {
                // Remove custom background when going to dark mode
                document.documentElement.style.removeProperty('--background');
             } else if (savedTheme) {
                // Re-apply theme when going to light mode
                applyTheme(savedTheme);
             }
        }
    }, [theme, mounted]);

    if (!mounted) {
      return (
        <Button variant="ghost" className="w-full justify-start" disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
        </Button>
      );
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
                        <h4 className="font-medium leading-none">Appearance</h4>
                        <p className="text-sm text-muted-foreground">
                            Customize the look and feel.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme-mode">Mode</Label>
                            <div className="flex items-center gap-2">
                                <Button variant={theme === 'light' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setTheme("light")}>
                                    <Sun className="h-4 w-4" />
                                </Button>
                                <Button variant={theme === 'dark' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setTheme("dark")}>
                                    <Moon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme-color">Color</Label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {themes.map(colorTheme => (
                                <Button 
                                    key={colorTheme.name} 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyTheme(colorTheme)}
                                >
                                    <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${colorTheme.primary})`}}></div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
