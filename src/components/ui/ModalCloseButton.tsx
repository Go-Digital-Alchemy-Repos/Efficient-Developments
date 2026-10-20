import { forwardRef, type ButtonHTMLAttributes } from 'react'

export const ModalCloseButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function ModalCloseButton({ className = '', type = 'button', ...props }, ref) {
    return (
      <button className={`modal-close ${className}`.trim()} ref={ref} type={type} {...props}>
        <img src="/assets/icons/modal-close.svg" alt="" />
      </button>
    )
  },
)

