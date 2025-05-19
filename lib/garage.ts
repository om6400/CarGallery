// Local storage functionality for the "Garage" (favorites) feature

import { Image } from './types';

// Type for data stored in the Garage
export interface GarageStorage {
  images: { [id: string]: Image };
  folders: { [folderId: string]: GarageFolder };
}

export interface GarageFolder {
  id: string;
  name: string;
  imageIds: string[];
}

const GARAGE_STORAGE_KEY = 'car-visuals-garage';

// Initialize the garage storage if it doesn't exist
export function initGarage(): GarageStorage {
  if (typeof window === 'undefined') {
    // Return empty data if running on the server
    return { images: {}, folders: {} };
  }
  
  const existingData = localStorage.getItem(GARAGE_STORAGE_KEY);
  
  if (!existingData) {
    const initialData: GarageStorage = {
      images: {},
      folders: {
        favorites: {
          id: 'favorites',
          name: 'Favorites',
          imageIds: []
        }
      }
    };
    
    localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  
  return JSON.parse(existingData);
}

// Add an image to the garage
export function addToGarage(image: Image, folderId: string = 'favorites'): void {
  if (typeof window === 'undefined') return;
  
  const garage = getGarage();
  
  // Add image to the images collection if not already present
  garage.images[image.id] = image;
  
  // Add image to the specified folder if not already in it
  if (!garage.folders[folderId]) {
    // Create folder if it doesn't exist
    garage.folders[folderId] = {
      id: folderId,
      name: folderId === 'favorites' ? 'Favorites' : folderId,
      imageIds: []
    };
  }
  
  if (!garage.folders[folderId].imageIds.includes(image.id)) {
    garage.folders[folderId].imageIds.push(image.id);
  }
  
  saveGarage(garage);
}

// Remove an image from a folder or entirely from the garage
export function removeFromGarage(imageId: string, folderId?: string): void {
  if (typeof window === 'undefined') return;
  
  const garage = getGarage();
  
  if (folderId) {
    // Remove from specific folder only
    if (garage.folders[folderId]) {
      garage.folders[folderId].imageIds = garage.folders[folderId].imageIds.filter(id => id !== imageId);
    }
  } else {
    // Remove from all folders
    Object.keys(garage.folders).forEach(key => {
      garage.folders[key].imageIds = garage.folders[key].imageIds.filter(id => id !== imageId);
    });
    
    // Remove from images collection
    delete garage.images[imageId];
  }
  
  saveGarage(garage);
}

// Create a new folder
export function createFolder(name: string): string {
  if (typeof window === 'undefined') return '';
  
  const garage = getGarage();
  const id = name.toLowerCase().replace(/\s+/g, '-');
  
  if (!garage.folders[id]) {
    garage.folders[id] = {
      id,
      name,
      imageIds: []
    };
    
    saveGarage(garage);
  }
  
  return id;
}

// Delete a folder (but keep the images in the garage)
export function deleteFolder(folderId: string): void {
  if (typeof window === 'undefined') return;
  
  // Never delete the favorites folder
  if (folderId === 'favorites') return;
  
  const garage = getGarage();
  
  if (garage.folders[folderId]) {
    delete garage.folders[folderId];
    saveGarage(garage);
  }
}

// Get all images in a folder
export function getImagesInFolder(folderId: string): Image[] {
  const garage = getGarage();
  
  if (!garage.folders[folderId]) {
    return [];
  }
  
  return garage.folders[folderId].imageIds
    .map(id => garage.images[id])
    .filter(Boolean);
}

// Get all folders
export function getFolders(): GarageFolder[] {
  const garage = getGarage();
  return Object.values(garage.folders);
}

// Check if an image is in the garage
export function isInGarage(imageId: string): boolean {
  const garage = getGarage();
  return !!garage.images[imageId];
}

// Check if an image is in a specific folder
export function isInFolder(imageId: string, folderId: string): boolean {
  const garage = getGarage();
  return garage.folders[folderId]?.imageIds.includes(imageId) || false;
}

// Helper function to get the garage data
function getGarage(): GarageStorage {
  if (typeof window === 'undefined') {
    return { images: {}, folders: {} };
  }
  
  const data = localStorage.getItem(GARAGE_STORAGE_KEY);
  return data ? JSON.parse(data) : initGarage();
}

// Helper function to save the garage data
function saveGarage(garage: GarageStorage): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(garage));
}