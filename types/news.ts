import { PortableTextBlock } from "sanity";

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: Author;
  mainImage?: SanityImage;
  category: string;
  publishedAt: string;
  body: PortableTextBlock[];
  isBreaking?: boolean;
}