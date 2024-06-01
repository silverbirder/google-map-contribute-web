import { motion } from "framer-motion";
import { Avatar } from "@radix-ui/themes";
import { forwardRef } from "react";

const ContributorAvatar = forwardRef<HTMLDivElement>((_, ref) => {
  const contributorUrl =
    "https://lh3.googleusercontent.com/a/ACg8ocLeQGLmPuxu9fYa4_s7VKUEzQ8Zp-rb8rbHGcNsvm3wufpgptYwEg=w72-h72-p-rp-mo-ba6-br100";

  return (
    <motion.div
      ref={ref}
      className="absolute"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <Avatar radius="full" src={contributorUrl} fallback="Contributor" />
    </motion.div>
  );
});

export default ContributorAvatar;
