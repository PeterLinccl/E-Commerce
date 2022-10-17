import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[]=[];

    //month dropdown list
    for(let theMonth = startMonth; theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    //convert to obserable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    //year dropdown list

    const startYear: number = new Date().getFullYear();

    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear ; theYear++){
      data.push(theYear);
    }

    return of(data);

  }

}
