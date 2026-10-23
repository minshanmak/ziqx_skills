import { Tabs } from '../ui/Tabs'

export function CourseTabs() {
  return (
    <div className="mt-6">
      <Tabs
        items={[
          { to: '/courses', label: 'My courses' },
          { to: '/courses/explore', label: 'Explore courses' },
        ]}
      />
    </div>
  )
}
