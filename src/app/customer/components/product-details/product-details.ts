import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { ProductResponseDto } from "../../../models/product-response";
import { CustomerProductService } from "../../../services/products/customer-product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
  standalone: false
})
export class ProductDetails implements OnInit {
    
  product: ProductResponseDto | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: CustomerProductService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('DETAILS ROUTE ID =', id);

    if (!id) {
      this.error = 'Invalid product id';
      return;
    }

    this.loadDetails(id);
  }

  private loadDetails(id: number): void {
    this.loading = true;
    this.error = '';
    this.product = null;
    this.cdr.detectChanges();

    this.productService.getProductById(id)
      .pipe(
        finalize(() => {
          console.log('DETAILS finalize() -> loading=false');
          this.zone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (res) => {
          console.log('DETAILS success:', res);

          this.zone.run(() => {
            this.product = res;
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error('DETAILS error:', err);

          this.zone.run(() => {
            this.error = `Failed to load product details (${err.status})`;
            this.cdr.detectChanges();
          });
        }
      });
  }

  // helper to display nutrientsJson safely
  getNutrientsText(): string {
    if (!this.product?.nutrientsJson) return 'No nutrients available';
    return this.product.nutrientsJson;
  }

  formatPrice(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(2);
  }

  back(): void {
    this.router.navigate(['/customer/dashboard']);
  }
}
