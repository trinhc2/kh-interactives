import { gsap } from "gsap/all"

export interface farmSetup {
    height: number
    width: number
    plotHeight: number
    plotWidth: number
    plotColor: string
    lineColor: string

}

export function farmAPI(_els, _setup) {
    let self = {} as farmClass

    class farmClass {
        els: SVGSVGElement;
        setup: farmSetup;
        svgns: string;
        outerLineStrokeWidth = 2;
        innerLineStrokeWidth = 1;
        plotBBox: any;
        plotIncrementHeight: number;
        plotIncrementWidth: number;
        border: HTMLElement
        tens: HTMLElement
        hundreds: HTMLElement
        thousands: HTMLElement
        farmGroup: SVGSVGElement
        isViewingThousands = true;
        isViewingHundreds = true
        mousePosition = { x: 0, y: 0 }
        flowerColor = "rgb(255, 0, 0)"
        pointerState: any
        previousState: any
        zoom: HTMLElement
        plant: HTMLElement
        isZoomedIn = false
        ui: HTMLElement
        plotArray = Array.from(Array(20), () => new Array(50))
        colorDictionary: any
        colorCounter: any

        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup
            this.svgns = "http://www.w3.org/2000/svg";
            this.border = this.els.getElementById("border") as HTMLElement
            this.tens = this.els.getElementById("tens") as HTMLElement
            this.hundreds = this.els.getElementById("hundreds") as HTMLElement
            this.thousands = this.els.getElementById("thousands") as HTMLElement
            this.farmGroup = this.els.getElementById("farmGroup") as SVGSVGElement
            this.zoom = this.els.getElementById("zoom") as HTMLElement
            this.plant = this.els.getElementById("plant") as HTMLElement
            this.ui = this.els.getElementById("ui") as HTMLElement
            this.pointerState = this.plant
            this.previousState = this.plant
            this.colorDictionary = { "rgb(255, 0, 0)": "red", "rgb(128, 0, 128)": "purple", "rgb(0, 0, 255)": "blue" }
            this.colorCounter = { "red": 0, "purple": 0, "blue": 0 }



            this.init()
        }

        generateLines() {
            //draw outer lines
            for (let i = 0; i < 11; i++) {
                let x = i * this.plotIncrementWidth
                let y = i * this.plotIncrementHeight

                let verticalLine = document.createElementNS(this.svgns, "line")
                gsap.set(verticalLine, { attr: { x1: x, y1: this.plotBBox.y - this.outerLineStrokeWidth / 2, x2: x, y2: this.plotBBox.height + this.outerLineStrokeWidth / 2, stroke: this.setup.lineColor }, strokeWidth: this.outerLineStrokeWidth })

                let horizontalLine = document.createElementNS(this.svgns, "line")
                gsap.set(horizontalLine, { attr: { x1: this.plotBBox.x, y1: y, x2: this.plotBBox.width, y2: y, stroke: this.setup.lineColor }, strokeWidth: this.outerLineStrokeWidth })

                //append lines to border group if applicable
                if (i == 10 || i == 0) {
                    this.border.appendChild(verticalLine)
                    this.border.appendChild(horizontalLine)
                }
                else {
                    this.tens.appendChild(horizontalLine)
                    this.hundreds.appendChild(verticalLine)
                }

                //we skip drawing inner lines for the last iteration
                if (i < 10) {
                    //draw inner lines
                    for (let j = 1; j < 5; j++) {
                        let innerGridIncrementX = (this.plotIncrementWidth - this.outerLineStrokeWidth) / 5;
                        let innerVerticalLine = document.createElementNS(this.svgns, "line")
                        gsap.set(innerVerticalLine, { attr: { x1: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2, y1: this.plotBBox.y, x2: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2, y2: this.plotBBox.height, stroke: this.setup.lineColor }, strokeWidth: this.innerLineStrokeWidth })
                        this.thousands.appendChild(innerVerticalLine)
                    }
                    let innerGridIncrementY = this.plotIncrementHeight / 2
                    let innerHorizontalLine = document.createElementNS(this.svgns, "line")
                    gsap.set(innerHorizontalLine, { attr: { x1: this.plotBBox.x, y1: y + innerGridIncrementY, x2: this.plotBBox.width, y2: y + innerGridIncrementY, stroke: this.setup.lineColor }, strokeWidth: this.innerLineStrokeWidth })
                    this.thousands.appendChild(innerHorizontalLine)
                }

            }
        }
        hitTest(e) {
            if (this.pointerState == this.zoom) {
                this.handleZoom()
            }
            else {
                this.plantOrRemoveFlower(e)
            }
        }

        plantOrRemoveFlower(e) {
            var xVal;
            var yVal;
            var rectWidth;
            var rectHeight;
            var rectID;
            var i;
            var j;
            var existingElementsToBeDeleted = []

            //Calculate original point
            var pt = this.els.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse())
            //console.log(pt)

            //checks bounds so that rects cannot be placed outside of plot
            if (pt.x < 0) {
                pt.x = 0
            }
            else if (pt.x > this.setup.plotHeight) {
                pt.x = this.setup.plotHeight - 1
            }
            if (pt.y < 0) {
                pt.y = 0
            }
            else if (pt.y > this.setup.plotWidth) {
                pt.y = this.setup.plotWidth - 1
            }

            let rect = document.createElementNS(this.svgns, "rect")

            let innerGridIncrementX = this.plotIncrementWidth / 5;
            let innerGridIncrementY = this.plotIncrementHeight / 2

            let yGridQuadrant = Math.floor(pt.y / innerGridIncrementY)
            let xGridQuadrant = Math.floor(pt.x / innerGridIncrementX)

            i = Math.floor(pt.y / innerGridIncrementY);
            j = Math.floor(pt.x / innerGridIncrementX)

            rectID = `thousands${i}-${j}`

            if (this.plotArray[i][j]) {
                gsap.to(this.plotArray[i][j][1], { height: 0, duration: 1, onComplete: this.removeElement, onCompleteParams: [this.plotArray, this.plotArray[i][j][1]] })
            }
            else {
                if (this.isViewingThousands) {
                    rectWidth = this.plotIncrementWidth / 5 + 0.1
                    rectHeight = (this.plotIncrementHeight / 2)


                    xVal = xGridQuadrant * innerGridIncrementX + (0.4 - ((xGridQuadrant % 5) * 0.2))
                    yVal = yGridQuadrant * innerGridIncrementY

                    if ((xGridQuadrant % 5) == 0) {
                        rectWidth += 0.5
                        xVal-=0.4
                    }
                    if ((xGridQuadrant % 5) == 4) {
                        rectWidth += 0.5
                    }


                    this.plotArray[i][j] = [this.flowerColor, rect]
                    this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]++
                }

                else if (this.isViewingHundreds) {//working with hundreds

                    let xGridQuadrant = Math.floor(pt.x / this.plotIncrementWidth)
                    let yGridQuadrant = Math.floor(pt.y / this.plotIncrementHeight)

                    rectWidth = this.plotIncrementWidth + 0.1
                    rectHeight = this.plotIncrementHeight + 0.5

                    xVal = xGridQuadrant * this.plotIncrementWidth
                    yVal = yGridQuadrant * this.plotIncrementHeight

                    i = Math.floor(pt.y / this.plotIncrementWidth)
                    j = Math.floor(pt.x / this.plotIncrementHeight)

                    rectID = `hundreds${i}-${j}`

                    for (let index = i * 2; index < (i * 2) + 2; index++) {
                        for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }
                else {//working with tens
                    let GridQuadrant = Math.floor(pt.y / this.plotIncrementWidth)

                    rectWidth = this.setup.plotHeight - (this.outerLineStrokeWidth)
                    rectHeight = (this.plotIncrementWidth - this.outerLineStrokeWidth);

                    yVal = GridQuadrant * this.plotIncrementWidth + this.outerLineStrokeWidth / 2
                    xVal = this.outerLineStrokeWidth / 2

                    i = GridQuadrant
                    j = 0

                    rectID = `tens${i}-${j}`

                    for (let index = i*2; index < (i*2)+2; index++) {
                        for (let jIndex = 0; jIndex < 50; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }

                gsap.set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: rectWidth, height: 0, fill: this.flowerColor })
                this.els.getElementById("fill").appendChild(rect)
                gsap.to(rect, { height: rectHeight, duration: 1, onComplete: function() {existingElementsToBeDeleted.forEach( e => {e.remove()})}})
            }


            console.log("i = " + i, "j = " + j)
            console.log("filled: ", this.colorCounter)
            console.log(this.plotArray)
        }

        removeElement(arr, element) {// can optimize more, place i,j,type as attributes and perform the respective for loops
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    if (arr[i][j] != null && arr[i][j][1] == element) {
                        self.colorCounter[self.colorDictionary[arr[i][j][0]]]--
                        arr[i][j] = null
                    }
                }
            }
            element.remove()
        }
        /*
        plantOrRemoveFlower(e) {
            var xVal;
            var yVal;
            var rectWidth;
            var rectHeight;
            var rectID;
            var i;
            var j;
            var existingElementsToBeDeleted = []


            //https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
            //https://stackoverflow.com/questions/35373882/get-the-global-transform-matrix-of-an-svg-element

            //Calculate original point
            var pt = this.els.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse())
            //console.log(pt)

            //checks bounds so that rects cannot be placed outside of plot
            if (pt.x < 0) {
                pt.x = 0
            }
            else if (pt.x > this.setup.plotHeight) {
                pt.x = this.setup.plotHeight - 1
            }
            if (pt.y < 0) {
                pt.y = 0
            }
            else if (pt.y > this.setup.plotWidth) {
                pt.y = this.setup.plotWidth - 1
            }

            //calculating variables for rect
            let rect = document.createElementNS(this.svgns, "rect")
            if (this.isViewingThousands) {//working with thousands

                let innerGridIncrementX = this.plotIncrementWidth / 5;
                let innerGridIncrementY = this.plotIncrementHeight / 2

                let yGridQuadrant = Math.floor(pt.y / innerGridIncrementY)
                let xGridQuadrant = Math.floor(pt.x / innerGridIncrementX)

                i = Math.floor(pt.y / innerGridIncrementY);
                j = Math.floor(pt.x / innerGridIncrementX)

                rectID = `thousands${i}-${j}`

                if (this.pointerState == this.plant) {
                    rectWidth = ((this.plotIncrementWidth - this.outerLineStrokeWidth) / 5) + 0.2
                    rectHeight = (this.plotIncrementHeight / 2)

                    xVal = xGridQuadrant * innerGridIncrementX + (this.outerLineStrokeWidth / 2 - ((xGridQuadrant % 5) * this.innerLineStrokeWidth / 2))
                    //xVal = xGridQuadrant * innerGridIncrementX + this.innerLineStrokeWidth

                    //y value changes depending on 1st or 2nd quad
                    if (yGridQuadrant % 2 == 0) {
                        yVal = yGridQuadrant * innerGridIncrementY
                    }
                    else {
                        //if odd then we only have to offset the y by the inner stroke width instead of the outer.
                        yVal = yGridQuadrant * innerGridIncrementY
                    }

                    //update colorCounter and update plotArray
                    if (this.plotArray[i][j]) {
                        this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]--
                    }
                    this.plotArray[i][j] = [this.flowerColor, rect]
                    this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]++
                    
                }
                else {//remove a flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        if (this.plotArray[i][j] != null) {
                            this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]--
                        }
                        this.plotArray[i][j] = null

                    }
                }
            }
            else if (this.isViewingHundreds) {//working with hundreds

                let xGridQuadrant = Math.floor(pt.x / this.plotIncrementWidth)
                let yGridQuadrant = Math.floor(pt.y / this.plotIncrementHeight)

                rectWidth = this.plotIncrementWidth
                rectHeight = this.plotIncrementHeight + 0.5

                xVal = xGridQuadrant * this.plotIncrementWidth
                yVal = yGridQuadrant * this.plotIncrementHeight

                i = Math.floor(pt.y / this.plotIncrementWidth)
                j = Math.floor(pt.x / this.plotIncrementHeight)

                rectID = `hundreds${i}-${j}`

                if (this.pointerState == this.plant) {
                    for (let index = i * 2; index < (i * 2) + 2; index++) {
                        for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }
                else {//remove a flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        for (let index = i * 2; index < (i * 2) + 2; index++) {
                            for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                                if (this.plotArray[index][jIndex] != null) {
                                    this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                }
                                this.plotArray[index][jIndex] = null
                            }
                        }

                    }
                }
            }
            else {//working with tens
                let GridQuadrant = Math.floor(pt.x / this.plotIncrementWidth)

                rectWidth = (this.plotIncrementWidth - this.outerLineStrokeWidth);
                rectHeight = this.setup.plotHeight - (this.outerLineStrokeWidth)

                xVal = GridQuadrant * this.plotIncrementWidth + this.outerLineStrokeWidth / 2
                yVal = this.outerLineStrokeWidth / 2

                i = Math.floor(pt.x / this.plotIncrementWidth)
                j = 0

                rectID = `tens${i}-${j}`

                if (this.pointerState == this.plant) {//plant a flower
                    for (let index = 0; index < 20; index++) {
                        for (let jIndex = i * 5; jIndex < (i * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }

                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }
                else {//remove flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        for (let index = 0; index < 20; index++) {
                            for (let jIndex = i * 5; jIndex < (i * 5) + 5; jIndex++) {
                                if (this.plotArray[index][jIndex] != null) {
                                    this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                }
                                this.plotArray[index][jIndex] = null
                            }
                        }
                    }
                }

            }
            //actually create the rect element
            if (this.pointerState == this.plant) {
                existingElementsToBeDeleted.concat(gsap.utils.toArray(`#${rectID}`))
                gsap.set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: rectWidth, height: 0, fill: this.flowerColor })
                this.els.getElementById("fill").appendChild(rect)
                gsap.to(rect, { height: rectHeight, duration: 1, onComplete: this.removeElement, onCompleteParams: [existingElementsToBeDeleted, rectID] })
            }

            console.log("i = " + i, "j = " + j)
            console.log("filled: ", this.colorCounter)
        }

                removeElement(arr, id) {
            arr.forEach(e => {
                if (e.id == id) {
                    e.remove()
                }
            })
        }
        */

        handleZoom() {
            if (!this.isZoomedIn) {
                let svgBBox = this.els.getBoundingClientRect()
                gsap.to(this.els, { duration: 1, attr: { viewBox: `${(this.mousePosition.x - 25 - svgBBox.x)* (500/svgBBox.width)} ${(this.mousePosition.y - 25 - svgBBox.y)* (500/svgBBox.width)} 50 50` }, });
                this.isZoomedIn = true
                this.farmGroup.style.cursor = "zoom-out"
                gsap.to(this.ui, { x: (this.mousePosition.x - 25 - svgBBox.x)* (500/svgBBox.width) - 0.5, y: (this.mousePosition.y - 25 - svgBBox.y)* (500/svgBBox.width) - 0.5, scale: 0.1, duration: 1 },)
            }
            else {
                gsap.to(this.els, { duration: 1, attr: { viewBox: `0 0 500 500` }, });
                this.isZoomedIn = false
                this.farmGroup.style.cursor = "zoom-in"
                gsap.to(this.ui, { x: 0, y: 0, scale: 1, duration: 1 },)
            }
        }

        handleGridToggle() {
            if (this.isViewingThousands) {
                gsap.set(this.thousands, { display: "none" })
                this.isViewingThousands = false
            }
            else if (this.isViewingHundreds) {
                gsap.set(this.hundreds, { display: "none" })
                this.isViewingHundreds = false
            }
            else {
                gsap.set(this.thousands, { display: "block" })
                this.isViewingThousands = true
                gsap.set(this.hundreds, { display: "block" })
                this.isViewingHundreds = true
            }
        }

        handleColorChange(element) {
            let fillColor = getComputedStyle(element).fill
            this.flowerColor = fillColor;
            (this.els.getElementById("selectedColor") as SVGSVGElement).style.fill = fillColor
        }

        handlePointerChange(element) {
            this.pointerState = element
            if (this.pointerState == this.zoom) {
                if (this.isZoomedIn) {
                    this.farmGroup.style.cursor = "zoom-out"
                }
                else {
                    this.farmGroup.style.cursor = "zoom-in"
                }
            }
            else {
                this.farmGroup.style.cursor = "pointer"
            }
            this.previousState.style.fill = "#000000"
            element.style.fill = "#ffffff"
            this.previousState = element
        }

        init() {
            let farmPlot = document.createElementNS(this.svgns, "rect")
            gsap.set(farmPlot, { attr: { id: "farmPlot" }, width: this.setup.plotWidth, height: this.setup.plotHeight, fill: this.setup.plotColor })
            this.els.getElementById("plot").appendChild(farmPlot)

            this.plotBBox = (this.els.getElementById("farmPlot") as SVGSVGElement).getBBox()
            this.plotIncrementWidth = this.plotBBox.width / 10;
            this.plotIncrementHeight = this.plotBBox.height / 10;

            this.generateLines()

            gsap.set(this.els, { backgroundColor: "rgb(147,196,125)" })
            this.plant.style.fill = "#ffffff"

            //fill-box allows rotation about center
            gsap.set(this.farmGroup, { transformOrigin: "center", transformBox: "fill-box", rotate: 45, skewX: 345, skewY: 345 })
            gsap.set(this.farmGroup, { x: 100, y: 100 })

            this.farmGroup.addEventListener("pointerdown", e => { this.hitTest(e) })
            document.addEventListener("keydown", event => {
                if (event.keyCode == 32) {
                    this.handleGridToggle()
                }
            })
            this.els.getElementById("grid").addEventListener("pointerdown", e => this.handleGridToggle())
            document.addEventListener("pointermove", e => {
                this.mousePosition.x = e.clientX
                this.mousePosition.y = e.clientY

            })
            gsap.utils.toArray(".color").forEach(element => element.addEventListener("pointerdown", e => this.handleColorChange(element)))
            gsap.utils.toArray(".pointer").forEach(element => element.addEventListener("pointerdown", e => this.handlePointerChange(element)))
        }

    }
    return new farmClass(_els, _setup);
}