import { useState, useEffect } from 'react';
import { getWeatherData, getCurrentLocation, WeatherData, LocationData } from '@/services/weatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat?: number, lng?: number) => {
    try {
      setLoading(true);
      setError(null);

      let locationData: LocationData;
      
      if (lat && lng) {
        locationData = {
          latitude: lat,
          longitude: lng,
          address: `${lat.toFixed(2)}°N ${lng.toFixed(2)}°E`
        };
      } else {
        locationData = await getCurrentLocation();
      }

      setLocation(locationData);
      
      const weather = await getWeatherData(locationData.latitude, locationData.longitude);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weatherData,
    location,
    loading,
    error,
    refetch: fetchWeather,
  };
};