import { useState, useEffect } from "react";

export const useVisiblePlaces = (placeCount: number) => {
  const [visiblePlaces, setVisiblePlaces] = useState<number>(0);

  useEffect(() => {
    if (visiblePlaces < placeCount) {
      const timeout = setTimeout(() => {
        setVisiblePlaces((prev) => prev + 1);
      }, 500); // Adjust the delay between places as needed
      return () => clearTimeout(timeout);
    }
  }, [visiblePlaces, placeCount]);

  return visiblePlaces;
};
