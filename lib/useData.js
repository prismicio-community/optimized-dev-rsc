// import cacache from "cacache";

// const CACHE_DIR = "./node_modules/.cache/optimized-dev-rsc";

// export const suspensify = (promise) => {
//   let status = "pending";
//   let result;
//   let suspender = promise.then(
//     (r) => {
//       status = "success";
//       result = r;
//     },
//     (e) => {
//       status = "error";
//       result = e;
//     }
//   );
//
// return {
//   read() {
//     if (status === "pending") {
//       throw suspender;
//     } else if (status === "error") {
//       throw result;
//     } else if (status === "success") {
//       return result;
//     }
//   },
// };
// };

// export const useData = (key, fetcher) => {
//   if (promiseCache[key]) {
//     return promiseCache;
//   }

//   const promise = cacache.get(CACHE_DIR, key).then((res) => {
//     return JSON.parse(res.data.toString());
//   });

//   throw promise;
// };

// export const __useData = (key, fetcher) => {
//   let data;
//   let error;
//   let promise;

//   if (error !== undefined || data !== undefined) {
//     return { data, error };
//   }

//   if (!promise) {
//     promise = cacache
//       .get(CACHE_DIR, key)
//       .then((res) => {
//         console.log({ data: res.data.toString() });

//         data = JSON.parse(res.data.toString());
//       })
//       // .catch(() => fetcher())
//       // .then((res) => {
//       //   data = res;

//       //   return cacache.put(CACHE_DIR, key, JSON.stringify(data));
//       // })
//       .catch((e) => (error = e));

//     throw promise;
//   }
// };

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
