import { TrainerCard } from '@/components/TrainerCard';
import { PokedexCard } from '@/components/PokedexCard';

export const MainPage = () => {
  return (
    <div className="flex flex-row h-screen p-4 gap-4">
      <div className="w-2/3 ">
        <PokedexCard />
      </div>
      <div className="w-1/3 ">
        <TrainerCard />
      </div>
    </div>
  );
};
