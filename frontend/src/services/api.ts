import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
      console.error('❌ Backend server is not running or not accessible');
      console.error('💡 Please ensure backend is running on http://localhost:5000');
    }
    return Promise.reject(error);
  }
);

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  image: string;
  description: string;
  fullDescription: string;
  bestTime: string;
  duration: string;
  guidelines: string[];
  highlights: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface DestinationsResponse {
  success: boolean;
  count: number;
  data: Destination[];
}

export interface DestinationResponse {
  success: boolean;
  data: Destination;
}

export const destinationService = {
  // Get all destinations, optionally filtered by category
  getAll: async (category?: string): Promise<Destination[]> => {
    const params = category ? { category } : {};
    const response = await api.get<DestinationsResponse>('/destinations', { params });
    return response.data.data;
  },

  // Get a single destination by slug
  getBySlug: async (slug: string): Promise<Destination> => {
    const response = await api.get<DestinationResponse>(`/destinations/${slug}`);
    return response.data.data;
  },
};

export interface ItineraryPreferences {
  duration: string;
  interests: string;
  budget: string;
  travelStyle: string;
  preferences: string;
}

export interface ItineraryActivity {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  time: string;
  ecoFriendlySuggestions: {
    stay?: string;
    transport?: string;
    activities?: string;
  };
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: ItineraryActivity[];
}

export interface ItineraryResponse {
  success: boolean;
  data: {
    days: ItineraryDay[];
    summary: string;
    totalCost?: string;
    ecoFriendlyTips?: string[];
  };
}

export const itineraryService = {
  // Generate AI itinerary
  generate: async (preferences: ItineraryPreferences): Promise<ItineraryResponse['data']> => {
    const response = await api.post<ItineraryResponse>('/generate-itinerary', preferences);
    return response.data.data;
  },
};

export default api;



