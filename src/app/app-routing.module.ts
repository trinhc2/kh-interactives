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
import { KhImageZoomComponent } from './kh-image-zoom/kh-image-zoom.component';
import { KhFractionCollectionComponent } from './kh-fraction-collection/kh-fraction-collection.component';
import { KhFarmTrailerComponent } from './kh-farm-trailer/kh-farm-trailer.component';
import { ColorSwitchComponent } from './color-switch/color-switch.component';



const routes: Routes = [
  { path: 'renderer', component: ContainerComponent },
  { path: 'slider', component: KhSliderInputComponent },
  { path: 'farm', component: KhFarmComponent },
  { path: 'decompose', component: KhDecomposeNumberComponent },
  { path: 'draw', component: ContainerComponent },
  { path: 'farmrand', component: KhFarmRandomComponent},
  { path: 'zoom', component: KhZoomComponent},
  { path: 'zoomboat', component: KhImageZoomComponent},
  { path: 'fraction', component: KhFractionToolComponent},
  { path: 'fractionCollection', component: KhFractionCollectionComponent},
  { path: 'farmflower', component: KhFarmFlowerComponent},
  { path: 'farmtrailer', component: KhFarmTrailerComponent},
  { path: 'colorSwitch', component: ColorSwitchComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
