import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccomodationType } from 'src/app/models/cards';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit{

  cards$: Observable<Array<AccomodationType>>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void 
  {
    const url = 'http://localhost:3000/accommodations'; 
    this.cards$ = this.http.get<Array<AccomodationType>>(url); 
  }
}