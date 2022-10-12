import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  } 

  doSearch(value : String){
    console.log(`value= ${value}`);
    //search handle by productList component
    this.router.navigateByUrl(`/search/${value}`);
  }

}
