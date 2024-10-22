interface Options {
    breed: string;
    size: number;
    from: number;
    order: string;
    zipCode: string;
    ageMin: number;
    ageMax: number;
  }
  
  export const filterProcessor = (
    dogsQuery: any,
    options: Options,
    setOptions: (options: Options) => void,
    filteredValue: string | number | null,
    key: keyof Options
  ) => {
    if (dogsQuery.data?.next) {
      const { size, from, breed, zip, sort, ageMax, ageMin } = extractSizeAndFrom(dogsQuery.data.next);
  
      setOptions({
        size,
        from,
        breed: key === 'breed' ? (filteredValue as string) : breed || options.breed,
        zipCode: key === 'zipCode' ? (filteredValue as string) : zip || options.zipCode,
        order: key === 'order' ? (filteredValue as string) : sort || options.order,
        ageMin: key === 'ageMin' ? (typeof filteredValue === 'number' ? filteredValue : options.ageMin) : ageMin || options.ageMin,
        ageMax: key === 'ageMax' ? (typeof filteredValue === 'number' ? filteredValue : options.ageMax) : ageMax || options.ageMax,
      });
    }
  };
  
  const extractSizeAndFrom = (url: string) => {
    const params = new URLSearchParams(url.split('?')[1]);
    return {
      size: Number(params.get('size')) || 0,
      from: Number(params.get('from')) || 0,
      breed: params.get('breed') || "",
      sort: params.get('sort') || "",
      zip: params.get('zip') || "",
      ageMin: Number(params.get('ageMin')) || 0,
      ageMax: Number(params.get('ageMax')) || 0,
    };
  };
  