'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Card } from '@tekminewe/mint-ui/card';
import { Header } from '@tekminewe/mint-ui/typography';
import { Button } from '@tekminewe/mint-ui/button';
import { TextArea } from '@tekminewe/mint-ui/text-area';
import { TextInput } from '@tekminewe/mint-ui/text-input';
import { ControlledSelect } from '@tekminewe/mint-ui/select';
import { Checkbox } from '@tekminewe/mint-ui/checkbox';
import { IconButton } from '@tekminewe/mint-ui/icon-button';
import { Spinner } from '@tekminewe/mint-ui/spinner';
import { ControlledForm, useFormContext } from '@tekminewe/mint-ui/form';
import { ControlledTextArea } from '@tekminewe/mint-ui/text-area';
import { ControlledTextInput } from '@tekminewe/mint-ui/text-input';

import {
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
} from '@tekminewe/mint-ui/utils';
import { LuPlus, LuTrash } from 'react-icons/lu';
import Image from 'next/image';
import { useFieldArray } from 'react-hook-form';

const DEFAULT_SYSTEM_PROMPT = `You are an expert image generator. Create professional marketing visuals using the provided reference images.

Guidelines:
1. Create high-quality, professional marketing imagery that complements any provided reference images
2. Ensure the image works well for web display at 1536x1024 resolution
3. Use colors and design elements that work well with any provided reference images
4. Output format should be WebP for optimal web performance
5. If reference images are provided, use them as visual inspiration for style, colors, and theme
6. If no reference images are provided, create original content based on the text prompt only
7. Always maintain professional quality and ensure the composition works well for marketing purposes
8. Create visually appealing and cohesive designs that would work well for digital marketing campaigns

Logo Placement Instructions:
- If the FIRST reference image is provided, it represents the advertiser icon and should be placed in the BOTTOM RIGHT corner of the generated image
- If the SECOND reference image is provided, it represents the site logo and should be placed in the TOP LEFT corner of the generated image
- Ensure logos are clearly visible but not overwhelming - they should complement the main design
- Keep logos at an appropriate size (roughly 80-120px) and maintain their aspect ratio
- Add subtle drop shadows or backgrounds to logos if needed for visibility
- Any additional reference images beyond the first two should be used as style/theme inspiration only`;

type ImageProvider = 'OPENAI' | 'FAL_AI';

const promptSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters long')
    .max(3000, 'Prompt must be less than 3000 characters'),
  systemPrompt: z.string().optional(),
  provider: z.enum(['OPENAI', 'FAL_AI']).default('FAL_AI'),
  referenceImages: z
    .array(
      z.object({
        url: z.string().url('Please enter a valid URL'),
        type: z
          .enum(['advertiser_icon', 'site_logo', 'inspiration'])
          .optional(),
      }),
    )
    .max(5, 'Maximum 5 reference images allowed')
    .optional()
    .default([]),
  // OpenAI specific fields
  quality: z.enum(['standard', 'hd']).optional().default('hd'),
  style: z.enum(['vivid', 'natural']).optional().default('vivid'),
  // Fal.ai specific fields
  imageSize: z
    .enum([
      'square_hd',
      'square',
      'portrait_4_3',
      'portrait_16_9',
      'landscape_4_3',
      'landscape_16_9',
    ])
    .optional()
    .default('landscape_4_3'),
  numInferenceSteps: z.string().optional().default('4'),
  guidanceScale: z.number().min(1).max(20).optional().default(3.5),
  numImages: z.string().optional().default('1'),
  enableSafetyChecker: z.boolean().optional().default(true),
  outputFormat: z.enum(['jpeg', 'png']).optional().default('jpeg'),
});

type PromptFormData = z.infer<typeof promptSchema>;

interface GeneratedImageResult {
  url: string;
  revisedPrompt?: string;
  maskUsed?: boolean;
  error?: string;
}

// Component for the form fields
const ImageGenerationForm = ({ isLoading }: { isLoading: boolean }) => {
  const { control, watch } = useFormContext<PromptFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'referenceImages',
  });

  const provider = watch('provider');
  const promptValue = watch('prompt', '');
  const characterCount = promptValue?.length || 0;

  return (
    <>
      <div className="space-y-2">
        <ControlledTextArea
          name="prompt"
          label="Image Prompt *"
          placeholder="Describe the image you want to generate... (e.g., 'A futuristic cityscape at sunset with flying cars and neon lights')"
          rows={6}
          disabled={isLoading}
          required
        />
        <div className="flex justify-between">
          <div className={`text-sm ${TEXT_COLORS.muted}`}>
            {characterCount}/3000 characters
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <ControlledTextArea
          name="systemPrompt"
          label="System Prompt (Optional)"
          placeholder="Custom system instructions for the AI..."
          rows={8}
          disabled={isLoading}
        />
        <div className={`text-xs ${TEXT_COLORS.muted}`}>
          Modify the system prompt to customize AI behavior. Default prompt
          includes logo placement instructions.
        </div>
      </div>

      {/* Reference Images Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className={`text-sm font-medium ${TEXT_COLORS.primary}`}>
            Reference Images (Optional)
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ url: '' })}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <LuPlus className="h-4 w-4" />
            Add Image URL
          </Button>
        </div>

        {fields.length > 0 && (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <ControlledTextInput
                    name={`referenceImages.${index}.url`}
                    placeholder="https://example.com/image.jpg"
                    disabled={isLoading}
                  />
                </div>
                <IconButton
                  type="button"
                  variant="ghost"
                  color="red"
                  onClick={() => remove(index)}
                  disabled={isLoading}
                  className="mt-1"
                >
                  <LuTrash className="h-4 w-4" />
                </IconButton>
              </div>
            ))}
          </div>
        )}

        {fields.length === 0 && (
          <div className={`text-sm ${TEXT_COLORS.muted}`}>
            Add reference images to help guide the AI generation. The AI will
            use these images as visual references while generating new content.
          </div>
        )}
      </div>

      {/* Provider Selection */}
      <ControlledSelect
        name="provider"
        label="AI Provider *"
        disabled={isLoading}
        required
        options={[
          { value: 'OPENAI', label: 'OpenAI DALL-E 3' },
          { value: 'FAL_AI', label: 'Fal.ai FLUX Schnell' },
        ]}
      />

      {/* Dynamic Fields Based on Provider */}
      {provider === 'OPENAI' && (
        <div className="space-y-4 p-4 border rounded-lg bg-background-subtle">
          <h4 className={`text-sm font-medium ${TEXT_COLORS.primary}`}>
            OpenAI Settings
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <ControlledSelect
              name="quality"
              label="Quality"
              disabled={isLoading}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'hd', label: 'HD' },
              ]}
            />

            <ControlledSelect
              name="style"
              label="Style"
              disabled={isLoading}
              options={[
                { value: 'vivid', label: 'Vivid' },
                { value: 'natural', label: 'Natural' },
              ]}
            />
          </div>
        </div>
      )}

      {provider === 'FAL_AI' && (
        <div className="space-y-4 p-4 border rounded-lg bg-background-subtle">
          <h4 className={`text-sm font-medium ${TEXT_COLORS.primary}`}>
            Fal.ai FLUX Schnell Settings
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <ControlledSelect
              name="imageSize"
              label="Image Size"
              disabled={isLoading}
              options={[
                { value: 'square_hd', label: 'Square HD (1024x1024)' },
                { value: 'square', label: 'Square (512x512)' },
                { value: 'portrait_4_3', label: 'Portrait 4:3 (768x1024)' },
                { value: 'portrait_16_9', label: 'Portrait 16:9 (576x1024)' },
                { value: 'landscape_4_3', label: 'Landscape 4:3 (1024x768)' },
                { value: 'landscape_16_9', label: 'Landscape 16:9 (1024x576)' },
              ]}
            />

            <ControlledSelect
              name="outputFormat"
              label="Output Format"
              disabled={isLoading}
              options={[
                { value: 'jpeg', label: 'JPEG' },
                { value: 'png', label: 'PNG' },
              ]}
            />

            <ControlledSelect
              name="numImages"
              label="Number of Images"
              disabled={isLoading}
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
              ]}
            />

            <ControlledSelect
              name="numInferenceSteps"
              label="Inference Steps"
              disabled={isLoading}
              options={[
                { value: '1', label: '1 (Fastest)' },
                { value: '4', label: '4 (Recommended)' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
              ]}
            />

            <div className="space-y-2">
              <ControlledTextInput
                name="guidanceScale"
                label="Guidance Scale"
                type="number"
                step="0.1"
                min="1"
                max="20"
                disabled={isLoading}
                placeholder="3.5"
              />
              <div className={`text-xs ${TEXT_COLORS.muted}`}>
                Controls how closely the image follows the prompt (1-20,
                default: 3.5)
              </div>
            </div>

            <div className="space-y-2">
              {/* Safety checker checkbox - handling manually since ControlledCheckbox doesn't exist */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={true} // defaulted to true in schema
                  disabled={isLoading}
                />
                <label className="text-sm font-medium">
                  Enable Safety Checker
                </label>
              </div>
              <div className={`text-xs ${TEXT_COLORS.muted}`}>
                Filters out potentially harmful content
              </div>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Generating Image...
          </>
        ) : (
          'Generate Image'
        )}
      </Button>
    </>
  );
};

export const AdminImageGenerationPlaygroundPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] =
    useState<GeneratedImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PromptFormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Prepare the request data based on provider
      const requestData = {
        prompt: data.prompt,
        systemPrompt: data.systemPrompt,
        provider: data.provider,
        referenceImages: data.referenceImages?.map((item) => item.url) || [],
        ...(data.provider === 'OPENAI' && {
          quality: data.quality,
          style: data.style,
        }),
        ...(data.provider === 'FAL_AI' && {
          imageSize: data.imageSize,
          numInferenceSteps: Number(data.numInferenceSteps),
          guidanceScale: data.guidanceScale,
          numImages: Number(data.numImages),
          enableSafetyChecker: data.enableSafetyChecker,
          outputFormat: data.outputFormat,
        }),
      };

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result: GeneratedImageResult = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate image');
      }

      setGeneratedImage(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error generating image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header className="mb-6">Image Generation Playground</Header>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6">
          <ControlledForm
            defaultValues={{
              prompt: '',
              systemPrompt: DEFAULT_SYSTEM_PROMPT,
              provider: 'OPENAI',
              referenceImages: [],
              // OpenAI defaults
              quality: 'hd',
              style: 'vivid',
              // Fal.ai defaults
              imageSize: 'landscape_4_3',
              numInferenceSteps: '4',
              guidanceScale: 3.5,
              numImages: '1',
              enableSafetyChecker: true,
              outputFormat: 'jpeg',
            }}
            onSubmit={onSubmit}
            hideSubmitButton
            className="space-y-6"
          >
            <ImageGenerationForm isLoading={isLoading} />
          </ControlledForm>
        </Card>

        {/* Results Panel */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Generated Image</h3>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 mt-4">
                <p className="text-sm text-red-800 font-medium mb-2">
                  Error generating image
                </p>
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-800 hover:text-red-900 underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Spinner size="lg" />
                <p className={`text-sm ${TEXT_COLORS.muted}`}>
                  Generating your image... This may take a moment.
                </p>
              </div>
            )}

            {generatedImage && !isLoading && (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={generatedImage.url}
                    alt="Generated image"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                {generatedImage.revisedPrompt && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Revised Prompt:</h4>
                    <p className={`text-sm ${TEXT_COLORS.muted}`}>
                      {generatedImage.revisedPrompt}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage.url;
                      link.download = 'generated-image.png';
                      link.click();
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(generatedImage.url)
                    }
                  >
                    Copy URL
                  </Button>
                </div>
              </div>
            )}

            {!generatedImage && !isLoading && !error && (
              <div
                className={`flex items-center justify-center py-12 border-2 border-dashed ${BORDER_COLORS.default} rounded-lg`}
              >
                <p className={`text-sm ${TEXT_COLORS.muted}`}>
                  Your generated image will appear here
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
