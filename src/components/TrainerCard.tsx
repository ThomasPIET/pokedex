'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateTrainerDialog } from './CreateTrainerDialog';
import TrainerInfo from './TrainerInfo';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTrainer } from '../store/slices/trainer-slice';
import type ITrainer from '../types/ITrainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

let nextID = 0;

export const TrainerCard = () => {
  const [trainers, setTrainers] = useState<ITrainer[]>([]);
  const dispatch = useAppDispatch();

  const handleCreate = (t: ITrainer) => {
    const id = nextID++;
    const newTrainer = { ...t, id };
    setTrainers([...trainers, newTrainer]);
    dispatch(addTrainer(newTrainer));
  };

  // Group trainers by region
  const trainersByRegion = trainers.reduce(
    (acc, trainer) => {
      if (!acc[trainer.region]) {
        acc[trainer.region] = [];
      }
      acc[trainer.region].push(trainer);
      return acc;
    },
    {} as Record<string, ITrainer[]>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Trainers</CardTitle>
        <CardDescription>Manage your Pokémon trainers</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {trainers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-slate-500 mb-4">No trainers registered yet</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="region">By Region</TabsTrigger>
              <TabsTrigger value="badges">By Badges</TabsTrigger>
            </TabsList>

            <TabsContent
              value="all"
              className="flex-1 overflow-y-auto mt-2 pr-2"
            >
              <div className="space-y-2">
                {trainers.map((trainer) => (
                  <TrainerInfo key={trainer.id} {...trainer} />
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="region"
              className="flex-1 overflow-y-auto mt-2 pr-2"
            >
              <div className="space-y-4">
                {Object.entries(trainersByRegion).map(
                  ([region, regionTrainers]) => (
                    <div key={region}>
                      <h3 className="font-medium text-sm text-slate-500 mb-2">
                        {region}
                      </h3>
                      <div className="space-y-2">
                        {regionTrainers.map((trainer) => (
                          <TrainerInfo key={trainer.id} {...trainer} />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent
              value="badges"
              className="flex-1 overflow-y-auto mt-2 pr-2"
            >
              <div className="space-y-4">
                {[...trainers]
                  .sort((a, b) => (b.badges || 0) - (a.badges || 0))
                  .map((trainer) => (
                    <TrainerInfo key={trainer.id} {...trainer} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter>
        <CreateTrainerDialog onCreate={handleCreate} />
      </CardFooter>
    </Card>
  );
};
