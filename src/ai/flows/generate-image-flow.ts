'use server';

/**
 * @fileOverview Generates an image from a text prompt.
 *
 * - generateImage - A function that creates an image based on a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `You are an expert at creating educational diagrams for students. Your task is to generate a clear, simple, and scientifically accurate diagram for the following topic: "${input.prompt}".

Instructions for the diagram:
1. **Clarity and Simplicity:** The diagram must be easy for a student to understand. Avoid clutter.
2. **Accurate Labeling:** All key parts must be clearly and accurately labeled. Double-check the spellings and placement of labels.
3. **Pointers:** Use clean lines or arrows to point from the label to the correct part of the diagram.
4. **Readability:** Use bold, legible text for all labels.
5. **Educational Focus:** The diagram should be visually appealing and strictly educational. It must be accurate.

Generate the diagram for the topic: "${input.prompt}"`,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media) {
      throw new Error('Image generation failed.');
    }

    return { imageDataUri: media.url };
  }
);
