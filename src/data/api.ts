import { Category, Professional } from '../types';
import { categories } from './categories';
import { professionals } from './professionals';

// This file fakes a backend. Each function waits a bit and then
// returns mock data. This lets React Query show real loading states.

// Small helper to simulate network latency.
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Return all professionals after a short delay.
export const fetchProfessionals = async (): Promise<Professional[]> => {
  await delay(600);
  return professionals;
};

// Return a single professional by id, or throw if not found.
export const fetchProfessionalById = async (
  id: string
): Promise<Professional> => {
  await delay(400);
  const found = professionals.find((p) => p.id === id);
  // Throwing lets React Query expose an error state.
  if (!found) throw new Error('Nie znaleziono fachowca');
  return found;
};

// Return all categories after a short delay.
export const fetchCategories = async (): Promise<Category[]> => {
  await delay(300);
  return categories;
};
