import { gsap } from 'gsap/all'

const svgns = 'http://www.w3.org/2000/svg'

export class RegroupClass {

  private gsvg: SVGSVGElement
  private tl: any
  private bundleLocation = [[60, 25, 1], [130, 27, -1], [23, 70, 1], [85, 90, -1], [140, 85, -1], [165, 75, 1], [10, 130, 1], [70, 155, -1], [90, 140, 1], [155, 140, -1]]
  private grapeLocation = [[0, 0], [12, -4], [23, 2], [11, 8], [-2, 10], [7, 19], [20, 14], [9, 28], [20, 23], [17, 36]]
  private grapeLocationFlipped = [[0, 0], [-12, -4], [-23, 2], [-11, 8], [2, 10], [-7, 19], [-20, 14], [-9, 28], [-20, 23], [-17, 36]]

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

  private createGrapeBundle(x, y): SVGSVGElement {
    let bundle = document.createElementNS(svgns, 'g')
    let bbox = this.findElement('grape').getBBox()

    for (let i = 0; i < this.grapeLocation.length; i++) {
      let use = document.createElementNS(svgns, 'use')
      gsap.set(use, { attr: { href: "#grape", visibility: 'hidden' }, x: -bbox.x + this.grapeLocation[i][0] + x, y: -bbox.y + this.grapeLocation[i][1] + y })
      bundle.appendChild(use)
    }

    this.redrawElements(Array.from(bundle.children))

    this.gsvg.appendChild(bundle)
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

  private init(): void {

    //this.createGrapeBundle(100, 400)
    //console.log(this.findElement('emptyVine').getBoundingClientRect(), this.findElement('fullVine').getBBox())

    var pt = this.gsvg.createSVGPoint()
    pt.x = this.findElement('emptyVine').getBoundingClientRect().x
    pt.y = this.findElement('emptyVine').getBoundingClientRect().y
    pt = pt.matrixTransform(this.gsvg.getScreenCTM().inverse())

    //console.log(pt.x, pt.y)
    let group = this.fillVine(pt.x, pt.y) as SVGSVGElement

    //gsap.set(this.findElement('emptyVine'), { visibility: 'hidden' })

    document.addEventListener('pointerdown', () => this.play(pt.x, pt.y, group))
    //document.addEventListener('pointerdown', () => this.playBundle())

  }
}