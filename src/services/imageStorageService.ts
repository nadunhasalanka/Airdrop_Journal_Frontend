// Simple client-side image storage service
// In a production app, you'd upload to a cloud service like Cloudinary, AWS S3, etc.

class ImageStorageService {
  private storage = new Map<string, string>();
  
  // Store image as base64 in localStorage with a unique key
  storeImage(file: File, prefix: string = 'img'): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const base64 = reader.result as string;
          const timestamp = Date.now();
          const key = `${prefix}_${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
          
          // Store in localStorage (with size limit check)
          try {
            localStorage.setItem(`airdrop_image_${key}`, base64);
            this.storage.set(key, base64);
            resolve(base64);
          } catch (error) {
            // If localStorage is full, use memory storage only
            this.storage.set(key, base64);
            resolve(base64);
          }
        } catch (error) {
          reject(new Error('Failed to process image'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read image file'));
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  // Get image by key
  getImage(key: string): string | null {
    // Try memory first
    const memoryImage = this.storage.get(key);
    if (memoryImage) return memoryImage;
    
    // Try localStorage
    const storageImage = localStorage.getItem(`airdrop_image_${key}`);
    if (storageImage) {
      this.storage.set(key, storageImage);
      return storageImage;
    }
    
    return null;
  }
  
  // Remove image
  removeImage(key: string): void {
    this.storage.delete(key);
    localStorage.removeItem(`airdrop_image_${key}`);
  }
  
  // Get storage stats
  getStorageStats(): { memoryCount: number; localStorageCount: number } {
    const memoryCount = this.storage.size;
    let localStorageCount = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('airdrop_image_')) {
        localStorageCount++;
      }
    }
    
    return { memoryCount, localStorageCount };
  }
  
  // Clear all stored images
  clearAll(): void {
    this.storage.clear();
    
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('airdrop_image_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

export const imageStorageService = new ImageStorageService();
