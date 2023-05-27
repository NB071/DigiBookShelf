import "./SideShareReading.scss";

// libs
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";

// icons
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
export default function SideShareReading({
  recentBooks,
  token,
}) {
  return (
    <motion.section
      className="side-share-reading"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 0.9 }}
    >
      <h2 className="side-share-reading__heading">Share reading</h2>
      <button className="side-share-reading__CTA" type="button">
        <GroupsRoundedIcon /> Explore
      </button>
    </motion.section>
  );
}
