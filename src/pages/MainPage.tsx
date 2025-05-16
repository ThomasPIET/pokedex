'use client';

import { TrainerCard } from '@/components/TrainerCard';
import { PokedexCard } from '@/components/PokedexCard';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pokémon Trainer</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <TrainerCard />
          </div>
          <div className="lg:col-span-2">
            <PokedexCard />
          </div>
        </div>
      </main>

      <footer className="border-t mt-8 py-4 text-center text-sm text-slate-500">
        <div className="container mx-auto">
          Pokémon Trainer App © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
