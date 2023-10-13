import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavItems } from 'src/app/models/NavItems';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  navItems$: Observable<Array<NavItems>>; 
  selectedCity: string = '';

  openPopUp: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  navigateToCards() {
    this.router.navigate(['/cards'], { queryParams: { city: '' } });
  }

  ngOnInit(): void {
    const url = 'http://localhost:3000/carousel'; 
    this.navItems$ = this.http.get<Array<NavItems>>(url); 
  }
}
