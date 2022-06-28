import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { sliderAPI, sliderSetup, value} from "./KhSliderApi"

@Component({
  selector: 'app-kh-slider-input',
  templateUrl: './kh-slider-input.component.html',
  styleUrls: ['./kh-slider-input.component.css']
})
export class KhSliderInputComponent implements AfterViewInit {
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private startingValue: number

  @Input()
  private width: number = 500

  @Input()
  private height: number = 500

  @Input()
  private max: number = 100

  @Input()
  private min: number = 0

  @Input()
  private value: value

  @Input()
  private reportMode: boolean = false

  @Output()
  public valueChange = new EventEmitter<string>();

  ngAfterViewInit(): void {

    const setup = {
      startingValue: this.startingValue,
      width: this.width,
      height: this.height,
      max: this.max,
      min: this.min,
      answer: this.value?.answer,
      state: this.value?.state,
      reportMode: this.reportMode
    } as sliderSetup

    const els = this.renderEl.nativeElement;

    const interactive = sliderAPI(els, setup)

    interactive.onAnswerUpdate = (answer) => {
      this.valueChange.emit(answer)
      console.log(answer)
    }

  }

}
