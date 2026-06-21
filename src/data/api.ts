import { Category, Professional } from '../types';

// This file now works as a thin async wrapper around the context data.
// Functions accept the current professionals/categories arrays as parameters.

// Small helper to simulate network latency.
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Return all professionals after a short delay.
export const fetchProfessionals = async (
  data: Professional[]
): Promise<Professional[]> => {
  await delay(200);
  return data;
};

// Return a single professional by id, or throw if not found.
export const fetchProfessionalById = async (
  id: string,
  data: Professional[]
): Promise<Professional> => {
  await delay(150);
  const found = data.find((p) => p.id === id);
  if (!found) throw new Error('Nie znaleziono fachowca');
  return found;
};

// Return all categories after a short delay.
export const fetchCategories = async (
  data: Category[]
): Promise<Category[]> => {
  await delay(100);
  return data;
};