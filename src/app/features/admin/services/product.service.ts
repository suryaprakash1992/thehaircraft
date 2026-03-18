import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '@angular/fire/storage';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  /**
   * Upload product image to Firebase Storage
   * @param file - Image file (jpg, png only, max 1MB)
   * @param productId - Product document ID
   * @returns Download URL of uploaded image
   */
  async uploadProductImage(file: File, productId?: string): Promise<string> {
    this.validateImageFile(file);

    const timestamp = Date.now();
    const sanitizedName = this.sanitizeFileName(file.name);
    const storagePath = `product_images/${timestamp}_${sanitizedName}`;

    try {
      const storageRef = ref(this.storage, storagePath);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error: any) {
      console.error('Image upload failed:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Create new product with image
   * @param product - Product data
   * @param imageFile - Image file to upload
   * @returns Created product ID
   */
  async createProduct(product: Omit<Product, 'id' | 'createdAt'>, imageFile: File): Promise<string> {
    try {
      // Upload image first
      const imageUrl = await this.uploadProductImage(imageFile);

      // Add product to Firestore
      const productsRef = collection(this.firestore, 'products');
      const docRef = await addDoc(productsRef, {
        ...product,
        productImage: imageUrl,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error: any) {
      console.error('Product creation failed:', error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  /**
   * Get all products
   * @returns Array of products
   */
  async getProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(this.firestore, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  /**
   * Get single product by ID
   * @param productId - Product document ID
   * @returns Product data
   */
  async getProduct(productId: string): Promise<Product | null> {
    try {
      const productRef = doc(this.firestore, 'products', productId);
      const docSnapshot = await getDoc(productRef);

      if (!docSnapshot.exists()) {
        return null;
      }

      return {
        id: docSnapshot.id,
        ...docSnapshot.data()
      } as Product;
    } catch (error: any) {
      console.error('Failed to fetch product:', error);
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  /**
   * Update product
   * @param productId - Product document ID
   * @param product - Updated product data
   * @param newImage - New image file (optional)
   */
  async updateProduct(
    productId: string,
    product: Partial<Product>,
    newImage?: File
  ): Promise<void> {
    try {
      const productRef = doc(this.firestore, 'products', productId);
      const updateData: any = {
        ...product,
        updatedAt: Timestamp.now()
      };

      // Upload new image if provided
      if (newImage) {
        const imageUrl = await this.uploadProductImage(newImage, productId);
        updateData.productImage = imageUrl;

        // Delete old image
        const oldProduct = await this.getProduct(productId);
        if (oldProduct?.productImage) {
          await this.deleteImage(oldProduct.productImage);
        }
      }

      await updateDoc(productRef, updateData);
    } catch (error: any) {
      console.error('Product update failed:', error);
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  /**
   * Delete product
   * @param productId - Product document ID
   */
  async deleteProduct(productId: string): Promise<void> {
    try {
      // Get product to delete associated image
      const product = await this.getProduct(productId);
      if (product?.productImage) {
        await this.deleteImage(product.productImage);
      }

      // Delete product document
      const productRef = doc(this.firestore, 'products', productId);
      await deleteDoc(productRef);
    } catch (error: any) {
      console.error('Product deletion failed:', error);
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  /**
   * Delete image from storage
   * @param imageUrl - Download URL of image
   */
  private async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(this.storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Failed to delete image:', error);
      // Continue even if image deletion fails
    }
  }

  /**
   * Validate image file
   * @param file - File to validate
   */
  private validateImageFile(file: File): void {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPG and PNG images are allowed');
    }

    if (file.size > maxSize) {
      throw new Error('Image size must be less than 1MB');
    }
  }

  /**
   * Sanitize file name for storage
   * @param fileName - Original file name
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '_')
      .substring(0, 100);
  }
}
