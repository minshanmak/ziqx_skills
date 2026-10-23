import { BookOpen, ChevronLeft, User as UserIcon, Video } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../context/AuthContext'
import { Avatar } from '../ui/Avatar'
import { Logo } from '../ui/Logo'

const nav = [
  { to: '/courses', label: 'My courses', icon: BookOpen },
  { to: '/sessions', label: 'Live sessions', icon: Video },
  { to: '/profile', label: 'Profile', icon: UserIcon },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth()

  return (
    <aside
      className={cn(
        'no-print sticky top-0 z-10 flex h-screen shrink-0 flex-col border-r border-line bg-white transition-[width] duration-200',
        collapsed ? 'w-[76px]' : 'w-[250px]',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-6 -right-3.5 grid size-7 place-items-center rounded-full border border-line-strong bg-white text-ink hover:bg-surface"
      >
        <ChevronLeft size={14} strokeWidth={2.2} className={cn(collapsed && 'rotate-180')} />
      </button>

      <div className={cn('pt-8 pb-0', collapsed ? 'flex justify-center' : 'pl-6')}>
        {collapsed ? (
          <span className="grid size-8 place-items-center rounded-[9px] bg-ink text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Ziqx Skills">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </span>
        ) : (
          <Logo />
        )}
      </div>

      <nav className="mt-[38px] flex flex-col gap-1 px-[18px]" aria-label="Main">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'relative flex h-[42px] items-center gap-3 rounded-[10px] text-[14px] font-semibold transition-colors',
                collapsed ? 'justify-center px-0' : 'px-3.5',
                isActive ? 'bg-wash text-ink' : 'text-muted hover:bg-surface hover:text-ink',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-1/2 -left-[18px] h-[22px] w-1 -translate-y-1/2 rounded-r-full bg-ink" />
                )}
                <Icon size={20} strokeWidth={1.75} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-line">
        <div className={cn('flex items-center gap-3 py-4', collapsed ? 'justify-center' : 'px-5')}>
          <Avatar name={user?.name ?? 'Learner'} size={36} />
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[14px] font-semibold">{user?.name}</p>
              <p className="mt-0.5 text-[12px] text-muted">Learner</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
