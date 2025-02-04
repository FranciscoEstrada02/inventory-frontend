import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products.component';
import { ProductService } from './product.service';
import { of, throwError } from 'rxjs';
import { Product } from './product.model';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', description: 'Desc 1', price: 100, stock: 10, category: 'hola' },
    { id: 2, name: 'Product 2', description: 'Desc 2', price: 200, stock: 5, category: 'hola'}
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productService.getProducts.and.returnValue(of(mockProducts));

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should display products in the template', () => {
    const compiled = fixture.nativeElement;
    const productCards = compiled.querySelectorAll('.product-card');
    expect(productCards.length).toBe(2);
    expect(productCards[0].querySelector('h3').textContent).toContain('Product 1');
    expect(productCards[1].querySelector('.price').textContent).toContain('€100.00');
  });

  it('should show error message when service fails', () => {
    productService.getProducts.and.returnValue(throwError(() => new Error('API Error')));
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.error).toBe('Error al cargar el catálogo');
    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Error al cargar el catálogo');
  });

  it('should show loading state initially', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('.loading');
    expect(loadingElement).toBeTruthy();
  });
});