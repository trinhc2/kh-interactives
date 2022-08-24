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
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

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
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule
    
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
