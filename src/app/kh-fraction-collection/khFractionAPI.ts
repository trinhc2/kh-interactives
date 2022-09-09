import { gsap, Draggable } from "gsap/all"

export interface fractionSetup{
    backgroundImage: string
    bar: {"frame": string, "draggable": boolean, "startArray": number[], "lockY": boolean, "lockX": boolean}[]
}
export function fractionAPI(_els, _setup) {
    let self = {} as fractionClass

    class fractionCollection {
        id: number
        el: {"frame": string, "draggable": boolean, "startArray": number[], "lockY": boolean, "lockX": boolean}
        fractionid: string
        fractionGroup: SVGSVGElement
        controls: SVGSVGElement
        remove: SVGSVGElement
        dragRef: any
        fractionArray:Element[] = []
        fractionFilledInArray: number[]
        dragged = false;
        fractionX = 0;
        fractionY = 100
        fractionWidth = 250
        fractionHeight = 80
        denom = 1;
        TL = gsap.timeline()
        uiActive = false
        draggable = true
        maxSections = 12

        constructor(id, el = null) {
            this.id = id
            this.el = el

            if (this.el){
                let frameSplit = el.frame.split(" ")
                this.fractionX = parseInt(frameSplit[0])
                this.fractionY = parseInt(frameSplit[1])
                this.fractionWidth = parseInt(frameSplit[2])
                this.fractionHeight = parseInt(frameSplit[3])

                this.draggable = el.draggable || false
            }

            this.fractionFilledInArray = new Array(this.maxSections).fill(0)

            this.fractionid = "fraction" + id
            this.fractionGroup = document.createElementNS(self.svgns, "g") as SVGSVGElement
            gsap.set(this.fractionGroup, { attr: { id: this.fractionid } })
            this.init();

            self.els.addEventListener("pointerdown", e => this.handlePointerDown(e))
            self.els.addEventListener("pointerup", e => this.handlePointerUp(e))
        }

        init() {
            gsap.registerPlugin(Draggable)

            this.generateFractionCollection()

            if (this.draggable){
                this.dragRef = Draggable.create(this.fractionGroup, {
                    type: 'x, y',
                    onDragStart: () => {
                        this.dragged = true
                    },
                    liveSnap: {
                        x: function(value) {
                            //snap to the closest increment of 20.
                            return Math.round(value / 20) * 20;
                        },
                        y: function(value) {
                            //snap to the closest increment of 20.
                            return Math.round(value / 20) * 20;
                        }
                    }
                })
            }

            if (this.el){
                //initialize fraction denominator and numerator
                for (let i = 0; i < this.el.startArray.length; i++){

                    let rectWidth = this.fractionWidth / this.denom
                    for (let i = this.fractionArray.length - 1; i > this.fractionArray.length - this.denom; i--) {
                        gsap.set(this.fractionArray[i], { width: rectWidth })
                        rectWidth += (this.fractionWidth / this.denom)
                    }
                    if (this.el.startArray[i] == 1){
                        gsap.set(this.fractionArray[this.maxSections-1 - i], { fill: "rgb(224, 102, 102)" })
                        this.fractionFilledInArray[i] = 1
                    }
                    this.denom++;
                }
            }

        }

        generateFractionCollection() {
            for (let i = 0; i < this.maxSections; i++) {
                let rect = document.createElementNS(self.svgns, "rect")
                gsap.set(rect, {attr: {numerator: this.maxSections - i - 1}, width: this.fractionWidth, height: this.fractionHeight, x: this.fractionX, y: this.fractionY, fill: "rgb(255, 255, 255)", stroke: "#595959" })
                this.fractionGroup.appendChild(rect)
                this.fractionArray.push(rect)
            }

            let controls = document.getElementById("controls").cloneNode(true)
            let bbox = (document.getElementById("controls") as unknown as SVGSVGElement).getBBox()
            gsap.set(controls, { attr: {id:this.fractionid + "controls"},x: this.fractionWidth / 2 + this.fractionX - bbox.width / 2, y: this.fractionHeight + this.fractionY + 10, display: "hidden" })
            this.fractionGroup.appendChild(controls)
            this.controls = controls as SVGSVGElement

            //creating remove button
            const remove = document.createElementNS(self.svgns, "g");
            let line = document.createElementNS(self.svgns, "line")
            gsap.set(line, { attr: { x1: 0, x2: 10, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            line = document.createElementNS(self.svgns, "line")
            gsap.set(line, { attr: { x1: 10, x2: 0, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            gsap.set(remove, { attr: { id: this.fractionid + "remove" }, y: this.fractionY-4.5, x: this.fractionX-4.5, display: "none" })
            this.remove = remove as SVGSVGElement
            this.fractionGroup.appendChild(remove)
        }

        handleIncrease() {
            if (this.denom < this.maxSections) {
                this.denom++;

                let rectWidth = this.fractionWidth / this.denom
                for (let i = this.fractionArray.length - 1; i > this.fractionArray.length - this.denom; i--) {
                    gsap.to(this.fractionArray[i], { width: rectWidth })
                    rectWidth += (this.fractionWidth / this.denom)
                }
            }
        }

        handleDecrease() {
            if (this.denom > 1) {
                gsap.to(this.fractionArray[this.fractionArray.length - this.denom], { fill: "rgb(255, 255, 255)" })
                this.denom--;
                let rectWidth = this.fractionWidth / this.denom

                for (let i = this.fractionArray.length - 1; i >= this.fractionArray.length - this.denom; i--) {
                    gsap.to(this.fractionArray[i], { width: rectWidth })
                    rectWidth += this.fractionWidth / (this.denom)
                    rectWidth = Math.min(this.fractionWidth, rectWidth)
                }
            }
        }

        handlePointerDown(e) {
            if (e.target.parentNode == this.fractionGroup || e.target.parentNode.parentNode == this.fractionGroup || e.target.parentNode.parentNode == this.controls) {
                self.fractionCollectionGroup.removeChild(this.fractionGroup)
                self.fractionCollectionGroup.appendChild(this.fractionGroup)
                if (this.uiActive == false) {
                    this.controls.style.display = "block"
                    this.remove.style.display = "block"
                    this.uiActive = true
                }
                else {
                    if (e.target.parentNode.id == "increase") {
                        this.handleIncrease()
                        this.dragRef[0].disable()
                    }
                    else if (e.target.parentNode.id == "decrease") {
                        this.handleDecrease()
                        this.dragRef[0].disable()
                    }
                    else if (e.target.parentNode == this.remove) {
                        self.fractionCollectionArr.splice(this.id, 1)
                        this.fractionGroup.remove()
                    }
                }
            }
            else {
                this.controls.style.display = "none"
                this.remove.style.display = "none"
                this.uiActive = false
            }
        }

        handlePointerUp(e) {
            if (!this.dragged && e.target.tagName == "rect" && e.target.parentNode == this.fractionGroup && this.uiActive == true) {
                let element = e.target
                if (element.style.fill == "rgb(255, 255, 255)") {
                    gsap.set(element, { fill: "rgb(224, 102, 102)" })
                    this.fractionFilledInArray[element.getAttribute("numerator")] = 1
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                    this.fractionFilledInArray[element.getAttribute("numerator")] = 0
                }
                console.log(this.fractionFilledInArray)

            }
            this.dragged = false;

            if (this.dragRef){
                this.dragRef[0].enable()
            }
        }
    }

    class fractionClass {

        els: SVGSVGElement;
        setup: fractionSetup
        fractionCollectionGroup: SVGSVGElement

        svgns = "http://www.w3.org/2000/svg";
        fractionCount = 0;
        fractionCollectionArr = []

        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup
            this.fractionCollectionGroup = this.els.getElementById("fractionCollectionGroup") as SVGSVGElement

            this.init();
        }

        createPredeterminedFractions(){
            for(let i = 0; i < this.setup.bar.length; i++){
                let el = this.setup.bar[i]
                let fraction = new fractionCollection(this.fractionCount, el);

                this.fractionCollectionGroup.appendChild(fraction.fractionGroup)
                this.fractionCollectionArr[this.fractionCount++] = fraction
            }
        }

        createNewFraction(){
            let temp = new fractionCollection(this.fractionCount);
            this.fractionCollectionGroup.appendChild(temp.fractionGroup)
            this.fractionCollectionArr[this.fractionCount++] = temp
        }

        init() {
            this.createPredeterminedFractions()

            //gsap.set(this.els, {backgroundImage: this.setup.backgroundImage})
            //console.log(this.els)

            this.els.getElementById("createFraction").addEventListener("pointerdown", e => this.createNewFraction())

            /*
            this.els.addEventListener("pointerdown", e => this.handlePointerDown(e))
            this.els.addEventListener("pointermove", e => this.handleMove(e))
            this.els.addEventListener("pointerup", e => this.handlePointerUp(e))
            this.els.getElementById("increase").addEventListener("pointerdown", e => this.handleIncrease())
            this.els.getElementById("decrease").addEventListener("pointerdown", e => this.handleDecrease())

            let label = this.getLabel(16, 2, 4, false)
            gsap.set(label, { y: 100 })
            this.els.appendChild(label)
            */

        }
    }
    return new fractionClass(_els, _setup);
}