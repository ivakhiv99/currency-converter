import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// const useDebounce = <T>(value: T, callback: (data: T) => void, delay?: number): T => {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const timer = setTimeout(() => { setDebouncedValue(value); callback(value) }, delay || 500);

//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return debouncedValue;
// };

export default useDebounce;
