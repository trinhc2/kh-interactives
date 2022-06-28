
import { Component, Input, ViewChild, ElementRef, OnInit, Inject, AfterViewInit, Renderer2, TemplateRef } from '@angular/core';
import {fabric} from 'fabric';
//import {MatDialog} from "@angular/material/dialog";
//import { NativeDateAdapter } from '@angular/material/core';
//import { DEFAULT_DIALOG_CONFIG, DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-drawing-input',
  templateUrl: './drawing-input.component.html',
  styleUrls: ['./drawing-input.component.css'],
})
export class DrawingInputComponent implements AfterViewInit{

  
 

  // openModal() {
  //   this.modal.open();
  // }
//constructor(private renderer:Renderer2){}
  @ViewChild('renderEl') public renderEl?: ElementRef<SVGSVGElement>;
  @ViewChild('Modal') private Modal!: ElementRef;

  @ViewChild('canvasBGImage') private canvasBGImage!: ElementRef;
  

 //@ViewChild(KhDialogComponent) private child:KhDialogComponent;

 //@ViewChild('khModal', {static: false}) modal: ElementRef;
 //Inputs
 @Input()
 public canvas: any;

 // @Input()
 // public backGround: string = 'src/assets/board1.svg'

 @Input()
 private strokeColor: string = 'black'

 @Input()
 public canvasWidth: number = 500

 @Input()
 public canvasHeight: number = 700

 @Input()
 private strokeWidth: number = 35

 @Input()
 public niceDrawing:any;
 
 @Input()
 public prevDrawing:any;
 @Input()
 public strokesMade:boolean=false;


 @Input()
 public setID: any;

 @Input()
 public styleType: any;

 @Input()
 public regionStyle: any;

//remove all existing objects drawn on the canvas
 undoClicked(){
   this.canvas.getObjects().forEach((object:any)=>{
     if(object!==this.canvas.backgroundColor){
       this.canvas.remove(object);
     }
   })
 }

 //convert objects into svg and adjust proportions
 saveClicked(){

   let drawing=this.canvas.toSVG();
   let parser = new DOMParser();
   const doc = parser.parseFromString(drawing, 'text/html');
   
   this.niceDrawing=doc.querySelector("svg");
   this.niceDrawing.setAttribute("height", this.canvasHeight.toString());
   this.niceDrawing.setAttribute("width", this.canvasWidth.toString());
   this.niceDrawing.setAttribute("x", "60/0.2645");


   if (this.prevDrawing!=undefined && this.niceDrawing!=undefined){
        //remove previous drawing (if exists) if saving a new one
        this.renderEl?.nativeElement.removeChild(this.prevDrawing);
      }
      //saving the new drawing
      if(this.niceDrawing!=undefined){
        this.renderEl?.nativeElement.appendChild(this.niceDrawing);
        this.prevDrawing = this.niceDrawing
      }

   if(this.canvas.getObjects().length==0){
     console.log("saved value false")
     this.strokesMade= false;
   }
   else{
     console.log("saved value true")
     this.strokesMade=true;
   }
   this.Modal.nativeElement.style.display="none"
 }

 xClose(){
  this.Modal.nativeElement.style.display="none"
 }



  // @Input()
  // public bgImage: string='./src/assets/board1.svg';


  ngAfterViewInit(){
   // ID:this.setID;
  // console.log("initializing")

    this.canvas=new fabric.Canvas(this.setID, {
      isDrawingMode:true,
    })
    // console.log(this.setID)

    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);
    this.canvas.freeDrawingBrush.color=this.strokeColor;
    this.canvas.freeDrawingBrush.width=this.strokeWidth;
   
    this.canvas.renderAll();
  
  }

  //constructor (@Inject(MatDialog)public dialog: MatDialog, private khComponent:KhDialogComponent) { }
  
  openDialog(){
    //let dialogRef = this.dialog.open(KhDialogComponent);

    this.Modal.nativeElement.style.display="block"

  
    
  }
}
