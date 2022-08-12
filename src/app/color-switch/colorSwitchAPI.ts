import { gsap, Draggable } from "gsap/all"


export function colorSwitchAPI(_els) {
    let self = {} as colorSwitchClass

    class colorSwitchClass {
        els: (SVGSVGElement)[]
        gsvg: SVGSVGElement
        gsvgu: SVGSVGElement
        dot: SVGSVGElement
        bar: SVGSVGElement
        mousedown = false
        viewboxOffset = 0
        baroffset = 0
        sectionWidth = 125
        sectionHeight = 30
        svgns = "http://www.w3.org/2000/svg";



        constructor(els) {
            self = this
            this.els = els
            this.gsvg = els[0]
            this.dot = document.getElementById("dot") as unknown as SVGSVGElement
            this.bar = document.getElementById("bar") as unknown as SVGSVGElement
            //this.gsvgu = els[1]

            this.init()
        }

        handlePointerDown(e){
            this.mousedown = true
            console.log(this.mousedown)
        }

        handlePointerUp(e){
            this.mousedown = false
        }

        gameloop(){
            if (self.mousedown){
                if (self.viewboxOffset < 120) {
                    gsap.set(self.gsvg.getElementById("bar"), {y: self.baroffset + self.viewboxOffset})
                    gsap.set(self.gsvg, {attr: {viewBox: `0 ${self.viewboxOffset} 500 500`}})
                    self.viewboxOffset+= 2
                }
                else if (self.viewboxOffset >= 120){
                    gsap.set(self.gsvg.getElementById("bar"), {y: self.baroffset +self.viewboxOffset})
                    self.baroffset += 2
                }
            }
            if (!self.mousedown){
                if (self.viewboxOffset > 0){
                    gsap.set(self.gsvg.getElementById("bar"), {y: self.baroffset + self.viewboxOffset})
                    gsap.set(self.gsvg, {attr: {viewBox: `0 ${self.viewboxOffset} 500 500`}})
                    self.viewboxOffset -= 2
                }
            }

            self.collisionTest()
            

            self.animateBar()


            window.requestAnimationFrame(self.gameloop)
        }

        collisionTest(){
            let arr = gsap.utils.toArray("g", self.bar)

            arr.forEach(element => {
                if (Draggable.hitTest(self.dot, element)){
                    console.log("hit", element)
                    self.baroffset = 0
                    self.viewboxOffset = 0
                }
            })
        }

        animateBar(){
            let arr = gsap.utils.toArray("g", self.bar)
            //let element = arr[0]
            arr.forEach(element => {
                gsap.set(element, {x: `-=2`})
                let bbox = element.getBoundingClientRect()
                let xbbox = element.getBBox()
                var pt = this.gsvg.createSVGPoint()
                pt.x = bbox.x + bbox.width
                pt.y = bbox.y
                pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())
                if (pt.x <= 0){
                    gsap.set(element, {x: 500 - xbbox.x})
                }
            });
            //console.log(arr)
        }


        init() {

            gsap.registerPlugin(Draggable)

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener("pointerup", e => this.handlePointerUp(e))

            window.requestAnimationFrame(self.gameloop)
            

        }


    }
    return new colorSwitchClass(_els);
}