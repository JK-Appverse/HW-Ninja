
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Home, History, PencilRuler, Image as ImageIcon, Loader2, Wand2 } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';
import { useToast } from '@/hooks/use-toast';

const HWNinjaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
    <path d="M12 6C9.24 6 7 8.24 7 11C7 12.3 7.55 13.45 8.42 14.28L12 18L15.58 14.28C16.45 13.45 17 12.3 17 11C17 8.24 14.76 6 12 6ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13Z" fill="currentColor" />
  </svg>
);

export default function VisualizerPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a concept to visualize.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateImage({ prompt });
      setGeneratedImage(result.imageDataUri);
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: 'Error',
        description: 'Could not generate the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <HWNinjaLogo className="h-10 w-10 text-primary" />
              <h1 className="font-headline text-2xl font-bold text-primary-foreground">HW Ninja</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/"><Home /><span>Home</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/history"><History /><span>History</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/test"><PencilRuler /><span>Test Yourself</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/visualizer"><ImageIcon /><span>Concept Visualizer</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SettingsPanel onNameChange={() => {}} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Concept Visualizer</h1>
            </div>
          </header>
          <main className="p-4 sm:p-8">
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Visualize a Concept</CardTitle>
                  <CardDescription>
                    Enter a topic, and our AI will generate an image to help you understand it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="concept-prompt" className="text-base">What do you want to learn about?</Label>
                    <Input
                      id="concept-prompt"
                      placeholder="e.g., Photosynthesis, The Water Cycle, Black Holes"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleGenerateImage} disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-purple-500 text-white">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Image
                  </Button>
                </CardFooter>
              </Card>

              <div className="min-h-[400px] w-full">
                {isLoading && (
                   <div className="w-full aspect-video rounded-xl bg-muted flex flex-col items-center justify-center p-8 animate-in fade-in-50 duration-500">
                        <div className="w-full h-full bg-background/50 rounded-lg animate-pulse flex items-center justify-center">
                           <ImageIcon className="h-16 w-16 text-muted-foreground animate-pulse" />
                        </div>
                        <p className="text-muted-foreground mt-4 text-center">AI is creating your image... this might take a moment.</p>
                   </div>
                )}
                {generatedImage && (
                  <Card className="overflow-hidden animate-in fade-in-50 zoom-in-95 duration-500">
                    <CardHeader>
                      <CardTitle>Generated Image for: "{prompt}"</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={generatedImage}
                        alt={`AI generated visualization for ${prompt}`}
                        className="w-full h-auto rounded-lg border shadow-md"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
