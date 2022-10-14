import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItems } from 'src/app/common/cart-items';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',

  templateUrl: './product-table-grid.component.html',  
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId: number;
  previousCategoryId:number;//remove number = 1, 404 not found pop out
  searchMode: boolean =false;
 

  thePageNumber : number = 1;
  thePageSize : number = 12;
  theTotalElements: number = 0;

  previousKeyWord: string = "";

  constructor(private productService:ProductService,
              private cartService : CartService,
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

    //if we have different key word than previous then set thePageNumber to 1

    if(this.previousKeyWord != theKeyword){
      this.thePageNumber = 1;

    }

    this.previousKeyWord = theKeyword;

    console.log(`keyword=${theKeyword} , thePageNumber=${this.thePageNumber}`);
    


    this.productService.getProductPagination(this.thePageNumber - 1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
      
  }

  handleListProducts(){
    //invoked once subscribe, fetch data from product component
      // check if id parameter is available, using active route ,state of route at this given time and map of all routes parameter
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
      

     
      if (hasCategoryId) {
        // now get the products for the given category id
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      this.productService.getProductListPagination(this.thePageNumber - 1, // typescript pagenumber is 1 base but database is 0 base
                                                  this.thePageSize,
                                                  this.currentCategoryId).subscribe(
                                                  this.processResult());
    }else{
      this.productService.getProductListPaginationNoCategory(this.thePageNumber - 1,
                                                            this.thePageSize).subscribe(this.processResult());
    }
      /*
        check if we have a different category than previous 
        Note: Angular will reuse a component if it  is currently being viewed
        
        if we have a different category id than previous then set thePageNumber back to 1
      */
        if(this.previousCategoryId != this.currentCategoryId){
          this.thePageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        console.log(`currentCateforyId=${this.currentCategoryId} , thePageNumber=${this.thePageNumber}`);
        


      //now get the products list  pagiantion
  
    // this.productService.getProductListPagination(this.thePageNumber - 1, // typescript pagenumber is 1 base but database is 0 base
    //                                               this.thePageSize,
    //                                               this.currentCategoryId).subscribe(
    //                                               this.processResult());
  }
  //updatePageSize(pageSize: String){this.thePageSize = +pageSize; this.thePageNumber = 1;
  //this.listProducts()} method for change page size
  processResult() {
    return (data: any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct : Product){
    
    console.log(`Adding to Cart: ${theProduct.name} , ${theProduct.unitPrice}`);

    //call addtocart method
    const theCartItem = new CartItems(theProduct);

    this.cartService.addToCart(theCartItem);
    
  }

}
