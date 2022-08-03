import { gsap, Draggable } from "gsap/all"

export function fractionAPI(_els) {
    let self = {} as fractionClass

    class fractionDrag {
        id: number
        fractionid: String
        fractionGroup: SVGSVGElement
        lastFraction: SVGSVGElement
        modifier: SVGSVGElement
        scale: SVGSVGElement
        remove: SVGSVGElement
        lastSelected = false;
        dragged = false;
        fractionClicked = false;
        dragStart = { x: 0, y: 0 }
        sectionOffset = 0;
        fractionY = 100
        TL = gsap.timeline()
        fractionRectWidth = 50
        fractionRectHeight = 30
        oldX = 0
        dragRef: any
        numerator = 0;
        denominator = 0;
        uiActive = true

        constructor(id) {
            this.id = id
            this.fractionid = "fraction" + id
            this.fractionGroup = document.createElementNS(self.svgns, "g") as SVGSVGElement
            gsap.set(this.fractionGroup, { attr: { id: this.fractionid } })
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
            const scale = document.createElementNS(self.svgns, "g");

            let line = document.createElementNS(self.svgns, "line")
            gsap.set(line, { attr: { y1: 80, y2: 105, stroke: "rgb(224, 102, 102)" }, strokeWidth: 2 })
            scale.appendChild(line)

            let circle = document.createElementNS(self.svgns, "circle")
            gsap.set(circle, { cy: 80, r: 10, fill: "rgb(224, 102, 102)" })
            scale.appendChild(circle)

            gsap.set(scale, { attr: { id: this.fractionid + "scale" }, x: this.sectionOffset + this.fractionRectWidth })
            this.fractionGroup.appendChild(scale)
            this.scale = scale as SVGSVGElement

            //creating fraction modifier visual to be set after
            line = document.createElementNS(self.svgns, "line")
            this.modifier = line as SVGSVGElement
            this.fractionGroup.appendChild(line)

            //creating fractions
            for (let i = 0; i < 3; i++) {
                let rect = document.createElementNS(self.svgns, "rect")
                gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                this.fractionGroup.appendChild(rect)
                this.sectionOffset += this.fractionRectWidth
                this.denominator += 1
            }

            //creating fraction after loop to be set as the last fraction
            let rect = document.createElementNS(self.svgns, "rect")
            gsap.set(rect, { width: this.fractionRectWidth, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
            this.fractionGroup.appendChild(rect)
            this.sectionOffset += this.fractionRectWidth
            this.lastFraction = rect as SVGSVGElement
            this.denominator += 1

            gsap.set(line, { attr: { id: this.fractionid + "modifier", x1: this.sectionOffset, x2: this.sectionOffset, y1: 100, y2: 130, stroke: "#595959" }, strokeWidth: 6, strokeOpacity: 0.75, strokeLinecap: "round", cursor: "pointer" })

            //creating remove button
            const remove = document.createElementNS(self.svgns, "g");
            line = document.createElementNS(self.svgns, "line")
            gsap.set(line, { attr: { x1: 0, x2: 10, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            line = document.createElementNS(self.svgns, "line")
            gsap.set(line, { attr: { x1: 10, x2: 0, y1: 0, y2: 10, stroke: "rgb(0,0,0)" }, strokeWidth: 3 })
            remove.appendChild(line)

            gsap.set(remove, {attr: {id: this.fractionid+"remove"}, y:95.5, x: -4.5})
            this.remove = remove as SVGSVGElement
            this.fractionGroup.appendChild(remove)
        }

        handlePointerDown(e) {
            var pt = { x: 0, y: 0 }
            pt.x = e.clientX
            pt.y = e.clientY
            //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())

            this.oldX = pt.x
            console.log(e.target.parentNode, e.target.getRootNode())

             if (e.target.parentNode == this.fractionGroup || e.target.parentNode.parentNode == this.fractionGroup) {
                if (this.uiActive == false ) {
                    this.scale.style.display = "block"
                    this.remove.style.display = "block"
                    this.modifier.style.display = "block"
                    this.uiActive = true
                }
                else {
                    if (e.target == this.lastFraction || e.target == this.modifier) {
                        console.log("down2")
                        this.lastSelected = true;
                        this.fractionClicked = true;
                        this.dragRef[0].disable()//disable drag
                        console.log(self.els.style.touchAction)
                    }
                    else if (e.target.parentNode == this.scale) {
                        this.fractionClicked = true;
                        this.dragRef[0].disable()//disable drag
                        console.log(self.els.style.touchAction)
                    }
                    else if (e.target.parentNode == this.remove) {
                        console.log("remove clicked")
                        console.log(self.fractionDragArray)
                        self.fractionDragArray.splice(this.id, 1)
                        this.fractionGroup.remove()
                    }
                }
            }
            else {
                this.scale.style.display = "none"
                this.remove.style.display = "none"
                this.modifier.style.display = "none"
                this.uiActive = false
            }
        }

        handleMove(e) {
            if (this.fractionClicked) {
                this.dragged = true;
                var pt = { x: 0, y: 0 }
                pt.x = e.clientX
                pt.y = e.clientY
                //console.log(pt)
                //pt = pt.matrixTransform(this.els.getScreenCTM().inverse())
                //let rectWidth = (pt.x - this.dragStart.x)

                //if the last fraction is selected
                if (this.lastSelected) {
                    let rectWidth = this.lastFraction.getBBox().width + (pt.x - this.oldX)
                    //rectWidth += (pt.x - this.oldX)

                    if ((pt.x - this.oldX) > 0) {

                        //if we have completed a full fraction create a new section and update last fraction
                        if (rectWidth >= this.fractionRectWidth - 3) {
                            gsap.set(this.lastFraction, { width: this.fractionRectWidth })
                            gsap.set(this.scale, { x: this.fractionRectWidth })

                            let rect = document.createElementNS(self.svgns, "rect")
                            this.lastFraction = rect as SVGSVGElement
                            gsap.set(this.lastFraction, { width: 0, height: this.fractionRectHeight, x: this.sectionOffset, y: this.fractionY, fill: "rgb(255, 255, 255)", rx: 5, ry: 5, stroke: "#595959" })
                            this.fractionGroup.appendChild(this.lastFraction)
                            this.sectionOffset += this.fractionRectWidth
                            this.denominator += 1
                        }
                        //else update last fractions width, modifier and scale visuals
                        else {
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.modifier, { attr: { x1: this.sectionOffset - this.fractionRectWidth + rectWidth, x2: this.sectionOffset - this.fractionRectWidth + rectWidth } })

                            //if the last fraction is the first fraction, move the scale visual
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                gsap.set(this.scale, { x: rectWidth })
                            }
                        }

                    }
                    else if ((pt.x - this.oldX) <= 0) {
                        //if we have removed a full fraction, remove that fraction and update last fraction
                        if (rectWidth <= 4) {
                            if (this.lastFraction != gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                gsap.set(this.lastFraction, { width: 0 })
                                this.sectionOffset -= this.fractionRectWidth
                                this.lastFraction.remove();
                                this.lastFraction = gsap.utils.toArray("rect", this.fractionGroup).at(-1)
                                this.denominator -= 1
                            }
                        }
                        //else update last fraction's width, modifier and scale visuals
                        else {
                            gsap.set(this.lastFraction, { width: rectWidth })
                            gsap.set(this.modifier, { attr: { x1: this.sectionOffset - this.fractionRectWidth + rectWidth, x2: this.sectionOffset - this.fractionRectWidth + rectWidth } })

                            //if the last fraction is the first fraction, move the scale visual
                            if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                                gsap.set(this.scale, { x: rectWidth })
                            }
                        }
                    }
                }
                //else we are modifying the scale of the entire fraction
                else {
                    let bbox = this.lastFraction.getBBox()
                    let temp = (pt.x - this.oldX) / 1.1

                    //if the section width is greater than the section height we can update the scale
                    if (bbox.width + temp >= Math.round(bbox.height)) {
                        this.sectionOffset = 0
                        let arr = gsap.utils.toArray("rect", this.fractionGroup)
                        gsap.set(this.scale, { x: this.sectionOffset + temp + bbox.width })

                        for (let i = 0; i < arr.length; i++) {
                            gsap.set(arr[i], { width: `+=${temp}`, x: this.sectionOffset })
                            this.sectionOffset += Math.round(bbox.width + temp)
                            console.log("offset", this.sectionOffset)
                        }

                        gsap.set(this.modifier, { attr: { x1: this.sectionOffset, x2: this.sectionOffset } })
                    }
                }
                this.oldX = pt.x
            }
        }

        handlePointerUp(e) {
            //if dragged is not set then that means the user just clicked on a section -> update color
            if (!this.dragged && e.target.tagName == "rect" && e.target.parentNode == this.fractionGroup && this.uiActive == true) {
                let element = e.target
                if (element.style.fill == "rgb(255, 255, 255)") {
                    gsap.set(element, { fill: "rgb(224, 102, 102)" })
                    this.numerator += 1
                }
                else {
                    gsap.set(element, { fill: "rgb(255, 255, 255)" })
                    this.numerator -= 1
                }

            }
            //if dragged is set then the fraction has been changed
            else if (this.dragged) {
                //if the last fraction isn't complete then complete it and update the modifier to align
                if (this.lastFraction.getBBox().width < this.fractionRectWidth && this.lastSelected) {
                    gsap.set(this.lastFraction, { width: this.fractionRectWidth })
                    gsap.set(this.modifier, { attr: { x1: this.sectionOffset, x2: this.sectionOffset } })
                }
                //if the last fraction is the first fraction we also have to move the scale visual
                if (this.lastFraction == gsap.utils.toArray("rect", this.fractionGroup)[0]) {
                    gsap.set(this.scale, { x: this.lastFraction.getBBox().width })
                }
            }
            this.fractionRectWidth = this.lastFraction.getBBox().width
            this.fractionClicked = false;
            this.lastSelected = false;
            this.dragged = false
            this.dragRef[0].enable()
            console.log (this.fractionid, this.numerator, this.denominator)

        }
    }



    class fractionClass {

        els: SVGSVGElement;
        fractionDrag: SVGSVGElement
        fractionDragArray = []
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
            let temp = new fractionDrag(this.fractionCount);
            gsap.set(temp.fractionGroup, { y: 100})
            this.fractionDrag.appendChild(temp.fractionGroup)
            this.fractionDragArray[this.fractionCount++] = temp

        }

        handlePlay() {
            //gsap.to(gsap.utils.toArray("rect", this.fractionDrag), { width: 30, rx: 15, ry: 15, duration: 1, ease: "power3.inOut" })
        }

        handleFractionCreate() {
            let temp = new fractionDrag(this.fractionCount);
            this.fractionDrag.appendChild(temp.fractionGroup)
            this.fractionDragArray[this.fractionCount++] = temp
            console.log(this.fractionDragArray)
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
                gsap.set(rect, { width: 250, height: 90, x: 20, y:380, fill: "rgb(255, 255, 255)", stroke: "#595959" })
                this.fractionComparison.appendChild(rect)
            }
        }

        init() {
            gsap.registerPlugin(Draggable)

            //this.generateFractionComparison()

            this.generateFractionBar()

            this.els.getElementById("playButton").addEventListener("pointerdown", e => this.handlePlay())
            this.els.getElementById("createFraction").addEventListener("pointerdown", e => this.handleFractionCreate())

            //this.els.getElementById("increase").addEventListener("pointerdown", e => this.handleIncrease())
            //this.els.getElementById("decrease").addEventListener("pointerdown", e => this.handleDecrease())
            /*

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