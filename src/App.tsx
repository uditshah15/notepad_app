import { useState, useEffect } from 'react'
import AddNoteModal from './components/AddNoteModal'
import NoteCard from './components/NoteCard'
import './App.css'
import ReactMarkdown from 'react-markdown'

type Note = {
  id: number
  name: string
  description: string
  created_at?: string
  updated_at?: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  

  const fetchNotes = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`${API_BASE_URL}/notes`)
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      const data = await response.json()

      console.log('Fetched notes:', data);
      setNotes(data)
      if (data.length > 0) {
        setSelectedNote(data[0])
      }
    } catch (err) {
      setError('Failed to load notes')
      console.error('Error', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNote = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch note')
      }

      const data = await response.json();
      setSelectedNote(data);
    } catch (err) {
      setError('Failed to fetch note')
      console.error('Error', err);
    }
  }

  const deleteNote = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete note')
      }
      
      setNotes(notes.filter(note => note.id !== id))

      if (selectedNote?.id === id) {
        setSelectedNote(null)
      }
    } catch (err) {
      setError('Failed to delete note');
      console.error('Error', err);
    }
  }

   const createNote = async (name: string, description: string) => {
    if (!name.trim()) {
      setError("Note name cannot be empty."); // Display error in App.tsx
      return;
    }

    try {
      setError('');
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create note: ${response.statusText}`);
      }

      await fetchNotes();
    } catch (err) {
      console.error('Error creating note:', err);
      setError(`Failed to create note: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin h-8 w-8 mx-auto"></div>
        <p>Loading notes...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="flex">
        <div className="w-80 border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Notes ({notes.length})</h1>
              <AddNoteModal onSave={createNote} />
          </div>
          
          <div className="px-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                onSelect={fetchNote}
                onDelete={deleteNote}
                date={formatDate(note.created_at || '')}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedNote ? (
            <>
              <div className="p-6 text-left">
                <h2 className="text-xl font-semibold">
                  {selectedNote.name}
                </h2>

                {selectedNote.updated_at && (
                  <span className="text-sm text-gray-500">
                    Updated {formatDate(selectedNote.updated_at)}
                  </span>
                )}

                <div className="pt-4">
                  {
                    selectedNote.description ? (
                      <ReactMarkdown>
                        {selectedNote.description}
                      </ReactMarkdown>
                    ) : (
                      <p>No content available.</p>
                    )
                  }
                </div>
              </div>
            </>
          ) : (
            <h3 className="p-6">No note selected</h3>
          )}
        </div>
      </div>
      
      {error && (
        <div className="fixed bottom-4 right-4 bg-red text-white px-4 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  )
}

export default App
