
"use client";

import React, { useState } from "react";
import { type SmartSolveOutput } from "@/ai/flows/smart-solve";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb, ThumbsUp, ThumbsDown, Volume2, Loader2, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface SolutionCardProps {
  solution: SmartSolveOutput;
  simpleExplanation: string | null;
  testMode: boolean;
  isLoadingExplanation: boolean;
  isSpeaking: boolean;
  audioDataUri: string | null;
  onListenClick: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  simpleExplanation,
  testMode,
  isLoadingExplanation,
  isSpeaking,
  audioDataUri,
  onListenClick,
  audioRef,
}) => {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "The text has been copied to your clipboard.",
    });
  };

  const CorrectnessBadge = () => {
    if (typeof solution.isCorrect !== "boolean") return null;

    return solution.isCorrect ? (
      <Badge variant="secondary" className="border-green-500 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Correct
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="mr-2 h-4 w-4" />
        Incorrect
      </Badge>
    );
  };

  return (
    <Card className="w-full animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold font-headline text-primary">Solution</CardTitle>
            {testMode && <CorrectnessBadge />}
        </div>
        <CardDescription>Here's the detailed answer and explanation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Answer:</h3>
              <Button variant="ghost" size="icon" onClick={() => handleCopy(solution.solution)}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy Answer</span>
              </Button>
            </div>
            <p className="text-foreground/90 whitespace-pre-wrap rounded-md bg-muted p-4">
                {solution.solution}
            </p>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-lg font-semibold">Explanation:</h3>
          <p className="text-foreground/90 whitespace-pre-wrap rounded-md bg-muted p-4">
            {solution.explanation}
          </p>
        </div>

        {(simpleExplanation || isLoadingExplanation) && (
            <>
                <Separator />
                <div>
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="flex items-center text-lg font-semibold">
                            <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
                            Simplified Explanation:
                        </h3>
                         {!isLoadingExplanation && simpleExplanation && (
                            <Button variant="ghost" size="icon" onClick={() => handleCopy(simpleExplanation)}>
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy Simplified Explanation</span>
                            </Button>
                        )}
                    </div>
                    {isLoadingExplanation ? (
                        <div className="space-y-2 rounded-md bg-muted p-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ) : (
                         <p className="text-foreground/90 whitespace-pre-wrap rounded-md bg-muted p-4">
                            {simpleExplanation}
                        </p>
                    )}
                </div>
            </>
        )}

        {audioDataUri && (
          <>
            <Separator />
            <div className="flex flex-col items-center gap-4 pt-4">
                <audio ref={audioRef} controls className="w-full">
                    Your browser does not support the audio element.
                </audio>
            </div>
          </>
        )}

      </CardContent>
      <CardFooter className="flex-wrap justify-end gap-2">
            <p className="text-sm text-muted-foreground mr-auto">Was this helpful?</p>
            <Button 
                variant={feedback === 'like' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setFeedback('like')}
                className={feedback === 'like' ? 'text-green-500' : ''}
                >
                <ThumbsUp className="h-5 w-5"/>
            </Button>
             <Button 
                variant={feedback === 'dislike' ? 'secondary' : 'ghost'} 
                size="icon" 
                onClick={() => setFeedback('dislike')}
                className={feedback === 'dislike' ? 'text-red-500' : ''}
                >
                <ThumbsDown className="h-5 w-5"/>
            </Button>
            <Button 
                variant="outline"
                onClick={onListenClick}
                disabled={isSpeaking}
            >
                {isSpeaking ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Volume2 className="mr-2 h-4 w-4"/>}
                Listen
            </Button>
      </CardFooter>
    </Card>
  );
};

export default SolutionCard;
