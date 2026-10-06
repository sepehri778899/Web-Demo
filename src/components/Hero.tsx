import { siteConfig } from '../config/site';
import type { Project } from '../types/project';
import { ProjectScrollGallery } from './ProjectScrollGallery';

type HeroProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function Hero({ projects, onOpenProject }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="hero page-shell" id="top">
      <div className="hero__copy">
        <h1 className="hero__title" id="hero-title">
          {siteConfig.heroTitle}
        </h1>
        <p className="hero__description">{siteConfig.heroDescription}</p>
      </div>
      {projects.length > 0 ? (
        <ProjectScrollGallery onOpenProject={onOpenProject} projects={projects} />
      ) : (
        <div aria-label="نمونه‌کارها" className="portfolio__empty" id="projects">
          <span aria-hidden="true" className="portfolio__empty-mark">RBD</span>
          <p>پروژه‌ای برای نمایش ثبت نشده است.</p>
          <span>کارهای تازه به‌زودی در همین‌جا قرار می‌گیرند.</span>
        </div>
      )}
    </section>
  );
}
