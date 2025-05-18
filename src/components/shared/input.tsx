import { Label } from '../ui/label'

import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = ({ label, value, ...props }: Props) => {
  return (
    <div className='relative'>
      <input
        value={value}
        className='peer ring-input focus-within:ring-accent h-14 w-full rounded !bg-transparent px-3 pt-2 pb-0 ring-2 outline-none'
        {...props}
      />
      <Label
        className={cn(
          'text-muted-foreground peer-focus-within:text-accent absolute inset-0 z-50 h-fit w-fit translate-x-3 translate-y-4 text-base transition-all peer-focus-within:translate-y-1 peer-focus-within:text-xs peer-focus-within:tracking-wide',
          value && 'inset-0 translate-y-1 text-xs tracking-wide',
        )}
      >
        {label}
      </Label>
    </div>
  )
}

export default Input
