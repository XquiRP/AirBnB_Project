import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccomodationType } from 'src/app/models/cards';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cards: Array<AccomodationType>;
  selectedCity: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.selectedCity = 'city' in queryParams ? queryParams['city'] : '';
      this.loadCards().subscribe((accomodations) => {
        if (this.selectedCity) {
          this.cards = accomodations.filter((accomodation) => {
            return accomodation.city_name == this.selectedCity
          })
        } else {
          this.cards = accomodations
        }
      })
    });
  }

  loadCards(): Observable<Array<AccomodationType>> {
    const url = 'http://localhost:3000/accommodations?city=' + this.selectedCity;
    return this.http.get<Array<AccomodationType>>(url);
  }
  navigateToPage(cityName: string) {
    this.router.navigate(['city', cityName]);
  }
}
