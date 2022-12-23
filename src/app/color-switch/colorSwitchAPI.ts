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
        viewboxWidth = 500
        viewboxHeight = 750
        dotSpeed = -3
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
        equationClientWidth = 0
        equationPosition = 0
        equationIndex = 0
        currentBarArr = []
        galaxy: SVGSVGElement

        galaxyHit = false;


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
            this.galaxy = document.getElementById("galaxy") as unknown as SVGSVGElement
            //this.gsvgu = els[1]

            this.init()
        }

        handlePointerDown(e) {
            e.preventDefault()
            this.mousedown = true
            self.viewboxOffset += 170
            console.log(this.viewboxOffset, this.baroffset)
            //gsap.to(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset, duration: 1 })
            //gsap.to(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` }, duration:1 })

            if (self.viewboxOffset < self.viewboxHeight / 3) {
                //shifting entire viewbox first to make dot seem like its moving initially
                gsap.to(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset, duration: 1 })
                gsap.to(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` }, duration: 1 })
            }
            else if (self.viewboxOffset >= self.viewboxHeight / 3) {
                //if dot is moving then we can just translate the bars now
                gsap.to(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset, duration: 1 })
                self.baroffset += self.viewboxOffset - self.viewboxHeight / 3 
                self.viewboxOffset -= self.viewboxOffset - self.viewboxHeight / 3
                //self.dotSpeed = Math.min(self.dotSpeed * 1.03, self.maxSpeed)
            }

            if (!this.gameStarted) {
                this.gameStarted = true
                window.requestAnimationFrame(self.gameloop)
            }
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
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: "#C80D70", rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} x ${secondNum}`, fontSize: `20px`, userSelect: 'none', fill: "#ffffff" })
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
                gsap.set(section, { width: self.sectionWidth, height: self.sectionHeight, fill: "#C80D70", rx: 5, ry: 5 })
                group.appendChild(section)

                let sectionText = document.createElementNS(this.svgns, "text") as SVGTextElement
                gsap.set(sectionText, { x: 0, y: 0, fontFamily: 'Arial', fontWeight: 'bold', textContent: `${firstNum} x ${secondNum}`, fontSize: `20px`, userSelect: 'none', fill: "#ffffff" })
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
                //console.log(self.viewboxOffset, self.baroffset)

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
                        attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` },
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
                else {
                        if (self.viewboxOffset > -110) { //dont want the dot to be too below the screen
                            //"decelerate" dot
                            self.viewboxOffset += self.dotSpeed
                            gsap.to(self.gsvg.getElementById("bar"), { y: self.baroffset + self.viewboxOffset })
                            gsap.to(self.gsvg, { attr: { viewBox: `0 ${self.viewboxOffset} ${self.viewboxWidth} ${self.viewboxHeight}` } })
                        }

                    self.animateBar()

                    self.collisionTest()

                    self.checkGalaxyHit()

                    window.requestAnimationFrame(self.gameloop)
                }
            }
        }

        checkGalaxyHit() {
            if (Draggable.hitTest(self.dot, self.galaxy) && !this.galaxyHit) {
                self.galaxyHit = true
                console.log("hit")
                //if a bar goes off screen we remove it and generate a new one, we also update our what our currentBar "points" to
                self.dotText.textContent = self.currentBar.getAttribute("product")
                gsap.set(self.dotText, { x: 0 - self.dotText.getBBox().width / 2 })
                self.nextBar.innerHTML = ''
                self.generateBar(self.nextBar, self.bars[self.barsIndex++], self.baroffset + self.viewboxHeight)
                if (self.barsIndex >= 4) {
                    self.barsIndex = 0
                }
                gsap.to(self.galaxy, {transformOrigin: "center", scale: 0, duration : 0.5, onComplete: function () {
                    gsap.set(self.galaxy, { y: `-=${self.windowHeight}`, scale: 1 })
                    self.galaxyHit = false
                }})

                self.score++;
                self.scoreText.textContent = String(self.score)

                self.currentBarArr = gsap.utils.toArray("g", self.currentBar)
                self.equationIndex = 0
                self.equationPosition = 0

            }
        }

        collisionTest() {
            let collisions = 0
            self.collidedElement = []
            let goodCollision = false
            let index = 0

            for (let i = 0; i < self.currentBarArr.length; i++) {
                let element = self.currentBarArr[i]
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
                self.currentBarArr.forEach(element => {
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
            self.currentBarArr.forEach(element => {
                gsap.set(element, { x: `-=${self.barSpeed}` })
            })

            if (self.equationPosition <= self.equationClientWidth * -1) {
                //console.log(arr[self.equationIndex])
                gsap.set(self.currentBarArr[self.equationIndex], { x: self.viewboxWidth })
                self.equationPosition = 0;
                self.equationIndex++;
                if (self.equationIndex >= 5) {
                    self.equationIndex = 0
                }
            }

            self.equationPosition -= self.barSpeed


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

            self.currentBarArr = gsap.utils.toArray("g", self.currentBar)

            this.windowHeight = self.gsvg.getBoundingClientRect().height
            this.equationClientWidth = gsap.utils.toArray("g", self.currentBar)[0].getBoundingClientRect().width


            //this.generateBarRandom(this.nextBar, self.viewboxHeight)

            //this.generateBarRandom(this.currentBar)
            this.dotText.textContent = this.currentBar.getAttribute("product")
            gsap.set(this.dotText, { x: 0 - this.dotText.getBBox().width / 2 })


            gsap.set(this.galaxy, { x: this.viewboxWidth/2 - this.galaxy.getBBox().width/2, y: 0 - this.viewboxHeight / 2 - this.galaxy.getBBox().height/2})

            gsap.set(this.gsvg, { backgroundImage: "url(assets/Back.svg)" })

            console.log(this.currentBar.getAttribute("product"), this.nextBar.getAttribute("product"))

            document.addEventListener("pointerdown", e => this.handlePointerDown(e))
            document.addEventListener('keydown', event => {
                if (event.code === 'Space') {
                    this.handlePointerDown(event)
                }
            })

            window.addEventListener('resize', function (event) {
                self.windowHeight = self.gsvg.getBoundingClientRect().height
                self.equationClientWidth = gsap.utils.toArray("g", self.currentBar)[0].getBoundingClientRect().width
            })
            //this.gsvg.addEventListener("pointermove", e => this.handleMove(e))


        }


    }
    return new colorSwitchClass(_els);
}