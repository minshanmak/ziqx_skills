import { GraduationCap } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-[9px] bg-ink text-white">
        <GraduationCap size={18} strokeWidth={2} />
      </span>
      <span className="text-[20px] leading-none font-bold tracking-[-0.01em]">Ziqx Skills</span>
    </div>
  )
}
