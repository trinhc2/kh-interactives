import {MorphSVGPlugin} from "./gsap-shockingly-green/minified/MorphSVGPlugin.min.js"
import {gsap} from "gsap/all"

export interface testSetup {
    finished: boolean
}

export function testFunction(els, state) {
    let self = {} as testClass

    class testClass {
        els: SVGSVGElement
        state:testSetup

        constructor(els, state){
            self = this
            this.els = els
            this.state = state
        }

        animateViewBox(e) {
            gsap.registerPlugin(MorphSVGPlugin) //needed this line or else error would occur
            MorphSVGPlugin.convertToPath("#circ1")
            MorphSVGPlugin.convertToPath("#square")
            MorphSVGPlugin.convertToPath("#circ2")
            console.log("clicked")
            let objects = gsap.utils.toArray(["#rect1","#rect2", "#rect3", "#rect4"]);
            console.log(objects)
            var counter = 1;
            objects.forEach(element => {
               var t1 = gsap.timeline({ defaults: {duration: 1}})
               var t2 = gsap.timeline({ defaults: {duration: 1}})
               t1.set(`#${element.id}`, {fill:'#ffffff', stroke:'#ff0000', duration: 0})
               .to(`#${element.id}`, {morphSVG:`#clearRect${counter}`})
               .to(`#${element.id}`, {morphSVG:`#line${counter}`, delay: 1});
               
               t2.set(`#rectText${counter}`, {visibility: "visible", delay: 1, duration: 0})
               .to(`#rectText${counter}`, {morphSVG:`#lineText${counter}`, delay: 1})
               counter++;               
            });
        }
    }
    return new testClass(els, state);
}