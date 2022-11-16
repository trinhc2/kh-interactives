import { gsap } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  tl: any
  bundleLocation = [[60, 25, 1], [130, 27, -1], [23, 70, 1], [85, 90, -1], [140, 85, -1], [165, 75, 1], [10, 130, 1], [70, 155, -1], [90, 140, 1], [155, 140, -1]]
  grapeLocation = [[0,0], [12, -4], [23, 2], [11,8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]
  grapeLocationFlipped = [[0,0], [-12, -4], [-23, 2], [-11,8], [2, 10], [-7, 19], [-20, 14], [-9, 28], [-20, 23], [-17, 36]]

  public constructor(gsvg: SVGSVGElement) {
    this.gsvg = gsvg
    this.tl = gsap.timeline()

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

private createGrapeBundle(x, y): SVGSVGElement{
  let group = document.createElementNS(svgns, 'g')
  let bbox = this.findElement('grape').getBBox()

  for (let i = 0; i < this.grapeLocation.length; i ++){
    let use = document.createElementNS(svgns, 'use')
    gsap.set(use, {attr: {href: "#grape", visibility: 'hidden'}, x:-bbox.x + this.grapeLocation[i][0] + x, y: -bbox.y + this.grapeLocation[i][1] + y})
    group.appendChild(use)
  }

  this.redrawElements(Array.from(group.children))

  this.gsvg.appendChild(group)
  //console.log(group.getBBox())
  return group as SVGSVGElement
}

private createGrapeBundleFlipped(x,y): SVGSVGElement {
  let group = document.createElementNS(svgns, 'g')
  let bbox = this.findElement('grape').getBBox()

  for (let i = 0; i < this.grapeLocationFlipped.length; i ++){
    let use = document.createElementNS(svgns, 'use')
    let newX = -bbox.x + this.grapeLocationFlipped[i][0] + x
    let newY = -bbox.y + this.grapeLocationFlipped[i][1] + y

    gsap.set(use, {attr: {href: "#grape", visibility: 'hidden'}, x: newX, y: newY})
    group.appendChild(use)
  }

  this.redrawElements(Array.from(group.children))

  this.gsvg.appendChild(group)
  //console.log(group.getBBox())
  return group as SVGSVGElement
}

private fillVine(x, y) {
  let group = document.createElementNS(svgns, 'g')

  for (let i = 0; i < this.bundleLocation.length; i++){
    if (this.bundleLocation[i][2] == -1) {
      let grapeBundle = this.createGrapeBundleFlipped(x, y)
      gsap.set(grapeBundle, {x: this.bundleLocation[i][0], y: this.bundleLocation[i][1]})
      group.appendChild(grapeBundle)
    }
    else {
      let grapeBundle = this.createGrapeBundle(x, y)
      gsap.set(grapeBundle, {x: this.bundleLocation[i][0], y: this.bundleLocation[i][1]})
      group.appendChild(grapeBundle)
    }
  }

  this.gsvg.appendChild(group)

  return group
}

private play(x, y, group) {
  let rows = document.createElementNS(svgns, 'g')
  let bbox = this.findElement('grape').getBBox()
  let ySpacing = 0
  for (let i = 0; i < 10; i++){
    let row = document.createElementNS(svgns, 'g')
    let xSpacing = 0;
    for (let j = 0; j < 10; j++) {
      let use = document.createElementNS(svgns, 'use')
      gsap.set(use, {attr: {href: "#grape"}, x:-bbox.x + xSpacing, y: -bbox.y + ySpacing})
      row.appendChild(use)
      xSpacing +=20
    }
    rows.appendChild(row)
    ySpacing += 20
  }
  this.gsvg.appendChild(rows)

  this.tl.set(rows, {delay: 1})

  for (let i = 0; i < rows.children.length; i++) {
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
      this.tl.to(grape, {x: newX, y: newY, duration: "1.2", onComplete: function () {
        gsap.set(group.children[i].children[9-j], {visibility: 'visible', onComplete: function () {grape.remove()}})
      }}, "<+=0.1")
    }
    this.tl.set(row, {delay: 0}) //pause slight pause after each row animation
  }
}

  private init(): void {

    //this.createGrapeBundle(100, 400)
    //console.log(this.findElement('emptyVine').getBoundingClientRect(), this.findElement('fullVine').getBBox())

    var pt = this.gsvg.createSVGPoint()
    pt.x = this.findElement('emptyVine').getBoundingClientRect().x
    pt.y = this.findElement('emptyVine').getBoundingClientRect().y
    pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

    //console.log(pt.x, pt.y)
    let group = this.fillVine(pt.x, pt.y) as SVGSVGElement

    document.addEventListener('pointerdown', () => this.play(pt.x, pt.y, group))

  }
}