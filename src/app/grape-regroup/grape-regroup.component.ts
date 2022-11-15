import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RegroupClass } from "./regroupAPI"

@Component({
  selector: 'app-grape-regroup',
  templateUrl: './grape-regroup.component.html',
  styleUrls: ['./grape-regroup.component.css']
})
export class GrapeRegroupComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;

  public ngAfterViewInit(): void {

    const interactive = new RegroupClass(this.lowerRenderEl.nativeElement)

  }

}
