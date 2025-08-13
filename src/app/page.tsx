
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
import { useLanguage } from "@/contexts/language-context";

const HWNinjaLogo: FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
  const { t } = useLanguage();
  const [gradeLevel, setGradeLevel] = useState("8");
  const [subject, setSubject] = useState("Maths");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("auto");
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
  const [aiMessage, setAiMessage] = useState(t.home.ai_message_initial);
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
                    body: t.home.notification_body,
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
      setAiMessage(t.home.ai_message_welcome_back(storedName));
    } else {
      setAiMessage(t.home.ai_message_initial)
    }
    handleDailyNotification();
  }, [t]);
  
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
        title: t.home.toast_error_no_question_title,
        description: t.home.toast_error_no_question_desc,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSolution(null);
    setSimpleExplanation(null);
    setAudioDataUri(null);
    setAiMessage(t.home.ai_message_solving);

    // विज्ञापन दिखाने का लॉजिक
    try {
        setIsShowingAd(true);
        setAiMessage(t.home.ai_message_loading_ad);
        await showInterstitialAd();
        setIsShowingAd(false);
    } catch (adError) {
        console.error("Ad error:", adError);
        setIsShowingAd(false); // विज्ञापन में गड़बड़ी होने पर भी जारी रखें
    }

    try {
      const langParam = language === 'auto' ? undefined : language;
      const input = {
        question,
        gradeLevel: parseInt(gradeLevel, 10),
        subject: subject as "Maths" | "Science" | "English" | "Hindi" | "Social Science",
        difficultyLevel: difficulty as "Easy" | "Medium" | "Hard",
        ...(testMode && { studentAnswer }),
        ...(image && { photoDataUri: image }),
        ...(langParam && { language: langParam }),
        ...(userName && { userName }),
      };
      const result = await smartSolve(input);
      setSolution(result);
      setAiMessage(t.home.ai_message_solution_ready);
      saveHistory({
        ...input,
        language: langParam,
        solution: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error solving question:", error);
      toast({
        title: t.home.toast_error_solve_title,
        description: t.home.toast_error_solve_desc,
        variant: "destructive",
      });
      setAiMessage(t.home.ai_message_error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!solution) return;

    setIsExplaining(true);
    setSimpleExplanation(null);
    setAiMessage(t.home.ai_message_explaining);

    try {
      const langParam = language === 'auto' ? undefined : language;
      const result = await explainSimply({
        question,
        solution: solution.solution,
        gradeLevel: parseInt(gradeLevel, 10),
        userName,
        language: langParam,
      });
      setSimpleExplanation(result.simpleExplanation);
      setAiMessage(t.home.ai_message_explanation_ready);
    } catch (error) {
      console.error("Error explaining solution:", error);
      toast({
        title: t.home.toast_error_explain_title,
        description: t.home.toast_error_explain_desc,
        variant: "destructive",
      });
      setAiMessage(t.home.ai_message_explain_error);
    } finally {
      setIsExplaining(false);
    }
  };

  const handlePrint = async () => {
    setIsShowingAd(true);
    setAiMessage(t.home.ai_message_rewarded_ad);
    try {
        const adWatched = await showRewardedAd();
        if (adWatched) {
            toast({
                title: t.home.toast_rewarded_ad_success_title,
                description: t.home.toast_rewarded_ad_success_desc,
            });
            window.print();
        } else {
             toast({
                title: t.home.toast_rewarded_ad_failed_title,
                description: t.home.toast_rewarded_ad_failed_desc,
                variant: "destructive"
            });
        }
    } catch (adError) {
        console.error("Rewarded ad error:", adError);
        toast({
            title: t.home.toast_error_ad_title,
            description: t.home.toast_error_ad_desc,
            variant: "destructive"
        });
    } finally {
        setIsShowingAd(false);
        setAiMessage(t.home.ai_message_next_prompt);
    }
  };

  const handleListen = async () => {
    if (!solution) return;

    setIsSpeaking(true);
    setAudioDataUri(null);
    setAiMessage(t.home.ai_message_audio_loading);

    try {
        const textToSpeak = `
            Solution: ${solution.solution}.
            Explanation: ${solution.explanation}.
            ${simpleExplanation ? `Simplified Explanation: ${simpleExplanation}` : ''}
        `;
        const result = await textToSpeech({ text: textToSpeak });
        setAudioDataUri(result.audioDataUri);
        setAiMessage(t.home.ai_message_audio_playing);
    } catch (error) {
        console.error("Error generating speech:", error);
        toast({
            title: t.home.toast_error_audio_title,
            description: t.home.toast_error_audio_desc,
            variant: "destructive",
        });
        setAiMessage(t.home.ai_message_audio_error);
    } finally {
        setIsSpeaking(false);
    }
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
                <SidebarMenuButton asChild isActive>
                  <Link href="/">
                    <Home />
                    <span>{t.sidebar.home}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
            <SettingsPanel onNameChange={setUserName} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
            <div className="flex flex-col h-screen">
                <header className="sticky top-0 z-10 flex items-center justify-between border-b p-4 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold animated-title">{t.home.title}</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background to-slate-900/50">
                    <div className="flex flex-col gap-8 p-4 sm:p-8">

                        <Card className="overflow-hidden border-2 border-primary/20 shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div>
                                <Label htmlFor="grade-level" className="font-medium">
                                {t.home.class_label}
                                </Label>
                                <Select
                                value={gradeLevel}
                                onValueChange={setGradeLevel}
                                name="grade-level"
                                >
                                <SelectTrigger id="grade-level" className="mt-2">
                                    <SelectValue placeholder={t.home.class_placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 7 }, (_, i) => i + 6).map((g) => (
                                    <SelectItem key={g} value={String(g)}>
                                        {t.home.class_option(g)}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="subject" className="font-medium">
                                {t.home.subject_label}
                                </Label>
                                <Select
                                value={subject}
                                onValueChange={setSubject}
                                name="subject"
                                >
                                <SelectTrigger id="subject" className="mt-2">
                                    <SelectValue placeholder={t.home.subject_placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Maths">{t.subjects.maths}</SelectItem>
                                    <SelectItem value="Science">{t.subjects.science}</SelectItem>
                                    <SelectItem value="English">{t.subjects.english}</SelectItem>
                                    <SelectItem value="Hindi">{t.subjects.hindi}</SelectItem>
                                    <SelectItem value="Social Science">{t.subjects.social_science}</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="difficulty" className="font-medium">
                                {t.home.difficulty_label}
                                </Label>
                                <Select
                                value={difficulty}
                                onValueChange={setDifficulty}
                                name="difficulty"
                                >
                                <SelectTrigger id="difficulty" className="mt-2">
                                    <SelectValue placeholder={t.home.difficulty_placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Easy">{t.difficulty.easy}</SelectItem>
                                    <SelectItem value="Medium">{t.difficulty.medium}</SelectItem>
                                    <SelectItem value="Hard">{t.difficulty.hard}</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="language" className="font-medium">
                                {t.home.language_label}
                                </Label>
                                <Select
                                value={language}
                                onValueChange={setLanguage}
                                name="language"
                                >
                                <SelectTrigger id="language" className="mt-2">
                                    <SelectValue placeholder={t.home.language_placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="auto">{t.languages.auto}</SelectItem>
                                    <SelectItem value="Assamese">{t.languages.assamese}</SelectItem>
                                    <SelectItem value="Bengali">{t.languages.bengali}</SelectItem>
                                    <SelectItem value="English">{t.languages.english}</SelectItem>
                                    <SelectItem value="Gujarati">{t.languages.gujarati}</SelectItem>
                                    <SelectItem value="Hindi">{t.languages.hindi}</SelectItem>
                                    <SelectItem value="Kannada">{t.languages.kannada}</SelectItem>
                                    <SelectItem value="Malayalam">{t.languages.malayalam}</SelectItem>
                                    <SelectItem value="Marathi">{t.languages.marathi}</SelectItem>
                                    <SelectItem value="Odia">{t.languages.odia}</SelectItem>
                                    <SelectItem value="Punjabi">{t.languages.punjabi}</SelectItem>
                                    <SelectItem value="Tamil">{t.languages.tamil}</SelectItem>
                                    <SelectItem value="Telugu">{t.languages.telugu}</SelectItem>
                                    <SelectItem value="Urdu">{t.languages.urdu}</SelectItem>
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
                                <TabsTrigger value="type">{t.home.type_question_tab}</TabsTrigger>
                                <TabsTrigger value="upload">
                                <Upload className="mr-2 h-4 w-4" />
                                {t.home.upload_image_tab}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="type">
                                <Card>
                                <CardContent className="p-4">
                                    <Textarea
                                    placeholder={t.home.question_placeholder}
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
                                            {t.home.test_mode_label}
                                        </Label>
                                    </div>
                                    {testMode && (
                                    <div className="mt-4">
                                        <Label
                                        htmlFor="student-answer"
                                        className="font-medium"
                                        >
                                        {t.home.your_answer_label}
                                        </Label>
                                        <Input
                                        id="student-answer"
                                        placeholder={t.home.your_answer_placeholder}
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
                                        alt={t.home.uploaded_image_alt}
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
                                        {t.home.remove_button}
                                        </Button>
                                    </div>
                                    ) : (
                                    <>
                                        <Camera className="h-8 w-8 text-muted-foreground" />
                                        <p className="text-muted-foreground">
                                        {t.home.upload_prompt}
                                        </p>
                                        <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        >
                                        {t.home.select_image_button}
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
                            {t.home.solve_now_button}
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
                            {t.home.explain_simply_button}
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
                            {t.home.listen_button}
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
                            {t.home.save_pdf_button}
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
                    </div>
                </main>
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
