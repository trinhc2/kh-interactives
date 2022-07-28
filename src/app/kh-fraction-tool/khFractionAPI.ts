import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionDrag {
        id: String
        fractionGroup: SVGSVGElement
        lastFraction: SVGSVGElement
        modifier: SVGSVGElement
        scale: SVGSVGElement
        lastSelected = false;
        svgns = "http://www.w3.org/2000/svg";
        dragged = false;
        fractionClicked = false;
        dragStart = { x: 0, y: 0 }
        sectionOffset = 20;
        fractionY = 100
        TL = gsap.timeline()
        fractionRectWidth = 50
        fractionRectHeight = 30
        oldX = 0
        dragRef: any

        constructor(id) {
            this.id = "fraction"+id
            this.fractionGroup = document.createElementNS(this.svgns, "g") as SVGSVGElement
            gsap.set(this.fractionGroup, {attr:{id: this.id}})
            this.init();
        }

        init() {
            gsap.registerPlugin(Draggable)

            this.generateFractionBar()

            
            this.dragRef = Draggable.create(this.fractionGroup, {
                type: 'x, y',
                onDragStart: () => {
                    this.dragged = true
                },
            })

            
            self.els.addEventListener("pointerdown", e => this.handlePointerDown(e))
            self.els.addEventListener("pointermove", e => this.handleMove(e))
            self.els.addEventListener("pointerup", e => this.handlePointerUp(e))
            

        }
        generateFractionBar() {

            //creating scaling visual
            const label = document.createElementNS(this.svgns, "g");

            let line = document.createElementNS(this.svgns, "line")
            gsap.set(line, { attr: { y1: 80, y2: 105, stroke: "rgb(224, 102, 102)" }, strokeWidth: 2 })
            label.appendChild(line)

            let circle = document.createElementNS(this.svgns, "circle")
            gsap.set(circle, { cy: 80, r: 10, fill: "rgb(224, 102, 102)" })
            label.appendChild(circle)

            gsap.set(label, { attr: { id: this.id+"scale" }, x: this.sectionOffset + this.fractionRectWidth })
            this.fractionGroup.appendChild(label)
            this.scale = label as SVGSVGElement

            //creating fraction modifier visual to be set after
            line = document.createElementNS(this.svgns, "line")
            this.modifier = line as SVGSVGElement
            this.fractionGroup.appendChild(line)

            //creating fractions
            for (let i = 0; i < 3; i++) {
                let rect = document.createElementNS(this.svgns, "rect")
                gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                this.fractionGroup.appendChild(rect)
                this.sectionOffset += this.fractionRectWidth
            }

            //creating fraction after loop to be set as the last fraction
            let rect = document.createElementNS(this.svgns, "rect")
            gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
            this.fractionGroup.appendChild(rect)
            this.sectionOffset += this.fractionRectWidth
            this.lastFraction = rect as SVGSVGElement

            gsap.set(line, { attr: { id: this.id+"modifier", x1: this.sectionOffset, x2: this.sectionOffset, y1: 100, y2: 130, stroke: "#595959" }, strokeWidth: 6, strokeOpacity: 0.75, strokeLinecap: "round", cursor: "pointer" })

        }

        handlePointerDown(e) {
            var pt = {x: 0, y:0}
            pt.x = e.clientX
            pt.y = e.clientY
            //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())

            this.dragStart.x = pt.x
            this.dragStart.y = pt.y
            this.oldX = pt.x
            if (e.target == this.lastFraction || e.target == this.modifier) {
                console.log("down2")
                this.lastSelected = true;
                this.fractionClicked = true;
                this.dragRef[0].disable()//disable drag
            }

            if (e.target.parentNode == this.scale) {
                this.fractionClicked = true;
                this.dragRef[0].disable()//disable drag
            }
        }

        handleMove(e) {
            if (this.fractionClicked) {
                this.dragged = true;
                var pt = {x: 0, y:0}
                pt.x = e.clientX
                pt.y = e.clientY
                console.log(pt)
                //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())
                //let rectWidth = (pt.x - this.dragStart.x)

                //if the last fraction is selected
                if (this.lastSelected) {
                    let rectWidth = this.lastFraction.getBBox().width + (pt.x - this.oldX)
                    //rectWidth += (pt.x - this.oldX)

                    if ((pt.x - this.oldX) > 0) {

                        //if we have completed a full fraction create a new section and update last fraction
                        if (this.lastFraction.getBBox().width >= this.fractionRectWidth - 3) {
                            gsap.set(this.lastFraction, { width: this.fractionRectWidth })

                            let rect = document.createElementNS(this.svgns, "rect")
                            this.lastFraction = rect as SVGSVGElement
                            gsap.set(this.lastFraction, { width: 0, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                            this.fractionGroup.appendChild(this.lastFraction)
                            this.sectionOffset += this.fractionRectWidth
                            this.dragStart.x = pt.x
                            this.dragStart.y = pt.y
                        }
                        //else update last fractions width, modifier and scale visuals
                        else {
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.modifier, { attr: { x1: this.sectionOffset + rectWidth - this.fractionRectWidth, x2: this.sectionOffset + rectWidth - this.fractionRectWidth } })

                            //if the last fraction is the first fraction, move the scale visual
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                gsap.set(this.scale, { x: this.lastFraction.getBBox().width + 20 })
                            }
                        }

                    }
                    else if ((pt.x - this.oldX) < 0) {
                        //if we have removed a full fraction, remove that fraction and update last fraction
                        if (this.lastFraction.getBBox().width <= 3) {
                            if (this.lastFraction != gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                this.sectionOffset -= this.fractionRectWidth
                                this.lastFraction.remove();
                                this.lastFraction = gsap.utils.toArray("rect", this.fractionGroup).at(-1)
                                this.dragStart.x = pt.x
                                this.dragStart.y = pt.y
                            }
                        }
                        //else update last fraction's width, modifier and scale visuals
                        else {
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.modifier, { attr: { x1: this.sectionOffset + rectWidth - this.fractionRectWidth, x2: this.sectionOffset + rectWidth - this.fractionRectWidth } })

                            //if the last fraction is the first fraction, move the scale visual
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                gsap.set(this.scale, { x: this.lastFraction.getBBox().width + 20 })
                            }
                        }
                    }
                }
                //else we are modifying the scale of the entire fraction
                else {
                    let bbox = this.lastFraction.getBBox()
                    let temp = (pt.x - this.dragStart.x) / 1.1

                    //if the section width is greater than the section height we can update the scale
                    if (bbox.width + temp >= Math.round(bbox.height)) {
                        this.sectionOffset = 20
                        let arr = gsap.utils.toArray("rect", this.fractionGroup)
                        gsap.set(this.scale, { x: this.sectionOffset + temp + bbox.width })

                        for (let i = 0; i < arr.length; i++) {
                            gsap.set(arr[i], { width: `+=${temp}`, x: this.sectionOffset })
                            this.sectionOffset += bbox.width + temp
                        }

                        gsap.set(this.modifier, { attr: { x1: this.sectionOffset, x2: this.sectionOffset } })
                    }
                    this.dragStart.x = pt.x
                    this.dragStart.y = pt.y
                }
                this.oldX = pt.x
            }
        }

        handlePointerUp(e) {
            //if dragged is not set then that means the user just clicked on a section -> update color
            if (!this.dragged && e.target.tagName == "rect" && e.target.parentNode == this.fractionGroup) {
                console.log("color change", e.target, e.target.parentNode)
                //console.log("color change", this)
                let element = e.target
                if (element.style.fill == "rgb(255, 255, 255)") {
                    gsap.set(element, { fill: "rgb(224, 102, 102)" })
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                }

            }
            //if dragged is set then the fraction has been changed
            else if (this.dragged) {
                //if the last fraction isn't complete then complete it and update the modifier to align
                if (this.lastFraction.getBBox().width < this.fractionRectWidth && this.lastSelected) {
                    console.log(this.lastFraction.getBBox().width)
                    gsap.set(this.lastFraction, { width: this.fractionRectWidth })
                    gsap.set(this.modifier, { attr: { x1: this.sectionOffset, x2: this.sectionOffset } })
                }

                this.fractionRectWidth = this.lastFraction.getBBox().width
                //if the last fraction is the first fraction we also have to move the scale visual
                if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                    console.log("true")
                    gsap.set(this.scale, { x: this.lastFraction.getBBox().width + 20 })
                }
            }
            this.fractionClicked = false;
            this.lastSelected = false;
            this.dragged = false
            this.dragRef[0].enable()
            
        }
    }

    

    class fractionClass {

        els: SVGSVGElement;
        fractionDrag: SVGSVGElement
        fractionComparison: SVGSVGElement

        svgns = "http://www.w3.org/2000/svg";

        denom = 1;
        TL = gsap.timeline()

        fractionCount = 0




        constructor(els) {
            self = this
            this.els = els
            this.fractionDrag = this.els.getElementById("fractionDrag") as SVGSVGElement
            this.fractionComparison = this.els.getElementById("fractionComparison") as SVGSVGElement


            this.init();
        }

        generateFractionBar() {

            let temp = new fractionDrag(this.fractionCount++);
            this.fractionDrag.appendChild(temp.fractionGroup)

        }

        handlePlay() {
            //gsap.to(gsap.utils.toArray("rect", this.fractionDrag), { width: this.fractionRectHeight, rx: 15, ry: 15, y: 150, duration: 1, ease: "power3.inOut" })
            let temp = new fractionDrag(this.fractionCount++);
            this.fractionDrag.appendChild(temp.fractionGroup)
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

            let text = document.createElementNS(this.svgns, "text");
            gsap.set(text, {
                textContent: "press play to add more fractions",
                fill: "black",
                fontFamily: "Arial",
                y: 20,
                fontSize: 11,
                x: 20
            });
            this.els.appendChild(text)

            this.els.getElementById("playButton").addEventListener("pointerdown", e => this.handlePlay())
            /*
            this.dragRef = Draggable.create(this.fractionDrag, {
                type: 'x, y',
                onDragStart: function () {
                    self.dragged = true
                },
                onRelease: function () {
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
            */

        }
    }
    return new fractionClass(_els);
}