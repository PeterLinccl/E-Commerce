import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

//map the json data from Spring data rest to product array
  getProductList(theCategoryId : number): Observable<Product[]> {
    
    //@todo: need to build url based on category id  
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
//unwraps the json from spring data rest embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}