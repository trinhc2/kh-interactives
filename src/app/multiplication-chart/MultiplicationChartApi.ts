export interface multiplicationSetup{
    mainColour:string;
    equivColour:string;
    reportMode?:boolean

}

interface clickChoice{
    type:string;
    value:number;
    isClicked:boolean;
}

export function multiplicationAPI(_el:any,_setup:any){
    let self={} as multiplicationClass;

    var numberPerSide:number=12;
    var size:number=16;
    var tableValues= new Array(numberPerSide);

    var rowClick:clickChoice;
    var colClick:clickChoice;
    var factButtonClicked:boolean;
    var oldRowValue:number;
    var oldColValue:number;


    class multiplicationClass{
        el:(SVGSVGElement);
        setup: multiplicationSetup;

        multfactbutton:SVGSVGElement;
        resetbutton:SVGSVGElement;
        equivalent:SVGSVGElement;


        factcircle:SVGSVGElement;
        equivcircle:SVGSVGElement;
        boardtext:SVGSVGElement;
        boardtext2:SVGSVGElement;
        equivboardtext:SVGSVGElement;
        equivboardtext2:SVGSVGElement;
        factButChange:SVGSVGElement;

        svgNS:string;



        constructor(el:any,setup:any){
            self=this;
            this.el=el;
            this.setup=setup
            this.svgNS = "http://www.w3.org/2000/svg";


            //buttons from SVG
            this.multfactbutton=this.el.getElementById("factbutton") as SVGSVGElement;
            this.resetbutton=this.el.getElementById("resetBut") as SVGSVGElement;

            this.equivalent=this.el.getElementById("equivalent") as SVGSVGElement;
            this.factButChange=this.el.getElementById("factButChange") as SVGSVGElement;
        

            //initialize text and circle
            this.factcircle=document.createElementNS(this.svgNS,"circle") as SVGSVGElement;
            this.equivcircle=document.createElementNS(this.svgNS,"circle") as SVGSVGElement;
            this.boardtext=document.createElementNS(this.svgNS,"text") as SVGSVGElement;
            this.boardtext2=document.createElementNS(this.svgNS,"text") as SVGSVGElement;
            this.equivboardtext=document.createElementNS(this.svgNS,"text") as SVGSVGElement;
            this.equivboardtext2=document.createElementNS(this.svgNS,"text") as SVGSVGElement;

            

            //initializing whether rows and columns are clicked
            rowClick={
                
                type:"row",
                value:0,
                isClicked:false
            }
            
            colClick={
       
                type:"col",
                value:0,
                isClicked:false
            }

            oldRowValue=rowClick.value;
            oldColValue=colClick.value;

            this.init()

            
        }


        //creating the multiplication grid on the svg
        createGrid(numberPerSide:number, size:number) {
    
            var box;
            
            for(var i = 0; i <=numberPerSide; i++) {
                tableValues[i]=new Array();
                for(var j = 0; j <=numberPerSide; j++) {
                    var buttonFlag=false;
                    var rowColFlag="row";
                  var g = document.createElementNS(this.svgNS,"g");
                  g.setAttribute("transform", ["translate(", i*size+7, ",", j*size+3, ")"].join(""));
                  var number = (j)*(i);
    
        
                  //finding the row and column buttons, these are buttonFlags
                  if (number==0){
                    if (j==0){
                        number=i;
                        buttonFlag=true;
                        rowColFlag="col"
                    }
                    else{
                        number=j;
                        buttonFlag=true;
                        rowColFlag="row"
                    }
                  }

                  //creating the grid boxes
                  box = document.createElementNS(this.svgNS,"rect");
                  box.setAttribute("width", size.toString());
                  box.setAttribute("stroke","#bebebe")
                  box.setAttribute("height", size.toString());
                  
                 //if they're a row or column (buttonFlag), then set their id and fill differently. Otherwise, they are just white
                 if (buttonFlag==true){
                    box.setAttribute("id", "button" +rowColFlag +number); 
                    box.setAttribute("fill", "#435259"); 
                 }
                 else{
                    box.setAttribute("id", "b" + number); 

                    box.setAttribute("fill", "white");
                 }
                  
                  
        
                  //creating text for the grid
                  var text = document.createElementNS(this.svgNS,"text");
        
                  if (number!=0)
                    text.appendChild(document.createTextNode(number.toString()));
                  else{
                    //edit the box as an x if it's the top left corner 
                    text.appendChild(document.createTextNode("x"));
                    box.setAttribute("id","x")
                    box.setAttribute("pointer-events", "none")
                  }
                     
                  text.setAttribute("font-size", "7");
                  text.setAttribute("x", (size/2).toString());
                  text.setAttribute("y",  (size/2).toString());
                  text.setAttribute("text-anchor", "middle");
                  text.setAttribute("pointer-events", "none");
                  text.setAttribute("font-family", "Poppins");
                  text.setAttribute("dominant-baseline", "middle");
                  if (buttonFlag==true){
                    text.setAttribute("id", "buttont" + rowColFlag+ number);
                    text.setAttribute("fill", "white");
                  }
            
                  else{
                    text.setAttribute("color", "black");
                  }

                  g.appendChild(box);
                  tableValues[i][j]=box;
                 
                  g.appendChild(text);
                  this.el.appendChild(g);
                  buttonFlag=false;
        
                }  
            }
        };

        //event listeners on the svg and the buttons
        addEventListenersAndInteractivity(){
            this.el.addEventListener("click", e => this.svgClicked(e))
            this.multfactbutton.addEventListener("click",event=> this.factClicked())
            this.resetbutton.addEventListener("click", event=>this.resetClicked())
        }


        //filling the row with the main colour (could remake to fill with any colour for better reusability)
        fillRow(rowIndex:number){
            if (rowIndex!=0){        
                for (var j=1; j<13;j++){
                    tableValues[j][rowIndex].setAttribute("fill","#ffc1cc")
                    tableValues[j][rowIndex].setAttribute("fill-opacity",0.7)
                }
    
         }
        }

        //clearing row
        clearRow(rowIndex:number){
            if (rowIndex!=0){
                for (var j=1; j<13;j++){
                    //tile only cleared if it does not intesect with a column
                    if (j!=colClick.value)
                    tableValues[j][rowIndex].setAttribute("fill","none")
                    
                }
                
            }
        }


        //filling the column with the main colour (could remake to fill with any colour for better reusability)
        fillCol(colIndex:number){
            if (colIndex!=0){
        
                for (var j=1; j<13;j++){
                    tableValues[colIndex][j].setAttribute("fill","#ffc1cc")
                    tableValues[colIndex][j].setAttribute("fill-opacity",0.7)
                }
             }
        }

        //clearing column
        clearCol(colIndex:number){
            if (colIndex!=0){
                for (var j=1; j<13;j++){
                    //tile only cleared if it does not intersect with a row
                    if (j!=rowClick.value){
                    tableValues[colIndex][j].setAttribute("fill","none")
                    }
                }
                
                
            }
        }

        //handles click, primarily if the grid buttons are clicked (rowCol!="")
        svgClicked(e:any){
            var id = e.target.id; 
            var rowCol=id.substring(6,9);
            var index=parseInt(id.substring(9));
           
            if(rowCol!=""){
               

                //IF A ROW IS CLICKED
                if (rowCol=="row"){

                    //a) CLICKING ROW - if row is not yet clicked, fill the row
                    if (rowClick.isClicked==false){
                        this.fillRow(index);
                        if (index!=0)
                            this.boardtext.innerHTML=index.toString()

                        rowClick.isClicked=true;
                        rowClick.value=index;

                        tableValues[0][rowClick.value].setAttribute("fill","#1c2e37")
                    }

                    //b) UNCLICKING ROW - if the row is already clicked, and the same value is being clicked again, then the row is actually being unclicked so clear it
                    else if (rowClick.isClicked==true && rowClick.value==index){
                        rowClick.isClicked=false;
                        this.factcircle.setAttribute("visibility", "hidden")
                        tableValues[0][rowClick.value].setAttribute("fill","#435259")
                        rowClick.value=0;
                        if (index!=0){
                            this.clearRow(index);
                            this.boardtext.innerHTML="";
                        }
                        
                        //restore the column from unclicking
                        if (colClick.value!=0){
                            this.fillCol(colClick.value)
                        }
                        
                    }

                    //c) UPDATING ROW VALUE - the row is already clicked, but a new value is being clicked this time
                    else{
                        //clear old row and fill the new one
                        this.clearRow(rowClick.value)
                        tableValues[0][rowClick.value].setAttribute("fill","#435259")
                        this.fillRow(index);
                        if (index!=0)
                            this.boardtext.innerHTML=index.toString()
                        rowClick.value=index;
                        tableValues[0][rowClick.value].setAttribute("fill","#1c2e37")
                    }

                }

                //IF COLUMN IS CLICKED
                else if (rowCol=="col"){

                    //a) CLICKING/SELECTING COLUMN
                    if (colClick.isClicked==false){
                        this.fillCol(index);
                        if (index!=0)
                            this.boardtext2.innerHTML=index.toString()

                        colClick.isClicked=true;
                        colClick.value=index;
                        tableValues[colClick.value][0].setAttribute("fill","#1c2e37")
                    }

                    //b) UNCLICKING COLUMN
                    else if (colClick.isClicked==true && colClick.value==index){
                        colClick.isClicked=false;
                        
                        tableValues[colClick.value][0].setAttribute("fill","#435259")
                        colClick.value=0;
                        this.factcircle.setAttribute("visibility", "hidden")
                        if (index!=0){
                            this.clearCol(index);
                            this.boardtext2.innerHTML="";
                        }
                        
                        if (rowClick.value!=0){
                            this.fillRow(rowClick.value)
                        }
                    
                    }

                    //UPDATING COLUMN VALUE
                    else{
                        //clearing previous column and then filling new one
                        this.clearCol(colClick.value)
                        tableValues[colClick.value][0].setAttribute("fill","#435259")
                        this.fillCol(index);
                        if (index!=0)
                            this.boardtext2.innerHTML=index.toString()
                        colClick.value=index;
                        tableValues[colClick.value][0].setAttribute("fill","#1c2e37")
                    }
                }


                //SEPARATE IF - IF BOTH ROW AND COLUMN ARE CLICKED - MAY HAVE EQUIVALENT FACT
                if (rowClick.isClicked==true && colClick.isClicked==true){
                    //update circle values for the fact circle and make visible
                    this.factcircle.setAttribute("cx", (colClick.value*16+7+8).toString())
                    this.factcircle.setAttribute("cy",(rowClick.value*16+8+3).toString())
                    this.factcircle.setAttribute("visibility","visible")

                    this.fillRow(rowClick.value)
                    this.fillCol(colClick.value)

                    //emptying the rows and columns backwards so that there is nothing past the row and column intersection
                    for (var k=12;k>colClick.value;k--){
                        tableValues[k][rowClick.value].setAttribute("fill","none") 
                     }
                     for (var k=12;k>rowClick.value;k--){
                        tableValues[colClick.value][k].setAttribute("fill","none") 
                     }


                     //if the fact button is toggled ON, update the equivalent fact if it's not a perfect square (there is no equivalent fact for perfect squares)
                     if (factButtonClicked==true ){
                        if (rowClick.value!=colClick.value){
                            this.updateEquivalent();
                        }
                        else{
                            this.removeEquivalent();
                        }
                    }
   
                }

                //if both of them AREN'T FILLED, need to remove the equivalent fact in case it was there previously (previous statements handle the original fact)
                else{
                    if (factButtonClicked==true){
                            this.removeEquivalent();
                        this.equivalent.setAttribute("visibility", "visible")
                    }

                }

        
            }
        }
        
    

        //setting items to false, clearing rows and columns, reseting to first load
        resetClicked(){

            this.equivalent.setAttribute("visibility","hidden")

            this.boardtext.innerHTML=""
            this.boardtext2.innerHTML=""
            this.equivboardtext.innerHTML=""
            this.equivboardtext2.innerHTML=""
            this.factcircle.setAttribute("visibility", "hidden")
            this.equivcircle.setAttribute("visibility", "hidden")
           
            if (rowClick.value!=0 &&rowClick.isClicked==true){
                for (var j=1; j<13;j++){
                    tableValues[rowClick.value][j].setAttribute("fill","none")
                }
            }
            if (colClick.value!=0 &&colClick.isClicked==true){
                for (var j=1; j<13;j++){
                    tableValues[j][colClick.value].setAttribute("fill","none")
                }
            }
        
            for (j=1; j<=rowClick.value;j++){
                tableValues[colClick.value][j].setAttribute("fill","none")
            }
        
            for (j=1; j<colClick.value;j++){
          
                tableValues[j][rowClick.value].setAttribute("fill","none")
            }

            tableValues[0][rowClick.value].setAttribute("fill","#435259")
            tableValues[colClick.value][0].setAttribute("fill","#435259")
            rowClick.isClicked=false;
            colClick.isClicked=false;
            rowClick.value=0;
            colClick.value=0;

            factButtonClicked=false
            this.factButChange.innerHTML="Show equivalent"
        
         }


        //updating the equivalent fact (either it is changed, or when the multiplication fact button is toggled ON
        updateEquivalent(){

            //make text and board visible
            this.equivalent.setAttribute("visibility", "visible")
            this.equivboardtext.innerHTML=colClick.value.toString();
            this.equivboardtext2.innerHTML=rowClick.value.toString();

            this.equivboardtext.setAttribute("visibility", "visible")
            this.equivboardtext2.setAttribute("visibility", "visible")

            //if not a perfect square, clear the old row and old columns
            if (rowClick.value!=colClick.value){
                if (oldRowValue!=colClick.value)
                this.clearCol(oldRowValue)
                if (oldColValue!=rowClick.value)
                this.clearRow(oldColValue)
            }
            else{
                return;
            }

            //update the row that's being filled based on if the column clicked exists
            if (colClick.value!=0){
                for (var j=1; j<=rowClick.value;j++){
                    tableValues[j][colClick.value].setAttribute("fill","#0fade1")
                    tableValues[j][colClick.value].setAttribute("fill-opacity",0.4)

                    //for the tile that intersects the original and the equivalent fact, fill with a different colour
                    if (j==colClick.value)
                    tableValues[j][colClick.value].setAttribute("fill","#9fb9d4")
                }
            }

            //update the column that's being filled based on if the row clicked exists
            if (rowClick.value!=0){
                for (var j=1; j<colClick.value;j++){
                    tableValues[rowClick.value][j].setAttribute("fill","#0fade1")
                    tableValues[rowClick.value][j].setAttribute("fill-opacity",0.4)
                    //for the tile that intersects the original and the equivalent fact, fill with a different colour
                    if (j==rowClick.value)
                    tableValues[rowClick.value][j].setAttribute("fill","#9fb9d4")
                }
            }

            
            //update the circle location for the equivalent fact
            this.equivcircle.setAttribute("cx",(rowClick.value*16+15).toString())
            this.equivcircle.setAttribute("cy",(colClick.value*16+11).toString())
            this.equivcircle.setAttribute("visibility","visible")

            //update the old row and column values
            if (rowClick.value!=colClick.value){
                oldRowValue=rowClick.value;
                oldColValue=colClick.value;
            }
            
            
        }

        //the equivalent fact is either toggled off OR it is invalid (e.g. perfect square, or only row or only column is clicked)
        removeEquivalent(){
            //hide the fact and circle
            this.equivalent.setAttribute("visibility", "hidden")
            this.equivcircle.setAttribute("visibility", "hidden")
            
            //remove the equivalent fact text on the board
            this.equivboardtext.innerHTML=""
            this.equivboardtext2.innerHTML=""
            
                //clear the columns and rows (that have opposite values)
                if (oldRowValue!=colClick.value)
                    this.clearCol(oldRowValue)
                if (oldColValue!=rowClick.value)
                    this.clearRow(oldColValue)
            
        }

        //handles if the fact button is clicked (change button text and calls appropriate function)
        factClicked(){
            if (factButtonClicked==false){
       
                factButtonClicked=true;
                this.factButChange.innerHTML="Hide equivalent"
                this.updateEquivalent();
                
            }
            else{
                this.factButChange.innerHTML="Show equivalent"
                this.removeEquivalent();
                factButtonClicked=false;
            
            }
        }


        init(){

            if (this.setup.reportMode==false){
                this.createGrid(numberPerSide,size)

                //styling the circles, text on board, etc.
                this.factcircle.setAttribute("visibility", 'hidden');
                this.factcircle.setAttribute("fill", 'none');
                this.factcircle.setAttribute("stroke", '#e11584');
                this.factcircle.setAttribute("stroke-width", "1px")
                this.factcircle.setAttribute("r", "7.5")


                this.equivalent.setAttribute("visibility", "hidden")
                this.equivcircle.setAttribute("visibility", 'hidden');
                this.equivcircle.setAttribute("fill", 'none');
                this.equivcircle.setAttribute("stroke", '#0fade1');
                this.equivcircle.setAttribute("stroke-width", "1px")
                this.equivcircle.setAttribute("r", "7.5")

                this.boardtext.appendChild(document.createTextNode(""));
                this.boardtext.setAttribute("font-size", "20");
                this.boardtext.setAttribute("x","257");
                this.boardtext.setAttribute("font-family", "Poppins")
                this.boardtext.setAttribute("y","43");
                this.boardtext.setAttribute("fill","#24353eff")

                this.boardtext2.appendChild(document.createTextNode(""));
                this.boardtext2.setAttribute("font-size", "20");
                this.boardtext2.setAttribute("x","312");
                this.boardtext2.setAttribute("font-family", "Poppins")
                this.boardtext2.setAttribute("y","43");
                this.boardtext2.setAttribute("fill","#24353eff")

                this.equivboardtext.appendChild(document.createTextNode(""));
                this.equivboardtext.setAttribute("visibility", "hidden");
                this.equivboardtext.setAttribute("font-size", "20");
                this.equivboardtext.setAttribute("x","257");
                this.equivboardtext.setAttribute("font-family", "Poppins")
                this.equivboardtext.setAttribute("y","84");
                this.equivboardtext.setAttribute("fill","#24353eff")

                this.equivboardtext2.appendChild(document.createTextNode(""));
                this.equivboardtext2.setAttribute("visibility", "hidden");
                this.equivboardtext2.setAttribute("font-size", "20");
                this.equivboardtext2.setAttribute("x","312");
                this.equivboardtext2.setAttribute("font-family", "Poppins")
                this.equivboardtext2.setAttribute("y","84");
                this.equivboardtext2.setAttribute("fill","#24353eff")



                this.el.appendChild(this.factcircle)
                this.el.appendChild(this.equivcircle)
                this.el.appendChild(this.boardtext)
                this.el.appendChild(this.boardtext2)
                this.el.appendChild(this.equivboardtext)
                this.el.appendChild(this.equivboardtext2)

                //adding event listeners
               factButtonClicked=false;
                this.addEventListenersAndInteractivity()
                
            }


        }
    }







    return new multiplicationClass(_el,_setup)
}
