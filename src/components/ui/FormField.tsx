import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

type CommonProps = {
  label: string
}

type InputProps = CommonProps & InputHTMLAttributes<HTMLInputElement> & {
  multiline?: false
}

type TextareaProps = CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  multiline: true
}

export function FormField(props: InputProps | TextareaProps) {
  const generatedId = useId()
  const id = props.id ?? generatedId
  const { label, multiline, className = '', ...controlProps } = props

  return (
    <label className={`form-field ${className}`.trim()} htmlFor={id}>
      <span className="form-field__label">{label}</span>
      {multiline ? (
        <textarea id={id} className="form-field__control form-field__control--textarea" {...controlProps as TextareaHTMLAttributes<HTMLTextAreaElement>} />
      ) : (
        <input id={id} className="form-field__control" {...controlProps as InputHTMLAttributes<HTMLInputElement>} />
      )}
    </label>
  )
}
