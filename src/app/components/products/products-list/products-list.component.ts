import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {

    if (confirm('Are you sure do you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastrService.success('Success Full Operation', 'Product Deleted');
    }
  }

}
