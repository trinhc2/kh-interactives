import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { DrawingInputComponent } from './drawing-input/drawing-input.component';
import { KhDecomposeNumberComponent } from './kh-decompose-number/kh-decompose-number.component';
import { KhFarmComponent } from './kh-farm/kh-farm.component';
import { KhSliderInputComponent } from './kh-slider-input/kh-slider-input.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component';
import { PlanetfactoryComponent } from './planetfactory/planetfactory.component';
import { KhFarmRandomComponent } from './kh-farm-random/kh-farm-random.component';
import { KhZoomComponent } from './kh-zoom/kh-zoom.component';


const routes: Routes = [
  { path: 'renderer', component: ContainerComponent },
  { path: 'slider', component: KhSliderInputComponent },
  { path: 'farm', component: KhFarmComponent },
  { path: 'planetFactory', component: PlanetfactoryComponent },
  { path: 'moonFactory', component: MoonfactoryComponent },
  { path: 'decompose', component: KhDecomposeNumberComponent },
  { path: 'draw', component: ContainerComponent },
  { path: 'farmrand', component: KhFarmRandomComponent},
  { path: 'zoom', component: KhZoomComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
