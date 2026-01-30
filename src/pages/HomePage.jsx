import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import HeroSection from "../components/content/HeroSection";
import CategoryFilter from "../components/sections/CategoryFilter";
import MediaSection from "../components/sections/MediaSection";
import ContentCard from "../components/common/ContentCard";
import ContentModal from "../components/common/ContentModal";
import AdBanner from "../components/ads/AdBanner";
import AdBox from "../components/ads/AdBox";
import MagazineWidget from "../components/widgets/MagazineWidget";
import SEOHead from "../components/seo/SEOHead";

const typeFilters = [
  { id: "all", label: "Tous" },
  { id: "article", label: "Articles" },
  { id: "video", label: "Vidéos" },
  { id: "audio", label: "Audio" },
];

const HomePage = () => {
  const { filter, setFilter, getFilteredContent, loading, content } =
    useContent();
  const [selectedContent, setSelectedContent] = useState(null);
  const [displayCount, setDisplayCount] = useState(9);

  const filteredContent = getFilteredContent();
  const displayedContent = filteredContent.slice(0, displayCount);

  // Get all videos and audios for dedicated sections
  const allVideos = content.filter((item) => item.type === "video");
  const allAudios = content.filter((item) => item.type === "audio");

  const handleTypeFilter = (typeId) => {
    setFilter((prev) => ({ ...prev, type: typeId }));
    setDisplayCount(9);
  };

  const handleCategoryFilter = (categoryId) => {
    setFilter((prev) => ({ ...prev, category: categoryId }));
    setDisplayCount(9);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 9);
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <SEOHead />

      {/* Hero Section */}
      <HeroSection onContentClick={handleContentClick} />

      {/* Mobile Ad - Below Hero */}
      <div className="mobile-ad-slot">
        <AdBanner type="top" />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        activeCategory={filter.category}
        onCategoryChange={handleCategoryFilter}
      />

      {/* Main Content with Sidebar */}
      <main className="main-content-wrapper">
        <div className="main-content-grid">
          {/* Content Grid */}
          <div className="content-section">
            <div className="content-grid">
              {displayedContent.map((content, index) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={handleContentClick}
                  delay={index * 0.05}
                />
              ))}
            </div>

            {displayedContent.length === 0 && (
              <div className="no-content">
                <p>Aucun contenu trouvé</p>
              </div>
            )}

            {displayCount < filteredContent.length && (
              <div className="load-more-container">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="load-more-btn"
                  onClick={handleLoadMore}
                >
                  Charger plus d'articles
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ display: "inline-block", marginLeft: "8px" }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Sidebar with Ad and Magazine Widget */}
          <aside className="content-sidebar">
            <AdBox position="sidebar" />
            <MagazineWidget />
            <AdBox position="sidebar-half" />
          </aside>
        </div>
      </main>

      {/* Dedicated Media Section - Audio et Vidéo */}
      <MediaSection
        videos={allVideos}
        audios={allAudios}
        onContentClick={handleContentClick}
      />

      {/* Content Modal */}
      <ContentModal
        content={selectedContent}
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
      />
    </>
  );
};

export default HomePage;
