// app\lib\api\client.ts
import { PatientsResponse } from '../schemas';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const fetchPatients = async (): Promise<PatientsResponse> => {
  const response = await fetch(`${baseUrl}/api/patients`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch patients');
  }
  return response.json();
};