// app\lib\definitions.ts
export type PatientsResponse = {
  itemsReceived: number;
  curPage: number;
  nextPage: number;
  prevPage: null;
  offset: number;
  perPage: number;
  itemsTotal: number;
  pageTotal: number;
  items: Item[];
}

export type Item = {
  id: number;
  created_at: number;
  covetrusId: string;
  PmsId: string;
  Name: string;
  Species: Species;
  SpeciesDescription: SpeciesDescription;
  Breed: string;
  BreedDescription: string;
  Color: string;
  ColorDescription: string;
  Gender: Gender;
  GenderDescription: GenderDescription;
  EnteredDate: Date;
  Deleted: boolean;
  IsDeceased: boolean;
  Inactive: boolean;
  CurrentWeight: number;
  CurrentWeightUnit: CurrentWeightUnit;
  SiteId: string;
  SuspendReminders: boolean;
  APICreateDate: Date;
  APILastChangeDate?: Date;
  clinicId: string;
  merged: boolean;
  DateOfBirth?: Date;
  DateOfDeath?: Date;
  LastTransactionDate?: Date;
}

export type CurrentWeightUnit = "lbs" | "" | "g";

export type Gender = "F" | "N" | "M" | "S";

export type GenderDescription = "Female" | "Neutered" | "Male" | "Spayed";

export type Species = "FELINE" | "CANINE" | "UNKNOWN" | "AVIAN" | "RODENT" | "REPTILE" | "RABBIT";

export type SpeciesDescription = "Feline" | "Canine" | "Unknown" | "Avian" | "Rodent" | "Reptile" | "Rabbit";