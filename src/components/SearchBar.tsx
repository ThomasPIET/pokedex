'use client';

import type React from 'react';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Type color mapping
const typeColors: Record<string, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-800',
  dragon: 'bg-indigo-600',
  dark: 'bg-stone-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  types: string[];
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  types,
  selectedTypes,
  onTypeChange,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearch = () => {
    onSearchChange(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const clearFilters = () => {
    setInputValue('');
    onSearchChange('');
    onTypeChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search by name or ID..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-8"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Types
              {selectedTypes.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTypes.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {types.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              >
                <Badge
                  className={cn(
                    'mr-2 text-white',
                    typeColors[
                      typeof type === 'string' ? type.toLowerCase() : ''
                    ] || 'bg-slate-500'
                  )}
                >
                  {type}
                </Badge>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(searchTerm || selectedTypes.length > 0) && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              className={cn(
                'text-white cursor-pointer',
                typeColors[
                  typeof type === 'string' ? type.toLowerCase() : ''
                ] || 'bg-slate-500'
              )}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
