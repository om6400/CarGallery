"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterOptions } from "@/lib/types";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

const resolutions = ['All', '4K', 'Ultrawide', 'Mobile', 'Square'] as const;
const moods = ['All', 'Dramatic', 'Clean', 'Rainy', 'Neon', 'Night', 'Sunset', 'Vintage'] as const;
const sources = ['All', 'AI', 'Real', 'Render'] as const;
const formats = ['All', 'Portrait', 'Landscape', 'Square'] as const;

type RequiredFilters = Required<{
  resolution: typeof resolutions[number];
  mood: typeof moods[number];
  source: typeof sources[number];
  format: typeof formats[number];
}>;

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<RequiredFilters>({
    resolution: 'All',
    mood: 'All',
    source: 'All',
    format: 'All',
  });
  
  const handleFilterChange = <K extends keyof RequiredFilters>(
    key: K,
    value: RequiredFilters[K]
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-4 bg-muted/40 backdrop-blur-sm rounded-lg">
      <div className="flex items-center mr-2">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        <span className="font-medium">Filters:</span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Resolution
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Resolution</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.resolution} 
            onValueChange={(value) => handleFilterChange('resolution', value as RequiredFilters['resolution'])}
          >
            {resolutions.map((resolution) => (
              <DropdownMenuRadioItem key={resolution} value={resolution}>
                {resolution}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Mood
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Mood</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.mood} 
            onValueChange={(value) => handleFilterChange('mood', value as RequiredFilters['mood'])}
          >
            {moods.map((mood) => (
              <DropdownMenuRadioItem key={mood} value={mood}>
                {mood}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Source
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Source</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.source} 
            onValueChange={(value) => handleFilterChange('source', value as RequiredFilters['source'])}
          >
            {sources.map((source) => (
              <DropdownMenuRadioItem key={source} value={source}>
                {source}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            Format
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Format</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.format} 
            onValueChange={(value) => handleFilterChange('format', value as RequiredFilters['format'])}
          >
            {formats.map((format) => (
              <DropdownMenuRadioItem key={format} value={format}>
                {format}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="ghost" 
        className="ml-auto"
        onClick={() => {
          const resetFilters: RequiredFilters = {
            resolution: 'All',
            mood: 'All',
            source: 'All',
            format: 'All',
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
      >
        Reset
      </Button>
    </div>
  );
}