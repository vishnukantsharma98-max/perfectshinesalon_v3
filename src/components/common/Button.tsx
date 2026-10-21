/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    target?: string;
    rel?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#D4AF37] via-[#C5A46A] to-[#B8860B] text-[#18181B] font-semibold hover:brightness-105 active:scale-[0.98] border border-[#E5CA98] shadow-md shadow-[#C5A46A]/20 hover:shadow-lg hover:scale-[1.02]',
  secondary:
    'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F5F2EC] active:scale-[0.98] border border-[#E7E2D8] hover:border-[#C5A46A]/80 shadow-sm hover:shadow-md hover:scale-[1.02]',
  outline:
    'bg-transparent text-[#18181B] hover:bg-[#F5F2EC] active:scale-[0.98] border border-[#C5A46A] hover:border-[#9A7B38] shadow-sm hover:scale-[1.02]',
  whatsapp:
    'bg-[#128C7E] text-white hover:bg-[#075E54] active:scale-[0.98] border border-[#0F7569] shadow-md shadow-emerald-700/20 hover:scale-[1.02]',
  ghost:
    'bg-transparent text-[#71717A] hover:text-[#18181B] hover:bg-stone-100 border border-transparent hover:scale-[1.02] active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs py-2 px-4 min-h-[38px] gap-2',
  md: 'text-xs py-2.5 px-6 min-h-[44px] gap-2.5',
  lg: 'text-xs py-3.5 px-8 min-h-[50px] gap-3',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...restProps
}) => {
  const commonClasses = `inline-flex items-center justify-center font-sans uppercase tracking-[0.12em] font-semibold transition-all duration-300 cursor-pointer select-none rounded-full whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('href' in restProps && restProps.href) {
    const { href, target, rel, ...anchorProps } = restProps;
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={commonClasses}
        {...anchorProps}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  const buttonProps = restProps as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={commonClasses} {...buttonProps}>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
