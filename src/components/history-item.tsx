"use client";

import React from "react";
import { HistoryItem } from "@/lib/history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCopy, Brain, Calendar, GraduationCap, Languages, Puzzle, Tag } from "lucide-react";

const HistoryItemCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="truncate">{item.question || "Image Question"}</CardTitle>
        <CardDescription>
          {new Date(item.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2"><BookCopy className="w-4 h-4" /> Solution</h4>
            <p className="text-sm text-foreground/80 bg-muted p-3 rounded-md whitespace-pre-wrap">{item.solution.solution}</p>
        </div>
        {item.solution.explanation && (
            <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2"><Brain className="w-4 h-4" /> Explanation</h4>
                <p className="text-sm text-foreground/80 bg-muted p-3 rounded-md whitespace-pre-wrap">{item.solution.explanation}</p>
            </div>
        )}
      </CardContent>
       <CardFooter className="flex flex-wrap gap-2 pt-4">
        <Badge variant="outline"><GraduationCap className="mr-1 h-3 w-3" /> Class {item.gradeLevel}</Badge>
        <Badge variant="outline"><Puzzle className="mr-1 h-3 w-3" /> {item.subject}</Badge>
        <Badge variant="outline"><Tag className="mr-1 h-3 w-3" /> {item.difficultyLevel}</Badge>
        {item.language && <Badge variant="outline"><Languages className="mr-1 h-3 w-3" /> {item.language}</Badge>}
      </CardFooter>
    </Card>
  );
};

export default HistoryItemCard;
