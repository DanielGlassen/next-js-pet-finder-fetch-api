import React, { useState } from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Select from "../../components/ui/select/select";
import Button from "../../components/ui/button/button";
import { ASC, DESC, LeftArrow, RightArrow } from "../../assets/svg";
import { useQuery } from "@tanstack/react-query";
import { DogService } from "../../service/breed.service";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import Loader from "../../components/ui/loader/loader";
import UserLogItem from "../../components/userLog/userLogItem";
import Link from "next/link";
import { useDogContext } from '../../context/DogContext';
import { uniqueAgeGroups } from '../../utils/getAge';
import { filterProcessor } from '../../utils/filterProcessor';
import { paginationProcessor } from '../../utils/paginationProcessor';

const Breeds: NextPage = () => {
  const { options, setOptions, setSelectedDog } = useDogContext();
  const [dogIds, setDogIds] = useState<string[]>([]);

  const breedsOptions = useQuery<string[]>({
    queryKey: ["breedsOptions"],
    queryFn: DogService.getBreeds,
  });

  const dogsQuery = useQuery({
    queryKey: ["searchDogs", options],
    queryFn: async () => {
      const params = {
        breed: options.breed ? [options.breed] : [],
        size: options.size,
        from: options.from,
        sort: options.order,
        zip: options.zipCode === "Zip" ? "" : options.zipCode,
        ageMin: options.ageMin,
        ageMax: options.ageMax,
      };

      const result = options.from === 0
        ? await DogService.searchDogsInitial(params)
        : await DogService.searchDogsPagination({
            size: options.size,
            from: options.from,
            breed: options.breed,
            zip: options.zipCode,
            sort: options.order,
            ageMin: options.ageMin,
            ageMax: options.ageMax,
          });

      setDogIds(result.resultIds);
      return result;
    },
    enabled: !!breedsOptions.data,
  });

  const dogDetailsQuery = useQuery<any[]>({
    queryKey: ["dogDetails", dogIds],
    queryFn: () => {
      if (dogIds.length > 0) {
        return DogService.fetchDogsByIds(dogIds);
      }
      return Promise.resolve([]);
    },
    enabled: dogIds.length > 0,
  });

  const isLoading = breedsOptions.isLoading || dogsQuery.isLoading || dogDetailsQuery.isLoading;

  const handleNext = () => {
    paginationProcessor(dogsQuery, options, setOptions);
  };

  const handlePrev = () => {
    paginationProcessor(dogsQuery, options, setOptions);
  };

  const handleBreed = (filteredBreed: string) => {
    filterProcessor(dogsQuery, options, setOptions, filteredBreed, 'breed');
  };

  const handleZip = (filteredZip: string) => {
    filterProcessor(dogsQuery, options, setOptions, filteredZip, 'zipCode');
  };

  const handleOrderChange = (filteredSort: string) => {
    filterProcessor(dogsQuery, options, setOptions, filteredSort, 'order');
  };

  const handleMinAge = (minAge: string) => {
    const minAgeNumber = Number(minAge) > options.ageMax ? 0 : Number(minAge);
    filterProcessor(dogsQuery, options, setOptions, minAgeNumber, 'ageMin');
  };

  const handleMaxAge = (maxAge: string) => {
    const maxAgeNumber = Number(maxAge) < options.ageMin ? 20 : Number(maxAge);
    filterProcessor(dogsQuery, options, setOptions, maxAgeNumber, 'ageMax');
  };

  return (
    <Container>
      <ContainerHeader className="flex-wrap">
        <Select
          value={options.breed}
          onChange={(e) => handleBreed(e.target.value)}
          className="flex-1 sm:min-w-full"
          disabled={isLoading}
        >
          <option value="">All Breeds</option>
          {breedsOptions.data?.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </Select>

        <Select
          value={options.zipCode}
          onChange={(e) => handleZip(e.target.value)}
          className="flex-2"
          disabled={isLoading}
        >
          <option value={options.zipCode}>{options.zipCode}</option>
          {dogDetailsQuery.data?.length ? dogDetailsQuery.data.map((dog) => (
            <option key={dog.zip_code} value={dog.zip_code}>{dog.zip_code}</option>
          )) : (
            <option disabled>No items found</option>
          )}
        </Select>

        {options.ageMax ? (
          <Select
            value={options.ageMin}
            onChange={(e) => handleMinAge(e.target.value)}
            className="flex-2"
            disabled={isLoading}
          >
            <option value={options.ageMin}>{options.ageMin || "Age min"}</option>
            {uniqueAgeGroups.map((age) => (
              <option key={age} value={age}>{age}</option>
            ))}
          </Select>
        ) : null}

        <Select
          value={options.ageMax}
          onChange={(e) => handleMaxAge(e.target.value)}
          className="flex-2"
          disabled={isLoading}
        >
          <option value={options.ageMax}>{options.ageMax || "Age limit"}</option>
          {uniqueAgeGroups.map((age) => (
            <option key={age} value={age}>{age}</option>
          ))}
        </Select>

        <Button className="h-[40px]" variant="gray" onClick={() => handleOrderChange("breed:desc")} disabled={isLoading}>
          <DESC />
        </Button>

        <Button className="h-[40px]" variant="gray" onClick={() => handleOrderChange("breed:asc")} disabled={isLoading}>
          <ASC />
        </Button>

        <Button className="h-[40px]" variant="gray" onClick={handlePrev} disabled={isLoading || options.from === 0}>
          <LeftArrow />
        </Button>

        <Button className="h-[40px]" variant="gray" onClick={handleNext} disabled={isLoading || !dogsQuery.data?.next}>
          <RightArrow />
        </Button>
      </ContainerHeader>

      {isLoading ? (
        <Loader centered />
      ) : dogDetailsQuery.data?.length ? (
        <Grid className="mt-[20px] w-full">
          {dogDetailsQuery.data.map((dog) => (
            <Link key={dog.id} href={`/breeds/${dog.id}`} passHref>
              <GridItem component="a" title={dog.name} onClick={() => setSelectedDog(dog)}>
                <img src={dog.img} alt={dog.name} />
              </GridItem>
            </Link>
          ))}
        </Grid>
      ) : (
        <UserLogItem className="mt-[20px]" text="No items found" />
      )}
    </Container>
  );
};

export default Breeds;
