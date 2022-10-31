import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Draggable, gsap } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export interface FarmSetup {
  type: string
}

export class FarmClass {
  private gsvg: SVGSVGElement;
  private gsvgu: SVGSVGElement;
  private setup: FarmSetup;
  private outerLineStrokeWidth = 2;
  private innerLineStrokeWidth = 1;
  private plotBBox: { x: number, y: number, width: number, height: number };
  private plotIncrementHeight: number;
  private plotIncrementWidth: number;
  private borderGroup: SVGSVGElement;
  private tensPlotLinesGroup: SVGSVGElement;
  private hundredsPlotLinesGroup: SVGSVGElement;
  private thousandsPlotLinesGroup: SVGSVGElement;
  private farmGroup: SVGSVGElement;
  private largeCombine: SVGSVGElement;
  private largeCombineText: SVGSVGElement;
  private largeCombineTrailer: SVGSVGElement;
  private gridState: SVGSVGElement;
  private pointerState: SVGSVGElement;
  private plantButton: SVGSVGElement;
  private moveButton: SVGSVGElement;
  private compassNorth: SVGSVGElement
  private compassEast: SVGSVGElement
  private compassSouth: SVGSVGElement
  private compassWest: SVGSVGElement
  private compassActive = true;
  private zoomLevel = 0;
  private plotArray = Array.from(Array(20), () => new Array(50));
  private isDragging = false;
  private dragEnabled = false;
  private dragStart = { x: 0, y: 0 };
  private TL = gsap.timeline();
  private cropsHarvested = 0;
  private harvestDuration = 5;
  private harvestTotalText: SVGSVGElement;
  private harvestTotalBox: SVGSVGElement;
  private largeCombineDraggable: Draggable[] = [];
  private animationPlaying = false;
  private bedsButton: SVGSVGElement;
  private plotsButton: SVGSVGElement;
  private rowsButton: SVGSVGElement;
  private trailerCrop: SVGSVGElement;
  private trailerCropScale = 0;
  private trailerCropID = 1;
  private barnCounterText: SVGTextElement;
  private cropsDeposited = 0;
  private depositAnimating = false;
  private plantAnimating = false;
  private pause = false;
  private didUserDrag = false;
  private isCombineSnapped = false;
  private snappedIndex = 0;

  private zoomIncrementX: number[] = [];
  private zoomIncrementY: number[] = [];
  private zoomOutLevels = 2;
  private zoomInLevels = 13;

  private plotHREF: string;
  private singleHREF: string;
  private trailerHREF: string;

  private lineColor = 'rgb(52, 128, 104)';
  private plotColor = 'rgb(140, 254, 140)';
  private plotHeight = 250;
  private plotWidth = 250;
  private combine = false;

  public constructor(lowerRenderEl: SVGSVGElement, upperRenderEl: SVGSVGElement, setup: FarmSetup) {
    this.gsvg = lowerRenderEl;
    this.gsvgu = upperRenderEl;
    this.setup = setup;
    this.borderGroup = this.findElementLower('border')
    this.tensPlotLinesGroup = this.findElementLower('tens')
    this.hundredsPlotLinesGroup = this.findElementLower('hundreds')
    this.thousandsPlotLinesGroup = this.findElementLower('thousands')
    this.farmGroup = this.findElementLower('farmGroup')
    this.largeCombine = this.findElementLower('largeCombine')
    this.largeCombineText = this.findElementLower('largeCombineText')
    this.largeCombineTrailer = this.findElementLower('trailer')
    this.harvestTotalText = this.findElementLower('harvestTotalText')
    this.harvestTotalBox = this.findElementLower('harvestTotalBox')
    this.bedsButton = this.findElementUpper('beds')
    this.plotsButton = this.findElementUpper('plots')
    this.rowsButton = this.findElementUpper('rows')
    this.plantButton = this.findElementUpper('plant')
    this.moveButton = this.findElementUpper('move')
    this.compassNorth = this.findElementUpper('north')
    this.compassEast = this.findElementUpper('east')
    this.compassSouth = this.findElementUpper('south')
    this.compassWest = this.findElementUpper('west')
    this.pointerState = this.plantButton;
    this.gridState = this.bedsButton;

    // determine crop
    if (this.setup.type.toLowerCase() === 'grape') {
      this.plotHREF = '#plotGrape';
      this.singleHREF = '#singleGrape';
      this.trailerHREF = '#trailerGrape';
    }
    else {
      this.plotHREF = '#plotWheat';
      this.singleHREF = '#singleWheat';
      this.trailerHREF = '#trailerWheat';
    }

    this.init();
  }

  private findElementLower(id: string): SVGSVGElement {
    return this.gsvg.getElementById(id) as SVGSVGElement
  }

  private findElementUpper(id: string): SVGSVGElement {
    return this.gsvgu.getElementById(id) as SVGSVGElement
  }

  private createLineElement(): SVGLineElement {
    return document.createElementNS(svgns, 'line') as SVGLineElement
  }

  private createRectElement(): SVGRectElement {
    return document.createElementNS(svgns, 'rect') as SVGRectElement
  }

  private createUseElement(): SVGUseElement {
    return document.createElementNS(svgns, 'use') as SVGUseElement
  }

  private setupLinePair(index: number): Node[] {
    const x = index * this.plotIncrementWidth;
    const y = index * this.plotIncrementHeight;

    const verticalLine = this.createLineElement();
    gsap.set(verticalLine, {
      attr: {
        stroke: this.lineColor,
        x1: x,
        x2: x,
        y1: this.plotBBox.y - this.outerLineStrokeWidth / 2,
        y2: this.plotBBox.height + this.outerLineStrokeWidth / 2
      },
      strokeWidth: this.outerLineStrokeWidth
    });
    const horizontalLine = this.createLineElement();
    gsap.set(horizontalLine, {
      attr: { stroke: this.lineColor, x1: this.plotBBox.x, x2: this.plotBBox.width, y1: y, y2: y },
      strokeWidth: this.outerLineStrokeWidth
    });

    return [verticalLine, horizontalLine];
  }

  private setupInnerLines(index: number): void {
    const x = index * this.plotIncrementWidth;
    const y = index * this.plotIncrementHeight;

    // draw inner lines
    for (let j = 1; j < 5; j++) {

      const innerGridIncrementX = (this.plotIncrementWidth - this.outerLineStrokeWidth) / 5;
      const innerVerticalLine = this.createLineElement();
      gsap.set(innerVerticalLine, {
        attr: {
          stroke: this.lineColor,
          x1: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2,
          x2: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2,
          y1: this.plotBBox.y, y2: this.plotBBox.height
        },
        strokeWidth: this.innerLineStrokeWidth
      });
      this.thousandsPlotLinesGroup.appendChild(innerVerticalLine);
    }
    const innerGridIncrementY = this.plotIncrementHeight / 2;
    const innerHorizontalLine = this.createLineElement();
    gsap.set(innerHorizontalLine, {
      attr: {
        stroke: this.lineColor,
        x1: this.plotBBox.x,
        x2: this.plotBBox.width,
        y1: y + innerGridIncrementY,
        y2: y + innerGridIncrementY
      },
      strokeWidth: this.innerLineStrokeWidth
    });
    this.thousandsPlotLinesGroup.appendChild(innerHorizontalLine);
  }

  private addBorderGroup(lines: Node[]): void {
    this.borderGroup.append(lines[0]);
    this.borderGroup.append(lines[1]);
  }

  // generates lines of the plot
  private generateLines(): void {
    this.addBorderGroup(this.setupLinePair(0));

    this.setupInnerLines(0)

    for (let i = 1; i < 10; i++) {
      const firstLine = this.setupLinePair(i);
      this.tensPlotLinesGroup.appendChild(firstLine[1]);
      this.hundredsPlotLinesGroup.appendChild(firstLine[0]);

      this.setupInnerLines(i);
    }

    this.addBorderGroup(this.setupLinePair(10));
  }

  // pre-fills plots with crop pngs
  private fillPlot(): void {

    const innerGridIncrementX = this.plotIncrementWidth / 5;
    const innerGridIncrementY = this.plotIncrementHeight / 2;

    for (let index = 0; index < 20; index++) {
      for (let jIndex = 50; jIndex > 0; jIndex--) {
        const plotArrayI = 19 - index;
        const plotArrayJ = jIndex - 1;

        const xVal = (50 - jIndex) * (innerGridIncrementX) + (1 - ((50 - jIndex) % 5) * 0.2);
        const yVal = (index) * (innerGridIncrementY) + (0.8 - (index % 2) * 0.5);
        const rectID = `${plotArrayI}-${plotArrayJ}`;

        // animate flower
        const png = this.createUseElement();
        gsap.set(png, { attr: { href: this.plotHREF, id: rectID }, scaleX: 0, scaleY: 0.24, visibility: 'hidden', x: xVal, y: yVal });
        this.findElementLower('fill').appendChild(png);

        this.plotArray[plotArrayI][plotArrayJ] = png;
      }
    }
  }

  private handlePointerDown(e: PointerEvent): void {
    // if user has screen drag enabled
    if (this.dragEnabled && !this.animationPlaying) {
      // start screen drag
      let pt = this.gsvg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      this.dragStart.x = pt.x;
      this.dragStart.y = pt.y;
      this.isDragging = true;
    }
    // else we pause the animation if playing
    else if (this.animationPlaying) {
      if (this.pause) {
        this.TL.resume();
        this.pause = false;
      }
      else {
        this.TL.pause();
        this.pause = true;
      }
    }
  }

  private whileDrag(e: PointerEvent): void {
    if (this.isDragging && !this.animationPlaying) {
      // update screen drag
      const baseViewbox = this.gsvg.viewBox.baseVal;
      let pt = this.gsvg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());
      gsap.set(this.gsvg, {
        attr: {
          viewBox: `${baseViewbox.x + (this.dragStart.x - pt.x)} ${baseViewbox.y + (this.dragStart.y - pt.y)} ${baseViewbox.width} ${baseViewbox.height}`
        }
      });
    }
  }

  private endDrag(): void {
    this.isDragging = false;
  }

  private hidePlot(index: number, jIndex: number, timeline: any, delay: string, self: FarmClass): void {
    timeline.to(this.plotArray[index][jIndex], {
      duration: 1,
      onComplete: function () { timeline.set(self.plotArray[index][jIndex], { visibility: 'hidden' }) },
      scaleX: 0
    }, delay);

    timeline.to(this.plotArray[index + 1][jIndex], {
      duration: 1,
      onComplete: function () { timeline.set(self.plotArray[index + 1][jIndex], { visibility: 'hidden' }) },
      scaleX: 0
    }, '<');
  }

  private showPlot(index: number, jIndex: number, timeline: any, delay: string): void {
    timeline.set(this.plotArray[index][jIndex], { visibility: 'visible' }, delay);
    timeline.to(this.plotArray[index][jIndex], { duration: 1, scaleX: 0.22 }, '<');

    timeline.set(this.plotArray[index + 1][jIndex], { visibility: 'visible' }, '<');
    timeline.to(this.plotArray[index + 1][jIndex], { duration: 1, scaleX: 0.22 }, '<');
  }

  // eslint-disable-next-line complexity
  private plantOrRemoveFlower(e: PointerEvent): void {
    if (this.pointerState === this.plantButton && !this.plantAnimating && !this.animationPlaying) {
      // Calculate original point
      let pt = this.gsvg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      pt = pt.matrixTransform(this.farmGroup.getScreenCTM()!.inverse());

      // checks bounds so that rects cannot be placed outside of plot
      if (pt.x < 0) {
        pt.x = 0;
      }
      else if (pt.x > this.plotHeight) {
        pt.x = this.plotHeight - 1;
      }
      if (pt.y < 0) {
        pt.y = 0;
      }
      else if (pt.y > this.plotWidth) {
        pt.y = this.plotWidth - 1;
      }

      const innerGridIncrementX = this.plotIncrementWidth / 5;
      const innerGridIncrementY = this.plotIncrementHeight / 2;

      // current grid is rotated for plant/harvest animation, (0,0 is actually 19,49)
      const i = 19 - Math.floor(pt.y / innerGridIncrementY);
      const j = 49 - Math.floor(pt.x / innerGridIncrementX);

      // if element exists where clicking, remove it
      if (this.plotArray[i][j]) {

        const timeline = gsap.timeline();

        if (this.gridState === this.bedsButton) { // if working with beds
          if (this.plotArray[i][j].style.visibility === 'hidden') {// if current bed is hidden, unhide it
            gsap.set(this.plotArray[i][j], { visibility: 'visible' });
            gsap.to(this.plotArray[i][j], { duration: 1, scaleX: 0.22 });
          }
          else {// else hide it
            gsap.to(this.plotArray[i][j], { duration: 1, scaleX: 0 });
            gsap.set(this.plotArray[i][j], { delay: 1, visibility: 'hidden' });
          }
        }
        else if (this.gridState === this.plotsButton) {// if working with plots
          const index = Math.floor(i / 2) * 2;

          if (this.plotArray[i][j].style.visibility === 'hidden') {// if current bed is hidden, unhide it
            for (let jIndex = Math.floor(j / 5) * 5 + 4; jIndex >= Math.floor(j / 5) * 5; jIndex--) {
              this.showPlot(index, jIndex, timeline, '<+=0.05');
            }
          }
          else {// else hide it
            const self = this
            for (let jIndex = Math.floor(j / 5) * 5; jIndex < Math.floor(j / 5) * 5 + 5; jIndex++) {
              this.hidePlot(index, jIndex, timeline, '<+=0.05', self);
            }
          }
        }
        else {// else (working with rows)
          const index = Math.floor(i / 2) * 2;
          if (this.plotArray[i][j].style.visibility === 'hidden') {// if current row is hidden, unhide it
            for (let jIndex = 49; jIndex >= 0; jIndex--) {
              this.showPlot(index, jIndex, timeline, '<+=0.02');
            }
          }
          else {// else hide it
            const self = this
            for (let jIndex = 0; jIndex < 50; jIndex++) {
              this.hidePlot(index, jIndex, timeline, '<+=0.02', self);
            }
          }
        }
      }
    }
  }

  private handlePlay(): void {
    if (!this.animationPlaying && this.isCombineSnapped) {
      let largept = this.gsvg.createSVGPoint();

      // calculating end position
      largept.x = this.largeCombineDraggable[0].x;
      largept.y = this.largeCombineDraggable[0].y;

      // current point is transformed 1.farmgroup 2. screenMatrix inverse
      largept = largept.matrixTransform(this.gsvg.getScreenCTM()!); // undo screenmatrix to get position relative to farm
      largept = largept.matrixTransform(this.farmGroup.getScreenCTM()!.inverse()); // undo farmgroup to calculate end position

      largept.x -= this.plotWidth + this.largeCombine.getBBox().width / 2 + 5;

      largept = largept.matrixTransform(this.farmGroup.getScreenCTM()!);
      largept = largept.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      // prevent combine from being draggable after animation start
      this.largeCombineDraggable[0].disable();

      // pre calculating the two rows to be harvested
      let preCount = 0;

      const arr: SVGSVGElement[][] = []; // creating array of crop elements to be harvested
      for (let j = 0; j < 50; j++) {
        const el1 = this.plotArray[Math.floor(this.snappedIndex * 2 / 2) * 2][j];
        const el2 = this.plotArray[Math.floor(this.snappedIndex * 2 / 2) * 2 + 1][j];

        if (el1.style.visibility === 'visible') {
          preCount += 0.001;
        }
        if (el2.style.visibility === 'visible') {
          preCount += 0.001;
        }
        const temp = [el1, el2];
        arr.push(temp);
      }

      const postCount = this.cropsHarvested + preCount;

      // animate combine
      const self = this

      this.TL.to(self.largeCombineText, {
        duration: self.harvestDuration, ease: 'linear', onComplete: function () {
          self.animationPlaying = false;
          self.largeCombineDraggable[0].enable();
          self.isCombineSnapped = false;

          if (self.cropsHarvested !== postCount) {// update harvest number if off
            self.cropsHarvested = postCount;
            self.harvestTotalText.textContent = String(self.cropsHarvested.toFixed(3));
            gsap.set(self.harvestTotalText, { x: - self.harvestTotalText.getBBox().width / 2 });
          }
        }, x: largept.x,
        y: largept.y
      });

      // animate entire row of crops that the combine is placed on
      arr.forEach(e => {
        this.TL.to(e, {
          delay: 0.001, duration: (self.harvestDuration - 1) / 50 + 0.002, onComplete: function () { gsap.set(e, { visibility: 'hidden' }); },
          onStart: function () {
            // if the trailer crop has reached full size, move onto the next trailer crop png
            if (self.trailerCropScale >= 0.8 && self.trailerCropID < 10) {
              self.trailerCropScale = 0;
              self.trailerCropID++;
              self.trailerCrop = self.gsvg.getElementById('crop' + self.trailerCropID) as SVGSVGElement;
            }
            if (e[0].style.visibility === 'visible') {// if subrow 1 crop element is visible
              self.cropsHarvested += 0.001; // increment harvest count
              self.trailerCropScale += 0.008; // increment trailer crop scale
              if (self.trailerCropID <= 10 && self.trailerCropScale <= 0.8) {
                // actually update scale of trailer crop
                gsap.set(self.trailerCrop, { scaleX: self.trailerCropScale, scaleY: self.trailerCropScale });
              }
            }
            if (e[1].style.visibility === 'visible') {// if subrow 2 crop element is visible
              self.cropsHarvested += 0.001;
              self.trailerCropScale += 0.008;
              if (self.trailerCropID <= 10 && self.trailerCropScale <= 0.8) {
                gsap.set(self.trailerCrop, { scaleX: self.trailerCropScale, scaleY: self.trailerCropScale });
              }
            }
            // update harvested text
            self.harvestTotalText.textContent = String(self.cropsHarvested.toFixed(3));
            gsap.set(self.harvestTotalText, { x: - self.harvestTotalText.getBBox().width / 2 });
          },
          scaleX: 0
        }, `<+=${(self.harvestDuration - 1) / 50 + 0.002}`);
      });
      this.animationPlaying = true;
    }
    else {
      alert('Move the orange combine into place.');
    }
  }

  private handleZoomIn(): void {
    if (!this.animationPlaying) {
      let index = this.zoomOutLevels;

      if (this.zoomLevel < 0) {
        index = Math.abs(this.zoomLevel) - 1; // use the index-1 if we are already zoomed out
      }
      else if (this.zoomLevel > 0) {
        index = this.zoomLevel + this.zoomOutLevels;
      }
      if (this.zoomLevel < this.zoomInLevels - 1) {
        const baseViewbox = this.gsvg.viewBox.baseVal;

        const offsetX = (250 - baseViewbox.width / 2);
        const offsetY = (250 - baseViewbox.height / 2);

        const width = Math.max((baseViewbox.width - this.zoomIncrementX[index]), 3);
        const height = Math.max((baseViewbox.height - this.zoomIncrementY[index]), 3);

        const x = (250 - width / 2) + (baseViewbox.x - offsetX);
        const y = (250 - height / 2) + (baseViewbox.y - offsetY);

        gsap.to(this.gsvg, { attr: { viewBox: `${x} ${y} ${width} ${height}` }, duration: 0 });
        this.zoomLevel++;
      }
    }
  }

  private handleZoomOut(): void {
    if (!this.animationPlaying) {
      let index = 0;
      if (this.zoomLevel < 0) {
        index = Math.abs(this.zoomLevel);
      }
      else if (this.zoomLevel > 0) {
        index = this.zoomLevel + this.zoomOutLevels - 1; // use the index-1 if we are already zoomed in
      }
      if (this.zoomLevel > -this.zoomOutLevels) {
        const baseViewbox = this.gsvg.viewBox.baseVal;

        const offsetX = (250 - baseViewbox.width / 2);
        const offsetY = (250 - baseViewbox.height / 2);

        const width = (baseViewbox.width + this.zoomIncrementX[index]);
        const height = (baseViewbox.height + this.zoomIncrementY[index]);

        const x = (250 - width / 2) + (baseViewbox.x - offsetX);
        const y = (250 - height / 2) + (baseViewbox.y - offsetY);

        gsap.to(this.gsvg, { attr: { viewBox: `${x} ${y} ${width} ${height}` }, duration: 0 });

        this.zoomLevel--;
      }
    }
  }

  // sets the new grid lines and sets button as active
  private gridToggleHelper(gridState: SVGSVGElement, thousandsDisplay: string, hundredsDisplay: string): void {
    const temp: SVGSVGElement[] = gsap.utils.toArray('rect', gridState);
    gsap.set(this.thousandsPlotLinesGroup, { display: thousandsDisplay });
    gsap.set(this.hundredsPlotLinesGroup, { display: hundredsDisplay });
    temp[0].style.fill = '#c3e7b3';
  }

  private handleGridToggle(element: SVGSVGElement): void {
    // gets current button and sets it as inactive
    const currentGridStateArr: SVGSVGElement[] = gsap.utils.toArray('rect', this.gridState);
    currentGridStateArr[0].style.fill = '#93c47d';
    this.gridState = element;

    if (this.gridState === this.bedsButton) {
      this.gridToggleHelper(this.bedsButton, 'block', 'block');
    }
    else if (this.gridState === this.plotsButton) {
      this.gridToggleHelper(this.plotsButton, 'none', 'block');
    }
    else {
      this.gridToggleHelper(this.rowsButton, 'none', 'none');
    }
  }

  private handlePointerChange(element: SVGSVGElement): void {
    let currentPointerStateArr: SVGSVGElement[] = gsap.utils.toArray('circle', this.pointerState);
    currentPointerStateArr[0].style.fill = '#93c47d';
    this.pointerState = element;
    this.dragEnabled = false;
    this.gsvg.style.cursor = 'default';
    this.gsvg.style.touchAction = 'auto';

    if (this.pointerState === this.plantButton) {
      this.farmGroup.style.cursor = 'pointer';
    }
    else if (this.pointerState === this.moveButton) {
      this.gsvg.style.touchAction = 'pinch-zoom';/* lets pointer events work with mobile. allowing pinch zoom incase user gets locked out */
      this.dragEnabled = true;
      this.gsvg.style.cursor = 'move';
      this.farmGroup.style.cursor = 'move';

    }
    currentPointerStateArr = gsap.utils.toArray('circle', this.pointerState);
    currentPointerStateArr[0].style.fill = '#c3e7b3';
  }

  private handleCompassMove(element: SVGSVGElement): void {
    const baseViewbox = this.gsvg.viewBox.baseVal;

    if (element === this.compassNorth){
      const increment = baseViewbox.height/10
      gsap.set(this.gsvg, {
        attr: {
          viewBox: `${baseViewbox.x} ${baseViewbox.y - increment} ${baseViewbox.width} ${baseViewbox.height}`
        }
      });
    }
    else if (element === this.compassEast) {
      const increment = baseViewbox.width/10
      gsap.set(this.gsvg, {
        attr: {
          viewBox: `${baseViewbox.x + increment} ${baseViewbox.y} ${baseViewbox.width} ${baseViewbox.height}`
        }
      });
    }
    else if (element === this.compassSouth) {
      const increment = baseViewbox.height/10
      gsap.set(this.gsvg, {
        attr: {
          viewBox: `${baseViewbox.x} ${baseViewbox.y + increment} ${baseViewbox.width} ${baseViewbox.height}`
        }
      });
    }
    else if (element === this.compassWest) {
      const increment = baseViewbox.width/10
      gsap.set(this.gsvg, {
        attr: {
          viewBox: `${baseViewbox.x - increment} ${baseViewbox.y} ${baseViewbox.width} ${baseViewbox.height}`
        }
      });
    }
  }

  private toggleCompass(): void {
    console.log("hey")
    const moveButtonArr: SVGSVGElement[] = gsap.utils.toArray('circle', this.moveButton);
    if (this.compassActive) {
      moveButtonArr[0].style.fill = '#93c47d'
      gsap.set(this.findElementUpper('compass'), {visibility: 'hidden'})
      this.compassActive = false
    }
    else {
      moveButtonArr[0].style.fill = '#c3e7b3'
      gsap.set(this.findElementUpper('compass'), {visibility: 'visible'})
      this.compassActive = true
    }
  }

  /*
  private handleDeposit(): void {
    if (!this.animationPlaying && !this.depositAnimating && !this.didUserDrag && this.cropsHarvested > 0) {
      this.TL.clear(); // clear timeline else the animation would be buggy

      this.largeCombineDraggable[0].disable();
      this.depositAnimating = true;

      this.barnCounterText.textContent = String(this.cropsDeposited.toFixed(3));
      gsap.set(this.barnCounterText, {
        x: 432 - this.barnCounterText.getBBox().width / 2,
        y: 125 + this.barnCounterText.getBBox().width / 4
      });

      this.harvestTotalText.textContent = String(this.cropsHarvested.toFixed(3));
      gsap.set(this.harvestTotalText, { x: - this.harvestTotalText.getBBox().width / 2 });

      // getting position of combine relative to svg
      let pt = this.gsvg.createSVGPoint();
      pt.x = this.largeCombineText.getBoundingClientRect().x;
      pt.y = this.largeCombineText.getBoundingClientRect().y;
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      const xEndLocation = 367
      const yEndLocation = 86

      // creating crop elements for deposit animation
      for (let i = 0; i < Math.ceil(this.cropsHarvested * 10) - 1; i++) {
        const crop = this.createUseElement();
        this.TL.set(crop, { attr: { href: this.singleHREF }, x: pt.x + 22, y: pt.y + 28 }, '<+=0.1');
        this.gsvg.appendChild(crop);
        this.TL.to(crop, { duration: 2, onComplete: function () { crop.remove() }, x: xEndLocation, y: yEndLocation }, '<');
      }

      // creating the "last" crop element so that we can expand on OnComplete
      const crop = this.createUseElement();
      this.TL.set(crop, { attr: { href: this.singleHREF }, x: pt.x + 22, y: pt.y + 28 }, '<');
      this.gsvg.appendChild(crop);

      const self = this

      this.TL.to(crop, {
        duration: 2, onComplete: function () {
          crop.remove();

          // update combine and barn numbers
          self.cropsDeposited += self.cropsHarvested;
          self.cropsHarvested = 0;
          self.barnCounterText.textContent = String(self.cropsDeposited.toFixed(3));
          gsap.set(self.barnCounterText, {
            x: 432 - self.barnCounterText.getBBox().width / 2,
            y: 125 + self.barnCounterText.getBBox().width / 4
          });
          self.harvestTotalText.textContent = String(self.cropsHarvested.toFixed(3));
          gsap.set(self.harvestTotalText, { x: - self.harvestTotalText.getBBox().width / 2 });

          // reset crop in trailer
          gsap.utils.toArray('use', self.largeCombineTrailer).forEach((element: any) => {
            gsap.set(element, { scaleX: 0, scaleY: 0 });
          });
          self.depositAnimating = false;

        }, x: xEndLocation, y: yEndLocation
      }, '<');

      // reset trailer crop variables
      this.trailerCropScale = 0;
      this.trailerCropID = 1;
      this.largeCombineDraggable[0].enable();
      this.trailerCrop = this.findElementLower('crop' + this.trailerCropID) as SVGSVGElement;
    }
  }

  */
  private handleDeposit(): void {
    if (!this.animationPlaying && !this.depositAnimating && !this.didUserDrag && this.cropsHarvested > 0) {
      this.TL.clear(); // clear timeline else the animation would be buggy

      this.largeCombineDraggable[0].disable();
      this.depositAnimating = true;

      this.barnCounterText.textContent = String(this.cropsDeposited.toFixed(3));
      gsap.set(this.barnCounterText, {
        x: 432 - this.barnCounterText.getBBox().width / 2,
        y: 125 + this.barnCounterText.getBBox().width / 4
      });

      this.harvestTotalText.textContent = String(this.cropsHarvested.toFixed(3));
      gsap.set(this.harvestTotalText, { x: - this.harvestTotalText.getBBox().width / 2 });

      // getting position of combine relative to svg
      let pt = this.gsvg.createSVGPoint();
      pt.x = this.largeCombineText.getBoundingClientRect().x;
      pt.y = this.largeCombineText.getBoundingClientRect().y;
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());

      const xEndLocation = 0 + 20
      const yEndLocation = 250

      // creating crop elements for deposit animation
      for (let i = 0; i < Math.ceil(this.cropsHarvested * 100) - 1; i++) {
        const crop = this.createUseElement();
        this.TL.set(crop, { attr: { href: this.singleHREF }, x: pt.x + 22, y: pt.y + 28 }, '<+=0.1');
        this.gsvg.appendChild(crop);
        this.TL.to(crop, { duration: 2, onComplete: function () { crop.remove() }, x: xEndLocation, y: yEndLocation }, '<');
      }

      // creating the "last" crop element so that we can expand on OnComplete
      const crop = this.createUseElement();
      this.TL.set(crop, { attr: { href: this.singleHREF }, x: pt.x + 22, y: pt.y + 28 }, '<');
      this.gsvg.appendChild(crop);

      const self = this

      this.TL.to(crop, {
        duration: 2, onComplete: function () {
          crop.remove();
          // update combine and barn numbers
          let filledBarrels = Math.floor(self.cropsHarvested * 100)
          console.log(filledBarrels)
          self.cropsDeposited += self.cropsHarvested;
          self.cropsHarvested = 0;
          self.harvestTotalText.textContent = String(self.cropsHarvested.toFixed(3));
          gsap.set(self.harvestTotalText, { x: - self.harvestTotalText.getBBox().width / 2 });

          let els = gsap.utils.toArray(".barrel", self.findElementLower('barrels')).reverse()
          console.log(els)
          for (let i = 0; i < els.length; i++) {
            console.log(i, filledBarrels)
            if (filledBarrels > 0) {
              gsap.set(els[i], { visibility: 'visible' });
              filledBarrels--;
            }
            else {
              break
            }
          }

          let pt = self.gsvg.createSVGPoint();

          // calculating end position
          pt.x = -self.findElementLower('truck').getBBox().x
          pt.y = -self.findElementLower('truck').getBBox().y + 250
    
          // current point is transformed 1.farmgroup 2. screenMatrix inverse
          pt = pt.matrixTransform(self.gsvg.getScreenCTM()!); // undo screenmatrix to get position relative to farm
          pt = pt.matrixTransform(self.farmGroup.getScreenCTM()!.inverse()); // undo farmgroup to calculate end position
    
          pt.y -= 200
    
          pt = pt.matrixTransform(self.farmGroup.getScreenCTM()!);
          pt = pt.matrixTransform(self.gsvg.getScreenCTM()!.inverse());

          gsap.to(self.findElementLower('truck'), {x:pt.x, y:pt.y, ease: 'linear', duration: 2})

          // reset crop in trailer
          gsap.utils.toArray('use', self.largeCombineTrailer).forEach((element: any) => {
            gsap.set(element, { scaleX: 0, scaleY: 0 });
          });
          self.depositAnimating = false;

        }, x: xEndLocation, y: yEndLocation
      }, '<');

      // reset trailer crop variables
      this.trailerCropScale = 0;
      this.trailerCropID = 1;
      this.largeCombineDraggable[0].enable();
      this.trailerCrop = this.findElementLower('crop' + this.trailerCropID) as SVGSVGElement;
    }
  }

  private calculateZoomIncrements(): void {
    const baseViewbox = this.gsvg.viewBox.baseVal;
    let lastWidth = baseViewbox.width;
    let lastHeight = baseViewbox.height;

    for (let i = 0; i < this.zoomOutLevels; i++) {
      let temp = lastWidth / 3;
      this.zoomIncrementX.push(temp);
      lastWidth += temp;

      temp = lastHeight / 3;
      this.zoomIncrementY.push(temp);
      lastHeight += temp;
    }

    lastWidth = baseViewbox.width;
    lastHeight = baseViewbox.height;

    for (let i = 0; i < this.zoomInLevels; i++) {
      let temp = lastWidth / 3;
      this.zoomIncrementX.push(temp);
      lastWidth -= temp;

      temp = lastHeight / 3;
      this.zoomIncrementY.push(temp);
      lastHeight -= temp;
    }
  }

  private init(): void {
    gsap.registerPlugin(Draggable);

    gsap.set(this.findElementLower('truck'), {x: -this.findElementLower('truck').getBBox().x, y:-this.findElementLower('truck').getBBox().y + 250})

    console.log(gsap.utils.toArray(".barrel", this.findElementLower('barrels')))
    gsap.utils.toArray(".barrel", this.findElementLower('barrels')).forEach((element: any) => {
      gsap.set(element, { visibility: 'hidden' });
    });

    // farm plot init
    const farmPlot = this.createRectElement();
    gsap.set(farmPlot, { attr: { id: 'farmPlot' }, fill: this.plotColor, height: this.plotHeight, width: this.plotWidth });
    this.findElementLower('plot').appendChild(farmPlot);

    this.plotBBox = (this.findElementLower('farmPlot') as SVGSVGElement).getBBox();
    this.plotIncrementWidth = this.plotBBox.width / 10;
    this.plotIncrementHeight = this.plotBBox.height / 10;

    // plant icon init
    const icon = this.createUseElement();

    const plantBBox = (this.plantButton as unknown as SVGSVGElement).getBBox();

    gsap.set(icon, { attr: { href: this.singleHREF }, scale: 1.5 });
    const iconBBox = (icon as unknown as SVGSVGElement).getBBox();
    gsap.set(icon, { x: plantBBox.x + plantBBox.width / 2 - (iconBBox.width * 1.5) / 2, y: plantBBox.y + plantBBox.height / 2 - (iconBBox.height * 1.5) / 2 });
    //this.plantButton.appendChild(icon);

    // generating grid lines
    this.generateLines();
    this.fillPlot();

    // zoom calculations
    this.calculateZoomIncrements();

    // setting active button colors
    gsap.set(this.gsvg, { backgroundColor: 'rgb(33, 192, 96)' });
    const plantButtonArr: SVGSVGElement[] = gsap.utils.toArray('circle', this.plantButton);
    plantButtonArr[0].style.fill = '#c3e7b3';

    const moveButtonArr: SVGSVGElement[] = gsap.utils.toArray('circle', this.moveButton);
    moveButtonArr[0].style.fill = '#c3e7b3';

    const bedsButtonArr: SVGSVGElement[] = gsap.utils.toArray('rect', this.bedsButton);
    bedsButtonArr[0].style.fill = '#c3e7b3';

    // fill-box allows rotation about center
    gsap.set(this.farmGroup, { rotate: 45, skewX: 165, skewY: 165, transformBox: 'fill-box', transformOrigin: 'center' });
    gsap.set(this.farmGroup, { x: 125, y: 100 });

    // combine start pos
    gsap.set(this.largeCombineText, { x: 60 - this.largeCombineText.getBBox().x, y: 70 - this.largeCombineText.getBBox().y });

    // harvest number init
    this.harvestTotalText.textContent = '0';
    gsap.set(this.harvestTotalText, { x: - this.harvestTotalText.getBBox().width / 2 });

    // creating trailer crop elements
    let cropX = -46; // hardcoded X poisition
    let cropY = 10; // hardcoded Y position
    let cropid = 1;
    for (let i = 0; i < 5; i++) {
      let crop = this.createUseElement();
      gsap.set(crop, {
        attr: { href: this.trailerHREF, id: 'crop' + cropid },
        rotate: 45,
        scaleX: 0,
        scaleY: 0,
        skewX: 165,
        skewY: 165,
        x: cropX,
        y: cropY
      });
      this.largeCombineTrailer.appendChild(crop);

      crop = this.createUseElement();
      gsap.set(crop, {
        attr: { href: this.trailerHREF, id: 'crop' + (cropid + 5) },
        rotate: 45,
        scaleX: 0,
        scaleY: 0,
        skewX: 165,
        skewY: 165,
        x: (cropX + 10),
        y: (cropY - 7)
      });
      this.largeCombineTrailer.appendChild(crop);
      cropX -= 12;
      cropY -= 7;
      cropid++;
    }

    this.trailerCrop = this.findElementLower('crop1') as SVGSVGElement;

    // creating draggable + snapping points
    let pt = this.gsvg.createSVGPoint();

    const largeCombineSnapPoints: { x: number, y: number }[] = [];
    for (let i = 1; i < 11; i++) {
      pt.x = this.plotWidth + this.largeCombineText.getBBox().width + 63; // +63 is hardcoded offset
      pt.y = (Math.floor((20 - i * 2) / 2) * (this.plotIncrementHeight / 2) * 2) - 74; // -74 is hardcoded offset
      pt = pt.matrixTransform(this.farmGroup.getScreenCTM()!);
      pt = pt.matrixTransform(this.gsvg.getScreenCTM()!.inverse());
      const temp = { x: pt.x, y: pt.y };
      largeCombineSnapPoints.push(temp);
    }

    const self = this

    this.largeCombineDraggable = Draggable.create(this.largeCombineText, {
      liveSnap: {
        points: largeCombineSnapPoints,
        radius: 50
      },
      onDragStart: function () {
        self.didUserDrag = true;
      },
      onPress: function () {
        if (self.pointerState === self.moveButton) {
          self.dragEnabled = false;
        }
      },
      onRelease: function () {
        for (let index = 0; index < largeCombineSnapPoints.length; index++) {
          if (Math.round(this.x) === Math.round(largeCombineSnapPoints[index].x)) {
            self.isCombineSnapped = true;
            self.snappedIndex = index;
            break;
          }
        }
        if (self.pointerState === self.moveButton) {
          self.dragEnabled = true;
        }
        self.didUserDrag = false;
      },
      type: 'x,y'
    });

    Draggable.create(this.findElementLower('truck'), {type:'x,y'})

    // barn counter init
    const temp = document.createElementNS(svgns, 'text') as SVGTextElement;
    gsap.set(temp, {
      fill: '#ffffff',
      fontFamily: 'arial',
      fontSize: 16,
      fontWeight: 600,
      rotate: -30,
      skewX: -30,
      textContent: '0',
      userSelect: 'none'
    });
    gsap.set(temp, { x: 432 - temp.getBBox().width / 2, y: 125 + temp.getBBox().width / 4 });
    this.barnCounterText = temp;
    this.gsvg.appendChild(temp);

    // event listeners
    this.farmGroup.addEventListener('pointerdown', (e: PointerEvent) => { this.plantOrRemoveFlower(e) });

    this.findElementUpper('zoomIn').addEventListener('pointerdown', () => this.handleZoomIn());
    this.findElementUpper('zoomOut').addEventListener('pointerdown', () => this.handleZoomOut());

    this.gsvg.addEventListener('pointerdown', (e: PointerEvent) => this.handlePointerDown(e));
    this.gsvg.addEventListener('pointermove', (e: PointerEvent) => this.whileDrag(e));
    this.gsvg.addEventListener('pointerup', () => this.endDrag());

    this.harvestTotalBox.addEventListener('pointerup', () => this.handleDeposit());

    this.findElementUpper('playButton').addEventListener('pointerdown', () => this.handlePlay());

    this.moveButton.addEventListener('pointerdown', () => this.toggleCompass())
    //gsap.utils.toArray('.pointer').forEach((element: any) => element.addEventListener('pointerdown', () => this.handlePointerChange(element)));
    gsap.utils.toArray('.grid').forEach((element: any) => element.addEventListener('pointerdown', () => this.handleGridToggle(element)));
    gsap.utils.toArray('.compass').forEach((element: any) => element.addEventListener('pointerdown', () => this.handleCompassMove(element)));
  }
}