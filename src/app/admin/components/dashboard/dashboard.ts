import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponseDto } from '../../../models/product-response';
import { AdminProductService } from '../../../services/products/admin-product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: false
})
export class Dashboard implements OnInit {

  searchName = '';
  loading = false;
  error = '';

  // Search results
  displayedColumnsSearch: string[] = ['image','name','brand','estimatedPrice','calories','actions'];
  searchDataSource = new MatTableDataSource<ProductResponseDto>([]);

  // Approved products
  displayedColumnsApproved: string[] = ['image','name','brand','calories','actions'];
  approvedDataSource = new MatTableDataSource<ProductResponseDto>([]);

  constructor(
    private productService: AdminProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadApproved();
  }

  search(): void {
    const q = this.searchName.trim();
    if (!q) return;

    this.loading = true;
    this.error = '';

    this.productService.searchProductsByName(q).subscribe({
      next: (res) => {
        this.searchDataSource.data = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to search products';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadApproved(): void {
    this.productService.getApprovedProducts().subscribe({
      next: (res) => {
        this.approvedDataSource.data = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load approved products';
        this.cdr.detectChanges();
      }
    });
  }

  approve(p: ProductResponseDto): void {
    const payload = { ...p, categoryId: 1 };
    this.productService.approveProduct(payload).subscribe({
      next: () => {
        // refresh approved list
        this.loadApproved();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Approve failed';
        this.cdr.detectChanges();
      }
    });
  }

  removeApproved(p: ProductResponseDto): void {
    this.productService.deleteProduct(p.id).subscribe({
      next: () => {
        this.loadApproved();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Delete failed';
        this.cdr.detectChanges();
      }
    });
  }
}
