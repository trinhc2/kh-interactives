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
        gridState: any
        pointerState: any
        zoomControls: SVGSVGElement
        plant: HTMLElement
        move: HTMLElement
        zoomLevel = 0
        plotArray = Array.from(Array(20), () => new Array(50))
        colorDictionary = { "rgb(239, 90, 104)": "pink", "rgb(103, 78, 167)": "purple", "rgb(0, 169, 211)": "blue", "rgb(254, 201, 0)": "wheat" }
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
        animationPlaying = false
        beds: SVGSVGElement
        plots: SVGSVGElement
        rows: SVGSVGElement

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
            this.plant = this.gsvgu.getElementById("plant") as HTMLElement
            this.move = this.gsvgu.getElementById("move") as HTMLElement
            this.pointerState = this.plant
            this.harvestTotalLarge = this.gsvg.getElementById("harvestTotalLarge") as SVGSVGElement
            this.harvestTotalSmall = this.gsvg.getElementById("harvestTotalSmall") as SVGSVGElement
            this.zoomControls = this.gsvgu.getElementById("zoomControls") as SVGSVGElement
            this.beds = this.gsvgu.getElementById("beds") as SVGSVGElement
            this.plots = this.gsvgu.getElementById("plots") as SVGSVGElement
            this.rows = this.gsvgu.getElementById("rows") as SVGSVGElement
            this.gridState = this.beds

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

        fillPlot() {
            
            let innerGridIncrementX = this.plotIncrementWidth / 5;
            let innerGridIncrementY = this.plotIncrementHeight / 2

            for (let index = 0; index < 20; index++){
                for (let jIndex = 50; jIndex > 0; jIndex--) {
                    //console.log(temp)
                    let plotArrayI = 19 - index
                    let plotArrayJ = jIndex - 1

                    let xVal = (50 - jIndex) * (innerGridIncrementX) + (1 - ((50 - jIndex) % 5) * 0.2)
                    let yVal = (index) * (innerGridIncrementY) + (0.8 - (index % 2) * 0.5)
                    let rectID = `${plotArrayI}-${plotArrayJ}`

                    //animate flower
                    let png = document.createElementNS(this.svgns, "use")
                    gsap.set(png, {attr: { id: rectID, href: "#wheatPNG"}, x: xVal, y: yVal, scaleX: 0, scaleY: 0.24, visibility: "hidden"})
                    this.gsvg.getElementById("fill").appendChild(png)
                    //temp.to(png, { scaleX: 0.22, duration: 1 }, "<")

                    this.plotArray[plotArrayI][plotArrayJ] = png
                }
            }
            console.log(this.plotArray)
        }

        plantOrRemoveFlower(e) {
            var i;
            var j;

            //Calculate original point
            var pt = this.gsvg.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse())

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

            let innerGridIncrementX = this.plotIncrementWidth / 5;
            let innerGridIncrementY = this.plotIncrementHeight / 2

            //current grid is rotated for plant/harvest animation, (0,0 is actually 19,49)
            i = 19 - Math.floor(pt.y / innerGridIncrementY);
            j = 49 - Math.floor(pt.x / innerGridIncrementX)


            //if element exists where clicking, remove it
            if (this.plotArray[i][j]) {
                let timeline = gsap.timeline()
                if (this.gridState == this.beds) {
                    if (self.plotArray[i][j].style.visibility == "hidden"){
                        gsap.set(this.plotArray[i][j], {visibility: "visible",})
                        gsap.to(this.plotArray[i][j], { scaleX: 0.22, duration: 1,})
                    }
                    else {
                        gsap.to(this.plotArray[i][j], { scaleX: 0, duration: 1,})
                        gsap.set(this.plotArray[i][j], {visibility: "hidden", delay:1 })
                    }
                    
                }
                else if (this.gridState == this.plots) {
                    if (self.plotArray[i][j].style.visibility == "hidden"){
                        let index = Math.floor(i / 2) * 2
                            for (let jIndex = Math.floor(j / 5) * 5 + 4; jIndex >= Math.floor(j / 5) * 5; jIndex--) {
                                timeline.set(this.plotArray[index][jIndex], {visibility: "visible"}, "<+=0.05")
                                timeline.to(this.plotArray[index][jIndex], { scaleX: 0.22, duration: 1,}, "<")

                                timeline.set(this.plotArray[index+1][jIndex], {visibility: "visible"}, "<")
                                timeline.to(this.plotArray[index+1][jIndex], { scaleX: 0.22, duration: 1,},"<")
                            }
                        
                    }
                    else {
                        let index = Math.floor(i / 2) * 2
                            for (let jIndex = Math.floor(j / 5) * 5; jIndex < Math.floor(j / 5) * 5 + 5; jIndex++) {
                                timeline.to(this.plotArray[index][jIndex], { scaleX: 0, duration: 1, onComplete: function () {timeline.set(self.plotArray[index][jIndex], {visibility: "hidden"})}}, "<+=0.05",)
                                timeline.to(this.plotArray[index+1][jIndex], { scaleX: 0, duration: 1, onComplete: function () {timeline.set(self.plotArray[index+1][jIndex], {visibility: "hidden"})}}, "<")
                            }
                        
                    }
                }
                else {
                    if (self.plotArray[i][j].style.visibility == "hidden"){
                        let index = Math.floor(i / 2) * 2
                            for (let jIndex = 49; jIndex >= 0; jIndex--) {
                                timeline.set(this.plotArray[index][jIndex], {visibility: "visible"}, "<+=0.02")
                                timeline.to(this.plotArray[index][jIndex], { scaleX: 0.22, duration: 1,}, "<")

                                timeline.set(this.plotArray[index+1][jIndex], {visibility: "visible"}, "<")
                                timeline.to(this.plotArray[index+1][jIndex], { scaleX: 0.22, duration: 1,},"<")
                            }
                        
                    }
                    else {
                        let index = Math.floor(i / 2) * 2
                            for (let jIndex = 0; jIndex < 50; jIndex++) {
                                timeline.to(this.plotArray[index][jIndex], { scaleX: 0, duration: 1, onComplete: function () {timeline.set(self.plotArray[index][jIndex], {visibility: "hidden"})}}, "<+=0.02",)
                                timeline.to(this.plotArray[index+1][jIndex], { scaleX: 0, duration: 1, onComplete: function () {timeline.set(self.plotArray[index+1][jIndex], {visibility: "hidden"})}}, "<")
                            }
                        
                    }
                }
            }

            //console.log("i = " + i, "j = " + j)
            console.log(this.plotArray)
        }


        handlePlay(largeArr, largeDragEl) {
            if (!self.animationPlaying) {
                
                var largei
                var largept = this.gsvg.createSVGPoint()

                //gsap.set(this.gsvg, { attr: { viewBox: "0 0 500 500"} })

                //check if combine is snapped
                for (let index = 0; index < largeArr.length; index++) {
                    if (Math.round(largeDragEl.x) == Math.round(largeArr[index].x)) {
                        largei = index
                        break;
                    }
                }

                if (largei != null) {//if i is null then it means that the combine is not snapped

                    //calculating end position
                    largept.x = largeDragEl.x
                    largept.y = largeDragEl.y

                    //current point is transformed 1.farmgroup 2. screenMatrix inverse
                    largept = largept.matrixTransform(self.gsvg.getScreenCTM()) //undo screenmatrix to get position relative to farm
                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM().inverse()) //undo farmgroup to calculate end position

                    largept.x -= self.setup.plotWidth + this.largeCombine.getBBox().width / 2

                    largept = largept.matrixTransform(self.farmGroup.getScreenCTM())
                    largept = largept.matrixTransform(self.gsvg.getScreenCTM().inverse())

                    //prevent combine from being draggable after animation start
                    self.largeCombineDraggable[0].disable()

                    //pre calculating the two rows to be harvested
                    let preCount = 0;
            
                    const arr = []
                    for (let j = 0; j < 50; j++) {
                        let el1 = this.plotArray[Math.floor(largei * 2 / 2) * 2][j]
                        let el2 = this.plotArray[Math.floor(largei * 2 / 2) * 2 + 1][j]

                        if (el1.style.visibility == "visible"){
                            preCount += 0.001
                        }
                        if (el2.style.visibility == "visible"){
                            preCount += 0.001
                        }
                        let temp = [el1, el2]
                        //console.log(temp)
                        arr.push(temp)
                    }

                    let postCount = self.harvested + preCount

                    //syncing wheat harvest with combine timeline
                    let T = gsap.timeline()

                    arr.forEach(e => {T.to(e, {visibility: "hidden", scaleX: 0, duration: (self.harvestDuration-1)/50, delay:0.01, 
                    onStart: function() {
                        if (e[0].style.visibility == "visible") {
                            self.harvested += 0.001
                        }
                        if (e[1].style.visibility == "visible") {
                            self.harvested += 0.001
                        }
                        self.harvestTotalLarge.textContent = String(self.harvested.toFixed(3))
                        gsap.set(self.harvestTotalLarge, { x: - self.harvestTotalLarge.getBBox().width / 2 })
                    }})})

                    //animate combine
                    gsap.to(self.largeCombineText, { x: largept.x, y: largept.y, duration: self.harvestDuration, ease: "linear",
                    onComplete: function() {
                        self.animationPlaying = false;
                        self.largeCombineDraggable[0].enable()
                        if (self.harvested != postCount) {
                            self.harvested = postCount
                            self.harvestTotalLarge.textContent = String(self.harvested.toFixed(3))
                            gsap.set(self.harvestTotalLarge, { x: - self.harvestTotalLarge.getBBox().width / 2 })
                        }
                    }})
                    self.animationPlaying = true;
                }
                else {
                    alert("Move the orange combine into place.")
                }
            }
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

        handleGridToggle(element) {
            gsap.utils.toArray("rect", this.gridState)[0].style.fill = "#93c47d"
            this.gridState = element
            if (this.gridState == this.beds) {
                gsap.set(this.thousands, { display: "block" })
                gsap.set(this.hundreds, { display: "block" })
                gsap.utils.toArray("rect", this.beds)[0].style.fill = "#c3e7b3"
            }
            else if (this.gridState == this.plots) {
                gsap.set(this.thousands, { display: "none" })
                gsap.set(this.hundreds, { display: "block" })
                gsap.utils.toArray("rect", this.plots)[0].style.fill = "#c3e7b3"
            }
            else {
                gsap.set(this.thousands, { display: "none" })
                gsap.set(this.hundreds, { display: "none" })
                gsap.utils.toArray("rect", this.rows)[0].style.fill = "#c3e7b3"
            }
        }

        handlePointerChange(element) {
            gsap.utils.toArray("circle", this.pointerState)[0].style.fill = "#93c47d"
            this.pointerState = element
            this.dragEnabled = false
            this.gsvg.style.cursor = "default"
            this.gsvg.style.touchAction = "auto"

            if (this.pointerState == this.plant) {
                this.farmGroup.style.cursor = "pointer"
            }
            else if (this.pointerState == this.move) {
                this.gsvg.style.touchAction = "pinch-zoom";/*lets pointer events work with mobile. only allowing pinch zoom incase user gets locked out*/
                this.dragEnabled = true
                this.gsvg.style.cursor = "move"
                this.farmGroup.style.cursor = "move"

            }
            gsap.utils.toArray("circle", this.pointerState)[0].style.fill = "#c3e7b3"
        }
        
        generateRandomIndices() {
            let arr = []
            for (let i = 0; i < self.plotArray.length; i++) {
                for (let j = 0; j < self.plotArray[0].length; j++) {
                    //console.log(i,j)
                    arr.push(i);
                    arr.push(j);
                }
            }

            let n = Math.floor(Math.random() * (850 - 150 + 1)) + 150

            let els = []
            let arrCopy = [...arr]
            for (let i = 0; i < n; i++) {
                let l = arrCopy.length;
                let int = Math.round(Math.random() * l)
                var temp;
                if (int % 2 == 0) {
                    if (int == l){//if int is the last element 
                        temp = [arrCopy[int-2], arrCopy[int-1]]
                        arrCopy.splice(int-2, 2)
                        els.push(temp)
                        
                    }
                    else {
                        temp = [arrCopy[int], arrCopy[int+1]]
                        arrCopy.splice(int, 2)
                        els.push(temp)
                    }
                }
                else {
                    temp = [arrCopy[int-1], arrCopy[int]]
                    arrCopy.splice(int-1, 2)
                    els.push(temp)
                }
                
            }
            return els
        }

        generateFlowerBeds() {
            let indices = this.generateRandomIndices()

            for (let index = 0; index < indices.length; index++) {
                let i = indices[index][0]
                let j = indices[index][1]
                gsap.set(this.plotArray[i][j], {visibility: "visible", scaleX: 0.22})
            }
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
            this.fillPlot()
            this.generateFlowerBeds()

            //setting colors
            gsap.set(this.gsvg, { backgroundColor: "rgb(33, 192, 96)" })
            gsap.utils.toArray("circle", this.plant)[0].style.fill = "#c3e7b3"
            gsap.utils.toArray("rect", this.beds)[0].style.fill = "#c3e7b3"

            //fill-box allows rotation about center
            gsap.set(this.farmGroup, { transformOrigin: "center", transformBox: "fill-box", rotate: 45, skewX: 165, skewY: 165 })
            gsap.set(this.farmGroup, { x: 125, y: 100 })

            //combine start pos
            gsap.set(this.largeCombineText, { x: 60, y: 90 })

            //harvest number init
            this.harvestTotalLarge.textContent = "0"
            gsap.set(this.harvestTotalLarge, { x: - this.harvestTotalLarge.getBBox().width / 2 })

            //large combine init
            var pt = this.gsvg.createSVGPoint()

            let largeCombineSnapPoints = []
            for (let i = 1; i < 11; i++) {
                //for (let i = 1; i < 20; i++) {
                pt.x = this.setup.plotWidth + this.largeCombine.getBBox().width - 3
                //pt.y = ((19 - i) * (this.plotIncrementHeight / 2)) + 20
                pt.y = (Math.floor((20 - i * 2) / 2) * (this.plotIncrementHeight / 2) * 2) + 20 //+20 for offset
                pt = pt.matrixTransform(this.farmGroup.getScreenCTM())
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())
                let temp = { x: pt.x, y: pt.y }
                largeCombineSnapPoints.push(temp)
            }

            this.largeCombineDraggable = Draggable.create(this.largeCombineText, {
                type: 'x, y',
                liveSnap: {
                    points: largeCombineSnapPoints,
                    radius: 50
                },
                onPress: function () {
                    if (self.pointerState == self.move) {
                        self.dragEnabled = false
                    }
                },
                onRelease: function() {
                    if (self.pointerState == self.move) {
                        self.dragEnabled = true
                    }
                }
            })

            //event listeners
            this.farmGroup.addEventListener("pointerdown", e => { this.hitTest(e) })

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())

            this.gsvg.addEventListener("pointerdown", e => this.startDrag(e))
            this.gsvg.addEventListener("pointermove", e => this.whileDrag(e))
            this.gsvg.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("playButton").addEventListener("pointerdown", e => this.handlePlay(largeCombineSnapPoints, this.largeCombineDraggable[0]))

            gsap.utils.toArray(".pointer").forEach(element => element.addEventListener("pointerdown", e => this.handlePointerChange(element)))
            gsap.utils.toArray(".grid").forEach(element => element.addEventListener("pointerdown", e => this.handleGridToggle(element)))
        }

    }
    return new farmClass(_els, _setup);
}