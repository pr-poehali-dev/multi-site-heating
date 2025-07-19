import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { City, GeolocationData } from '@/types/city';
import { CITIES, findCityByName } from '@/data/cities';

interface CityStore {
  currentCity: City | null;
  isLocationDetected: boolean;
  showCityModal: boolean;
  geolocation: GeolocationData | null;
  
  setCurrentCity: (city: City) => void;
  detectLocation: () => Promise<void>;
  confirmCity: (city: City) => void;
  showCityConfirmation: () => void;
  hideCityConfirmation: () => void;
  getSuggestedCities: (query: string) => City[];
}

const detectCityByCoordinates = (lat: number, lng: number): City | null => {
  let closestCity: City | null = null;
  let minDistance = Infinity;

  CITIES.forEach(city => {
    const distance = Math.sqrt(
      Math.pow(city.coordinates.lat - lat, 2) + 
      Math.pow(city.coordinates.lng - lng, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });

  return minDistance < 0.5 ? closestCity : null; // в пределах ~55км
};

const getLocationByIP = async (): Promise<GeolocationData | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.city && data.latitude && data.longitude) {
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        lat: data.latitude,
        lng: data.longitude,
        accuracy: 10000,
        source: 'ip'
      };
    }
  } catch (error) {
    console.warn('IP geolocation failed:', error);
  }
  return null;
};

const getBrowserLocation = (): Promise<GeolocationData | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          city: '',
          region: '',
          country: 'Россия',
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          source: 'browser'
        });
      },
      () => resolve(null),
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
};

export const useCityStore = create<CityStore>()(
  persist(
    (set, get) => ({
      currentCity: CITIES[0], // Ярославль по умолчанию
      isLocationDetected: false,
      showCityModal: false,
      geolocation: null,

      setCurrentCity: (city: City) => {
        set({ currentCity: city });
      },

      detectLocation: async () => {
        // Сначала пробуем браузерную геолокацию
        let location = await getBrowserLocation();
        
        // Если не получилось, используем IP
        if (!location) {
          location = await getLocationByIP();
        }

        if (location) {
          set({ geolocation: location });

          // Определяем город по координатам
          const detectedCity = detectCityByCoordinates(location.lat, location.lng);
          
          if (detectedCity) {
            // Если нашли точное совпадение, показываем модальное окно
            set({ showCityModal: true });
          } else if (location.city) {
            // Если есть название города, ищем похожий
            const cityByName = findCityByName(location.city);
            if (cityByName) {
              set({ showCityModal: true });
            }
          }
          
          set({ isLocationDetected: true });
        }
      },

      confirmCity: (city: City) => {
        set({ 
          currentCity: city, 
          showCityModal: false,
          isLocationDetected: true 
        });
      },

      showCityConfirmation: () => {
        set({ showCityModal: true });
      },

      hideCityConfirmation: () => {
        set({ showCityModal: false });
      },

      getSuggestedCities: (query: string) => {
        if (!query || query.length < 2) return [];
        
        return CITIES.filter(city =>
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.region.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
      }
    }),
    {
      name: 'city-storage',
      partialize: (state) => ({ 
        currentCity: state.currentCity,
        isLocationDetected: state.isLocationDetected 
      })
    }
  )
);