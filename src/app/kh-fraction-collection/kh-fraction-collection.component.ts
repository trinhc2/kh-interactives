import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import {FractionClass, FractionSetup} from "./khFractionAPI"

@Component({
  selector: 'app-kh-fraction-collection',
  templateUrl: './kh-fraction-collection.component.html',
  styleUrls: ['./kh-fraction-collection.component.css']
})

export class KhFractionCollectionComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private backgroundImage: string = "url(https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg)"

  @Input()
  private snapTo: string = "20 20"

  public ngAfterViewInit(): void {

    const bar = [{
      "frame": "0 100 200 100",
      "draggable": true,
      "startArray": [0, 1],
      "lockY": true,
      "controls": "bottom",
      "maxDenom": 4,
      "color": "#0a3693"
    },
    {
      "frame": "0 250 100 150",
      "draggable": true,
      "startArray": [1,1,0,1,0,0,0],
      "lockX": true,
      "controls": "right",
      "maxDenom": 20
    },
    {
      "frame": "300 200 50 50",
      "draggable": true,
      "startArray": [1,1,1,1,1,1,0,0,0],
      "controls": "top",
      "maxDenom": 10
    }
    ]

    const setup = {
      backgroundImage: this.backgroundImage,
      snapTo: this.snapTo,
      bar: bar
    } as FractionSetup

    const els = this.renderEl.nativeElement

    const interactive = new FractionClass(els, setup)

  }

}
