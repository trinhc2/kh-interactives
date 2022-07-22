import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import {fractionAPI} from "./khFractionAPI"
@Component({
  selector: 'app-kh-fraction-tool',
  templateUrl: './kh-fraction-tool.component.html',
  styleUrls: ['./kh-fraction-tool.component.css']
})

export class KhFractionToolComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  ngAfterViewInit(): void {

    const els = this.renderEl.nativeElement

    const interactive = fractionAPI(els)

  }

}
