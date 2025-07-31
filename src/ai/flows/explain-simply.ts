'use server';

/**
 * @fileOverview Explains complex solutions in simple terms tailored to the user's grade level.
 *
 * - explainSimply - A function that explains a solution in simple terms.
 * - ExplainSimplyInput - The input type for the explainSimply function.
 * - ExplainSimplyOutput - The return type for the explainSimply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainSimplyInputSchema = z.object({
  question: z.string().describe('The question to be explained.'),
  solution: z.string().describe('The solution to the question.'),
  gradeLevel: z.number().describe('The grade level of the student.'),
  userName: z.string().optional().describe("The user's name."),
  language: z.string().optional().describe('The language of the response.'),
});
export type ExplainSimplyInput = z.infer<typeof ExplainSimplyInputSchema>;

const ExplainSimplyOutputSchema = z.object({
  simpleExplanation: z.string().describe('The explanation in simple terms.'),
});
export type ExplainSimplyOutput = z.infer<typeof ExplainSimplyOutputSchema>;

export async function explainSimply(input: ExplainSimplyInput): Promise<ExplainSimplyOutput> {
  return explainSimplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainSimplyPrompt',
  input: {schema: ExplainSimplyInputSchema},
  output: {schema: ExplainSimplyOutputSchema},
  prompt: `You are an expert tutor, skilled at explaining complex topics in simple terms.

  {{#if userName}}
  Address the user by their name: {{{userName}}}.
  {{/if}}

  {{#if language}}
  Respond in the following language: {{{language}}}.
  {{else}}
  Detect the language of the question and respond in that same language.
  {{/if}}

  The student is in grade level: {{{gradeLevel}}}.

  Explain the following solution to the question in simple terms that a student in that grade level can understand.

  Question: {{{question}}}
  Solution: {{{solution}}}

  Explanation:`,
});

const explainSimplyFlow = ai.defineFlow(
  {
    name: 'explainSimplyFlow',
    inputSchema: ExplainSimplyInputSchema,
    outputSchema: ExplainSimplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
