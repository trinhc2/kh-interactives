import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { zoomAPI, zoomSetup} from "./zoomAPI"

@Component({
  selector: 'kh-image-zoom',
  templateUrl: './kh-image-zoom.component.html',
  styleUrls: ['./kh-image-zoom.component.css']
})
export class KhImageZoomComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  //currently assigning default values, but can be removed later.
  @Input()
  private image: string = "https://app.knowledgehook.com/Content/Images/6e2e3cac-30ed-ea11-974a-0050568c42b6/zoomboat-vecta (1).svg"

  @Input()
  private backgroundColor: string = "rgb(169, 234, 252)"

  @Input()
  private width: string = "1300"

  @Input()
  private height: string = "920"

  @Input()
  private viewBox: string = "0 0 1300 920"

  ngAfterViewInit(): void {

    const setup = {
      image: this.image,
      backgroundColor: this.backgroundColor,
      width: this.width,
      height: this.height,
      viewBox: this.viewBox
    } as zoomSetup

    const els = [this.upperRenderEl.nativeElement, this.lowerRenderEl.nativeElement]

    const interactive = zoomAPI(els, setup)

  }
}
