const cache = {};

export const useData = (key, fetcher) => {
  if (!cache[key]) {
    let data;
    let error;
    let promise;

    cache[key] = () => {
      if (error !== undefined || data !== undefined) {
        return { data, error };
      }

      if (!promise) {
        promise = fetcher()
          .then((res) => (data = res))
          .catch((e) => (error = e));
      }

      throw promise;
    };
  }

  return cache[key]();
};
