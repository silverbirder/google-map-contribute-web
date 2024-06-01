import { motion } from "framer-motion";
import { Avatar } from "@radix-ui/themes";
import { BorderBeam } from "@/components/magicui/border-beam";
import { forwardRef } from "react";

const ContributorAvatar = forwardRef<HTMLDivElement>((_, ref) => {
  const contributorUrl =
    "https://lh3.googleusercontent.com/a/ACg8ocLeQGLmPuxu9fYa4_s7VKUEzQ8Zp-rb8rbHGcNsvm3wufpgptYwEg=w72-h72-p-rp-mo-ba6-br100";

  const handleClick = () => {
    console.log("Contributor avatar clicked");
  };

  return (
    <motion.div
      ref={ref}
      className="absolute flex items-center justify-center cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.2 }}
      onClick={handleClick}
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <BorderBeam size={100} className="h-10 w-10 rounded-full border-2" />
      <Avatar radius="full" src={contributorUrl} fallback="Contributor" />
    </motion.div>
  );
});

export default ContributorAvatar;
