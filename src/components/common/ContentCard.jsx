import { motion } from "framer-motion";
import { Video, Headphones } from "lucide-react";
import cmsService from "../../services/cmsService";

const categoryColors = {
  actualite: "#0f0600",
  politique: "#dd4f4f",
  voyage: "#dd9933",
  culture: "#008bff",
};

const categoryLabels = {
  actualite: "Actualité",
  politique: "Politique",
  voyage: "Voyage",
  culture: "Culture",
};

const ContentCard = ({ content, onClick, delay = 0 }) => {
  const { type, title, category, image, excerpt, author, date } = content;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="content-card"
      data-type={type}
      onClick={() => onClick(content)}
    >
      <div className="content-card-image-wrapper">
        <img
          src={image}
          alt={title}
          className="content-card-image"
          loading="lazy"
        />
        {type === "video" && (
          <div className="content-card-media-icon">
            <Video size={24} />
          </div>
        )}
        {type === "audio" && (
          <div className="content-card-media-icon">
            <Headphones size={24} />
          </div>
        )}
      </div>

      <div className="content-card-body">
        <span
          className="content-card-category"
          style={{ backgroundColor: categoryColors[category] }}
        >
          {categoryLabels[category]}
        </span>

        <h3 className="content-card-title">{title}</h3>
        <p className="content-card-excerpt">{excerpt}</p>

        <div className="content-card-footer">
          <span className="content-card-author">{author}</span>
          <span className="content-card-date">
            {cmsService.formatDate(date)}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ContentCard;
