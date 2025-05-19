"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getImageById, 
  getRelatedImages, 
  getCategoryById 
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { 
  Download,
  Heart,
  Share2,
  Info,
  Tag,
  Camera,
  Car,
  Calendar,
  ArrowLeft,
  X
} from "lucide-react";
import ImageCard from "@/components/image-card";
import { Separator } from "@/components/ui/separator";
import useGarage from "@/lib/hooks/useGarage";
import { toast } from "sonner";

export default function ImageDetailPage() {
  const params = useParams();
  const imageId = params?.id as string;
  const image = getImageById(imageId);
  
  const [showInfo, setShowInfo] = useState(false);
  const { checkImage, addImage, removeImage } = useGarage();
  const isFavorite = checkImage(imageId, 'favorites');
  
  const relatedImages = image ? getRelatedImages(image) : [];
  const categories = image ? 
    image.categoryIds.map(id => getCategoryById(id)).filter(Boolean) : 
    [];
  
  // Handle loading animation
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: image?.title,
        text: image?.description,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard');
    }
  };
  
  // Handle favorites toggle
  const handleFavoriteToggle = () => {
    if (image) {
      if (isFavorite) {
        removeImage(image.id, 'favorites');
        toast.success('Removed from Garage');
      } else {
        addImage(image, 'favorites');
        toast.success('Added to Garage');
      }
    }
  };
  
  if (!image) {
    return (
      <div className="pt-24 pb-20 px-4 md:px-8 flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Image not found</h1>
          <Link href="/explore">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Full-screen image background */}
        <div className="fixed inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
          <div className="absolute inset-0 opacity-30 filter blur-xl">
            <Image
              src={image.url}
              alt={image.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 pt-24 pb-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <Link href="/explore" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Gallery
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-bold">{image.title}</h1>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <Button variant="outline" size="icon" onClick={handleFavoriteToggle}>
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)}>
                    <Info className="h-5 w-5" />
                  </Button>
                  <Button asChild>
                    <Link href={image.url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Main image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
            
            {/* Image info panel */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border rounded-xl p-6 mb-8 relative"
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4"
                    onClick={() => setShowInfo(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <h3 className="text-xl font-semibold mb-4">Image Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-lg mb-2">Description</h4>
                      <p className="text-muted-foreground">{image.description}</p>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-lg mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {categories.map(category => (
                            <Link 
                              key={category?.id} 
                              href={`/explore?category=${category?.slug}`}
                              className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm transition-colors"
                            >
                              {category?.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Tag className="h-4 w-4" />
                          <span className="font-medium">Source Type</span>
                        </div>
                        <p>{image.source}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Car className="h-4 w-4" />
                          <span className="font-medium">Vehicle</span>
                        </div>
                        <p>{image.make} {image.model} {image.year && `(${image.year})`}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Camera className="h-4 w-4" />
                          <span className="font-medium">Resolution</span>
                        </div>
                        <p>{image.resolution.width} x {image.resolution.height}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">Format</span>
                        </div>
                        <p>{image.format}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Related images */}
            {relatedImages.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Related Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedImages.map((relatedImage, index) => (
                    <motion.div
                      key={relatedImage.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                    >
                      <ImageCard 
                        image={relatedImage} 
                        className="h-[220px] md:h-[280px]"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}