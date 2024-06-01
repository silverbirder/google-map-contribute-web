import { motion } from "framer-motion";
import { Avatar } from "@radix-ui/themes";
import { forwardRef } from "react";

interface PlaceAvatarProps {
  position: { x: number; y: number };
  index: number;
}

const PlaceAvatar = forwardRef<HTMLDivElement, PlaceAvatarProps>(
  ({ position, index }, ref) => {
    const placeUrl =
      "https://lh5.googleusercontent.com/p/AF1QipMICgecR9K6cLgvj1MY25MeGp6lKNSBd6rRsSj3=w72-h72-p-k-no-rp-br100";

    return (
      <motion.div
        ref={ref}
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ top: position.y, left: position.x }}
      >
        <Avatar radius="full" src={placeUrl} fallback={`Place ${index + 1}`} />
      </motion.div>
    );
  }
);

export default PlaceAvatar;
