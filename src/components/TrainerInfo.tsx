import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type ITrainer from '../types/ITrainer';

export default function TrainerInfo(trainer: ITrainer) {
  const initials = trainer.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
      <Avatar>
        <AvatarImage src={trainer.avatar || undefined} alt={trainer.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{trainer.name}</p>
        <p className="text-sm text-slate-500 truncate">{trainer.region}</p>
      </div>
      <Badge variant="outline" className="whitespace-nowrap">
        {trainer.badges || 0} badges
      </Badge>
    </div>
  );
}
