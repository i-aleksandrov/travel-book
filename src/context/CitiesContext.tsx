/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useEffect, useReducer } from 'react';
import type { CityModel } from '../models/city.model';
import { app } from '../config';
import {
  collection,
  getFirestore,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { CityActionTypes } from '../models/city-actions.model';

const firestore = getFirestore(app);

interface CitiesContextType {
  cities: CityModel[];
  isLoading: boolean;
  currentCity: CityModel;
  getCity: (id: string) => Promise<void>;
  createCity: (city: CityModel) => Promise<any>;
  deleteCity: (cityId: string) => Promise<void>;
}

interface CitiesContextState {
  cities: CityModel[];
  isLoading: boolean;
  currentCity: CityModel;
  error: string;
}

interface CitiesContextAction {
  type: CityActionTypes;
  payload?: any;
}

const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: {} as CityModel,
  getCity: () => Promise.resolve(),
  createCity: () => Promise.resolve(),
  deleteCity: () => Promise.resolve(),
});

interface CitiesProviderProps {
  children: React.ReactNode;
}

const initialState: CitiesContextState = {
  cities: [],
  isLoading: false,
  currentCity: {} as CityModel,
  error: '',
};

function reducer(state: CitiesContextState, action: CitiesContextAction) {
  switch (action.type) {
    case CityActionTypes.loading:
      return {
        ...state,
        isLoading: true,
      };
    case CityActionTypes.loaded:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case CityActionTypes.currentCityLoaded:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case CityActionTypes.rejected:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CityActionTypes.created:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case CityActionTypes.deleted:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    default:
      return state;
  }
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer<
    CitiesContextState,
    any
  >(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: CityActionTypes.loading });
      try {
        const userId = 'keq4NFXZOAaGda2FRpqLE7S73Pj2';
        const querySnapshot = await getDocs(
          collection(firestore, `users/${userId}/cities`)
        );
        dispatch({
          type: CityActionTypes.loaded,
          payload: querySnapshot.docs.map((d) => d.data() as CityModel),
        });
      } catch (error) {
        dispatch({
          type: CityActionTypes.rejected,
          payload: (error as any).message,
        });
        console.log(error);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id: string) {
    dispatch({ type: CityActionTypes.loading });
    try {
      const userId = 'keq4NFXZOAaGda2FRpqLE7S73Pj2';
      const docRef = await getDoc(doc(firestore, `users/${userId}/cities`, id));
      const city = docRef.data() as CityModel;
      dispatch({ type: CityActionTypes.currentCityLoaded, payload: city });
    } catch (error) {
      dispatch({
        type: CityActionTypes.rejected,
        payload: (error as any).message,
      });
      console.log(error);
    }
  }, []);

  async function createCity(city: CityModel) {
    dispatch({ type: CityActionTypes.loading });
    try {
      const userId = 'keq4NFXZOAaGda2FRpqLE7S73Pj2';
      await setDoc(doc(firestore, `users/${userId}/cities`, city.id!), city);
      dispatch({ type: CityActionTypes.created, payload: city });
    } catch (error) {
      dispatch({
        type: CityActionTypes.rejected,
        payload: (error as any).message,
      });
      console.log(error);
    }
  }

  async function deleteCity(cityId: string) {
    dispatch({ type: CityActionTypes.loading });
    try {
      const userId = 'keq4NFXZOAaGda2FRpqLE7S73Pj2';
      deleteDoc(doc(firestore, `users/${userId}/cities`, cityId));
      dispatch({ type: CityActionTypes.deleted, payload: cityId });
    } catch (error) {
      dispatch({
        type: CityActionTypes.rejected,
        payload: (error as any).message,
      });
      console.log(error);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
