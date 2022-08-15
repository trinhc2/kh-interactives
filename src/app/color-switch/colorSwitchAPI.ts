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
        currentBar: SVGSVGElement
        nextBar: SVGSVGElement
        mousedown = false
        viewboxOffset = 0
        baroffset = 0
        sectionWidth = 125
        sectionHeight = 36
        svgns = "http://www.w3.org/2000/svg";
        colorDict = { 0: "#92c47d", 1: '#f1c331', 2: '#38cdff', 3: "#e06666", 4: "#9955ff" }
        viewboxWidth = 500
        viewboxHeight = 750
        dotSpeed = 5



        constructor(els) {
            self = this
            this.els = els
            this.gsvg = els[0]
            this.dot = document.getElementById("dot") as unknown as SVGSVGElement
            this.dotText = document.getElementById("dotText") as unknown as SVGTextElement
            this.bar = document.getElementById("bar") as unknown as SVGSVGElement
            this.currentBar = document.getElementById("currentBar") as unknown as SVGSVGElement
            this.nextBar = document.getElementById("nextBar") as unknown as SVGSVGElement
            //this.gsvgu = els[1]

            this.init()
        }

        handlePointerDown(e) {
            this.mousedown = true
            console.log(this.mousedown)
        }

        handlePointerUp(e) {
            this.mousedown = false
        }

        generateBar(barGroup, offset = 0) {

            let nextNum = Math.floor(Math.random() * (4 + 1))
            for (let i = 0; i < 5; i++) {

                let firstNum = Math.floor(Math.random() * (5 - 1 + 1) + 1)
                let secondNum = Math.floor(Math.random() * (4 - 1 + 1) + 1)
                let sum = firstNum + secondNum

                if (i == nextNum) {
                    gsap.set(barGroup, {attr: {sum: sum}})
                }

                let group = document.createElementNS(this.svgns, "g");

                let section = document.createElementNS(self.svgns, "rect")
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: self.colorDict[i], rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} + ${secondNum}`, fontSize: `20px`, userSelect: 'none' })
                group.appendChild(sectionText)
                gsap.set(sectionText, { x: self.sectionWidth / 2 - sectionText.getBBox().width / 2, y: self.sectionHeight / 2 + sectionText.getBBox().height / 4 })


                gsap.set(group, { attr: { sum: sum }, x: i * this.sectionWidth, y: this.sectionHeight - offset })
                barGroup.appendChild(group)
            }
        }

        gameloop() {
            if (self.mousedown) {
                if (self.viewboxOffset < self.viewboxHeight / 3) {
                    gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                    gsap.set(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                    self.viewboxOffset += self.dotSpeed
                }
                else if (self.viewboxOffset >= self.viewboxHeight / 3) {
                    gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                    self.baroffset += self.dotSpeed
                }
            }
            if (!self.mousedown) {
                if (self.viewboxOffset > 0) {
                    gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                    gsap.set(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                    self.viewboxOffset -= self.dotSpeed
                }
            }

            self.collisionTest()


            self.animateBar()

            self.checkBarOOB()

            window.requestAnimationFrame(self.gameloop)
        }

        checkBarOOB(){
            let bbox = self.currentBar.getBoundingClientRect()
            if (bbox.y >= 760) {
                self.dotText.textContent = self.nextBar.getAttribute("sum")
                self.currentBar.innerHTML = self.nextBar.innerHTML
                self.nextBar.innerHTML = ''
                console.log(self.viewboxOffset + self.baroffset - 20)
                self.generateBar(self.nextBar, self.baroffset + 750)

            }
        }

        collisionTest() {
            let arr = gsap.utils.toArray("g", self.currentBar)

            arr.forEach(element => {
                if (Draggable.hitTest(self.dot, element)) {
                    //console.log("hit", element)
                    if (element.getAttribute("sum") == self.dotText.textContent) {
                        console.log("correct!")
                        //self.bar.innerHTML = ''
                    }
                    else {
                        console.log("try again!")
                        //self.baroffset -= this.viewboxOffset
                        self.viewboxOffset = 0
                    }

                }
            })
        }

        animateBar() {
            let arr = gsap.utils.toArray("g", self.bar)
            //let element = arr[0]
            arr.forEach(subarr => {
                gsap.utils.toArray("g", subarr).forEach(element => {
                    gsap.set(element, { x: `-=2` })
                    let bbox = element.getBoundingClientRect()
                    let xbbox = element.getBBox()
                    var pt = self.gsvg.createSVGPoint()
                    pt.x = bbox.x + bbox.width
                    pt.y = bbox.y
                    pt = pt.matrixTransform(self.gsvg.getScreenCTM().inverse())
                    if (pt.x <= 0) {
                        gsap.set(element, { x: self.viewboxWidth - xbbox.x })
                    }
                });

            });
            //console.log(arr)
        }


        init() {

            gsap.registerPlugin(Draggable)

            this.generateBar(this.nextBar, self.viewboxHeight)

            this.generateBar(this.currentBar)
            this.dotText.textContent = this.currentBar.getAttribute("sum")

            console.log(this.currentBar.getAttribute("sum"), this.nextBar.getAttribute("sum"))

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener("pointerup", e => this.handlePointerUp(e))

            window.requestAnimationFrame(self.gameloop)


        }


    }
    return new colorSwitchClass(_els);
}