import { motion, AnimatePresence } from "framer-motion";

const Cloud = ({ delay, xPosition, yPosition, scale }: any) => (
  <motion.svg
    initial={{ x: "-100vw", opacity: 0.8 }}
    animate={{ x: "100vw" }}
    transition={{ duration: 60, repeat: Infinity, delay, ease: "linear" }}
    className="absolute"
    width="120"
    height="70"
    viewBox="0 0 64 32"
    style={{ top: `${yPosition}%`, left: `${xPosition}%`, scale }}
  >
    <path
      fill="white"
      d="M20 10a6 6 0 0 1 12 0h2a4 4 0 0 1 8 0h2a6 6 0 0 1 0 12H20a6 6 0 1 1 0-12z"
    />
  </motion.svg>
);

export default Cloud;
