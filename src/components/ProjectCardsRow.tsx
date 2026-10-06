import type { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';

type ProjectCardsRowProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function ProjectCardsRow({ projects, onOpenProject }: ProjectCardsRowProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="وب‌سایت‌های شرکت رای بان داده" className="project-grid-section page-shell">
      <div className="project-grid">
        <div className="project-gallery__row" dir="ltr">
          {projects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.id}
              onOpen={onOpenProject}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
