'use server';

/**
 * @fileOverview Generates a test with multiple-choice questions.
 *
 * - generateTest - A function that creates a test based on user specifications.
 * - GenerateTestInput - The input type for the generateTest function.
 * - GenerateTestOutput - The return type for the generateTest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MCQSchema = z.object({
    question: z.string().describe('The multiple-choice question.'),
    options: z.array(z.string()).describe('A list of 4 possible answers.'),
    correctAnswer: z.string().describe('The correct answer from the options.'),
});

const GenerateTestInputSchema = z.object({
  subject: z.enum(['Maths', 'Science', 'English', 'Hindi', 'Social Science']).describe('The subject of the test.'),
  gradeLevel: z.number().int().min(6).max(12).describe('The grade level of the student.'),
  difficultyLevel: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the test.'),
  numQuestions: z.number().int().min(5).max(20).describe('The number of questions for the test.'),
});
export type GenerateTestInput = z.infer<typeof GenerateTestInputSchema>;

const GenerateTestOutputSchema = z.object({
  questions: z.array(MCQSchema).describe('A list of multiple-choice questions for the test.'),
});
export type GenerateTestOutput = z.infer<typeof GenerateTestOutputSchema>;


export async function generateTest(input: GenerateTestInput): Promise<GenerateTestOutput> {
    return generateTestFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateTestPrompt',
    input: { schema: GenerateTestInputSchema },
    output: { schema: GenerateTestOutputSchema },
    prompt: `You are an expert test creator for students. Create a test with {{{numQuestions}}} multiple-choice questions for a student in grade {{{gradeLevel}}}. The subject is {{{subject}}} and the difficulty level should be {{{difficultyLevel}}}. Each question must have 4 options.

Generate the test questions.`,
});


const generateTestFlow = ai.defineFlow(
    {
        name: 'generateTestFlow',
        inputSchema: GenerateTestInputSchema,
        outputSchema: GenerateTestOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
