import { cn } from '@/lib/utils'

type Props = {
  label: string
  value?: number
  icon: React.ReactNode
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
}

const TweetAction = ({ label, value, icon, onClick, isActive, disabled }: Props) => {
  const themesMap = {
    replies: 'group-hover:text-accent',
    retweet: 'group-hover:text-emerald-500' + (isActive ? ' text-emerald-500' : ''),
    like: 'group-hover:text-rose-500' + (isActive ? ' text-rose-500' : ''),
    bookmark: 'group-hover:text-accent' + (isActive ? ' text-accent' : ''),
    share: 'group-hover:text-accent',
    views: 'group-hover:text-accent',
  }

  const textMap = {
    replies: 'group-hover:text-accent',
    retweet: 'group-hover:text-emerald-500' + (isActive ? ' text-emerald-500' : ''),
    like: 'group-hover:text-rose-500' + (isActive ? ' text-rose-500' : ''),
    bookmark: 'group-hover:text-accent' + (isActive ? ' text-accent' : ''),
    share: 'group-hover:text-accent',
    views: 'group-hover:text-accent',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group text-foreground/60 flex cursor-pointer items-center',
        textMap[label.toLowerCase() as keyof typeof textMap],
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <div
        className={cn(
          'relative z-10 w-full rounded-full before:absolute before:inset-0 before:-z-10 before:h-full before:scale-200 before:rounded-full group-hover:before:bg-current/10',
          themesMap[label.toLowerCase() as keyof typeof themesMap],
          disabled && 'group-hover:before:bg-transparent',
        )}
      >
        {icon}
      </div>
      {!value || value === 0 ? null : (
        <span className={cn('ml-1 text-xs font-medium', textMap[label.toLowerCase() as keyof typeof textMap])}>
          {formatValue(value)}
        </span>
      )}
    </button>
  )
}

export default TweetAction

function formatValue(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  if (value >= 1000000) return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (value >= 1000) return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return value.toString()
}
