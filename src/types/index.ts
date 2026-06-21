// Shared domain types used across the app.

// A single review left by a client.
export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

// A service professional (the core entity of the app).
export interface Professional {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  city: string;
  experienceYears: number;
  about: string;
  imageUrl: string;
  // Marks professionals shown in the "Polecani" horizontal section.
  featured: boolean;
  reviews: Review[];
}

// A service category with an icon name from Ionicons.
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// The currently logged in user kept in memory.
export interface User {
  id: string;
  name: string;
  email: string;
}
