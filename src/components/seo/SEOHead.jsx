import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "Intexto - Journal haïtien à Montréal",
  description = "Intexto est le journal de référence de la communauté haïtienne à Montréal. Actualités, politique, culture, et événements.",
  keywords = "intexto, journal haïtien, communauté haïtienne, Montréal, actualités, politique, culture",
  image = "https://intexto.ca/Images/intextologo.png",
  url = "https://intexto.ca",
  type = "website",
  author = "Rédaction Intexto",
  publishedTime,
  modifiedTime,
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Intexto" />
      <meta property="og:locale" content="fr_CA" />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEOHead;
