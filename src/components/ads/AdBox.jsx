import { motion } from "framer-motion";

const AdBox = ({ position = "sidebar" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`ad-box ad-box-${position}`}
    >
      <div className="ad-box-content">
        <p style={{ fontSize: "1.2rem", color: "#dd4f4f", fontWeight: "700" }}>
          EMPLACEMENT PUBLICITAIRE 300×600
        </p>
      </div>
    </motion.div>
  );
};

export default AdBox;
