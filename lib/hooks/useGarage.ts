"use client";

import { useState, useEffect } from 'react';
import { Image } from '../types';
import { 
  initGarage, 
  addToGarage, 
  removeFromGarage, 
  getImagesInFolder, 
  getFolders,
  createFolder,
  deleteFolder,
  isInGarage,
  isInFolder,
  GarageFolder
} from '../garage';

export default function useGarage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [folders, setFolders] = useState<GarageFolder[]>([]);
  const [images, setImages] = useState<{[folderId: string]: Image[]}>({});
  
  // Initialize garage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initGarage();
      setFolders(getFolders());
      
      // Get images for each folder
      const imagesMap: {[folderId: string]: Image[]} = {};
      getFolders().forEach(folder => {
        imagesMap[folder.id] = getImagesInFolder(folder.id);
      });
      
      setImages(imagesMap);
      setIsInitialized(true);
    }
  }, []);
  
  // Add image to folder and update state
  const addImage = (image: Image, folderId: string = 'favorites') => {
    addToGarage(image, folderId);
    
    // Update local state
    setImages(prevImages => {
      const updatedImages = { ...prevImages };
      
      if (!updatedImages[folderId]) {
        updatedImages[folderId] = [];
      }
      
      if (!updatedImages[folderId].some(img => img.id === image.id)) {
        updatedImages[folderId] = [...updatedImages[folderId], image];
      }
      
      return updatedImages;
    });
    
    // Update folders if needed
    setFolders(getFolders());
  };
  
  // Remove image from folder and update state
  const removeImage = (imageId: string, folderId?: string) => {
    removeFromGarage(imageId, folderId);
    
    // Update local state
    if (folderId) {
      // Remove from specific folder
      setImages(prevImages => {
        const updatedImages = { ...prevImages };
        
        if (updatedImages[folderId]) {
          updatedImages[folderId] = updatedImages[folderId].filter(img => img.id !== imageId);
        }
        
        return updatedImages;
      });
    } else {
      // Remove from all folders
      setImages(prevImages => {
        const updatedImages = { ...prevImages };
        
        Object.keys(updatedImages).forEach(key => {
          updatedImages[key] = updatedImages[key].filter(img => img.id !== imageId);
        });
        
        return updatedImages;
      });
    }
  };
  
  // Create a new folder and update state
  const addFolder = (name: string) => {
    const id = createFolder(name);
    
    // Update folders
    setFolders(getFolders());
    
    // Initialize empty images array for the new folder
    setImages(prevImages => ({
      ...prevImages,
      [id]: []
    }));
    
    return id;
  };
  
  // Delete a folder and update state
  const removeFolder = (folderId: string) => {
    deleteFolder(folderId);
    
    // Update folders
    setFolders(getFolders());
    
    // Remove folder from images state
    setImages(prevImages => {
      const updatedImages = { ...prevImages };
      delete updatedImages[folderId];
      return updatedImages;
    });
  };
  
  // Check if an image is in any folder or a specific folder
  const checkImage = (imageId: string, folderId?: string) => {
    if (folderId) {
      return isInFolder(imageId, folderId);
    }
    return isInGarage(imageId);
  };
  
  return {
    isInitialized,
    folders,
    images,
    addImage,
    removeImage,
    addFolder,
    removeFolder,
    checkImage
  };
}