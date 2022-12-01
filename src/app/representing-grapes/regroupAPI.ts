import { gsap, Draggable } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  private tl: any

  private bundleLocation = [[58, 21, 1], [107, 23, -1], [21, 66, 1], [62, 86, -1], [117, 81, -1], [163, 71, 1], [8, 126, 1], [47, 151, -1], [88, 136, 1], [132, 136, -1]]
  private grapeLocation = [[2, 4], [14, 0], [25, 6], [13, 12], [0, 14], [9, 23], [22, 18], [11, 32], [22, 27], [19, 40]]
  private grapeLocationFlipped = [[23, 4], [11, 0], [0, 6], [12, 12], [25, 14], [16, 23], [3, 18], [14, 32], [3, 27], [6, 40]]

  private startingNumber;
  private startingGrapes = 26 //26
  private startingBundles = 26

  private globalScale = 0.5

  private regroupSpacingX = 0;

  //#region slider variables
  num: SVGSVGElement
  numValue: number
  sliderControls: SVGSVGElement
  controllerDraggable: any
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

  private sumDecomposeTexts(textArr) {
    if (textArr.length > 0) {
      let total = textArr[0]
      let totalTextX = total.getAttribute('xPos')
      let totalTextY = total.getAttribute('yPos')
      for (let i = 1; i < textArr.length; i++) {
        let currentText = textArr[i] as SVGSVGElement;

        this.tl.to(currentText, {
          x: totalTextX, y: totalTextY, onComplete: () => {
            total.textContent = String(parseInt(total.textContent) + parseInt(currentText.textContent))
            currentText.remove()
          }
        })
      }
    }
  }

  private groupPlaceValues(total, value) {
    this.tl.to(value, {
      x: total.getAttribute('xPos'), y: total.getAttribute('yPos'), delay: 0.1, onComplete: () => {
        if (total != value) {
          total.textContent = String(parseInt(total.textContent) + parseInt(value.textContent))
          value.remove()
        }
      }
    })
  }

  private decomposeHelper(array, textContent) {
    for (let i = 0; i < array.length; i++) {
      let currentEl = array[i] as SVGSVGElement
      gsap.set(currentEl, { transformOrigin: 'center' })

      let elementBBox = currentEl.getBoundingClientRect()
      let pt = this.gsvg.createSVGPoint();
      pt.x = elementBBox.x
      pt.y = elementBBox.y
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      let elementText = document.createElementNS(svgns, "text")
      gsap.set(elementText, { fontFamily: 'Arial', textContent: textContent, fontSize: 16, fontWeight: 'bold', alignmentBaseline: 'text-before-edge' })

      if (textContent == "100") {
        this.findElement('hundredsText').appendChild(elementText)
      }
      else if (textContent == "10") {
        this.findElement('tensText').appendChild(elementText)
      }
      else {
        this.findElement('onesText').appendChild(elementText)
      }

      elementBBox = currentEl.getBBox()

      this.tl.to(currentEl, { scale: 0, duration: 0.5 })

      let textX, textY;
      if (textContent != "10") {
        textX = pt.x + elementBBox.width / 2 * this.globalScale - elementText.getBBox().width / 2
        textY = pt.y + elementBBox.height / 2 * this.globalScale - elementText.getBBox().height / 2
      }
      else {
        textX = pt.x + elementBBox.width / 2 - elementText.getBBox().width / 2
        textY = pt.y + elementBBox.height / 2 - elementText.getBBox().height / 2
      }

      gsap.set(elementText, {
        attr: { xPos: textX, yPos: textY },
        x: textX, y: textY, transformOrigin: 'center', scale: 0, onComplete: function () {
          //currentEl.remove()
        }
      })
      this.tl.to(elementText, { scale: 1 })
    }
  }

  private decompose() {
    //decomposing the elements into place values
    let remainingVines = Array.from(this.findElement('vines').childNodes)
    let remainingBundles = Array.from(this.findElement('bundles').childNodes)
    let remainingGrapes = Array.from(this.findElement('grapes').childNodes)

    this.decomposeHelper(remainingVines, "100")
    this.decomposeHelper(remainingBundles, "10")
    this.decomposeHelper(remainingGrapes, "1")

    //grouping/summing the elements
    let hundredsTextArr = this.findElement('hundredsText').children
    let tensTextArr = this.findElement('tensText').children
    let onesTextArr = this.findElement('onesText').children

    this.sumDecomposeTexts(hundredsTextArr);
    this.sumDecomposeTexts(tensTextArr);
    this.sumDecomposeTexts(onesTextArr)

    let displayBBox = this.findElement('displayBox').getBBox()

    let total;

    if (hundredsTextArr.length > 0) {
      total = hundredsTextArr[0] as SVGSVGElement
    }
    else if (tensTextArr.length > 0) {
      total = tensTextArr[0] as SVGSVGElement
    }
    else {
      total = onesTextArr[0] as SVGSVGElement
    }
    let ten = tensTextArr[0]
    let one = onesTextArr[0]
    this.tl.to(ten, {y: total.getAttribute('yPos'), delay: 0.1})
    this.tl.to(one, {y: total.getAttribute('yPos')}, "<+=0.1")
    this.groupPlaceValues(total, ten)
    this.groupPlaceValues(total, one)

    let totalBBox = total.getBBox()
    this.tl.to(total, { x: displayBBox.x + displayBBox.width / 2 - totalBBox.width / 2, y: displayBBox.y + displayBBox.height + 40, delay: 0.1 })

    const self = this

    this.tl.to(this.findElement('grapes'), {
      onComplete: function () {
        if (self.numValue == self.startingNumber) {
          alert("Correct!")
        }
        else {
          self.tl.to(self.num, {x: '-=5', yoyo:true, repeat: 1, duration: 0.1})
          self.tl.to(self.num, {x: '+=5', yoyo:true, repeat: 1, duration: 0.1})
          self.tl.to(self.num, {x: '-=5', yoyo:true, repeat: 1, duration: 0.1})
          //alert("Try again!")
        }
      }
    })
  }

  animateRemainingEls(elementArr, timeline, offset, type){
    let columnCounter = 0;
    let ySpacing = 70
    for (let i = Math.floor(elementArr.length / 10) * 10; i < elementArr.length; i++) {
      let currentEl = elementArr[i] as SVGSVGElement
      let currentElBBox = currentEl.getBBox()

      let newX, newY
      if (type == "grapes") {
        newX = -currentElBBox.x * this.globalScale + this.regroupSpacingX
        newY = -currentElBBox.y * this.globalScale + ySpacing
      }
      else {
        newX = -currentElBBox.x + this.regroupSpacingX
        newY = -currentElBBox.y + ySpacing
      }

      timeline.to(currentEl, { x: newX, y: newY, duration: "1" }, "<+=0.09")

      ySpacing += currentEl.getBBox().height * this.globalScale + offset

      columnCounter++
      if (columnCounter % 5 == 0 || i == elementArr.length - 1) {
        this.regroupSpacingX += currentElBBox.width * this.globalScale + offset
        ySpacing = 70
      }
    }
  }
  private playRegroup() {

    this.sliderControls.style.display = "none";
    this.sliderOpen = false

    const self = this

    let timeline = gsap.timeline({ onComplete: this.decompose, callbackScope: self })

    //animating grapes
    let leafBBox = this.findElement('leaves').getBBox()
    let columnCounter = 0

    let bundlesBBox = this.findElement('bundles').getBBox()
    this.regroupSpacingX = bundlesBBox.x + bundlesBBox.width + 10
    let ySpacing = 70
    for (let i = 0; i < Math.floor(this.startingGrapes / 10); i++) {

      let group = document.createElementNS(svgns, 'g')

      let leaves = document.createElementNS(svgns, 'use')
      let leafX = (this.regroupSpacingX + (-leafBBox.x - leafBBox.width / 4) * this.globalScale)
      let leafY = ySpacing + (-leafBBox.height / 3 - leafBBox.y) * this.globalScale
      gsap.set(leaves, { attr: { href: "#leaves" }, x: leafX, y: leafY, scale: this.globalScale, opacity: 0 })
      group.appendChild(leaves)

      let bundle = this.createGrapeBundle(0, 0, 0.5, false)
      gsap.set(bundle, { x: this.regroupSpacingX, y: ySpacing, visibility: "hidden" })
      group.appendChild(bundle)

      this.findElement('bundles').appendChild(group)
      timeline.to(leaves, { opacity: 1, duration: 0.5 })

      for (let j = 0; j < 10; j++) {

        let grape = this.findElement('grapes').children[i * 10 + j] as SVGSVGElement
        let grapeBBox = grape.getBBox()
        let newX = (-grapeBBox.x + this.grapeLocation[j][0]) * this.globalScale + this.regroupSpacingX
        let newY = (-grapeBBox.y + this.grapeLocation[j][1]) * this.globalScale + ySpacing

        timeline.to(grape, {
          x: newX, y: newY, duration: "1", onComplete: function () {
            gsap.set(bundle.children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
          }
        }, "<+=0.09")
      }
      ySpacing += bundle.getBBox().height * this.globalScale + 10

      columnCounter++
      if (columnCounter % 5 == 0 || i == Math.floor(this.startingGrapes / 10) - 1) {
        this.regroupSpacingX += bundle.getBBox().width * self.globalScale + 10
        ySpacing = 70
      }
      timeline.set(this.findElement('grapes'), { delay: 0 }) //pause slight pause after each row animation
    }

    //animating bundles
    columnCounter = 0;
    this.regroupSpacingX = 0
    for (let i = 0; i < Math.floor(this.findElement('bundles').children.length / 10); i++) {
      let vines = this.createVine(this.regroupSpacingX, ySpacing, this.globalScale)
      let vinesEls = gsap.utils.toArray("g", vines.children[1]);
      this.findElement('vines').appendChild(vines)

      timeline.to(vines.children[0], { opacity: 1, duration: 1, delay: 0.25 })

      for (let j = 0; j < 10; j++) {
        let bundle = this.findElement('bundles').children[i * 10 + j] as SVGSVGElement
        let bundleBBox = bundle.getBBox()

        let newX = -bundleBBox.x - bundleBBox.width + this.regroupSpacingX + ((bundle.children[1] as SVGSVGElement).getBBox().width + this.bundleLocation[j][0]) * this.globalScale
        let newY = -bundleBBox.y - bundleBBox.height + ySpacing + ((bundle.children[1] as SVGSVGElement).getBBox().height + this.bundleLocation[j][1]) * this.globalScale

        timeline.to(bundle, {
          x: newX, y: newY, duration: "1", onComplete: function () {
            gsap.set(vinesEls[j], { visibility: 'visible', onComplete: function () { bundle.remove(); } })
          }
        }, "<+=0.09")
      }
      ySpacing += vines.getBBox().height * this.globalScale + 15

      columnCounter++
      if (columnCounter % 3 == 0 || i == Math.floor(this.findElement('bundles').children.length / 10) - 1) {
        this.regroupSpacingX += vines.getBBox().width * this.globalScale + 15
        ySpacing = 70
      }
    }
    timeline.set(this.findElement('grapes'), { delay: 0 }) //pause slight pause after each row animation

    //animating remaining bundles
    let remainingBundles = Array.from(self.findElement('bundles').children)
    this.animateRemainingEls(remainingBundles, timeline, 20, "bundles")

    //animating remaining grapes
    this.regroupSpacingX += 20
    let remainingGrapes = Array.from(self.findElement('grapes').childNodes)
    this.animateRemainingEls(remainingGrapes, timeline, 5, "grapes")
  }

  //#region SLIDER FUNCTIONS
  inputFieldPressed() {
    if (!this.sliderOpen && !this.animationFinished) {
      if (this.firstTimeOpen) {
        this.controllerDraggable[0].disable()
        const self = this
        let start = self.findElement('slider').getBoundingClientRect().x
        gsap.to(this.findElement("pointerHand"), {
          x: "+=50", yoyo: true, repeat: 1, delay: 0.5, duration: 2, onComplete: () => {
            gsap.set(this.findElement('pointerHand'), { visibility: "hidden" })
            this.controllerDraggable[0].enable()
          }
        })
        gsap.to(this.findElement('slider'), {
          x: "+=50", yoyo: true, repeat: 1, delay: 0.5, duration: 2, onUpdate: function () {
            self.num.textContent = String(Math.round((self.findElement('slider').getBoundingClientRect().x - start) / self.increment))
            gsap.set(self.num, { x: -(self.num.getBBox().width / 2) })
          }
        })
        this.firstTimeOpen = false;
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
    else if (button.id == "smallInc") {
      value = 1
    }
    else if (button.id == "smallDec") {
      value = -1
    }
    else if (button.id == "largeDec") {
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

    this.numberDisplay.addEventListener("pointerdown", () => this.inputFieldPressed())

    for (let i = 0; i < this.buttons.children.length; i++) {
      this.buttons.children[i].addEventListener("pointerdown", () => this.buttonPressed(this.buttons.children[i]))
    }

    //Initializing draggables, controller and slider
    this.controllerDraggable = Draggable.create(this.sliderControls, {
      type: 'x,y',
    })

    const self = this

    Draggable.create(this.slider, {
      type: 'x',
      bounds: this.sliderBar,
      cursor: "pointer",
      onPress: function () {
        //disable controller drag if we are dragging slider
        self.controllerDraggable[0].disable()
      },
      onDrag: function () {
        self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.min))
      },
      onDragEnd: function () {
        self.controllerDraggable[0].enable()
      }
    })
  }
  
  drawElements() {
    let xSpacing = 150
    let ySpacing = 70

    let tempBundle = this.createGrapeBundle(0, 0, this.globalScale, false)
    this.gsvg.appendChild(tempBundle)
    gsap.set(tempBundle, { visibility: "hidden" })
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

    let grapeBBox = this.findElement('grape').getBBox()

    xSpacing += 50
    ySpacing = 70
    for (let i = 0; i < this.startingGrapes; i++) {
      if (i % 5 == 0) {
        xSpacing += grapeBBox.width * this.globalScale + 5
        ySpacing = 70
      }
      let temp = document.createElementNS(svgns, 'use')
      gsap.set(temp, { attr: { href: "#grape" }, x: (-grapeBBox.x * 0.5 + xSpacing), y: (-grapeBBox.y * 0.5 + ySpacing), scale: 0.5 })
      this.findElement('grapes').appendChild(temp)
      ySpacing += grapeBBox.height * this.globalScale + 5
    }
  }

  restart() {
    Array.from(this.findElement('grapes').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('bundles').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('vines').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('onesText').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('tensText').childNodes).forEach(e => e.remove())
    Array.from(this.findElement('hundredsText').childNodes).forEach(e => e.remove())
    this.animationFinished = false
    this.sliderOpen = false
    this.sliderValueHasBeenUpdated(this.min);

    this.drawElements()
  }

  private init(): void {

    gsap.registerPlugin(Draggable)

    //calculating increments for slider
    let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width)
    this.increment = barWidth / (this.max - this.min);

    gsap.set(this.sliderControls, { display: "none" })
    this.sliderOpen = false;
    gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })

    //setting slider max and mins and repositioning the max
    this.gsvg.getElementById("maxText").textContent = String(this.max)
    gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
    this.gsvg.getElementById("minText").textContent = String(this.min)

    this.drawElements()

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

    gsap.set(this.findElement('displayBox'), { transformOrigin: "center" })
    gsap.to(this.findElement('displayBox'), { scale: '+=0.2', yoyo: true, repeat: 5, delay: 0.5 })

  }
}