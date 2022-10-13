import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

//map the json data from Spring data rest to product array, to dispay each products 
  getProductList(theCategoryId : number): Observable<Product[]> {
    
    //@todo: need to build url based on category id  
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  //to dispay products in pages 
  getProductListPagination(thePage: number,
                           thePageSize: number,
                           theCategoryId : number): Observable<GetResponseProducts> {
    
    //@todo: need to build url based on category id ,Spring data rest supports pagination out of the box. Just send the parameters of the page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+ `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


//map the json data from Spring data rest to productCategoy array, to display each category on the side bar
  getProductCatories(): Observable<ProductCategory[]>{
    //call rest api
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
  searchProducts(theKeyword : string): Observable<Product[]> {
    
    //@todo: need to build url based on category id  
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  
    return this.getProducts(searchUrl);
  }
    //seach product pagination
    getProductPagination(thePage: number,
                          thePageSize: number,
                          theKeyword : string): Observable<GetResponseProducts> {

      //@todo: need to build url based on category id ,Spring data rest supports pagination out of the box. Just send the parameters of the page and size
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                        + `&page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<GetResponseProducts>(searchUrl);
      }

  
  //click on the product for product detail
  getProduct(theProductId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${theProductId}`;
    
    return this.httpClient.get<Product>(productUrl);

  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}



//unwraps the json from spring data rest embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{//pagination
    size: number;
    totalElements: number;
    totalPages: number;
    number : number;
  }
}

//unwraps the json from spring data rest embedded entry
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

