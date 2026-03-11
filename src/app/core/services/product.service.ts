import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { catchError, map, of, shareReplay } from 'rxjs';
import { MOCK_PRODUCTS } from '../../shared/data/mock-data';
import { Product } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly firestore = inject(Firestore);
  private readonly productsCollection = collection(this.firestore, 'products');

  readonly products$ = collectionData(this.productsCollection, { idField: 'id' }).pipe(
    map((products) => ((products as Product[]).length ? (products as Product[]) : MOCK_PRODUCTS)),
    catchError(() => of(MOCK_PRODUCTS)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly products = toSignal(this.products$, { initialValue: MOCK_PRODUCTS });
  readonly featuredProducts = computed(() => this.products().filter((product) => product.featured));
  readonly bestsellerProducts = computed(() => this.products().filter((product) => product.bestseller));
  readonly categories = computed(() => [...new Set(this.products().map((product) => product.category))]);

  getBySlug(slug: string): Product | undefined {
    return this.products().find((product) => product.slug === slug);
  }

  getRelatedProducts(category: string, currentProductId: string): Product[] {
    return this.products()
      .filter((product) => product.category === category && product.id !== currentProductId)
      .slice(0, 3);
  }
}
