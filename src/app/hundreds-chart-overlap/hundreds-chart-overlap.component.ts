import { Component, AfterViewInit, ViewChild, ElementRef, Input , Output, EventEmitter} from '@angular/core';
import { hundredAPI, hundredSetup, value } from './HundredsChartOverlapApi';
@Component({
  selector: 'app-hundreds-chart-overlap',
  templateUrl: './hundreds-chart-overlap.component.html',
  styleUrls: ['./hundreds-chart-overlap.component.css']
})

// THIS VERSION IS FOR WORKSHOP USE, BETTER SIZED
export class HundredsChartOverlapComponent implements AfterViewInit {

  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('menuEl') public menuEl?: ElementRef<SVGSVGElement>;

  @Input()
  private colourA: string="#adf190b0"

  @Input()
  private colourB: string="#ff2c68ff"


  @Input()
  private answerString:string[]=["A2",'A4','A6','A8','A10',"B5","B10"];
  @Input()
  private value?: value;
  @Input()
  private answer?:any;
  @Input()
 private state?:any;


 @Input()
  private reportMode: boolean = false

  @Output()
  public valueChange = new EventEmitter<string>();


  ngAfterViewInit(): void {

    const setup={
      colourA:this.colourA,
      colourB:this.colourB,
      answerString:this.answerString,
      answer:this.value?.answer,
      state:this.value?.state,
    reportMode:this.reportMode
    } as hundredSetup

    const el = [this.renderEl?.nativeElement, this.menuEl?.nativeElement]

    const interactive=hundredAPI(el,setup)

    interactive.onAnswerUpdate = (answer:any) => {
      this.valueChange.emit(answer)
      console.log(answer)
    }

    
  }
}
