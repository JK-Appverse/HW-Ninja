"use client";

import React, { useState, type FC, useRef } from "react";
import Link from 'next/link';
import {
  BookOpenCheck,
  FileDown,
  Upload,
  Wand2,
  BrainCircuit,
  Loader2,
  Settings,
  History,
  Home,
  Bot,
  PencilRuler,
  Camera,
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

const SmartAceLogo: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="m9 9.5 2 2 4-4" />
  </svg>
);

export default function SmartAcePage() {
  const [gradeLevel, setGradeLevel] = useState("8");
  const [subject, setSubject] = useState("Maths");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [solution, setSolution] = useState<SmartSolveOutput | null>(null);
  const [simpleExplanation, setSimpleExplanation] = useState<string | null>(
    null
  );
  const [aiMessage, setAiMessage] = useState(
    "Hi there! Let's solve some homework. Fill in the details and your question, and I'll get right to it!"
  );
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

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
    setAiMessage("Let me think... I'm working on the solution now!");

    try {
      const input = {
        question,
        gradeLevel: parseInt(gradeLevel, 10),
        subject: subject as "Maths" | "Science" | "English" | "Hindi" | "Social Science",
        difficultyLevel: difficulty as "Easy" | "Medium" | "Hard",
        ...(testMode && { studentAnswer }),
        ...(image && { photoDataUri: image }),
        ...(language && { language }),
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 p-2">
              <SmartAceLogo className="h-10 w-10 text-primary" />
              <h1 className="font-headline text-2xl font-bold text-primary-foreground">
                SmartAce
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
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SettingsPanel />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Homework Solver</h1>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="test-mode" className="font-medium">
                Test Mode
              </Label>
              <Switch
                id="test-mode"
                checked={testMode}
                onCheckedChange={setTestMode}
              />
            </div>
          </header>

          <main className="flex flex-col gap-8 p-4 sm:p-8">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
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
                      Language (Optional)
                    </Label>
                    <Input id="language" placeholder="e.g., Hindi" className="mt-2" value={language} onChange={(e) => setLanguage(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <Tabs defaultValue="type">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="type">Type Question</TabsTrigger>
                    <TabsTrigger value="upload">
                      <Camera className="mr-2 h-4 w-4" />
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
                      <CardContent className="flex h-auto min-h-[150px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center">
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
                            <Upload className="h-8 w-8 text-muted-foreground" />
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
                <Bot className="h-20 w-20 flex-shrink-0 text-accent" />
                <div className="relative rounded-lg bg-card p-4 shadow-sm">
                  <p className="text-sm">{aiMessage}</p>
                  <div className="absolute -left-2 top-4 h-4 w-4 -translate-y-1/2 rotate-45 bg-card"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-br from-primary to-blue-400 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                onClick={handleSolve}
                disabled={isLoading}
              >
                {isLoading ? (
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
                disabled={!solution || isExplaining}
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
                variant="outline"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handlePrint}
                disabled={!solution}
              >
                <FileDown className="mr-2 h-5 w-5" />
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
                />
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
