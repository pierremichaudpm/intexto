/**
 * Strapi API Service
 * Handles all communication with Strapi CMS backend
 */

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

class StrapiService {
  constructor() {
    this.apiUrl = API_URL;
  }

  /**
   * Fetch all content (articles, videos, audios) with populated relations
   */
  async loadContent() {
    try {
      const [articles, videos, audios] = await Promise.all([
        this.fetchArticles(),
        this.fetchVideos(),
        this.fetchAudios(),
      ]);

      // Combine all content
      const allContent = [
        ...articles.map(a => ({ ...a, type: 'article' })),
        ...videos.map(v => ({ ...v, type: 'video' })),
        ...audios.map(a => ({ ...a, type: 'audio' })),
      ];

      // Sort by published date (newest first)
      return allContent.sort((a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt)
      );
    } catch (error) {
      console.error('Error loading content from Strapi:', error);
      return [];
    }
  }

  /**
   * Fetch articles with category populated
   */
  async fetchArticles() {
    try {
      const response = await fetch(`${this.apiUrl}/api/articles?populate=category`);
      const data = await response.json();
      return data.data.map(item => this.transformArticle(item));
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  /**
   * Fetch videos with category populated
   */
  async fetchVideos() {
    try {
      const response = await fetch(`${this.apiUrl}/api/videos?populate=category`);
      const data = await response.json();
      return data.data.map(item => this.transformVideo(item));
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }

  /**
   * Fetch audios with category populated
   */
  async fetchAudios() {
    try {
      const response = await fetch(`${this.apiUrl}/api/audios?populate=category`);
      const data = await response.json();
      return data.data.map(item => this.transformAudio(item));
    } catch (error) {
      console.error('Error fetching audios:', error);
      return [];
    }
  }

  /**
   * Fetch categories
   */
  async fetchCategories() {
    try {
      const response = await fetch(`${this.apiUrl}/api/categories`);
      const data = await response.json();
      return data.data.map(cat => ({
        id: cat.documentId,
        name: cat.name,
        slug: cat.slug,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Transform Strapi article to app format
   */
  transformArticle(item) {
    return {
      id: item.documentId,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category?.slug || 'actualite',
      author: item.author || 'Rédaction Intexto',
      date: item.publishedAt || item.createdAt,
      featured: item.featured || false,
      image: item.image?.url ? `${this.apiUrl}${item.image.url}` : this.getPlaceholderImage('article'),
      readTime: item.readTime || '5 min',
      tags: item.tags || [],
    };
  }

  /**
   * Transform Strapi video to app format
   */
  transformVideo(item) {
    return {
      id: item.documentId,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      description: item.description,
      category: item.category?.slug || 'actualite',
      author: item.author || 'Équipe Vidéo Intexto',
      date: item.publishedAt || item.createdAt,
      featured: item.featured || false,
      image: item.thumbnail?.url ? `${this.apiUrl}${item.thumbnail.url}` : this.getPlaceholderImage('video'),
      videoUrl: item.videoUrl,
      duration: item.duration || '10 min',
      tags: item.tags || [],
    };
  }

  /**
   * Transform Strapi audio to app format
   */
  transformAudio(item) {
    return {
      id: item.documentId,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      description: item.description,
      category: item.category?.slug || 'actualite',
      author: item.author || 'Équipe Podcast Intexto',
      date: item.publishedAt || item.createdAt,
      featured: item.featured || false,
      image: item.coverImage?.url ? `${this.apiUrl}${item.coverImage.url}` : this.getPlaceholderImage('audio'),
      audioUrl: item.audioUrl,
      duration: item.duration || '30 min',
      tags: item.tags || [],
    };
  }

  /**
   * Get placeholder image based on content type
   */
  getPlaceholderImage(type) {
    const placeholders = {
      article: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      video: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      audio: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
    };
    return placeholders[type] || placeholders.article;
  }

  /**
   * Filter content by category
   */
  filterByCategory(content, category) {
    if (category === 'all') return content;
    return content.filter(item => item.category === category);
  }

  /**
   * Filter content by type
   */
  filterByType(content, type) {
    if (type === 'all') return content;
    return content.filter(item => item.type === type);
  }

  /**
   * Search content
   */
  searchContent(content, query) {
    if (!query) return content;
    const lowerQuery = query.toLowerCase();
    return content.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.excerpt.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export default new StrapiService();
