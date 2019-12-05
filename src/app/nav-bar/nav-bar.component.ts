import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  burgerClik: boolean = false;
  constructor() { }

  ngOnInit() {
  }


  onNavBarBurgerClick(){
    this.burgerClik = !this.burgerClik;
  }
}
