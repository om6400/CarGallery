// Type definitions for the car gallery website

export interface Image {
  id: string;
  title: string;
  description: string;
  source: 'AI' | 'Real' | 'Render';
  format: 'Portrait' | 'Landscape' | 'Square';
  mood: string[];
  tags: string[];
  resolution: {
    width: number;
    height: number;
  };
  url: string;
  thumbnail: string;
  make: string;
  model: string;
  year?: number;
  categoryIds: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  slug: string;
}

export interface FilterOptions {
  resolution?: '4K' | 'Ultrawide' | 'Mobile' | 'Square' | 'All';
  mood?: string;
  source?: 'AI' | 'Real' | 'Render' | 'All';
  format?: 'Portrait' | 'Landscape' | 'Square' | 'All';
}