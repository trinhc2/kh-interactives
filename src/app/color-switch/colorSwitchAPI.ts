import { gsap } from "gsap/all"


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
            let dot = self.dot.getBoundingClientRect()
            let bar = self.bar.getBoundingClientRect()
            if (dot.y <= bar.y + bar.height){
                self.baroffset = 0
                self.viewboxOffset = 0
            }
        }

        animateBar(){
            let arr = gsap.utils.toArray("g", self.bar)
            arr.forEach(element => {
                gsap.set(element, {x: `-=2`})
                let bbox = element.getBoundingClientRect()
                let xbbox = element.getBBox()
                if (bbox.x + bbox.width <= 0){
                    gsap.set(element, {x: 500+bbox.width - xbbox.x})
                }
            });
            //console.log(arr)
        }


        init() {

            this.gsvg.addEventListener("pointerdown", e => this.handlePointerDown(e))
            this.gsvg.addEventListener("pointerup", e => this.handlePointerUp(e))

            window.requestAnimationFrame(self.gameloop)
            

        }


    }
    return new colorSwitchClass(_els);
}