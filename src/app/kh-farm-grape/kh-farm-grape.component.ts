import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { farmAPI, farmSetup} from "./khFarmTrailerAPI"
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-kh-farm-grape',
  templateUrl: './kh-farm-grape.component.html',
  styleUrls: ['./kh-farm-grape.component.css']
})
export class KhFarmGrapeComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  constructor(public dialog: MatDialog) { }

  @Input()
  private width: number = 500

  @Input()
  private height: number = 500

  @Input()
  private plotWidth: number = 250

  @Input()
  private plotHeight: number = 250

  @Input()
  private plotColor: string = "rgb(140, 254, 140)"

  @Input()
  private lineColor: string = "rgb(52, 128, 104)"

  ngAfterViewInit(): void {


    const setup = {
      width: this.width,
      height: this.height,
      plotWidth: this.plotWidth,
      plotHeight: this.plotHeight,
      plotColor: this.plotColor,
      lineColor: this.lineColor
    } as farmSetup

    const els = [this.lowerRenderEl.nativeElement,this.upperRenderEl.nativeElement]

    const interactive = farmAPI(els, setup)

  }

  openDialog(){
    console.log("click!")
    this.dialog.open(DialogContent)
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}
