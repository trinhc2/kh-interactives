import { gsap, Draggable } from "gsap/all"

export interface sliderSetup {
    startingValue: number;
    height: number
    width: number
    max?: number
    min?: number
    state?: boolean
    answer?: boolean
    reportMode?: boolean
}

export interface value {
    answer?: boolean
    state?: any
}

export function sliderAPI(_els, _setup) {
    let self = {} as sliderClass

    class sliderClass {
        els: SVGSVGElement;
        setup: sliderSetup;

        num: SVGSVGElement
        sliderControls: HTMLElement
        numberDisplay: HTMLElement
        buttons: HTMLElement
        sliderBar: SVGSVGElement
        slider: SVGSVGElement
        maxText: SVGSVGElement
        sliderOpen = false;
        increment: number
        onAnswerUpdate = (answer) => { };


        constructor(els, setup) {
            self = this
            this.els = els
            this.setup = setup
            this.num = this.els.getElementById("num") as unknown as SVGSVGElement
            this.sliderControls = this.els.getElementById("sliderControls") as HTMLElement
            this.numberDisplay = this.els.getElementById("numberDisplay") as HTMLElement
            this.buttons= this.els.getElementById("buttons") as HTMLElement
            this.sliderBar = this.els.getElementById("sliderBar") as unknown as SVGSVGElement
            this.slider= this.els.getElementById("slider") as unknown as SVGSVGElement
            this.maxText = this.els.getElementById("maxText") as unknown as SVGSVGElement
            
            this.init()
            
        }

        //#region SLIDER FUNCTIONS
        //When the user taps on the input field open/close it
        inputFieldPressed() {
            if (!this.sliderOpen) {
                if (this.num.textContent == ""){
                    this.num.textContent = String(this.setup.min)
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

        //When user presses an increment/decrement button, update number
        buttonPressed(button) {
            let newNumber = parseInt(this.num.textContent) + parseInt(button.getAttribute("val"))
            if (newNumber > this.setup.max) {
                newNumber = this.setup.max
            }
            else if (newNumber < this.setup.min) {
                newNumber = this.setup.min
            }
            if (newNumber <= this.setup.max && newNumber >= this.setup.min) {
                this.sliderValueHasBeenUpdated(newNumber)
            }
        }

        //When the slider has been updated via buttons or slider itself
        sliderValueHasBeenUpdated(value) {
            this.num.textContent = value
            gsap.set(this.num, { x: -(this.num.getBBox().width / 2) })
            gsap.set(this.slider, { x: this.increment * (value - this.setup.min) })
        }

        applyAnswer() {
            this.sliderControls.style.display = "block";
            this.sliderOpen = true;
            this.sliderValueHasBeenUpdated(Number(this.setup.startingValue))
        }

        addEventListenersAndInteractivity() {
            this.els.getElementById("numberDisplay").addEventListener("click", event => this.inputFieldPressed())
            
            for (let i = 0; i < this.buttons.children.length; i++) {
                this.buttons.children[i].addEventListener("click", event => this.buttonPressed(this.buttons.children[i]))
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
                onPress: function() {
                    //disable controller drag if we are dragging slider
                    controllerDraggable[0].disable()
                },
                onDrag: function() {
                    self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.setup.min))
                },
                onDragEnd: function() {
                    controllerDraggable[0].enable()
                }
                
            })
        }


        init() {
            gsap.registerPlugin(Draggable)

            //setting height and width
            //this.els.setAttribute("width", String(this.setup.width))
            //this.els.setAttribute("height", String(this.setup.height))
            //this.els.setAttribute("viewBox", `0 0 ${this.setup.width} ${this.setup.height}`)

            //calculating increments for slider
            let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width)
            this.increment = barWidth / (this.setup.max - this.setup.min);

            
            gsap.set(this.sliderControls, {display: "none"})
            this.num.textContent = ""

            //setting slider max and mins and repositioning the max
            this.els.getElementById("maxTextInner").textContent = String(this.setup.max)
            gsap.set(this.maxText, { x: `-=${this.maxText.getBBox().width}` })
            this.els.getElementById("minTextInner").textContent = String(this.setup.min)

            if (this.setup.answer) {
                this.applyAnswer()
            }
            if (this.setup.reportMode == false) {
                this.addEventListenersAndInteractivity()
            }
        }


        //#endregion
    }
    return new sliderClass(_els, _setup);
}