import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "Tout" },
  { id: "politique", label: "Politique" },
  { id: "actualite", label: "Actualité" },
  { id: "culture", label: "Culture" },
  { id: "economie", label: "Économie" },
  { id: "immigration", label: "Immigration" },
  { id: "sports", label: "Sports" },
  { id: "sante", label: "Santé" },
  { id: "opinion", label: "Opinion" },
  { id: "emploi", label: "Emploi" },
  { id: "communaute", label: "Communauté" },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <div className="category-filter-container">
        <img
          src="/Images/intextologo2.png"
          alt="Intexto"
          className="category-filter-logo"
        />
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
