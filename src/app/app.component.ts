import { Component, OnInit, ElementRef} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
    console.log("element ref in constructor",elementRef.nativeElement)
  }

  ngOnInit(): void {
  
  }
  
}
