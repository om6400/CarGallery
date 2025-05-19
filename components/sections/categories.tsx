"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { Category } from "@/lib/types";

export default function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of automotive beauty, each with its own unique style and mood.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CategoryCard 
                category={category} 
                isHovered={hoveredCategory === category.id}
                onHover={() => setHoveredCategory(category.id)}
                onLeave={() => setHoveredCategory(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function CategoryCard({ category, isHovered, onHover, onLeave }: CategoryCardProps) {
  return (
    <Link
      href={`/explore?category=${category.slug}`}
      className="relative block rounded-xl overflow-hidden group h-[300px] sm:h-[350px]"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10" />
      
      <Image
        src={category.coverImage}
        alt={category.name}
        width={600}
        height={800}
        className={`object-cover w-full h-full transition-transform duration-700 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 transition-transform duration-300 transform group-hover:-translate-y-2">
          {category.name}
        </h3>
        <p className={`text-gray-200 text-sm opacity-0 transition-all duration-300 transform translate-y-4 ${
          isHovered ? "opacity-100 translate-y-0" : ""
        }`}>
          {category.description}
        </p>
      </div>
    </Link>
  );
}