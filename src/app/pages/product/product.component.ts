import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService, Product } from '../../auth.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  products: Product[] = [];

  ngOnInit(): void {
    this.authService.getProducts().subscribe({
      next: (result) => {
        console.log('RESULT:', result);
        console.log('IS ARRAY:', Array.isArray(result));
  
        this.products = result;
  
        console.log('PRODUCTS:', this.products);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
