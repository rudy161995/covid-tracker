import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }


  private globalDataUrl = "https://corona-api.com/countries"

  getCountriesDateWise(con?){
    const countryCode = con ? "/" + con : ""; 
    return this.http.get(this.globalDataUrl + countryCode ).pipe(
      map((res) => {
        console.log(res)
        return res
      })
    )
  }



}
