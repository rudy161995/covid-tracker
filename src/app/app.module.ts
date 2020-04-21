import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HighchartsChartModule} from 'highcharts-angular';
import { CountryWiseComponent } from './components/country-wise/country-wise.component';
import { WorldWideComponent } from './components/world-wide/world-wide.component';
import { HttpClientModule } from '@angular/common/http';

import { GoogleChartsModule } from 'angular-google-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { IndiaComponent } from './components/india/india.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as FusionMaps from "fusionmaps/fusioncharts.maps";
import * as India from "fusionmaps/maps/fusioncharts.india";
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, FusionMaps, India, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    CountryWiseComponent,
    WorldWideComponent,
    IndiaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    NgApexchartsModule,
    GoogleChartsModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
