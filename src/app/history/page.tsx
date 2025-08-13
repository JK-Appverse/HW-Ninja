
"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/history";
import HistoryItemCard from "@/components/history-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, History, Trash2, PencilRuler, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SettingsPanel } from "@/components/settings-panel";
import { useLanguage } from "@/contexts/language-context";

const HWNinjaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2L3 5V11C3 16.52 7.03 21.74 12 23C16.97 21.74 21 16.52 21 11V5L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 23C12 23 15 20 15 16V11H9V16C9 20 12 23 12 23Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 14L9 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
         <path
            d="M13 14L15 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadedHistory = getHistory();
    setHistory(loadedHistory.reverse());
    setLoading(false);
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background font-body text-foreground">
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-3 p-2">
                        <HWNinjaLogo className="h-10 w-10 text-primary" />
                        <h1 className="font-headline text-2xl font-bold animated-title">
                        HW Ninja
                        </h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Home />
                                <span>{t.sidebar.home}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/history">
                                <History />
                                <span>{t.sidebar.history}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/test">
                                <PencilRuler />
                                <span>{t.sidebar.test_yourself}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/visualizer">
                                <Image />
                                <span>{t.sidebar.visualizer}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                 <SidebarFooter>
                    <SettingsPanel onNameChange={() => {}}/>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="flex flex-col h-screen">
                    <header className="sticky top-0 z-10 flex items-center justify-between border-b p-4 bg-background/80 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-bold animated-title">{t.history.title}</h1>
                        </div>
                        <Button variant="destructive" onClick={handleClearHistory} disabled={history.length === 0}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t.history.clear_history_button}
                        </Button>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-br from-background to-slate-900/50">
                    {loading ? (
                        <p>{t.history.loading}</p>
                    ) : history.length > 0 ? (
                        <div className="grid gap-6">
                            {history.map((item, index) => (
                                <HistoryItemCard key={`${item.timestamp}-${index}`} item={item} />
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>{t.history.no_history_title}</CardTitle>
                                <CardDescription>{t.history.no_history_desc}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild>
                                    <Link href="/">{t.history.go_to_solver_button}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                    </main>
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
