import { Component, ElementRef, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { RegroupClass } from "./regroupAPI"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-representing-grapes',
  templateUrl: './representing-grapes.component.html',
  styleUrls: ['./representing-grapes.component.css']
})
export class RepresentingGrapesComponent implements AfterViewInit {
  @ViewChild('lowerRenderEl') public lowerRenderEl?: ElementRef<SVGSVGElement>;

  @Input()
  private type: string = "grapes"

  @Input()
  private tens: number = 16

  @Input()
  private ones: number = 42

  @Input()
  private feedback: string = "full"

  constructor(private route: ActivatedRoute) {}

  public ngAfterViewInit(): void {

  console.log(this.route.snapshot.queryParams["type"])
  let urlType = this.route.snapshot.queryParams["type"]
  let urlTens = Number(this.route.snapshot.queryParams["tens"])
  let urlOnes = Number(this.route.snapshot.queryParams["ones"])
  let urlFeedback = this.route.snapshot.queryParams["feedback"]

    //const interactive = new RegroupClass(this.lowerRenderEl.nativeElement, this.type, this.tens, this.ones)
    const interactive = new RegroupClass(this.lowerRenderEl.nativeElement, urlType, urlTens, urlOnes, urlFeedback)

  }

}
