import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-payment-info-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionTitleComponent],
  templateUrl: './payment-info-page.component.html',
  styleUrls: ['./payment-info-page.component.scss']
})
export class PaymentInfoPageComponent {}
