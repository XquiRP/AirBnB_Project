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
    this.imageWithPrefix = 'data:image/jpeg;base64,' + this.accomodation.image;
    this.backgroundSize = 'cover';
    this.formattedRating = this.accomodation.rating.toLocaleString('fr-FR', {
      maximumFractionDigits: 1,
    });

    const isFavorite = this.cookieService.get('favori_' + this.accomodation.id);

    if (isFavorite === 'true') {
      this.accomodation.favourite = true;
    }
    else{
      this.accomodation.favourite = false;
    }
  }
  toggleFavorite() {
    this.accomodation.favourite = !this.accomodation.favourite;

    this.cookieService.set(
      'favori_' + this.accomodation.id,
    this.accomodation.favourite.toString(),
    365);
  }
}