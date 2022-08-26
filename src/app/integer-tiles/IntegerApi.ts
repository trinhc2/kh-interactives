import { gsap } from "gsap/all"

export interface integerSetup{
   

    state?:boolean
    answer?:boolean
    reportMode?: boolean
}

export interface value{
    answer?:boolean 
    state?:any
}



export function integerAPI(_el:any, _setup:any){
    let self = {} as integerClass

    var plus;
    var minus;
    
    class integerClass{
        el:(SVGSVGElement)[];
        setup: integerSetup;
        add1Button:SVGSVGElement;
        minus1Button:SVGSVGElement;
        equationButton:SVGSVGElement;
        clearButton:SVGSVGElement;
        plusTile:SVGSVGElement;
        minusTile:SVGSVGElement;
        pluscounter:number;
        minuscounter:number;
        firstButtonClicked:string;
        showEquation:boolean;
        equation:SVGSVGElement;
        equationButtonText:SVGSVGElement;

        zeroPair1:SVGSVGElement;
        zeroPair2:SVGSVGElement;
        smallerCounter:number;

        
        //equationdiv:HTMLElement;
  

        //clearButton:SVGSVGElement;
       
        svgNS:string


        onAnswerUpdate = (answer:any) => { };

        constructor(el:any, setup:any){
            self=this
            this.el=el 
            this.setup=setup
            this.svgNS = "http://www.w3.org/2000/svg";

            //buttons
            this.add1Button=this.el[1].getElementById("plus1") as SVGSVGElement;
            this.minus1Button=this.el[1].getElementById("minus1") as SVGSVGElement;
            this.equationButton=this.el[1].getElementById("equationButton") as SVGSVGElement;
            this.clearButton=this.el[1].getElementById("clear") as SVGSVGElement;


            this.equation=this.el[1].getElementById("equation") as SVGSVGElement;
            this.equationButtonText=this.el[1].getElementById("equationButtonText") as SVGSVGElement;
     
            //grey rectangles for zero pairs
            this.zeroPair1=this.el[0].getElementById("zeroPairrow1") as SVGSVGElement;
            this.zeroPair2=this.el[0].getElementById("zeroPairrow2") as SVGSVGElement;

            this.init()

            //tiles that appear
            this.plusTile = this.el[0].getElementById("plus") as SVGSVGElement;
            this.minusTile = this.el[0].getElementById("minus") as SVGSVGElement;


            this.equation.innerHTML=""
            this.el[1].setAttribute("font-family","poppins")
            this.firstButtonClicked="plus";
            this.smallerCounter=0; //for rectangle dimensions
            this.el[1].setAttribute("user-select","none")
            this.pluscounter=0;
            this.minuscounter=0;
            this.showEquation=false;

        }

     
        //if any tile is clicked, remove that tile type
        svgClicked(e:any){
            //removing the most right positive tile
            if (e.target.id.substring(0,4)=="plus"){
                
                var toRemove=document.getElementById("plus"+(this.pluscounter-1).toString())
                if (toRemove){
             
                    toRemove.remove();
                    this.pluscounter--;
                }

                if (this.showEquation==true)
                this.updateEquation()
            }

            //removing the most right negative tile
            else if (e.target.id.substring(0,5)=="minus"){
                
                var toRemove=document.getElementById("minus"+(this.minuscounter-1).toString())
                if (toRemove){
                    toRemove.remove();
                    this.minuscounter--;
                }
                if (this.showEquation==true)
                this.updateEquation()
            }

            this.adjustZeroPairs();

        }


        //updating dimensions of grey rectangles (zero pairs)
        adjustZeroPairs(){
            
            if (this.pluscounter>=this.minuscounter){
                this.smallerCounter=this.minuscounter;
            }
            else{
                this.smallerCounter=this.pluscounter
            }

            //if working with first row
            if (this.smallerCounter<=10){
                this.zeroPair1.setAttribute("width",(this.smallerCounter*20).toString())
                this.zeroPair2.setAttribute("width","0")
            }

            //if working with second row
            else{
                this.zeroPair2.setAttribute("width",((this.smallerCounter-10)*20).toString())
            }
        }

      //toggling the show equation button
        toggleEquation(){
            if (this.showEquation==false){
                this.updateEquation()
                this.equationButtonText.innerHTML="Hide Equation"
                this.showEquation=true;
            }
            else{
                this.equation.innerHTML=""
                this.equationButtonText.innerHTML="Show Equation"
                this.showEquation=false;
            }

        }

        //specifics for updating an equation (signs, if positive or negative is first, etc.)
        updateEquation(){
            if (this.firstButtonClicked=="minus"){
                this.equation.innerHTML="(-"+this.minuscounter.toString()+") + (+" + this.pluscounter.toString()+") = " 
                if ((this.pluscounter+-1*this.minuscounter)>0){
                    this.equation.innerHTML=this.equation.innerHTML+"+"
                }
            
                this.equation.innerHTML=this.equation.innerHTML+(this.pluscounter+-1*this.minuscounter)
            }
            else{
                this.equation.innerHTML="(+"+this.pluscounter.toString()+") + (-" + this.minuscounter.toString()+") = " 
                if ((this.pluscounter+-1*this.minuscounter)>0){
                    this.equation.innerHTML=this.equation.innerHTML+"+"
                }
            
                this.equation.innerHTML=this.equation.innerHTML+(this.pluscounter+-1*this.minuscounter)

            }
            
        }

        //clearing all tiles button
        clearTiles(){
                while(this.pluscounter>0){
                    var toRemove=document.getElementById("plus"+(this.pluscounter-1).toString())
                    if (toRemove){
                        toRemove.remove()
                    }
                    this.pluscounter--;
               
                }
                while(this.minuscounter>0){
                    var toRemove=document.getElementById("minus"+(this.minuscounter-1).toString())
                    if (toRemove){
                        toRemove.remove()
                    }
                    this.minuscounter--;
                }


                this.showEquation=false;
                this.equationButtonText.innerHTML="Show Equation"
                this.equation.innerHTML=""
                this.firstButtonClicked="plus";
                this.smallerCounter=0;
                this.zeroPair1.setAttribute("width","0")
                this.zeroPair2.setAttribute("width","0")


                
                //also need to update the shown equation

            
               }

        //when Add +1 is clicked
        plus1Clicked(){

            
            if (this.minuscounter==0){
                this.firstButtonClicked="plus"
            }
            plus = document.createElementNS(this.svgNS, "use")
            if (this.pluscounter<10){
            gsap.set(plus, {attr: {id:"plus"+this.pluscounter.toString(),href: "#plus"}, x: this.pluscounter*20, y: 0, visibility:"visible"})
            this.el[0].appendChild(plus)
            //if an animation is wanted
            // gsap.to(plus, {
            //     duration: 0.5,
            //     ease: "elastic",
            //     scale:1,
            //     transformOrigin:"center"
            //   })
            this.pluscounter++;
            if (this.showEquation==true)
                this.updateEquation()
            }
            else if (this.pluscounter<20){
            gsap.set(plus, {attr: {id:"plus"+this.pluscounter.toString(),href: "#plus"}, x: (this.pluscounter-10)*20, y: 55, visibility:"visible"})
            this.el[0].appendChild(plus)
            this.pluscounter++;
            if (this.showEquation==true)
                this.updateEquation()
            }

            this.adjustZeroPairs()

            

            
        }

        //when Add -1 is clicked
        minus1Clicked(){


            if (this.pluscounter==0){
                this.firstButtonClicked="minus"
            }
           
            minus = document.createElementNS(this.svgNS, "use")

            if (this.minuscounter<10){
                gsap.set(minus, {attr: {id:"minus"+this.minuscounter.toString(),href: "#minus"}, x: this.minuscounter*20, y: 0, visibility:"visible"})
        
                this.el[0].appendChild(minus)
            this.minuscounter++;
            if (this.showEquation==true)
                this.updateEquation()
            }
            else if (this.minuscounter<20){
                gsap.set(minus, {attr: {id:"minus"+this.minuscounter.toString(),href: "#minus"}, x: (this.minuscounter-10)*20, y: 55, visibility:"visible"})
        
             this.el[0].appendChild(minus)
                this.minuscounter++;
                if (this.showEquation==true)
                this.updateEquation()
            }

            this.adjustZeroPairs()
  
        }
       

        addEventListenersAndInteractivity(){

            this.el[0].addEventListener("click", e=>this.svgClicked(e))
            this.clearButton.addEventListener("click", event=>this.clearTiles())
            this.equationButton.addEventListener("click",event=> this.toggleEquation())
            this.add1Button.addEventListener("click",event=> this.plus1Clicked())
            this.minus1Button.addEventListener("click",event=> this.minus1Clicked())
        }

        init(){
    
                this.addEventListenersAndInteractivity()
               



         }   
    }


  return new integerClass(_el, _setup)
}
