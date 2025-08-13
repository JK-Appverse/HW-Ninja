
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
      <path
          d="M50 10C35.5 10 23.5 19 23.5 35.5V50H35.5V35.5C35.5 27.5 42 22 50 22C58 22 64.5 27.5 64.5 35.5V50H76.5V35.5C76.5 19 64.5 10 50 10Z"
          fill="url(#logo-gradient)"
      />
      <path
          d="M30 65L50 85L70 65L50 45L30 65Z"
          fill="url(#logo-gradient)"
      />
      <path
          d="M42 58L50 66L58 58L50 50L42 58Z"
          fill="url(#logo-gradient)"
      />
      <path
          d="M50 85L40 90L50 95L60 90L50 85Z"
          fill="url(#logo-gradient)"
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
                    </main>
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
