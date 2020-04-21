import { Component } from '@angular/core';
import * as HC from 'highcharts/highmaps';
import MapModule from 'highcharts/modules/map';
import ExportingModule from 'highcharts/modules/exporting';
import worldMap from '../assets/worldMap';

MapModule(HC);
ExportingModule(HC);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tracker';
  chartConstructor = "mapChart";
  chartOptions = {
    chart: {
      borderWidth: 1,
      map: worldMap
    },
    title: {
      text: 'dsad'
    },
    subtitle: {
      text: ''
    },
    legend: {
      enabled: false
    },
    mapNavigation: {
      enabled: false,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    series: [
      {
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: false
      },
      {
        type: 'mapbubble',
        name: 'Total Commitments',
        joinBy: [
          'iso-a3',
          'code3'
        ],
        data: [
          {
            "code3": "ABW",
            "z": 105,
            "code": "AW"
          },
          {
            "code3": "AFG",
            "z": 34656,
            "code": "AF"
          }
        ],
        minSize: 4,
        maxSize: '12%',
        tooltip: {
          pointFormat: '{point.properties.hc-a2}: {point.z} M'
        }
      }
    ]
  };
  HC = HC;
  chart;
  updateFlag = false;
  chartCallback;
  constructor() {
    const self = this;
    this.chartCallback = chart => {
      self.chart = chart;
    }
  }
  

}
