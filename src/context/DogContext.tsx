import React, { createContext, useContext, useState } from 'react';

interface Dog {
  id: string;
  name: string;
  img: string;
  age?: string;
  zip_code?: string;
  breed?: string;
}

interface DogOptions {
  breed: string;
  zipCode: string;
  order: string;
  size: number;
  from: number;
  ageMin: number;
  ageMax: number;
}

interface DogContextType {
  selectedDog: Dog | null;
  setSelectedDog: (dog: Dog | null) => void;
  options: DogOptions;
  setOptions: React.Dispatch<React.SetStateAction<DogOptions>>; 
}

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [options, setOptions] = useState<DogOptions>({
    breed: "",
    zipCode: "Zip",
    order: "breed:asc",
    size: 10,
    from: 0,
    ageMin: 0,
    ageMax: 0,
  });

  return (
    <DogContext.Provider value={{ selectedDog, setSelectedDog, options, setOptions }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error("useDogContext must be used within a DogProvider");
  }
  return context;
};
