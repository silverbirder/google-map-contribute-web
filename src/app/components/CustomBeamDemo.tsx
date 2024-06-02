"use client";

import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import ContributorAvatar from "@/components/ContributorAvatar";
import PlaceAvatar from "@/components/PlaceAvatar";
import { usePositions } from "@/hooks/usePositions";
import { useVisiblePlaces } from "@/hooks/useVisiblePlaces";

const CustomBeamDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contributorRef = useRef<HTMLDivElement>(null);
  const placeRefs = useRef(
    Array.from({ length: 20 }, () => useRef<HTMLDivElement>(null))
  );
  const positions = usePositions({
    containerRef,
    centerRef: contributorRef,
    surroundingRefs: placeRefs.current,
  });
  const visiblePlaces = useVisiblePlaces(placeRefs.current.length);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full h-screen items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
    >
      <ContributorAvatar
        ref={contributorRef}
        position={{ x: "50%", y: "50%" }}
      />
      {positions.map((position, index) => (
        <AnimatePresence key={index}>
          {index < visiblePlaces && (
            <PlaceAvatar
              ref={placeRefs.current[index]}
              position={position}
              index={index}
            />
          )}
        </AnimatePresence>
      ))}
      {positions.map((position, index) => (
        <AnimatePresence key={`beam-${index}`}>
          {index < visiblePlaces && (
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={contributorRef}
              toRef={placeRefs.current[index]}
              reverse={position.x < 300}
            />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

export default CustomBeamDemo;
