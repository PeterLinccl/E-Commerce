import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItems } from '../common/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItems[]=[];

  totalPrice : Subject <number> = new Subject<number>();

  totalQuantity : Subject <number> = new Subject<number>();



  constructor() {
    //
   }

   addToCart(theCartItem:CartItems){
    //check if we already have item in the cart
    let alreadyExistsInCart:boolean = false;
    let existCartItem: CartItems = undefined;

    //find the item base on id
    if(this.cartItems.length > 0){
      for(let tempCartItems of this.cartItems){
        if(tempCartItems.id === theCartItem.id){
          existCartItem =tempCartItems;
          break;
        }
      }

          //check if we found it
          alreadyExistsInCart = (existCartItem != undefined);

    }
    if(alreadyExistsInCart){
      existCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }

    this.computerCartTotals();
   }

  computerCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number =0;
    
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for degbugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

  }
  
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('contents of the cart');

    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);

    }
      
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);

    console.log(`--`);
    

  }

}
