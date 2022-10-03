import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

console.warn('Shopping module loaded');
@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [CommonModule, ShoppingRoutingModule],
})
export class ShoppingModule {}
