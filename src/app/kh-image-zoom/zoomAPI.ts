import { gsap } from "gsap/all"

export interface zoomSetup {
    image: string
    backgroundColor: string
}

export function zoomAPI(_els, _setup) {
    let self = {} as zoomClass

    class zoomClass {
        els: (SVGSVGElement)[]
        setup: zoomSetup
        gsvg: SVGSVGElement
        gsvgu: SVGSVGElement
        fetchedSVG: any
        isDragging = false;
        dragStart = { x: 0, y: 0 }
        zoomLevel = 0
        zoomIncrementX = []
        zoomIncrementY = []
        zoomIn: SVGSVGElement
        zoomOut: SVGSVGElement
        center: SVGSVGElement
        ui: SVGSVGElement
        centerWidth = 0
        centerHeight = 0

        constructor(els, setup) {
            self = this
            this.els = els
            this.gsvgu = els[0]
            this.setup = setup
            this.fetchedSVG = els[1]
            //this.gsvgu = els[1]

            this.zoomIn = this.gsvgu.getElementById("zoomIn") as SVGSVGElement
            this.zoomOut = this.gsvgu.getElementById("zoomOut") as SVGSVGElement
            this.ui = this.gsvgu.getElementById("ui") as SVGSVGElement
            this.center = this.gsvgu.getElementById("center") as SVGSVGElement

            this.init()
        }

        handleZoomIn() {

            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let index = 11

            if (this.zoomLevel < 0) {
                index = Math.abs(this.zoomLevel) - 1 //use the index-1 if we are already zoomed out
            }
            else if (this.zoomLevel > 0) {
                index = this.zoomLevel + 11
            }
            if (this.zoomLevel < 10) {
                //get current basebox - what center should be to get offset
                let offsetX = (this.centerWidth - baseViewbox["width"] / 2)
                let offsetY = (this.centerHeight - baseViewbox["height"] / 2)

                //set new width and height
                let width = Math.max((baseViewbox["width"] - this.zoomIncrementX[index]), 5)
                let height = Math.max((baseViewbox["height"] - this.zoomIncrementY[index]), 5)

                //set new x and y
                let x = (this.centerWidth - width / 2) + (baseViewbox["x"] - offsetX)
                let y = (this.centerHeight - height / 2) + (baseViewbox["y"] - offsetY)

                let temp = `${x} ${y} ${width} ${height}`
                gsap.set(this.fetchedSVG, { attr: { viewBox: temp } });
                this.zoomLevel++
            }
        }

        handleZoomOut() {
            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let index = 0
            if (this.zoomLevel < 0) {
                index = Math.abs(this.zoomLevel)
            }
            else if (this.zoomLevel > 0) {
                index = this.zoomLevel + 11 - 1 //use the index-1 if we are already zoomed in 
            }
            if (this.zoomLevel > -10) {
                //get (current basebox - what center should be) to get offset
                let offsetX = baseViewbox["x"] - (this.centerWidth - baseViewbox["width"] / 2)
                let offsetY = baseViewbox["y"] - (this.centerHeight - baseViewbox["height"] / 2)

                //set new width and height
                let width = Math.max((baseViewbox["width"] + this.zoomIncrementX[index]), 5)
                let height = Math.max((baseViewbox["height"] + this.zoomIncrementY[index]), 5)

                //calculate new x and y
                let x = (this.centerWidth - width / 2) + (offsetX)
                let y = (this.centerHeight - height / 2) + (offsetY)

                let temp = `${x} ${y} ${width} ${height}`
                gsap.set(this.fetchedSVG, { attr: { viewBox: temp } });
                this.zoomLevel--
            }
        }
        
        handleCenter() {
            gsap.set(this.fetchedSVG, { attr: {viewBox: `0 0 ${this.centerWidth * 2} ${this.centerHeight*2}`}})
            this.zoomLevel = 0
        }

        startDrag(e) {
            var pt = this.fetchedSVG.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            console.log(pt)
            pt = pt.matrixTransform(this.fetchedSVG.getScreenCTM().inverse())
            console.log(pt)

            this.dragStart.x = pt.x
            this.dragStart.y = pt.y
            this.isDragging = true;
        }

        whileDrag(e) {
            if (this.isDragging) {
                let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
                var pt = this.fetchedSVG.createSVGPoint()
                pt.x = e.clientX
                pt.y = e.clientY
                pt = pt.matrixTransform(this.fetchedSVG.getScreenCTM().inverse())
                gsap.set(this.fetchedSVG, { attr: { viewBox: `${baseViewbox["x"] + (this.dragStart.x - pt.x)} ${baseViewbox["y"] + (this.dragStart.y - pt.y)} ${baseViewbox["width"]} ${baseViewbox["height"]}` } });
            }
        }

        endDrag(e) {
            this.isDragging = false;
        }

        getSVG() {
            //https://stackoverflow.com/questions/45240363/can-i-use-javascript-fetch-to-insert-an-inline-svg-in-the-dom
            let el = document.querySelector("#lowerRender")
            return fetch(this.setup.image)
                .then(r => r.text())
                .then(text => {
                    el.innerHTML = text;
                    self.fetchedSVG = el.querySelector('svg')
                })
                .catch(console.error.bind(console));

        }

        //pre calculating the zoom increments because doing it dynamically is not consistent with alternating zoom in and zoom out
        //storing the increments for zooming in and out in the same array, first 11 are for zooming out, last 11 are for zooming in
        calculateZoomIncrements() {
            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let lastWidth = baseViewbox["width"]
            let lastHeight = baseViewbox["height"]
            for (let i = 0; i < 11; i++) {
                let temp = lastWidth / 3;
                this.zoomIncrementX.push(temp);
                lastWidth += temp

                temp = lastHeight / 3;
                this.zoomIncrementY.push(temp);
                lastHeight += temp
            }

            lastWidth = baseViewbox["width"]
            lastHeight = baseViewbox["height"]
            for (let i = 0; i < 11; i++) {
                let temp = lastWidth / 3;
                this.zoomIncrementX.push(temp);
                lastWidth -= temp

                temp = lastHeight / 3;
                this.zoomIncrementY.push(temp);
                lastHeight -= temp
            }
        }

        async init() {
            gsap.set(this.ui, { x: 250 - this.ui.getBBox().x - this.ui.getBBox().width / 2, y: 450 - this.ui.getBBox().y })

            //await this.getSVG()// need this to finish because it sets the fetched svg to the class

            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]

            this.centerHeight = baseViewbox["height"] / 2
            this.centerWidth = baseViewbox["width"] / 2

            this.calculateZoomIncrements()

            gsap.set(this.fetchedSVG, { width: "inherit", height: "inherit" })

            gsap.set(document.getElementById("lowerRender"), {backgroundColor: this.setup.backgroundColor})

            this.fetchedSVG.addEventListener("pointerdown", e => this.startDrag(e))
            this.fetchedSVG.addEventListener("pointermove", e => this.whileDrag(e))
            this.fetchedSVG.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())
            this.gsvgu.getElementById("center").addEventListener("pointerdown", e => this.handleCenter())
        }

    } 
    return new zoomClass(_els, _setup);
}