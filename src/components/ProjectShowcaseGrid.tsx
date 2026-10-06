import type { Project } from '../types/project';

type ProjectShowcaseGridProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export function ProjectShowcaseGrid({ projects, onOpenProject }: ProjectShowcaseGridProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-label="گالری تصویری وب‌سایت‌ها" className="project-showcase page-shell">
      <div className="project-showcase__grid" dir="ltr">
        {projects.map((project) => (
          <button
            aria-label={`نمایش جزئیات پروژهٔ ${project.titleFa}`}
            className="project-showcase__item"
            key={project.id}
            onClick={() => onOpenProject(project)}
            type="button"
          >
            <img alt="" decoding="async" loading="lazy" src={project.showcaseImage} />
          </button>
        ))}
      </div>
    </section>
  );
}
