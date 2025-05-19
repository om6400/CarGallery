"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/lib/types";
import useGarage from "@/lib/hooks/useGarage";
import { Button } from "@/components/ui/button";
import { HeartIcon, Download } from "lucide-react";

interface ImageCardProps {
  image: ImageType;
  priority?: boolean;
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
}

export default function ImageCard({ 
  image, 
  priority = false,
  width,
  height,
  aspectRatio = "aspect-[3/2]",
  className
}: ImageCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { checkImage, addImage, removeImage } = useGarage();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Only run after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsFavorite(checkImage(image.id, 'favorites'));
  }, [checkImage, image.id]);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeImage(image.id, 'favorites');
      setIsFavorite(false);
    } else {
      addImage(image, 'favorites');
      setIsFavorite(true);
    }
  };

  // Prevent hydration mismatch by not rendering interactive elements until mounted
  if (!mounted) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl",
        aspectRatio,
        className
      )}>
        <Image
          src={image.thumbnail || image.url}
          alt={image.title}
          className="object-cover w-full h-full"
          width={width || 600}
          height={height || 400}
          priority={priority}
        />
      </div>
    );
  }
  
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl",
        aspectRatio,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Link href={`/image/${image.id}`} className="block h-full">
        <Image
          src={image.thumbnail || image.url}
          alt={image.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
          width={width || 600}
          height={height || 400}
          priority={priority}
        />
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-white font-medium text-lg">{image.title}</h3>
            <p className="text-gray-200 text-sm">{image.make} {image.model}</p>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className={cn(
          "absolute top-3 right-3 flex space-x-2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}>
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full h-9 w-9 bg-black/60 hover:bg-black/80"
            onClick={handleFavoriteToggle}
          >
            <HeartIcon className={cn(
              "h-5 w-5",
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            )} />
          </Button>
          
          <Link href={image.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full h-9 w-9 bg-black/60 hover:bg-black/80"
            >
              <Download className="h-5 w-5 text-white" />
            </Button>
          </Link>
        </div>
        
        {/* Tags/Source */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {image.source}
          </div>
          {image.format && (
            <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {image.format}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}