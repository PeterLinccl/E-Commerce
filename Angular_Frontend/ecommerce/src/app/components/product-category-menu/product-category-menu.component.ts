import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productcategory: ProductCategory[] = [];

  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
   this.producService.getProductCatories().subscribe(
    data => {//log data returned from the service, into JSON format
      console.log('Product Categories = ' + JSON.stringify(data,null,'SPACE '));
      this.productcategory = data;
    }
   );
  }

}
