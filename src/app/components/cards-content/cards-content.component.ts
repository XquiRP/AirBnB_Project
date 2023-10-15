import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { AccomodationType } from 'src/app/models/cards';

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.scss']
})
export class CardsContentComponent implements OnInit {
  @Input() accomodation: AccomodationType;

  constructor(private cookieService: CookieService) {}

  imageWithPrefix: string;
  backgroundSize: string;
  formattedRating: string;

  ngOnInit(): void {
    // Construi l'URL de l'image en ajoutant un préfixe aux données binaires de l'image
    this.imageWithPrefix = 'data:image/jpeg;base64,' + this.accomodation.image;
  
    // Défini la taille de l'arrière-plan de l'image à "cover"
    this.backgroundSize = 'cover';
  
    // Formate la note en utilisant une virgule comme séparateur décimal et avec une seule décimale
    this.formattedRating = this.accomodation.rating.toLocaleString('fr-FR', {
      maximumFractionDigits: 1,
    });
  
    // Vérifie si l'élément est en favori en se basant sur les cookies
    const isFavorite = this.cookieService.get('favori_' + this.accomodation.id);
  
    // Mettre à jour la propriété 'favourite' en fonction de la valeur du cookie
    if (isFavorite === 'true') {
      this.accomodation.favourite = true;
    } else {
      this.accomodation.favourite = false;
    }
  }
  
  toggleFavorite() {
    // Inverser l'état de 'favourite' lorsque l'utilisateur clique sur l'élément
    this.accomodation.favourite = !this.accomodation.favourite;
  
    // Mets à jour un cookie pour enregistrer l'état 'favourite'
    this.cookieService.set(
      'favori_' + this.accomodation.id,
      this.accomodation.favourite.toString(),
      365
    );
  }
  
}