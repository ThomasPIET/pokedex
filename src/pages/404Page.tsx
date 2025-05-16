import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-12 bg-background">
      <div className="flex flex-col items-center max-w-md text-center space-y-6">
        <div className="rounded-full bg-muted p-6">
          <FileQuestion
            className="h-12 w-12 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">404</h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Page non trouvée</h2>
          <p className="text-muted-foreground">
            Désolé, nous n'avons pas pu trouver la page que vous recherchez.
          </p>
        </div>

        <Button asChild className="mt-4">
          <Link to="/app">Retour au pokedex</Link>
        </Button>
      </div>
    </div>
  );
};
