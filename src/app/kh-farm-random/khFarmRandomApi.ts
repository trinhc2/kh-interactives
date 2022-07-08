import { gsap, Draggable } from "gsap/all"

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
        els: (SVGSVGElement)[]
        gsvg: SVGSVGElement
        gsvgu: SVGSVGElement
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
        largeCombine: SVGSVGElement
        largeCombineText: SVGSVGElement
        smallCombine: SVGSVGElement
        smallCombineText: SVGSVGElement
        isViewingThousands = true;
        isViewingHundreds = true
        flowerColor = "rgb(255, 0, 0)"
        pointerState: any
        previousState: any
        zoom: HTMLElement
        plant: HTMLElement
        move: HTMLElement
        zoomLevel = 0
        plotArray = Array.from(Array(20), () => new Array(50))
        colorDictionary: any
        colorCounter: any
        isDragging = false;
        dragEnabled = false;
        dragStart = { x: 0, y: 0 }
        zoomIncrement = 75
        svgDefaultWidthHeight = 500
        TL = gsap.timeline()
        harvested = 0
        harvestDuration = 5
        lastHarvestedIndex: number
        harvestTotalLarge: SVGSVGElement
        harvestTotalSmall: SVGSVGElement
        largeCombineDraggable: any
        smallCombineDraggable: any
        animationPlaying = false

        constructor(els, setup) {
            self = this
            this.els = els
            this.gsvg = els[0]
            this.gsvgu = els[1]
            this.setup = setup
            this.svgns = "http://www.w3.org/2000/svg";
            this.border = this.gsvg.getElementById("border") as HTMLElement
            this.tens = this.gsvg.getElementById("tens") as HTMLElement
            this.hundreds = this.gsvg.getElementById("hundreds") as HTMLElement
            this.thousands = this.gsvg.getElementById("thousands") as HTMLElement
            this.farmGroup = this.gsvg.getElementById("farmGroup") as SVGSVGElement
            this.largeCombine = this.gsvg.getElementById("largeCombine") as SVGSVGElement
            this.largeCombineText = this.gsvg.getElementById("largeCombineText") as SVGSVGElement
            this.smallCombine = this.gsvg.getElementById("smallCombine") as SVGSVGElement
            this.smallCombineText = this.gsvg.getElementById("smallCombineText") as SVGSVGElement
            this.zoom = this.gsvgu.getElementById("zoom") as HTMLElement
            this.plant = this.gsvgu.getElementById("plant") as HTMLElement
            this.move = this.gsvgu.getElementById("move") as HTMLElement
            this.pointerState = this.plant
            this.previousState = this.plant
            this.colorDictionary = { "rgb(255, 0, 0)": "red", "rgb(128, 0, 128)": "purple", "rgb(0, 0, 255)": "blue" }
            this.colorCounter = { "red": 0, "purple": 0, "blue": 0 }
            this.harvestTotalLarge = this.gsvg.getElementById("harvestTotalLarge") as SVGSVGElement
            this.harvestTotalSmall = this.gsvg.getElementById("harvestTotalSmall") as SVGSVGElement

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
            if (this.pointerState == this.plant) {
                this.plantOrRemoveFlower(e)
            }
        }

        startDrag(e) {
            if (this.dragEnabled && !this.animationPlaying) {
                var pt = this.gsvg.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

                this.dragStart.x = pt.x
                this.dragStart.y = pt.y
                this.isDragging = true;
            }
        }

        whileDrag(e) {
            if (this.isDragging && !this.animationPlaying) {
                let baseViewbox = this.gsvg.viewBox["baseVal"]
                var pt = this.gsvg.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())
                gsap.set(this.gsvg, { attr: { viewBox: `${baseViewbox["x"] + (this.dragStart.x - pt.x)} ${baseViewbox["y"] + (this.dragStart.y - pt.y)} ${baseViewbox["width"]} ${baseViewbox["height"]}` } });
            }
        }

        endDrag(e) {
            this.isDragging = false;
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
            var pt = this.gsvg.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse())

            var largeCombineBBox = this.largeCombine.getBBox()
            var smallCombineBBox = this.smallCombine.getBBox()

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
            //console.log("point after inverse", pt)

            let rect = document.createElementNS(this.svgns, "rect")

            let innerGridIncrementX = this.plotIncrementWidth / 5;
            let innerGridIncrementY = this.plotIncrementHeight / 2

            let yGridQuadrant = Math.floor(pt.y / innerGridIncrementY)
            let xGridQuadrant = Math.floor(pt.x / innerGridIncrementX)

            //current grid is rotated for plant/harvest animation, (0,0 is actually 19,49)
            i = 19 - Math.floor(pt.y / innerGridIncrementY);
            j = 49 - Math.floor(pt.x / innerGridIncrementX)

            rectID = `thousands${i}-${j}`

            //if element exists where clicking, remove it
            if (this.plotArray[i][j]) {
                gsap.to(this.plotArray[i][j][1], { height: 0, duration: 1, onComplete: this.removeElement, onCompleteParams: [this.plotArray[i][j][1], i, j] })
            }
            else {
                if (this.isViewingThousands) {
                    rectWidth = this.plotIncrementWidth / 5 + 0.2 //0.2 to cover edges better
                    rectHeight = (this.plotIncrementHeight / 2)

                    xVal = xGridQuadrant * innerGridIncrementX + (0.3 - ((xGridQuadrant % 5) * 0.2))
                    yVal = yGridQuadrant * innerGridIncrementY

                    //width of edge pieces are thicker
                    if ((xGridQuadrant % 5) == 0) {
                        rectWidth += 0.5
                        xVal -= 0.4
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

                    rectWidth = this.plotIncrementWidth + 0.5 //0.5 for better edges
                    rectHeight = this.plotIncrementHeight + 0.5

                    xVal = xGridQuadrant * this.plotIncrementWidth
                    yVal = yGridQuadrant * this.plotIncrementHeight

                    //i and j are flipped
                    i = 9 - Math.floor(pt.y / this.plotIncrementWidth)
                    j = 9 - Math.floor(pt.x / this.plotIncrementHeight)

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

                    rectWidth = this.setup.plotWidth - (this.outerLineStrokeWidth)
                    rectHeight = (this.plotIncrementWidth - this.outerLineStrokeWidth);

                    yVal = GridQuadrant * this.plotIncrementWidth + this.outerLineStrokeWidth / 2
                    xVal = this.outerLineStrokeWidth / 2

                    //i and j are flipped
                    i = 9 - GridQuadrant
                    j = 0

                    rectID = `tens${i}-${j}`

                    for (let index = i * 2; index < (i * 2) + 2; index++) {
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

                //tens fill width wise, everything else fills height wise
                if (rectID.startsWith("tens")) {
                    gsap.set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: 0, height: rectHeight, fill: this.flowerColor })
                    this.gsvg.getElementById("fill").appendChild(rect)
                    gsap.to(rect, { width: rectWidth, duration: 1, onComplete: function () { existingElementsToBeDeleted.forEach(e => { e.remove() }) } })
                }
                else {
                    gsap.set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: rectWidth, height: 0, fill: this.flowerColor })
                    this.gsvg.getElementById("fill").appendChild(rect)
                    gsap.to(rect, { height: rectHeight, duration: 1, onComplete: function () { existingElementsToBeDeleted.forEach(e => { e.remove() }) } })
                }
            }


            //console.log("i = " + i, "j = " + j)
            //console.log("filled: ", this.colorCounter)
            console.log(this.plotArray)
        }

        /*
        handleHarvest(startingX, increment, i, combine, harvestTotal) {
            var dur;
            var add = 0.001
            let currentX = combine.getBoundingClientRect().x
            let j = Math.round((currentX - startingX) / increment)

            if (j != self.lastHarvestedIndex) {
                if (self.plotArray[i][j]) {
                    if (self.plotArray[i][j][1].id.startsWith("thousands")) {
                        dur = self.harvestDuration / 10 / 5
                    }
                    else if (self.plotArray[i][j][1].id.startsWith("hundreds")) {
                        dur = self.harvestDuration / 10
                        add = 0.002
                    }
                    else {
                        dur = self.harvestDuration
                        add = 0.002
                    }
                    self.harvested += add
                    self.TL.to(self.plotArray[i][j][1], { width: 0, duration: dur, onComplete: self.removeElement, onCompleteParams: [self.plotArray[i][j][1], i, j], ease: "linear" })
                }
                if (self.plotArray[i + 1][j]) {
                    if (self.plotArray[i + 1][j][1].id.startsWith("thousands")) {
                        dur = self.harvestDuration / 10 / 5
                        self.harvested += add
                        gsap.to(self.plotArray[i + 1][j][1], { width: 0, duration: dur, onComplete: self.removeElement, onCompleteParams: [self.plotArray[i + 1][j][1], i + 1, j], ease: "linear" })
                    }
                }
                harvestTotal.textContent = String(parseFloat(self.harvested.toFixed(3)))
                gsap.set(harvestTotal, { x: - harvestTotal.getBBox().width / 2 })
                self.lastHarvestedIndex = j
            }
        }
        */
        handleHarvest(startingX, increment, index, combine, harvestTotal) {

            //const tween = this as gsap.Tween;
            //const {animVal} = tween._targets[0].scale

            let baseViewbox = self.gsvg.viewBox["baseVal"]
            var dur;
            var add = 0.001
            let currentX = combine.getBoundingClientRect().x
            let j = Math.round((currentX - startingX) / increment)
            let i = Math.floor(index * 2 / 2) * 2
            //let i = index 
            if (j < 50) {
                if (j != self.lastHarvestedIndex) {
                    //console.log(i, j, currentX, currentX + baseViewbox["x"], startingX + baseViewbox["x"], baseViewbox["x"])
                    //console.log(tween, tween._targets[0].scale, currentX)
                    if (self.plotArray[i][j]) {
                        console.log("hit", i, j)
                        if (self.plotArray[i][j][1].id.startsWith("thousands")) {
                            dur = self.harvestDuration / 10 / 5
                        }
                        else if (self.plotArray[i][j][1].id.startsWith("hundreds")) {
                            dur = self.harvestDuration / 10
                            add = 0.002
                        }
                        else {
                            dur = self.harvestDuration
                            add = 0.002
                        }
                        self.harvested += add
                        self.TL.to(self.plotArray[i][j][1], { width: 0, duration: dur, onComplete: self.removeElement, onCompleteParams: [self.plotArray[i][j][1], i, j], ease: "linear" })
                    }
                    if (self.plotArray[i + 1][j]) {
                        if (self.plotArray[i + 1][j][1].id.startsWith("thousands")) {
                            console.log("hit", i, j)
                            dur = self.harvestDuration / 10 / 5
                            self.harvested += add
                            gsap.to(self.plotArray[i + 1][j][1], { width: 0, duration: dur, onComplete: self.removeElement, onCompleteParams: [self.plotArray[i + 1][j][1], i + 1, j], ease: "linear" })
                        }
                    }
                    harvestTotal.textContent = String(parseFloat(self.harvested.toFixed(3)))
                    gsap.set(harvestTotal, { x: - harvestTotal.getBBox().width / 2 })
                    self.lastHarvestedIndex = j
                }
            }
            else {
                self.animationPlaying = false;
            }
        }

        handlePlay(largeArr, smallArr, largeDragEl, smallDragEl) {
            if (!self.animationPlaying) {
                var largei, smalli;
                var largept = this.gsvg.createSVGPoint()
                var smallpt = this.gsvg.createSVGPoint()

                for (let index = 0; index < largeArr.length; index++) {
                    if (Math.round(largeDragEl.x) == Math.round(largeArr[index].x)) {
                        largei = index
                        break;
                    }
                }

                for (let index = 0; index < smallArr.length; index++) {
                    if (Math.round(smallDragEl.x) == Math.round(smallArr[index].x)) {
                        smalli = index
                        break;
                    }
                }

                if (largei != null) {//if i is null then it means that the combine is not snapped
                    largept.x = largeDragEl.x
                    largept.y = largeDragEl.y

                    //current point is transformed 1.farmgroup 2. screenMatrix inverse
                    largept = largept.matrixTransform(self.gsvg.getScreenCTM()) //undo screenmatrix to get position relative to farm
                    let largex1 = largept.x //get start point
                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM().inverse()) //undo farmgroup to calculate end position

                    largept.x -= self.setup.plotWidth
                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM())
                    let largex2 = largept.x //set end point before applying combine matrix

                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM().inverse())
                    largept.x -= this.largeCombine.getBBox().width / 2

                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM())
                    largept = largept.matrixTransform(self.gsvg.getScreenCTM().inverse())


                    gsap.to(self.largeCombineText, { x: largept.x, y: largept.y, duration: self.harvestDuration + 0.5, ease: "linear", onUpdate: self.handleHarvest, onUpdateParams: [largex1, (largex2 - largex1) / 49, largei, self.largeCombine, self.harvestTotalLarge] })
                }
                else {
                    console.log("orange combine is not snapped")
                }

                if (smalli != null) {//if i is null then it means that the combine is not snapped

                    smallpt.x = smallDragEl.x
                    smallpt.y = smallDragEl.y

                    //current point is transformed 1.farmgroup 2. combinematrix inverse
                    smallpt = smallpt.matrixTransform(self.gsvg.getScreenCTM()) //undo combinematrix to get position relative to farm
                    let smallx1 = smallpt.x //get start point
                    smallpt = smallpt.matrixTransform(self.farmGroup.getScreenCTM().inverse()) //undo farmgroup to calculate end position

                    smallpt.x -= self.setup.plotWidth
                    smallpt = smallpt.matrixTransform(self.farmGroup.getScreenCTM())
                    let smallx2 = smallpt.x //set end point before applying combine matrix

                    smallpt = smallpt.matrixTransform(self.farmGroup.getScreenCTM().inverse())
                    smallpt.x -= this.smallCombine.getBBox().width / 2

                    smallpt = smallpt.matrixTransform(self.farmGroup.getScreenCTM())
                    smallpt = smallpt.matrixTransform(self.gsvg.getScreenCTM().inverse())

                    gsap.to(self.smallCombineText, { x: smallpt.x, y: smallpt.y, duration: self.harvestDuration + 1, ease: "linear", onUpdate: self.handleHarvest, onUpdateParams: [smallx1, (smallx2 - smallx1) / 49, smalli, self.smallCombine, self.harvestTotalSmall] })
                }
                else {
                    console.log("yellow combine is not snapped")
                }
                self.animationPlaying = true;
            }

        }

        removeElement(element, i, j) {// can optimize more, place i,j,type as attributes and perform the respective for loops
            console.log("call", self.TL.isActive(), i, j)
            if (element.id.startsWith("thousands")) {
                self.colorCounter[self.colorDictionary[self.plotArray[i][j][0]]]--
                self.plotArray[i][j] = null
            }
            else if (element.id.startsWith("hundreds")) {
                for (let index = Math.floor(i / 2) * 2; index < Math.floor(i / 2) * 2 + 2; index++) {
                    for (let jIndex = Math.floor(j / 5) * 5; jIndex < Math.floor(j / 5) * 5 + 5; jIndex++) {
                        if (self.plotArray[index][jIndex]) {
                            self.colorCounter[self.colorDictionary[self.plotArray[index][jIndex][0]]]--
                            self.plotArray[index][jIndex] = null

                        }
                    }
                }
                self.TL.clear() //prevents function from being called more than once in handleHarvest
            }
            else {
                for (let index = Math.floor(i / 2) * 2; index < Math.floor(i / 2) * 2 + 2; index++) {
                    for (let jIndex = 0; jIndex < 50; jIndex++) {
                        if (self.plotArray[index][jIndex]) {
                            self.colorCounter[self.colorDictionary[self.plotArray[index][jIndex][0]]]--
                            self.plotArray[index][jIndex] = null
                        }
                    }
                }
                self.TL.clear() //prevents function from being called more than once in handleHarvest
            }
            element.remove()

        }

        handleZoomIn() {
            if (!this.animationPlaying) {
                let svgBBox = this.gsvg.getBoundingClientRect()
                let baseViewbox = this.gsvg.viewBox["baseVal"]
                if (this.zoomLevel < 6) {
                    gsap.to(this.gsvg, { duration: 0, attr: { viewBox: `${(baseViewbox["x"] + this.zoomIncrement / 2 - svgBBox.x)} ${(baseViewbox["y"] + this.zoomIncrement / 2 - svgBBox.y)} ${(baseViewbox["width"] - this.zoomIncrement)} ${(baseViewbox["height"] - this.zoomIncrement)}` } });
                    this.zoomLevel++
                }
            }
        }

        handleZoomOut() {
            if (!this.animationPlaying) {
                let svgBBox = this.gsvg.getBoundingClientRect()
                let baseViewbox = this.gsvg.viewBox["baseVal"]
                if (this.zoomLevel > -6) {
                    gsap.to(this.gsvg, { duration: 0, attr: { viewBox: `${(baseViewbox["x"] - this.zoomIncrement / 2 - svgBBox.x)} ${(baseViewbox["y"] - this.zoomIncrement / 2 - svgBBox.y)} ${(baseViewbox["width"] + this.zoomIncrement)} ${(baseViewbox["height"] + this.zoomIncrement)}` } });
                    this.zoomLevel--
                }
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
            (this.gsvgu.getElementById("selectedColor") as SVGSVGElement).style.fill = fillColor
        }

        handlePointerChange(element) {
            this.pointerState = element
            this.dragEnabled = false
            this.gsvg.style.cursor = "default"
            this.gsvg.style.touchAction = "auto"

            if (this.pointerState == this.plant) {
                this.farmGroup.style.cursor = "pointer"
                this.largeCombineDraggable[0].enable()
                this.smallCombineDraggable[0].enable()
            }
            else if (this.pointerState == this.move) {
                this.gsvg.style.touchAction = "pinch-zoom";/*lets pointer events work with mobile. only allowing pinch zoom incase user gets locked out*/
                this.dragEnabled = true
                this.gsvg.style.cursor = "move"
                this.farmGroup.style.cursor = "move"
                this.largeCombineDraggable[0].disable()
                this.smallCombineDraggable[0].disable()

            }
            this.previousState.style.fill = "#000000"
            element.style.fill = "#ffffff"
            this.previousState = element
        }

        init() {
            gsap.registerPlugin(Draggable)

            //farm plot init
            let farmPlot = document.createElementNS(this.svgns, "rect")
            gsap.set(farmPlot, { attr: { id: "farmPlot" }, width: this.setup.plotWidth, height: this.setup.plotHeight, fill: this.setup.plotColor })
            this.gsvg.getElementById("plot").appendChild(farmPlot)

            this.plotBBox = (this.gsvg.getElementById("farmPlot") as SVGSVGElement).getBBox()
            this.plotIncrementWidth = this.plotBBox.width / 10;
            this.plotIncrementHeight = this.plotBBox.height / 10;

            //generating grid lines
            this.generateLines()

            //setting colors
            gsap.set(this.gsvg, { backgroundColor: "rgb(33, 192, 96)" })
            this.plant.style.fill = "#ffffff"

            //fill-box allows rotation about center
            gsap.set(this.farmGroup, { transformOrigin: "center", transformBox: "fill-box", rotate: 45, skewX: 165, skewY: 165 })
            gsap.set(this.farmGroup, { x: 125, y: 100 })

            //combine start pos
            gsap.set(this.largeCombineText, { attr:{count: 0}, x: 50, y: 60 })
            gsap.set(this.smallCombineText, { attr:{count: 0}, x: 400, y: 80 , display: "none"})

            //harvest number init
            this.harvestTotalLarge.textContent = "0"
            gsap.set(this.harvestTotalLarge, { x: - this.harvestTotalLarge.getBBox().width / 2 })

            this.harvestTotalSmall.textContent = "0"
            gsap.set(this.harvestTotalSmall, { x: - this.harvestTotalSmall.getBBox().width / 2 })

            //calculate snap locations for combine

            var pt = this.gsvg.createSVGPoint()

            let largeCombineSnapPoints = []
            for (let i = 1; i < 11; i++) {
                //for (let i = 1; i < 20; i++) {
                pt.x = this.setup.plotWidth + this.largeCombine.getBBox().width
                //pt.y = ((19 - i) * (this.plotIncrementHeight / 2)) + 20
                pt.y = (Math.floor((20 - i * 2) / 2) * (this.plotIncrementHeight / 2) * 2) + 20
                pt = pt.matrixTransform(this.farmGroup.getScreenCTM())
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())
                let temp = { x: pt.x, y: pt.y }
                largeCombineSnapPoints.push(temp)
            }

            let smallCombineSnapPoints = []
            for (let i = 1; i < 21; i++) {
                pt.x = this.setup.plotWidth + this.smallCombine.getBBox().width
                pt.y = ((19 - i) * (this.plotIncrementHeight / 2)) + 20
                pt = pt.matrixTransform(this.farmGroup.getScreenCTM())
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())
                let temp = { x: pt.x, y: pt.y }
                smallCombineSnapPoints.push(temp)
            }

            this.largeCombineDraggable = Draggable.create(this.largeCombineText, {
                type: 'x, y',
                liveSnap: {
                    points: largeCombineSnapPoints,
                    radius: 50
                },
            })

            this.smallCombineDraggable = Draggable.create(this.smallCombineText, {
                type: "x, y",
                liveSnap: {
                    points: smallCombineSnapPoints,
                    radius: 50
                },
            })

            //event listeners
            this.farmGroup.addEventListener("pointerdown", e => { this.hitTest(e) })

            this.gsvgu.getElementById("grid").addEventListener("pointerdown", e => this.handleGridToggle())

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())

            this.gsvg.addEventListener("pointerdown", e => this.startDrag(e))
            this.gsvg.addEventListener("pointermove", e => this.whileDrag(e))
            this.gsvg.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("playButton").addEventListener("pointerdown", e => this.handlePlay(largeCombineSnapPoints, smallCombineSnapPoints, this.largeCombineDraggable[0], this.smallCombineDraggable[0]))

            gsap.utils.toArray(".color").forEach(element => element.addEventListener("pointerdown", e => this.handleColorChange(element)))
            gsap.utils.toArray(".pointer").forEach(element => element.addEventListener("pointerdown", e => this.handlePointerChange(element)))
        }

    }
    return new farmClass(_els, _setup);
}