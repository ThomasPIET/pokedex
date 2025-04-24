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
import TrainerInfo from './trainerInfo';
import { CreateTrainerDialog } from './CreateTrainerDialog';

let nextID = 0;

export const TrainerCard = () => {
  const [trainers, setTrainers] = useState<ITrainer[]>([]);

  const handleCreate = (t: ITrainer) => {
    const id = nextID++;
    setTrainers([...trainers, { ...t, id: id }]);
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
