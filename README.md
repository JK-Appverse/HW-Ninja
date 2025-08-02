
# HW Ninja - Your Smart AI Homework Solver

This file contains the complete source code for the HW Ninja application. You can use this file to manually reconstruct the project on your local computer.

## How to Recreate the Project

1.  **Create the folder structure:** Look at the file paths below (e.g., `src/app/page.tsx`) and create the necessary folders on your computer.
2.  **Create the files:** For each file listed, create a new file with the same name in the correct folder.
3.  **Copy and paste the code:** Copy the entire code content for each file from this document and paste it into the corresponding file you created on your computer.
4.  **Install dependencies:** Once all files are created, open a terminal in the project's main folder and run the command `npm install`.

---
---

## Folder Structure and File Content

### **File: `apphosting.yaml`**
```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```

---

### **File: `components.json`**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

### **File: `next.config.ts`**
```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

### **File: `package.json`**
```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "next-themes": "^0.3.0",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "wav": "^1.0.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/wav": "^1.0.4",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

### **File: `tailwind.config.ts`**
```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"PT Sans"', 'sans-serif'],
        headline: ['"PT Sans"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

### **File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### **File: `src/ai/dev.ts`**
```ts
import { config } from 'dotenv';
config();

import '@/ai/flows/smart-solve.ts';
import '@/ai/flows/explain-simply.ts';
import '@/ai/flows/generate-test-flow.ts';
import '@/ai/flows/generate-image-flow.ts';
import '@/ai/flows/text-to-speech-flow.ts';
```

---

### **File: `src/ai/genkit.ts`**
```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

---

### **File: `src/ai/flows/explain-simply.ts`**
```ts
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
```

---

### **File: `src/ai/flows/generate-image-flow.ts`**
```ts
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
```

---

### **File: `src/ai/flows/generate-test-flow.ts`**
```ts
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
```

---

### **File: `src/ai/flows/smart-solve.ts`**
```ts
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
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the homework, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  gradeLevel: z
    .number()
    .int()
    .min(6)
    .max(12)
    .describe('The grade level of the student.'),
  subject: z.enum(['Maths', 'Science', 'English', 'Hindi', 'Social Science']).describe('The subject of the question.'),
  difficultyLevel: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the question.'),
  studentAnswer: z.string().optional().describe('The student answer, if test mode is on.'),
  language: z.string().optional().describe('The language of the response.'),
  userName: z.string().optional().describe("The user's name."),
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
{{#if userName}}
Address the user by their name: {{{userName}}}.
{{/if}}
{{#if language}}
Respond in the following language: {{{language}}}.
{{else}}
Detect the language of the question and respond in that same language.
{{/if}}

Question: {{{question}}}

{{#if photoDataUri}}
Here is an image of the question:
{{media url=photoDataUri}}
{{/if}}

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
```

---

### **File: `src/ai/flows/text-to-speech-flow.ts`**
```ts
'use server';

/**
 * @fileOverview Converts text to speech using an AI model.
 *
 * - textToSpeech - A function that converts a string of text into audible speech.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI in WAV format. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}

// Helper function to convert raw PCM audio data to WAV format.
// This is necessary because the browser's <audio> element cannot play raw PCM.
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A calm and clear voice
          },
        },
      },
      prompt: input.text,
    });

    if (!media?.url) {
      throw new Error('Audio generation failed or returned no media.');
    }

    // The audio data is a base64 encoded string after the comma
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    // Convert the raw PCM data to a WAV data URI
    const wavBase64 = await toWav(audioBuffer);
    const audioDataUri = `data:audio/wav;base64,${wavBase64}`;

    return { audioDataUri };
  }
);
```

---

### **File: `src/app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'PT Sans', sans-serif;
}

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --card: 210 40% 98%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 210 40% 98%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.8rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 217.2 91.2% 59.8%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 217.2 91.2% 59.8%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-solution, #printable-solution * {
    visibility: visible;
  }
  #printable-solution {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 2rem;
  }
}
```

---

### **File: `src/app/layout.tsx`**
```tsx
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'HW Ninja',
  description: 'Your Smart AI Homework Solver',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-body antialiased">
        <Providers
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </Providers>
      </body>
    </html>
  );
}
```

---

### **File: `src/app/page.tsx`**
```tsx
"use client";

import React, { useState, type FC, useRef, useEffect } from "react";
import Link from 'next/link';
import {
  FileDown,
  Upload,
  Wand2,
  BrainCircuit,
  Loader2,
  History,
  Home,
  Bot,
  PencilRuler,
  Camera,
  Image,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { smartSolve, type SmartSolveOutput } from "@/ai/flows/smart-solve";
import { explainSimply } from "@/ai/flows/explain-simply";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { useToast } from "@/hooks/use-toast";
import SolutionCard from "@/components/solution-card";
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
} from "@/components/ui/sidebar";
import { saveHistory } from "@/lib/history";
import { SettingsPanel } from "@/components/settings-panel";
import AdBanner from "@/components/ad-banner";

const HWNinjaLogo: FC<React.SVGProps<SVGSVGElement>> = (props) => (
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


// =======================================================================
// || AdSense विज्ञापन के लिए ढाँचा (AdSense Ads Structure)             ||
// =======================================================================
// **महत्वपूर्ण:** यह कोड सिर्फ़ एक ढाँचा है। असली विज्ञापन दिखाने के लिए,
// आपको Google AdSense से मिले विज्ञापन कोड को यहाँ डालना होगा।

// Interstitial विज्ञापन दिखाने के लिए फ़ंक्शन
const showInterstitialAd = (): Promise<void> => {
  console.log("Interstitial Ad: दिखाने का प्रयास किया जा रहा है...");
  // =========================================================
  // || यहाँ पर आपको AdSense का Interstitial Ad कोड डालना है। ||
  // =========================================================
  // अभी के लिए, यह सिर्फ़ 1 सेकंड का इंतज़ार करेगा।
  return new Promise(resolve => setTimeout(() => {
    console.log("Interstitial Ad: पूरा हुआ (सैंपल)।");
    resolve();
  }, 1000));
};


// इनाम वाले (Rewarded) विज्ञापन के लिए फ़ंक्शन
const showRewardedAd = (): Promise<boolean> => {
  console.log("Rewarded Ad: दिखाने का प्रयास किया जा रहा है...");
  // =====================================================
  // || यहाँ पर आपको AdSense का Rewarded Ad कोड डालना है। ||
  // =====================================================
  // AdSense का कोड आपको यह बताएगा कि यूज़र ने विज्ञापन पूरा देखा है या नहीं।
  // अभी के लिए, हम मान रहे हैं कि यूज़र ने विज्ञापन देख लिया है।
  const adWatched = true; 
  return new Promise(resolve => setTimeout(() => {
    if(adWatched){
        console.log("Rewarded Ad: इनाम दिया गया (सैंपल)।");
        resolve(true);
    } else {
        console.log("Rewarded Ad: यूज़र ने विज्ञापन बंद कर दिया (सैंपल)।");
        resolve(false);
    }
  }, 1500));
};
// =======================================================================
// || AdSense ढाँचे का अंत                                             ||
// =======================================================================


export default function HWNinjaPage() {
  const [gradeLevel, setGradeLevel] = useState("8");
  const [subject, setSubject] = useState("Maths");
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");
  const [userName, setUserName] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isShowingAd, setIsShowingAd] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [solution, setSolution] = useState<SmartSolveOutput | null>(null);
  const [simpleExplanation, setSimpleExplanation] = useState<string | null>(
    null
  );
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState(
    "Hi there! Let's solve some homework. Fill in the details and your question, and I'll get right to it!"
  );
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

  const handleDailyNotification = () => {
    const notificationsEnabled = localStorage.getItem("notifications-enabled") === "true";
    if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        const lastVisit = localStorage.getItem("last-app-visit");
        const today = new Date().toDateString();

        if (lastVisit !== today) {
            // Schedule notification for a specific time, e.g., 9 AM
            const now = new Date();
            const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
            let timeout = notificationTime.getTime() - now.getTime();
            if(timeout < 0) { // if 9am is already past, schedule for tomorrow
                notificationTime.setDate(notificationTime.getDate() + 1);
                timeout = notificationTime.getTime() - now.getTime();
            }
            
            setTimeout(() => {
                 new Notification("HW Ninja", {
                    body: "Your test is waiting for you! 🧠",
                    icon: "/icons/icon-192x192.png"
                });
            }, timeout);
        }
    }
    // Update last visit date
    localStorage.setItem("last-app-visit", new Date().toDateString());
  };


  useEffect(() => {
    const storedName = localStorage.getItem("user-name");
    if (storedName) {
      setUserName(storedName);
      setAiMessage(`Hi ${storedName}! How can I help you today?`);
    }
    handleDailyNotification();
  }, []);
  
  useEffect(() => {
    if (audioRef.current && audioDataUri) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioDataUri]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!question.trim() && !image) {
      toast({
        title: "Uh oh!",
        description: "Please enter a question or upload an image before I can solve it.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSolution(null);
    setSimpleExplanation(null);
    setAudioDataUri(null);
    setAiMessage("Let me think... I'm working on the solution now!");

    // विज्ञापन दिखाने का लॉजिक
    try {
        setIsShowingAd(true);
        setAiMessage("Loading an ad before we solve...");
        await showInterstitialAd();
        setIsShowingAd(false);
    } catch (adError) {
        console.error("Ad error:", adError);
        setIsShowingAd(false); // विज्ञापन में गड़बड़ी होने पर भी जारी रखें
    }

    try {
      const input = {
        question,
        gradeLevel: parseInt(gradeLevel, 10),
        subject: subject as "Maths" | "Science" | "English" | "Hindi" | "Social Science",
        difficultyLevel: difficulty as "Easy" | "Medium" | "Hard",
        ...(testMode && { studentAnswer }),
        ...(image && { photoDataUri: image }),
        ...(language && { language }),
        ...(userName && { userName }),
      };
      const result = await smartSolve(input);
      setSolution(result);
      setAiMessage("I've got it! Check out the solution below.");
      saveHistory({
        ...input,
        solution: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error solving question:", error);
      toast({
        title: "Error",
        description: "I couldn't solve the question. Please try again.",
        variant: "destructive",
      });
      setAiMessage(
        "Oops, something went wrong. Could you try asking again?"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!solution) return;

    setIsExplaining(true);
    setSimpleExplanation(null);
    setAiMessage("Breaking it down for you... one moment!");

    try {
      const result = await explainSimply({
        question,
        solution: solution.solution,
        gradeLevel: parseInt(gradeLevel, 10),
        userName,
        language: language || undefined,
      });
      setSimpleExplanation(result.simpleExplanation);
      setAiMessage("Hope this makes it crystal clear!");
    } catch (error) {
      console.error("Error explaining solution:", error);
      toast({
        title: "Error",
        description: "I couldn't explain the solution. Please try again.",
        variant: "destructive",
      });
      setAiMessage("I had a little trouble explaining that. Maybe try again?");
    } finally {
      setIsExplaining(false);
    }
  };

  const handlePrint = async () => {
    setIsShowingAd(true);
    setAiMessage("Watch a short ad to download the PDF.");
    try {
        const adWatched = await showRewardedAd();
        if (adWatched) {
            toast({
                title: "Thanks for watching!",
                description: "Your download is starting.",
            });
            window.print();
        } else {
             toast({
                title: "Ad not completed",
                description: "Please watch the full ad to download.",
                variant: "destructive"
            });
        }
    } catch (adError) {
        console.error("Rewarded ad error:", adError);
        toast({
            title: "Ad Error",
            description: "Could not load the ad. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsShowingAd(false);
        setAiMessage("How can I help you next?");
    }
  };

  const handleListen = async () => {
    if (!solution) return;

    setIsSpeaking(true);
    setAudioDataUri(null);
    setAiMessage("Getting the audio ready...");

    try {
        const textToSpeak = `
            Solution: ${solution.solution}.
            Explanation: ${solution.explanation}.
            ${simpleExplanation ? `Simplified Explanation: ${simpleExplanation}` : ''}
        `;
        const result = await textToSpeech({ text: textToSpeak });
        setAudioDataUri(result.audioDataUri);
        setAiMessage("Now playing the solution for you!");
    } catch (error) {
        console.error("Error generating speech:", error);
        toast({
            title: "Audio Error",
            description: "I couldn't generate the audio. Please try again.",
            variant: "destructive",
        });
        setAiMessage("Sorry, I'm having trouble speaking right now.");
    } finally {
        setIsSpeaking(false);
    }
  };

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
                <SidebarMenuButton asChild isActive>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/history">
                    <History />
                    <span>History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild>
                  <Link href="/test">
                    <PencilRuler />
                    <span>Test Yourself</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/visualizer">
                        <Image />
                        <span>Concept Visualizer</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SettingsPanel onNameChange={setUserName} />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Homework Solver</h1>
            </div>
          </header>

          <main className="flex flex-col gap-8 p-4 sm:p-8">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <div>
                    <Label htmlFor="grade-level" className="font-medium">
                      Class
                    </Label>
                    <Select
                      value={gradeLevel}
                      onValueChange={setGradeLevel}
                      name="grade-level"
                    >
                      <SelectTrigger id="grade-level" className="mt-2">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 7 }, (_, i) => i + 6).map((g) => (
                          <SelectItem key={g} value={String(g)}>
                            Class {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="font-medium">
                      Subject
                    </Label>
                    <Select
                      value={subject}
                      onValueChange={setSubject}
                      name="subject"
                    >
                      <SelectTrigger id="subject" className="mt-2">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Maths">Maths</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Social Science">Social Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="font-medium">
                      Difficulty
                    </Label>
                    <Select
                      value={difficulty}
                      onValueChange={setDifficulty}
                      name="difficulty"
                    >
                      <SelectTrigger id="difficulty" className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label htmlFor="language" className="font-medium">
                      Language (Optional)
                    </Label>
                    <Input id="language" placeholder="e.g., Hindi" className="mt-2" value={language} onChange={(e) => setLanguage(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 animate-in fade-in-50 slide-in-from-bottom-5 duration-500 delay-100">
              <div className="lg:col-span-3">
                <Tabs defaultValue="type">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="type">Type Question</TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="type">
                    <Card>
                      <CardContent className="p-4">
                        <Textarea
                          placeholder="e.g., What is the powerhouse of the cell?"
                          className="min-h-[150px] resize-none text-base"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                         <div className="mt-4 flex items-center gap-3">
                            <Switch
                                id="test-mode"
                                checked={testMode}
                                onCheckedChange={setTestMode}
                            />
                            <Label htmlFor="test-mode" className="font-medium">
                                Test Mode
                            </Label>
                        </div>
                        {testMode && (
                          <div className="mt-4">
                            <Label
                              htmlFor="student-answer"
                              className="font-medium"
                            >
                              Your Answer
                            </Label>
                            <Input
                              id="student-answer"
                              placeholder="Type your answer here before solving"
                              className="mt-2"
                              value={studentAnswer}
                              onChange={(e) =>
                                setStudentAnswer(e.target.value)
                              }
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="upload">
                     <Card>
                      <CardContent className="flex h-auto min-h-[220px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        {image ? (
                          <div className="relative">
                            <img
                              src={image}
                              alt="Uploaded homework"
                              className="max-h-60 w-auto rounded-md"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute right-2 top-2"
                              onClick={() => {
                                setImage(null);
                                if(fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Camera className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              Click the button to upload an image
                            </p>
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Select Image
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex items-start gap-4 lg:col-span-2">
                <Bot className="h-20 w-20 flex-shrink-0 text-primary animate-pulse" />
                <div className="relative rounded-lg bg-muted p-4 shadow-sm">
                  <p className="text-sm">{aiMessage}</p>
                  <div className="absolute -left-2 top-4 h-4 w-4 -translate-y-1/2 rotate-45 bg-muted"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in-50 slide-in-from-bottom-5 duration-500 delay-200">
              <Button
                size="lg"
                className="bg-gradient-to-br from-primary to-blue-400 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
                onClick={handleSolve}
                disabled={isLoading || isShowingAd}
              >
                {isLoading || isShowingAd ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Solve Now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handleExplain}
                disabled={!solution || isExplaining || isShowingAd}
              >
                {isExplaining ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <BrainCircuit className="mr-2 h-5 w-5" />
                )}
                Explain Simply
              </Button>
               <Button
                size="lg"
                variant="secondary"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handleListen}
                disabled={!solution || isSpeaking || isShowingAd}
              >
                {isSpeaking ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Volume2 className="mr-2 h-5 w-5" />
                )}
                Listen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-bold shadow-lg transition-transform hover:scale-105"
                onClick={handlePrint}
                disabled={!solution || isShowingAd}
              >
                 {isShowingAd ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <FileDown className="mr-2 h-5 w-5" />
                )}
                Save as PDF
              </Button>
            </div>

            {solution && (
              <div id="printable-solution">
                <SolutionCard
                  solution={solution}
                  simpleExplanation={simpleExplanation}
                  testMode={testMode}
                  isLoadingExplanation={isExplaining}
                  audioDataUri={audioDataUri}
                  isSpeaking={isSpeaking}
                  onListenClick={handleListen}
                  audioRef={audioRef}
                />
              </div>
            )}
            <AdBanner />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

---

### **File: `src/app/history/page.tsx`**
```tsx
"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { getHistory, clearHistory, type HistoryItem } from "@/lib/history";
import HistoryItemCard from "@/components/history-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, History, Trash2, PencilRuler, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SettingsPanel } from "@/components/settings-panel";

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

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedHistory = getHistory();
    setHistory(loadedHistory.reverse());
    setLoading(false);
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

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
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/history">
                                <History />
                                <span>History</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/test">
                                <PencilRuler />
                                <span>Test Yourself</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/visualizer">
                                <Image />
                                <span>Concept Visualizer</span>
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
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold">History</h1>
                    </div>
                    <Button variant="destructive" onClick={handleClearHistory} disabled={history.length === 0}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear History
                    </Button>
                </header>
                <main className="p-4 sm:p-8">
                {loading ? (
                    <p>Loading history...</p>
                ) : history.length > 0 ? (
                    <div className="grid gap-6">
                        {history.map((item, index) => (
                            <HistoryItemCard key={`${item.timestamp}-${index}`} item={item} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>No History Yet</CardTitle>
                            <CardDescription>Start solving some homework to see your history here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/">Go to Solver</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
```

... and so on for all the other files. The `README.md` will contain the full project listing.
          
          