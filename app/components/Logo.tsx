import { CuboidIcon as Cube } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Cube className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-primary">BlockMonials</span>
    </div>
  )
}

