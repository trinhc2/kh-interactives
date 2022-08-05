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
import {MatButtonModule} from '@angular/material/button';
import { KhFarmRandomComponent } from './kh-farm-random/kh-farm-random.component';
import { KhZoomComponent } from './kh-zoom/kh-zoom.component';
import { KhFractionToolComponent } from './kh-fraction-tool/kh-fraction-tool.component';
import { KhFarmFlowerComponent } from './kh-farm-flower/kh-farm-flower.component';
import { KhImageZoomComponent } from './kh-image-zoom/kh-image-zoom.component';
import { KhFractionCollectionComponent } from './kh-fraction-collection/kh-fraction-collection.component';

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
    KhFractionCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
