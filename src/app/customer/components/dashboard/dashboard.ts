import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CustomerProductService } from '../../../services/products/customer-product.service';
import { ProductResponseDto } from '../../../models/product-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: false
})
export class Dashboard implements OnInit {

  products: ProductResponseDto[] = [];
  loading = false;
  error = '';

  constructor(
    private productService: CustomerProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadApproved();
  }

  loadApproved(): void {
    this.loading = true;
    this.error = '';
    this.products = [];
    this.cdr.detectChanges(); // ✅ immediately reflect spinner

    this.productService.getApprovedProducts()
      .pipe(
        finalize(() => {
          this.loading = false;          // ✅ ALWAYS stop spinner
          this.cdr.detectChanges();      // ✅ force UI refresh
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('CUSTOMER /api/products raw:', res);

          // ✅ ensure code runs inside Angular zone
          this.zone.run(() => {
            if (Array.isArray(res)) {
              this.products = res;
            } else if (res?.content && Array.isArray(res.content)) {
              this.products = res.content;
            } else {
              this.products = [];
            }

            this.cdr.detectChanges(); // ✅ update UI now
          });
        },
        error: (err) => {
          console.error('CUSTOMER LOAD ERROR:', err);
          this.zone.run(() => {
            this.error = `Failed to load products (${err.status})`;
            this.cdr.detectChanges();
          });
        }
      });
  }

openDetails(event: MouseEvent, p: ProductResponseDto): void {
  event.preventDefault();
  event.stopPropagation();
  this.router.navigate(['/customer/product', p.id]);
}
}
