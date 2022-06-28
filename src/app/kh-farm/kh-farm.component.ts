import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { farmAPI, farmSetup} from "./khFarmApi"

@Component({
  selector: 'app-kh-farm',
  templateUrl: './kh-farm.component.html',
  styleUrls: ['./kh-farm.component.css']
})

export class KhFarmComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  @Input()
  private width: number = 500

  @Input()
  private height: number = 500

  @Input()
  private plotWidth: number = 250

  @Input()
  private plotHeight: number = 250

  @Input()
  private plotColor: string = "#fff2cc"

  @Input()
  private lineColor: string = "#898989"

  ngAfterViewInit(): void {


    const setup = {
      width: this.width,
      height: this.height,
      plotWidth: this.plotWidth,
      plotHeight: this.plotHeight,
      plotColor: this.plotColor,
      lineColor: this.lineColor
    } as farmSetup

    const els = this.renderEl.nativeElement;

    const interactive = farmAPI(els, setup)

  }

}
