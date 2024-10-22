import api from "./api";
import { Dog, Location, Match } from "../types/breed";

export const DogService = {
  getBreeds: async () => {
    const response = await api.get<string[]>("/dogs/breeds", {
      withCredentials: true,
    });
    return response.data;
  },

  searchDogsInitial: async (params: {
    breed: string[];
    size?: number;
    from?: number;
    sort?: string;
  }) => {
    const response = await api.get<{
      resultIds: string[];
      total: number;
      next?: string;
      prev?: string;
    }>("/dogs/search", {
      data: params,
      withCredentials: true,
    });

    return response.data;
  },

  searchDogsPagination: async (params: {
    size?: number;
    from?: number;
    sort?: string;
    breed?: string;
    zip?: string;
    ageMin?: number;
    ageMax?: number;
  }) => {
    const response = await api.get<{
      resultIds: string[];
      total: number;
      next?: string;
      prev?: string;
      breed?: string;
      zip?: string;
      sort?: string;
      ageMin?: number;
      ageMax?: number;
    }>("/dogs/search", {
      params,
      withCredentials: true,
    });

    return response.data;
  },

  fetchDogsByIds: async (dogIds: string[]) => {
    const response = await api.post<Dog[]>("/dogs", dogIds, {
      withCredentials: true,
    });
    return response.data;
  },

  matchDog: async (dogIds: string[]) => {
    const response = await api.post<Match>("/dogs/match", dogIds, {
      withCredentials: true,
    });
    return response.data;
  },

  fetchLocationsByZipCodes: async (zipCodes: string[]) => {
    const response = await api.post<Location[]>("/locations", zipCodes, {
      withCredentials: true,
    });
    return response.data;
  },

  searchLocations: async (params: {
    city?: string;
    states?: string[];
    geoBoundingBox?: {
      top?: { lat: number; lon: number };
      left?: { lat: number; lon: number };
      bottom?: { lat: number; lon: number };
      right?: { lat: number; lon: number };
      bottom_left?: { lat: number; lon: number };
      top_left?: { lat: number; lon: number };
    };
    size?: number;
    from?: number;
  }) => {
    const response = await api.post<{
      results: Location[];
      total: number;
    }>("/locations/search", params, {
      withCredentials: true,
    });
    return response.data;
  },
};
