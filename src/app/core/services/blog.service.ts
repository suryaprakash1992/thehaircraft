import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { catchError, map, of, shareReplay } from 'rxjs';
import { MOCK_BLOGS } from '../../shared/data/mock-data';
import { BlogPost } from '../../shared/models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly firestore = inject(Firestore);
  private readonly blogCollection = collection(this.firestore, 'blogs');
  readonly posts$ = collectionData(this.blogCollection, { idField: 'id' }).pipe(
    map((posts) => ((posts as BlogPost[]).length ? (posts as BlogPost[]) : MOCK_BLOGS)),
    catchError(() => of(MOCK_BLOGS)),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  readonly posts = toSignal(this.posts$, { initialValue: MOCK_BLOGS });
  readonly latestPosts = computed(() => this.posts().slice(0, 3));
}
