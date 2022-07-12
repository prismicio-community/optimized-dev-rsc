// 🐔 "If you haven't seen how Suspense works before, this is basically how
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
 * ```ts
 * suspensify(promise).read()
 * ```
 *
 * The `read()` function should be called in the component's top level closure, not within a callback or useEffect().
 *
 * Example:
 *
 * ```ts
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
 *     <button onClick={() => setPromise(suspensify(load()))}>Click me!!!!</button>
 *   )
 * }
 * ```
 */
export const suspensify = (promise) => {
  let status = "pending";

  // 1. Keep track of the Promise's state. The `status` variable will update as
  //    the Promise moves from pending to success or error.
  let result;
  let suspender = promise.then(
    (res) => {
      // On success, update the status to "success"
      status = "success";
      result = res;
    },
    (error) => {
      // On error, update the status to "error"
      status = "error";
      result = error;
    }
  );

  // 2. Return an object with a `read()` method that does one of the following:
  //
  //    a) Returns the Promise's resolved value if it's resolved.
  //    b) Sends a signal to a Suspense Boundary if the Promise is pending.
  //    c) Sends a signal to an Error Boundary if the Promise failed.
  return {
    read() {
      if (status === "pending") {
        // 🐔 "Pending promises are thrown, which are caught by <Suspense /> components."
        throw suspender;
      } else if (status === "error") {
        // 🐔 "Errors are thrown too, but these are caught by Error Boundries."
        throw result;
      } else if (status === "success") {
        // 🐔 "Finally, the promise result is returned once it's resolved."
        return result;
      }
    },
  };
};
