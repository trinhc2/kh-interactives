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

        constructor(els) {
            self = this
            this.els = els
            this.gsvgu = els[0]
            //this.gsvgu = els[1]

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
                        return fetch('https://res.cloudinary.com/duim8wwno/image/upload/v1635449409/Zoom_kh7c7e.svg')
                            .then(r => r.text())
                            .then(text => {
                                el.innerHTML = text;
                                self.fetchedSVG = el.querySelector('svg')
                            })
                            .catch(console.error.bind(console));

        }

        async init() {
            await this.getSVG()

            let baseViewbox = this.fetchedSVG.viewBox["baseVal"]
            let svgBBox = this.fetchedSVG.getBoundingClientRect()
            console.log(svgBBox)

            this.zoomIncrementX = baseViewbox["width"] / 10
            this.zoomIncrementY = baseViewbox["height"] / 10

            this.fetchedSVG.addEventListener("pointerdown", e => this.startDrag(e))
            this.fetchedSVG.addEventListener("pointermove", e => this.whileDrag(e))
            this.fetchedSVG.addEventListener("pointerup", e => this.endDrag(e))

            this.gsvgu.getElementById("zoomIn").addEventListener("pointerdown", e => this.handleZoomIn())
            this.gsvgu.getElementById("zoomOut").addEventListener("pointerdown", e => this.handleZoomOut())

            let zoomin = this.gsvgu.getElementById("zoomIn") as SVGSVGElement
            let zoomout = this.gsvgu.getElementById("zoomOut") as SVGSVGElement

            gsap.set(zoomin, {x: 0 - zoomin.getBBox().x})
            gsap.set(zoomout, {x: 0 - zoomout.getBBox().x + zoomout.getBoundingClientRect().width})
        }
        

    }
    return new zoomClass(_els);
}