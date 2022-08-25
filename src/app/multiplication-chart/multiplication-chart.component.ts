import { Component, AfterViewInit, ViewChild, ElementRef, Input , Output, EventEmitter} from '@angular/core';
import { multiplicationAPI, multiplicationSetup} from './MultiplicationChartApi';

@Component({
  selector: 'app-multiplication-chart',
  templateUrl: './multiplication-chart.component.html',
  styleUrls: ['./multiplication-chart.component.css']
})
export class MultiplicationChartComponent implements AfterViewInit {


  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;

  //ended up just putting in these colours manually
  @Input()
  private mainColour: string=""

  @Input()
  private equivColour: string=""

  @Input()
  private reportMode: boolean = false


  ngAfterViewInit(): void {



    const setup={
      mainColour:this.mainColour,
      equivColour:this.equivColour,
      reportMode:this.reportMode

    } as multiplicationSetup

    const el = this.renderEl?.nativeElement

    const interactive=multiplicationAPI(el,setup)

  }

}
