interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityModel {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Coordinates;
  id: number;
}
