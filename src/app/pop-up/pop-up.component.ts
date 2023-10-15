import { Component, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})

export class PopUpComponent {
  constructor(private http: HttpClient, private router: Router) {}

  // Émet un événement pour fermer la pop-up
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() citySelected: EventEmitter<any> = new EventEmitter();

  // Tableau pour stocker les résultats de recherche
  results: any[] = [];

  // Objet de sujet pour gérer les termes de recherche en cours
  private searchTerms = new Subject<string>();

  // Fonction pour fermer la pop-up
  public closePopUp(): void {
    this.close.emit(true);
  }

  // Sélectionne une ville, émet un événement et navigue vers une autre page
  selectCity(city: any) {
    this.citySelected.emit(city);
    console.log(city.nom);

    // Navigue vers la page "cards" avec le paramètre de requête "city"
    this.router.navigate(['/cards'], { queryParams: { city: city.nom } });

    // Ferme la pop-up
    this.closePopUp();
  }

  // Gère les changements dans l'entrée de recherche
  onInputChange(event: any) {
    const selectedCity = event.target.value;
    this.searchTerms.next(selectedCity);
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        // "distinctUntilChanged" pour éviter d'envoyer des requêtes inutiles si le terme de recherche n'a pas changé
        distinctUntilChanged(),
  
        // "switchMap" pour gérer les demandes asynchrones en annulant les requêtes précédentes si de nouvelles arrivent
        switchMap((selectedCity: string) => {
          //  l'URL de l'API à interroger en fonction du terme de recherche
          const apiUrl = `https://geo.api.gouv.fr/communes?nom=${selectedCity}`;
  
          // Effectue une requête HTTP GET pour récupérer les données de la ville depuis l'API
          return this.http.get(apiUrl);
        })
      )
      .subscribe((data: any) => {
        // Lorsque les données sont récupérées avec succès, on stcok dans results"
        this.results = data;
      });
  }
  
}
