import { gsap, Draggable } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  private tl: any
  private bundleLocation = [[58, 21, 1], [107, 23, -1], [21, 66, 1], [62, 86, -1], [117, 81, -1], [163, 71, 1], [8, 126, 1], [47, 151, -1], [88, 136, 1], [132, 136, -1]]

  private grapeLocation = [[2, 4], [14, 0], [25, 6], [13, 12], [0, 14], [9, 23], [22, 18], [11, 32], [22, 27], [19, 40]]
  private grapeLocationFlipped = [[23, 4], [11, 0], [0, 6], [12, 12], [25, 14], [16, 23], [3, 18], [14, 32], [3, 27], [6, 40]]
  /*
  private bundleLocation = [[60, 25, 1], [107, 27, -1], [23, 70, 1], [62, 90, -1], [117, 85, -1], [165, 75, 1], [10, 130, 1], [47, 155, -1], [90, 140, 1], [132, 140, -1]]

  private grapeLocation = [[0, 0], [12, -4], [23, 2], [11, 8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]
  private grapeLocationFlipped = [[23, 0], [11, -4], [0, 2], [12, 8], [25, 10], [16, 19], [3, 14], [14, 28], [3, 23], [6, 36]]
  */

  private startingNumber;
  private startingGrapes = 66
  private startingBundles = 36

  private globalScale = 0.5

  //#region slider variables
  num: SVGSVGElement
  numValue: number
  sliderControls: SVGSVGElement
  numberDisplay: SVGSVGElement
  buttons: SVGSVGElement
  sliderBar: SVGSVGElement
  slider: SVGSVGElement
  maxText: SVGSVGElement
  goButton: SVGSVGElement
  sliderOpen = false;
  increment: number
  max = 500;
  min = 0
  //#endregion

  animationFinished = false;
  firstTimeOpen = true;

  public constructor(gsvg: SVGSVGElement) {
    this.gsvg = gsvg
    this.tl = gsap.timeline()

    this.num = this.findElement("num")
    this.sliderControls = this.findElement("sliderControls")
    this.numberDisplay = this.findElement("numberDisplay")
    this.buttons = this.findElement("buttons")
    this.sliderBar = this.findElement("sliderBar")
    this.slider = this.findElement("slider")
    this.maxText = this.findElement("maxText")
    this.goButton = this.findElement("goButton")

    this.startingNumber = this.startingBundles * 10 + this.startingGrapes
    this.init()
  }

  private findElement(id: string): SVGSVGElement {
    return this.gsvg.getElementById(id) as SVGSVGElement
  }

  bringToFront(obj) {
    let parent = obj.parentElement
    parent.removeChild(obj);
    parent.appendChild(obj);
  }

  redrawElements(arr) {
    arr.slice().reverse().forEach(element => {
      this.bringToFront(element)
    })
  }

  private createGrapeBundle(x, y, scale, flip): SVGSVGElement {
    let bundle = document.createElementNS(svgns, 'g')
    let bbox = this.findElement('grape').getBBox()

    for (let i = 0; i < this.grapeLocation.length; i++) {
      let use = document.createElementNS(svgns, 'use')
      let newX;
      let newY;

      if (flip) {
        newX = -bbox.x + this.grapeLocationFlipped[i][0] + x
        newY = -bbox.y + this.grapeLocationFlipped[i][1] + y
      }
      else {
        newX = -bbox.x + this.grapeLocation[i][0] + x
        newY = -bbox.y + this.grapeLocation[i][1] + y
      }

      gsap.set(use, { attr: { href: "#grape" }, x: newX, y: newY })
      bundle.appendChild(use)
    }

    gsap.set(bundle, { scale: scale })

    this.redrawElements(Array.from(bundle.children))
    return bundle as SVGSVGElement
  }

  private createVine(x, y, scale) {
    let vine = document.createElementNS(svgns, 'g')

    let use = document.createElementNS(svgns, 'use')
    let vinebbox = this.findElement('emptyVine').getBBox()
    gsap.set(use, { attr: { href: "#emptyVine" }, x: -vinebbox.x + x, y: -vinebbox.y + y, opacity: 0 })
    vine.appendChild(use)

    let bundles = document.createElementNS(svgns, 'g')

    for (let i = 0; i < this.bundleLocation.length; i++) {

      if (this.bundleLocation[i][2] == -1) {
        let grapeBundle = this.createGrapeBundle(x, y, 1, true)
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1], visibility: "hidden" })
        bundles.appendChild(grapeBundle)
      }
      else {
        let grapeBundle = this.createGrapeBundle(x, y, 1, false)
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1], visibility: "hidden" })
        bundles.appendChild(grapeBundle)
      }
    }
    gsap.set(vine, { scale: scale })
    vine.appendChild(bundles)

    return vine
  }

  private playRegroup() {

    this.sliderControls.style.display = "none";
    this.sliderOpen = false

    const self = this

    //animating grapes
    let leafBBox = this.findElement('leaves').getBBox()
    let columnCounter = 0

    let bundlesBBox = this.findElement('bundles').getBBox()
    let xSpacing = bundlesBBox.x + bundlesBBox.width + 10
    let ySpacing = 70
    for (let i = 0; i < Math.floor(this.startingGrapes / 10); i++) {

      let group = document.createElementNS(svgns, 'g')

      let leaves = document.createElementNS(svgns, 'use')
      gsap.set(leaves, { attr: { href: "#leaves" }, x: (xSpacing + (-leafBBox.x - leafBBox.width / 4) * this.globalScale), y: ySpacing + (-leafBBox.height / 3 - leafBBox.y) * this.globalScale, scale: this.globalScale, opacity: 0 })
      group.appendChild(leaves)

      let bundle = this.createGrapeBundle(0, 0, 0.5, false)
      gsap.set(bundle, { x: xSpacing, y: ySpacing, visibility: "hidden" })
      group.appendChild(bundle)

      this.findElement('bundles').appendChild(group) //change to bundles?
      this.tl.to(leaves, { opacity: 1, duration: 0.5 })

      for (let j = 0; j < 10; j++) {

        let grape = this.findElement('grapes').children[i * 10 + j] as SVGSVGElement
        let grapeBBox = grape.getBBox()
        let newX = -grapeBBox.x * 0.5 + this.grapeLocation[j][0] * 0.5 + xSpacing
        let newY = -grapeBBox.y * 0.5 + this.grapeLocation[j][1] * 0.5 + ySpacing

        this.tl.to(grape, {
          x: newX, y: newY, duration: "1.2", onComplete: function () {
            gsap.set(bundle.children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
          }
        }, "<+=0.1")
      }
      ySpacing += bundle.getBBox().height * this.globalScale + 10

      columnCounter++
      if (columnCounter % 5 == 0 || i == Math.floor(this.startingGrapes / 10) - 1) {
        xSpacing += bundle.getBBox().width * self.globalScale + 10
        ySpacing = 70
      }
      this.tl.set(this.findElement('grapes'), { delay: 0 }) //pause slight pause after each row animation
    }

    //animating bundles
    columnCounter = 0;
    xSpacing = 0
    for (let i = 0; i < Math.floor(this.findElement('bundles').children.length / 10); i++) {
      let vines = this.createVine(xSpacing, ySpacing, this.globalScale)
      let vinesEls = gsap.utils.toArray("g", vines.children[1]);
      this.gsvg.appendChild(vines)

      this.tl.to(vines.children[0], { opacity: 1, duration: 1, delay: 0.25 })
      for (let j = 0; j < 10; j++) {
        let bundle = this.findElement('bundles').children[i * 10 + j] as SVGSVGElement
        let bundleBBox = bundle.getBBox()

        //let newX = -bundleBBox.x + (this.bundleLocation[j][0] * 0.5 + xSpacing)
        //let newY = -bundleBBox.y + (this.bundleLocation[j][1] * 0.5 + ySpacing)
        let newX = -bundleBBox.x - bundleBBox.width + xSpacing + ((bundle.children[1] as SVGSVGElement).getBBox().width + this.bundleLocation[j][0]) * 0.5
        let newY = -bundleBBox.y - bundleBBox.height + ySpacing + ((bundle.children[1] as SVGSVGElement).getBBox().height + this.bundleLocation[j][1]) * 0.5


        this.tl.to(bundle, {
          x: newX, y: newY, duration: "1.2", onComplete: function () {
            gsap.set(vinesEls[j], { visibility: 'visible', onComplete: function () { bundle.remove(); } })
          }
        }, "<+=0.1")
      }
      ySpacing += vines.getBBox().height * this.globalScale + 15
      columnCounter++
      if (columnCounter % 3 == 0 || i == Math.floor(this.findElement('bundles').children.length / 10) - 1) {
        xSpacing += vines.getBBox().width * this.globalScale + 15
        ySpacing = 70
      }
    }
    this.tl.set(this.findElement('grapes'), { delay: 0 }) //pause slight pause after each row animation

    //animating remaining bundles
    let remainingBundles = Array.from(self.findElement('bundles').children)
    columnCounter = 0;
    ySpacing = 70
    for (let i = Math.floor(this.findElement('bundles').children.length / 10) * 10; i < remainingBundles.length; i++) {
      let bundle = remainingBundles[i] as SVGSVGElement
      let bundleBBox = bundle.getBBox()

      let newX = -bundleBBox.x + xSpacing
      let newY = -bundleBBox.y + ySpacing

      this.tl.to(bundle, { x: newX, y: newY, duration: "1" }, "<+=0.1")

      ySpacing += bundle.getBBox().height * this.globalScale + 20

      columnCounter++
      if (columnCounter % 5 == 0 || i == remainingBundles.length - 1) {
        xSpacing += bundleBBox.width * self.globalScale + 20
        ySpacing = 70
      }
    }

    //animating remaining grapes
    columnCounter = 0
    xSpacing += 20
    let remainingGrapes = Array.from(self.findElement('grapes').childNodes)
    for (let i = Math.floor(remainingGrapes.length / 10) * 10; i < remainingGrapes.length; i++) {
      let grape = remainingGrapes[i] as SVGSVGElement;
      let grapeBBox = grape.getBBox()
      let newX = -grapeBBox.x * 0.5 + xSpacing
      self.tl.to(grape, { x: newX, duration: "1.2" }, "<+=0.1")
      columnCounter++
      if (columnCounter % 5 == 0 || i == remainingGrapes.length - 1) {
        xSpacing += grapeBBox.width * self.globalScale
      }
    }
    this.tl.to(this.findElement('grapes'), {
      onComplete: function () {
        if (self.numValue == self.startingNumber) {
          alert("Correct!")
        }
        else {
          alert("Try again!")
        }
      }
    })
  }

  //#region SLIDER FUNCTIONS
  inputFieldPressed() {
    if (!this.sliderOpen && !this.animationFinished) {
      if (this.firstTimeOpen){
        const self = this
        let start = self.findElement('slider').getBoundingClientRect().x
        gsap.to(this.findElement("pointerHand"), {x:"+=50", yoyo:true, repeat: 1, delay: 0.5, duration: 2, onComplete: () => {gsap.set(this.findElement('pointerHand'), {visibility: "hidden"})}})
        gsap.to(this.findElement('slider'), {x:"+=50", yoyo: true, repeat: 1, delay: 0.5, duration: 2, onUpdate: function() {
          self.num.textContent = String(Math.round((self.findElement('slider').getBoundingClientRect().x - start)/ self.increment))
          gsap.set(self.num, { x: -(self.num.getBBox().width / 2) })
        }})
      }
      if (this.num.style.display == "none") {
        this.num.textContent = String(this.min)
        this.numValue = this.min
        this.num.style.display = "block"
      }
      gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
      this.sliderControls.style.display = "block";
      this.sliderOpen = true;
    }
    else {
      this.sliderControls.style.display = "none";
      this.sliderOpen = false;
    }
  }

  buttonPressed(button) {
    let value;
    if (button.id == "largeInc") {
      value = 5
    }
    else if (button.id == "smallInc"){
      value = 1
    }
    else if (button.id == "smallDec"){
      value = -1
    }
    else if (button.id == "largeDec"){
      value = -5
    }
    let newNumber = parseInt(this.num.textContent) + value
    if (newNumber > this.max) {
      newNumber = this.max
    }
    else if (newNumber < this.min) {
      newNumber = this.min
    }
    if (newNumber <= this.max && newNumber >= this.min) {
      this.sliderValueHasBeenUpdated(newNumber)
    }
  }

  sliderValueHasBeenUpdated(value) {
    this.num.textContent = value
    this.numValue = value

    gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
    gsap.set(this.slider, { x: this.increment * (value - this.min) })
  }

  addEventListenersAndInteractivity() {

    this.numberDisplay.addEventListener("pointerdown", event => this.inputFieldPressed())

    for (let i = 0; i < this.buttons.children.length; i++) {
      this.buttons.children[i].addEventListener("pointerdown", event => this.buttonPressed(this.buttons.children[i]))
    }

    //Initializing draggables, controller and slider
    var controllerDraggable = Draggable.create(this.sliderControls, {
      type: 'x,y',
      //bounds: this.gsvg
    })

    const self = this

    Draggable.create(this.slider, {
      type: 'x',
      bounds: this.sliderBar,
      cursor: "pointer",
      onPress: function () {
        //disable controller drag if we are dragging slider
        controllerDraggable[0].disable()
      },
      onDrag: function () {
        self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.min))
      },
      onDragEnd: function () {
        controllerDraggable[0].enable()
      }

    })

  }

  restart() {
    Array.from(this.findElement('grapes').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('leafGroup').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('bundles').childNodes).forEach(e => e.remove())
    this.animationFinished = false
    this.sliderOpen = false
    this.sliderValueHasBeenUpdated(this.min);

    let grapes = this.findElement('grapes')
    let bbox = this.findElement('grape').getBBox()

    let xSpacing = 240
    for (let i = 0; i < 6; i++) {
      let ySpacing = 75
      for (let j = 0; j < 5; j++) {
        if (i == 5 && j == 2) {
          break;
        }
        let use = document.createElementNS(svgns, 'use')
        gsap.set(use, { attr: { href: "#grape" }, x: -bbox.x + xSpacing, y: -bbox.y + ySpacing })
        grapes.appendChild(use)
        ySpacing += 20
      }
      xSpacing += 20

    }

    gsap.set(this.findElement('grapes'), { x: 0 })

  }

  private init(): void {

    gsap.registerPlugin(Draggable)

    //calculating increments for slider
    let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width) - 1
    this.increment = barWidth / (this.max - this.min);

    gsap.set(this.sliderControls, { display: "none" })
    this.sliderOpen = false;
    gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
    //gsap.set(this.num, { display: "none" })

    //setting slider max and mins and repositioning the max
    this.gsvg.getElementById("maxText").textContent = String(this.max)
    gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
    this.gsvg.getElementById("minText").textContent = String(this.min)

    let leaves = document.createElementNS(svgns, 'use')
    gsap.set(leaves, { attr: { href: "#leaves" }, opacity: 0 })
    this.findElement('leafGroup').appendChild(leaves)

    let xSpacing = 150
    let ySpacing = 70

    let tempBundle = this.createGrapeBundle(0, 0, this.globalScale, false)
    this.gsvg.appendChild(tempBundle)
    gsap.set(tempBundle, {visibility: "hidden"})
    let bundleBBox = tempBundle.getBBox()

    let leafBBox = this.findElement('leaves').getBBox()
    for (let i = 0; i < this.startingBundles; i++) {
      let group = document.createElementNS(svgns, 'g')
      if (i % 5 == 0 && i > 0) {
        xSpacing += bundleBBox.width * this.globalScale + 5
        ySpacing = 70
      }
      let leaves = document.createElementNS(svgns, 'use')
      gsap.set(leaves, { attr: { href: "#leaves" }, x: (-bundleBBox.x + xSpacing + (-leafBBox.x - leafBBox.width / 4) * this.globalScale), y: ySpacing - bundleBBox.x + (-leafBBox.height / 3 - leafBBox.y) * this.globalScale, scale: this.globalScale })
      group.appendChild(leaves)

      let bundle = this.createGrapeBundle(xSpacing, ySpacing, this.globalScale, false)
      gsap.set(bundle, { visibility: "visible" })

      group.appendChild(bundle)
      this.findElement('bundles').appendChild(group)
      ySpacing += bundleBBox.height * this.globalScale + 10
    }

    let grapes = this.findElement('grapes')
    let grapeBBox = this.findElement('grape').getBBox()

    xSpacing += 50
    ySpacing = 70
    for (let i = 0; i < this.startingGrapes; i++) {
      if (i % 5 == 0) {
        xSpacing += grapeBBox.width * this.globalScale
        ySpacing = 70
      }
      let temp = document.createElementNS(svgns, 'use')
      gsap.set(temp, { attr: { href: "#grape" }, x: (-grapeBBox.x * 0.5 + xSpacing), y: (-grapeBBox.y * 0.5 + ySpacing), scale: 0.5 })
      this.findElement('grapes').appendChild(temp)
      ySpacing += grapeBBox.height * this.globalScale
    }

    this.goButton.addEventListener("pointerdown", e => this.playRegroup());
    this.findElement('restart').addEventListener("pointerdown", () => this.restart())

    const self = this
    this.gsvg.addEventListener("pointerdown", (event) => {
      if (self.sliderOpen && event.target == this.gsvg) {
        self.sliderControls.style.display = "none";
        self.sliderOpen = false;
      }
    })

    this.addEventListenersAndInteractivity()
    //this.gsvg.appendChild(this.createVine(0,0,0.5))
    //this.gsvg.appendChild(this.createGrapeBundle(250,250,1,false))
    //this.gsvg.appendChild(this.createGrapeBundle(250,250,0.5,false))

    //this.gsvg.appendChild(this.createVine(250,250,1))
    //this.gsvg.appendChild(this.createVine(250,250,0.5))

    gsap.set(this.findElement('displayBox'), {transformOrigin: "center"})
    gsap.to(this.findElement('displayBox'), {scale: '+=0.2', yoyo: true, repeat: 5, delay: 1})
  }
}