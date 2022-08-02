import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { zoomAPI} from "./zoomAPI"

@Component({
  selector: 'app-kh-zoom-boat',
  templateUrl: './kh-zoom-boat.component.html',
  styleUrls: ['./kh-zoom-boat.component.css']
})
export class KhZoomBoatComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

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
  private plotColor: string = "rgb(140, 254, 140)"

  @Input()
  private lineColor: string = "rgb(52, 128, 104)"

  ngAfterViewInit(): void {

    const els = [this.upperRenderEl.nativeElement]

    const interactive = zoomAPI(els)

  }
}
