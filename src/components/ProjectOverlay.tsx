import { useEffect, useRef, type MouseEvent } from 'react';
import type { Project } from '../types/project';
import { Arrow } from './Arrow';
import { ProjectImage } from './ProjectImage';

type ProjectOverlayProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  }

  return (
    <dialog
      aria-labelledby="project-dialog-title"
      className="project-dialog"
      onClose={onClose}
      onClick={closeFromBackdrop}
      ref={dialogRef}
    >
      <div className="project-dialog__surface">
        <button
          aria-label="بستن جزئیات پروژه"
          className="project-dialog__close"
          onClick={() => dialogRef.current?.close()}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="project-dialog__media">
          <div className="project-dialog__image-frame">
            <ProjectImage alt={`${project.titleFa}؛ تصویر معرفی پروژه`} loading="lazy" src={project.showcaseImage} />
            {project.mobileImage ? (
              <ProjectImage alt={`${project.titleFa}؛ نسخه‌ی موبایل`} className="project-dialog__mobile-image" loading="lazy" src={project.mobileImage} />
            ) : null}
          </div>
        </div>

        <div className="project-dialog__content">
          <p className="eyebrow project-dialog__eyebrow">
            <span className="status-dot" />
            {project.category}
          </p>
          <h2 id="project-dialog-title">
            <span dir="rtl">{project.titleFa}</span>
            <bdi className="latin project-dialog__english" dir="ltr">{project.title}</bdi>
          </h2>
          <p className="project-dialog__description">{project.description}</p>

          <dl className="project-facts">
            <div>
              <dt>حوزه</dt>
              <dd>{project.category}</dd>
            </div>
            {project.year ? (
              <div>
                <dt>سال</dt>
                <dd><bdi className="latin" dir="ltr">{project.year}</bdi></dd>
              </div>
            ) : null}
            {project.technologies.length > 0 ? (
              <div className="project-facts__stack">
                <dt>توسعه با</dt>
                <dd className="technology-list">
                  {project.technologies.map((technology) => (
                    <bdi className="latin technology-list__item" dir="ltr" key={technology}>{technology}</bdi>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          {project.demoUrl ? (
            <a
              className="text-link project-dialog__demo"
              href={project.demoUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>مشاهده‌ی وب‌سایت</span>
              <Arrow diagonal />
            </a>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
