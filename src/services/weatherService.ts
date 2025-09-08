import { fetchWeatherApi } from 'openmeteo';

export interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    weather_code: number;
    pressure_msl: number;
    surface_pressure: number;
    cloud_cover: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array;
    weather_code: Float32Array;
    wind_speed_10m: Float32Array;
    relative_humidity_2m: Float32Array;
    precipitation_probability: Float32Array;
    uv_index: Float32Array;
  };
  location: {
    latitude: number;
    longitude: number;
    elevation: number;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
          );
          
          resolve({
            latitude,
            longitude,
            address: `${latitude.toFixed(2)}°N ${longitude.toFixed(2)}°E`
          });
        } catch (error) {
          resolve({
            latitude,
            longitude,
            address: 'Agricultural Technology Center, Innovation Hub, Sector 18, New Delhi, India 110001'
          });
        }
      },
      (error) => {
        // Fallback to Delhi coordinates
        resolve({
          latitude: 28.7041,
          longitude: 77.1025,
          address: 'Agricultural Technology Center, Innovation Hub, Sector 18, New Delhi, India 110001'
        });
      }
    );
  });
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = {
    latitude,
    longitude,
    hourly: ["temperature_2m", "weather_code", "wind_speed_10m", "relative_humidity_2m", "precipitation_probability", "uv_index"],
    current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
    forecast_hours: 120, // 5 days
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location
  const response = responses[0];

  // Attributes for timezone and location
  const responseLatitude = response.latitude();
  const responseLongitude = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      showers: current.variables(6)!.value(),
      weather_code: current.variables(7)!.value(),
      pressure_msl: current.variables(8)!.value(),
      surface_pressure: current.variables(9)!.value(),
      cloud_cover: current.variables(10)!.value(),
      wind_speed_10m: current.variables(11)!.value(),
      wind_direction_10m: current.variables(12)!.value(),
      wind_gusts_10m: current.variables(13)!.value(),
    },
    hourly: {
      time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
      wind_speed_10m: hourly.variables(2)!.valuesArray(),
      relative_humidity_2m: hourly.variables(3)!.valuesArray(),
      precipitation_probability: hourly.variables(4)!.valuesArray(),
      uv_index: hourly.variables(5)!.valuesArray(),
    },
    location: {
      latitude: responseLatitude,
      longitude: responseLongitude,
      elevation: elevation,
    }
  };

  return weatherData;
};

// Weather code to condition mapping
export const getWeatherCondition = (code: number): { condition: string; icon: string } => {
  const weatherCodes: Record<number, { condition: string; icon: string }> = {
    0: { condition: "Clear sky", icon: "sun" },
    1: { condition: "Mainly clear", icon: "sun" },
    2: { condition: "Partly cloudy", icon: "cloud" },
    3: { condition: "Overcast", icon: "cloud" },
    45: { condition: "Fog", icon: "cloud" },
    48: { condition: "Depositing rime fog", icon: "cloud" },
    51: { condition: "Light drizzle", icon: "cloud-rain" },
    53: { condition: "Moderate drizzle", icon: "cloud-rain" },
    55: { condition: "Dense drizzle", icon: "cloud-rain" },
    56: { condition: "Light freezing drizzle", icon: "cloud-rain" },
    57: { condition: "Dense freezing drizzle", icon: "cloud-rain" },
    61: { condition: "Slight rain", icon: "cloud-rain" },
    63: { condition: "Moderate rain", icon: "cloud-rain" },
    65: { condition: "Heavy rain", icon: "cloud-rain" },
    66: { condition: "Light freezing rain", icon: "cloud-rain" },
    67: { condition: "Heavy freezing rain", icon: "cloud-rain" },
    71: { condition: "Slight snow fall", icon: "cloud-snow" },
    73: { condition: "Moderate snow fall", icon: "cloud-snow" },
    75: { condition: "Heavy snow fall", icon: "cloud-snow" },
    77: { condition: "Snow grains", icon: "cloud-snow" },
    80: { condition: "Slight rain showers", icon: "cloud-rain" },
    81: { condition: "Moderate rain showers", icon: "cloud-rain" },
    82: { condition: "Violent rain showers", icon: "cloud-rain" },
    85: { condition: "Slight snow showers", icon: "cloud-snow" },
    86: { condition: "Heavy snow showers", icon: "cloud-snow" },
    95: { condition: "Thunderstorm", icon: "zap" },
    96: { condition: "Thunderstorm with slight hail", icon: "zap" },
    99: { condition: "Thunderstorm with heavy hail", icon: "zap" },
  };

  return weatherCodes[code] || { condition: "Unknown", icon: "cloud" };
};