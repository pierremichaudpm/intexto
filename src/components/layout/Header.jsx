import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Header = ({ onSearchClick, adBanner, hideSearch = false }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="main-header"
    >
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/Images/intextologo.png"
            alt="Intexto Logo"
            className="logo"
          />
        </div>

        {/* Ad banner in center on desktop */}
        <div className="header-ad-slot">{adBanner}</div>

        {!hideSearch && (
          <div className="header-actions">
            <button className="search-btn" onClick={onSearchClick}>
              <Search size={20} />
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
