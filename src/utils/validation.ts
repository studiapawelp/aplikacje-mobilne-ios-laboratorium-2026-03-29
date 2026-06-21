// Centralne funkcje walidacji pól formularza.
// Każda zwraca undefined (ok) lub string z komunikatem błędu.
// Wszystkie komunikaty po polsku.

/** Sprawdza czy wartość nie jest pusta (po trim). */
export const validateRequired = (
  value: string,
  label?: string
): string | undefined => {
  if (!value || value.trim().length === 0) {
    return label ? `${label} jest wymagane.` : 'Pole jest wymagane.';
  }
  return undefined;
};

/** Sprawdza czy tekst ma co najmniej minLength znaków. */
export const validateMinLength = (
  value: string,
  minLength: number,
  label?: string
): string | undefined => {
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    const field = label ?? 'Pole';
    return `${field} musi mieć co najmniej ${minLength} znaków.`;
  }
  return undefined;
};

/** Waliduje poprawny format adresu e-mail. */
export const validateEmail = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined; // required to osobna walidacja
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Podaj poprawny adres e-mail.';
  }
  return undefined;
};

/** Sprawdza czy liczba mieści się w zakresie [min, max]. */
export const validateNumberRange = (
  value: string,
  min: number,
  max: number,
  label?: string
): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return label ? `${label} jest wymagane.` : 'Pole jest wymagane.';
  }
  const num = Number(trimmed);
  if (isNaN(num) || !Number.isFinite(num)) {
    return 'Podaj poprawną liczbę.';
  }
  if (num < min || num > max) {
    return `Wartość musi być w zakresie ${min}–${max}.`;
  }
  return undefined;
};

/** Sprawdza czy podany string jest poprawnym URL (opcjonalne pole). */
export const validateUrl = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined; // opcjonalne
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'URL musi zaczynać się od http:// lub https://.';
    }
    return undefined;
  } catch {
    return 'Podaj poprawny adres URL.';
  }
};

/** Łączy wiele funkcji walidacji – zwraca pierwszy znaleziony błąd. */
export const validateAll = (
  value: string,
  validators: Array<(value: string) => string | undefined>
): string | undefined => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return undefined;
};