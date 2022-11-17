import { gsap, Draggable } from 'gsap/all'
import { GraphicsGeometry } from 'pixi.js'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  private tl: any
  private bundleLocation = [[60, 25, 1], [130, 27, -1], [23, 70, 1], [85, 90, -1], [140, 85, -1], [165, 75, 1], [10, 130, 1], [70, 155, -1], [90, 140, 1], [155, 140, -1]]
  private grapeLocation = [[0, 0], [12, -4], [23, 2], [11, 8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]
  private grapeLocationFlipped = [[0, 0], [-12, -4], [-23, 2], [-11, 8], [2, 10], [-7, 19], [-20, 14], [-9, 28], [-20, 23], [-17, 36]]

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
  max = 50;
  min = 0
  //#endregion

  animationFinished = false;

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

  private createGrapeBundle(x, y): SVGSVGElement {
    let bundle = document.createElementNS(svgns, 'g')
    let bbox = this.findElement('grape').getBBox()

    for (let i = 0; i < this.grapeLocation.length; i++) {
      let use = document.createElementNS(svgns, 'use')
      gsap.set(use, { attr: { href: "#grape", visibility: 'hidden' }, x: -bbox.x + this.grapeLocation[i][0] + x, y: -bbox.y + this.grapeLocation[i][1] + y })
      bundle.appendChild(use)
    }

    this.redrawElements(Array.from(bundle.children))

    this.findElement('bundles').appendChild(bundle)
    //console.log(group.getBBox())
    return bundle as SVGSVGElement
  }

  private createGrapeBundleFlipped(x, y): SVGSVGElement {
    let bundle = document.createElementNS(svgns, 'g')
    let bbox = this.findElement('grape').getBBox()

    for (let i = 0; i < this.grapeLocationFlipped.length; i++) {
      let use = document.createElementNS(svgns, 'use')
      let newX = -bbox.x + this.grapeLocationFlipped[i][0] + x
      let newY = -bbox.y + this.grapeLocationFlipped[i][1] + y

      gsap.set(use, { attr: { href: "#grape", visibility: 'hidden' }, x: newX, y: newY })
      bundle.appendChild(use)
    }

    this.redrawElements(Array.from(bundle.children))

    this.gsvg.appendChild(bundle)
    //console.log(group.getBBox())
    return bundle as SVGSVGElement
  }

  private fillVine(x, y) {
    let bundles = document.createElementNS(svgns, 'g')

    for (let i = 0; i < this.bundleLocation.length; i++) {
      if (this.bundleLocation[i][2] == -1) {
        let grapeBundle = this.createGrapeBundleFlipped(x, y)
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1] })
        bundles.appendChild(grapeBundle)
      }
      else {
        let grapeBundle = this.createGrapeBundle(x, y)
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1] })
        bundles.appendChild(grapeBundle)
      }
    }

    this.gsvg.appendChild(bundles)

    return bundles
  }

  private play(x, y, group) {
    let rows = document.createElementNS(svgns, 'g')
    let bbox = this.findElement('grape').getBBox()
    let ySpacing = 0

    //creating grape array
    for (let i = 0; i < 13; i++) {

      let row = document.createElementNS(svgns, 'g')
      let xSpacing = 0;

      for (let j = 0; j < 10; j++) {

        if (i == 12 && j == 5) {
          break;
        }

        let use = document.createElementNS(svgns, 'use')
        gsap.set(use, { attr: { href: "#grape" }, x: -bbox.x + xSpacing, y: -bbox.y + ySpacing })
        row.appendChild(use)
        xSpacing += 20
      }
      rows.appendChild(row)
      ySpacing += 20
    }
    this.gsvg.appendChild(rows)

    this.tl.set(rows, { delay: 1 })

    //iterating through the grape array and animating
    for (let i = 0; i < 10; i++) {

      let row = rows.children[i]

      for (let j = 0; j < row.children.length; j++) {

        let grape = row.children[j]
        let newX = -bbox.x + this.bundleLocation[i][0] + x;
        let newY = -bbox.y + this.bundleLocation[i][1] + y;

        if (this.bundleLocation[i][2] == 1) {
          newX += this.grapeLocation[j][0]
          newY += this.grapeLocation[j][1]
        }
        else {
          newX += this.grapeLocationFlipped[j][0]
          newY += this.grapeLocationFlipped[j][1]
        }

        this.tl.to(grape, {
          x: newX, y: newY, duration: "1.2", onComplete: function () {
            gsap.set(group.children[i].children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
          }
        }, "<+=0.1")
      }
      this.tl.set(row, { delay: 0 }) //pause slight pause after each row animation
    }

    //leftover grapes after vine has been filled
    if (rows.children.length > 10) {

      let leavesbbox = this.findElement('leaves').getBBox()
      let leavesarr = []
      let bundles = []

      for (let i = 0; i < rows.children.length - 10; i++) {

        let leaves = document.createElementNS(svgns, 'use')
        gsap.set(leaves, { attr: { href: "#leaves" }, opacity: 0 })
        this.findElement('leafGroup').appendChild(leaves)
        gsap.set(leaves, { x: -leavesbbox.x + i * 50 + 250, y: -leavesbbox.y + 275 })
        leavesarr.push(leaves)

        let temp = this.createGrapeBundle(leavesbbox.width / 4 + i * 50 + 250, 275 + leavesbbox.height / 4)
        bundles.push(temp)
      }

      for (let i = 0; i < rows.children.length - 10; i++) {

        let row = rows.children[i + 10]
        this.tl.to(leavesarr[i], { opacity: 1, duration: 0.5 })
        this.tl.to(leavesarr[i], { delay: 0.2 })

        for (let j = 0; j < row.children.length; j++) {

          let grape = row.children[j]
          let newX = -bbox.x + this.grapeLocation[j][0] + leavesbbox.width / 4 + i * 50 + 250;
          let newY = -bbox.y + this.grapeLocation[j][1] + leavesbbox.height / 4 + 275;

          this.tl.to(grape, {
            x: newX, y: newY, duration: "1.2", onComplete: function () {
              gsap.set(bundles[i].children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
            }
          }, "<+=0.1")
        }
        this.tl.set(row, { delay: 0 }) //pause slight pause after each row animation
      }
    }
  }

  private playBundle() {
    let rows = document.createElementNS(svgns, 'g')
    let bundles = []
    let leavesarr = []
    let bbox = this.findElement('grape').getBBox()
    let leavesbbox = this.findElement('leaves').getBBox()
    let ySpacing = 20

    for (let i = 0; i < 5; i++) {
      let leaves = document.createElementNS(svgns, 'use')
      gsap.set(leaves, { attr: { href: "#leaves" }, opacity: 0 })
      this.gsvg.appendChild(leaves)
      gsap.set(leaves, { x: -leavesbbox.x + i * 50, y: -leavesbbox.y + 200 })
      leavesarr.push(leaves)

      let row = document.createElementNS(svgns, 'g')
      let xSpacing = 0;
      for (let j = 0; j < 10; j++) {
        let use = document.createElementNS(svgns, 'use')
        gsap.set(use, { attr: { href: "#grape" }, x: -bbox.x + xSpacing, y: -bbox.y + ySpacing * i })
        row.appendChild(use)
        xSpacing += 20
      }
      rows.appendChild(row)

      let temp = this.createGrapeBundle(leavesbbox.width / 4 + i * 50, 200 + leavesbbox.height / 4)
      bundles.push(temp)

    }

    this.gsvg.appendChild(rows)
    console.log(rows)
    this.tl.to(rows, { delay: 1 })

    for (let i = 0; i < rows.children.length; i++) {
      let row = rows.children[i]
      this.tl.to(leavesarr[i], { opacity: 1, duration: 0.5 })
      this.tl.to(leavesarr[i], { delay: 0.2 })
      for (let j = 0; j < row.children.length; j++) {
        let grape = row.children[j]
        let newX = -bbox.x + this.grapeLocation[j][0] + leavesbbox.width / 4 + i * 50;
        let newY = -bbox.y + this.grapeLocation[j][1] + leavesbbox.height / 4 + 200;

        this.tl.to(grape, {
          x: newX, y: newY, duration: "1.2", onComplete: function () {
            gsap.set(bundles[i].children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
          }
        }, "<+=0.1")
      }
      this.tl.set(row, { delay: 0 }) //pause slight pause after each row animation
    }
  }

  private playRegroup(grapes) {
    let bbox = this.findElement('grape').getBBox()
    let leavesbbox = this.findElement('leaves').getBBox()
    let leavesarr = []
    let bundles = []

    let xPos = 50
    let yPos = 100

    this.sliderControls.style.display = "none";

    for (let i = 0; i < Math.floor(grapes.children.length / 10); i++) {

      let leaves = document.createElementNS(svgns, 'use')
      gsap.set(leaves, { attr: { href: "#leaves" }, opacity: 0 })
      this.findElement('leafGroup').appendChild(leaves)
      gsap.set(leaves, { x: -leavesbbox.x + i * 50 + xPos, y: -leavesbbox.y +yPos })
      leavesarr.push(leaves)

      let temp = this.createGrapeBundle(leavesbbox.width / 4 + i * 50 + xPos,yPos + leavesbbox.height / 4)
      bundles.push(temp)

      this.tl.to(leavesarr[i], { opacity: 1, duration: 0.5 })
      this.tl.to(leavesarr[i], { delay: 0.2 })
      for (let j = 0; j < 10; j++) {
  
        let grape = grapes.children[i*10+j]
        let newX = -bbox.x + this.grapeLocation[j][0] + leavesbbox.width / 4 + i * 50 + xPos;
        let newY = -bbox.y + this.grapeLocation[j][1] + leavesbbox.height / 4 + yPos;

        this.tl.to(grape, {
          x: newX, y: newY, duration: "1.2", onComplete: function () {
            gsap.set(bundles[i].children[9 - j], { visibility: 'visible', onComplete: function () { grape.remove() } })
          }
        }, "<+=0.1")
      }
      /*
      let text = document.createElementNS(svgns, "text")
      this.tl.set(text, {x: 70 + i*50, y: yPos+75, fontFamily: 'Arial', textContent: 10, fontSize: 16, fill: "#000000"})
      console.log(text)
      this.gsvg.appendChild(text)
      */
      this.tl.set(grapes, { delay: 0 }) //pause slight pause after each row animation
    }

    const self = this
    this.tl.to(this.findElement('grapes'), {x: -150, onComplete: function () {
      if (self.numValue == 27) {
        alert("Correct!")
      }
      else {
        alert("Try again!")
      }
    }})
  }

  //#region SLIDER FUNCTIONS
  inputFieldPressed() {
    if (!this.sliderOpen && !this.animationFinished) {
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
    let newNumber = parseInt(this.num.textContent) + parseInt(button.getAttribute("val"))
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
        gsap.set(use, { attr: { href: "#grape" }, x: -bbox.x + xSpacing, y: -bbox.y + ySpacing})
        grapes.appendChild(use)
        ySpacing +=20
      }
      xSpacing+=20

    }

    gsap.set(this.findElement('grapes'), {x: 0})

  }

  private init(): void {

    //this.createGrapeBundle(100, 400)
    //console.log(this.findElement('emptyVine').getBoundingClientRect(), this.findElement('fullVine').getBBox())

    /*
    var pt = this.gsvg.createSVGPoint()
    pt.x = this.findElement('emptyVine').getBoundingClientRect().x
    pt.y = this.findElement('emptyVine').getBoundingClientRect().y
    pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

    //console.log(pt.x, pt.y)
    let group = this.fillVine(pt.x, pt.y) as SVGSVGElement

    //gsap.set(this.findElement('emptyVine'), { visibility: 'hidden' })

    document.addEventListener('pointerdown', () => this.play(pt.x, pt.y, group))
    */
    //document.addEventListener('pointerdown', () => this.playBundle())

    gsap.registerPlugin(Draggable)

    //calculating increments for slider
    let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width)
    this.increment = barWidth / (this.max - this.min);

    gsap.set(this.sliderControls, { display: "none" })
    gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
    //gsap.set(this.num, { display: "none" })

    //setting slider max and mins and repositioning the max
    this.gsvg.getElementById("maxTextInner").textContent = String(this.max)
    gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
    this.gsvg.getElementById("minTextInner").textContent = String(this.min)

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
        gsap.set(use, { attr: { href: "#grape" }, x: -bbox.x + xSpacing, y: -bbox.y + ySpacing})
        grapes.appendChild(use)
        ySpacing +=20
      }
      xSpacing+=20

    }

    this.goButton.addEventListener("pointerdown", e => this.playRegroup(grapes));
    this.findElement('restart').addEventListener("pointerdown", () => this.restart())

    this.addEventListenersAndInteractivity()

  }
}