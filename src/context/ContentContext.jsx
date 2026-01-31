import { createContext, useContext, useState, useEffect } from "react";
import strapiService from "../services/strapiService";

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: "all", type: "all" });
  const [searchQuery, setSearchQuery] = useState("");

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await strapiService.loadContent();
      setContent(data);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add content (for future CMS integration)
  const addContent = async (contentData) => {
    console.warn("Add content not yet implemented with Strapi");
    throw new Error("Add content requires admin authentication");
  };

  // Update content (for future CMS integration)
  const updateContent = async (id, updates) => {
    console.warn("Update content not yet implemented with Strapi");
    throw new Error("Update content requires admin authentication");
  };

  // Delete content (for future CMS integration)
  const deleteContent = async (id) => {
    console.warn("Delete content not yet implemented with Strapi");
    throw new Error("Delete content requires admin authentication");
  };

  // Get filtered content
  const getFilteredContent = () => {
    let filtered = [...content];

    // Apply category filter
    if (filter.category !== "all") {
      filtered = strapiService.filterByCategory(filtered, filter.category);
    }

    // Apply type filter
    if (filter.type !== "all") {
      filtered = strapiService.filterByType(filtered, filter.type);
    }

    // Apply search
    if (searchQuery) {
      filtered = strapiService.searchContent(filtered, searchQuery);
    }

    return filtered;
  };

  // Get featured content
  const getFeaturedContent = () => {
    return content.filter((item) => item.featured).slice(0, 5);
  };

  // Get content by ID
  const getContentById = (id) => {
    return content.find((item) => item.id === id);
  };

  const value = {
    content,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addContent,
    updateContent,
    deleteContent,
    getFilteredContent,
    getFeaturedContent,
    getContentById,
    loadContent,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
