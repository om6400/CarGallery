"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFeaturedImages } from "@/lib/data";
import ImageCard from "@/components/image-card";

export default function FeaturedImages() {
  const featuredImages = getFeaturedImages();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="py-20 px-4 md:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Wallpapers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our handpicked selection of the most stunning automotive imagery
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <ImageCard 
                image={image} 
                priority={index < 3} 
                className="h-[350px] md:h-[400px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}