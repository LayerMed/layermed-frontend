import React, { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'accent'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  hasImage?: boolean
}

const baseStyles = 'relative cursor-pointer overflow-hidden inline-flex items-center justify-center w-fit px-[15px] py-[13.5px] text-base rounded-2xl font-semibold gap-x-[15px] group transition-all duration-400'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-background hover:bg-[#D3DDE4]',
  accent: 'text-white bg-primary hover:shadow-hover-accent',
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  hasImage = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()} {...props}>
      {variant === 'accent' && (
        <span className="absolute inset-0 bg-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      )}

      <span className="relative z-10">{children}</span>

      {variant === 'accent' && hasImage === true && (
        <svg
          className="relative z-10"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#EDF5FF"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.74 15.53L14.26 12L10.74 8.46997"
            stroke="#EDF5FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export default Button
