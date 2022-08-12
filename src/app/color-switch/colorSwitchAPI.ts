import { gsap, Draggable } from "gsap/all"
import { generate } from "rxjs"


export function colorSwitchAPI(_els) {
    let self = {} as colorSwitchClass

    class colorSwitchClass {
        els: (SVGSVGElement)[]
        gsvg: SVGSVGElement
        gsvgu: SVGSVGElement
        dot: SVGSVGElement
        dotText: SVGTextElement
        bar: SVGSVGElement
        mousedown = false
        viewboxOffset = 0
        baroffset = 0
        sectionWidth = 125
        sectionHeight = 36
        svgns = "http://www.w3.org/2000/svg";
        colorDict = {0: "#92c47d", 1: '#f1c331', 2: '#38cdff', 3: "#e06666", 4: "#9955ff"}



        constructor(els) {
            self = this
            this.els = els
            this.gsvg = els[0]
            this.dot = document.getElementById("dot") as unknown as SVGSVGElement
            this.dotText = document.getElementById("dotText") as unknown as SVGTextElement
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

        generateBar(offset = 0){

            let nextNum = Math.floor(Math.random() * (4+ 1))
            for (let i = 0; i < 5; i++){

                let firstNum = Math.floor(Math.random() * (5 - 1 + 1) + 1)
                let secondNum = Math.floor(Math.random() * (4 - 1 + 1) + 1)
                let sum = firstNum + secondNum

                if (i == nextNum){
                    self.dotText.textContent = String(sum)
                }
                
                let group =  document.createElementNS(this.svgns, "g");

                let section = document.createElementNS(self.svgns, "rect")
                gsap.set(section, {width: self.sectionWidth, height: self.sectionHeight, fill: self.colorDict[i], rx: 5, ry: 5})
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, {x: 0, y: 0,fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} + ${secondNum}`, fontSize: `20px` })
                group.appendChild(sectionText)
                gsap.set(sectionText, {x: self.sectionWidth/2 - sectionText.getBBox().width/2, y: self.sectionHeight/2 + sectionText.getBBox().height/4})
                

                gsap.set(group, {attr: {sum: sum}, x: i * this.sectionWidth, y: this.sectionHeight - offset})
                self.bar.appendChild(group)
            }
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
                    if (element.getAttribute("sum") == self.dotText.textContent){
                        console.log("correct!")
                        self.bar.innerHTML = ''
                        console.log(self.viewboxOffset, self.baroffset)
                        self.generateBar(self.viewboxOffset + self.baroffset - 20)
                    }
                    else {
                        console.log("try again!")
                        self.baroffset -= this.viewboxOffset
                        self.viewboxOffset = 0
                    }

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

            this.generateBar()

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener("pointerup", e => this.handlePointerUp(e))

            window.requestAnimationFrame(self.gameloop)
            

        }


    }
    return new colorSwitchClass(_els);
}