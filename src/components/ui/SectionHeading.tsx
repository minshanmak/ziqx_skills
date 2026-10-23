interface SectionHeadingProps {
  title: string
  meta?: string
}

export function SectionHeading({ title, meta }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-[18px] leading-6 font-semibold tracking-[-0.01em]">{title}</h2>
      {meta && <span className="text-[13px] leading-[18px] text-muted">{meta}</span>}
    </div>
  )
}
