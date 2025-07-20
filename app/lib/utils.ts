// app/components/PatientCharts/utils.ts
import { type Item } from '../lib/definitions';

export function processChartData(patients: Item[]) {
  const speciesData = patients.reduce((acc, patient) => {
    const key = patient.SpeciesDescription;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = patients.reduce((acc, patient) => {
    const key = patient.GenderDescription;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = patients.reduce((acc, patient) => {
    const key = patient.IsDeceased ? 'Deceased' : patient.Inactive ? 'Inactive' : 'Active';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageData = patients
    .filter(p => p.DateOfBirth)
    .map(p => {
      const birthDate = new Date(p.DateOfBirth!);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      return age;
    });

  return {
    species: Object.entries(speciesData).map(([name, value]) => ({ name, value })),
    gender: Object.entries(genderData).map(([name, value]) => ({ name, value })),
    status: Object.entries(statusData).map(([name, value]) => ({ name, value })),
    ages: ageData,
  };
}

export function promisifyWithDelay<T>(
  value: T | (() => T),
  delayMs: number = 0
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = typeof value === "function" ? (value as () => T)() : value;
      resolve(result);
    }, delayMs);
  });
}