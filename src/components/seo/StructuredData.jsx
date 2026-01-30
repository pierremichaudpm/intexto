import { Helmet } from "react-helmet-async";

const StructuredData = ({ content }) => {
  if (!content) return null;

  const { type, title, excerpt, image, author, date, category } = content;

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": type === "video" ? "VideoObject" : type === "audio" ? "AudioObject" : "NewsArticle",
    "headline": title,
    "description": excerpt,
    "image": [image],
    "datePublished": date,
    "dateModified": date,
    "author": [{
      "@type": "Person",
      "name": author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Intexto",
      "logo": {
        "@type": "ImageObject",
        "url": "https://intexto.ca/Images/intextologo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://intexto.ca/${type}/${content.id}`
    }
  };

  // Add video-specific properties
  if (type === "video" && content.mediaUrl) {
    articleSchema.contentUrl = content.mediaUrl;
    articleSchema.uploadDate = date;
  }

  // Add audio-specific properties
  if (type === "audio" && content.mediaUrl) {
    articleSchema.contentUrl = content.mediaUrl;
  }

  // Organization schema for the site
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Intexto",
    "url": "https://intexto.ca",
    "logo": "https://intexto.ca/Images/intextologo.png",
    "description": "Journal haïtien à Montréal - Actualités, politique, culture et événements de la communauté haïtienne",
    "sameAs": [
      "https://www.facebook.com/intexto",
      "https://twitter.com/intexto",
      "https://www.instagram.com/intexto"
    ]
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://intexto.ca"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": category.charAt(0).toUpperCase() + category.slice(1),
      "item": `https://intexto.ca/categorie/${category}`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": title
    }]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
