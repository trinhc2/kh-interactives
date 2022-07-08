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
import { PlanetfactoryComponent } from "./planetfactory/planetfactory.component";
import { MoonfactoryComponent } from  "./moonfactory/moonfactory.component"
import { DrawingInputComponent} from "./drawing-input/drawing-input.component"
import {MatButtonModule} from '@angular/material/button';
import { KhFarmRandomComponent } from './kh-farm-random/kh-farm-random.component';

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
    PlanetfactoryComponent,
    MoonfactoryComponent,
    DrawingInputComponent,
    KhFarmRandomComponent
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
