'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type IPokemon from '../types/IPokemon';

interface PokemonDetailDialogProps {
  pokemon: IPokemon;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PokemonDetailDialog({
  pokemon,
  open,
  onOpenChange,
}: PokemonDetailDialogProps) {
  const MAX_STAT = 255;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>#{pokemon.pokedex_id.toString().padStart(3, '0')}</span>
            <span className="text-xl">{pokemon.name.en}</span>
            <span className="text-sm text-slate-500">({pokemon.name.fr})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 w-full flex justify-center">
              <img
                src={
                  pokemon.sprites.regular ||
                  `/placeholder.svg?height=200&width=200`
                }
                alt={pokemon.name.en}
                className="h-48 w-48 object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 w-full text-sm">
              <div className="flex flex-col">
                <span className="text-slate-500">Category</span>
                <span>{pokemon.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500">Generation</span>
                <span>{pokemon.generation}</span>
              </div>
              {pokemon.height && (
                <div className="flex flex-col">
                  <span className="text-slate-500">Height</span>
                  <span>{pokemon.height} m</span>
                </div>
              )}
              {pokemon.weight && (
                <div className="flex flex-col">
                  <span className="text-slate-500">Weight</span>
                  <span>{pokemon.weight}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Tabs defaultValue="stats">
              <TabsList className="w-full">
                <TabsTrigger value="stats" className="flex-1">
                  Stats
                </TabsTrigger>
                <TabsTrigger value="abilities" className="flex-1">
                  Abilities
                </TabsTrigger>
                <TabsTrigger value="resistances" className="flex-1">
                  Resistances
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-4">
                {pokemon.stats && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>HP</span>
                        <span>{pokemon.stats?.hp}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.hp
                            ? (pokemon.stats.hp / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Attack</span>
                        <span>{pokemon.stats?.atk}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.atk
                            ? (pokemon.stats.atk / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Defense</span>
                        <span>{pokemon.stats?.def}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.def
                            ? (pokemon.stats.def / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Special Attack</span>
                        <span>{pokemon.stats?.spe_atk}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.spe_atk
                            ? (pokemon.stats.spe_atk / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Special Defense</span>
                        <span>{pokemon.stats?.spe_def}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.spe_def
                            ? (pokemon.stats.spe_def / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Speed</span>
                        <span>{pokemon.stats?.vit}</span>
                      </div>
                      <Progress
                        value={
                          pokemon.stats?.vit
                            ? (pokemon.stats.vit / MAX_STAT) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="abilities" className="mt-4">
                {pokemon.talents && pokemon.talents.length > 0 ? (
                  <ul className="space-y-2">
                    {pokemon.talents.map((talent) => (
                      <li
                        key={talent}
                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded"
                      >
                        {typeof talent === 'string'
                          ? talent
                          : JSON.stringify(talent)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No abilities data available</p>
                )}
              </TabsContent>

              <TabsContent value="resistances" className="mt-4">
                {pokemon.resistances && pokemon.resistances.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {pokemon.resistances.map((resistance) => (
                      <div
                        key={resistance.type}
                        className="flex justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded"
                      >
                        <span>
                          {typeof resistance.type === 'string'
                            ? resistance.type
                            : JSON.stringify(resistance.type)}
                        </span>
                        <span
                          className={
                            resistance.multiplier > 1
                              ? 'text-red-500'
                              : resistance.multiplier < 1
                                ? 'text-green-500'
                                : ''
                          }
                        >
                          ×{resistance.multiplier}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No resistance data available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
