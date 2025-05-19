"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { filterImages } from "@/lib/data";
import { FilterOptions } from "@/lib/types";
import FilterBar from "@/components/ui/filter-bar";
import ImageCard from "@/components/image-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, LucideMonitorSmartphone } from "lucide-react";

export default function WallpapersPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    resolution: 'All',
    mood: 'All',
    source: 'All',
    format: 'All',
  });
  
  const [activeTab, setActiveTab] = useState("all");
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  // Set format based on tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let formatValue: string = 'All';
    
    if (value === "desktop") formatValue = 'Landscape';
    if (value === "mobile") formatValue = 'Portrait';
    if (value === "square") formatValue = 'Square';
    
    setFilters(prev => ({
      ...prev,
      format: formatValue as any
    }));
  };
  
  const filteredImages = filterImages({
    resolution: filters.resolution,
    mood: filters.mood,
    source: filters.source,
    format: filters.format,
  });
  
  return (
    <div className="pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Wallpapers
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download high-quality wallpapers for all your devices
          </p>
        </div>
        
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <LucideMonitorSmartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">All</span>
                </TabsTrigger>
                <TabsTrigger value="desktop" className="flex items-center gap-1">
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-1">
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Mobile</span>
                </TabsTrigger>
                <TabsTrigger value="square" className="flex items-center gap-1">
                  <div className="w-4 h-4 border-2 rounded-sm"></div>
                  <span className="hidden sm:inline">Square</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <FilterBar onFilterChange={handleFilterChange} />
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ImageCard 
                      image={image} 
                      priority={index < 4}
                      className="h-[250px] md:h-[300px]"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="desktop">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ImageCard 
                      image={image} 
                      priority={index < 4}
                      aspectRatio="aspect-video"
                      className="h-[220px] md:h-[250px]"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mobile">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ImageCard 
                      image={image} 
                      priority={index < 4}
                      aspectRatio="aspect-[9/16]"
                      className="h-[280px] md:h-[350px]"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="square">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ImageCard 
                      image={image} 
                      priority={index < 4}
                      aspectRatio="aspect-square"
                      className="h-[200px] md:h-[250px]"
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-medium">No wallpapers match your filters.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}