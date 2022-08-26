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
import { KhFarmGrapeComponent } from './kh-farm-grape/kh-farm-grape.component';
import { KhZoomSpaceComponent } from './kh-zoom-space/kh-zoom-space.component';
import { IndexComponent } from './index/index.component';
import { PlanetfactoryComponent } from './planetfactory/planetfactory.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component';
import { MoonGameContainerComponent } from './moon-game-container/moon-game-container.component';
import { HundredsChartOverlapComponent } from './hundreds-chart-overlap/hundreds-chart-overlap.component';
import { MultiplicationChartComponent } from './multiplication-chart/multiplication-chart.component';
import { DecomposeAsteroidsComponent } from './decompose-asteroids/decompose-asteroids.component';
import { DecomposeToPlanetComponent } from './decompose-to-planet/decompose-to-planet.component';
import { DecomposeNumberLeiahComponent } from './decompose-number-leiah/decompose-number-leiah.component';
import { TenthSquaresComponent } from './tenth-squares/tenth-squares.component';
import { TradeBlocksComponent } from './trade-blocks/trade-blocks.component';
import { DecimalTableComponent, HundredsTableComponent, ThousandsTableComponent} from './block-tables/block-tables.component'



const routes: Routes = [
  { path: 'renderer', component: ContainerComponent },
  { path: 'slider', component: KhSliderInputComponent },
  { path: 'farm', component: KhFarmComponent },
  { path: 'decompose', component: KhDecomposeNumberComponent },
  { path: 'farmrand', component: KhFarmRandomComponent},
  { path: 'zoom', component: KhZoomComponent},
  { path: 'zoomboat', component: KhImageZoomComponent},
  { path: 'fraction', component: KhFractionToolComponent},
  { path: 'fractionCollection', component: KhFractionCollectionComponent},
  { path: 'farmflower', component: KhFarmFlowerComponent},
  { path: 'farmtrailer', component: KhFarmTrailerComponent},
  { path: 'colorSwitch', component: ColorSwitchComponent},
  { path: 'farmgrape', component: KhFarmGrapeComponent},
  { path: 'zoomspace', component: KhZoomSpaceComponent},
  { path: '', component: IndexComponent},
  { path: 'planetFactory', component: PlanetfactoryComponent},
  { path: 'moonGame', component: MoonGameContainerComponent},
  { path: 'moonFactory', component: MoonfactoryComponent},
  { path: 'hundredsChart', component:HundredsChartOverlapComponent},
  { path: 'multiplicationChart', component:MultiplicationChartComponent},
  { path: 'decomposeAsteroids', component: DecomposeAsteroidsComponent},
  { path: 'decomposePlanet', component:DecomposeToPlanetComponent},
  { path: 'decompose2', component: DecomposeNumberLeiahComponent},
  { path: 'tenthSquares', component: TenthSquaresComponent},
  { path: 'tradeBlocks', component: TradeBlocksComponent},
  { path: 'decimalsBlocks', component: DecimalTableComponent},
  { path: 'hundredsBlocks', component: HundredsTableComponent},
  { path: 'thousandsBlocks', component: ThousandsTableComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
