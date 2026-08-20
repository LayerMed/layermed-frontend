import React, { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  wrapperClassName?: string
}

export const Input = ({
  placeholder = '',
  className = '',
  wrapperClassName = '',
  ...props
}: InputProps) => {
  return (
    <div className={`relative flex items-center gap-x-3.5 w-fit px-[11px] pr-[14px] bg-white rounded-4xl ${wrapperClassName}`}>
      <div className="shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#AEC2CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke="#AEC2CF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <input
        placeholder={placeholder}
        size={placeholder.length || 1}
        className={`py-[14px] outline-none bg-transparent font-semibold placeholder:text-[#AEC2CF] ${className}`}
        {...props}
      />
    </div>
  )
}

export default Input
