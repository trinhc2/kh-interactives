import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { blocksAPI, blocksSetup} from "./trade-blocks-api";


@Component({
  selector: 'app-trade-blocks',
  templateUrl: './trade-blocks.component.html',
  styleUrls: ['./trade-blocks.component.css']
})
export class TradeBlocksComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  constructor() { }

  ngAfterViewInit(): void {

    const setup = {
      version : "arrowsHundredsChart"
    } as blocksSetup

    const els = this.renderEl.nativeElement; 
    const interactive = blocksAPI(els, setup);
  }

}
