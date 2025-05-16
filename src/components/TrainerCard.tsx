import { useState } from 'react';
import ITrainer from '../types/ITrainer';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import TrainerInfo from './TrainerInfo.tsx';
import { CreateTrainerDialog } from './CreateTrainerDialog';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { addTrainer } from '../store/slices/trainer-slice.ts';

let nextID = 0;

export const TrainerCard = () => {
  const [trainers, setTrainers] = useState<ITrainer[]>([]);

  const dispatch = useAppDispatch();

  const handleCreate = (t: ITrainer) => {
    const id = nextID++;
    setTrainers([...trainers, { ...t, id: id }]);
    dispatch(addTrainer({ ...t }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Trainer</CardTitle>
        <CardDescription>List of registered trainers</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {trainers.map((trainer) => (
            <li key={trainer.id}>
              <TrainerInfo {...trainer} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <CreateTrainerDialog onCreate={handleCreate} />
      </CardFooter>
    </Card>
  );
};
