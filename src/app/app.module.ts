import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TstDotConnectComponent } from './tst-dot-connect/tst-dot-connect.component';
import { ContainerComponent } from './container/container.component';
import { SpotlightComponent } from './spotlight/spotlight.component';
import { TestComponent } from './test/test.component';
import { KhDecomposeNumberComponent } from './kh-decompose-number/kh-decompose-number.component';
import { KhSliderInputComponent } from './kh-slider-input/kh-slider-input.component';
import { KhFarmComponent } from './kh-farm/kh-farm.component';
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
import { Moongame1Component } from './moongame1/moongame1.component';
import { MoonfactoryComponent } from './moonfactory/moonfactory.component'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MoonGameContainerComponent } from './moon-game-container/moon-game-container.component';
import { HundredsChartOverlapComponent } from './hundreds-chart-overlap/hundreds-chart-overlap.component';
import { MultiplicationChartComponent } from './multiplication-chart/multiplication-chart.component'
import { DecomposeAsteroidsComponent } from './decompose-asteroids/decompose-asteroids.component';
import { DecomposeToPlanetComponent} from './decompose-to-planet/decompose-to-planet.component';
import { DecomposeNumberLeiahComponent } from './decompose-number-leiah/decompose-number-leiah.component';
import { TenthSquaresComponent } from './tenth-squares/tenth-squares.component';
import { TradeBlocksComponent } from './trade-blocks/trade-blocks.component'
import { DecimalTableComponent, HundredsTableComponent, ThousandsTableComponent} from './block-tables/block-tables.component'
import { IntegerTilesComponent } from './integer-tiles/integer-tiles.component';
import { WindowTestComponent } from './window-test/window-test.component';
import { FarmTargetComponent } from './farm-target/farm-target.component';
import { DecomposeBoatComponent } from './decompose-boat/decompose-boat.component';
import { FarmBoatComponent } from './farm-boat/farm-boat.component';
import { KhFarmVarietyComponent } from './kh-farm-variety/kh-farm-variety.component';

@NgModule({
  declarations: [
    AppComponent,
    TstDotConnectComponent,
    ContainerComponent,
    SpotlightComponent,
    TestComponent,
    KhDecomposeNumberComponent,
    KhSliderInputComponent,
    KhFarmComponent,
    KhFarmRandomComponent,
    KhZoomComponent,
    KhFractionToolComponent,
    KhFarmFlowerComponent,
    KhImageZoomComponent,
    KhFractionCollectionComponent,
    KhFarmTrailerComponent,
    ColorSwitchComponent,
    KhFarmGrapeComponent,
    KhZoomSpaceComponent,
    IndexComponent,
    PlanetfactoryComponent,
    Moongame1Component,
    MoonfactoryComponent,
    MoonGameContainerComponent,
    MultiplicationChartComponent,
    HundredsChartOverlapComponent,
    DecomposeAsteroidsComponent,
    DecomposeToPlanetComponent,
    DecomposeNumberLeiahComponent,
    TenthSquaresComponent,
    TradeBlocksComponent,
    DecimalTableComponent,
    HundredsTableComponent,
    ThousandsTableComponent,
    IntegerTilesComponent,
    WindowTestComponent,
    FarmTargetComponent,
    DecomposeBoatComponent,
    FarmBoatComponent,
    KhFarmVarietyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
