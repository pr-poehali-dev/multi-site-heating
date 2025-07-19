export interface City {
  id: string;
  name: string;
  slug: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  priceModifier: number; // множитель для цен (1.0 = базовая цена)
  domain: string; // кириллический домен для города
  domainLatin: string; // латинский домен для города
  isActive: boolean;
}

export interface CityContent {
  cityId: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  services: ServiceContent[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  reviews: ReviewItem[];
  updatedAt: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  image?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'before-after' | 'process' | 'equipment';
  uploadedAt: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  rutubeId: string;
  rutubeUrl: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface GeolocationData {
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  accuracy: number;
  source: 'browser' | 'ip' | 'manual';
}