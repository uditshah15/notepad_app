import React, { useState } from 'react';
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

type AddNoteModalProps=  {
  onSave: (name: string, description: string) => void;
}

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-white my-4" variant="outline" size="sm" onClick={() => {
          setNewNoteName('');
          setNewNoteDescription('');
        }}>
          <span>Add note</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <div>
          <div className='mb-4'>
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              value={newNoteName}
              onChange={(e) => setNewNoteName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              value={newNoteDescription}
              onChange={(e) => setNewNoteDescription(e.target.value)}
            />
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