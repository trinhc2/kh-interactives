import { gsap } from "gsap/all"

export function zoomAPI(_els) {
    let self = {} as zoomClass

    class zoomClass {
        els: (SVGSVGElement)[]
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
        zoomControls: SVGSVGElement
        centerWidth = 0
        centerHeight = 0

        constructor(els) {
            self = this
            this.els = els
            this.gsvgu = els[0]
            //this.gsvgu = els[1]

            this.zoomIn = this.gsvgu.getElementById("zoomIn") as SVGSVGElement
            this.zoomOut = this.gsvgu.getElementById("zoomOut") as SVGSVGElement
            this.zoomControls = this.gsvgu.getElementById("zoomControls") as SVGSVGElement

            this.init()
        }
        handleZoomIn() {
            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let index = 0

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
                //console.log(this.fetchedSVG.viewBox, this.zoomIncrementX, this.zoomIncrementY, this.zoomLevel)
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
                //get current basebox - what center should be to get offset
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

        startDrag(e) {
            var pt = this.fetchedSVG.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.fetchedSVG.getScreenCTM().inverse())

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
            //return fetch('https://res.cloudinary.com/duim8wwno/image/upload/v1635449409/Zoom_kh7c7e.svg')
            //return fetch("http://127.0.0.1:8887/farmtwoAcreNoRaster.svg")
            return fetch("https://res.cloudinary.com/dg9cqf9zn/image/upload/v1659473813/barrels2_1_mbrlo2.svg")
                //return fetch("https://app.knowledgehook.com/Content/Images/6e2e3cac-30ed-ea11-974a-0050568c42b6/farmtwoacrenoraster.svg")
                .then(r => r.text())
                .then(text => {
                    el.innerHTML = text;
                    self.fetchedSVG = el.querySelector('svg')
                })
                .catch(console.error.bind(console));

        }

        calculateZoomIncrements() {
            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            const arr = [];
            const arr2 = []
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
            console.log("increment", this.zoomIncrementX, this.zoomIncrementY)
        }

        async init() {
            //gsap.set(this.zoomIn, {visibility: "hidden"})
            //gsap.set(this.zoomOut, {visibility: "hidden"})
            console.log(this.zoomControls.getBBox(), this.zoomControls.getBoundingClientRect())
            gsap.set(this.zoomControls, { x: 250 - this.zoomControls.getBBox().x - this.zoomControls.getBBox().width / 2, y: 450 - this.zoomControls.getBBox().y })
            //gsap.set(this.zoomControls, {x: 10})
            //gsap.to(this.zoomControls, {yPercent:-50, xPercent:-50})

            //gsap.set(this.zoomControls, {x: "100%"})
            await this.getSVG()// need this to finish because it sets the fetched svg

            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let svgBBox = this.fetchedSVG.getBoundingClientRect()
            console.log("fetched view box", this.fetchedSVG.viewBox["baseVal"])
            this.centerHeight = baseViewbox["height"] / 2
            this.centerWidth = baseViewbox["width"] / 2
            console.log(this.centerHeight, this.centerWidth)

            this.calculateZoomIncrements()

            gsap.set(this.fetchedSVG, { width: "inherit", height: "inherit" })


            //gsap.set(this.zoomIn, {x: 0 - this.zoomIn.getBBox().x, visibility: "visible"})
            //gsap.set(this.zoomOut, {x: 0 - this.zoomOut.getBBox().x + this.zoomOut.getBBox().width + 3, visibility: "visible"})

            this.fetchedSVG.addEventListener("pointerdown", e => this.startDrag(e))
            this.fetchedSVG.addEventListener("pointermove", e => this.whileDrag(e))
            this.fetchedSVG.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())
        }


    }
    return new zoomClass(_els);
}