import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ variant = 'default', size = 'md', className, children, ...props }: ButtonProps) {
  const variants = {
    default: "bg-black border border-red-500 text-white hover:bg-red-500 shadow-lg hover:shadow-red-500/40",
    outline: "bg-white text-black hover:bg-zinc-100 shadow-lg hover:shadow-white/30",
    secondary: "bg-gray-200 text-black hover:bg-gray-300"
  }

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg"
  }

  return (
    <button
      className={cn(
        "rounded-md font-medium transition-colors cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
