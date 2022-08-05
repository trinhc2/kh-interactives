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

  @Input()
  private image: string = "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg"

  @Input()
  private backgroundColor: string = "rgb(169, 234, 252)"

  ngAfterViewInit(): void {

    const setup = {
      image: this.image,
      backgroundColor: this.backgroundColor
    } as zoomSetup

    const els = [this.upperRenderEl.nativeElement]

    const interactive = zoomAPI(els, setup)

  }
}
