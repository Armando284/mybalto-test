// app/hooks/useGenerateStory.ts
import { useMutation } from '@tanstack/react-query';

interface StoryRequest {
  formData: any;
  petInfo: any;
}

export function useGenerateStory() {
  return useMutation({
    mutationFn: async ({ formData, petInfo }: StoryRequest) => {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, petInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      return response.json();
    },
  });
}