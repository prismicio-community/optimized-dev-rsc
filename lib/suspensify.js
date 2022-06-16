// 🐔 "If you haven't seen how Suspense works before, this is how basically how
//     libraries include Suspense support. Check out my notes below."
//
//    "You'll probably end up using this in `SaveButton.client.js`."

/**
 * A helper function that converts a Promise into a "Suspense"-supported
 * promise. It uses Suspense's throw-based API to manage pending, success, and
 * error states of the Promise.
 *
 * Example:
 *
 * ```
 * suspensify(promise).read()
 * ```
 *
 * The `read()` function should be called in the component's top level closure, not within a callback or useEffect().
 *
 * Example:
 *
 * ```
 * const SomeButton = () => {
 *   const [promise, setPromise] = useState()
 *
 *   if (promise) {
 *     promise.read()
 *   }
 *
 *   const load = async () => { return "Do something here" }
 *
 *   return (
 *     <button onClick={() => setPromise(load())}>Click me!!!!</button>
 *   )
 * }
 * ```
 */
export const suspensify = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender; // 🐔 "Pending promises are thrown, which are caught by <Suspense /> components."
      } else if (status === "error") {
        throw result; // 🐔 "Errors are thrown too, but these are caught by Error Boundries."
      } else if (status === "success") {
        return result; // 🐔 "Finally, the promise result is returned once it's resolved."
      }
    },
  };
};
