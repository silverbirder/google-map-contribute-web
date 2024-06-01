import { useState, useEffect, RefObject } from "react";

const radius = 150;

export const usePositions = (
  placeRefs: RefObject<HTMLDivElement>[],
  containerRef: RefObject<HTMLDivElement>,
  contributorRef: RefObject<HTMLDivElement>
) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (containerRef.current && contributorRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contributorRect = contributorRef.current.getBoundingClientRect();

      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const newPositions = placeRefs.map((ref, index) => {
        const angle = (index / placeRefs.length) * 2 * Math.PI;
        const x =
          centerX + radius * Math.cos(angle) - contributorRect.width / 2;
        const y =
          centerY + radius * Math.sin(angle) - contributorRect.height / 2;
        return { x, y };
      });

      setPositions(newPositions);
    }
  }, [containerRef, contributorRef, placeRefs]);

  return positions;
};
