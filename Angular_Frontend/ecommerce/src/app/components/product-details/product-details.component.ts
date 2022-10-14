import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { CartItems } from 'src/app/common/cart-items';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product : Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService,
              private _location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
        //read the id(parameter string) and convert using "+" to the number, ! IS non-null operator, tell compiler it's not null
        const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

        this.productService.getProduct(theProductId).subscribe(
          data => {
              this.product = data;
            }
        )
      }

      goToPreviousPage(): void{
        this._location.back();
      }
      addToCart() {
        console.log(`Adding to cart: ${this.product.name},${this.product.unitPrice}`);

        const theCartItem = new CartItems(this.product);
        this.cartService.addToCart(theCartItem);
        
      }
}
