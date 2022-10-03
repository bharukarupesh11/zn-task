import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null;
  product: Product[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductsService
  ) {
    this.productId = this._route.snapshot.paramMap.get('productId');
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this._productService.get(this.productId).subscribe((product) => {
      this.product = product as Product[];
      console.log(this.product);
    });
  }
}
