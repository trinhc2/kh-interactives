import { CustomEase } from "gsap/all"
import { gsap, Draggable } from "gsap/all"


export function colorSwitchAPI(_els) {
    let self = {} as colorSwitchClass

    interface BarInput {
        target: number
        equations: number[][]
    }

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
        dotSpeed = 1
        maxSpeed = 4
        dotBBox: any
        badCollision = false
        goodCollision = false
        collidedElement = []
        gameStarted = false
        bars = []
        barsIndex = 2
        score = 0
        scoreText: SVGTextElement
        barSpeed = 1.5
        windowHeight = 0



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
            this.scoreText = document.getElementById("score") as unknown as SVGTextElement
            //this.gsvgu = els[1]

            this.init()
        }

        handlePointerDown(e) {
            e.preventDefault()
            this.mousedown = true
            this.dotSpeed = Math.max(this.dotSpeed, this.maxSpeed - 2)
            if (!this.gameStarted) {
                this.gameStarted = true
                window.requestAnimationFrame(self.gameloop)
            }
        }

        handlePointerUp(e) {
            e.preventDefault()
            this.mousedown = false
            this.dotSpeed = Math.min(-1, this.dotSpeed)

        }

        handleMove(e) {
            //get point in svg space 
            var pt = this.gsvg.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

            //making sure dot does not move out of vertical bounds
            if (pt.x <= self.dotBBox.width / 2) {
                pt.x = self.dotBBox.width / 2
            }
            else if (pt.x >= self.viewboxWidth - self.dotBBox.width / 2) {
                pt.x = self.viewboxWidth - self.dotBBox.width / 2
            }

            let xPos = pt.x - self.dotBBox.x - self.dotBBox.width / 2

            //translate dot
            gsap.set(self.dot, { x: xPos })
        }

        generateBarRandom(barGroup, offset = 0) {

            //selecting random bar to set new dot text to
            let nextNum = Math.floor(Math.random() * (4 + 1))
            for (let i = 0; i < 5; i++) {

                let firstNum = Math.floor(Math.random() * (9 - 2 + 1) + 2)
                let secondNum = Math.floor(Math.random() * (9 - 2 + 1) + 2)
                let product = firstNum * secondNum

                if (i == nextNum) {
                    gsap.set(barGroup, { attr: { product: product } })//set attributes for retrieval later
                }

                //creating individual bars
                let group = document.createElementNS(this.svgns, "g");

                let section = document.createElementNS(self.svgns, "rect")
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: self.colorDict[i], rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} x ${secondNum}`, fontSize: `20px`, userSelect: 'none' })
                group.appendChild(sectionText)
                let textBBox = sectionText.getBBox()
                gsap.set(sectionText, { x: self.sectionWidth / 2 - textBBox.width / 2, y: self.sectionHeight / 2 + textBBox.height / 4 })


                gsap.set(group, { attr: { product: product }, x: i * this.sectionWidth, y: 0 - offset })

                //appending to bar group
                barGroup.appendChild(group)
            }
        }

        generateBar(barGroup, barInput: BarInput, offset = 0) {

            //selecting random bar to set new dot text to
            gsap.set(barGroup, { attr: { product: barInput.target } })
            for (let i = 0; i < 5; i++) {

                let firstNum = barInput.equations[i][0]
                let secondNum = barInput.equations[i][1]
                let product = firstNum * secondNum

                //creating individual bars
                let group = document.createElementNS(this.svgns, "g");

                let section = document.createElementNS(self.svgns, "rect")
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: self.colorDict[i], rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} x ${secondNum}`, fontSize: `20px`, userSelect: 'none' })
                group.appendChild(sectionText)
                let textBBox = sectionText.getBBox()
                gsap.set(sectionText, { x: self.sectionWidth / 2 - textBBox.width / 2, y: self.sectionHeight / 2 + textBBox.height / 4 })


                gsap.set(group, { attr: { product: product }, x: i * this.sectionWidth, y: 0 - offset })

                //appending to bar group
                barGroup.appendChild(group)
            }
        }


        gameloop() {
            if (self.gameStarted) {
                if (self.badCollision) {
                    self.baroffset -= self.viewboxHeight / 3
                    self.viewboxOffset = 0
                    let previousFills = [] //storing previous fills

                    for (let i = 0; i < self.collidedElement.length; i++) {
                        let rect = self.collidedElement[i].childNodes[0]
                        previousFills.push(rect.style.fill)
                        gsap.set(rect, { fill: `rgb(246,0,0)` })
                    }

                    gsap.to(self.bar, { y: self.baroffset + self.viewboxOffset })
                    gsap.to(self.gsvg, {
                        attr: { viewBox: `0 0 ${self.viewboxWidth} ${self.viewboxHeight}` },
                        onComplete: function () {
                            self.badCollision = false
                            for (let i = 0; i < self.collidedElement.length; i++) {
                                let rect = self.collidedElement[i].childNodes[0]
                                gsap.set(rect, { fill: previousFills[i] })
                            }
                            window.requestAnimationFrame(self.gameloop)
                        }
                    }, "<")
                }
                else if (self.goodCollision) {

                    self.baroffset += 200

                    //gsap.set(self.gsvg.getElementById("line"), { y: `-=100` })
                    gsap.to(self.bar, 
                        { 
                            y: self.baroffset + self.viewboxOffset, 
                            duration: 0.3, 
                            ease:CustomEase.create("custom", "M0,0,C0.394,0.18,0.924,0.862,1,1"),
                            onComplete: function () {
                                self.goodCollision = false
                                window.requestAnimationFrame(self.gameloop)
                            },
                        }
                    )
                }
                else {
                    if (self.mousedown) {
                        if (self.viewboxOffset < self.viewboxHeight / 3) {
                            //shifting entire viewbox first to make dot seem like its moving initially
                            gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                            gsap.set(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                            self.viewboxOffset += self.dotSpeed
                            self.dotSpeed = Math.min(self.dotSpeed * 1.03, self.maxSpeed)
                        }
                        else if (self.viewboxOffset >= self.viewboxHeight / 3) {
                            //if dot is moving then we can just translate the bars now
                            gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                            self.baroffset += self.dotSpeed
                            self.dotSpeed = Math.min(self.dotSpeed * 1.03, self.maxSpeed)
                        }
                    }
                    if (!self.mousedown) {
                        if (self.viewboxOffset > -110) {
                            //"decelerate" dot
                            gsap.set(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                            gsap.set(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                            self.viewboxOffset += self.dotSpeed
                            self.dotSpeed -= 0.1
                            self.dotSpeed = Math.max(self.dotSpeed, -7)
                        }
                    }

                    self.collisionTest()

                    self.animateBar()

                    self.checkBarOOB()

                    window.requestAnimationFrame(self.gameloop)
                }
            }
        }

        checkBarOOB() {
            if (self.baroffset >= self.windowHeight * (self.score + 1)) {
                console.log("hit")
                //if a bar goes off screen we remove it and generate a new one, we also update our what our currentBar "points" to
                self.dotText.textContent = self.currentBar.getAttribute("product")
                gsap.set(self.dotText, { x: 0 - self.dotText.getBBox().width / 2 })
                self.nextBar.innerHTML = ''
                self.generateBar(self.nextBar, self.bars[self.barsIndex++], self.baroffset + self.viewboxHeight)
                if (self.barsIndex >= 4) {
                    self.barsIndex = 0
                }
                gsap.set(self.gsvg.getElementById("line"), { y: 0 - (self.baroffset) })

                self.score++;
                self.scoreText.textContent = String(self.score)

            }
        }

        collisionTest() {
            let arr = gsap.utils.toArray("g", self.currentBar)
            let collisions = 0
            self.collidedElement = []
            let goodCollision = false
            let index = 0

            for (let i = 0; i < arr.length; i++) {
                let element = arr[i]
                if (Draggable.hitTest(self.dot, element)) {
                    collisions++
                    self.collidedElement.push(element)
                    //console.log("hit", element)

                }
            }

            if (collisions >= 1) {
                for (let i = 0; i < self.collidedElement.length; i++) {
                    if (self.collidedElement[i].getAttribute("product") == self.dotText.textContent) {
                        goodCollision = true
                        index = i
                    }
                }
            }

            if (goodCollision) {
                console.log("correct!")
                arr.forEach(element => {
                    let rect = element.childNodes[0]
                    gsap.set(rect, { fill: self.collidedElement[index].childNodes[0].style.fill })
                });

                self.collidedElement[index].childNodes[0].style.fill = "rgb(0,246,0)"

                //swap next bar with current bar
                let temp = self.nextBar.innerHTML
                let tempAttribute = self.nextBar.getAttribute("product")

                self.nextBar.innerHTML = self.currentBar.innerHTML
                self.currentBar.innerHTML = temp
                self.currentBar.setAttribute("product", tempAttribute)

                self.maxSpeed++
                self.barSpeed = Math.min(self.barSpeed + 0.5, 4)

                self.goodCollision = true
            }
            else if (collisions >= 1 && !goodCollision) {
                console.log("try again!")
                //self.baroffset -= this.viewboxOffset
                //self.viewboxOffset = 0 //moves dot back to pre acceleration position
                self.badCollision = true
                self.maxSpeed = Math.min(5, self.maxSpeed)
                self.barSpeed = Math.min(2, self.barSpeed)
            }
        }

        animateBar() {
            let arr = gsap.utils.toArray("g", self.currentBar)
            //let element = arr[0]
            arr.forEach(element => {
                gsap.set(element, { x: `-=${self.barSpeed}` })
                let bbox = element.getBoundingClientRect()
                var pt = self.gsvg.createSVGPoint()
                pt.x = bbox.x + bbox.width
                pt.y = bbox.y
                pt = pt.matrixTransform(self.gsvg.getScreenCTM().inverse())
                if (pt.x <= 0) {
                    gsap.set(element, { x: self.viewboxWidth })
                }
            });

            //console.log(arr)
        }


        init() {

            gsap.registerPlugin(Draggable)
            gsap.registerPlugin(CustomEase)

            let bar1 = { target: 42, equations: [[7, 6], [6, 6], [5, 7], [8, 5], [8, 8]] } as BarInput
            let bar2 = { target: 48, equations: [[8, 9], [12, 3], [7, 7], [8, 8], [8, 6]] } as BarInput
            let bar3 = { target: 54, equations: [[8, 7], [9, 6], [7, 6], [8, 9], [8, 6]] } as BarInput
            let bar4 = { target: 63, equations: [[6, 8], [5, 12], [8, 8], [7, 9], [7, 6]] } as BarInput

            this.bars = [bar1, bar2, bar3, bar4]

            this.generateBar(this.nextBar, this.bars[1], self.viewboxHeight)
            this.generateBar(this.currentBar, this.bars[0])

            this.windowHeight = self.gsvg.getBoundingClientRect().height


            //this.generateBarRandom(this.nextBar, self.viewboxHeight)

            //this.generateBarRandom(this.currentBar)
            this.dotText.textContent = this.currentBar.getAttribute("product")
            gsap.set(this.dotText, { x: 0 - this.dotText.getBBox().width / 2 })

            let line = document.createElementNS(this.svgns, "line")
            gsap.set(line, { attr: { x1: 0, y1: 0 - this.viewboxHeight / 2 + this.dotBBox.height / 2, x2: this.viewboxWidth, y2: 0 - this.viewboxHeight / 2 + this.dotBBox.height / 2, stroke: "#000000" }, strokeWidth: 2 })
            this.gsvg.getElementById("line").appendChild(line)

            gsap.set(this.gsvg, { backgroundColor: "rgb(26,43,86)" })

            console.log(this.currentBar.getAttribute("product"), this.nextBar.getAttribute("product"))

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener("pointerup", e => this.handlePointerUp(e))
            document.addEventListener('keydown', event => {
                if (event.code === 'Space') {
                    this.handlePointerDown(event)
                }
            })

            document.addEventListener('keyup', event => {
                if (event.code === 'Space') {
                    this.handlePointerUp(event)
                }
            })

            window.addEventListener('resize', function(event) {
                self.windowHeight = self.gsvg.getBoundingClientRect().height
            })
            //this.gsvg.addEventListener("pointermove", e => this.handleMove(e))


        }


    }
    return new colorSwitchClass(_els);
}