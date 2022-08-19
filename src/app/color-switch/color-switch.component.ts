import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {colorSwitchAPI} from './colorSwitchAPI'
@Component({
  selector: 'app-color-switch',
  templateUrl: './color-switch.component.html',
  styleUrls: ['./color-switch.component.css']
})
export class ColorSwitchComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  ngAfterViewInit(): void {

    const els = [this.lowerRenderEl.nativeElement, this.upperRenderEl.nativeElement]

    const interactive = colorSwitchAPI(els)

  }
}
