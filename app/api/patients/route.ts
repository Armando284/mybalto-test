// app/api/patients/route.ts
import { NextResponse } from 'next/server';
import { PatientsResponseSchema } from '../../lib/schemas';

const API_URL = 'https://api.mybalto.com/api:D60OKSek/pims/patients';

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const validatedData = PatientsResponseSchema.parse(data);

    return NextResponse.json(validatedData);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}