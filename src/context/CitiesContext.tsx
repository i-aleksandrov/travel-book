import { createContext, useEffect, useState } from 'react';
import type { CityModel } from '../models/city.model';

const apiUrl = 'http://localhost:8000';

interface CitiesContextType {
  cities: CityModel[];
  isLoading: boolean;
  currentCity: CityModel;
  getCity: (id: string) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: {} as CityModel,
  getCity: () => Promise.resolve(),
});

interface CitiesProviderProps {
  children: React.ReactNode;
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({} as CityModel);

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
