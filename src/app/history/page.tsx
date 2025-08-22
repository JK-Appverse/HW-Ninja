
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
      <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4776e6'}} />
              <stop offset="29%" style={{stopColor: '#8e54e9'}} />
              <stop offset="67%" style={{stopColor: '#ff2195'}} />
              <stop offset="100%" style={{stopColor: '#f86343'}} />
          </linearGradient>
      </defs>
       <path d="M49.999 16.666C41.866 16.666 35.148 21.65 32.793 28.333H25V20.833H16.667V37.5H25V30C25 24.1 29.433 19.166 35.833 19.166C41.816 19.166 45.833 24.1 45.833 30V37.5H54.167V30C54.167 22.517 49.999 16.666 49.999 16.666Z" fill="url(#logo-gradient)"/>
        <path d="M83.333 41.666V25H75V41.666H62.5V50H75V62.5H83.333V50H91.667V41.666H83.333Z" fill="url(#logo-gradient)"/>
        <path d="M66.667 75.433L58.75 83.333L50.833 75.433L50 62.5H51.667L66.667 75.433Z" fill="url(#logo-gradient)"/>
        <path d="M33.333 75.433L41.25 83.333L49.167 75.433L50 62.5H48.333L33.333 75.433Z" fill="url(#logo-gradient)"/>
        <path d="M50 87.5L45.833 83.333H54.167L50 87.5Z" fill="url(#logo-gradient)"/>
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
                        <HWNinjaLogo className="h-10 w-10" />
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
                     <div id="container-f8337d9b11da86d5400e09683f3fe791" className="flex justify-center my-4"></div>
                    </main>
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
