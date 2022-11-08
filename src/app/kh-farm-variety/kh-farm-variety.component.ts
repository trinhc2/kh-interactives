import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FarmClass } from "./khFarmTrailerAPI"
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kh-farm-variety',
  templateUrl: './kh-farm-variety.component.html',
  styleUrls: ['./kh-farm-variety.component.css']
})

export class KhFarmVarietyComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  constructor(public dialog: MatDialog) { }

  public ngAfterViewInit(): void {

    const els = [this.lowerRenderEl.nativeElement, this.upperRenderEl.nativeElement]

    const interactive = new FarmClass(this.lowerRenderEl.nativeElement, this.upperRenderEl.nativeElement)

  }

  openDialog() {
    console.log("click!")
    this.dialog.open(DialogContent)
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent { }
