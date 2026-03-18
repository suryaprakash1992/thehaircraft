import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CURRENCIES, getCurrencyLabel } from '../../data/currencies.data';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly currencies = CURRENCIES;
  readonly getCurrencyLabel = getCurrencyLabel;

  readonly form = this.formBuilder.nonNullable.group({
    productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    quality: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    productDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    currency: ['USD', Validators.required]
  });

  readonly selectedImage = signal<File | null>(null);
  readonly imagePreview = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    try {
      this.productService['validateImageFile'](file);
      this.selectedImage.set(file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      this.errorMessage.set(null);
    } catch (error: any) {
      this.errorMessage.set(error.message);
      this.selectedImage.set(null);
      this.imagePreview.set(null);
      input.value = '';
    }
  }

  clearImage(): void {
    this.selectedImage.set(null);
    this.imagePreview.set(null);
  }

  async createProduct(): Promise<void> {
    if (this.form.invalid || !this.selectedImage()) {
      if (!this.selectedImage()) {
        this.errorMessage.set('Please select an image');
      } else {
        this.form.markAllAsTouched();
      }
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const formValue = this.form.getRawValue();
      const productData: Omit<Product, 'id' | 'createdAt'> = {
        productName: formValue.productName,
        quality: Number(formValue.quality),
        productImage: '', // Will be set after upload
        productDescription: formValue.productDescription,
        amount: Number(formValue.amount),
        currency: formValue.currency
      };

      const productId = await this.productService.createProduct(
        productData,
        this.selectedImage()!
      );

      this.successMessage.set('Product created successfully!');
      this.form.reset({ currency: 'USD' });
      this.clearImage();

      // Redirect to product list after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/admin/products']);
      }, 2000);
    } catch (error: any) {
      const errorMsg = error?.message ?? 'Failed to create product';
      this.errorMessage.set(errorMsg);
      console.error('Product creation error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (!field?.invalid || !field?.touched) return null;

    if (field.hasError('required')) return `${fieldName} is required`;
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (field.hasError('maxlength')) {
      const maxLength = field.getError('maxlength').requiredLength;
      return `Maximum length is ${maxLength} characters`;
    }
    if (field.hasError('min')) {
      const min = field.getError('min').min;
      return `Minimum value is ${min}`;
    }
    if (field.hasError('max')) {
      const max = field.getError('max').max;
      return `Maximum value is ${max}`;
    }

    return 'Invalid';
  }
}
