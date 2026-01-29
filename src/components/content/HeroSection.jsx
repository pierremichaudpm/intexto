import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "../../context/ContentContext";
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

const HeroSection = ({ onContentClick }) => {
  const { getFilteredContent } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  const allContent = getFilteredContent();
  const articles = allContent
    .filter((item) => item.type === "article" && item.featured)
    .slice(0, 3);
  const videos = allContent.filter((item) => item.type === "video");
  const audios = allContent.filter((item) => item.type === "audio");

  const featuredVideo = videos.length > 0 ? videos[0] : null;
  const featuredAudio = audios.length > 0 ? audios[0] : null;

  useEffect(() => {
    if (articles.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [articles.length]);

  const paginate = (newDirection) => {
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return articles.length - 1;
      if (next >= articles.length) return 0;
      return next;
    });
  };

  if (articles.length === 0) return null;

  const current = articles[currentIndex];

  return (
    <section className="hero-section-new">
      <div className="hero-container-new">
        {/* Main Carousel */}
        <div className="hero-main-carousel">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="hero-main-slide"
              onClick={() => onContentClick(current)}
            >
              <div className="hero-main-image-wrapper">
                <img
                  src={current.image}
                  alt={current.title}
                  className="hero-main-image"
                />
                <div className="hero-main-gradient" />
              </div>

              <div className="hero-main-content">
                <span
                  className="hero-main-category"
                  style={{ backgroundColor: categoryColors[current.category] }}
                >
                  {categoryLabels[current.category]}
                </span>
                <h2 className="hero-main-title">{current.title}</h2>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            className="hero-nav-btn hero-nav-left"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="hero-nav-btn hero-nav-right"
            onClick={() => paginate(1)}
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="hero-dots">
            {articles.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Side Content: Video + Audio */}
        <div className="hero-side-articles">
          {/* Video */}
          {featuredVideo && (
            <div
              className="hero-side-card"
              onClick={() => onContentClick(featuredVideo)}
            >
              <div className="hero-side-image-wrapper">
                <img
                  src={featuredVideo.image}
                  alt={featuredVideo.title}
                  className="hero-side-image"
                />
                <div className="hero-side-gradient" />
                <div className="hero-side-media-badge">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="hero-side-content">
                <span className="hero-side-category">VIDÉO</span>
                <h3 className="hero-side-title">{featuredVideo.title}</h3>
                <div className="hero-side-meta">
                  <span>{featuredVideo.author}</span>
                  <span>•</span>
                  <span>{cmsService.formatDate(featuredVideo.date)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Audio */}
          {featuredAudio && (
            <div
              className="hero-side-card"
              onClick={() => onContentClick(featuredAudio)}
            >
              <div className="hero-side-image-wrapper">
                <img
                  src={featuredAudio.image}
                  alt={featuredAudio.title}
                  className="hero-side-image"
                />
                <div className="hero-side-gradient" />
                <div className="hero-side-media-badge">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </div>
              </div>
              <div className="hero-side-content">
                <span className="hero-side-category">AUDIO</span>
                <h3 className="hero-side-title">{featuredAudio.title}</h3>
                <div className="hero-side-meta">
                  <span>{featuredAudio.author}</span>
                  <span>•</span>
                  <span>{cmsService.formatDate(featuredAudio.date)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
