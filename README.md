# Pet Medical Fundraiser Story Generator

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Technical Implementation](#technical-implementation)
- [AI Prompt Engineering](#ai-prompt-engineering)
- [Example Output](#example-output)
- [Future Improvements](#future-improvements)
- [License](#license)

## Overview

This application helps pet owners generate compelling GoFundMe-style stories for their pets' medical needs by combining pet information from an external API with user-provided details about their pet's condition and financial situation.

## Features

- 🐾 **Pet Selection**: Search and select pets from the database
- 🏥 **Medical Situation Form**: Capture details about the pet's condition
- 📖 **Pet Story Section**: Collect personal anecdotes about the pet
- 💰 **Financial Need Assessment**: Document treatment costs and financial hardship
- ✨ **AI-Generated Story**: Automatically creates a compelling fundraising narrative
- 📊 **Data Visualization**: Charts showing pet statistics and distributions

## Live Demo

Check out the deployed application:  
👉 [https://mybalto-test.vercel.app/](https://mybalto-test.vercel.app/)

## Setup Instructions

### Prerequisites
- Node.js v18+
- pnpm (recommended) or npm
- Vercel CLI (optional for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Armando284/mybalto-test.git
   cd mybalto-test
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://api.mybalto.com/api:D60OKSek/pims/patients
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Technical Implementation

### Key Technologies
- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Form Handling**: React Hook Form + Zod validation
- **Charts**: Recharts
- **AI Integration**: Groq API with Llama 3

### Database Integration
The application connects to the Pet Data API at:
```
https://api.mybalto.com/api:D60OKSek/pims/patients
```

Example response structure:
```json
{
  "items": [
    {
      "id": 1,
      "Name": "Lilly",
      "Species": "FELINE",
      "SpeciesDescription": "Feline",
      "Breed": "DOMESTIC",
      "BreedDescription": "Domestic Short Hair",
      "GenderDescription": "Female",
      "DateOfBirth": "2007-05-19",
      "CurrentWeight": 1.11,
      "CurrentWeightUnit": "lbs"
    }
  ]
}
```

## AI Prompt Engineering

The AI prompt combines form data with a structured template:

```text
Create a compelling GoFundMe story for [Pet Name], a [Species] in need of medical care.

Key points to include:
- Medical condition: [Condition] (started [Date])
- Recommended treatment: [Treatment] (cost: $[Amount])
- [Pet Name]'s personality: [Description]
- Family's favorite memory: [Memory]
- How this has impacted the family: [Impact]
- Financial situation: [Hardships]

Structure:
1. Introduce [Pet Name] and their personality
2. Explain the medical situation and treatment needed
3. Share how this has affected the family
4. Clear call-to-action for donations

Tone: Compassionate but not overly sentimental, hopeful, professional yet personal.
```

### Prompt Improvements
1. **Emotional Resonance**: Added specific prompts for emotional connections
2. **Structure**: Enforced clear narrative flow
3. **Tone Control**: Specified desired tone characteristics
4. **Length Guidance**: Suggested paragraph count
5. **Call-to-Action**: Explicit request for donation language

## Example Output

**Generated Story for Max (Golden Retriever):**

"Meet Max, a loving Golden Retriever who has been the heart of our family for 3 years. Max isn't just a pet - he's our son's emotional support companion, helping him navigate the challenges of autism with unwavering patience and affection.

Max has been diagnosed with severe hip dysplasia that requires a $4,500 total hip replacement surgery. Without this procedure, our gentle giant will continue to suffer increasing pain and mobility issues. We first noticed his discomfort last May when he struggled to climb stairs he used to bound up eagerly.

What makes Max special is his intuitive understanding of our family's needs. Our favorite memory is watching him carefully deliver the newspaper each morning, tail wagging with pride at accomplishing his self-assigned task. This medical crisis has forced us to take time off work to care for him, compounding our financial strain from existing medical bills.

We've already spent $1,200 on initial treatments, but as a single-income household, we need help covering the surgery costs. Your generous donation will give Max the pain-free life he deserves and restore his ability to be our son's constant companion. Every contribution, no matter the size, brings us closer to our December 1st fundraising goal."

## Future Improvements

1. **Enhanced AI Features**:
   - Multiple story tone options (formal, casual, emotional)
   - Story length customization
   - A/B testing for most effective narratives

2. **UI/UX Improvements**:
   - Pet photo upload and display
   - Progress tracker for fundraising goals
   - Social sharing integration

3. **Technical Enhancements**:
   - Implement rate limiting for API calls
   - Add caching for generated stories
   - Improve error handling and user notifications

4. **Accessibility**:
   - Full WCAG compliance audit
   - Screen reader optimization
   - Keyboard navigation support
