
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Home, History, PencilRuler, Image as ImageIcon, Loader2, Wand2, ThumbsUp, ThumbsDown, Download, AlertCircle } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

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

export default function VisualizerPage() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: t.visualizer.toast_empty_prompt_title,
        description: t.visualizer.toast_empty_prompt_desc,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setFeedback(null);

    try {
      const result = await generateImage({ prompt });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: t.visualizer.toast_error_title,
        description: t.visualizer.toast_error_desc,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    // Sanitize prompt for filename
    const fileName = `hwninja-${prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
     toast({
        title: t.visualizer.toast_download_title,
        description: t.visualizer.toast_download_desc,
      });
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <HWNinjaLogo className="h-10 w-10" />
              <h1 className="font-headline text-2xl font-bold animated-title">HW Ninja</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/"><Home /><span>{t.sidebar.home}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/history"><History /><span>{t.sidebar.history}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/test"><PencilRuler /><span>{t.sidebar.test_yourself}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/visualizer"><ImageIcon /><span>{t.sidebar.visualizer}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SettingsPanel onNameChange={() => {}} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
            <div className="flex flex-col h-screen">
                <header className="sticky top-0 z-10 flex items-center justify-between border-b p-4 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold animated-title">{t.visualizer.title}</h1>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-br from-background to-slate-900/50">
                    <div className="max-w-2xl mx-auto flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                        <CardTitle>{t.visualizer.card_title}</CardTitle>
                        <CardDescription>
                            {t.visualizer.card_desc}
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="concept-prompt" className="text-base">{t.visualizer.prompt_label}</Label>
                            <Input
                            id="concept-prompt"
                            placeholder={t.visualizer.prompt_placeholder}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                            />
                        </div>
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t.visualizer.disclaimer_title}</AlertTitle>
                            <AlertDescription>
                            {t.visualizer.disclaimer_desc}
                            </AlertDescription>
                        </Alert>
                        </CardContent>
                        <CardFooter>
                        <Button onClick={handleGenerateImage} disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-purple-500 text-white">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            {t.visualizer.generate_button}
                        </Button>
                        </CardFooter>
                    </Card>

                    <div className="min-h-[400px] w-full">
                        {isLoading && (
                        <div className="w-full aspect-video rounded-xl bg-muted flex flex-col items-center justify-center p-8 animate-in fade-in-50 duration-500">
                                <div className="w-full h-full bg-background/50 rounded-lg animate-pulse flex items-center justify-center">
                                <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                                </div>
                                <p className="text-muted-foreground mt-4 text-center">{t.visualizer.loading_message}</p>
                        </div>
                        )}
                        {generatedImage && (
                        <Card className="overflow-hidden animate-in fade-in-50 zoom-in-95 duration-500">
                            <CardHeader>
                            <CardTitle>{t.visualizer.generated_image_title(prompt)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <img
                                src={generatedImage}
                                alt={t.visualizer.generated_image_alt(prompt)}
                                className="w-full h-auto rounded-lg border shadow-md"
                            />
                            </CardContent>
                            <CardFooter className="flex items-center gap-2 p-4">
                                <p className="text-sm text-muted-foreground mr-auto">{t.visualizer.feedback_prompt}</p>
                                <Button 
                                    variant={feedback === 'like' ? 'secondary' : 'ghost'} 
                                    size="icon" 
                                    onClick={() => setFeedback('like')}
                                    className={feedback === 'like' ? 'text-green-500' : ''}
                                    aria-label="Like"
                                >
                                    <ThumbsUp className="h-5 w-5"/>
                                </Button>
                                <Button 
                                    variant={feedback === 'dislike' ? 'secondary' : 'ghost'} 
                                    size="icon" 
                                    onClick={() => setFeedback('dislike')}
                                    className={feedback === 'dislike' ? 'text-red-500' : ''}
                                    aria-label="Dislike"
                                >
                                    <ThumbsDown className="h-5 w-5"/>
                                </Button>
                                <Button variant="outline" onClick={handleDownload}>
                                    <Download className="mr-2 h-4 w-4"/>
                                    {t.visualizer.download_button}
                                </Button>
                            </CardFooter>
                        </Card>
                        )}
                    </div>
                     <div id="container-f8337d9b11da86d5400e09683f3fe791" className="flex justify-center my-4"></div>
                    </div>
                </main>
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
