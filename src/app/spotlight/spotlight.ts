import {gsap} from "gsap/all"
import {applyDecimalOffset,getBoundingBoxWithTransform,bringToFront} from "../api"
const svgns = "http://www.w3.org/2000/svg";


export function puzzleSpotlight(els, state) {


    //#region Header

    const ref = this;
  
    const gsvg = els[0]
    const gsvgu = els[1]
  

    // Feedback Timeline
    const FB = gsap.timeline({
      paused: true,
      onComplete: () => onFeedbackComplete(),
    });
  
    // Local Variables
    const L = {
      targetInPixels: null,
      tickHeight: null,
      lineWidthInUnits: null,
      fontSize: null,
      aspectRatioHW: null, 
      range: null,
      numberLineY: null,
      lineWidthInPixels: null,
      yFromNumberLineToLight: null,
      feedbackRunning: null,
      feedbackBegun: null,
      currentShineTarget: null,
      shineCenter: null,
      rotation: null, 
      shineLeft: null,
      markings: null,
      shineRight: null,
      xStart: null,
      xEnd: null,
      anchorStroke: null,
      anchorWidth: null,
      expansion: null,
      strokeWidth: null,
      awaitingInput: true,
      jumps: null,
      sessionData: { attempts: [] },
      feedbackComplete: false,
      resetBtnURL:
        "https://res.cloudinary.com/duim8wwno/image/upload/v1647289526/SpotlightRetryBtn_nwcp3o.svg",
      goBtnURL:
        "https://res.cloudinary.com/duim8wwno/image/upload/v1644246521/SpotlightGoBtn_eqeyvr.svg",
    }; 
    const V = {descriptor: null,numberLine: null,ticks: [],labels: [],jumpsMini: null,jumpsMinor: null,jumpsMajor: null}; // View DOM Elements
  
    let pt = gsvg.createSVGPoint(); // Probably don't need this.
  
    const shine = document.getElementById("Shine");
    const light = document.getElementById("Light");
    const flair = document.getElementById("Flair");
    const header = document.getElementById("Header");
  
    // #endregion

    // #region Optionals
  
    // Handle Optionals
  
    // Configurable Frame, Deprecated - remove this.
    state.width = 1280;
    state.height = 720;
  
    // Optional Defaults
    let customJumpIncrements = {}
    const defaultJumpIncrements = {major: 100,minor: 10,mini: 1}
  
    // If none of provided, use the default. 
    if (!state.majorJumps && !state.minorJumps && !state.miniJumps){
      customJumpIncrements = defaultJumpIncrements
    }
    else {
  
      let majorJumps = state.majorJumps ? state.majorJumps : 1
      let minorJumps = state.minorJumps ? state.minorJumps : 1
      let miniJumps = state.miniJumps ? state.miniJumps : 1
  
      let jumpIncrements = [majorJumps,minorJumps,miniJumps]
  
      jumpIncrements.sort((a,b)=>b-a)
  
      majorJumps = jumpIncrements[0]
      minorJumps = jumpIncrements[1]
      miniJumps = jumpIncrements[2]
  
      customJumpIncrements = {major: majorJumps,minor: minorJumps,mini: miniJumps}
    }
  
    state.customJumpIncrements  = customJumpIncrements
    state.numberLineY = state.numberLineY ? state.numberLineY : 500;
    state.min = state.min ? state.min : 0;
    state.zoom = (state.zoom == null || state.zoom != false) ? state.zoom : true
    const dt = state.timeStep ? state.timeStep : 1
  
  
    // #endregion
  
    // #region Helpers
  
  
    function getPointFromUnits(units) {
      const lineInPixels = (1 - state.padding) * state.width;
      const ratio = units / (state.max - state.min);
      const point = (state.padding / 2) * state.width + lineInPixels * ratio;
      return point;
    }
  
    /* Takes an x value and returns the corresponding numberline value.
        function getUnitsFromPoint(point) {
        const lineUnits = state.max - state.min;
        const pixelsFromZeroToPoint = point - (state.width * state.padding) / 2;
        const lineWidthInPixels = (1 - state.padding) * state.width;
        const ratio = pixelsFromZeroToPoint / lineWidthInPixels;
        const units = lineUnits * ratio;
        return units;
        }
    */
  
    function getNumberOfJumpsForEachSize(value, increments) {
      let reducedValue = value;
  
      const jumps = increments;
  
      const majorCount =
        jumps.major == null
          ? 0
          : (reducedValue - (reducedValue % jumps.major)) / jumps.major;
      reducedValue = reducedValue - jumps.major * majorCount;
  
      const minorCount =
        jumps.minor == null
          ? 0
          : (reducedValue - (reducedValue % jumps.minor)) / jumps.minor;
      reducedValue = reducedValue - jumps.minor * minorCount;
  
      const miniCount =
        jumps.mini == null
          ? 0
          : (reducedValue - (reducedValue % jumps.mini)) / jumps.mini;
  
      return {
        miniCount: miniCount,
        minorCount: minorCount,
        majorCount: majorCount,
      };
    }
  
    // Get point in global SVG space
    function cursorPoint(evt) {
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      return pt.matrixTransform(gsvg.getScreenCTM().inverse());
    }
  
    // #endregion
  
    // #region Event Handlers
  
    function backgroundPointerDown(e) {
     if (L.awaitingInput){
        L.currentShineTarget = cursorPoint(e).x;
        let dx = L.shineCenter - L.currentShineTarget;
        const theta = Math.atan(dx / L.yFromNumberLineToLight);
        L.rotation = theta;
        gsap.set(light, {
          transformOrigin: "50% 0%",
          rotation: (theta * 180) / Math.PI,
        });
        drawShine();
        console.log("awaiting input")
      } else if (FB.isActive()){
        console.log("pause")
        FB.pause()
      } else if (FB.paused() && !L.feedbackComplete) {
        console.log("play")
        FB.play()
      }
    }
  
    // #endregion
  
    // #region Drawing
  
    function drawShine() {
      const dx = (state.spotlightWidth * state.width) / 2;
  
      const theta = L.rotation;
      const left = L.currentShineTarget - dx;
      const right = L.currentShineTarget + dx;
  
      L.shineLeft = left;
      L.shineRight = right;
  
      const H1 = 75;
      const H2 = 80;
  
      const delta = theta - Math.PI / 5.5;
      const alpha = theta + Math.PI / 5.2;
      const canRightX = L.shineCenter - H1 * Math.sin(delta);
      const canRightY = 129 + H1 * Math.cos(delta);
      const canLeftX = L.shineCenter - H2 * Math.sin(alpha);
      const canLeftY = 129 + H2 * Math.cos(alpha);
  
      let s =
        "M " +
        left +
        " " +
        state.numberLineY +
        " L " +
        right +
        " " +
        state.numberLineY +
        " L " +
        canRightX +
        " " +
        canRightY +
        " L " +
        canLeftX +
        " " +
        canLeftY;
  
      gsap.set(shine, { attr: { d: s } });
    }
  
    // #endregion
  
    // #region DOM Constructors
    function getJumpsPath(n, size) {
      let hopPath = "M 0 0";
  
      // Creating Jumps:
      for (let i = 0; i < n; i++) {
        hopPath =
          hopPath +
          " " +
          "a " +
          size / 2 +
          " " +
          size / 2 +
          " 0 1 1" +
          size +
          " 0";
      }
      return hopPath;
    }
  
    function getTick(h, s) {
      const _d = "M 0 0 L 0 " + h
  
      const tO = "0" + " " + h/2
  
      const tick = document.createElementNS(svgns,"path");
      
      gsap.set(tick, {
        attr: { d: _d },
        fill: "none",
        strokeLinecap: "round",
        stroke: "white",
        strokeWidth: s,
        scale: 1,
        transformOrigin: tO,
      });
    
  
      return tick;
    }
  
    function setTick(tick,location) {
      const _x = L.xStart + (location-state.min)/L.lineWidthInUnits*L.lineWidthInPixels
      const _y = state.numberLineY - L.tickHeight / 2
      gsap.set(tick,{x: _x,y: _y})
    }
  
    function setLabel(label,location){
      const labelWidth = label.getBBox().width
      label.width = labelWidth
      const _x = L.xStart + (location-state.min)/L.lineWidthInUnits*L.lineWidthInPixels
      gsap.set(label,{x: _x - labelWidth/2,y: state.numberLineY + L.fontSize + L.tickHeight / 2 })
    }
  
    function reduceFraction(n,d){
      const m = Math.max(n,d)
      let gcf = 1
      for (let i =0;i<m;i++){
        if (d%i==0 && n%i==0){
          gcf = i
        }
      }
      return {n: n/gcf,d: d/gcf}
    }
  
  
    // numerator/denominator f (font size)
    function getLabel(f, num, den,reduce) {
  
      let n = num
      let d = den
  
      console.log("reduce",reduce)
  
      const shouldIReduce = reduce != null ? reduce : true
  
      console.log("shouldIReduce",shouldIReduce)
  
      if (shouldIReduce){
        console.log("Reducing")
        n = reduceFraction(num,den).n
        d = reduceFraction(num,den).d
      }
  
      const label = document.createElementNS(svgns, "g");
  
      if (n != null){
  
      const nStringLength = n.toString().length;
  
      let dWidth;
  
      const nWidth = 0.6 * nStringLength * f;
      let maxTextWidth = nWidth
  
      if (d) {
        const dl = d.toString().length;
        dWidth = 0.6 * dl * f;
        if (n % d == 0) {
          n = n / d;
          d = null;
        }
      }
  
      maxTextWidth = Math.max(nWidth,dWidth)
  
      const _n = document.createElementNS(svgns, "text");
      const _d = document.createElementNS(svgns, "text");
      const line = document.createElementNS(svgns, "line");
  
      const startLabelText = applyDecimalOffset(n, state.decimals);
  
      gsap.set(_n, {
        x: maxTextWidth/2 - nWidth/2,
        y: 0,
        textContent: startLabelText,
        fill: "white",
        fontFamily: "Arial",
        fontSize: f,
      });
  
      if (d) {
        gsap.set(_d, {
          textContent: d,
          fill: "white",
          fontFamily: "Arial",
          y: f,
          fontSize: f,
          x: maxTextWidth / 2 - dWidth / 2,
        });
        gsap.set(line, {
          attr: { x1: 0, y1: f/10, x2: maxTextWidth, y2: f/10 },
          strokeLinecap: "round",
          stroke: "white",
          fontFamily: "Arial",
          strokeWidth: f/10 ,
        });
        label.appendChild(_d);
      }
  
      label.appendChild(_n);
      label.appendChild(line);
  
    }
  
      return label;
    }
  
    function initJumps() {
      const minorStartX =
        (state.width * state.padding) / 2 +
        L.jumps.major.count * L.jumps.major.width;
      const miniStartX = minorStartX + L.jumps.minor.count * L.jumps.minor.width;
  
      if (L.jumps.major.count != 0) {
        V.jumpsMajor = document.createElementNS(svgns, "path");
        const majorJumpPath = getJumpsPath(L.jumps.major.count, L.anchorWidth);
  
        gsap.set(V.jumpsMajor, {
          attr: { d: majorJumpPath },
        });
  
        const majorLength = V.jumpsMajor.getTotalLength();
  
        gsap.set(V.jumpsMajor, {
          strokeLinecap: "round",
          fill: "none",
          strokeWidth: L.anchorStroke,
          stroke: "white",
          scale: L.jumps.major.scale / L.expansion,
          y: state.numberLineY,
          x: (state.width * state.padding) / 2,
          strokeDasharray: majorLength,
          strokeDashoffset: majorLength,
          transformOrigin: "0% 100%",
        });
        gsvg.appendChild(V.jumpsMajor);
  
        // Connecting Data to View HACKY
        V.jumpsMajor.data = L.jumps.major;
      } else {
        V.jumpsMajor = null;
      }
  
      if (L.jumps.minor.count != 0) {
        V.jumpsMinor = document.createElementNS(svgns, "path");
        const minorJumpPath = getJumpsPath(L.jumps.minor.count, L.anchorWidth);
  
        gsap.set(V.jumpsMinor, {
          attr: { d: minorJumpPath },
        });
  
        const minorLength = V.jumpsMinor.getTotalLength();
  
        gsap.set(V.jumpsMinor, {
          strokeLinecap: "round",
          fill: "none",
          strokeWidth: L.anchorStroke,
          stroke: "white",
          y: state.numberLineY,
          x: minorStartX,
          scale: L.jumps.minor.scale / L.expansion,
          strokeDasharray: minorLength,
          strokeDashoffset: minorLength,
          transformOrigin: "0% 100%",
        });
        gsvg.appendChild(V.jumpsMinor);
  
        // ALERT: Connecting Data to View, we use this to create our timeline.
        V.jumpsMinor.data = L.jumps.minor;
      } else {
        V.jumpsMinor = null;
      }
  
      if (L.jumps.mini.count != 0) {
        V.jumpsMini = document.createElementNS(svgns, "path");
  
        const miniJumpPath = getJumpsPath(L.jumps.mini.count, L.anchorWidth);
  
        /* ALERT: 
          ISSUE: We have to set the path attribute first so we can 
          get the length of the path.
          
          TODO: Find a way to get the length of a path on it's own.
        */
        gsap.set(V.jumpsMini, {
          attr: { d: miniJumpPath },
        });
  
        const miniLength = V.jumpsMini.getTotalLength();
  
        gsap.set(V.jumpsMini, {
          strokeLinecap: "round",
          fill: "none",
          strokeWidth: L.anchorStroke,
          scale: L.jumps.mini.scale / L.expansion,
          stroke: "white",
          y: state.numberLineY,
          x: miniStartX,
          strokeDasharray: miniLength,
          strokeDashoffset: miniLength,
          transformOrigin: "0% 100%",
        });
        gsvg.appendChild(V.jumpsMini);
  
        // Hacky: Connecting Data to View
        V.jumpsMini.data = L.jumps.mini;
      } else {
        V.jumpsMini = null;
      }
    }
  
    // #endregion
  
    // #region Animations

    function onViewBoxUpdate(){
      const {animVal} = this._targets[0].viewBox
      const _x = animVal.x
      const _w = animVal.width
      

      V.ticks.forEach((t,i)=>{
        console.log(t.xAnchor,"xAnchor")
        gsap.set(t,{x: (t.getAttribute("xAnchor")-_x)/_w*state.width},"<")
        const l = V.labels[i] // Grabbing the label with index.
        l && gsap.set(l,{x: (t.getAttribute("xAnchor")-_x)/_w*state.width-l.width/2},"<")
      })
    }

    function initTimeline() {
      const J = [V.jumpsMajor, V.jumpsMinor, V.jumpsMini];
  
      J.forEach((j, i) => {
        if (j != null) {
          const length = j.getTotalLength();

          if (j != V.jumpsMajor && state.zoom == true) {
            // No viewbox zoom or stroke adjustment required for jumps major.
            
            FB.to(gsvg, { duration: dt,ease: "power1", attr: { viewBox: j.data.viewBox },onUpdate: onViewBoxUpdate});
            
            V.jumpsMajor &&
              FB.to(
                V.jumpsMajor,
                { duration: dt, strokeWidth: j.data.stroke.major },
                "<"
              );
            V.jumpsMinor &&
              FB.to(
                V.jumpsMinor,
                { duration: dt, strokeWidth: j.data.stroke.minor },
                "<"
              );
            V.jumpsMini &&
              FB.to(
                V.jumpsMini,
                { duration: dt, strokeWidth: j.data.stroke.mini },
                "<"
              );
          }
  
          FB.fromTo(
            j,
            j.data.count * dt,
            { strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: "linear",
              duration: j.data.count * dt,
            }
          );
        }
      });
    }
  
    function checkAnswer() {
      if (L.targetInPixels > L.shineLeft && L.targetInPixels < L.shineRight) {
        ref.onSuccess();
        return true;
      } else {
        ref.onTryAgain();
        return false;
      }
    }
  
    function onFeedbackComplete() {
      const _attemptNumber = L.sessionData.attempts.length + 1;
      const _correct = checkAnswer();
      const thisAttempt = [
        {
          attemptNumber: _attemptNumber,
          target: L.currentShineTarget,
          correct: _correct,
        },
      ];
  
      L.feedbackComplete = true;
      L.sessionData.attempts.push(thisAttempt);
    }
  
    // #endregion
  
    // #region LifeCycle Methods
  
    function validate(state) {
      let _message = "State validation failed";
  
  
      let customIncrementsValid = true;
  
      /*
      if (state.customJumpIncrements) {
        const { major, minor, mini } = state.customJumpIncrements;
        if (major == 0 || minor == 0 || mini == 0) {
          _message += " Custom Increments Can't be Zero";
          customIncrementsValid = false;
        }
        if (major == null || minor == null || mini == 0) {
          _message += " Custom Increments must be provided for all levels";
          customIncrementsValid = false;
        }
      }
      */
  
      const minLessThanMax = state.min < state.max;
      const spotlightNotTooBig = state.spotlightWidth < 1;
      const spotlightNotTooSmall = state.spotlightWidth > 0.005;
      const denominatorIsProvided = state.denominator || false;
      const denominatorIsInRange =
        !denominatorIsProvided || state.denominator >= 1;
  
      if (!minLessThanMax) {
        _message += " Invalid Min/Max";
      }
  
      const _valid =
        minLessThanMax &&
        spotlightNotTooBig &&
        spotlightNotTooSmall &&
        denominatorIsInRange &&
        customIncrementsValid;
  
      return { valid: _valid, message: _message };
    }
  
    // Should probably be resetGame
    function reset() {
      const onComplete = () => {
        FB.restart();
        FB.pause();
        resetShine().play();
      };
  
      gsap.to(gsvg, {
        duration: dt,
        onComplete: onComplete,
        onUpdate: onViewBoxUpdate,
        ease: "linear",
        attr: { viewBox: "0 0 1280 720" },
      });
  
  
      // Reset Jumps
      if (V.jumpsMajor) {
        const majorLength = V.jumpsMajor.getTotalLength();
        gsap.set(V.jumpsMajor, {
          strokeDasharray: majorLength,
          strokeDashoffset: majorLength,
          strokeWidth: L.anchorStroke,
        });
      }
  
      if (V.jumpsMinor) {
        const minorLength = V.jumpsMinor.getTotalLength();
        gsap.set(V.jumpsMinor, {
          strokeDasharray: minorLength,
          strokeDashoffset: minorLength,
          strokeWidth: L.anchorStroke,
        });
      }
  
      if (V.jumpsMini) {
        const miniLength = V.jumpsMini.getTotalLength();
        gsap.set(V.jumpsMini, {
          strokeDasharray: miniLength,
          strokeDashoffset: miniLength,
          strokeWidth: L.anchorStroke,
        });
      }
    }
  
    function resetShine() {
      const T = gsap.timeline();
      const onUpdate = () => {
        drawShine();
      };
      const onComplete = ()=>{
        L.awaitingInput = true
        L.feedbackComplete = false
      }
      T.to(L, {
        duration: 1,
        ease: "elastic",
        rotation: 0,
        currentShineTarget: L.shineCenter,
        onUpdate: onUpdate,
        onComplete: onComplete
      });
      T.to(light, { duration: 1, rotation: 0, ease: "elastic" }, "<");
      return T;
    }
  
    function initNumberLineParams(){
  
      const start = {location: state.min, label: state.min,reduce: state.reduceEndpoints}
      const end = {location: state.max, label: state.max,reduce: state.reduceEndpoints}
  
      L.markings = [start]
  
      if (state.tickStepSize){
        console.log("state.tickStepSize",state.tickStepSize)
  
        let sum = parseInt(state.tickStepSize) + parseInt(state.min)
        console.log("start sum,state.min",sum,state.min)
        do {
          const _label = state.labelTicks ? sum : null
          L.markings.push({location: sum,label: _label,reduce: state.reduceTicks})
          sum += parseInt(state.tickStepSize)
          console.log("sum",sum,state.max)
        } while (sum < state.max)
     }
  
     const hints = state.hints ? state.hints : []
  
      const hintMarkings = hints.map(h=>{
        return {location: h,label: h,reduce: state.reduceHints}
      })
  
      hintMarkings && L.markings.push(...hintMarkings)
      L.markings.push(end)
  
    }
  
    function initView() {
  
      V.ticks = []
      V.labels = []
  
      L.markings.forEach(m=>{
  
        const tick = getTick(L.tickHeight,L.strokeWidth)
        gsvgu.appendChild(tick)
        setTick(tick,m.location)
  
        /* ALERT
          REASON: we're attaching the original tick location to the tick element 
          to reference later
  
          TODO: Dynamically calculate it from target value when needed.
        */
        const xA = gsap.getProperty(tick,"x")
        tick.setAttribute("xAnchor",xA)
        V.ticks.push(tick)
  
        // This returns null if there is no m.label provided.
        const label = getLabel(L.fontSize, m.label, state.denominator,m.reduce)
        gsvgu.appendChild(label)
        const isThereALabel = (m.label != null) 
        if (isThereALabel){
          setLabel(label,m.location)
          label.setAttribute("xAnchor",gsap.getProperty(label,"x"))
        }
  
        /* ALERT
          REASON: by design, some labels of the view can be null. 
  
          TODO: Nothing at the moment, we want each marking to have a 
          label,tick pair, even if the label is null. 
        */
        V.labels.push(label)
  
      })
  
      V.descriptor = getLabel(60,state.target,state.denominator,state.reduceTarget)
      gsvg.appendChild(V.descriptor);
      const w = V.descriptor.getBBox().width;
      const h = V.descriptor.getBBox().height;
  
      // HARDCODED
      gsap.set(V.descriptor, { y: 140/2, x: L.shineCenter - w / 2 });
  
      initJumps();
  
      // Number Line
  
      V.numberLine = document.createElementNS(svgns, "line");
  
      gsap.set(V.numberLine, {
        attr: {
          x1: 0,
          y1: state.numberLineY,
          x2: state.width,
          y2: state.numberLineY,
        },
        fill: "none",
        strokeWidth: 5,
        stroke: "white",
      });
      gsvgu.appendChild(V.numberLine);
  
      // Can we do this before initView so we can put it in updateLayoutParams
      const numberLineY = state.numberLineY;
      const lightY = getBoundingBoxWithTransform(light).y;
      L.yFromNumberLineToLight = numberLineY - lightY;
  
  
      // View
      bringToFront(light);
      bringToFront(header);
  
  
      // Misc.
      const scale = Math.min(1, Math.sqrt(state.spotlightWidth / 0.06));
      gsap.set(flair, { scaleX: scale, transformOrigin: "50% 0%" });
    }
  
    function initLayoutParams() {
      // Legacy name change:
      let steps = state.customJumpIncrements;
  
      // State Variables
      L.feedbackComplete = false
      L.feedbackRunning = false
      L.feedbackBegun = false
  
      L.awaitingInput = true
  
      L.fontSize = 30
      L.strokeWidth = 5
  
      L.xStart = (state.width * state.padding) / 2;
      L.xEnd = state.width * (1 - state.padding / 2);
  
      L.range = state.min - state.max
      L.shineCenter = state.width / 2;
      L.rotation = 0;
      L.currentShineTarget = state.width / 2;
      L.targetInPixels = getPointFromUnits(state.target-state.min);
      L.tickHeight = state.width / 50
      L.numberLineY = state.numberLineY
  
      const increments = steps;
  
      const adjustedTarget = state.target - state.min
  
      const counts = getNumberOfJumpsForEachSize(adjustedTarget, increments);
  
      const widthInPixels = (1 - state.padding) * state.width;
  
      L.lineWidthInPixels = widthInPixels;
      L.lineWidthInUnits = state.max - state.min;
  
      const widthInUnits = state.max - state.min;
      const majorJumpWidth = (steps.major / widthInUnits) * widthInPixels;
      const minorJumpWidth = (steps.minor / widthInUnits) * widthInPixels;
      const miniJumpWidth = (steps.mini / widthInUnits) * widthInPixels;
  
      const majorJumpScale = steps.major / widthInUnits;
      const minorJumpScale = steps.minor / widthInUnits;
      const miniJumpScale = steps.mini / widthInUnits;
  
  
      // No longer needed.
      L.expansion = 1; // To prevent from fractional stroke widths. Cause: Unknown
      L.aspectRatioHW = state.height / state.width;
  
      // Helps for scaling
      L.anchorWidth = (1 - state.padding) * state.width * L.expansion;
      L.anchorStroke = 5 / majorJumpScale;
  
      const jumps = {
        major: {
          viewBox: null,
          scale: majorJumpScale,
          width: majorJumpWidth,
          count: counts.majorCount,
          stepSize: steps.major,
          stroke: {
            major: L.anchorStroke,
            minor: L.anchorStroke,
            mini: L.anchorStroke,
          },
        },
        minor: {
          viewBox: null,
          scale: minorJumpScale,
          width: minorJumpWidth,
          count: counts.minorCount,
          stepSize: steps.minor,
          stroke: {
            major: L.anchorStroke / (steps.major / steps.minor),
            minor: L.anchorStroke,
            mini: L.anchorStroke,
          },
        },
        mini: {
          viewBox: null,
          scale: miniJumpScale,
          width: miniJumpWidth,
          count: counts.miniCount,
          stepSize: steps.mini,
          stroke: {
            major: L.anchorStroke / (steps.major / steps.mini),
            minor: L.anchorStroke / (steps.minor / steps.mini),
            mini: L.anchorStroke,
          },
        },
      };
  
      let head = (state.padding / 2) * state.width;
      const majorViewBox = [0, 0, state.width, state.height].join(" ");
  
      const countMax = Math.max(jumps.minor.count, jumps.mini.count);
  
      head = head + jumps.major.width * jumps.major.count;
      const minorViewBoxWidth = 1.5 * jumps.minor.width * countMax;
      const minorViewBoxHeight = minorViewBoxWidth * L.aspectRatioHW;
      const minorViewBoxX = head - 0.2 * minorJumpWidth;
      const minorViewBoxY = state.numberLineY - L.numberLineY/state.height*minorViewBoxHeight;
  
      console.log("minorViewBoxX",minorViewBoxX)
  
      const minorViewBox = [
        minorViewBoxX,
        minorViewBoxY,
        minorViewBoxWidth,
        minorViewBoxHeight,
      ].join(" ");
  
      head = head + jumps.minor.width * jumps.minor.count;
      const miniViewBoxWidth = 1.5 * jumps.mini.width * countMax;
      const miniViewBoxHeight = miniViewBoxWidth * L.aspectRatioHW;
      const miniViewBoxX = head - 0.2 * miniJumpWidth;
      const miniViewBoxY = state.numberLineY - L.numberLineY/state.height*miniViewBoxHeight
      const miniViewBox = [
        miniViewBoxX,
        miniViewBoxY,
        miniViewBoxWidth,
        miniViewBoxHeight,
      ].join(" ");
  
      jumps.major.viewBox = majorViewBox;
      jumps.minor.viewBox = minorViewBox;
      jumps.mini.viewBox = miniViewBox;
  
      L.jumps = jumps;
  
      initNumberLineParams()
  
      console.log("L", L);
    }
  
    function attachEvents() {
      // Event Listeners
      gsvg.addEventListener("pointerdown", backgroundPointerDown);
    }
  
    function init() {
      initLayoutParams();
      initView();
  
      // Animations
      initTimeline(); 

      drawShine();
  
      attachEvents();
    }
  
    // #endregion
  
    // #region External Methods
  
    this.goButtonClicked = function () {
      if (L.feedbackComplete) {
        this.style.backgroundImage = `url(${L.goBtnURL})`;
        reset();
      } else if (L.awaitingInput) {
        this.style.backgroundImage = `url(${L.resetBtnURL})`;
        L.awaitingInput = false
        FB.play();
      } else {
        console.log("You can't click me!")
      } 
    };
  
    // Object Functions
  
    this.pause = function () {
      FB.pause();
    };
  
    // Sent to server "onSubmit"
    this.getSessionData = function () {
      return L.sessionData;
    };
  
    // #endregion
  
    // Load if Valid
    const attempt = validate(state);
    if (attempt.valid) {
      init();
    } else {
      window.alert(attempt.message);
    }
  }
  