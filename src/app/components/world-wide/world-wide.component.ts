import { Component, OnInit, ViewChild } from '@angular/core';
import * as HC from 'highcharts/highmaps';
import MapModule from 'highcharts/modules/map';
import ExportingModule from 'highcharts/modules/exporting';
import worldMap from '../../../assets/worldMap';
import { WorldService } from 'src/app/services/world.service';
import * as _ from 'lodash';

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexStroke,
//   ApexMarkers,
//   ApexYAxis,
//   ApexGrid,
//   ApexTitleSubtitle,
//   ApexLegend
// } from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   dataLabels: ApexDataLabels;
//   markers: ApexMarkers;
//   colors: string[];
//   yaxis: ApexYAxis;
//   grid: ApexGrid;
//   legend: ApexLegend;
//   title: ApexTitleSubtitle;
// };

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

MapModule(HC);
ExportingModule(HC);

@Component({
  selector: 'app-world-wide',
  templateUrl: './world-wide.component.html',
  styleUrls: ['./world-wide.component.css']
})
export class WorldWideComponent implements OnInit {

  title = 'tracker';

  //world map variable starts
  chartConstructor = "mapChart";
  chartOptions = {};
  HC = HC;
  chart;
  updateFlag = false;
  chartCallback;
  //world map variable ends

  // //line chart starts
  // @ViewChild("chart") linechart: ChartComponent;
  // public linechartOptions: Partial<ChartOptions>;

  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions>;

  dailyData = [];
  dailyTotalRecovered = [];
  dailyTotalConfirmed = [];
  dailyTotalDeaths = [];
  dailyTotalActive = [];
  totalDate = [];
  //line chart ends

  totalObj = {};
  countryData = [];
  minimum = 0;
  maximum = 0;


  constructor(private worldService: WorldService) {
    const self = this;
    this.setLinechartOptions();
    this.chartCallback = chart => {
      self.chart = chart;
    }
  }

  ngOnInit(): void {
    this.serMapOptions();
    this.getTotalCases();
    this.getDayByDayCases();
  }

  //set world map options
  serMapOptions() {
    this.chartOptions = {
      chart: {
        borderWidth: 1,
        map: worldMap
      },
      shadow: true,
      colors: ['#FF0022', '#0d233a', '#8bbc21', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
      title: {
        text: 'World wide corona cases'
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
        enabled: true,
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
          negativeColor: '#2f7ed8',
          zThreshold: 1000,
          shadow: true,
          name: 'Covid-19 case',
          joinBy: [
            'iso-a2',
            'code'
          ],
          data: this.countryData,
          // data: [
          //   {
          //     "code3": "ABW",
          //     "code": "AW"
          //   },
          //   {
          //     "code3": "IND",
          //     "z": 1000,
          //     "code": "IN"
          //   }
          // ],
          minSize: 4,
          maxSize: '12%',
          tooltip: {
            pointFormat: '{point.properties.name}<br> Confirmed: {point.latest_data.confirmed} <br>Recovered:{point.latest_data.recovered}'
              + '<br>Death : {point.latest_data.deaths}<br>Critical : {point.latest_data.critical}'
          }
        }
      ]
    };
  }

  getTotalCases() {
    this.worldService.getTotalCases().then((res: any) => {
      console.log(res);
      this.totalObj = res;
      this.countryData = res['data'];
      console.log(this.countryData);
      this.serMapOptions();

    })
  }

  setLinechartOptions() {

    this.commonOptions = {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      toolbar: {
        tools: {
          selection: false
        }
      },
      markers: {
        size: 2,
        hover: {
          size: 3
        }
      },
      tooltip: {
        followCursor: false,
        theme: "dark",
        x: {
          show: false
        },
        marker: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return "";
            }
          }
        }
      },
      grid: {
        clipMarkers: false
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        min: this.minimum,
        max: this.maximum,
        opposite: true
      }
    };

    this.chart1options = {
      series: [
        {
          name: "chart1",
          data: this.dailyTotalConfirmed.reverse()
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "area",
        height: 200,
        toolbar: {
          show: false
        }
      },
      colors: ["#ffc107"],
      yaxis: {
        tickAmount: 3,
        labels: {
          minWidth: 40
        },
        min: this.minimum,
        max: this.maximum,
        opposite: true
      }
    };

    this.chart2options = {
      series: [
        {
          name: "Recovered",
          data: this.dailyTotalRecovered.reverse()
        }
      ],
      chart: {
        id: "tw",
        group: "social",
        type: "area",
        height: 200,
        toolbar: {
          show: false
        }
      },
      colors: ["#28a745"],
      yaxis: {
        tickAmount: 3,
        labels: {
          minWidth: 40
        },
        min: this.minimum,
        max: this.maximum,
        opposite: true
      }
    };

    this.chart3options = {
      series: [
        {
          name: "chart3",
          data: this.dailyTotalDeaths.reverse()
        }
      ],
      title: {
        text: "Daily cases",
        align: "right"
      },
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 200,
        width: 300,
        toolbar: {
          show: false
        }
      },
      colors: ["#6c757d"],
      yaxis: {
        tickAmount: 3,
        labels: {
          minWidth: 40
        },
        min: this.minimum,
        max: this.maximum,
        opposite: true
      }
    };

    // this.linechartOptions = {
    //   series: [
    //     {
    //       name: "Recovered",
    //       data:   this.dailyTotalRecovered.reverse()
    //     },
    //     {
    //       name: "Confirmed",
    //       data: this.dailyTotalConfirmed.reverse()
    //     }
    //   ],
    //   chart: {
    //     height: 500,
    //     width:1000,
    //     type: "line",
    //     dropShadow: {
    //       enabled: true,
    //       color: "#000",
    //       top: 18,
    //       left: 7,
    //       blur: 10,
    //       opacity: 0.2
    //     },
    //     toolbar: {
    //       show: true
    //     }
    //   },
    //   colors: ["#77B6EA", "#545454"],
    //   dataLabels: {
    //     enabled: true
    //   },
    //   stroke: {
    //     curve: "smooth"
    //   },
    //   title: {
    //     text: "Daily cases",
    //     align: "left"
    //   },
    //   grid: {
    //     borderColor: "#e7e7e7",
    //     row: {
    //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //       opacity: 0.5
    //     }
    //   },
    //   markers: {
    //     size: 1
    //   },
    //   xaxis: {
    //     categories: this.totalDate,//["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    //     title: {
    //       text: "Date"
    //     }
    //   },
    //   yaxis: {
    //     title: {
    //       text: "Count"
    //     },
    //     min: 1000000,
    //     max: this.dailyData.length>0?this.dailyData[0]['confirmed']:0,
    //     opposite:true,
    //   },
    //   legend: {
    //     position: "top",
    //     horizontalAlign: "right",
    //     floating: true,
    //     offsetY: -25000,
    //     offsetX: -10000
    //   }
    // };
  }

  public generateDayWiseTimeSeries(baseval, count, yrange): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    console.log(series);

    return series;
  }

  public generateDayWiseCountSeries() {
    let i = 0;
    // let confirmedCases = [], recoveredCases = [],deathsCases= [];
    this.dailyTotalRecovered = [];
    this.dailyTotalConfirmed = [];
    this.dailyTotalDeaths = [];
    let last20Data = this.dailyData.slice(0, 30)
    let baseval = new Date(last20Data[0]['date']).getTime()
    while (i < 30) {
      var x = baseval;
      var confirmed = this.dailyData[i]['confirmed'];
      this.dailyTotalRecovered.push([x, this.dailyData[i]['recovered']])
      this.dailyTotalConfirmed.push([x, confirmed]);
      this.dailyTotalDeaths.push([x, this.dailyData[i]['deaths']]);
      baseval -= 86400000;
      i++;
    }

    // console.log(_.minBy(this.dailyTotalRecovered, (data) => data[1]));

    this.minimum = _.min([_.minBy(this.dailyTotalConfirmed, (data) => data[1])[1],
    _.minBy(this.dailyTotalRecovered, (data) => data[1])[1],
    _.minBy(this.dailyTotalDeaths, (data) => data[1])[1]]);

    // console.log(this.minimum);

    this.maximum = _.max([_.maxBy(this.dailyTotalConfirmed, (data) => data[1])[1],
    _.maxBy(this.dailyTotalRecovered, (data) => data[1])[1],
    _.maxBy(this.dailyTotalDeaths, (data) => data[1])[1]]);

    // console.log(this.maximum);
    // console.log(confirmedCases);

    // return series;
  }

  getDayByDayCases() {
    this.worldService.getDaybyDayCase().then((res) => {
      console.log(res);
      this.dailyData = res['data'];
      // this.dailyTotalRecovered = res['recovered'].slice(0, 10);
      // this.dailyTotalConfirmed = res['confirmed'].slice(0, 10);
      // this.dailyTotalDeaths = res['deaths'].slice(0, 10);
      // this.dailyTotalActive = res['active'].slice(0, 10);
      // this.totalDate = res['date'].slice(0, 10);
      this.generateDayWiseCountSeries();
      this.setLinechartOptions();
    })
  }

}
