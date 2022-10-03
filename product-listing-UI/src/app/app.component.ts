import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Product Listing App';

  constructor(private _router: Router) {}

  ngOnInit(): void {
    const currentUserObj = localStorage.getItem('currentUser');
    console.log('Current User Obj : ', currentUserObj);

    if (!currentUserObj) {
      this._router.navigate(['account/login']);
    } else {
      this._router.navigate(['products']);
    }
  }
}
