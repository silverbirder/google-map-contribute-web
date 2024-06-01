import { useState, useEffect, RefObject } from "react";

const radius = 150;

export const usePositions = ({
  surroundingRefs,
  containerRef,
  centerRef,
}: {
  surroundingRefs: RefObject<HTMLDivElement>[];
  containerRef: RefObject<HTMLDivElement>;
  centerRef: RefObject<HTMLDivElement>;
}) => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (containerRef.current && centerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();

      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      const newPositions = surroundingRefs.map((ref, index) => {
        const angle = (index / surroundingRefs.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - centerRect.width / 2;
        const y = centerY + radius * Math.sin(angle) - centerRect.height / 2;
        return { x, y };
      });

      setPositions(newPositions);
    }
  }, [containerRef, centerRef, surroundingRefs]);

  return positions;
};
