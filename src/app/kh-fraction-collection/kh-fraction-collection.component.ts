import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {fractionAPI} from "./khFractionAPI"

@Component({
  selector: 'app-kh-fraction-collection',
  templateUrl: './kh-fraction-collection.component.html',
  styleUrls: ['./kh-fraction-collection.component.css']
})

export class KhFractionCollectionComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  ngAfterViewInit(): void {

    const els = this.renderEl.nativeElement

    const interactive = fractionAPI(els)

  }

}
