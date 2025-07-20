// lib/schemas/patients.ts
import { z } from 'zod';

const CurrentWeightUnitSchema = z.union([
  z.literal('lbs'),
  z.literal('g'),
  z.literal(''),
]);

const GenderSchema = z.union([
  z.literal('F'),
  z.literal('N'),
  z.literal('M'),
  z.literal('S'),
]);

const GenderDescriptionSchema = z.union([
  z.literal('Female'),
  z.literal('Neutered'),
  z.literal('Male'),
  z.literal('Spayed'),
]);

const SpeciesSchema = z.union([
  z.literal('FELINE'),
  z.literal('CANINE'),
  z.literal('UNKNOWN'),
  z.literal('AVIAN'),
  z.literal('RODENT'),
  z.literal('REPTILE'),
  z.literal('RABBIT'),
]);

const SpeciesDescriptionSchema = z.union([
  z.literal('Feline'),
  z.literal('Canine'),
  z.literal('Unknown'),
  z.literal('Avian'),
  z.literal('Rodent'),
  z.literal('Reptile'),
  z.literal('Rabbit'),
]);

const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: 'Date must be in YYYY-MM-DD format',
});

export const PatientSchema = z.object({
  id: z.number(),
  created_at: z.number(),
  covetrusId: z.string(),
  PmsId: z.string(),
  Name: z.string(),
  Species: SpeciesSchema,
  SpeciesDescription: SpeciesDescriptionSchema,
  Breed: z.string(),
  BreedDescription: z.string(),
  Color: z.string(),
  ColorDescription: z.string(),
  Gender: GenderSchema,
  GenderDescription: GenderDescriptionSchema,
  DateOfBirth: DateStringSchema.optional(),
  DateOfDeath: DateStringSchema.optional(),
  EnteredDate: DateStringSchema,
  Deleted: z.boolean(),
  IsDeceased: z.boolean(),
  Inactive: z.boolean(),
  CurrentWeight: z.number(),
  CurrentWeightUnit: CurrentWeightUnitSchema,
  SiteId: z.string(),
  SuspendReminders: z.boolean(),
  APICreateDate: DateStringSchema,
  APILastChangeDate: DateStringSchema.optional(),
  clinicId: z.string(),
  merged: z.boolean(),
  LastTransactionDate: DateStringSchema.optional(),
}).strict();

export const PatientsResponseSchema = z.object({
  itemsReceived: z.number(),
  curPage: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  offset: z.number(),
  perPage: z.number(),
  itemsTotal: z.number(),
  pageTotal: z.number(),
  items: z.array(PatientSchema),
}).strict();

export type Patient = z.infer<typeof PatientSchema>;
export type PatientsResponse = z.infer<typeof PatientsResponseSchema>;