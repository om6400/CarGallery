"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { filterImages, categories } from "@/lib/data";
import { FilterOptions } from "@/lib/types";
import FilterBar from "@/components/ui/filter-bar";
import ImageCard from "@/components/image-card";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [filters, setFilters] = useState<FilterOptions>({
    resolution: 'All',
    mood: 'All',
    source: 'All',
    format: 'All',
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const filteredImages = filterImages({
    categoryId: categoryParam || undefined,
    resolution: filters.resolution,
    mood: filters.mood,
    source: filters.source,
    format: filters.format,
  });
  
  // Find the category name if a category parameter is present
  const categoryName = categoryParam 
    ? categories.find(cat => cat.slug === categoryParam)?.name 
    : null;
  
  return (
    <div className="pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {categoryName ? categoryName : "Explore All Images"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {categoryName 
                ? `Browse our collection of ${categoryName} images` 
                : "Discover our entire collection of automotive imagery"}
            </p>
          </motion.div>
        </div>
        
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
              >
                <ImageCard 
                  image={image} 
                  priority={index < 4}
                  className="h-[250px] md:h-[300px]"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-medium">No images match your filters.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}