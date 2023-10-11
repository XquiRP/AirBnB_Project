import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccomodationType } from 'src/app/models/cards';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.scss']
})
export class CardsContentComponent implements OnInit {

  @Input() accomodation: AccomodationType;

  constructor(){}

  prix:number;
  zipCode:number;
  rating:number;
  favourite:boolean;
  name:string;
  id:number;

  formattedRating: string;
  
  imageWithPrefix: string;
  backgroundSize: string;

  ngOnInit(): void {
    this.imageWithPrefix = "data:image/jpeg;base64," + this.accomodation.image;
    this.backgroundSize = 'cover';
    this.formattedRating = this.accomodation.rating.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
  }  

}
