'use server';

/**
 * @fileOverview Implements the smart solve functionality to solve homework questions using AI.
 *
 * - smartSolve - A function that solves a given homework question.
 * - SmartSolveInput - The input type for the smartSolve function.
 * - SmartSolveOutput - The return type for the smartSolve function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSolveInputSchema = z.object({
  question: z.string().describe('The homework question to be solved.'),
  gradeLevel: z
    .number()
    .int()
    .min(6)
    .max(12)
    .describe('The grade level of the student.'),
  subject: z.enum(['Maths', 'Science', 'English']).describe('The subject of the question.'),
  difficultyLevel: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the question.'),
  studentAnswer: z.string().optional().describe('The student answer, if test mode is on.'),
});
export type SmartSolveInput = z.infer<typeof SmartSolveInputSchema>;

const SmartSolveOutputSchema = z.object({
  solution: z.string().describe('The solution to the homework question.'),
  explanation: z.string().describe('An explanation of the solution in simple terms.'),
  isCorrect: z.boolean().optional().describe('Whether the student answer is correct, if provided.'),
});
export type SmartSolveOutput = z.infer<typeof SmartSolveOutputSchema>;

export async function smartSolve(input: SmartSolveInput): Promise<SmartSolveOutput> {
  return smartSolveFlow(input);
}

const smartSolvePrompt = ai.definePrompt({
  name: 'smartSolvePrompt',
  input: {schema: SmartSolveInputSchema},
  output: {schema: SmartSolveOutputSchema},
  prompt: `You are an expert tutor for {{{subject}}} for a student in grade {{{gradeLevel}}}. The difficulty of the question is {{{difficultyLevel}}}. Please solve the following homework question and provide a clear and concise explanation. If a student answer is provided, determine if it is correct.

Question: {{{question}}}

{{#if studentAnswer}}
Student Answer: {{{studentAnswer}}}
{{/if}}
`,
});

const smartSolveFlow = ai.defineFlow(
  {
    name: 'smartSolveFlow',
    inputSchema: SmartSolveInputSchema,
    outputSchema: SmartSolveOutputSchema,
  },
  async input => {
    const {output} = await smartSolvePrompt(input);
    return output!;
  }
);
