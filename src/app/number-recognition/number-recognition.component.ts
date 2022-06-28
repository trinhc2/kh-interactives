import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import {numberRecognition,numberRecognitionSetup} from "./number-recognition"

@Component({
  selector: 'app-number-recognition',
  templateUrl: './number-recognition.component.html',
  styleUrls: ['./number-recognition.component.css']
})
export class NumberRecognitionComponent implements AfterViewInit {

  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private startingNumber: number = null

  @Input()
  private color: string = ""

  ngAfterViewInit(): void {
      
    const setup = {
      animationFinished: false,
      startingNumber: this.startingNumber,
      color: this.color,
      gridHeight: 500,
      gridWidth: 500,
      rectWidth: 30,
      rectHeight: 30
    } as numberRecognitionSetup


    const els = this.renderEl.nativeElement;

    const test = numberRecognition(els, setup)

    this.renderEl.nativeElement.addEventListener("click", test.animateViewBox);
  }
}
