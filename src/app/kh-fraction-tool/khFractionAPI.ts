import { ComponentFactoryResolver } from "@angular/core";
import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionClass {

        els: SVGSVGElement;
        fractionDrag: SVGSVGElement
        fractionComparison: SVGSVGElement
        svgns = "http://www.w3.org/2000/svg";
        dragged = false;
        clicked = false;
        dragStart = { x: 0, y: 0 }
        sectionOffset = 20;
        fractionY = 100
        fractionWidth: number
        fractionSectionWidth: number
        fractionSectionCount: number
        denom = 1;
        TL = gsap.timeline()




        constructor(els) {
            self = this
            this.els = els
            this.fractionDrag = this.els.getElementById("fractionDrag") as SVGSVGElement
            this.fractionComparison = this.els.getElementById("fractionComparison") as SVGSVGElement

            this.init();
        }

        generateFractionBar() {

            for (let i = 0; i < 5; i++) {
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width: "50px", height: 30, x: this.sectionOffset, y: this.fractionY, fill: "rgb(224, 102, 102)", fillOpacity: 0, rx: 5, ry: 5, stroke: "#595959" })
                this.fractionDrag.appendChild(rect)
                this.sectionOffset += 50
            }
            this.fractionWidth = this.fractionDrag.getBoundingClientRect().width
            this.fractionSectionWidth = this.fractionWidth / 5
            this.fractionSectionCount = 5


        }

        handlePointerDown(e) {
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

        handlePlay() {
            console.log(this.fractionDrag.childNodes)
            gsap.to(this.fractionDrag.childNodes, { width: 30, rx: 15, ry: 15, y: 200, duration: 1, ease: "power3.inOut" })
        }

        handleMove(e) {
            if (self.clicked) {
                let currentFractionWidth = this.fractionDrag.getBoundingClientRect().width
                self.dragged = true;
                var pt = this.els.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY

                let scale = 1 + (this.dragStart.x - pt.x) / -300
                console.log(scale.toFixed(2))
                if (currentFractionWidth >= this.fractionWidth + this.fractionSectionWidth) {
                    gsap.set(this.fractionDrag, { scaleX: 1 })
                    let rect = document.createElementNS(this.svgns, "rect")
                    gsap.set(rect, { width: 50, height: 30, x: this.sectionOffset, y: this.fractionY, fill: "rgb(224, 102, 102)", fillOpacity: 0, rx: 5, ry: 5, stroke: "#595959" })
                    this.fractionDrag.appendChild(rect)
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                    this.sectionOffset += 50
                    this.fractionWidth = currentFractionWidth
                    console.log(this.fractionWidth + this.fractionSectionWidth)
                    this.fractionSectionCount++;
                    console.log(this.fractionWidth, this.fractionSectionWidth,)
                }
                else if (currentFractionWidth <= this.fractionWidth - this.fractionSectionWidth) {
                    gsap.set(this.fractionDrag, { scaleX: 1 })
                    this.fractionDrag.removeChild(this.fractionDrag.lastChild)
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                    this.sectionOffset -= 50
                    this.fractionWidth = currentFractionWidth
                    this.fractionSectionCount--;
                    console.log(this.fractionWidth, this.fractionSectionWidth)
                }
                else {
                    gsap.set(this.fractionDrag, { scaleX: scale })
                }
            }
        }

        handlePointerUp(e) {
            if (!self.dragged && e.target.tagName == "rect") {
                let element = e.target
                if (element.style.fillOpacity == 1) {
                    gsap.set(element, { fillOpacity: 0 })
                }
                else {
                    gsap.set(element, { fillOpacity: 1 })
                }
            }
            this.dragged = false
            this.clicked = false;
        }

        handleIncrease() {
            if (this.denom < 12) {
                console.log("increase")
                this.denom++;
                let arr = Array.from(this.fractionComparison.childNodes)
            
                let rectWidth = 250 / this.denom
                for (let i = arr.length-1; i > arr.length - this.denom; i--){
                    gsap.to(arr[i], {width: rectWidth})
                    rectWidth += (250 / this.denom)
                }
            }
        }

        handleDecrease() {

            if (this.denom > 1) {
                console.log("decrease")
                let arr = Array.from(this.fractionComparison.childNodes)
                this.denom--;
                let rectWidth = 250/this.denom

                for (let i = arr.length-1; i >= arr.length - this.denom; i--){
                    gsap.to(arr[i], {width: rectWidth})
                    rectWidth += 250/(this.denom)
                    rectWidth = Math.min(250, rectWidth)
                }
            }
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

        generateFractionComparison(){
            for (let i = 0; i < 12; i++){
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width: 250, height: 90, x: 20, y: 200, fill: "rgb(224, 102, 102)", fillOpacity: 0, stroke: "#595959" })
                this.fractionComparison.appendChild(rect)
            }
        }

        init() {
            //gsap.registerPlugin(MorphSVGPlugin)

            this.generateFractionBar()
            this.generateFractionComparison()

            this.els.addEventListener("pointerdown", e => this.handlePointerDown(e))
            this.els.addEventListener("pointermove", e => this.handleMove(e))
            this.els.addEventListener("pointerup", e => this.handlePointerUp(e))
            this.els.getElementById("increase").addEventListener("pointerdown", e => this.handleIncrease())
            this.els.getElementById("decrease").addEventListener("pointerdown", e => this.handleDecrease())

            let label = this.getLabel(16, 2, 4, false)
            gsap.set(label, { y: 100 })
            this.els.appendChild(label)

        }
    }
    return new fractionClass(_els);
}