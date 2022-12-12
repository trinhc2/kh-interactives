import { gsap, Draggable } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement;
  private alternateTimeline: any;
  private mainTimeline: any;

  private bundleLocation = [[29, 10.5, 1], [53.5, 11.5, -1], [10.5, 33, 1], [31, 43, -1], [58.5, 40.5, -1], [81.5, 35.5, 1], [4, 63, 1], [23.5, 75.5, -1], [44, 68, 1], [66, 68, -1]];
  private grapeLocation = [[1, 2], [7, 0], [12.5, 3], [6.5, 6], [0, 7], [4.5, 11.5], [11, 9], [5.5, 16], [11, 13.5], [9.5, 20]];
  private grapeLocationFlipped = [[11.5, 2], [5.5, 0], [0, 3], [6, 6], [12.5, 7], [8, 11.5], [1.5, 9], [7, 16], [1.5, 13.5], [3, 20]];

  private truckLocation = [[80, 55], [93, 63], [106, 71], [119, 79], [132, 87], [145, 95], [158, 103], [171, 111], [184, 119], [197, 127]]
  private barrelLocation = [[31.5, 1], [27.5, 3], [23, 5], [18.5, 8], [14, 10.5], [36.5, 4], [32.5, 6], [28, 8], [23.5, 10], [19, 12.5]]

  private startingNumber: number;
  private startingOnes: number;
  private startingTens: number;

  private regroupSpacingX = 0;

  //#region slider variables
  private sliderNumber: SVGSVGElement;
  private sliderNumberValue: number;
  private sliderControls: SVGSVGElement;
  private controllerDraggable: any;
  private numberDisplay: SVGSVGElement;
  private buttons: SVGSVGElement;
  private sliderBar: SVGSVGElement;
  private slider: SVGSVGElement;
  private maxText: SVGSVGElement;
  private goButton: SVGSVGElement;
  private sliderOpen = false;
  private sliderIncrements: number;
  private max = 500;
  private min = 0;
  //#endregion

  private animationFinished = false;
  private firstTimeOpen = true;
  private tutorialFinished = false;
  private tryAgain: SVGSVGElement;
  private correct: SVGSVGElement;

  private onesGroup: SVGSVGElement;
  private tensGroup: SVGSVGElement;
  private hundredsGroup: SVGSVGElement;

  private boatScale = 0.5;
  private elementType: string;

  public constructor(gsvg: SVGSVGElement, type: string, tens: number, ones: number) {
    this.gsvg = gsvg;
    this.alternateTimeline = gsap.timeline();

    this.sliderNumber = this.findElement("num");
    this.sliderControls = this.findElement("sliderControls");
    this.numberDisplay = this.findElement("numberDisplay");
    this.buttons = this.findElement("buttons");
    this.sliderBar = this.findElement("sliderBar");
    this.slider = this.findElement("slider");
    this.maxText = this.findElement("maxText");
    this.goButton = this.findElement("goButton");
    this.tryAgain = this.findElement("tryAgain");
    this.correct = this.findElement("correct");

    this.onesGroup = this.findElement('ones');
    this.tensGroup = this.findElement('tens');
    this.hundredsGroup = this.findElement('hundreds');

    this.startingTens = tens;
    this.startingOnes = ones;
    this.elementType = type;
    this.startingNumber = this.startingTens * 10 + this.startingOnes;
    this.init();
  }

  private findElement(id: string): SVGSVGElement {
    return this.gsvg.getElementById(id) as SVGSVGElement;
  }

  private bringToFront(obj: Element): void {
    let parent = obj.parentElement;
    parent.removeChild(obj);
    parent.appendChild(obj);
  }

  private redrawElements(arr: Element[]): void {
    arr.slice().reverse().forEach(element => {
      this.bringToFront(element);
    });
  }

  private createGrapeBundle(x: number, y: number, flip: boolean): SVGSVGElement {
    let bundle = document.createElementNS(svgns, 'g');

    let grapeBBox = this.findElement('grape').getBBox();

    for (let i = 0; i < this.grapeLocation.length; i++) {
      let use = document.createElementNS(svgns, 'use');
      let newX, newY;

      if (flip) {
        newX = -grapeBBox.x + this.grapeLocationFlipped[i][0] + x;
        newY = -grapeBBox.y + this.grapeLocationFlipped[i][1] + y;
      }
      else {
        newX = -grapeBBox.x + this.grapeLocation[i][0] + x;
        newY = -grapeBBox.y + this.grapeLocation[i][1] + y;
      }

      gsap.set(use, { attr: { href: "#grape" }, x: newX, y: newY });
      bundle.appendChild(use);
    }

    this.redrawElements(Array.from(bundle.children));
    return bundle as SVGSVGElement;
  }

  private createLeaves(xSpacing: number, ySpacing: number, opacity: number): SVGUseElement {
    let leafBBox = this.findElement('leaves').getBBox();
    let leaves = document.createElementNS(svgns, 'use');
    let leafX = xSpacing - leafBBox.x - leafBBox.width / 4;
    let leafY = ySpacing - leafBBox.y - leafBBox.height / 3;
    gsap.set(leaves, { attr: { href: "#leaves" }, x: leafX, y: leafY, opacity: opacity });

    return leaves
  }

  private createVine(x: number, y: number): SVGSVGElement {
    let vine = document.createElementNS(svgns, 'g');

    let use = document.createElementNS(svgns, 'use');
    let vinebbox = this.findElement('emptyVine').getBBox();
    gsap.set(use, { attr: { href: "#emptyVine" }, x: -vinebbox.x + x, y: -vinebbox.y + y, opacity: 0 });
    vine.appendChild(use);

    let bundles = document.createElementNS(svgns, 'g');

    for (let i = 0; i < this.bundleLocation.length; i++) {

      if (this.bundleLocation[i][2] == -1) {
        let grapeBundle = this.createGrapeBundle(x, y, true);
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1], visibility: "hidden" });
        bundles.appendChild(grapeBundle);
      }
      else {
        let grapeBundle = this.createGrapeBundle(x, y, false);
        gsap.set(grapeBundle, { x: this.bundleLocation[i][0], y: this.bundleLocation[i][1], visibility: "hidden" });
        bundles.appendChild(grapeBundle);
      }
    }
    vine.appendChild(bundles);

    return vine as SVGSVGElement;
  }

  private createBoat(x: number, y: number): SVGSVGElement {
    let boat = document.createElementNS(svgns, 'g');
    let truckGroup = document.createElementNS(svgns, 'g');

    let temp = document.createElementNS(svgns, 'use');
    gsap.set(temp, { attr: { href: "#emptyBoat" }, x: x, y: y, opacity: 0 });
    boat.appendChild(temp);

    let truckBBox = this.findElement('truck').getBBox();

    for (let i = 0; i < 10; i++) {
      let truck = this.findElement('truck').cloneNode(true);
      gsap.set(truck, { x: -truckBBox.x + this.truckLocation[i][0] + x, y: -truckBBox.y + this.truckLocation[i][1] + y });
      truckGroup.appendChild(truck);
    }
    boat.appendChild(truckGroup);
    gsap.set(boat, { scale: this.boatScale });
    return boat as SVGSVGElement;
  }

  private sumDecomposeTexts(textArr: HTMLCollection): void {
    if (textArr.length > 0) {
      let total = textArr[0];
      let totalTextX = total.getAttribute('xPos');
      let totalTextY = total.getAttribute('yPos');
      for (let i = 1; i < textArr.length; i++) {
        let currentText = textArr[i] as SVGSVGElement;

        this.alternateTimeline.to(currentText, {
          x: totalTextX, y: totalTextY, onComplete: () => {
            total.textContent = String(parseInt(total.textContent) + parseInt(currentText.textContent));
            currentText.remove();
          }
        });
      }
    }
  }

  private groupPlaceValues(total: SVGSVGElement, value: SVGSVGElement): void {
    if (value) {
      this.alternateTimeline.to(value, {
        x: total.getAttribute('xPos'), y: total.getAttribute('yPos'), delay: 0.1, onComplete: () => {
          if (total != value) {
            total.textContent = String(parseInt(total.textContent) + parseInt(value.textContent));
            value.remove();
          }
        }
      });
    }
  }

  private decomposeElementToText(array: ChildNode[], textContent: String): void {
    for (let i = 0; i < array.length; i++) {
      let currentEl = array[i] as SVGSVGElement;
      gsap.set(currentEl, { transformOrigin: 'center' });

      let elementBBox = currentEl.getBoundingClientRect();
      let pt = this.gsvg.createSVGPoint();
      pt.x = elementBBox.x;
      pt.y = elementBBox.y;

      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      let elementText = document.createElementNS(svgns, "text");
      gsap.set(elementText, { fontFamily: 'Arial', textContent: textContent, fontSize: 16, fontWeight: 'bold', alignmentBaseline: 'text-before-edge' });

      if (textContent == "100") {
        this.findElement('hundredsText').appendChild(elementText);
      }
      else if (textContent == "10") {
        this.findElement('tensText').appendChild(elementText);
      }
      else {
        this.findElement('onesText').appendChild(elementText);
      }

      elementBBox = currentEl.getBBox();

      this.alternateTimeline.to(currentEl, { scale: 0, duration: 0.5 });

      let textX, textY;
      textX = pt.x + elementBBox.width / 2 - elementText.getBBox().width / 2;
      textY = pt.y + elementBBox.height / 2 - elementText.getBBox().height / 2;
      if (textContent == "100" && this.elementType == "barrels") {
        textX = pt.x + elementBBox.width / 2 * this.boatScale - elementText.getBBox().width / 2;
        textY = pt.y + elementBBox.height / 2 * this.boatScale - elementText.getBBox().height / 2;
      }
      if (textContent == "1" && this.elementType == "barrels") {
        textX = pt.x + elementBBox.width - elementText.getBBox().width / 2;
        textY = pt.y + elementBBox.height - elementText.getBBox().height / 2;
      }


      gsap.set(elementText, {
        attr: { xPos: textX, yPos: textY },
        x: textX, y: textY, transformOrigin: 'center', scale: 0
      });
      this.alternateTimeline.to(elementText, {
        scale: 1, onComplete: function () {
          currentEl.remove();
        }
      });
    }
  }

  private checkAnswer(): void {
    const self = this;

    this.alternateTimeline.to(this.onesGroup, {
      onComplete: function () {
        if (self.sliderNumberValue == self.startingNumber) {
          gsap.set(self.correct, { visibility: "visible", transformOrigin: "center", scale: 0 });
          self.alternateTimeline.to(self.correct, { scale: 1, duration: 0.5 });
        }
        else {
          self.alternateTimeline.to(self.sliderNumber, { x: '-=5', yoyo: true, repeat: 1, duration: 0.1 });
          self.alternateTimeline.to(self.sliderNumber, { x: '+=5', yoyo: true, repeat: 1, duration: 0.1 });
          self.alternateTimeline.to(self.sliderNumber, { x: '-=5', yoyo: true, repeat: 1, duration: 0.1 });
          self.alternateTimeline.to(self.tryAgain, { y: 0 });
        }
      }
    });
  }

  private decompose(): void {
    //decomposing the elements into place values
    let remainingHundreds = Array.from(this.hundredsGroup.childNodes) as ChildNode[];
    let remainingTens = Array.from(this.tensGroup.childNodes) as ChildNode[];
    let remainingOnes = Array.from(this.onesGroup.childNodes) as ChildNode[];

    this.decomposeElementToText(remainingHundreds, "100");
    this.decomposeElementToText(remainingTens, "10");
    this.decomposeElementToText(remainingOnes, "1");

    //grouping/summing the elements
    let hundredsTextArr = this.findElement('hundredsText').children;
    let tensTextArr = this.findElement('tensText').children;
    let onesTextArr = this.findElement('onesText').children;

    this.sumDecomposeTexts(hundredsTextArr);
    this.sumDecomposeTexts(tensTextArr);
    this.sumDecomposeTexts(onesTextArr);

    let displayBBox = this.findElement('displayBox').getBBox();

    let total;

    if (hundredsTextArr.length > 0) {
      total = hundredsTextArr[0] as SVGSVGElement;
    }
    else if (tensTextArr.length > 0) {
      total = tensTextArr[0] as SVGSVGElement;
    }
    else {
      total = onesTextArr[0] as SVGSVGElement;
    }
    let ten = tensTextArr[0] as SVGSVGElement;
    let one = onesTextArr[0] as SVGSVGElement;
    if (ten) {
      this.alternateTimeline.to(ten, { y: total.getAttribute('yPos'), delay: 0.1 });
    }

    if (one) {
      this.alternateTimeline.to(one, { y: total.getAttribute('yPos') });
    }
    this.groupPlaceValues(total, ten);
    this.groupPlaceValues(total, one);

    let totalBBox = total.getBBox();
    this.alternateTimeline.to(total, { x: displayBBox.x + displayBBox.width / 2 - totalBBox.width / 2, y: displayBBox.y + displayBBox.height + 40, delay: 0.1 });

    this.checkAnswer();
  }

  private animateRemainingEls(elementArr: ChildNode[], timeline: any, scale: number): void {
    if (elementArr.length > 0) {
      let columnCounter = 0;
      let ySpacing = 80;
      for (let i = Math.floor(elementArr.length / 10) * 10; i < elementArr.length; i++) {
        let currentEl = elementArr[i] as SVGSVGElement;
        let currentElBBox = currentEl.getBBox();

        let newX = -currentElBBox.x * scale + this.regroupSpacingX;
        let newY = -currentElBBox.y * scale + ySpacing;

        timeline.to(currentEl, { x: newX, y: newY, duration: "1" }, "<+=0.09");

        ySpacing += currentEl.getBBox().height * scale + 5;

        columnCounter++;
        if (columnCounter % 5 == 0 || i == elementArr.length - 1) {
          this.regroupSpacingX += currentElBBox.width * scale + 5;
          if (columnCounter % 10 == 0) {
            this.regroupSpacingX += 15;
          }
          ySpacing = 80;
        }
      }
    }
  }

  private animateOnesToTens(timeline): void {

    let tensBBox;
    if (this.elementType == "grapes") {
      let tempBundle = this.createGrapeBundle(0, 0, false);
      this.gsvg.appendChild(tempBundle);
      gsap.set(tempBundle, { visibility: "hidden" });
      tensBBox = tempBundle.getBBox();
      tensBBox.width += 5;
      tensBBox.height += 5;
    }
    else {
      tensBBox = this.findElement('truck').getBBox();
    }

    let tensGroupBBox = this.tensGroup.getBBox();
    this.regroupSpacingX = tensGroupBBox.x + tensGroupBBox.width + 25;
    if (this.startingTens == 0){
      this.regroupSpacingX += 100;
    }
    let ySpacing = 80;
    let columnCounter = 0;

    for (let i = 0; i < Math.floor(this.startingOnes / 10); i++) {
      let tenElement, tenElementChildren;
      if (this.elementType == "grapes") {
        tenElement = document.createElementNS(svgns, 'g');

        let leaves = this.createLeaves(this.regroupSpacingX, ySpacing, 0);
        tenElement.appendChild(leaves);

        let bundle = this.createGrapeBundle(0, 0, false);
        gsap.set(bundle, { x: this.regroupSpacingX, y: ySpacing, visibility: "hidden" });
        tenElement.appendChild(bundle);

        this.tensGroup.appendChild(tenElement);
        timeline.to(leaves, { opacity: 1, duration: 0.5 });

        tenElementChildren = Array.from(bundle.children).reverse();
      }
      else {
        tenElement = this.findElement('truck').cloneNode(true) as SVGSVGElement
        tenElementChildren = gsap.utils.toArray(".barrels", tenElement)[0].children;
        for (let j = 0; j < 10; j++) {
          gsap.set(tenElementChildren[j], { visibility: "hidden" });
        }
        gsap.set(tenElement, { x: -tensBBox.x + this.regroupSpacingX, y: -tensBBox.y + ySpacing, visibility: "visible", opacity: 0 });
        this.tensGroup.appendChild(tenElement);

        timeline.to(tenElement, { opacity: 1, duration: 0.5 })
      }

      for (let j = 0; j < 10; j++) {

        let currentOneElement = this.onesGroup.children[i * 10 + j] as SVGSVGElement;
        let currentElementBBox = currentOneElement.getBBox();

        let newX, newY;
        if (this.elementType == "grapes") {
          newX = -currentElementBBox.x + this.grapeLocation[j][0] + this.regroupSpacingX;
          newY = -currentElementBBox.y + this.grapeLocation[j][1] + ySpacing;
        }
        else {
          newX = -currentElementBBox.x + this.barrelLocation[j][0] + this.regroupSpacingX
          newY = -currentElementBBox.y + this.barrelLocation[j][1] + ySpacing
        }

        timeline.to(currentOneElement, {
          x: newX, y: newY, duration: "1", scale: 1, onComplete: function () {
            gsap.set(tenElementChildren[j], { visibility: 'visible', onComplete: function () { currentOneElement.remove(); } });
          }
        }, "<+=0.09");
      }
      ySpacing += tenElement.getBBox().height;

      columnCounter++
      if (columnCounter % 5 == 0 || i == Math.floor(this.startingOnes / 10) - 1) {
        this.regroupSpacingX += tenElement.getBBox().width;
        ySpacing = 80;
      }
      if (columnCounter % 10 == 0) {
        this.regroupSpacingX += 15
      }
      timeline.set(this.onesGroup, { delay: 0 }); //pause slight pause after each row animation
    }
  }

  private animateTensToHundreds(timeline): void {
    let columnCounter = 0;
    let ySpacing = 80
    this.regroupSpacingX = 0;
    for (let i = 0; i < Math.floor(this.tensGroup.children.length / 10); i++) {

      let hundredElement, hundredElementChildren, scale;

      if (this.elementType == "grapes") {
        hundredElement = this.createVine(this.regroupSpacingX, ySpacing);
        hundredElementChildren = gsap.utils.toArray("g", hundredElement.children[1]);
        scale = 1;
      }
      else {
        hundredElement = this.createBoat(this.regroupSpacingX, ySpacing);
        hundredElementChildren = hundredElement.children[1].children;
        scale = 0.5;
      }
      this.hundredsGroup.appendChild(hundredElement);

      timeline.to(hundredElement.children[0], { opacity: 1, duration: 1, delay: 0.25 });

      for (let j = 0; j < 10; j++) {
        let currentTen = this.tensGroup.children[i * 10 + j] as SVGSVGElement;
        let currentTenBBox = currentTen.getBBox();

        let newX, newY;

        if (this.elementType == "grapes") {
          newX = -currentTenBBox.x - currentTenBBox.width + this.regroupSpacingX + (currentTen.children[1] as SVGSVGElement).getBBox().width + this.bundleLocation[j][0];
          newY = -currentTenBBox.y - currentTenBBox.height + ySpacing + (currentTen.children[1] as SVGSVGElement).getBBox().height + this.bundleLocation[j][1];
        }
        else {
          newX = -currentTenBBox.x + this.regroupSpacingX + this.truckLocation[j][0] * scale;
          newY = -currentTenBBox.y + ySpacing + this.truckLocation[j][1] * scale;
        }

        timeline.to(currentTen, {
          x: newX, y: newY, duration: "1", scale: scale, onComplete: function () {
            gsap.set(hundredElementChildren[j], { visibility: 'visible', onComplete: function () { currentTen.remove(); } });
          }
        }, "<+=0.09");
      }
      ySpacing += hundredElement.getBBox().height * scale + 15;

      columnCounter++
      if (columnCounter % 3 == 0 || i == Math.floor(this.tensGroup.children.length / 10) - 1) {
        this.regroupSpacingX += hundredElement.getBBox().width * scale + 15;
        ySpacing = 80;
      }
      timeline.set(this.onesGroup, { delay: 0 }); //pause slight pause after each row animation
    }
  }

  private playRegroup(): void {
    if (!this.animationFinished) {
      this.sliderControls.style.display = "none";
      this.sliderOpen = false;

      const self = this;

      let timeline = gsap.timeline({ onComplete: this.decompose, callbackScope: self });

      this.mainTimeline = timeline;

      this.animateOnesToTens(timeline);

      //animating bundles to vines
      this.animateTensToHundreds(timeline);

      //animating remaining bundles
      let remainingTens = Array.from(this.tensGroup.children) as ChildNode[];
      this.animateRemainingEls(remainingTens, timeline, 1);

      //animating remaining grapes
      this.regroupSpacingX += 20;
      let remainingOnes = Array.from(this.onesGroup.childNodes) as ChildNode[];

      if (this.elementType == "grapes") {
        this.animateRemainingEls(remainingOnes, timeline, 1);
      }
      else {
        this.animateRemainingEls(remainingOnes, timeline, 2);
      }
      this.animationFinished = true;
    }
  }

  private drawTensElements(): void {
    if (this.startingTens > 0) {

      this.regroupSpacingX = 130;
      let ySpacing = 80;

      let tensBBox;
      if (this.elementType == "grapes") {
        let tempBundle = this.createGrapeBundle(0, 0, false);
        this.gsvg.appendChild(tempBundle);
        gsap.set(tempBundle, { visibility: "hidden" });
        tensBBox = tempBundle.getBBox();
        tensBBox.width += 5;
        tensBBox.height += 5;
      }
      else {
        tensBBox = this.findElement('truck').getBBox();
      }
      let secondRow = false;

      for (let i = 0; i < this.startingTens; i++) {
        if (i % 5 == 0 && i % 10 != 0 && i > 0) {
          if (secondRow) {
            this.regroupSpacingX += tensBBox.width;
            ySpacing -= tensBBox.height * 5
          }
          else {
            this.regroupSpacingX += tensBBox.width;
            ySpacing = 80;
          }
        }
        if (i % 10 == 0 && i > 0) {
          if (secondRow) {
            ySpacing = 80;
            this.regroupSpacingX += tensBBox.width + 20;
            secondRow = false;
          }
          else {
            this.regroupSpacingX -= tensBBox.width;
            ySpacing += 20;
            secondRow = true;
          }
        }

        if (this.elementType == "grapes") {
          let bundleGroup = document.createElementNS(svgns, 'g');

          bundleGroup.appendChild(this.createLeaves(this.regroupSpacingX, ySpacing, 1));

          let bundle = this.createGrapeBundle(this.regroupSpacingX, ySpacing, false);
          gsap.set(bundle, { visibility: "visible" });

          bundleGroup.appendChild(bundle);
          this.tensGroup.appendChild(bundleGroup);
        }

        else {
          let truck = this.findElement('truck').cloneNode(true);
          gsap.set(truck, { x: -tensBBox.x + this.regroupSpacingX, y: -tensBBox.y + ySpacing, visibility: "visible" });

          this.tensGroup.appendChild(truck);
        }
        ySpacing += tensBBox.height;
      }
    }
  }

  private drawOnesElements(): void {
    if (this.startingOnes > 0) {
      let onesBBox;
      let scale;
      let href;
      if (this.elementType == "grapes") {
        onesBBox = this.findElement('grape').getBBox();
        scale = 1;
        href = "#grape";
      }
      else {
        onesBBox = this.findElement('barrel').getBBox();
        scale = 2;
        href = "#barrel";
      }

      onesBBox.height += 3;
      onesBBox.width += 3;

      this.regroupSpacingX += 120;
      if (this.startingTens == 0){
        this.regroupSpacingX += 100;
      }
      let ySpacing = 80;
      let secondRow = false;
      for (let i = 0; i < this.startingOnes; i++) {
        if (i % 5 == 0 && i % 10 != 0 && i > 0) {
          if (secondRow) {
            this.regroupSpacingX += onesBBox.width * scale;
            ySpacing -= onesBBox.height * 5 * scale;
          }
          else {
            this.regroupSpacingX += onesBBox.width * scale;
            ySpacing = 80;
          }
        }
        if (i % 10 == 0 && i > 0) {
          if (secondRow) {
            ySpacing = 80;
            this.regroupSpacingX += onesBBox.width * scale + 15;
            secondRow = false;
          }
          else {
            this.regroupSpacingX -= onesBBox.width * scale;
            ySpacing += 15;
            secondRow = true;
          }
        }
        let temp = document.createElementNS(svgns, 'use');
        gsap.set(temp, { attr: { href: href }, x: (-onesBBox.x * scale + this.regroupSpacingX), y: (-onesBBox.y * scale + ySpacing), scale: scale });
        this.findElement('ones').appendChild(temp);
        ySpacing += onesBBox.height * scale;
      }
    }
  }

  //#region SLIDER FUNCTIONS
  private inputFieldPressed(): void {
    if (!this.sliderOpen && !this.animationFinished) {
      if (this.firstTimeOpen) {
        //gsap.set(this.gsvg, {pointerEvents: "none"})
        this.controllerDraggable[0].disable();
        const self = this;
        let start = self.findElement('slider').getBoundingClientRect().x;
        gsap.to(this.findElement("pointerHand"), {
          x: "+=50", yoyo: true, repeat: 1, delay: 0.5, duration: 2, onComplete: () => {
            gsap.set(this.findElement('pointerHand'), { visibility: "hidden" });
            this.controllerDraggable[0].enable();
            this.tutorialFinished = true;
          }
        });
        gsap.to(this.findElement('slider'), {
          x: "+=50", yoyo: true, repeat: 1, delay: 0.5, duration: 2, onUpdate: function () {
            self.sliderNumber.textContent = String(Math.round((self.findElement('slider').getBoundingClientRect().x - start) / self.sliderIncrements));
            gsap.set(self.sliderNumber, { x: -(self.sliderNumber.getBBox().width / 2) });
          }
        });
        this.firstTimeOpen = false;
      }
      this.sliderControls.style.display = "block";
      this.sliderOpen = true;
    }
    else {
      if (this.tutorialFinished) {
        this.sliderControls.style.display = "none";
        this.sliderOpen = false;
      }
    }
  }

  private sliderButtonPressed(button: Element): void {
    let value;
    if (button.id == "largeInc") {
      value = 5;
    }
    else if (button.id == "smallInc") {
      value = 1;
    }
    else if (button.id == "smallDec") {
      value = -1;
    }
    else if (button.id == "largeDec") {
      value = -5;
    }
    let newNumber = parseInt(this.sliderNumber.textContent) + value;
    if (newNumber > this.max) {
      newNumber = this.max;
    }
    else if (newNumber < this.min) {
      newNumber = this.min;
    }
    if (newNumber <= this.max && newNumber >= this.min) {
      this.sliderValueHasBeenUpdated(newNumber);
    }
  }

  private sliderValueHasBeenUpdated(value: number): void {
    this.sliderNumber.textContent = String(value);
    this.sliderNumberValue = value;

    gsap.set(this.sliderNumber, { x: -(this.sliderNumber.getBBox().width / 2) });
    gsap.set(this.slider, { x: this.sliderIncrements * (value - this.min) });
  }

  private addSliderEventListenersAndInteractivity(): void {

    this.numberDisplay.addEventListener("pointerdown", () => this.inputFieldPressed());

    for (let i = 0; i < this.buttons.children.length; i++) {
      this.buttons.children[i].addEventListener("pointerdown", () => this.sliderButtonPressed(this.buttons.children[i]));
    }

    //Initializing draggables, controller and slider
    this.controllerDraggable = Draggable.create(this.sliderControls, {
      type: 'x,y',
    });

    const self = this;

    Draggable.create(this.slider, {
      type: 'x',
      bounds: this.sliderBar,
      cursor: "pointer",
      onPress: function () {
        //disable controller drag if we are dragging slider
        self.controllerDraggable[0].disable();
      },
      onDrag: function () {
        self.sliderValueHasBeenUpdated(Math.round(this.x / self.sliderIncrements) + Number(self.min));
      },
      onDragEnd: function () {
        self.controllerDraggable[0].enable();
      }
    });
  }

  private restart(): void {
    this.mainTimeline.clear();
    this.alternateTimeline.clear();
    Array.from(this.onesGroup.children).forEach(e => e.remove());
    Array.from(this.tensGroup.children).forEach(e => e.remove());
    Array.from(this.hundredsGroup.children).forEach(e => e.remove());
    Array.from(this.findElement('onesText').childNodes).forEach(e => e.remove());
    Array.from(this.findElement('tensText').childNodes).forEach(e => e.remove());
    Array.from(this.findElement('hundredsText').childNodes).forEach(e => e.remove());
    this.animationFinished = false;
    this.sliderOpen = false;
    this.regroupSpacingX = 0;
    this.sliderValueHasBeenUpdated(this.min);

    gsap.set(this.tryAgain, { y: -this.tryAgain.getBBox().height });
    gsap.set(this.correct, { visibility: "hidden" });

    this.drawTensElements();
    this.drawOnesElements();
  }

  private init(): void {

    gsap.registerPlugin(Draggable);

    //calculating increments for slider
    let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width);
    this.sliderIncrements = barWidth / (this.max - this.min);

    gsap.set(this.sliderControls, { display: "none" });
    this.sliderOpen = false;
    gsap.set(this.sliderNumber, { x: -(this.sliderNumber.getBBox().width / 2) });

    //setting slider max and mins and repositioning the max
    this.gsvg.getElementById("maxText").textContent = String(this.max);
    gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` });
    this.gsvg.getElementById("minText").textContent = String(this.min);

    const self = this;
    this.gsvg.addEventListener("pointerdown", (event) => {
      if (self.sliderOpen && event.target == this.gsvg && this.tutorialFinished) {
        self.sliderControls.style.display = "none";
        self.sliderOpen = false;
      }
    });

    this.addSliderEventListenersAndInteractivity();

    //setting popups
    gsap.set(this.tryAgain, { y: -this.tryAgain.getBBox().height });
    gsap.set(this.correct, { visibility: "hidden" });

    this.drawTensElements()
    this.drawOnesElements()

    this.goButton.addEventListener("pointerdown", e => this.playRegroup());
    this.findElement('restart').addEventListener("pointerdown", () => this.restart());

    gsap.set(this.findElement('displayBox'), { transformOrigin: "center" });
    gsap.to(this.findElement('displayBox'), { scale: '+=0.2', yoyo: true, repeat: 5, delay: 0.5 });

  }
}