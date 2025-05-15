type Disaster = "earthquake" | "flood" | "none";

interface ZoneData {
  date: string; // Format ISO date "YYYY-MM-DD"
  district: "Zone 2" | "Zone 3" | "Zone 4";
  temperature: number; // °C
  humidity: number; // %
  average_wind_speed: number; // m/s ou unité choisie
  max_wind_speed: number; // m/s ou unité choisie
  max_rain_intensity: number; // mm/h ou unité choisie
  total_rain: number; // mm ou unité choisie
  seismicity: number; // indice entre 0 et 1
  gas_concentration: number; // ppm ou unité choisie
  disaster: Disaster | Disaster[]; // "none" ou liste des catastrophes possibles
}
