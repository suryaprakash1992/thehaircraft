import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { ContactSubmission } from '../../shared/models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore = inject(Firestore);
  private readonly contactCollection = collection(this.firestore, 'contacts');

  submit(payload: ContactSubmission): Promise<void> {
    return addDoc(this.contactCollection, {
      ...payload,
      createdAt: new Date().toISOString()
    }).then(() => undefined);
  }
}
