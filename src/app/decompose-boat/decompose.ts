import { gsap, Draggable } from "gsap/all"

export interface decomposeSetup {
  startingNumber: number
}

export function decomposeNumber(_els, _setup) {
  let self = {} as decomposeClass

  class decomposeClass {
    els: SVGSVGElement;
    setup: decomposeSetup;
    //#region decomposition variables
    refToOne = "#one"
    refToTen = "#ten"
    refToHundred = "#hundred"
    refToThousand = "#thousand"
    refToTenThousand = "#tenthousand"
    textSize = 14;
    svgns = "http://www.w3.org/2000/svg";
    color = "#ff7f50";
    T: gsap.timeline;
    animationFinished = false;
    animationStarted = false;
    drawnElements: SVGSVGElement
    goButton: SVGSVGElement
    yTextOffset = 50
    //#endregion

    //#region slider variables
    num: SVGTextElement
    numValue: number
    sliderControls: HTMLElement
    numberDisplay: HTMLElement
    buttons: HTMLElement
    sliderBar: SVGSVGElement
    slider: SVGSVGElement
    maxText: SVGSVGElement
    sliderOpen = false;
    increment: number
    sliderMax = 50000;
    sliderMin = 0
    //#endregion

    constructor(els, setup) {
      self = this
      this.els = els
      this.setup = setup
      this.drawnElements = this.els.getElementById("drawnElements") as SVGSVGElement
      this.T = gsap.timeline({ paused: false });

      this.num = this.els.getElementById("num") as unknown as SVGTextElement
      this.sliderControls = this.els.getElementById("sliderControls") as HTMLElement
      this.numberDisplay = this.els.getElementById("numberDisplay") as HTMLElement
      this.buttons = this.els.getElementById("buttons") as HTMLElement
      this.sliderBar = this.els.getElementById("sliderBar") as unknown as SVGSVGElement
      this.slider = this.els.getElementById("slider") as unknown as SVGSVGElement
      this.maxText = this.els.getElementById("maxText") as unknown as SVGSVGElement
      this.goButton = this.els.getElementById("goButton") as SVGSVGElement

      this.init()
    }

    //#region DECOMPOSITION FUNCTIONS

    showObject(object, duration) {
      return self.T.to(object, { visibility: "visible", duration: duration })
    }

    hideObject(object, duration) {
      return self.T.to(object, { visibility: "hidden", duration: duration })
    }

    translateObject(object, xVal, yVal) {
      return self.T.to(object, { x: xVal, y: yVal, delay: 0.05 })
    }

    setDecrementVal(num) {
      if (num > 9999) {
        return 10000;
      }
      else if (num > 999) {
        return 1000;
      }
      else if (num > 99) {
        return 100;
      }
      else if (num > 9) {
        return 10;
      }
      else {
        return 1;
      }
    }

    bringToFront(obj) {
      let parent = obj.parentElement
      parent.removeChild(obj);
      parent.appendChild(obj);
    }

    redrawElements() {
      let arr = Array.from(self.drawnElements.children)
      arr.slice().reverse().forEach(element => {
        self.bringToFront(element)
      });
      gsap.utils.toArray("text").forEach(element => {
        self.bringToFront(element)
      });
    }

    togglePause(e) {
      if (e.target != this.goButton) {
        if (this.T.paused()) {
          this.T.resume();
          console.log("resumed")
        }
        else if (this.animationStarted) {
          this.T.pause();
          console.log("paused")
        }
      }
    }

    generateDecompositionObjects(startingNumber) {
      let decrementNumID = 1;
      let decrementVal = this.setDecrementVal(startingNumber);

      for (let i = startingNumber; i > 0;) {
        let numBBox = this.num.getBBox();
        //determine current asset
        var currentAsset;
        if (decrementVal == 1) {
          currentAsset = this.refToOne
        }
        else if (decrementVal == 10) {
          currentAsset = this.refToTen
        }
        else if (decrementVal == 100) {
          currentAsset = this.refToHundred
        }
        else if (decrementVal == 1000) {
          currentAsset = this.refToThousand
        }
        else {
          currentAsset = this.refToTenThousand
        }
        let decrementText = document.createElementNS(this.svgns, "text") as SVGTextElement
        gsap.set(decrementText, { attr: { id: 'decrementText' + (decrementNumID), class: "number" }, x: numBBox.x - (numBBox.width / 2), y: numBBox.y + this.yTextOffset, fontFamily: 'Arial', textContent: decrementVal.toString(), fontSize: this.textSize, visibility: "hidden", fill: this.color, fontWeight: 600 })
        this.drawnElements.appendChild(decrementText)

        let decrementAsset = document.createElementNS(this.svgns, "use") as SVGUseElement
        gsap.set(decrementAsset, { attr: { href: currentAsset, id: 'decrementAsset' + (decrementNumID) }, visibility: "hidden", scale: 0.01 })
        this.drawnElements.appendChild(decrementAsset)

        let number = document.createElementNS(this.svgns, "text") as SVGTextElement
        gsap.set(number, { attr: { id: 'text' + (i), class: 'number' }, x: numBBox.x - (numBBox.width / 2), y: numBBox.y + this.yTextOffset, fontFamily: 'Arial', textContent: i, fontSize: this.textSize, visibility: "hidden", fontWeight: 600 })
        this.drawnElements.appendChild(number)

        i -= decrementVal
        this.num.textContent = String(parseInt(this.num.textContent) - decrementVal)
        decrementVal = this.setDecrementVal(i);
        decrementNumID++
      }
    }

    decompose(startingNumber) {

      if (!this.animationFinished && this.numValue > 0) {
        if (this.sliderOpen) {
          this.sliderControls.style.display = "none";
          this.sliderOpen = false
        }

        this.goButton.style.display = "none"

        this.generateDecompositionObjects(startingNumber)

        this.num.textContent = String(this.numValue) //set this back to what it was after it was modified from generateDecompostionObjects

        this.showObject('#text' + startingNumber, 1)//fade in starting number

        let yStart = 100
        let xStart = 15
        let decrementVal = this.setDecrementVal(startingNumber);
        let decrementNumID = 1;
        let assetRowCount = { 10000: 0, 1000: 0, 100: 0, 10: 0, 1: 0 }

        let yVal = yStart
        let xVal = xStart
        let furthestXVal = 0;

        this.animationStarted = true;

        let moveAssetsToNextLine = false;

        for (let i = startingNumber; i > decrementVal - 1;) {

          let decrementText = this.els.getElementById('decrementText' + decrementNumID);
          let decrementAsset = this.els.getElementById("decrementAsset" + decrementNumID) as SVGUseElement;
          let assetBBox = decrementAsset.getBBox()
          let currentNum = '#text' + i;
          let nextNum = '#text' + (i - decrementVal);

          if (assetRowCount[decrementVal] == 3) {//if we have filled row with 3 objects of unique type then proceed to next row
            assetRowCount[decrementVal] = 0;
            yVal += ((assetBBox).height) + 10
            xVal -= ((assetBBox.width) + 3) * 3
          }

          this.hideObject(currentNum, 0);
          this.showObject(decrementText, 0)

          //show next counter if exists
          if (i - decrementVal > 0) {
            this.showObject(nextNum, 0)
          }

          this.translateObject(decrementText, xVal, yVal)
          this.T.to(decrementText, { duration: 0.5, scale: 0.01 })//scale

          this.T.set(decrementAsset, { x: xVal, y: yVal, visibility: "visible" })
          this.T.to(decrementAsset, { scale: 1, duration: 0.5, onComplete: this.redrawElements })

          decrementNumID++;
          xVal += (assetBBox.width) + 3
          furthestXVal = Math.max(furthestXVal, xVal)//keep track of the furthest xValue
          assetRowCount[decrementVal]++;

          //decrement and then update rather than update then decrement
          i -= decrementVal;
          if (decrementVal != this.setDecrementVal(i)) {
            let nextAsset = this.els.getElementById("decrementAsset" + decrementNumID) as SVGUseElement;
            decrementVal = this.setDecrementVal(i);
            //if we are switching to a new asset
            if (furthestXVal + nextAsset.getBBox().width * 3 > 560) {
              furthestXVal = 0
              xVal = xStart
              moveAssetsToNextLine = true
            }
            if (moveAssetsToNextLine) {
              yVal = yStart + ((assetBBox.height) + 10) * 3 + 20
            }
            else {
              yVal = yStart //reset y value
            }
            xVal = furthestXVal + 20 //set x to furthest x
          }
        }
        this.animationFinished = true;
      }
    }

    reset() {
      if (this.T.isActive()) {
        this.T.kill()
        this.T = gsap.timeline({ paused: false });
      }

      gsap.set(this.sliderControls, { display: "none" })
      gsap.set(this.num, { display: "none" })
      gsap.set(this.goButton, { display: "block" })
      Array.from(this.drawnElements.childNodes).forEach(e => e.remove())
      this.animationFinished = false
      this.animationStarted = false
      this.sliderOpen = false
      this.sliderValueHasBeenUpdated(self.sliderMin);
      this.T.resume()

    }
    //#endregion

    //#region SLIDER FUNCTIONS
    inputFieldPressed() {
      if (!this.sliderOpen && !this.animationFinished) {
        if (this.num.style.display == "none") {
          this.num.textContent = String(this.sliderMin)
          this.numValue = this.sliderMin
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
      if (newNumber > this.sliderMax) {
        newNumber = this.sliderMax
      }
      else if (newNumber < this.sliderMin) {
        newNumber = this.sliderMin
      }
      if (newNumber <= this.sliderMax && newNumber >= this.sliderMin) {
        this.sliderValueHasBeenUpdated(newNumber)
      }
    }

    sliderValueHasBeenUpdated(value) {
      this.num.textContent = value
      this.numValue = value
      gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
      gsap.set(this.slider, { x: this.increment * (value - this.sliderMin) })
    }

    addEventListenersAndInteractivity() {

      this.numberDisplay.addEventListener("pointerdown", event => this.inputFieldPressed())

      for (let i = 0; i < this.buttons.children.length; i++) {
        this.buttons.children[i].addEventListener("pointerdown", event => this.buttonPressed(this.buttons.children[i]))
      }

      //Initializing draggables, controller and slider
      var controllerDraggable = Draggable.create(this.sliderControls, {
        type: 'x,y',
        bounds: this.els
      })

      Draggable.create(this.slider, {
        type: 'x',
        bounds: this.sliderBar,
        cursor: "pointer",
        onPress: function () {
          //disable controller drag if we are dragging slider
          controllerDraggable[0].disable()
        },
        onDrag: function () {
          self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.sliderMin))
        },
        onDragEnd: function () {
          controllerDraggable[0].enable()
        }

      })
      this.els.addEventListener("pointerdown", event => { if (this.animationStarted) { this.togglePause(event) } })
      this.goButton.addEventListener("pointerdown", e => this.decompose(this.numValue));
      this.els.getElementById("restart").addEventListener("pointerdown", e => this.reset())

    }

    init() {
      gsap.registerPlugin(Draggable)

      //calculating increments for slider
      let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width)
      this.increment = barWidth / (this.sliderMax - this.sliderMin);

      gsap.set(this.sliderControls, { display: "none" })
      gsap.set(this.num, { display: "none" })

      //setting slider max and mins and repositioning the max
      this.els.getElementById("maxText").textContent = String(this.sliderMax)
      gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
      this.els.getElementById("minText").textContent = String(this.sliderMin)

      this.addEventListenersAndInteractivity()
    }
    //#endregion

  }
  return new decomposeClass(_els, _setup);
}