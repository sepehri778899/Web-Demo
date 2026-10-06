import type { ImgHTMLAttributes, SyntheticEvent } from 'react';

type ProjectImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string;
};

export function ProjectImage({ src, alt, ...props }: ProjectImageProps) {
  function useFallback(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = '/projects/image-unavailable.svg';
  }

  return (
    <img
      {...props}
      alt={alt}
      onError={useFallback}
      src={src || '/projects/image-unavailable.svg'}
    />
  );
}
