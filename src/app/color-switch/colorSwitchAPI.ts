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
        dotSpeed = 4
        dotBBox: any



        constructor(els) {
            self = this
            this.els = els
            this.gsvg = els[0]
            this.dot = document.getElementById("dot") as unknown as SVGSVGElement
            this.dotText = document.getElementById("dotText") as unknown as SVGTextElement
            this.bar = document.getElementById("bar") as unknown as SVGSVGElement
            this.currentBar = document.getElementById("currentBar") as unknown as SVGSVGElement
            this.nextBar = document.getElementById("nextBar") as unknown as SVGSVGElement
            this.dotBBox = this.dot.getBBox()
            //this.gsvgu = els[1]

            this.init()
        }

        handlePointerDown(e) {
            this.mousedown = true
        }

        handlePointerUp(e) {
            this.mousedown = false
        }

        handleMove(e) {
            //get point in svg space 
            var pt = this.gsvg.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

            //translate dot
            gsap.set(self.dot, {x: pt.x - self.dotBBox.x - self.dotBBox.width/2})
        }

        generateBar(barGroup, offset = 0) {

            //selecting random bar to set new dot text to
            let nextNum = Math.floor(Math.random() * (4 + 1))
            for (let i = 0; i < 5; i++) {

                let firstNum = Math.floor(Math.random() * (5 - 1 + 1) + 1)
                let secondNum = Math.floor(Math.random() * (4 - 1 + 1) + 1)
                let sum = firstNum + secondNum

                if (i == nextNum) {
                    gsap.set(barGroup, {attr: {sum: sum}})//set attributes for retrieval later
                }

                //creating individual bars
                let group = document.createElementNS(this.svgns, "g");

                let section = document.createElementNS(self.svgns, "rect")
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: self.colorDict[i], rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} + ${secondNum}`, fontSize: `20px`, userSelect: 'none' })
                group.appendChild(sectionText)
                let textBBox = sectionText.getBBox()
                gsap.set(sectionText, { x: self.sectionWidth / 2 - textBBox.width / 2, y: self.sectionHeight / 2 + textBBox.height / 4 })


                gsap.set(group, { attr: { sum: sum }, x: i * this.sectionWidth, y: 0 - offset })

                //appending to bar group
                barGroup.appendChild(group)
            }
        }

        gameloop() {
            if (self.mousedown) {
                if (self.viewboxOffset < self.viewboxHeight / 3) {
                    //shifting entire viewbox first to make dot seem like its moving initially
                    gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                    gsap.set(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                    self.viewboxOffset += self.dotSpeed
                }
                else if (self.viewboxOffset >= self.viewboxHeight / 3) {
                    //if dot is moving then we can just translate the bars now
                    gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                    self.baroffset += self.dotSpeed
                }
            }
            if (!self.mousedown) {
                if (self.viewboxOffset > 0) {
                    //"decelerate" dot
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
            if (bbox.y >= self.viewboxHeight) {
                //if a bar goes off screen we remove it and generate a new one, we also update our what our currentBar "points" to
                self.dotText.textContent = self.nextBar.getAttribute("sum")
                self.currentBar.innerHTML = self.nextBar.innerHTML
                self.nextBar.innerHTML = ''
                self.generateBar(self.nextBar, self.baroffset + self.viewboxHeight)

                gsap.set(this.gsvg.getElementById("line"), {y: 0 - (self.baroffset)})

            }
        }

        collisionTest() {
            let arr = gsap.utils.toArray("g", self.currentBar)

            arr.forEach(element => {
                if (Draggable.hitTest(self.dot, element)) {
                    //console.log("hit", element)
                    if (element.getAttribute("sum") == self.dotText.textContent) {
                        console.log("correct!")
                    }
                    else {
                        console.log("try again!")
                        //self.baroffset -= this.viewboxOffset
                        self.viewboxOffset = 0 //moves dot back to pre acceleration position
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
                    var pt = self.gsvg.createSVGPoint()
                    pt.x = bbox.x + bbox.width
                    pt.y = bbox.y
                    pt = pt.matrixTransform(self.gsvg.getScreenCTM().inverse())
                    if (pt.x <= 0) {
                        gsap.set(element, { x: self.viewboxWidth})
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

            let line = document.createElementNS(this.svgns, "line")
            gsap.set(line, { attr: { x1: 0, y1: 0 - this.viewboxHeight/2 + this.dotBBox.height/2, x2: this.viewboxWidth, y2: 0 - this.viewboxHeight/2 + this.dotBBox.height/2, stroke: "#000000" }, strokeWidth: 2 })
            this.gsvg.getElementById("line").appendChild(line)

            console.log(this.currentBar.getAttribute("sum"), this.nextBar.getAttribute("sum"))

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener("pointerup", e => this.handlePointerUp(e))
            this.gsvg.addEventListener("pointermove", e => this.handleMove(e))

            window.requestAnimationFrame(self.gameloop)


        }


    }
    return new colorSwitchClass(_els);
}