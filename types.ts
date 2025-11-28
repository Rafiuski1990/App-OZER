
export interface UserProfile {
  name: string;
  cpf: string;
  photoUrl: string | null;
}

export interface ShoppingItem {
  id: string;
  name: string;
  variant?: string; // e.g., "Picanha", "5kg", "Cabelos Lisos"
  brand: string;
  quantity: number;
}

export enum TransportMode {
  CAR = 'CAR',
  MOTO = 'MOTO',
  WALK = 'WALK'
}

export interface MarketResult {
  id: string;
  name: string;
  address: string;
  productsTotal: number;
  distanceKm: number;
  timeMinutes: number;
  missingItems: string[]; 
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingTime?: string; // "08:00"
  closingTime?: string; // "22:00"
  paymentMethods?: string[]; // ["Crédito", "Pix", "Vale Alimentação"]
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  contributions: number;
  photoUrl?: string; // Added photo support
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// --- Product Catalog Interfaces ---
export interface ProductVariant {
  id: string;
  name: string;
  image: string;
}

export interface ProductDefinition {
  variants: ProductVariant[];
  brands: string[];
}

export interface Promotion {
  id: string;
  marketId: string;
  marketName: string;
  marketLogo: string;
  productName: string;
  productImage: string;
  oldPrice: number;
  newPrice: number;
  description: string;
  expiresIn: string;
}
