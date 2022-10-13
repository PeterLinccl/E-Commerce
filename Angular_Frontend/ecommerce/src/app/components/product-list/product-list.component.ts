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
  previousCategoryId:number = 1;
  searchMode: boolean =false;
 

  thePageNumber : number = 1;
  thePageSize : number = 12;
  theTotalElements: number = 0;

  previousKeyWord: string = "";

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

      if(hasCategoryId){
        //read the id(parameter string) and convert using "+" to the number, ! IS non-null operator, tell compiler it's not null
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }else{
        // if none of category id is available... return default
        this.currentCategoryId = 1  ;
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
      this.productService.getProductListPagination(this.thePageNumber -1 , // typescript pagenumber is 1 base but database is 0 base
                                                   this.thePageSize,
                                                    this.currentCategoryId).subscribe(
                                                      this.processResult());
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
}
