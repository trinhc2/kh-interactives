import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RegroupClass } from "./regroupAPI"

@Component({
  selector: 'app-representing-grapes',
  templateUrl: './representing-grapes.component.html',
  styleUrls: ['./representing-grapes.component.css']
})
export class RepresentingGrapesComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  
  constructor() { }

  public ngAfterViewInit(): void {

    const interactive = new RegroupClass(this.lowerRenderEl.nativeElement)

  }

}
