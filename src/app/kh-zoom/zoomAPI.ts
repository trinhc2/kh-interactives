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
        zoomIncrementX:number
        zoomIncrementY:number
        zoomIn: SVGSVGElement
        zoomOut: SVGSVGElement

        constructor(els) {
            self = this
            this.els = els
            this.gsvgu = els[0]
            //this.gsvgu = els[1]

            this.zoomIn = this.gsvgu.getElementById("zoomIn") as SVGSVGElement
            this.zoomOut = this.gsvgu.getElementById("zoomOut") as SVGSVGElement

            this.init()
        }
        handleZoomIn() {
            console.log("call")
                let svgBBox = this.fetchedSVG.getBoundingClientRect()
                let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
                if (this.zoomLevel < 10) {
                    let x = (baseViewbox["x"] + this.zoomIncrementX / 2 - svgBBox.x)
                    let y = (baseViewbox["y"] + this.zoomIncrementY / 2 - svgBBox.y)
                    let width = Math.max((baseViewbox["width"] - this.zoomIncrementX),5)
                    let height = Math.max((baseViewbox["height"] - this.zoomIncrementY),5)
                    let temp = `${x} ${y} ${width} ${height}`
                    gsap.set(this.fetchedSVG, { attr: { viewBox: temp } });
                    this.zoomLevel++
                    console.log(this.zoomIncrementX, this.zoomIncrementY)
                }
                this.zoomIncrementX = baseViewbox["width"] / 3
                this.zoomIncrementY = baseViewbox["height"] / 3
        }

        handleZoomOut() {
            console.log("call")
                let svgBBox = this.fetchedSVG.getBoundingClientRect()
                let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
                if (this.zoomLevel > -10) {
                    let x = (baseViewbox["x"] - this.zoomIncrementX / 2 - svgBBox.x)
                    let y = (baseViewbox["y"] - this.zoomIncrementY / 2 - svgBBox.y)
                    let width = Math.max((baseViewbox["width"] + this.zoomIncrementX), 5)
                    let height = Math.max((baseViewbox["height"] + this.zoomIncrementY), 5)
                    let temp = `${x} ${y} ${width} ${height}`
                    gsap.set(this.fetchedSVG, {attr: { viewBox: temp } });
                    this.zoomLevel--
                    console.log(this.zoomIncrementX, this.zoomIncrementY)
                }

                this.zoomIncrementX = baseViewbox["width"] / 3
                this.zoomIncrementY = baseViewbox["height"] / 3
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
                        //return fetch("http://127.0.0.1:8887/farmPlotsRasteredFlowersMorePixel.svg")
                        return fetch("https://res.cloudinary.com/numbershapes/image/upload/v1658172000/farmPlotsRasteredAllFlowersMorePixel_b7n8pg.svg")
                            .then(r => r.text())
                            .then(text => {
                                el.innerHTML = text;
                                self.fetchedSVG = el.querySelector('svg')
                            })
                            .catch(console.error.bind(console));

        }

        async init() {
            gsap.set(this.zoomIn, {visibility: "hidden"})
            gsap.set(this.zoomOut, {visibility: "hidden"})
            await this.getSVG()// need this to finish because it sets the fetched svg

            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let svgBBox = this.fetchedSVG.getBoundingClientRect()
            console.log(svgBBox)

            gsap.set(this.zoomIn, {x: 0 - this.zoomIn.getBBox().x, visibility: "visible"})
            gsap.set(this.zoomOut, {x: 0 - this.zoomOut.getBBox().x + this.zoomOut.getBBox().width + 3, visibility: "visible"})

            this.zoomIncrementX = baseViewbox["width"] / 3
            this.zoomIncrementY = baseViewbox["height"] / 3

            this.fetchedSVG.addEventListener("pointerdown", e => this.startDrag(e))
            this.fetchedSVG.addEventListener("pointermove", e => this.whileDrag(e))
            this.fetchedSVG.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())
        }
        

    }
    return new zoomClass(_els);
}