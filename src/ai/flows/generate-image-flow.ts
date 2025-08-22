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
        prompt: `You are a professional textbook illustrator and subject matter expert. Your task is to generate a scientifically accurate, clear, and simple educational diagram for the following topic: "${input.prompt}".

Follow these critical instructions precisely:
1.  **Accuracy First:** All parts of the diagram and all labels must be 100% factually and scientifically correct.
2.  **Clear Labeling:** Every important part must be labeled. Use clean, bold, legible text. Use straight pointer lines that clearly connect the label to the correct part.
3.  **Simplicity is Key:** The diagram must be simple, clean, and easy for a student to understand. Avoid any artistic flair, decorative elements, or background clutter. Focus only on the educational value.
4.  **Verification:** Before generating the image, double-check that all labels and structures are correct for the requested topic.

Generate the diagram now for the topic: "${input.prompt}"`,
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
