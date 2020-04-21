import { Injectable } from '@angular/core';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(private baseService: BaseService) { }

  getTotalCases() {
    return new Promise((res, rej) => {
      this.baseService.getData('https://corona-api.com/countries').then((response) => {
        res(this.processWorldData(response));
      }).catch((err) => {
        console.log(err);

        rej("Error");
      })
    })
  }

  processWorldData(response) {
    let confirmed = 0, deaths = 0, recovered = 0, active = 0, critical = 0;
    if (response['data']) {
      response['data'].forEach(element => {
        element['z'] = element['latest_data']['calculated']['cases_per_million_population'];
        confirmed += element['latest_data']['confirmed'];
        deaths += element['latest_data']['deaths'];
        recovered += element['latest_data']['recovered'];
        critical += element['latest_data']['critical'];
      });
      response['data']['confirmed'] = confirmed;
      response['data']['deaths'] = deaths;
      response['data']['recovered'] = recovered;
      response['data']['critical'] = critical;
      response['data']['active'] = confirmed - deaths - recovered;
    }
    return response;
  }

  getDaybyDayCase(){
    return new Promise((res, rej) => {
      this.baseService.getData('https://corona-api.com/timeline').then((response) => {
        res(this.processDaybyDayCase(response));
      }).catch((err) => {
        console.log(err);

        rej("Error");
      })
    })
  }

  processDaybyDayCase(response){
    let confirmed = [], deaths = [], recovered = [], active = [], critical = 0,date=[];
    // if (response['data']) {
    //   response['data'].forEach(element => {
    //     confirmed.push(element['confirmed']);
    //     deaths.push(element['deaths']);
    //     recovered.push(element['recovered']);
    //     active.push(element['active']);
    //     date.push(element['date']);
    //   });
    // }
    // response['confirmed'] = confirmed;
    // response['deaths'] = deaths;
    // response['recovered'] = recovered;
    // response['active'] = active;
    // response['date'] = active;
    return response;
  }
}
