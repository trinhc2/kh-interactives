import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FarmClass, FarmSetup } from './khSimFarmAPI'

@Component({
  selector: 'app-farm-target',
  templateUrl: './farm-target.component.html',
  styleUrls: ['./farm-target.component.css']
})
export class FarmTargetComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('upperRenderEl') public upperRenderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private type = 'grape'

  @Input()
  private target = 0.010

  public ngAfterViewInit(): void {

    const setup = {
      type: this.type,
      target: this.target
    } as FarmSetup

    const els: SVGSVGElement[] = [this.lowerRenderEl!.nativeElement, this.upperRenderEl!.nativeElement]

    const interactive = new FarmClass(els[0], els[1], setup)
  }
}
