"use client";

import React, { useState, type FC, useRef, useEffect } from "react";
import Link from 'next/link';
import {
  FileDown,
  Upload,
  Wand2,
  BrainCircuit,
  Loader2,
  History,
  Home,
  Bot,
  PencilRuler,
  Camera,
  Image,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { smartSolve, type SmartSolveOutput } from "@/ai/flows/smart-solve";
import { explainSimply } from "@/ai/flows/explain-simply";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { useToast } from "@/hooks/use-toast";
import SolutionCard from "@/components/solution-card";
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
} from "@/components/ui/sidebar";
import { saveHistory } from "@/lib/history";
import { SettingsPanel } from "@/components/settings-panel";
import AdBanner from "@/components/ad-banner";

const HWNinjaLogo: FC<React.SVGProps<SVGSVGElement>> = (props) => (
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


const isNativeApp = () => {
    return typeof window !== "undefined" && (window as any).Capacitor?.isNativePlatform();
}

// =======================================================================
// || विज्ञापन के लिए ढाँचा (Ads Structure for Web and App)             ||
// =======================================================================

// Interstitial विज्ञापन दिखाने के लिए फ़ंक्शन
const showInterstitialAd = (): Promise<void> => {
  console.log("Interstitial Ad: दिखाने का प्रयास किया जा रहा है...");
  if (isNativeApp()) {
    // =======================================================
    // || यहाँ पर आपको AdMob का Interstitial Ad कोड डालना है। ||
    // =======================================================
    console.log("Running in Native App. AdMob Interstitial Ad should be shown here.");
    return Promise.resolve();
  } else {
    // AdSense Auto Ads यह अपने आप संभाल लेगा। वेबसाइट के लिए यह एक सैंपल है।
    console.log("Running in Web Browser. AdSense will handle ads automatically.");
    return new Promise(resolve => setTimeout(() => {
      console.log("Interstitial Ad simulation complete for web.");
      resolve();
    }, 1000));
  }
};


// इनाम वाले (Rewarded) विज्ञापन के लिए फ़ंक्शन
const showRewardedAd = (): Promise<boolean> => {
  console.log("Rewarded Ad: दिखाने का प्रयास किया जा रहा है...");
   if (isNativeApp()) {
    // ===================================================
    // || यहाँ पर आपको AdMob का Rewarded Ad कोड डालना है। ||
    // ===================================================
    console.log("Running in Native App. AdMob Rewarded Ad should be shown here.");
    // यह सैंपल मान रहा है कि विज्ञापन देख लिया गया है।
    return Promise.resolve(true);
  } else {
    // AdSense का ऑटो विज्ञापन इसे हैंडल करेगा। यह वेब के लिए एक सैंपल है।
    const adWatched = true; 
    return new Promise(resolve => setTimeout(() => {
      if(adWatched){
          console.log("Rewarded Ad: इनाम दिया गया (वेब सैंपल)।");
          resolve(true);
      } else {
          console.log("Rewarded Ad: यूज़र ने विज्ञापन बंद कर दिया (वेब सैंपल)।");
          resolve(false);
      }
    }, 1500));
  }
};
// =======================================================================
// || विज्ञापन ढाँचे का अंत                                             ||
// =======================================================================


export default function HWNinjaPage() {
  const [gradeLevel, setGradeLevel] = useState("8");
  const [subject, setSubject] = useState("Maths");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");
  const [userName, setUserName] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isShowingAd, setIsShowingAd] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [solution, setSolution] = useState<SmartSolveOutput | null>(null);
  const [simpleExplanation, setSimpleExplanation] = useState<string | null>(
    null
  );
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState(
    "Hi there! Let's solve some homework. Fill in the details and your question, and I'll get right to it!"
  );
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

  const handleDailyNotification = () => {
    const notificationsEnabled = localStorage.getItem("notifications-enabled") === "true";
    if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        const lastVisit = localStorage.getItem("last-app-visit");
        const today = new Date().toDateString();

        if (lastVisit !== today) {
            // Schedule notification for a specific time, e.g., 9 AM
            const now = new Date();
            const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
            let timeout = notificationTime.getTime() - now.getTime();
            if(timeout < 0) { // if 9am is already past, schedule for tomorrow
                notificationTime.setDate(notificationTime.getDate() + 1);
                timeout = notificationTime.getTime() - now.getTime();
            }
            
            setTimeout(() => {
                 new Notification("HW Ninja", {
                    body: "Your test is waiting for you! 🧠",
                    icon: "/icons/icon-192x192.png"
                });
            }, timeout);
        }
    }
    // Update last visit date
    localStorage.setItem("last-app-visit", new Date().toDateString());
  };


  useEffect(() => {
    const storedName = localStorage.getItem("user-name");
    if (storedName) {
      setUserName(storedName);
      setAiMessage(`Hi ${storedName}! How can I help you today?`);
    }
    handleDailyNotification();
  }, []);
  
  useEffect(() => {
    if (audioRef.current && audioDataUri) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioDataUri]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!question.trim() && !image) {
      toast({
        title: "Uh oh!",
        description: "Please enter a question or upload an image before I can solve it.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSolution(null);
    setSimpleExplanation(null);
    setAudioDataUri(null);
    setAiMessage("Let me think... I'm working on the solution now!");

    // विज्ञापन दिखाने का लॉजिक
    try {
        setIsShowingAd(true);
        setAiMessage("Loading an ad before we solve...");
        await showInterstitialAd();
        setIsShowingAd(false);
    } catch (adError) {
        console.error("Ad error:", adError);
        setIsShowingAd(false); // विज्ञापन में गड़बड़ी होने पर भी जारी रखें
    }

    try {
      const input = {
        question,
        gradeLevel: parseInt(gradeLevel, 10),
        subject: subject as "Maths" | "Science" | "English" | "Hindi" | "Social Science",
        difficultyLevel: difficulty as "Easy" | "Medium" | "Hard",
        ...(testMode && { studentAnswer }),
        ...(image && { photoDataUri: image }),
        ...(language && { language }),
        ...(userName && { userName }),
      };
      const result = await smartSolve(input);
      setSolution(result);
      setAiMessage("I've got it! Check out the solution below.");
      saveHistory({
        ...input,
        solution: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error solving question:", error);
      toast({
        title: "Error",
        description: "I couldn't solve the question. Please try again.",
        variant: "destructive",
      });
      setAiMessage(
        "Oops, something went wrong. Could you try asking again?"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!solution) return;

    setIsExplaining(true);
    setSimpleExplanation(null);
    setAiMessage("Breaking it down for you... one moment!");

    try {
      const result = await explainSimply({
        question,
        solution: solution.solution,
        gradeLevel: parseInt(gradeLevel, 10),
        userName,
        language: language || undefined,
      });
      setSimpleExplanation(result.simpleExplanation);
      setAiMessage("Hope this makes it crystal clear!");
    } catch (error) {
      console.error("Error explaining solution:", error);
      toast({
        title: "Error",
        description: "I couldn't explain the solution. Please try again.",
        variant: "destructive",
      });
      setAiMessage("I had a little trouble explaining that. Maybe try again?");
    } finally {
      setIsExplaining(false);
    }
  };

  const handlePrint = async () => {
    setIsShowingAd(true);
    setAiMessage("Watch a short ad to download the PDF.");
    try {
        const adWatched = await showRewardedAd();
        if (adWatched) {
            toast({
                title: "Thanks for watching!",
                description: "Your download is starting.",
            });
            window.print();
        } else {
             toast({
                title: "Ad not completed",
                description: "Please watch the full ad to download.",
                variant: "destructive"
            });
        }
    } catch (adError) {
        console.error("Rewarded ad error:", adError);
        toast({
            title: "Ad Error",
            description: "Could not load the ad. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsShowingAd(false);
        setAiMessage("How can I help you next?");
    }
  };

  const handleListen = async () => {
    if (!solution) return;

    setIsSpeaking(true);
    setAudioDataUri(null);
    setAiMessage("Getting the audio ready...");

    try {
        const textToSpeak = `
            Solution: ${solution.solution}.
            Explanation: ${solution.explanation}.
            ${simpleExplanation ? `Simplified Explanation: ${simpleExplanation}` : ''}
        `;
        const result = await textToSpeech({ text: textToSpeak });
        setAudioDataUri(result.audioDataUri);
        setAiMessage("Now playing the solution for you!");
    } catch (error) {
        console.error("Error generating speech:", error);
        toast({
            title: "Audio Error",
            description: "I couldn't generate the audio. Please try again.",
            variant: "destructive",
        });
        setAiMessage("Sorry, I'm having trouble speaking right now.");
    } finally {
        setIsSpeaking(false);
    }
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
                <SidebarMenuButton asChild isActive>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
            <SettingsPanel onNameChange={setUserName} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Homework Solver</h1>
            </div>
          </header>

          <main className="flex flex-col gap-8 p-4 sm:p-8">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <div>
                    <Label htmlFor="grade-level" className="font-medium">
                      Class
                    </Label>
                    <Select
                      value={gradeLevel}
                      onValueChange={setGradeLevel}
                      name="grade-level"
                    >
                      <SelectTrigger id="grade-level" className="mt-2">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 7 }, (_, i) => i + 6).map((g) => (
                          <SelectItem key={g} value={String(g)}>
                            Class {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="font-medium">
                      Subject
                    </Label>
                    <Select
                      value={subject}
                      onValueChange={setSubject}
                      name="subject"
                    >
                      <SelectTrigger id="subject" className="mt-2">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maths">Maths</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Social Science">Social Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="font-medium">
                      Difficulty
                    </Label>
                    <Select
                      value={difficulty}
                      onValueChange={setDifficulty}
                      name="difficulty"
                    >
                      <SelectTrigger id="difficulty" className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label htmlFor="language" className="font-medium">
                      Language
                    </Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                      name="language"
                    >
                      <SelectTrigger id="language" className="mt-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Auto-detect</SelectItem>
                        <SelectItem value="Assamese">Assamese</SelectItem>
                        <SelectItem value="Bengali">Bengali</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Gujarati">Gujarati</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Kannada">Kannada</SelectItem>
                        <SelectItem value="Malayalam">Malayalam</SelectItem>
                        <SelectItem value="Marathi">Marathi</SelectItem>
                        <SelectItem value="Odia">Odia</SelectItem>
                        <SelectItem value="Punjabi">Punjabi</SelectItem>
                        <SelectItem value="Tamil">Tamil</SelectItem>
                        <SelectItem value="Telugu">Telugu</SelectItem>
                        <SelectItem value="Urdu">Urdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 animate-in fade-in-50 slide-in-from-bottom-5 duration-500 delay-100">
              <div className="lg:col-span-3">
                <Tabs defaultValue="type">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="type">Type Question</TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="type">
                    <Card>
                      <CardContent className="p-4">
                        <Textarea
                          placeholder="e.g., What is the powerhouse of the cell?"
                          className="min-h-[150px] resize-none text-base"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                         <div className="mt-4 flex items-center gap-3">
                            <Switch
                                id="test-mode"
                                checked={testMode}
                                onCheckedChange={setTestMode}
                            />
                            <Label htmlFor="test-mode" className="font-medium">
                                Test Mode
                            </Label>
                        </div>
                        {testMode && (
                          <div className="mt-4">
                            <Label
                              htmlFor="student-answer"
                              className="font-medium"
                            >
                              Your Answer
                            </Label>
                            <Input
                              id="student-answer"
                              placeholder="Type your answer here before solving"
                              className="mt-2"
                              value={studentAnswer}
                              onChange={(e) =>
                                setStudentAnswer(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="upload">
                     <Card>
                      <CardContent className="flex h-auto min-h-[220px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        {image ? (
                          <div className="relative">
                            <img
                              src={image}
                              alt="Uploaded homework"
                              className="max-h-60 w-auto rounded-md"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute right-2 top-2"
                              onClick={() => {
                                setImage(null);
                                if(fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Camera className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              Click the button to upload an image
                            </p>
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Select Image
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex items-start gap-4 lg:col-span-2">
                <Bot className="h-20 w-20 flex-shrink-0 text-primary animate-pulse" />
                <div className="relative rounded-lg bg-muted p-4 shadow-sm">
                  <p className="text-sm">{aiMessage}</p>
                  <div className="absolute -left-2 top-4 h-4 w-4 -translate-y-1/2 rotate-45 bg-muted"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in-50 slide-in-from-bottom-5 duration-500 delay-200">
              <Button
                size="lg"
                className="bg-gradient-to-br from-primary to-blue-400 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                onClick={handleSolve}
                disabled={isLoading || isShowingAd}
              >
                {isLoading || isShowingAd ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Solve Now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handleExplain}
                disabled={!solution || isExplaining || isShowingAd}
              >
                {isExplaining ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <BrainCircuit className="mr-2 h-5 w-5" />
                )}
                Explain Simply
              </Button>
               <Button
                size="lg"
                variant="secondary"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handleListen}
                disabled={!solution || isSpeaking || isShowingAd}
              >
                {isSpeaking ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Volume2 className="mr-2 h-5 w-5" />
                )}
                Listen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handlePrint}
                disabled={!solution || isShowingAd}
              >
                 {isShowingAd ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <FileDown className="mr-2 h-5 w-5" />
                )}
                Save as PDF
              </Button>
            </div>

            {solution && (
              <div id="printable-solution">
                <SolutionCard
                  solution={solution}
                  simpleExplanation={simpleExplanation}
                  testMode={testMode}
                  isLoadingExplanation={isExplaining}
                  audioDataUri={audioDataUri}
                  isSpeaking={isSpeaking}
                  onListenClick={handleListen}
                  audioRef={audioRef}
                />
              </div>
            )}
            <AdBanner />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
