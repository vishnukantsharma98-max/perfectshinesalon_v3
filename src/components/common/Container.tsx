/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  }[size];

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${sizeClasses} ${className}`}>
      {children}
    </div>
  );
};

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 md:mb-14 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#9A7B38] font-bold mb-2.5 select-none inline-block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18181B] font-normal tracking-tight leading-[1.18] max-w-2xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-sm sm:text-base text-[#71717A] leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
