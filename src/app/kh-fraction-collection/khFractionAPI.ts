import { gsap, Draggable } from "gsap/all"

const svgns = "http://www.w3.org/2000/svg";

export interface FractionSetup {
    backgroundImage: string
    snapTo: string
    bar: { "frame": string, "draggable": boolean, "startArray": number[], "lockY": boolean, "lockX": boolean, "controls": string, "maxDenom": number }[]
}

    class FractionCollection {
        private id: number
        private setup: { "frame": string, "draggable": boolean, "startArray": number[], "lockY": boolean, "lockX": boolean, "controls": string, "maxDenom": number }
        private fractionClass: FractionClass
        private fractionid: string
        public fractionGroup: SVGSVGElement
        private controlsElement: SVGSVGElement
        private remove: SVGSVGElement
        private dragRef: any
        private fractionArray: Element[] = []
        private fractionFilledInArray: number[]
        private dragged = false;
        private fractionX = 0;
        private fractionY = 100
        private fractionWidth = 250
        private fractionHeight = 80
        private denom = 1;
        private timeline = gsap.timeline()
        private uiActive = false
        private draggable = true
        private maxDenom = 12
        private lockX = false
        private lockY = false
        private controls = "bottom"

        public constructor(fractionClass: FractionClass, id: number, setup = null) {
            this.id = id
            this.setup = setup
            this.fractionClass = fractionClass

            if (this.setup) {
                let frameSplit = setup.frame.split(" ")
                this.fractionX = parseInt(frameSplit[0])
                this.fractionY = parseInt(frameSplit[1])
                this.fractionWidth = parseInt(frameSplit[2])
                this.fractionHeight = parseInt(frameSplit[3])

                this.draggable = setup.draggable || false

                this.lockX = setup.lockX || false
                this.lockY = setup.lockY || false
                this.controls = setup.controls || "bottom"

                this.maxDenom = setup.maxDenom || 12
            }

            this.fractionFilledInArray = new Array(this.maxDenom).fill(0)

            this.fractionid = "fraction" + id
            this.fractionGroup = document.createElementNS(svgns, "g") as SVGSVGElement
            gsap.set(this.fractionGroup, { attr: { id: this.fractionid } })
            this.init();

            this.fractionClass.gsvg.addEventListener("pointerdown", (e: PointerEvent) => this.handlePointerDown(e))
            this.fractionClass.gsvg.addEventListener("pointerup", (e: PointerEvent) => this.handlePointerUp(e))
        }

        private init(): void {
            gsap.registerPlugin(Draggable)

            let self = this

            this.generateFractionCollection()

            if (this.draggable) {
                console.log("test")

                let lock;
                if (this.lockY) {
                    lock = 'y'
                }
                else if (this.lockX) {
                    lock = 'x'
                }
                else {
                    lock = 'x, y'
                }
                this.dragRef = Draggable.create(this.fractionGroup, {
                    type: lock,
                    onDragStart: () => {
                        this.dragged = true
                    },
                    liveSnap: {
                        x: function (value) {
                            let increment = parseInt(self.fractionClass.setup.snapTo.split(" ")[0])
                            //snap to the closest increment of 20.
                            return Math.round(value / increment) * increment;
                        },
                        y: function (value) {
                            let increment = parseInt(self.fractionClass.setup.snapTo.split(" ")[1])
                            //snap to the closest increment of 20.
                            return Math.round(value / increment) * increment;
                        }
                    }
                })
            }

            if (this.setup) {
                //initialize fraction denominator and numerator
                for (let i = 0; i < this.setup.startArray.length; i++) {

                    let rectWidth = this.fractionWidth / this.denom
                    for (let i = this.fractionArray.length - 1; i > this.fractionArray.length - this.denom; i--) {
                        gsap.set(this.fractionArray[i], { width: rectWidth })
                        rectWidth += (this.fractionWidth / this.denom)
                    }
                    if (this.setup.startArray[i] == 1) {
                        gsap.set(this.fractionArray[this.maxDenom - 1 - i], { fill: "rgb(224, 102, 102)" })
                        this.fractionFilledInArray[i] = 1
                    }
                    this.denom++;
                }
            }

        }

        private setElementPosition(element: Node, x: number, y: number): void {
            gsap.set(element, { attr: { id: this.fractionid + "controls" }, x: x, y: y, display: "hidden" })
        }

        private generateFractionCollection(): void {
            for (let i = 0; i < this.maxDenom; i++) {
                let rect = document.createElementNS(svgns, "rect")
                gsap.set(rect, { attr: { numerator: this.maxDenom - i - 1 }, width: this.fractionWidth, height: this.fractionHeight, x: this.fractionX, y: this.fractionY, fill: "rgb(255, 255, 255)", stroke: "#595959" })
                this.fractionGroup.appendChild(rect)
                this.fractionArray.push(rect)
            }

            let controlEl = this.fractionClass.gsvg.getElementById("controls").cloneNode(true)
            let bbox = (this.fractionClass.gsvg.getElementById("controls") as unknown as SVGSVGElement).getBBox()

            if (this.controls == "left") {
                gsap.set(controlEl, { rotation: 90, transformOrigin: "center" })
                this.setElementPosition(controlEl, this.fractionX - bbox.width + 20, this.fractionY + bbox.height + this.fractionHeight / 2 - bbox.width / 2)
                gsap.set(controlEl.childNodes[1], { rotation: 90, transformOrigin: "center" })
            }
            else if (this.controls == "right") {
                gsap.set(controlEl, { rotation: 90, transformOrigin: "center" })
                this.setElementPosition(controlEl, this.fractionWidth - 20, this.fractionY + bbox.height + this.fractionHeight / 2 - bbox.width / 2)
                gsap.set(controlEl.childNodes[1], { rotation: 90, transformOrigin: "center" })
            }
            else if (this.controls == "top") {
                this.setElementPosition(controlEl, this.fractionWidth / 2 + this.fractionX - bbox.width / 2, this.fractionY - bbox.height - 20)
            }
            else {
                this.setElementPosition(controlEl, this.fractionWidth / 2 + this.fractionX - bbox.width / 2, this.fractionHeight + this.fractionY + 20)
            }
            this.fractionGroup.appendChild(controlEl)
            this.controlsElement = controlEl as SVGSVGElement

            //creating remove button
            const remove = document.createElementNS(svgns, "g");
            let line = document.createElementNS(svgns, "line")
            gsap.set(line, { attr: { x1: 0, x2: 10, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            line = document.createElementNS(svgns, "line")
            gsap.set(line, { attr: { x1: 10, x2: 0, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            gsap.set(remove, { attr: { id: this.fractionid + "remove" }, y: this.fractionY - 4.5, x: this.fractionX - 4.5, display: "none" })
            this.remove = remove as SVGSVGElement
            this.fractionGroup.appendChild(remove)
        }

        private handleIncrease(): void {
            if (this.denom < this.maxDenom) {
                this.denom++;

                let rectWidth = this.fractionWidth / this.denom
                for (let i = this.fractionArray.length - 1; i > this.fractionArray.length - this.denom; i--) {
                    gsap.to(this.fractionArray[i], { width: rectWidth })
                    rectWidth += (this.fractionWidth / this.denom)
                }
            }
        }

        private handleDecrease(): void {
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

        private handlePointerDown(e: PointerEvent): void {
            let element = e.target as HTMLElement
            if (element.parentNode == this.fractionGroup || element.parentNode.parentNode == this.fractionGroup || element.parentNode.parentNode == this.controlsElement) {
                this.fractionClass.fractionCollectionGroup.removeChild(this.fractionGroup)
                this.fractionClass.fractionCollectionGroup.appendChild(this.fractionGroup)
                if (this.uiActive == false) {
                    this.controlsElement.style.display = "block"
                    this.remove.style.display = "block"
                    this.uiActive = true
                }
                else {
                    if ((element.parentNode as SVGSVGElement).id == "increase") {
                        this.handleIncrease()
                        this.dragRef[0].disable()
                    }
                    else if ((element.parentNode as SVGSVGElement).id == "decrease") {
                        this.handleDecrease()
                        this.dragRef[0].disable()
                    }
                    else if (element.parentNode == this.remove) {
                        this.fractionClass.fractionCollectionArr.splice(this.id, 1)
                        this.fractionGroup.remove()
                    }
                }
            }
            else {
                this.controlsElement.style.display = "none"
                this.remove.style.display = "none"
                this.uiActive = false
            }
        }

        private handlePointerUp(e: PointerEvent): void {
            let element = e.target as SVGSVGElement
            if (!this.dragged && element.tagName == "rect" && element.parentNode == this.fractionGroup && this.uiActive == true) {
                if (element.style.fill == "rgb(255, 255, 255)") {
                    gsap.set(element, { fill: "rgb(224, 102, 102)" })
                    this.fractionFilledInArray[element.getAttribute("numerator")] = 1
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                    this.fractionFilledInArray[element.getAttribute("numerator")] = 0
                }

            }
            this.dragged = false;

            if (this.dragRef) {
                this.dragRef[0].enable()
            }
        }
    }

    export class FractionClass {

        public gsvg: SVGSVGElement;
        public setup: FractionSetup
        public fractionCollectionGroup: SVGSVGElement

        private fractionCount = 0;
        public fractionCollectionArr = []

        public constructor(els: SVGSVGElement, setup: FractionSetup) {
            this.gsvg = els
            this.setup = setup
            this.fractionCollectionGroup = this.gsvg.getElementById("fractionCollectionGroup") as SVGSVGElement

            this.init();
        }

        private createPredeterminedFractions(): void {
            for (let i = 0; i < this.setup.bar.length; i++) {
                let el = this.setup.bar[i]
                let fraction = new FractionCollection(this, this.fractionCount, el);

                this.fractionCollectionGroup.appendChild(fraction.fractionGroup)
                this.fractionCollectionArr[this.fractionCount++] = fraction
            }
        }

        private createNewFraction(): void {
            let temp = new FractionCollection(this, this.fractionCount);
            this.fractionCollectionGroup.appendChild(temp.fractionGroup)
            this.fractionCollectionArr[this.fractionCount++] = temp
        }

        private init(): void {
            this.createPredeterminedFractions()

            //gsap.set(this.gsvg, {backgroundImage: this.setup.backgroundImage})

            this.gsvg.getElementById("createFraction").addEventListener("pointerdown", () => this.createNewFraction())

        }
    }