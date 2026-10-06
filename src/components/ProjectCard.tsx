import type { Project } from '../types/project';
import { ProjectImage } from './ProjectImage';
import { Reveal } from './Reveal';

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <Reveal className="project-card" delay={index * 80}>
      <article>
        <button
          aria-label={`${project.titleFa}؛ نمایش جزئیات پروژه`}
          className="project-card__preview"
          onClick={() => onOpen(project)}
          type="button"
        >
          <span className="project-card__image-wrap">
            <ProjectImage
              alt={project.imageAlt}
              className="project-card__image"
              loading="lazy"
              src={project.coverImage}
            />
          </span>
          <span aria-hidden="true" className="project-card__veil" />
          <span className="project-card__caption">
            <bdi className="latin project-card__english" dir="ltr">{project.title}</bdi>
          </span>
        </button>
      </article>
    </Reveal>
  );
}
