import { useState, useEffect } from 'react';
import { City, GeolocationData } from '@/types/city';
import { findNearestCity, CITIES } from '@/data/cities';

interface UseGeolocationReturn {
  userCity: City | null;
  isLoading: boolean;
  error: string | null;
  detectedLocation: GeolocationData | null;
  requestLocation: () => void;
  setUserCity: (city: City) => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [userCity, setUserCityState] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<GeolocationData | null>(null);

  const detectLocationByIP = async (): Promise<GeolocationData | null> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.latitude && data.longitude) {
        return {
          city: data.city || '',
          region: data.region || '',
          country: data.country_name || '',
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
          accuracy: 1000, // IP-based location is less accurate
          source: 'ip'
        };
      }
    } catch (error) {
      console.error('IP geolocation failed:', error);
    }
    return null;
  };

  const detectLocationByBrowser = (): Promise<GeolocationData | null> => {
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
            country: 'Russia',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            source: 'browser'
          });
        },
        (error) => {
          console.error('Browser geolocation failed:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  const requestLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try browser geolocation first (more accurate)
      let location = await detectLocationByBrowser();
      
      // Fallback to IP geolocation
      if (!location) {
        location = await detectLocationByIP();
      }

      if (location) {
        setDetectedLocation(location);
        
        // Find nearest city
        const nearestCity = findNearestCity(location.lat, location.lng);
        
        if (nearestCity) {
          setUserCityState(nearestCity);
        } else {
          // Fallback to Yaroslavl if no city found nearby
          const fallbackCity = CITIES.find(city => city.id === 'yaroslavl');
          if (fallbackCity) {
            setUserCityState(fallbackCity);
          }
        }
      } else {
        throw new Error('Не удалось определить местоположение');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка определения местоположения');
      
      // Set default city on error
      const defaultCity = CITIES.find(city => city.id === 'yaroslavl');
      if (defaultCity) {
        setUserCityState(defaultCity);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setUserCity = (city: City) => {
    setUserCityState(city);
    // Save to localStorage for persistence
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  // Load saved city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      try {
        const parsedCity = JSON.parse(savedCity);
        // Verify city still exists in our data
        const existingCity = CITIES.find(city => city.id === parsedCity.id);
        if (existingCity) {
          setUserCityState(existingCity);
          return;
        }
      } catch (error) {
        console.error('Error parsing saved city:', error);
      }
    }
    
    // Auto-detect location if no saved city
    requestLocation();
  }, []);

  return {
    userCity,
    isLoading,
    error,
    detectedLocation,
    requestLocation,
    setUserCity
  };
};