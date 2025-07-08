import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type AddNoteModalProps = {
  onSave: (name: string, description: string) => void;
};

const AddNoteModal: React.FC<AddNoteModalProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNoteName, setNewNoteName] = useState('');
  const [newNoteDescription, setNewNoteDescription] = useState('');

  const handleSave = () => {
    if (!newNoteName.trim()) {
      console.error("Note name cannot be empty.");
      return;
    }

    onSave(newNoteName, newNoteDescription);
    setNewNoteName('');
    setNewNoteDescription('');
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setNewNoteName('');
      setNewNoteDescription('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="text-white hover:text-gray-500 my-4" variant="outline" size="sm">
          <span>Add note</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <div className='mb-4'>
              <Label className='mb-1' htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newNoteName}
                onChange={(e) => setNewNoteName(e.target.value)}
                required
              />
            </div>
        <div className="grid grid-cols-2 gap-4 min-h-0">
          <div>
            <Label htmlFor="description" className="mb-1">Description (Markdown)</Label>
              <Textarea
                id="description"
                value={newNoteDescription}
                className='min-h-[200px]'
                onChange={(e) => setNewNoteDescription(e.target.value)}
                placeholder="Write note in Markdown format."
              />
          </div>

          <div>
            <Label className="mb-1">Preview</Label>
            <div className="border p-2 rounded-md min-h-[200px]">
                {newNoteDescription ? (
                <ReactMarkdown>
                  {newNoteDescription}
                </ReactMarkdown>
              ) : (
                <p>Note empty</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;