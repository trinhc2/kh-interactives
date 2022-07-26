import { ComponentFactoryResolver } from "@angular/core";
import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionClass {

        els: SVGSVGElement;
        fractionDrag: SVGSVGElement
        fractionComparison: SVGSVGElement
        lastFraction: SVGSVGElement
        lastSelected = false;
        svgns = "http://www.w3.org/2000/svg";
        dragged = false;
        clicked = false;
        dragStart = { x: 0, y: 0 }
        sectionOffset = 20;
        fractionY = 100
        denom = 1;
        TL = gsap.timeline()
        fractionRectWidth = 50
        fractionRectHeight = 30




        constructor(els) {
            self = this
            this.els = els
            this.fractionDrag = this.els.getElementById("fractionDrag") as SVGSVGElement
            this.fractionComparison = this.els.getElementById("fractionComparison") as SVGSVGElement

            this.init();
        }

        generateFractionBar() {

            for (let i = 0; i < 3; i++) {
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                this.fractionDrag.appendChild(rect)
                this.sectionOffset += this.fractionRectWidth
            }

            let rect = document.createElementNS(this.svgns, "rect")
            gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
            this.fractionDrag.appendChild(rect)
            this.sectionOffset += this.fractionRectWidth
            this.lastFraction = rect as SVGSVGElement


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
                if (e.target == this.lastFraction) {
                    this.lastSelected = true;
                }
            }
            if (e.target.parentNode.id == "playButton") {
                this.handlePlay()
            }
        }

        handlePlay() {
            gsap.to(this.fractionDrag.childNodes, { width: this.fractionRectHeight, rx: 15, ry: 15, y: 150, duration: 1, ease: "power3.inOut" })
        }

        handleMove(e) {
            if (self.clicked) {
                self.dragged = true;
                var pt = this.els.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                if (this.lastSelected) {
                    let rectWidth = (this.dragStart.x - pt.x) / -1.5
                    //console.log(rectWidth)
                    if (rectWidth > 0) {
                        console.log("pos clause")
                        if (this.lastFraction.getBBox().width < this.fractionRectWidth) {
                            gsap.set(this.lastFraction, { width: Math.min(rectWidth,this.fractionRectWidth) })
                        }
                        else {
                            let rect = document.createElementNS(this.svgns, "rect")
                            this.lastFraction = rect as SVGSVGElement
                            gsap.set(this.lastFraction, { width: 0, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                            this.fractionDrag.appendChild(this.lastFraction)
                            this.dragStart.x = pt.x
                            this.dragStart.y = pt.y
                            this.sectionOffset += this.fractionRectWidth
                        }

                    }
                    else {
                        console.log("else clause")
                        if (this.lastFraction.getBBox().width > 1) {
                            gsap.set(this.lastFraction, { width: Math.max(this.fractionRectWidth + rectWidth, 0) })
                        }
                        else {
                            this.dragStart.x = pt.x
                            this.dragStart.y = pt.y
                            if (this.lastFraction != this.fractionDrag.firstChild) {
                                this.sectionOffset -= this.fractionRectWidth
                                this.lastFraction.remove();
                                this.lastFraction = this.fractionDrag.lastChild as SVGSVGElement
                            }
                        }
                    }
                }
                else {
                    let bbox = this.lastFraction.getBoundingClientRect()
                    let temp = (this.dragStart.x - pt.x) / -300
                    if (Math.round(bbox.width) >= Math.round(bbox.height)) {
                        gsap.set(this.fractionDrag, { scaleX: `+=${temp}` })
                        this.dragStart.x = e.clientX
                        this.dragStart.y = e.clientY
                    }
                    else if (temp > 0) {
                        gsap.set(this.fractionDrag, { scaleX: `+=${temp}` })
                        this.dragStart.x = e.clientX
                        this.dragStart.y = e.clientY
                    }
                }
            }
        }

        handlePointerUp(e) {
            if (!self.dragged && e.target.tagName == "rect") {
                let element = e.target
                if (element.style.fill == "rgb(255, 255, 255)") {
                    gsap.set(element, { fill: "rgb(224, 102, 102)" })
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                }

            }
            else if (this.dragged) {
                this.dragged = false
                if (this.lastFraction.getBBox().width < this.fractionRectWidth) {
                    console.log(this.lastFraction.getBBox().width)
                    gsap.set(this.lastFraction, { width: this.fractionRectWidth })
                }
            }
            this.clicked = false;
            this.lastSelected = false;
        }

        handleIncrease() {
            if (this.denom < 12) {
                console.log("increase")
                this.denom++;
                let arr = Array.from(this.fractionComparison.childNodes)

                let rectWidth = 250 / this.denom
                for (let i = arr.length - 1; i > arr.length - this.denom; i--) {
                    gsap.to(arr[i], { width: rectWidth })
                    rectWidth += (250 / this.denom)
                }
            }
        }

        handleDecrease() {

            if (this.denom > 1) {
                console.log("decrease")
                let arr = Array.from(this.fractionComparison.childNodes)
                gsap.to(arr[arr.length - this.denom], { fill: "rgb(255, 255, 255)" })
                this.denom--;
                let rectWidth = 250 / this.denom

                for (let i = arr.length - 1; i >= arr.length - this.denom; i--) {
                    gsap.to(arr[i], { width: rectWidth })
                    rectWidth += 250 / (this.denom)
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

        generateFractionComparison() {
            for (let i = 0; i < 12; i++) {
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width: 250, height: 90, x: 20, y: 200, fill: "rgb(255, 255, 255)", stroke: "#595959" })
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