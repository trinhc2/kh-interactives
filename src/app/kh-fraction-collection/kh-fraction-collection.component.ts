import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import {fractionAPI, fractionSetup} from "./khFractionAPI"

@Component({
  selector: 'app-kh-fraction-collection',
  templateUrl: './kh-fraction-collection.component.html',
  styleUrls: ['./kh-fraction-collection.component.css']
})

export class KhFractionCollectionComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private backgroundImage: string = "url(https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg)"

  ngAfterViewInit(): void {

    const bar = [{
      "frame": "0 100 200 100",
      "draggable": true,
      "startArray": [0, 1],
      "lockY": true
    },
    {
      "frame": "0 200 100 100",
      "draggable": true,
      "startArray": [1,1,0,1,0,0,0],
      "lockX": true
    }
    ]
    const setup = {
      backgroundImage: this.backgroundImage,
      bar: bar
    } as fractionSetup

    const els = this.renderEl.nativeElement

    const interactive = fractionAPI(els, setup)

  }

}
