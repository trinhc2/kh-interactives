import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FarmClass, FarmSetup} from "./khFarmTrailerAPI"
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-kh-farm-trailer',
  templateUrl: './kh-farm-trailer.component.html',
  styleUrls: ['./kh-farm-trailer.component.css']
})
export class KhFarmTrailerComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  constructor(public dialog: MatDialog) { }

  @Input()
  private type: string = "wheat"

  public ngAfterViewInit(): void {


    const setup = {
      type: this.type
    } as FarmSetup

    const els = [this.lowerRenderEl.nativeElement,this.upperRenderEl.nativeElement]

    const interactive = new FarmClass(this.lowerRenderEl.nativeElement, this.upperRenderEl.nativeElement, setup)

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
