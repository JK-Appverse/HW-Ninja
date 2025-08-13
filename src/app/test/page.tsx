"use client";

import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { generateTest, type GenerateTestOutput } from '@/ai/flows/generate-test-flow';
import TestResult from '@/components/test-result';
import { Home, History, PencilRuler, Loader2, Timer, Image } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';


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

const TEST_DURATION = 5 * 60; // 5 minutes in seconds

export default function TestPage() {
  const { t } = useLanguage();
  const [gradeLevel, setGradeLevel] = useState("8");
  const [subject, setSubject] = useState("Maths");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState("English");

  const [testData, setTestData] = useState<GenerateTestOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [showResult, setShowResult] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft]);

  const handleStartTest = async () => {
    setIsLoading(true);
    setTestData(null);
    setShowResult(false);
    try {
      const langParam = language === 'English' ? undefined : language;
      const result = await generateTest({
        gradeLevel: parseInt(gradeLevel, 10),
        subject: subject as "Maths" | "Science" | "English" | "Hindi" | "Social Science",
        difficultyLevel: difficulty as "Easy" | "Medium" | "Hard",
        numQuestions,
        language: langParam,
      });
      setTestData(result);
      setAnswers(new Array(result.questions.length).fill(""));
      setCurrentQuestionIndex(0);
      setTimeLeft(TEST_DURATION);
      setTestStarted(true);
    } catch (error) {
      console.error('Error generating test:', error);
      toast({
        title: t.test.toast_error_title,
        description: t.test.toast_error_desc,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishTest = () => {
    setTestStarted(false);
    setShowResult(true);
  };

  const resetTest = () => {
    setTestData(null);
    setTestStarted(false);
    setShowResult(false);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(TEST_DURATION);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  const renderTestSetup = () => (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{t.test.setup_title}</CardTitle>
        <CardDescription>
          {t.test.setup_desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="grade-level">{t.home.class_label}</Label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger id="grade-level">
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
            <Label htmlFor="subject">{t.home.subject_label}</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="difficulty">{t.home.difficulty_label}</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty">
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
                <Label htmlFor="num-questions">{t.test.num_questions_label}</Label>
                <Select value={String(numQuestions)} onValueChange={(val) => setNumQuestions(parseInt(val))}>
                <SelectTrigger id="num-questions">
                    <SelectValue placeholder={t.test.num_questions_placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">{t.test.num_questions_option(5)}</SelectItem>
                    <SelectItem value="10">{t.test.num_questions_option(10)}</SelectItem>
                    <SelectItem value="15">{t.test.num_questions_option(15)}</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>
         <div>
            <Label htmlFor="language">{t.home.language_label}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t.home.language_placeholder} />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="English">{t.languages.english}</SelectItem>
                  <SelectItem value="Hindi">{t.languages.hindi}</SelectItem>
                  <SelectItem value="Assamese">{t.languages.assamese}</SelectItem>
                  <SelectItem value="Bengali">{t.languages.bengali}</SelectItem>
                  <SelectItem value="Gujarati">{t.languages.gujarati}</SelectItem>
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartTest} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.test.start_button}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderTestInterface = () => {
    if (!testData) return null;
    const currentQuestion = testData.questions[currentQuestionIndex];
    return (
      <div className="space-y-6">
        <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <CardTitle>{t.test.question_title(currentQuestionIndex + 1, numQuestions)}</CardTitle>
                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Timer className="h-5 w-5"/>
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </CardHeader>
            <CardContent>
                <Progress value={(timeLeft / TEST_DURATION) * 100} className="mb-6" />
                <p className="font-semibold text-lg mb-4">{currentQuestion.question}</p>
                <RadioGroup value={answers[currentQuestionIndex]} onValueChange={handleAnswerChange}>
                {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="text-base flex-1 cursor-pointer">{option}</Label>
                    </div>
                ))}
                </RadioGroup>
            </CardContent>
        </Card>
        <div className="flex justify-between">
          <Button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
            {t.test.previous_button}
          </Button>
          {currentQuestionIndex < numQuestions - 1 ? (
            <Button onClick={handleNextQuestion}>{t.test.next_button}</Button>
          ) : (
            <Button onClick={handleFinishTest} className='bg-green-600 hover:bg-green-700'>{t.test.finish_button}</Button>
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if(showResult && testData){
        return <TestResult testData={testData} userAnswers={answers} onRetry={resetTest} />
    }
    if (testStarted) {
        return renderTestInterface();
    }
    return renderTestSetup();
  }


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
                <SidebarMenuButton asChild isActive>
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
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold animated-title">{t.test.title}</h1>
            </div>
          </header>
          <main className="p-4 sm:p-8">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
