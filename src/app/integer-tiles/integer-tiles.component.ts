import { Component, AfterViewInit, ViewChild, ElementRef, Input , Output, EventEmitter} from '@angular/core';
import { integerAPI, integerSetup} from './IntegerApi';
@Component({
  selector: 'app-integer-tiles',
  templateUrl: './integer-tiles.component.html',
  styleUrls: ['./integer-tiles.component.css']
})
export class IntegerTilesComponent implements AfterViewInit {

  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('menuEl') public menuEl?: ElementRef<SVGSVGElement>;
  // @Input()
  // private mainColour: string=""

  // @Input()
  // private equivColour: string=""

  // @Input()
  // private reportMode: boolean = false


  ngAfterViewInit(): void {



    const setup={
      // mainColour:this.mainColour,
      // equivColour:this.equivColour,
      //reportMode:this.reportMode

    } as integerSetup

    const el = [this.renderEl?.nativeElement,this.menuEl?.nativeElement]

    const interactive=integerAPI(el,setup)

  }

}
