import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import _ from 'lodash';
import IndiaJson from "../../assets/india_map.json";

@Injectable({
  providedIn: 'root'
})
export class IndiaService {

  constructor(private baseService: BaseService) { }

  getStateDistWiseCase() {
    return new Promise((res, rej) => {
      this.baseService.getData('https://api.covid19india.org/state_district_wise.json').then((response) => {
        res(response);
      }).catch((err) => {
        console.log(err);

        rej(err);
      })
    })
  }

  getData() {
    return new Promise((res, rej) => {
      this.baseService.getData('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise').then((response) => {
        res(this.processStateData(response['data']));
        // res(response)
      }).catch((err) => {
        console.log(err);

        rej(err);
      })
    })
  }

  processStateData(res: any) {
    if (res['statewise']) {
      _.forEach(res['statewise'], (state) => {
        var stateObj = _.find(IndiaJson['data'], (st) => {
          return st.name === state['state']
        });
        state['id'] = stateObj?stateObj.id:'';
        state['value'] = state['confirmed'];
      })
    }
    return res;
  }

}
