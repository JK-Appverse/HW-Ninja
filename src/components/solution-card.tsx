"use client";

import React from "react";
import { type SmartSolveOutput } from "@/ai/flows/smart-solve";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SolutionCardProps {
  solution: SmartSolveOutput;
  simpleExplanation: string | null;
  testMode: boolean;
  isLoadingExplanation: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  simpleExplanation,
  testMode,
  isLoadingExplanation,
}) => {
  const CorrectnessBadge = () => {
    if (typeof solution.isCorrect !== "boolean") return null;

    return solution.isCorrect ? (
      <Badge variant="secondary" className="border-green-500 bg-green-100 text-green-800">
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
            <CardTitle className="text-2xl font-bold font-headline text-accent">Solution</CardTitle>
            {testMode && <CorrectnessBadge />}
        </div>
        <CardDescription>Here's the detailed answer and explanation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Answer:</h3>
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
                    <h3 className="mb-2 flex items-center text-lg font-semibold">
                        <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                        Simplified Explanation:
                    </h3>
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

      </CardContent>
    </Card>
  );
};

export default SolutionCard;
