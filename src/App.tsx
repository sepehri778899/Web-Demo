import { useEffect, useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCardsRow } from './components/ProjectCardsRow';
import { ProjectOverlay } from './components/ProjectOverlay';
import { ProjectShowcaseGrid } from './components/ProjectShowcaseGrid';
import { projects } from './data/projects';
import { siteConfig } from './config/site';
import type { Project } from './types/project';

function usePageMetadata() {
  useEffect(() => {
    document.title = siteConfig.title;
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';

    const setMeta = (selector: string, content: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    };

    setMeta('meta[name="description"]', siteConfig.description);
    setMeta('meta[property="og:title"]', siteConfig.title);
    setMeta('meta[property="og:description"]', siteConfig.description);
    setMeta('meta[name="twitter:title"]', siteConfig.title);
    setMeta('meta[name="twitter:description"]', siteConfig.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let openGraphUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (siteConfig.siteUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = siteConfig.siteUrl;
      if (!openGraphUrl) {
        openGraphUrl = document.createElement('meta');
        openGraphUrl.setAttribute('property', 'og:url');
        document.head.append(openGraphUrl);
      }
      openGraphUrl.content = siteConfig.siteUrl;
    } else {
      canonical?.remove();
      openGraphUrl?.remove();
    }
  }, []);
}

export default function App() {
  usePageMetadata();
  const orderedProjects = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    [],
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
      <Header />
      <main id="main">
        <Hero
          onOpenProject={setSelectedProject}
          projects={orderedProjects}
        />
        <ProjectShowcaseGrid
          onOpenProject={setSelectedProject}
          projects={orderedProjects}
        />
        <ProjectCardsRow
          onOpenProject={setSelectedProject}
          projects={orderedProjects}
        />
      </main>
      <Footer />
      {selectedProject ? (
        <ProjectOverlay
          key={selectedProject.id}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      ) : null}
    </>
  );
}
