import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-country-wise',
  templateUrl: './country-wise.component.html',
  styleUrls: ['./country-wise.component.css']
})
export class CountryWiseComponent implements OnInit {

  showChart = true;
  totalConfirmed = 0;
  totalCritical = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  countries = []
  country;
  totalCountryData = []
  dateWiseData = []
  deathChart = []
  recoveredChart = []
  confirmedChart = []
  todayConfirmed = 0
  todayRecovered = 0
  todayDeaths = 0
  dateValue = []
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private dataService: CountryService) {

  }

  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Deaths",
          type: "column",
          data: this.confirmedChart,
        },
        {
          name: "Recovered",
          type: "area",
          data: this.recoveredChart,
        },
        {
          name: "Confirmed",
          type: "line",
          data:
            this.deathChart,
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: this.dateValue,
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Cases"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " cases";
            }
            return y;
          }
        }
      }
    };
    this.dataService.getCountriesDateWise().subscribe((data) => {
      this.totalCountryData = data['data'];
      this.totalCountryData.forEach((cs) => {
        let tst = {}
        tst['name'] = cs.name;
        tst['code'] = cs.code;
        this.countries.push(tst)
      })
      this.country = this.totalCountryData[0].name
      this.updateValues(this.totalCountryData[0].code)
    })
  }
  updateValues(con) {
    this.showChart = false;

    this.dataService.getCountriesDateWise(con).subscribe((dateWise) => {
      this.dateWiseData = (dateWise['data']['timeline'])
      var totalCountryData = dateWise['data']['latest_data']
      var todayCountryData = dateWise['data']['today']
      this.country = dateWise['data'].name
      this.todayConfirmed = todayCountryData.confirmed
      this.todayRecovered = todayCountryData.recovered
      this.todayDeaths = todayCountryData.deaths
      this.totalConfirmed = totalCountryData.confirmed;
      this.totalCritical = totalCountryData.critical;
      this.totalDeaths = totalCountryData.deaths;
      this.totalRecovered = totalCountryData.recovered;
      let testcon = []
      let testdeaths = []
      let testrec = []
      this.confirmedChart = []
      this.recoveredChart = []
      this.deathChart = []
      this.dateWiseData.forEach((cr) => {
        testdeaths.push(cr.deaths)
        testcon.push(cr.confirmed)
        testrec.push(cr.recovered)
        this.dateValue.push(cr.date)
      })
      this.deathChart = testdeaths;
      this.recoveredChart = testrec
      this.confirmedChart = testcon
      this.chartOptions.series[0].data = this.deathChart
      this.chartOptions.series[1].data = this.recoveredChart
      this.chartOptions.series[2].data = this.confirmedChart
      this.showChart = true;

    })

  }
}
