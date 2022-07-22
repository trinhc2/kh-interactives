import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionClass {

        els: SVGSVGElement;
        fraction: SVGSVGElement
        svgns = "http://www.w3.org/2000/svg";
        dragged = false;
        clicked=false;
        dragStart = {x: 0, y:0}
        sectionOffset = 20;
        fractionWidth: number
        fractionSectionWidth: number
        fractionSectionCount: number

        

        constructor(els) {
            self = this
            this.els = els
            this.fraction = this.els.getElementById("fraction") as SVGSVGElement

            this.init();
        }

        generateFractionBar(){

            for (let i = 0; i < 5; i++){
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width:50, height:30, x:this.sectionOffset, y: 20, fill:"rgb(224, 102, 102)", fillOpacity:0, rx: 5, ry:5, stroke:"#595959"})
                this.fraction.appendChild(rect)
                this.sectionOffset += 50
            }
            this.fractionWidth = this.fraction.getBoundingClientRect().width
            this.fractionSectionWidth = this.fractionWidth/5
            this.fractionSectionCount = 5

            
        }

        handlePointerDown(e){
            if (e.target.tagName == "rect") {
                var pt = this.els.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())

                this.dragStart.x = pt.x
                this.dragStart.y = pt.y
                this.clicked = true;
            }
            if (e.target.parentNode.id == "playButton") {
                this.handlePlay()
            }
        }

        handlePlay(){
            console.log(this.fraction.childNodes)
            gsap.to(this.fraction.childNodes, { width: 30, rx: 15, ry:15, y:100, duration: 1, ease: "power3.inOut"})
        }

        handleMove(e){
            if (self.clicked) {
                let currentFractionWidth =this.fraction.getBoundingClientRect().width
                self.dragged = true;
                var pt = this.els.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())
                let scale = 1 + (this.dragStart.x - pt.x)/-300
                console.log(scale.toFixed(2))
                if ( currentFractionWidth >= this.fractionWidth + this.fractionSectionWidth){
                    gsap.set(this.fraction, {scaleX: 1})
                    let rect = document.createElementNS(this.svgns, "rect")
                    gsap.set(rect, { width:50, height:30, x:this.sectionOffset, y: 20, fill:"rgb(224, 102, 102)", fillOpacity:0, rx: 5, ry:5, stroke:"#595959"})
                    this.fraction.appendChild(rect)
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                    this.sectionOffset += 50
                    this.fractionWidth = currentFractionWidth
                    console.log(this.fractionWidth + this.fractionSectionWidth)
                    this.fractionSectionCount++;
                    console.log(this.fractionWidth, this.fractionSectionWidth, )
                }
                else if (currentFractionWidth <= this.fractionWidth - this.fractionSectionWidth){
                    gsap.set(this.fraction, {scaleX: 1})
                    this.fraction.removeChild(this.fraction.lastChild)
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                    this.sectionOffset -= 50
                    this.fractionWidth = currentFractionWidth
                    this.fractionSectionCount--;
                    console.log(this.fractionWidth, this.fractionSectionWidth)
                }
                else {
                    gsap.set(this.fraction, {scaleX: scale})
                }
            }
        }

        handlePointerUp(e){
            if (!self.dragged && e.target.tagName == "rect"){
                let element = e.target
                if (element.style.fillOpacity == 1) {
                    gsap.set(element, {fillOpacity: 0})
                }
                else {
                    gsap.set(element, {fillOpacity: 1})
                }
            }
            this.dragged=false
            this.clicked=false;
        }

        init(){
            //gsap.registerPlugin(MorphSVGPlugin)
            
            this.generateFractionBar()

            this.els.addEventListener("pointerdown", e => this.handlePointerDown(e))
            this.els.addEventListener("pointermove", e => this.handleMove(e))
            this.els.addEventListener("pointerup", e => this.handlePointerUp(e))

        }
    }
    return new fractionClass(_els);
}