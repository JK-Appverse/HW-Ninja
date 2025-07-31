"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Moon, Sun, Save } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const themes = [
    { name: "Default", bg: "210 40% 98%", primary: "217.2 91.2% 59.8%" },
    { name: "Stone", bg: "240 4.8% 95.9%", primary: "24.6 95% 53.1%" },
    { name: "Rose", bg: "0 0% 100%", primary: "346.8 77.2% 49.8%" },
    { name: "Green", bg: "142.1 76.2% 96.3%", primary: "142.1 70.6% 45.3%" },
    { name: "Blue", bg: "204 100% 96.3%", primary: "217.2 91.2% 59.8%" }
];

interface SettingsPanelProps {
    onNameChange: (name: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onNameChange }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [colorTheme, setColorTheme] = useState(themes[0]);
    const [userName, setUserName] = useState('');
    const { toast } = useToast();
    
    useEffect(() => {
        setMounted(true);
        const savedThemeName = localStorage.getItem("app-theme");
        if (savedThemeName) {
            const foundTheme = themes.find(t => t.name === savedThemeName) || themes[0];
            setColorTheme(foundTheme);
        }
        const savedUserName = localStorage.getItem("user-name");
        if (savedUserName) {
            setUserName(savedUserName);
        }
    }, []);

    const applyTheme = (themeToApply: {name: string, bg: string; primary: string}) => {
        const root = document.documentElement;
        setColorTheme(themeToApply);
        localStorage.setItem("app-theme", themeToApply.name);
        
        const style = root.style;
        style.setProperty("--primary", themeToApply.primary);
        style.setProperty("--sidebar-primary", themeToApply.primary);
        style.setProperty("--sidebar-ring", themeToApply.primary);
        style.setProperty("--ring", themeToApply.primary);
        
        if (theme === 'light') {
           style.setProperty("--background", themeToApply.bg);
        } else {
            style.removeProperty('--background');
        }
    }

    const handleSaveName = () => {
        localStorage.setItem("user-name", userName);
        onNameChange(userName);
        toast({
            title: "Success!",
            description: "Your name has been saved.",
        });
    }
  
    useEffect(() => {
        if (mounted) {
            applyTheme(colorTheme);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <PopoverContent className="w-80">
                <div className="grid gap-6">
                     <div className="space-y-2">
                        <h4 className="font-medium leading-none">Appearance</h4>
                        <p className="text-sm text-muted-foreground">
                            Customize the look and feel.
                        </p>
                    </div>
                    <div className="grid gap-4">
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
                        <div className="space-y-2">
                            <Label htmlFor="theme-color">Color</Label>
                             <div className="flex flex-wrap gap-2">
                                {themes.map(ct => (
                                    <Button 
                                        key={ct.name} 
                                        variant="outline" 
                                        size="icon" 
                                        className={`h-8 w-8 ${colorTheme.name === ct.name ? 'border-primary' : ''}`}
                                        onClick={() => applyTheme(ct)}
                                    >
                                        <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${ct.primary})`}}></div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <h4 className="font-medium leading-none">Profile</h4>
                        <p className="text-sm text-muted-foreground">
                           Set your name for a personalized experience.
                        </p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="user-name">Name</Label>
                        <div className="flex items-center gap-2">
                            <Input id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your name" />
                            <Button size="icon" onClick={handleSaveName}><Save className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
