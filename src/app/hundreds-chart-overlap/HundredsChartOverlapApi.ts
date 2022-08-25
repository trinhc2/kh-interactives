import { gsap } from "gsap/all"

export interface hundredSetup{
    colourA:string
    colourB:string
    colourC:string
    answerString:string[]

    state?:boolean
    answer?:boolean
    reportMode?: boolean
}

export interface value{
    answer?:boolean 
    state?:any
}

interface colourChoice{
    counterID:string,
    r:number,
    fill:string,
    stroke:string,
    strokeLinecap:string,
    strokeDasharray:number,
    strokeWidth:number
}

export function hundredAPI(_el:any, _setup:any){
    let self = {} as hundredClass


    //initialize flags for which grid spaces have which counters
    var clicked=new Array();
    for (var j = 0; j < 100; j++)
        clicked.push({"flagA":false,"flagB":false});

    var clickedString:string[];
    var blue:string;
    var pink:string;
    var counterColour:string;
    var counterMenu:any;
    var counterAdef:colourChoice;
    var counterBdef:colourChoice;
    // var counterCdef: colourChoice;
    
    class hundredClass{
        el:(SVGSVGElement)[];
        setup: hundredSetup;
  
        counterASelect:SVGSVGElement;
        counterBSelect:SVGSVGElement;
        clearButton:SVGSVGElement;
        answerStringVar:string[];

        grids:Array<HTMLElement>
        svgNS:string


        onAnswerUpdate = (answer:any) => { };

        constructor(el:any, setup:any){
            self=this
            this.el=el 
            this.setup=setup
            this.svgNS = "http://www.w3.org/2000/svg";


            //initializing menu buttons
            this.counterASelect=this.el[1].getElementById("selectCounterA") as SVGSVGElement
            this.counterBSelect=this.el[1].getElementById("selectCounterB") as SVGSVGElement
            this.clearButton=this.el[1].getElementById("clearButton") as SVGSVGElement;
 
            //for grid spaces
            this.grids=[];

            //for answer validation
            clickedString=[];

            this.answerStringVar=this.setup.answerString;

            //counter colours
            blue=this.setup.colourA;
            pink=this.setup.colourB;
            
            //defining the visual properties of the counters
            counterAdef={
                counterID:"A",
                r:16,
                fill:"#11b8cc53",
                stroke:"none",
                strokeLinecap:"round",
                strokeDasharray:0,
                strokeWidth:0
            }
            counterBdef={
                counterID:"B",
                r:19,
                fill:"#ff27620d",
                stroke:this.setup.colourB,
                strokeLinecap:"round",
                strokeDasharray:0,
                strokeWidth:2
            }

            //these are the first clicked counters on the menu:
            counterColour=blue;
            counterMenu=counterAdef;

            this.init()


        }


        //creating the hundreds chart, a 10 by 10 grid
        createGrid(squaresPerSide:number, squarePixelSize:number){
            let svg = document.createElementNS(this.svgNS,"svg")

             svg.setAttribute("viewBox", [0, 0, squarePixelSize*squaresPerSide, squarePixelSize*squaresPerSide].join(" "));

             for(var i = 0; i <squaresPerSide; i++) {
                for(var j = 0; j < squaresPerSide; j++) {
                    let g = document.createElementNS(this.svgNS,"g");
                    g.setAttribute("transform", ["translate(", (i*squarePixelSize)-(i*0.5)+0.5, ",", (j*squarePixelSize)-(j*0.5)+0.5, ")"].join(""));
                    var number = squaresPerSide * j + i+1;
                    var box = document.createElementNS(this.svgNS,"rect");
                    box.setAttribute("width", squarePixelSize.toString());
                    box.setAttribute("stroke","#bebebe")
                    box.setAttribute("stroke-width","2px")
                    box.setAttribute("height", squarePixelSize.toString());
                    box.setAttribute("fill", "white");
                    box.setAttribute("id", "grid" + number); 
                    g.appendChild(box);

                    var text = document.createElementNS(this.svgNS,"text")
                    text.textContent=(j * squaresPerSide + i+1).toString();
                    text.setAttribute("font-size", "20");
                    text.setAttribute("font-family", "Poppins");
                    text.setAttribute("fill", "#24353eff");
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("dominant-baseline", "middle");
                    text.setAttribute("pointer-events", "none");
                   
                    text.setAttribute("x",(squarePixelSize/2).toString());
                    text.setAttribute("y", (squarePixelSize/2).toString());
                    text.setAttribute("id", "t" + number);
                
                    
                    g.appendChild(text);
                    svg.appendChild(g);
                }  
            }
            return svg;
        };




        
        
        //handles whenever the grid is clicked
        gridClicked(i:number){
            let newCounter=document.createElementNS(this.svgNS,"circle")
            newCounter.setAttribute("id",counterMenu.counterID+i.toString())
                    //to remove counter A, since it is selected in the menu and already exists
                    if (clicked[i-1].flagA==true && counterMenu==counterAdef){
                          let removechip=document.getElementById(counterMenu.counterID+i.toString())
                          gsap.to(removechip,{duration:0.3,cx:this.getCx(i),cy:this.getCy(i), ease:"back", transformOrigin:"center", opacity:0,r:0, onComplete:function(){
                            if (removechip){
                                removechip.remove()
                            }
                            
                        }})
                        clicked[i-1].flagA=false;


                    //for answer string
                    const removeIndex=clickedString.indexOf(counterMenu.counterID+i.toString());
                        if (removeIndex>-1){
                            clickedString.splice(removeIndex,1);
                        }

                    }

                    //to remove counter B, since it is selected in the menu and already exists
                    else if (clicked[i-1].flagB==true &&counterMenu==counterBdef){
                          let removechip=document.getElementById(counterMenu.counterID+i.toString())
                          gsap.to(removechip,{duration:0.3,cx:this.getCx(i),cy:this.getCy(i), ease:"back", transformOrigin:"center", opacity:0,r:0, onComplete:function(){
                            if (removechip){
                                removechip.remove()
                            }
                            
                        }})
                        clicked[i-1].flagB=false;
                        
                        //for answer string
                        const removeIndex=clickedString.indexOf(counterMenu.counterID+i.toString());
                        if (removeIndex>-1){
                            clickedString.splice(removeIndex,1);
                        }
                    }

                    //otherwise, the counter selected is noto already there so we can add a new counter
                    else{
                       
                        gsap.set(newCounter,{pointerEvents:"none",cx:this.getCx(i),cy:this.getCy(i), r:12, fill:counterMenu.fill, stroke:counterMenu.stroke, strokeLinecap:counterMenu.strokeLinecap, strokeDasharray:counterMenu.strokeDasharray, strokeWidth:counterMenu.strokeWidth})
                        this.el[0].appendChild(newCounter)
                        //animation to add counter
                        gsap.to(newCounter, {
                            duration: 0.5,
                            r:counterMenu.r,
                            ease: "elastic",
                            transformOrigin:"center"
                          })

                          //adding counter A
                        if (counterMenu==counterAdef && clicked[i-1].flagA==false){
                            clicked[i-1].flagA=true;
                        }

                        //or adding counter B
                        else{
                            clicked[i-1].flagB=true;
                        }

                        //adding the counter to the validation array
                        clickedString.push(counterMenu.counterID+i.toString());
                        

                    }
                    if (this.validateString()==true){
                        //console.log("correct")
                    }

        }


        //not being used right now, but this can validate which counters we want on which tiles
        validateString(){
    
            if (clickedString == null || this.answerStringVar == null) 
            return false;
            if (clickedString.length !== this.answerStringVar.length) return false;
            
            for (var i = 0; i < clickedString.length; ++i) {
                if (clickedString.sort()[i] !== this.answerStringVar.sort()[i]) 
                return false;
              }
              return true;
            }


        //clearing all the counters
        clearCounters(){
   
            //removing the counters on the screen visually
            for (let i=0; i<clickedString.length;i++){
                if (document.getElementById(clickedString[i])){
                    document.getElementById(clickedString[i])?.remove();
                }
                
            }

            //all flags need to be false if counters are cleared
            for (let i=0;i<100;i++){
                clicked[i].flagA=false;
                clicked[i].flagB=false;
            }

            //the clicked answer string is also empty when cleared
            clickedString=[];

            
        }
            
            
         //making menu selections
        menuSelected(selectedColour:string, selectedMenu:any, selected:any, off1:any){
           
            counterColour=selectedColour
            counterMenu=selectedMenu
            selected.style.fill="#0fade129";
            selected.style.stroke="#0fade1";
            off1.style.fill="#ffffff"
            off1.style.stroke="#bebebe"
        }

        //counter chip, x location
        getCx(i:number){
            let cx;
            cx=20+((i-1)%10)*40
            return cx;
        }

        //counter chip, y location
        getCy(i:number){
            let cy;
            cy=20+(Math.floor((i-1)/10)*40)
            return cy;
        }

        applyAnswer(){
            //console.log('logic to generate string of trues')
        }

        applyState(){
            //console.log('logic to redraw the counters')
        }

        addEventListenersAndInteractivity(){
            //for 100s chart grid
            for (let i=1; i<=100; i++){
                this.grids[i-1].addEventListener("click", event=> this.gridClicked(i))
             }

             //for menu selection
            this.counterASelect.addEventListener("click",event=> this.menuSelected(blue, counterAdef,this.counterASelect,this.counterBSelect))
            this.counterBSelect.addEventListener("click",event=> this.menuSelected(pink, counterBdef,this.counterBSelect, this.counterASelect))
            this.clearButton.addEventListener("click", event=> this.clearCounters() );
        
        }

        init(){
            
            //if not report mode, create the grid and add event listeners
            if (this.setup.reportMode==false){
                this.el[0].appendChild(this.createGrid(10, 40))
                for (let i=1; i<=100; i++){
                    this.grids[i-1]=this.el[0].getElementById("grid"+i.toString()) as HTMLElement
                }
                this.addEventListenersAndInteractivity()
                this.menuSelected(blue, counterAdef,this.counterASelect,this.counterBSelect)
            }

    

            if (this.setup.answer) {
                this.applyAnswer()
            }

            
         }   
    }


  return new hundredClass(_el, _setup)
}
