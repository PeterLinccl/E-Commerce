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

    if(this.cartItems.length > 0){
    //find the item base on id
      existCartItem = this.cartItems.find(tempCartItem => theCartItem.id  === tempCartItem.id);

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

  // -- for cart quantity
  decrementQuantity(theCartItem: CartItems) {
    theCartItem.quantity--;

    if(theCartItem.quantity == 0){
      this.remove(theCartItem);
    }else{
      this.computerCartTotals();
    }
  }

  remove(theCartItem: CartItems) {

    //get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);
    //if found,remove the item from the array 
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computerCartTotals();
    }

  }

}
