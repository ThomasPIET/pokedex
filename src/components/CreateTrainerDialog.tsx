import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ITrainer from '@/types/ITrainer';
import { useState } from 'react';


interface CreateTrainerDialogProps {
  onCreate: (trainer: ITrainer) => void;
}

export const CreateTrainerDialog: React.FC<CreateTrainerDialogProps> = ({
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Trainer</DialogTitle>
          <DialogDescription>
            Create you trainer with you name and age.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              required
              onChange={(e) => setName(e.target.value)}
              id="name"
              value={name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              required
              onChange={(e) => setAge(Number(e.target.value))}
              type="number"
              id="age"
              value={age}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onCreate({id: Date.now(), name, age });
              setName('');
              setAge(0);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
