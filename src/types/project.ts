export type Project = {
  id: string;
  slug: string;
  title: string;
  titleFa: string;
  category: string;
  year: string | null;
  coverImage: string;
  showcaseImage: string;
  desktopImage: string;
  mobileImage?: string;
  imageAlt: string;
  description: string;
  technologies: string[];
  demoUrl: string | null;
  order: number;
}
