import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionCollection {
        id: number
        fractionid: string
        fractionGroup: SVGSVGElement
        controls: SVGSVGElement
        remove: SVGSVGElement
        dragRef: any
        fractionArray = []
        dragged = false;
        fractionX = 0;
        fractionY = 100
        fractionWidth = 250
        fractionHeight = 80
        denom = 1;
        TL = gsap.timeline()
        uiActive = true

        constructor(id) {
            this.id = id
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

            this.dragRef = Draggable.create(this.fractionGroup, {
                type: 'x, y',
                onDragStart: () => {
                    this.dragged = true
                },
            })

        }

        generateFractionCollection() {
            for (let i = 0; i < 12; i++) {
                let rect = document.createElementNS(self.svgns, "rect")
                gsap.set(rect, { width: this.fractionWidth, height: this.fractionHeight, x: this.fractionX, y: this.fractionY, fill: "rgb(255, 255, 255)", stroke: "#595959" })
                this.fractionGroup.appendChild(rect)
                this.fractionArray.push(rect)
            }

            let controls = document.getElementById("controls").cloneNode(true)
            let bbox = (document.getElementById("controls") as unknown as SVGSVGElement).getBBox()
            console.log(bbox)
            gsap.set(controls, { attr: {id:this.fractionid + "controls"},x: this.fractionWidth / 2 + this.fractionX - bbox.width / 2, y: this.fractionHeight + this.fractionY + 10, display: "block" })
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

            gsap.set(remove, { attr: { id: this.fractionid + "remove" }, y: 95.5, x: -4.5 })
            this.remove = remove as SVGSVGElement
            this.fractionGroup.appendChild(remove)
        }

        handleIncrease() {
            if (this.denom < 12) {
                console.log("increase")
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
                console.log("decrease")
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
            console.log(e.target.parentNode.parentNode)
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
                        console.log("remove clicked")
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
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                }

            }
            this.dragged = false;
            this.dragRef[0].enable()
        }
    }

    class fractionClass {

        els: SVGSVGElement;
        fractionCollectionGroup: SVGSVGElement

        svgns = "http://www.w3.org/2000/svg";
        fractionCount = 0;
        fractionCollectionArr = []

        constructor(els) {
            self = this
            this.els = els
            this.fractionCollectionGroup = this.els.getElementById("fractionCollectionGroup") as SVGSVGElement
            this

            this.init();
        }

        handleFractionCreate(){
            let temp = new fractionCollection(this.fractionCount);
            this.fractionCollectionGroup.appendChild(temp.fractionGroup)
            this.fractionCollectionArr[this.fractionCount++] = temp
        }

        reduceFraction(n, d) {
            const m = Math.max(n, d)
            let gcf = 1
            for (let i = 0; i < m; i++) {
                if (d % i == 0 && n % i == 0) {
                    gcf = i
                }
            }
            return { n: n / gcf, d: d / gcf }
        }


        // numerator/denominator f (font size)
        getLabel(f, num, den, reduce) {

            let n = num
            let d = den

            console.log("reduce", reduce)

            const shouldIReduce = reduce != null ? reduce : true

            console.log("shouldIReduce", shouldIReduce)

            if (shouldIReduce) {
                console.log("Reducing")
                n = this.reduceFraction(num, den).n
                d = this.reduceFraction(num, den).d
            }

            const label = document.createElementNS(this.svgns, "g");

            if (n != null) {

                const nStringLength = n.toString().length;

                let dWidth;

                const nWidth = 0.6 * nStringLength * f;
                let maxTextWidth = nWidth

                if (d) {
                    const dl = d.toString().length;
                    dWidth = 0.6 * dl * f;
                    if (n % d == 0) {
                        n = n / d;
                        d = null;
                    }
                }

                maxTextWidth = Math.max(nWidth, dWidth)

                const _n = document.createElementNS(this.svgns, "text");
                const _d = document.createElementNS(this.svgns, "text");
                const line = document.createElementNS(this.svgns, "line");

                gsap.set(_n, {
                    x: maxTextWidth / 2 - nWidth / 2,
                    y: 0,
                    textContent: n,
                    fill: "black",
                    fontFamily: "Arial",
                    fontSize: f,
                });

                if (d) {
                    gsap.set(_d, {
                        textContent: d,
                        fill: "black",
                        fontFamily: "Arial",
                        y: f,
                        fontSize: f,
                        x: maxTextWidth / 2 - dWidth / 2,
                    });
                    gsap.set(line, {
                        attr: { x1: 0, y1: f / 10, x2: maxTextWidth, y2: f / 10 },
                        strokeLinecap: "round",
                        stroke: "black",
                        fontFamily: "Arial",
                        strokeWidth: f / 10,
                    });
                    label.appendChild(_d);
                }

                label.appendChild(_n);
                label.appendChild(line);

            }

            return label;
        }

        init() {
            this.handleFractionCreate()

            this.els.getElementById("createFraction").addEventListener("pointerdown", e => this.handleFractionCreate())

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
    return new fractionClass(_els);
}