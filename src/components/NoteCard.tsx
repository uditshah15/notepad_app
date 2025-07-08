import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Note = {
  id: number
  name: string
  created_at?: string
}

type NoteCardProps = {
  note: Note
  isSelected: boolean
  onSelect: (id: number) => void
  onDelete: (id: number) => void
  date: string
}

const NoteCard = ({ note, isSelected, onSelect, onDelete, date }: NoteCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(note.id)
  }

  return (
    <Card
      className={`cursor-pointer my-2 ${
        isSelected
          ? 'bg-blue-50 border-blue-200'
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(note.id)}
    >
      <CardHeader>
        <CardTitle>{note.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-gray-500 mb-2">
          {date}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-white hover:text-red-300"
        >
          <span>Delete</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export default NoteCard 