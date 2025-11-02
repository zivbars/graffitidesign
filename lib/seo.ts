import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const generateSEO = ({
  title,
  description,
  image = '/og-image.jpg',
  url,
}: SEOProps): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url,
      type: 'website',
      locale: 'he_IL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};

