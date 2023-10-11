import { Component, Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  constructor(private http: HttpClient) {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  public closePopUp(): void {
    this.close.emit(true);
  }

  searchByPostalCode(codePostal: string) {
    const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      // Traitez les données renvoyées par l'API ici
      console.log(data);
    });
  }

}
