import { motion } from "framer-motion";

const AdBanner = ({ type = "top" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`ad-banner ad-banner-${type}`}
    >
      <div className="ad-content">
        <p style={{ fontSize: "1.2rem", color: "#dd4f4f", fontWeight: "700" }}>
          EMPLACEMENT PUBLICITAIRE {type === "top" ? "728×90" : "300×250"}
        </p>
      </div>
    </motion.div>
  );
};

export default AdBanner;
