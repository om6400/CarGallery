import { Category, Image } from './types';

export const categories: Category[] = [
  {
    id: 'german-precision',
    name: 'German Precision',
    description: 'Engineering excellence captured through the lens',
    coverImage: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg',
    slug: 'german-precision',
  },
  {
    id: 'futuristic-machines',
    name: 'Futuristic Machines',
    description: 'Concept cars and designs ahead of their time',
    coverImage: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    slug: 'futuristic-machines',
  },
  {
    id: 'rain-in-tokyo',
    name: 'Rain in Tokyo',
    description: 'JDM legends captured in the rain-soaked streets of Tokyo',
    coverImage: 'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg',
    slug: 'rain-in-tokyo',
  },
  {
    id: 'desert-storm',
    name: 'Desert Storm',
    description: 'SUVs and trucks conquering the harsh desert landscape',
    coverImage: 'https://images.pexels.com/photos/2118483/pexels-photo-2118483.jpeg',
    slug: 'desert-storm',
  },
  {
    id: 'ai-renders',
    name: 'AI Renders',
    description: 'Stunning computer-generated automotive art',
    coverImage: 'https://images.pexels.com/photos/10168206/pexels-photo-10168206.jpeg',
    slug: 'ai-renders',
  },
  {
    id: 'chrome-dreams',
    name: 'Chrome Dreams',
    description: 'Chromed-out classics and modern masterpieces',
    coverImage: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg',
    slug: 'chrome-dreams',
  },
  {
    id: 'minimal-aesthetics',
    name: 'Minimal Aesthetics',
    description: 'Clean compositions and minimalist automotive design',
    coverImage: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg',
    slug: 'minimal-aesthetics',
  },
  {
    id: 'vintage-heat',
    name: 'Vintage Heat',
    description: 'Classic cars with timeless appeal',
    coverImage: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg',
    slug: 'vintage-heat',
  },
];

export const images: Image[] = [
  {
    id: '1',
    title: 'BMW M4 on Mountain Road',
    description: 'A sleek BMW M4 shot on a winding mountain road at golden hour',
    source: 'Real',
    format: 'Landscape',
    mood: ['Dramatic', 'Sunset', 'Mountain'],
    tags: ['BMW', 'M4', 'Coupe', 'Mountain', 'Road'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'BMW',
    model: 'M4',
    year: 2022,
    categoryIds: ['german-precision'],
    featured: true,
  },
  {
    id: '2',
    title: 'Porsche 911 GT3 Studio',
    description: 'A stunning Porsche 911 GT3 in a minimalist studio setup',
    source: 'Real',
    format: 'Landscape',
    mood: ['Clean', 'Studio', 'Minimal'],
    tags: ['Porsche', '911', 'GT3', 'Studio', 'Minimal'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/3778769/pexels-photo-3778769.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3778769/pexels-photo-3778769.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Porsche',
    model: '911 GT3',
    year: 2021,
    categoryIds: ['german-precision', 'minimal-aesthetics'],
  },
  {
    id: '3',
    title: 'Electric Concept in Neon',
    description: 'Futuristic electric vehicle concept illuminated by neon lights',
    source: 'AI',
    format: 'Landscape',
    mood: ['Neon', 'Night', 'Futuristic'],
    tags: ['Concept', 'Electric', 'Neon', 'Night'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/4915803/pexels-photo-4915803.jpeg',
    thumbnail: 'https://images.pexels.com/photos/4915803/pexels-photo-4915803.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Concept',
    model: 'EV-X',
    categoryIds: ['futuristic-machines', 'ai-renders'],
  },
  {
    id: '4',
    title: 'Nissan GT-R in Rainy Tokyo',
    description: 'Iconic Nissan GT-R photographed on a rainy night in Tokyo',
    source: 'Real',
    format: 'Portrait',
    mood: ['Rainy', 'Night', 'Urban'],
    tags: ['Nissan', 'GT-R', 'Tokyo', 'Rain', 'JDM'],
    resolution: {
      width: 2160,
      height: 3840,
    },
    url: 'https://images.pexels.com/photos/2127016/pexels-photo-2127016.jpeg',
    thumbnail: 'https://images.pexels.com/photos/2127016/pexels-photo-2127016.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Nissan',
    model: 'GT-R',
    year: 2020,
    categoryIds: ['rain-in-tokyo'],
    featured: true,
  },
  {
    id: '5',
    title: 'Land Rover Defender in Sahara',
    description: 'Land Rover Defender conquering sand dunes in the Sahara',
    source: 'Real',
    format: 'Landscape',
    mood: ['Desert', 'Sunny', 'Adventure'],
    tags: ['Land Rover', 'Defender', 'Desert', 'SUV', 'Off-road'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Land Rover',
    model: 'Defender',
    year: 2021,
    categoryIds: ['desert-storm'],
  },
  {
    id: '6',
    title: 'Hypercar Concept Render',
    description: 'Hyper-realistic render of a next-generation hypercar concept',
    source: 'Render',
    format: 'Landscape',
    mood: ['Futuristic', 'Studio', 'Clean'],
    tags: ['Hypercar', 'Concept', 'Render', 'Futuristic'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Concept',
    model: 'Hyperion X',
    categoryIds: ['futuristic-machines', 'ai-renders'],
  },
  {
    id: '7',
    title: 'Chrome Classic Cadillac',
    description: 'Meticulously restored classic Cadillac with chrome detailing',
    source: 'Real',
    format: 'Landscape',
    mood: ['Vintage', 'Bright', 'Classic'],
    tags: ['Cadillac', 'Classic', 'Chrome', 'Vintage'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg',
    thumbnail: 'https://images.pexels.com/photos/2684219/pexels-photo-2684219.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Cadillac',
    model: 'Eldorado',
    year: 1959,
    categoryIds: ['chrome-dreams', 'vintage-heat'],
  },
  {
    id: '8',
    title: 'Minimalist Porsche Cayman',
    description: 'Porsche Cayman in a minimalist setting with stark contrast',
    source: 'Real',
    format: 'Square',
    mood: ['Minimal', 'Studio', 'Clean'],
    tags: ['Porsche', 'Cayman', 'Minimal', 'Studio'],
    resolution: {
      width: 2160,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/11787141/pexels-photo-11787141.jpeg',
    thumbnail: 'https://images.pexels.com/photos/11787141/pexels-photo-11787141.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Porsche',
    model: 'Cayman',
    year: 2020,
    categoryIds: ['minimal-aesthetics', 'german-precision'],
  },
  {
    id: '9',
    title: 'Ford Mustang Sunset Silhouette',
    description: 'Classic Ford Mustang silhouetted against a dramatic sunset',
    source: 'Real',
    format: 'Landscape',
    mood: ['Sunset', 'Dramatic', 'Silhouette'],
    tags: ['Ford', 'Mustang', 'Classic', 'Sunset', 'Silhouette'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/8078317/pexels-photo-8078317.jpeg',
    thumbnail: 'https://images.pexels.com/photos/8078317/pexels-photo-8078317.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Ford',
    model: 'Mustang',
    year: 1967,
    categoryIds: ['vintage-heat'],
    featured: true,
  },
  {
    id: '10',
    title: 'Mercedes AMG GT Night Drive',
    description: 'Mercedes AMG GT captured during a night drive in the city',
    source: 'Real',
    format: 'Landscape',
    mood: ['Night', 'Urban', 'Dynamic'],
    tags: ['Mercedes', 'AMG', 'GT', 'Night', 'City'],
    resolution: {
      width: 3840,
      height: 2160,
    },
    url: 'https://images.pexels.com/photos/8534188/pexels-photo-8534188.jpeg',
    thumbnail: 'https://images.pexels.com/photos/8534188/pexels-photo-8534188.jpeg?auto=compress&cs=tinysrgb&h=350',
    make: 'Mercedes',
    model: 'AMG GT',
    year: 2021,
    categoryIds: ['german-precision'],
  },
];

// Helper functions to work with the data
export function getFeaturedImages(): Image[] {
  return images.filter(image => image.featured);
}

export function getImagesByCategory(categoryId: string): Image[] {
  return images.filter(image => image.categoryIds.includes(categoryId));
}

export function getImageById(id: string): Image | undefined {
  return images.find(image => image.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getRelatedImages(image: Image, limit: number = 4): Image[] {
  // Get images from the same categories, excluding the current image
  const relatedImages = images
    .filter(img => 
      img.id !== image.id && 
      img.categoryIds.some(catId => image.categoryIds.includes(catId))
    )
    .slice(0, limit);
  
  return relatedImages;
}

export function filterImages(options: {
  categoryId?: string;
  resolution?: string;
  mood?: string;
  source?: string;
  format?: string;
}): Image[] {
  return images.filter(image => {
    // Filter by category if specified
    if (options.categoryId && !image.categoryIds.includes(options.categoryId)) {
      return false;
    }
    
    // Filter by resolution if specified
    if (options.resolution && options.resolution !== 'All') {
      if (options.resolution === '4K' && (image.resolution.width < 3840 || image.resolution.height < 2160)) {
        return false;
      }
      if (options.resolution === 'Ultrawide' && image.resolution.width / image.resolution.height < 21/9) {
        return false;
      }
      if (options.resolution === 'Mobile' && image.format !== 'Portrait') {
        return false;
      }
      if (options.resolution === 'Square' && image.format !== 'Square') {
        return false;
      }
    }
    
    // Filter by mood if specified
    if (options.mood && options.mood !== 'All' && !image.mood.includes(options.mood)) {
      return false;
    }
    
    // Filter by source if specified
    if (options.source && options.source !== 'All' && image.source !== options.source) {
      return false;
    }
    
    // Filter by format if specified
    if (options.format && options.format !== 'All' && image.format !== options.format) {
      return false;
    }
    
    return true;
  });
}