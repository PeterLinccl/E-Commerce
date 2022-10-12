import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',

  templateUrl: './product-table-grid.component.html',  
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean =false;

  constructor(private productService:ProductService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.listProducts();
    });
  }

  listProducts() {
    //if there is keyword parameter
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  }
  //get keyword
  handleSearchProducts() {
    const theKeyword:string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      })
  }
  handleListProducts(){
    //invoked once subscribe, fetch data from product component
      // check if id parameter is available, using active route ,state of route at this given time and map of all routes parameter
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if(hasCategoryId){
        //read the id(parameter string) and convert using "+" to the number, ! IS non-null operator, tell compiler it's not null
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }else{
        // if none of category id is available... return default
        this.currentCategoryId = 1  ;
      }
  
      //now get the products for the given category id
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data =>{
          this.products = data;//assign result to the product array
        }
      )
  }

}
