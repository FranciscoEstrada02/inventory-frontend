import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list bg-dark text-white p-4">
      <h2 class="text-center mb-4">Catálogo de Productos</h2>
      
      <!-- Mensaje de carga -->
      <div *ngIf="isLoading" class="loading text-center p-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando productos...</p>
      </div>
      
      <!-- Mensaje de error -->
      <div *ngIf="error" class="error alert alert-danger text-center">
        {{ error }}
      </div>

      <!-- Lista de productos -->
      <div *ngIf="!isLoading && !error">
        <div *ngIf="products.length === 0" class="empty alert alert-warning text-center">
          No se encontraron productos
        </div>

        <div class="row">
          <div class="col-md-4 mb-4" *ngFor="let product of products">
            <div class="card bg-secondary text-white h-100">
              <div class="card-body">
                <h3 class="card-title">{{ product.name }}</h3>
                <p class="card-text description">{{ product.description }}</p>
                <div class="details">
                  <span class="badge bg-primary">{{ product.category }}</span>
                  <span class="price">{{ product.price | currency:'EUR' }}</span>
                  <span class="stock">{{ product.stock }} unidades disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list {
      min-height: 100vh;
      padding: 2rem;
    }

    .card {
      border: none;
      border-radius: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card-title {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }

    .description {
      color: #ddd;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .price {
      color: #2ecc71;
      font-weight: bold;
    }

    .stock {
      color: #3498db;
      font-size: 0.9rem;
    }

    .badge {
      font-size: 0.8rem;
      padding: 0.5em 0.75em;
    }
  `]
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el catálogo';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }
}