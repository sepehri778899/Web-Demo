import { useState, type CSSProperties } from 'react';
import type { Project } from '../types/project';

type ProjectScrollGalleryProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function ProjectScrollGallery({ projects, onOpenProject }: ProjectScrollGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderCard = (
    project: Project,
    index: number,
    variant: 'desktop' | 'marquee',
    duplicate = false,
  ) => {
    const isActive = hoveredIndex === index;
    const isDimmed = hoveredIndex !== null && !isActive;
    const distanceFromMiddle = Math.abs(index - Math.floor(projects.length / 2));
    const staggerHeight = Math.max(36, 96 - distanceFromMiddle * 14);
    const lift = -staggerHeight + (isActive ? 16 : 0);
    const style = {
      zIndex: isActive ? projects.length + 1 : projects.length - index,
      '--gallery-lift': `${lift}px`,
      '--gallery-rotation': '-32deg',
      '--gallery-scale': isActive ? '1.1' : isDimmed ? '0.65' : '1',
    } as CSSProperties;

    return (
      <button
        aria-label={`${project.title}، ${project.titleFa}؛ نمایش جزئیات پروژه`}
        className={variant === 'desktop' ? 'archive-gallery__card' : 'archive-gallery__marquee-card'}
        key={`${variant}-${duplicate ? 'copy-' : ''}${project.id}`}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget;
          if (!(nextTarget instanceof Node) || !event.currentTarget.parentElement?.contains(nextTarget)) {
            setHoveredIndex(null);
          }
        }}
        onClick={() => onOpenProject(project)}
        onFocus={variant === 'desktop' ? () => setHoveredIndex(index) : undefined}
        onPointerEnter={variant === 'desktop' ? () => setHoveredIndex(index) : undefined}
        style={variant === 'desktop' ? style : undefined}
        tabIndex={duplicate ? -1 : undefined}
        type="button"
      >
        <img alt="" decoding="async" loading="lazy" src={project.coverImage} />
        <span aria-hidden="true" className="archive-gallery__site-name">{project.title}</span>
      </button>
    );
  };

  return (
    <section aria-label="نمونه‌کارها" className="archive-gallery" id="projects">
      <div
        aria-label="گالری سه‌بعدی پروژه‌ها؛ برای برجسته‌کردن هر کارت روی آن بروید"
        className="archive-gallery__desktop"
        onPointerLeave={() => setHoveredIndex(null)}
        role="group"
      >
        <div className="archive-gallery__desktop-track" dir="ltr">
          {projects.map((project, index) => renderCard(project, index, 'desktop'))}
        </div>
      </div>

      <div aria-label="گالری متحرک وب‌سایت‌ها" className="archive-gallery__mobile" role="group">
        <div className="archive-gallery__marquee-track" dir="ltr">
          <div className="archive-gallery__marquee-set">
            {projects.map((project, index) => renderCard(project, index, 'marquee'))}
          </div>
          <div aria-hidden="true" className="archive-gallery__marquee-set">
            {projects.map((project, index) => renderCard(project, index, 'marquee', true))}
          </div>
        </div>
      </div>
    </section>
  );
}
