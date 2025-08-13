"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Moon, Sun, Save, Bell, Languages as LanguageIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { useLanguage, type Locale } from "@/contexts/language-context";
import { ScrollArea } from "./ui/scroll-area";

const themes = [
    { name: "Default", bg: "210 40% 98%", primary: "217.2 91.2% 59.8%" },
    { name: "Stone", bg: "240 4.8% 95.9%", primary: "24.6 95% 53.1%" },
    { name: "Rose", bg: "0 100% 97.1%", primary: "346.8 77.2% 49.8%" },
    { name: "Green", bg: "142.1 76.2% 96.3%", primary: "142.1 70.6% 45.3%" },
    { name: "Blue", bg: "204 100% 96.3%", primary: "217.2 91.2% 59.8%" }
];

interface SettingsPanelProps {
    onNameChange: (name: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onNameChange }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { t, setLocale } = useLanguage();
    const [colorTheme, setColorTheme] = useState(themes[0]);
    const [userName, setUserName] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const { toast } = useToast();
    
    useEffect(() => {
        setMounted(true);
        const savedThemeName = localStorage.getItem("app-theme");
        if (savedThemeName) {
            const foundTheme = themes.find(t => t.name === savedThemeName) || themes[0];
            setColorTheme(foundTheme);
            // Re-apply theme on mount to ensure consistency
            applyTheme(foundTheme, theme);
        }
        const savedUserName = localStorage.getItem("user-name");
        if (savedUserName) {
            setUserName(savedUserName);
        }

        const notifStatus = localStorage.getItem("notifications-enabled");
        if (notifStatus === "true" && "Notification" in window && Notification.permission === "granted") {
            setNotificationsEnabled(true);
        } else {
            setNotificationsEnabled(false);
            localStorage.setItem("notifications-enabled", "false");
        }
    }, []);

    const applyTheme = (themeToApply: {name: string, bg: string; primary: string}, mode: string | undefined) => {
        const root = document.documentElement;
        
        const style = root.style;
        style.setProperty("--primary", themeToApply.primary);
        style.setProperty("--sidebar-primary", themeToApply.primary);
        style.setProperty("--sidebar-ring", themeToApply.primary);
        style.setProperty("--ring", themeToApply.primary);
        
        if (mode === 'light') {
           style.setProperty("--background", themeToApply.bg);
        } else {
            // Remove the custom background for dark mode to use the default dark background
            style.removeProperty('--background');
        }
    }

    const handleThemeSelect = (themeToApply: typeof themes[0]) => {
        setColorTheme(themeToApply);
        localStorage.setItem("app-theme", themeToApply.name);
        applyTheme(themeToApply, theme);
    }
  
    useEffect(() => {
        if (mounted) {
            handleThemeSelect(colorTheme);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, mounted]);

    const handleSaveName = () => {
        localStorage.setItem("user-name", userName);
        onNameChange(userName);
        toast({
            title: t.settings.save_name_success_title,
            description: t.settings.save_name_success_desc,
        });
    }

    const handleNotificationToggle = async (enabled: boolean) => {
        if (enabled) {
            if (!("Notification" in window)) {
                toast({ title: "Error", description: "This browser does not support desktop notification.", variant: "destructive" });
                return;
            }
            if (Notification.permission === "granted") {
                setNotificationsEnabled(true);
                localStorage.setItem("notifications-enabled", "true");
                toast({ title: t.settings.notif_enabled_success_title, description: t.settings.notif_enabled_success_desc });
            } else if (Notification.permission !== "denied") {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    setNotificationsEnabled(true);
                    localStorage.setItem("notifications-enabled", "true");
                    toast({ title: t.settings.notif_enabled_success_title, description: t.settings.notif_enabled_success_desc });
                } else {
                    toast({ title: t.settings.notif_blocked_info_title, description: t.settings.notif_blocked_info_desc, variant: "destructive" });
                }
            } else {
                 toast({ title: t.settings.notif_blocked_error_title, description: t.settings.notif_blocked_error_desc, variant: "destructive" });
            }
        } else {
            setNotificationsEnabled(false);
            localStorage.setItem("notifications-enabled", "false");
            toast({ title: t.settings.notif_disabled_success_title, description: t.settings.notif_disabled_success_desc });
        }
    }

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
                    <span>{t.settings.title}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" side="top" align="start">
                <ScrollArea className="h-[400px] w-full">
                    <div className="grid gap-6 p-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{t.settings.appearance_title}</h4>
                            <p className="text-sm text-muted-foreground">
                            {t.settings.appearance_desc}
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="theme-mode">{t.settings.mode_label}</Label>
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
                                <Label htmlFor="theme-color">{t.settings.color_label}</Label>
                                <div className="flex flex-wrap gap-2">
                                    {themes.map(ct => (
                                        <Button 
                                            key={ct.name} 
                                            variant="outline" 
                                            size="icon" 
                                            className={`h-8 w-8 ${colorTheme.name === ct.name ? 'border-primary' : ''}`}
                                            onClick={() => handleThemeSelect(ct)}
                                        >
                                            <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${ct.primary})`}}></div>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Separator />
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{t.settings.language_title}</h4>
                            <p className="text-sm text-muted-foreground">
                                {t.settings.language_desc}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="language-switcher" className="flex items-center gap-2"><LanguageIcon className="h-4 w-4" /> {t.settings.language_label}</Label>
                            <div className="flex items-center gap-2">
                                <Button variant={t.locale === 'en' ? 'secondary' : 'ghost'} className="h-8" onClick={() => setLocale('en' as Locale)}>English</Button>
                                <Button variant={t.locale === 'hi' ? 'secondary' : 'ghost'} className="h-8" onClick={() => setLocale('hi' as Locale)}>हिन्दी</Button>
                            </div>
                        </div>


                        <Separator />
                        
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{t.settings.profile_title}</h4>
                            <p className="text-sm text-muted-foreground">
                            {t.settings.profile_desc}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="user-name">{t.settings.name_label}</Label>
                            <div className="flex items-center gap-2">
                                <Input id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={t.settings.name_placeholder} />
                                <Button size="icon" onClick={handleSaveName}><Save className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{t.settings.notifications_title}</h4>
                            <p className="text-sm text-muted-foreground">
                            {t.settings.notifications_desc}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notifications" className="flex items-center gap-2">
                                <Bell className="h-4 w-4"/>
                                {t.settings.daily_reminders_label}
                            </Label>
                            <Switch
                                id="notifications"
                                checked={notificationsEnabled}
                                onCheckedChange={handleNotificationToggle}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    )
}
