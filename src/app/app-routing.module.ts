import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryWiseComponent } from './components/country-wise/country-wise.component';
import { WorldWideComponent } from './components/world-wide/world-wide.component';
import { IndiaComponent } from './components/india/india.component';


const routes: Routes = [
  { path: 'world', component: WorldWideComponent },
  { path: 'country', component: CountryWiseComponent },
  { path: 'india', component: IndiaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
