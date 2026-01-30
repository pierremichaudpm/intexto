import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useContent } from "../../context/ContentContext";
import cmsService from "../../services/cmsService";
import SEOHead from "../seo/SEOHead";
import StructuredData from "../seo/StructuredData";

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

const ContentModal = ({ content, isOpen, onClose }) => {
  const { content: allContent } = useContent();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const playerRef = useRef(null);

  // Initialize Plyr when modal opens with media
  useEffect(() => {
    if (!isOpen || !content) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    }

    if (content.type === "video" && videoRef.current && content.mediaUrl) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
      });
    } else if (
      content.type === "audio" &&
      audioRef.current &&
      content.mediaUrl
    ) {
      playerRef.current = new Plyr(audioRef.current, {
        controls: ["play", "progress", "current-time", "mute", "volume"],
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isOpen, content]);

  if (!content) return null;

  const { type, title, category, image, excerpt, author, date, mediaUrl } =
    content;

  // Get related stories from curated lineup
  const getRelatedStories = () => {
    // Get featured items in order (curated lineup of 10)
    const featuredLineup = allContent
      .filter((item) => item.featured)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Or use manual order field if you add one

    // Find current article position in lineup
    const currentIndex = featuredLineup.findIndex(
      (item) => item.id === content.id,
    );

    if (currentIndex !== -1) {
      // Get next 5 items from the curated lineup (wrapping around if needed)
      const related = [];
      for (let i = 1; i <= 5; i++) {
        const nextIndex = (currentIndex + i) % featuredLineup.length;
        if (featuredLineup[nextIndex]) {
          related.push(featuredLineup[nextIndex]);
        }
      }
      return related;
    }

    // If not in featured lineup, just show first 5 featured items
    return featuredLineup.slice(0, 5);
  };

  const relatedStories = getRelatedStories();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Social sharing functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = title;

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SEOHead
            title={`${title} | Intexto`}
            description={excerpt}
            image={image}
            type={type === "article" ? "article" : "website"}
            author={author}
            publishedTime={date}
          />
          <StructuredData content={content} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={handleOverlayClick}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="modal-content"
            >
              <button className="modal-close" onClick={onClose}>
                <X size={24} />
              </button>

              <img
                src={image}
                alt={title}
                className="modal-image"
                loading="eager"
              />

              <div className="modal-body">
                <span
                  className="content-card-category"
                  style={{ backgroundColor: categoryColors[category] }}
                >
                  {categoryLabels[category]}
                </span>

                <h1 className="modal-title">{title}</h1>

                <div className="modal-meta">
                  <span>
                    <strong>{author}</strong>
                  </span>
                  <span>{cmsService.formatDate(date)}</span>
                </div>

                {/* Social Sharing Buttons */}
                <div className="modal-share">
                  <div className="modal-share-label">
                    <Share2 size={16} />
                    <span>Partager:</span>
                  </div>
                  <div className="modal-share-buttons">
                    <button
                      className="modal-share-btn facebook"
                      onClick={() => handleShare("facebook")}
                      title="Partager sur Facebook"
                    >
                      <Facebook size={18} />
                    </button>
                    <button
                      className="modal-share-btn twitter"
                      onClick={() => handleShare("twitter")}
                      title="Partager sur Twitter"
                    >
                      <Twitter size={18} />
                    </button>
                    <button
                      className="modal-share-btn linkedin"
                      onClick={() => handleShare("linkedin")}
                      title="Partager sur LinkedIn"
                    >
                      <Linkedin size={18} />
                    </button>
                    <button
                      className="modal-share-btn whatsapp"
                      onClick={() => handleShare("whatsapp")}
                      title="Partager sur WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>

                {type === "video" && mediaUrl && (
                  <div className="modal-media-player">
                    <video ref={videoRef} controls playsInline>
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  </div>
                )}

                {type === "audio" && mediaUrl && (
                  <div className="modal-media-player">
                    <audio ref={audioRef} controls>
                      <source src={mediaUrl} type="audio/mp3" />
                    </audio>
                  </div>
                )}

                <div className="modal-text">{content.content}</div>

                {/* Related Stories */}
                {relatedStories.length > 0 && (
                  <div className="modal-related">
                    <h3 className="modal-related-title">Articles suggérés</h3>
                    <div className="modal-related-grid">
                      {relatedStories.map((story) => (
                        <div
                          key={story.id}
                          className="modal-related-item"
                          onClick={() => {
                            onClose();
                            setTimeout(() => window.location.reload(), 100);
                          }}
                        >
                          <img
                            src={story.image}
                            alt={story.title}
                            className="modal-related-image"
                            loading="lazy"
                          />
                          <div className="modal-related-content">
                            <span
                              className="modal-related-category"
                              style={{
                                backgroundColor: categoryColors[story.category],
                              }}
                            >
                              {categoryLabels[story.category]}
                            </span>
                            <h4 className="modal-related-title-text">
                              {story.title}
                            </h4>
                            <p className="modal-related-meta">{story.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
