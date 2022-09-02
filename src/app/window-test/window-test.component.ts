import { Component, ElementRef, Input, AfterViewInit, ViewChild} from '@angular/core';
import { windowAPI, windowSetup} from "./windowAPI"

@Component({
  selector: 'app-window-test',
  templateUrl: './window-test.component.html',
  styleUrls: ['./window-test.component.css']
})
export class WindowTestComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  @Input()
  private images = [
    "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1662130599/windows/singleWheat_oa9djp.png",
    "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1662130599/windows/singleGrape_poo61n.png",
    "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1662135529/windows/barn_uc5p78.svg",
    "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1662135529/windows/oneAcreSign_zhbw6c.svg",
    "https://res.cloudinary.com/dg9cqf9zn/image/upload/v1662130916/windows/grapeplant_bqybrl.png",
  ]

  public ngAfterViewInit(): void {


    const setup = {
      images: this.images
    } as windowSetup

    const els = this.renderEl.nativeElement

    const interactive = windowAPI(els, setup)

  }

}
