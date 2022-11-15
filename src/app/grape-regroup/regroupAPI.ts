import { gsap } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  tl: any
  bundleLocation = [[60, 25, 1], [110, 27, -1], [23, 70, 1], [65, 90, -1], [120, 85, -1], [165, 75, 1], [10, 130, 1], [50, 155, -1], [90, 140, 1], [135, 140, -1]]
  grapelocation = [[0,0], [12, -4], [23, 2], [11,8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]

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
  let arr = [[0,0], [12, -4], [23, 2], [11,8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]
  let group = document.createElementNS(svgns, 'g')
  let bbox = this.findElement('grape').getBBox()

  for (let i = 0; i < 10; i ++){
    let use = document.createElementNS(svgns, 'use')
    gsap.set(use, {attr: {href: "#grape"}, x:-bbox.x + arr[i][0] + x, y: -bbox.y + arr[i][1] + y})
    group.appendChild(use)
  }

  this.redrawElements(Array.from(group.children))

  this.gsvg.appendChild(group)
  //console.log(group.getBBox())
  return group as SVGSVGElement
}

private fillVine(x, y, bundleBbox) {
  let group = document.createElementNS(svgns, 'g')
  let arr = [[60, 25, 1], [110, 27, -1], [23, 70, 1], [65, 90, -1], [120, 85, -1], [165, 75, 1], [10, 130, 1], [50, 155, -1], [90, 140, 1], [135, 140, -1]]

  for (let i = 0; i < arr.length; i++){
    let grapeBundle = this.createGrapeBundle(x, y)

    if (arr[i][2] == -1) {
      gsap.set(grapeBundle, {x: arr[i][0] + bundleBbox, y: arr[i][1], scaleX: -1})
    }
    else {
      gsap.set(grapeBundle, {x: arr[i][0], y: arr[i][1]})
    }
    group.appendChild(grapeBundle)
  }

  this.gsvg.appendChild(group)

  return group
}

private hide(group) {

  for (let i = 0; i < group.children.length; i++) {
    let currentBundle = group.children[i]
    for (let j = 0; j < currentBundle.children.length; j++) {
      let currentGrape = currentBundle.children[j]
      this.tl.to(currentGrape, {visibility: 'hidden', duration: "0.1"})
    }
  }
}

private play(x, y) {
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

  for (let i = 0; i < rows.children.length; i++) {
    let row = rows.children[i]
    for (let j = 0; j < row.children.length; j++) {
      let grape = row.children[j]
      this.tl.to(grape, {x: -bbox.x + this.grapelocation[j][0] + this.bundleLocation[i][0] + x, y: -bbox.y + this.grapelocation[j][1] + this.bundleLocation[i][1] + y, duration: "0.1"})
    }
  }
}

  private init(): void {

    //this.createGrapeBundle(100, 400)
    //console.log(this.findElement('emptyVine').getBoundingClientRect(), this.findElement('fullVine').getBBox())

    var pt = this.gsvg.createSVGPoint()
    pt.x = this.findElement('emptyVine').getBoundingClientRect().x
    pt.y = this.findElement('emptyVine').getBoundingClientRect().y
    pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

    let temp = this.createGrapeBundle(0,0)
    gsap.set(temp, {visibility: 'hidden'})

    //console.log(pt.x, pt.y)
    let group = this.fillVine(pt.x, pt.y, temp.getBBox().width)

    document.addEventListener('pointerdown', () => this.play(pt.x, pt.y))

    

  }
}