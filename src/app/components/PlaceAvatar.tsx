import { motion } from "framer-motion";
import { Avatar } from "@radix-ui/themes";
import { forwardRef } from "react";
import { BorderBeam } from "./magicui/border-beam";

interface PlaceAvatarProps {
  position: { x: number; y: number };
  index: number;
}

const PlaceAvatar = forwardRef<HTMLDivElement, PlaceAvatarProps>(
  ({ position, index }, ref) => {
    const placeUrl =
      "https://lh5.googleusercontent.com/p/AF1QipMICgecR9K6cLgvj1MY25MeGp6lKNSBd6rRsSj3=w72-h72-p-k-no-rp-br100";
    const handleClick = () => {
      console.log(`Place ${index + 1} avatar clicked`);
    };
    return (
      <motion.div
        ref={ref}
        className="absolute cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.2 }}
        onClick={handleClick}
        style={{ top: position.y, left: position.x }}
      >
        <BorderBeam size={100} className="h-10 w-10 rounded-full border-2" />
        <Avatar radius="full" src={placeUrl} fallback={`Place ${index + 1}`} />
      </motion.div>
    );
  }
);

export default PlaceAvatar;
