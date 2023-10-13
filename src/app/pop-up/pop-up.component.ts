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

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() citySelected: EventEmitter<any> = new EventEmitter();

  results: any[] = [];
  private searchTerms = new Subject<string>();

  public closePopUp(): void {
    this.close.emit(true);
  }
  selectCity(city: any) {
    this.citySelected.emit(city); 
    console.log(city.nom)
    this.router.navigate(['/cards'], { queryParams: { city: city.nom } });
    this.closePopUp();
  }
  onInputChange(event: any) {
    const selectedCity = event.target.value;
    this.searchTerms.next(selectedCity);
  }

  ngOnInit() {
    this.searchTerms
      .pipe(
        distinctUntilChanged(), 
        switchMap((selectedCity: string) => {
          const apiUrl = `https://geo.api.gouv.fr/communes?nom=${selectedCity}`;
          return this.http.get(apiUrl);
        })
      )
      .subscribe((data: any) => {
        this.results = data;
      });
  }

}
