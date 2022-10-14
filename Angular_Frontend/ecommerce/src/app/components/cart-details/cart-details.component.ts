import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/common/cart-items';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItems[]=[];
  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe to the cart totalQuantity
      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      );

    //compute cart total price and quantity
        this.cartService.computerCartTotals();
  }

  incrementQuantity(theCartItem: CartItems){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItems){
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem:CartItems){
    this.cartService.remove(theCartItem);
  }

}
