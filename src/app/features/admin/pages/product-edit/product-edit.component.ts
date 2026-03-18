import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { Product, ProductFormData } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CURRENCIES } from '../../data/currencies.data';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly CURRENCIES = CURRENCIES;

  isLoading = signal(false);
  isLoadingProduct = signal(true);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  imagePreview = signal<string | null>(null);
  currentProduct = signal<Product | null>(null);
  newImageSelected = signal(false);
  productNotFound = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    quality: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    productDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    currency: ['USD', Validators.required],
  });

  ngOnInit() {
    this.loadProduct();
  }

  private async loadProduct() {
    try {
      this.isLoadingProduct.set(true);
      const productId = this.route.snapshot.paramMap.get('id');

      if (!productId) {
        this.productNotFound.set(true);
        this.isLoadingProduct.set(false);
        return;
      }

      const product = await this.productService.getProduct(productId);

      if (!product) {
        this.productNotFound.set(true);
        this.isLoadingProduct.set(false);
        return;
      }

      this.currentProduct.set(product);
      this.imagePreview.set(product.productImage);

      // Populate form with existing data
      this.form.patchValue({
        productName: product.productName,
        quality: product.quality,
        productDescription: product.productDescription,
        amount: product.amount,
        currency: product.currency,
      });

      this.isLoadingProduct.set(false);
    } catch (error) {
      console.error('Error loading product:', error);
      this.errorMessage.set('Failed to load product. Please try again.');
      this.isLoadingProduct.set(false);
    }
  }

  onImageSelected(event: Event) {
    try {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (!file) return;

      // Validate file
      this.productService['validateImageFile'](file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
        this.newImageSelected.set(true);
        this.errorMessage.set(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid image file';
      this.errorMessage.set(message);
    }
  }

  async updateProduct() {
    try {
      if (this.form.invalid) {
        this.errorMessage.set('Please fill in all required fields correctly');
        return;
      }

      const product = this.currentProduct();
      if (!product) return;

      this.isLoading.set(true);
      this.errorMessage.set(null);

      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      let productImage = product.productImage;

      // Upload new image if selected
      if (this.newImageSelected() && imageInput?.files?.[0]) {
        productImage = await this.productService.uploadProductImage(imageInput.files[0]);
        // Delete old image if it exists
        if (product.productImage) {
          await this.productService['deleteImage'](product.productImage).catch(() => {
            // Ignore error if old image doesn't exist
          });
        }
      }

      const formValue = this.form.getRawValue();
      const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
        ...formValue,
        productImage,
      };

      await this.productService.updateProduct(product.id!, productData);

      this.successMessage.set('Product updated successfully!');
      this.isLoading.set(false);

      // Redirect to list after 1.5 seconds
      setTimeout(() => {
        this.router.navigate(['/admin/products']);
      }, 1500);
    } catch (error) {
      this.isLoading.set(false);
      const message = error instanceof Error ? error.message : 'Failed to update product';
      this.errorMessage.set(message);
      console.error('Error updating product:', error);
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return null;

    if (field.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
    if (field.errors['minlength']) {
      return `${this.formatFieldName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['maxlength']) {
      return `${this.formatFieldName(fieldName)} must be at most ${field.errors['maxlength'].requiredLength} characters`;
    }
    if (field.errors['min']) {
      return `${this.formatFieldName(fieldName)} must be at least ${field.errors['min'].min}`;
    }
    if (field.errors['max']) {
      return `${this.formatFieldName(fieldName)} must be at most ${field.errors['max'].max}`;
    }

    return null;
  }

  private formatFieldName(name: string): string {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  }

  goBack() {
    this.router.navigate(['/admin/products']);
  }
}
