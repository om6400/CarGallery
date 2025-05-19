"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { images } from "@/lib/data";
import { Image as ImageType } from "@/lib/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ImageCard from "@/components/image-card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ImageType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const searchQuery = query.toLowerCase();
    const filtered = images.filter(image => 
      image.title.toLowerCase().includes(searchQuery) ||
      image.description.toLowerCase().includes(searchQuery) ||
      image.make.toLowerCase().includes(searchQuery) ||
      image.model.toLowerCase().includes(searchQuery) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
    
    setResults(filtered);
  }, [query]);
  
  return (
    <div className="pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Search Images
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect car image by searching for make, model, style, or keyword
          </p>
        </motion.div>
        
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by make, model, or style..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 py-6 text-lg rounded-full border-input"
            />
          </div>
        </div>
        
        {query && (
          <div className="mb-8">
            <p className="text-muted-foreground">
              Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          </div>
        )}
        
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ImageCard 
                  image={image} 
                  priority={index < 8}
                  className="h-[250px] md:h-[280px]"
                />
              </motion.div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <p className="text-xl font-medium">No results found for "{query}"</p>
            <p className="text-muted-foreground mt-2">Try different keywords or browse our categories instead.</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-medium">Enter a search term to begin</p>
            <p className="text-muted-foreground mt-2">Try searching for car makes, models, or styles</p>
          </div>
        )}
      </div>
    </div>
  );
}