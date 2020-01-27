import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value);
    else
    this.productService.updateProduct(productForm.value);
    
    this.resetForm(productForm);
    this.toastrService.success('Sucessful Operation', 'Sucessful Operation');
  }
  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Product();
  }

}
