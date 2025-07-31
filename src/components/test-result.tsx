"use client";

import React from 'react';
import { type GenerateTestOutput } from '@/ai/flows/generate-test-flow';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { Separator } from './ui/separator';

interface TestResultProps {
  testData: GenerateTestOutput;
  userAnswers: string[];
  onRetry: () => void;
}

const TestResult: React.FC<TestResultProps> = ({ testData, userAnswers, onRetry }) => {
  const score = testData.questions.reduce((acc, question, index) => {
    return acc + (question.correctAnswer === userAnswers[index] ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / testData.questions.length) * 100);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Test Result</CardTitle>
        <div className="text-5xl font-bold text-primary">{percentage}%</div>
        <p className="text-xl text-muted-foreground">You got {score} out of {testData.questions.length} correct.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        {testData.questions.map((question, index) => {
            const isCorrect = question.correctAnswer === userAnswers[index];
            return (
                 <div key={index} className="p-4 rounded-lg border bg-card">
                    <p className="font-semibold mb-2">{index + 1}. {question.question}</p>
                    <div className="space-y-2">
                        <div className={`flex items-center gap-2 p-2 rounded-md ${isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                             {isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" /> : <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                            <span>Your answer: {userAnswers[index] || "Not answered"}</span>
                        </div>
                        {!isCorrect && (
                             <div className="flex items-center gap-2 p-2 rounded-md bg-green-100 dark:bg-green-900">
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span>Correct answer: {question.correctAnswer}</span>
                            </div>
                        )}
                    </div>
                </div>
            )
        })}
      </CardContent>
      <CardFooter>
        <Button onClick={onRetry} className="w-full">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Another Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestResult;
