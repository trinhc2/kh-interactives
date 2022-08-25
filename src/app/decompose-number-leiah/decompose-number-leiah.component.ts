import { Component, ElementRef, Input, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {decomposeNumber,decomposeSetup} from "./decompose"

@Component({
  selector: 'app-decompose-number-leiah',
  templateUrl: './decompose-number-leiah.component.html',
  styleUrls: ['./decompose-number-leiah.component.css']
})
export class DecomposeNumberLeiahComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
 
  @Input()
  private startingNumber: number 

  ngAfterViewInit(): void {
      
    const setup = {
      startingNumber: this.startingNumber
    } as decomposeSetup

    const els = this.renderEl.nativeElement;

    const decompose = decomposeNumber(els, setup)
  

  }

}
