import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import {testFunction,testSetup} from "./test"

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
  constructor() { }

  ngAfterViewInit(): void {
      
    const setup = {
      finished: false
    } as testSetup


    const els = this.renderEl.nativeElement;

    const test = testFunction(els, setup)

    this.renderEl.nativeElement.addEventListener("click", test.animateViewBox);
  }
  

}
