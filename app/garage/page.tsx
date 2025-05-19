"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Folder,
  FolderPlus,
  Download,
  Trash2,
  Car,
  ImageIcon,
  Plus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import ImageCard from "@/components/image-card";
import useGarage from "@/lib/hooks/useGarage";
import { GarageFolder } from "@/lib/garage";

export default function GaragePage() {
  const { isInitialized, folders, images, addFolder, removeFolder } = useGarage();
  const [activeFolder, setActiveFolder] = useState('favorites');
  const [newFolderName, setNewFolderName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle loading animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Create new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }
    
    const id = addFolder(newFolderName);
    setNewFolderName('');
    toast.success(`Folder "${newFolderName}" created`);
    setActiveFolder(id);
  };
  
  // Delete folder
  const handleDeleteFolder = (id: string) => {
    if (id === 'favorites') {
      toast.error('Cannot delete the Favorites folder');
      return;
    }
    
    const folder = folders.find(f => f.id === id);
    if (folder) {
      removeFolder(id);
      toast.success(`Folder "${folder.name}" deleted`);
      setActiveFolder('favorites');
    }
  };
  
  // Download all images in folder
  const handleDownloadAll = (folderId: string) => {
    if (!images[folderId] || images[folderId].length === 0) {
      toast.error('No images to download');
      return;
    }
    
    toast.success('Download started for all images');
    
    // For demo purposes, just open the first image in a new tab
    // In a real application, you would implement a zip download or batch download
    window.open(images[folderId][0].url, '_blank');
  };
  
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
            Your Garage
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your personal collection of saved images and wallpapers
          </p>
        </motion.div>
        
        {isInitialized ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Your Collections</h2>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>
                      Give your new folder a name to organize your saved images.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="folderName">Folder Name</Label>
                    <Input
                      id="folderName"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="My Collection"
                      className="mt-2"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreateFolder}>Create Folder</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs 
              value={activeFolder} 
              onValueChange={setActiveFolder}
              className="mb-10"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:max-w-md">
                  {folders.slice(0, 4).map((folder) => (
                    <TabsTrigger 
                      key={folder.id} 
                      value={folder.id}
                      className="flex items-center gap-1"
                    >
                      <Folder className="h-4 w-4 md:mr-1" />
                      <span className="hidden md:inline">{folder.name}</span>
                      <span className="inline md:hidden">{folder.name.slice(0, 3)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="flex items-center gap-2">
                  {activeFolder !== 'favorites' && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteFolder(activeFolder)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDownloadAll(activeFolder)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {folders.map((folder) => (
                <TabsContent key={folder.id} value={folder.id}>
                  <AnimatePresence mode="wait">
                    {(images[folder.id]?.length > 0) ? (
                      <motion.div
                        key={`${folder.id}-content`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      >
                        {images[folder.id].map((image, index) => (
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
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`${folder.id}-empty`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No images in this folder</h3>
                        <p className="text-muted-foreground max-w-sm">
                          Start adding images to your {folder.name} folder by browsing the gallery and clicking the heart icon.
                        </p>
                        <Link href="/explore" className="mt-6">
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Browse Gallery
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Your Garage is Empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Start adding images to your collection by browsing the gallery and clicking the heart icon on images you love.
            </p>
            <Link href="/explore" className="mt-6">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Browse Gallery
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}