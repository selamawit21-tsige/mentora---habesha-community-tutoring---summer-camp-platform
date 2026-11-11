import React from 'react';

interface TutorAvatarProps {
  src: string;
  name: string;
  className: string;
  onClick?: () => void;
}

export const TutorAvatar: React.FC<TutorAvatarProps> = ({ src, name, className, onClick }) => {
  const hasUploadedImage = Boolean(src) && !src.includes('images.unsplash.com/photo-');
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  if (hasUploadedImage) {
    return (
      <img
        src={src}
        alt={name}
        className={className}
        onClick={onClick}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${name} profile placeholder`}
      className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-950 to-slate-700 text-amber-300 font-bold`}
      onClick={onClick}
    >
      {initials || '?'}
    </div>
  );
};
