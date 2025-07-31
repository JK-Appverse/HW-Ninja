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

const HWNinjaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
        />
        <path
            d="M12 6C9.24 6 7 8.24 7 11C7 12.3 7.55 13.45 8.42 14.28L12 18L15.58 14.28C16.45 13.45 17 12.3 17 11C17 8.24 14.76 6 12 6ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13Z"
            fill="currentColor"
        />
    </svg>
);

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="min-h-screen w-full bg-background font-body text-foreground">
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-3 p-2">
                        <HWNinjaLogo className="h-10 w-10 text-primary" />
                        <h1 className="font-headline text-2xl font-bold text-primary-foreground">
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
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/history">
                                <History />
                                <span>History</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/test">
                                <PencilRuler />
                                <span>Test Yourself</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/visualizer">
                                <Image />
                                <span>Concept Visualizer</span>
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
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold">History</h1>
                    </div>
                    <Button variant="destructive" onClick={handleClearHistory} disabled={history.length === 0}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear History
                    </Button>
                </header>
                <main className="p-4 sm:p-8">
                {loading ? (
                    <p>Loading history...</p>
                ) : history.length > 0 ? (
                    <div className="grid gap-6">
                        {history.map((item, index) => (
                            <HistoryItemCard key={`${item.timestamp}-${index}`} item={item} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>No History Yet</CardTitle>
                            <CardDescription>Start solving some homework to see your history here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/">Go to Solver</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
