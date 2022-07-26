import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { KhDecomposeNumberComponent } from './kh-decompose-number/kh-decompose-number.component';
import { KhFarmComponent } from './kh-farm/kh-farm.component';
import { KhSliderInputComponent } from './kh-slider-input/kh-slider-input.component';
import { KhFarmRandomComponent } from './kh-farm-random/kh-farm-random.component';
import { KhZoomComponent } from './kh-zoom/kh-zoom.component';
import { KhFractionToolComponent } from './kh-fraction-tool/kh-fraction-tool.component';
import { KhFarmFlowerComponent } from './kh-farm-flower/kh-farm-flower.component';



const routes: Routes = [
  { path: 'renderer', component: ContainerComponent },
  { path: 'slider', component: KhSliderInputComponent },
  { path: 'farm', component: KhFarmComponent },
  { path: 'decompose', component: KhDecomposeNumberComponent },
  { path: 'draw', component: ContainerComponent },
  { path: 'farmrand', component: KhFarmRandomComponent},
  { path: 'zoom', component: KhZoomComponent},
  { path: 'fraction', component: KhFractionToolComponent},
  { path: 'farmflower', component: KhFarmFlowerComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
