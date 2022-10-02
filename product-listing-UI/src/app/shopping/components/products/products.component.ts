import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { CategoryService } from '../../services/category.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private _productService: ProductsService,
    private _categoryService: CategoryService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('inside products component');

    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories() {
    this._categoryService.getAll().subscribe((categories) => {
      this.categories = categories as Category[];
      console.log('Categories: ', this.categories);
    });
  }

  getAllProducts() {
    this._productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products as Product[];
    });
  }

  resetProducts() {
    this.filteredProducts = this.products;
  }

  filterProducts(category: Category) {
    console.log('Category: ', category);
    this.filteredProducts = this.products.filter((product) => {
      return product.category._id === category._id;
    });
  }

  logout() {
    this._authService.logout();
  }
}
