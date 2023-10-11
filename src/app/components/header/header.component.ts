import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavItems } from 'src/app/models/NavItems';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  navItems$: Observable<Array<NavItems>>; 

  openPopUp: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'http://localhost:3000/carousel'; 
    this.navItems$ = this.http.get<Array<NavItems>>(url); 
  }
}
