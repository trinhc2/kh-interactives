import { gsap } from "gsap/all"

export interface windowSetup {
    images: string[]
}

export function windowAPI(els: SVGSVGElement, setup: windowSetup) {
    let self = {} as windowClass

    class windowClass {
        els: SVGSVGElement
        setup: windowSetup
        svgns = "http://www.w3.org/2000/svg";
        xOffset = 0
        imageReferences = []
        order = 0;

        constructor(els, setup){
            this.els = els
            this.setup = setup
            

            this.init()
        }

        handleNext(){
            if (this.order + 1 < this.imageReferences.length) {
                gsap.set(this.imageReferences[this.order + 1], {visibility: "visible"})
                this.order++
            }
        }

        handlePrevious(){
            if (this.order >= 0) {
                gsap.set(this.imageReferences[this.order], {visibility: "hidden"})
                this.order--
            }
        }

        init(){
            for (let i = 0; i < this.setup.images.length; i++) {
                let png = document.createElementNS(this.svgns, "image") as SVGImageElement
                gsap.set(png, { attr: {href: this.setup.images[i] }, height: "60px", x: this.xOffset, visibility: "hidden", y:150})
                this.imageReferences.push(png)
                this.els.appendChild(png)
                let pngBBox = png.getBBox() //get bbox after appending to svg

                this.xOffset += pngBBox.width+10
            }

            gsap.set(this.imageReferences[0], {visibility: "visible"})

            document.getElementById("next").addEventListener("pointerdown", () => this.handleNext())
            document.getElementById("previous").addEventListener("pointerdown", () => this.handlePrevious())
        }
    }
    return new windowClass(els, setup)
}