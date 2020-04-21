import { Component, OnInit } from '@angular/core';
import { IndiaService } from 'src/app/services/india.service';

const colorrange = {
  "minvalue": "0",
  "startlabel": "Low",
  "endlabel": "High",
  "code": "e44a00",
  "gradient": "1",
  "color": [{ "maxvalue": "2500", "code": "f8bd19" }, { "maxvalue": "5000", "code": "6baa01" }]
};
@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  dataSource: Object;
  mapData = [];
  data: unknown;
  // events = {}
  constructor(private indiaService: IndiaService) {
    this.dataSource = {
      "chart": {
        "animation": "1",
        "showbevel": "0",
        "usehovercolor": "1",
        "showlegend": "1",
        "legendposition": "BOTTOM",
        "legendborderalpha": "0",
        "legendbordercolor": "ffffff",
        "legendallowdrag": "1",
        "legendshadow": "0",
        "caption": "COVID-19 India Confirmed cases",
        "tooltext": "qwe",
        "connectorcolor": "000000",
        "fillalpha": "80",
        "hovercolor": "CCCCCC",
        "theme": "fusion",
        "showMarkerLabels": "1",
      },
      "colorrange": colorrange,
      "data": this.mapData,

    } // end of this.dataSource
  }


  ngOnInit(): void {
    this.getData()
    this.indiaService.getStateDistWiseCase().then(res => {
      console.log(res);

    })
  }

  over(e) {
    console.log(e);
  }


  getData() {
    this.indiaService.getData().then(res => {
      this.dataSource['data'] = res['statewise'];
    });
  }


}
