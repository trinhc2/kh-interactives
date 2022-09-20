import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import {decomposeNumber,decomposeSetup} from "./decompose"

@Component({
  selector: 'app-decompose-boat',
  templateUrl: './decompose-boat.component.html',
  styleUrls: ['./decompose-boat.component.css']
})
export class DecomposeBoatComponent implements AfterViewInit {
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
