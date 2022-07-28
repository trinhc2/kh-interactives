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
        oldX = 0
        dragRef: any




        constructor(els) {
            self = this
            this.els = els
            this.fractionDrag = this.els.getElementById("fractionDrag") as SVGSVGElement
            this.fractionComparison = this.els.getElementById("fractionComparison") as SVGSVGElement
            

            this.init();
        }

        generateFractionBar() {

            const label = document.createElementNS(this.svgns, "g");

            let line = document.createElementNS(this.svgns, "line")
            gsap.set(line, {attr: {y1: 80, y2:105, stroke: "rgb(224, 102, 102)"}, strokeWidth: 2})
            label.appendChild(line)

            let circle = document.createElementNS(this.svgns, "circle")
            gsap.set(circle, {cy:80, r:10, fill: "rgb(224, 102, 102)"})
            label.appendChild(circle)

            gsap.set(label, {attr: {id: "scale"}, x:this.sectionOffset+this.fractionRectWidth})
            this.fractionDrag.appendChild(label)

            
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

            line = document.createElementNS(this.svgns, "line")
            gsap.set(line, {attr: {id: "modifier", x1: this.sectionOffset, x2: this.sectionOffset, y1: 100, y2:130, stroke: "#595959"}, strokeWidth: 6, strokeOpacity:0.75, strokeLinecap: "round", cursor: "pointer"})
            this.fractionDrag.appendChild(line)


        }

        handlePointerDown(e) {
            console.log(e.target, e.target.parentNode)
            var pt = this.els.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())
            console.log(pt)

            this.dragStart.x = pt.x
            this.dragStart.y = pt.y
            this.oldX = pt.x
            if (e.target == this.lastFraction || e.target.id == "modifier") {
                this.lastSelected = true;
                this.clicked = true;
                this.dragRef[0].disable()
            }

            if (e.target.parentNode.id == "scale") {
                this.clicked = true;
                this.dragRef[0].disable()
            }

            if (e.target.parentNode.id == "playButton") {
                this.handlePlay()
            }
        }

        handlePlay() {
            gsap.to(gsap.utils.toArray("rect", this.fractionDrag), { width: this.fractionRectHeight, rx: 15, ry: 15, y: 150, duration: 1, ease: "power3.inOut" })
        }

        handleMove(e) {
            if (self.clicked) {
                self.dragged = true;
                var pt = this.els.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())
                //let rectWidth = (pt.x - this.dragStart.x)
                //console.log(this.lastFraction.getBBox().width + (pt.x - this.oldX))
                if (this.lastSelected) {
                    let rectWidth = this.lastFraction.getBBox().width + (pt.x - this.oldX)
                    //rectWidth += (pt.x - this.oldX)
                    //console.log(rectWidth)
                    if ((pt.x - this.oldX) > 0) {
                        //console.log("right", this.lastFraction.getBBox().width, rectWidth)
                        if (this.lastFraction.getBBox().width >= this.fractionRectWidth - 3) {
                            gsap.set(this.lastFraction, { width: this.fractionRectWidth })

                            let rect = document.createElementNS(this.svgns, "rect")
                            this.lastFraction = rect as SVGSVGElement
                            gsap.set(this.lastFraction, { width: 0, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                            this.fractionDrag.appendChild(this.lastFraction)
                            this.sectionOffset += this.fractionRectWidth
                            this.dragStart.x = pt.x
                            this.dragStart.y = pt.y
                        }
                        else {
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.els.getElementById("modifier"), {attr: {x1: this.sectionOffset + rectWidth - 50, x2:this.sectionOffset+ rectWidth - 50}})
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionDrag)[0]) {
                                gsap.set(this.els.getElementById("scale"), {x: this.lastFraction.getBBox().width + 20})
                            }
                        }

                    }
                    else if ((pt.x - this.oldX) < 0) {
                        //console.log("left", this.lastFraction.getBBox().width, rectWidth)
                        if (this.lastFraction.getBBox().width <= 3) {
                            if (this.lastFraction != gsap.utils.toArray("rect", this.fractionDrag)[0]) {
                                this.sectionOffset -= this.fractionRectWidth
                                this.lastFraction.remove();
                                this.lastFraction = gsap.utils.toArray("rect", this.fractionDrag).at(-1) as SVGSVGElement
                                this.dragStart.x = pt.x
                                this.dragStart.y = pt.y
                            }
                        }
                        else {
                            //console.log("else")
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.els.getElementById("modifier"), {attr: {x1: this.sectionOffset + rectWidth - 50, x2:this.sectionOffset + rectWidth - 50}})
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionDrag)[0]) {
                                gsap.set(this.els.getElementById("scale"), {x: this.lastFraction.getBBox().width + 20})
                            }
                        }
                    }
                }
                else {
                    //console.log("else")
                    let bbox = this.lastFraction.getBBox()
                    let temp = (pt.x - this.dragStart.x) / 1.1
                    if (bbox.width + temp >= Math.round(bbox.height)) {
                        this.sectionOffset = 20
                        let arr = gsap.utils.toArray("rect", this.fractionDrag)
                        console.log(arr)
                        //console.log("loop")
                        gsap.set(this.els.getElementById("scale"), {x: this.sectionOffset + temp + bbox.width})
                        for (let i = 0; i < arr.length; i++){
                            //console.log("loop", temp)
                            gsap.set(arr[i], {width: `+=${temp}`, x:this.sectionOffset})
                            this.sectionOffset += bbox.width + temp
                        }
                        console.log("mod", this.els.getElementById("modifier"))
                        gsap.set(this.els.getElementById("modifier"), {attr: {x1: this.sectionOffset, x2:this.sectionOffset}})
                    }
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                }
                this.oldX = pt.x
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
                if (this.lastFraction.getBBox().width < this.fractionRectWidth && this.lastSelected) {
                    console.log(this.lastFraction.getBBox().width)
                    gsap.set(this.lastFraction, { width: this.fractionRectWidth })
                    this.lastSelected = false;
                    gsap.set(this.els.getElementById("modifier"), {attr: {x1: this.sectionOffset, x2:this.sectionOffset}})
                }
                
                this.fractionRectWidth = this.lastFraction.getBBox().width
                if (this.lastFraction == gsap.utils.toArray("rect", this.fractionDrag)[0]) {
                    console.log("true")
                    gsap.set(this.els.getElementById("scale"), {x: this.lastFraction.getBBox().width + 20})
                }
                this.dragRef[0].enable()
            }
            this.clicked = false;
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
            gsap.registerPlugin(Draggable)

            this.generateFractionBar()

            this.dragRef = Draggable.create(this.fractionDrag, {
                type: 'x, y',
                onDragStart: function() {
                    self.dragged = true
                },
                onRelease: function() {
                    self.dragged = false
                }
            })

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