// app/api/generate-story/route.ts
import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// AI Prompt Generation
export async function POST(request: Request) {
  try {
    const { formData } = await request.json();

    const prompt = `Create a compelling GoFundMe style story for a pet medical fundraiser based on this information:
    
    Pet Name: ${formData.petName}
    Species: ${formData.species}
    Medical Condition: ${formData.condition}
    Treatment Needed: ${formData.recommendedTreatment}
    Cost Estimate: $${formData.estimatedCost}
    Pet's Story: ${formData.specialMeaning}
    Favorite Memory: ${formData.favoriteMemory}
    Family Impact: ${formData.familyImpact}
    Financial Need: ${formData.otherHardships}

    The story should be 3-4 paragraphs long, emotionally compelling but not overly sentimental, and clearly explain:
    1. The pet's situation and medical needs
    2. Why the pet is special to the family
    3. The financial need and how donations will help
    Include a call-to-action at the end.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a compassionate writer..."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
      max_tokens: 1024,
      stream: false
    });

    return NextResponse.json({
      story: chatCompletion.choices[0]?.message?.content
    });

  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}