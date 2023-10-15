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
  //Tableau de carte : AccomodationType
  cards: Array<AccomodationType>;
  selectedCity: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Écoute les paramètres de la requête dans l'URL
    this.route.queryParams.subscribe((queryParams) => {
      // Vérifie si le paramètre 'city' existe dans les paramètres de la requête
      this.selectedCity = 'city' in queryParams ? queryParams['city'] : '';
  
      // Charge les cartes en appelant la méthode loadCards() qui renvoie un Observable
      this.loadCards().subscribe((accomodations) => {
        // Si une ville est sélectionnée
        if (this.selectedCity) {
          // Filtre les cartes pour n'afficher que celles correspondant à la ville sélectionnée
          this.cards = accomodations.filter((accomodation) => {
            return accomodation.city_name == this.selectedCity;
          });
        } else {
          // Si aucune ville n'est sélectionnée, afficher toutes les cartes
          this.cards = accomodations;
        }
      });
    });
  }
  loadCards(): Observable<Array<AccomodationType>> {
    const url = 'http://localhost:3000/accommodations?city=' + this.selectedCity;
    return this.http.get<Array<AccomodationType>>(url);
  }
  navigateToPage(cityId: number) {
    this.router.navigate(['city', cityId]);
  }
}
