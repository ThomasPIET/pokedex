import ITrainer from '../types/ITrainer';
import { Separator } from './ui/separator';

const TrainerInfo = (trainer: ITrainer) => {
  return (
    <div className="">
      <Separator className="my-2" />
      <p>Name : {trainer.name}</p>
      <p>Age : {trainer.age}</p>
    </div>
  );
};

export default TrainerInfo;
