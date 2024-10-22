export interface Options {
    breed: string;
    size: number;
    from: number;
    order: string;
    zipCode: string;
    ageMin: number;
    ageMax: number;
  }
  
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
  
  export const paginationProcessor = (
    dogsQuery: any,
    options: Options,
    setOptions: (options: Options) => void
  ) => {
    if (dogsQuery.data?.next) {
      const { size, from, breed, zip, sort, ageMax, ageMin } = extractSizeAndFrom(dogsQuery.data.next);
  
      setOptions({
        size,
        from,
        breed: breed || options.breed,
        zipCode: zip || options.zipCode,
        order: sort || options.order,
        ageMin: ageMin || options.ageMin,
        ageMax: ageMax || options.ageMax,
      });
    }
  };
  