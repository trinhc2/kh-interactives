(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api.ts":
/*!************************!*\
  !*** ./src/app/api.ts ***!
  \************************/
/*! exports provided: svgns, bringToFront, applyDecimalOffset, getBoundingBoxWithTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgns", function() { return svgns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bringToFront", function() { return bringToFront; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDecimalOffset", function() { return applyDecimalOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingBoxWithTransform", function() { return getBoundingBoxWithTransform; });
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

const svgns = "http://www.w3.org/2000/svg";
// For passing an arbitrary object.
function bringToFront(obj) {
    let parent = obj.parentElement;
    parent.removeChild(obj);
    parent.appendChild(obj);
}
// For attaching to draggables
function bringThisToFront() {
    bringToFront(this.target);
}
function createCircleFromPath(r) {
    let circ = document.createElementNS(svgns, "path");
    const p = `M 0 ${r} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0 `;
    circ.setAttribute("d", p);
    return circ;
}
function roundedRectData(w, h, tlr, trr, brr, blr) {
    return 'M 0 ' + tlr
        + ' A ' + tlr + ' ' + tlr + ' 0 0 1 ' + tlr + ' 0'
        + ' L ' + (w - trr) + ' 0'
        + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + w + ' ' + trr
        + ' L ' + w + ' ' + (h - brr)
        + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + (w - brr) + ' ' + h
        + ' L ' + blr + ' ' + h
        + ' A ' + blr + ' ' + blr + ' 0 0 1 0 ' + (h - blr)
        + ' Z';
}
;
function createRoundedRectFromPath(w, h, r) {
    const p = roundedRectData(w, h, r, r, r, r);
    let rRect = document.createElementNS(svgns, "path");
    rRect.setAttribute("d", p);
    return rRect;
}
function createJumpFromPath(r) {
    let jump = document.createElementNS(svgns, "path");
    const p = `M 0 ${r} a ${r} ${r} 0 1 1 ${2 * r} 0 `;
    jump.setAttribute("d", p);
    jump.setAttribute('stroke', "black");
    jump.setAttribute('stroke-width', "5");
    jump.setAttribute('fill', 'white');
    return jump;
}
// Returns a clean copy of a number divided by a power of ten.
function applyDecimalOffset(num, dec) {
    let returnValue = num;
    if (dec != null) {
        const decimals = dec && dec;
        const divided = num / Math.pow(10, decimals);
        returnValue = divided.toFixed(dec);
    }
    return returnValue;
}
// ARGYLE:
function isThisNodeOnThisLine(node, line) {
    // Use isThisPointOnALineBetween
    // return Boolean Value
}
// NodeClicked: Find all the lines that are currently passing through this node
// Returns false if no lines can be consolidated, returns nodes if 
function consolidateLines(l, lines) {
    // "l" is a new line that may or may not need to be consolidated. 
    // "lines" is an object that contains the other lines currently on the grid. 
    // return {idOfConsolidatedNodes: [nodeID1,nodeID2], idOfLineThatNeedsToBeRemoved: []}
}
function getBoundingBoxWithTransform(elem) {
    let bbox_elem = elem.getBBox();
    // Apply transform to bounding box.
    const elemX = bbox_elem.x + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(elem, "translateX");
    const elemY = bbox_elem.y + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(elem, "translateY");
    return { x: elemX, y: elemY };
}
// Finds dx and dy between two objects
function transformDelta(from, to) {
    // Safest to recalculate.
    let bbox_From = from.getBBox();
    let bbox_To = to.getBBox();
    // Apply transform to bounding box.
    const fromX = bbox_From.x + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(from, "translateX");
    const fromY = bbox_From.y + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(from, "translateY");
    const toX = bbox_To.x + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(to, "translateX");
    const toY = bbox_To.y + gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(to, "translateY");
    let _dx = toX - fromX;
    let _dy = toY - fromY;
    return { dx: _dx, dy: _dy };
}
// Finds the coordinates to "to" from "from"
function coordinateTransformation(from, to) {
    const _transformDelta = transformDelta(from, to);
    let _x = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(from, "translateX") + _transformDelta.dx;
    let _y = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(from, "translateY") + _transformDelta.dy;
    return { x: _x, y: _y };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _container_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/container.component */ "./src/app/container/container.component.ts");
/* harmony import */ var _kh_decompose_number_kh_decompose_number_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./kh-decompose-number/kh-decompose-number.component */ "./src/app/kh-decompose-number/kh-decompose-number.component.ts");
/* harmony import */ var _kh_farm_kh_farm_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./kh-farm/kh-farm.component */ "./src/app/kh-farm/kh-farm.component.ts");
/* harmony import */ var _kh_slider_input_kh_slider_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./kh-slider-input/kh-slider-input.component */ "./src/app/kh-slider-input/kh-slider-input.component.ts");
/* harmony import */ var _moonfactory_moonfactory_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./moonfactory/moonfactory.component */ "./src/app/moonfactory/moonfactory.component.ts");
/* harmony import */ var _planetfactory_planetfactory_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./planetfactory/planetfactory.component */ "./src/app/planetfactory/planetfactory.component.ts");










const routes = [
    { path: 'renderer', component: _container_container_component__WEBPACK_IMPORTED_MODULE_2__["ContainerComponent"] },
    { path: 'slider', component: _kh_slider_input_kh_slider_input_component__WEBPACK_IMPORTED_MODULE_5__["KhSliderInputComponent"] },
    { path: 'farm', component: _kh_farm_kh_farm_component__WEBPACK_IMPORTED_MODULE_4__["KhFarmComponent"] },
    { path: 'planetFactory', component: _planetfactory_planetfactory_component__WEBPACK_IMPORTED_MODULE_7__["PlanetfactoryComponent"] },
    { path: 'moonFactory', component: _moonfactory_moonfactory_component__WEBPACK_IMPORTED_MODULE_6__["MoonfactoryComponent"] },
    { path: 'decompose', component: _kh_decompose_number_kh_decompose_number_component__WEBPACK_IMPORTED_MODULE_3__["KhDecomposeNumberComponent"] },
    { path: 'draw', component: _container_container_component__WEBPACK_IMPORTED_MODULE_2__["ContainerComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        console.log("element ref in constructor", elementRef.nativeElement);
    }
    ngOnInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".container[_ngcontent-%COMP%] {\n    width: 400px;\n    height: 400px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDQwMHB4O1xuICAgIGhlaWdodDogNDAwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _tst_dot_connect_tst_dot_connect_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tst-dot-connect/tst-dot-connect.component */ "./src/app/tst-dot-connect/tst-dot-connect.component.ts");
/* harmony import */ var _container_container_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./container/container.component */ "./src/app/container/container.component.ts");
/* harmony import */ var _spotlight_spotlight_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./spotlight/spotlight.component */ "./src/app/spotlight/spotlight.component.ts");
/* harmony import */ var _test_test_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./test/test.component */ "./src/app/test/test.component.ts");
/* harmony import */ var _kh_decompose_number_kh_decompose_number_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./kh-decompose-number/kh-decompose-number.component */ "./src/app/kh-decompose-number/kh-decompose-number.component.ts");
/* harmony import */ var _kh_slider_input_kh_slider_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./kh-slider-input/kh-slider-input.component */ "./src/app/kh-slider-input/kh-slider-input.component.ts");
/* harmony import */ var _kh_farm_kh_farm_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./kh-farm/kh-farm.component */ "./src/app/kh-farm/kh-farm.component.ts");
/* harmony import */ var _planetfactory_planetfactory_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./planetfactory/planetfactory.component */ "./src/app/planetfactory/planetfactory.component.ts");
/* harmony import */ var _moonfactory_moonfactory_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./moonfactory/moonfactory.component */ "./src/app/moonfactory/moonfactory.component.ts");
/* harmony import */ var _drawing_input_drawing_input_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./drawing-input/drawing-input.component */ "./src/app/drawing-input/drawing-input.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _tst_dot_connect_tst_dot_connect_component__WEBPACK_IMPORTED_MODULE_4__["TstDotConnectComponent"],
        _container_container_component__WEBPACK_IMPORTED_MODULE_5__["ContainerComponent"],
        _spotlight_spotlight_component__WEBPACK_IMPORTED_MODULE_6__["SpotlightComponent"],
        _test_test_component__WEBPACK_IMPORTED_MODULE_7__["TestComponent"],
        _kh_decompose_number_kh_decompose_number_component__WEBPACK_IMPORTED_MODULE_8__["KhDecomposeNumberComponent"],
        _kh_slider_input_kh_slider_input_component__WEBPACK_IMPORTED_MODULE_9__["KhSliderInputComponent"],
        _kh_farm_kh_farm_component__WEBPACK_IMPORTED_MODULE_10__["KhFarmComponent"],
        _planetfactory_planetfactory_component__WEBPACK_IMPORTED_MODULE_11__["PlanetfactoryComponent"],
        _moonfactory_moonfactory_component__WEBPACK_IMPORTED_MODULE_12__["MoonfactoryComponent"],
        _drawing_input_drawing_input_component__WEBPACK_IMPORTED_MODULE_13__["DrawingInputComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _tst_dot_connect_tst_dot_connect_component__WEBPACK_IMPORTED_MODULE_4__["TstDotConnectComponent"],
                    _container_container_component__WEBPACK_IMPORTED_MODULE_5__["ContainerComponent"],
                    _spotlight_spotlight_component__WEBPACK_IMPORTED_MODULE_6__["SpotlightComponent"],
                    _test_test_component__WEBPACK_IMPORTED_MODULE_7__["TestComponent"],
                    _kh_decompose_number_kh_decompose_number_component__WEBPACK_IMPORTED_MODULE_8__["KhDecomposeNumberComponent"],
                    _kh_slider_input_kh_slider_input_component__WEBPACK_IMPORTED_MODULE_9__["KhSliderInputComponent"],
                    _kh_farm_kh_farm_component__WEBPACK_IMPORTED_MODULE_10__["KhFarmComponent"],
                    _planetfactory_planetfactory_component__WEBPACK_IMPORTED_MODULE_11__["PlanetfactoryComponent"],
                    _moonfactory_moonfactory_component__WEBPACK_IMPORTED_MODULE_12__["MoonfactoryComponent"],
                    _drawing_input_drawing_input_component__WEBPACK_IMPORTED_MODULE_13__["DrawingInputComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/container/container.component.ts":
/*!**************************************************!*\
  !*** ./src/app/container/container.component.ts ***!
  \**************************************************/
/*! exports provided: ContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContainerComponent", function() { return ContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _drawing_input_drawing_input_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../drawing-input/drawing-input.component */ "./src/app/drawing-input/drawing-input.component.ts");



class ContainerComponent {
    constructor() { }
    ngOnInit() {
    }
}
ContainerComponent.ɵfac = function ContainerComponent_Factory(t) { return new (t || ContainerComponent)(); };
ContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContainerComponent, selectors: [["app-container"]], decls: 3, vars: 0, consts: [["setID", "id1", "styleType", "background-image: url('assets/board1.svg'); height:700px; width:500px; margin: 0 auto;", "regionStyle", "background-image: url('assets/board1.svg'); height:350px; width:250px;"], ["setID", "id2", "styleType", "background-image: url('assets/board2.svg'); height:700px; width:500px; margin: 0 auto;", "regionStyle", "background-image: url('assets/board2.svg'); height:350px; width:250px;"], ["setID", "id3", "styleType", "background-image: url('assets/blankboard.svg'); height:700px; width:500px; margin: 0 auto;", "regionStyle", "background-image: url('assets/board3.svg'); height:350px; width:250px;"]], template: function ContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-drawing-input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-drawing-input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-drawing-input", 2);
    } }, directives: [_drawing_input_drawing_input_component__WEBPACK_IMPORTED_MODULE_1__["DrawingInputComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRhaW5lci9jb250YWluZXIuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-container',
                templateUrl: './container.component.html',
                styleUrls: ['./container.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/drawing-input/drawing-input.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/drawing-input/drawing-input.component.ts ***!
  \**********************************************************/
/*! exports provided: DrawingInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingInputComponent", function() { return DrawingInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fabric */ "./node_modules/fabric/dist/fabric.js");
/* harmony import */ var fabric__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fabric__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");




const _c0 = ["renderEl"];
const _c1 = ["Modal"];
const _c2 = ["canvasBGImage"];
//import {MatDialog} from "@angular/material/dialog";
//import { NativeDateAdapter } from '@angular/material/core';
//import { DEFAULT_DIALOG_CONFIG, DialogRef } from '@angular/cdk/dialog';
class DrawingInputComponent {
    constructor() {
        // @Input()
        // public backGround: string = 'src/assets/board1.svg'
        this.strokeColor = 'black';
        this.canvasWidth = 500;
        this.canvasHeight = 700;
        this.strokeWidth = 35;
        this.strokesMade = false;
    }
    //remove all existing objects drawn on the canvas
    undoClicked() {
        this.canvas.getObjects().forEach((object) => {
            if (object !== this.canvas.backgroundColor) {
                this.canvas.remove(object);
            }
        });
    }
    //convert objects into svg and adjust proportions
    saveClicked() {
        var _a, _b;
        let drawing = this.canvas.toSVG();
        let parser = new DOMParser();
        const doc = parser.parseFromString(drawing, 'text/html');
        this.niceDrawing = doc.querySelector("svg");
        this.niceDrawing.setAttribute("height", this.canvasHeight.toString());
        this.niceDrawing.setAttribute("width", this.canvasWidth.toString());
        this.niceDrawing.setAttribute("x", "60/0.2645");
        if (this.prevDrawing != undefined && this.niceDrawing != undefined) {
            //remove previous drawing (if exists) if saving a new one
            (_a = this.renderEl) === null || _a === void 0 ? void 0 : _a.nativeElement.removeChild(this.prevDrawing);
        }
        //saving the new drawing
        if (this.niceDrawing != undefined) {
            (_b = this.renderEl) === null || _b === void 0 ? void 0 : _b.nativeElement.appendChild(this.niceDrawing);
            this.prevDrawing = this.niceDrawing;
        }
        if (this.canvas.getObjects().length == 0) {
            console.log("saved value false");
            this.strokesMade = false;
        }
        else {
            console.log("saved value true");
            this.strokesMade = true;
        }
        this.Modal.nativeElement.style.display = "none";
    }
    xClose() {
        this.Modal.nativeElement.style.display = "none";
    }
    // @Input()
    // public bgImage: string='./src/assets/board1.svg';
    ngAfterViewInit() {
        // ID:this.setID;
        // console.log("initializing")
        this.canvas = new fabric__WEBPACK_IMPORTED_MODULE_1__["fabric"].Canvas(this.setID, {
            isDrawingMode: true,
        });
        // console.log(this.setID)
        this.canvas.setWidth(this.canvasWidth);
        this.canvas.setHeight(this.canvasHeight);
        this.canvas.freeDrawingBrush.color = this.strokeColor;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
        this.canvas.renderAll();
    }
    //constructor (@Inject(MatDialog)public dialog: MatDialog, private khComponent:KhDialogComponent) { }
    openDialog() {
        //let dialogRef = this.dialog.open(KhDialogComponent);
        this.Modal.nativeElement.style.display = "block";
    }
}
DrawingInputComponent.ɵfac = function DrawingInputComponent_Factory(t) { return new (t || DrawingInputComponent)(); };
DrawingInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DrawingInputComponent, selectors: [["app-drawing-input"]], viewQuery: function DrawingInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.renderEl = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.Modal = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.canvasBGImage = _t.first);
    } }, inputs: { canvas: "canvas", strokeColor: "strokeColor", canvasWidth: "canvasWidth", canvasHeight: "canvasHeight", strokeWidth: "strokeWidth", niceDrawing: "niceDrawing", prevDrawing: "prevDrawing", strokesMade: "strokesMade", setID: "setID", styleType: "styleType", regionStyle: "regionStyle" }, decls: 21, vars: 9, consts: [["rel", "preconnect", "href", "https://fonts.gstatic.com"], ["href", "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap", "rel", "stylesheet"], ["href", "https://fonts.googleapis.com/icon?family=Material+Icons", "rel", "stylesheet"], [1, "canvasImage"], ["width", "250", "height", "350", "viewBox", "0 0 500 700", 3, "click"], ["renderEl", ""], ["id", "myModal", 1, "modal"], ["Modal", ""], [1, "modal-content"], [1, "close", 3, "click"], ["mat-raised-button", "", "color", "warn", 1, "dialogbuts", 3, "click"], ["mat-raised-button", "", "color", "primary", 1, "dialogbuts", 3, "click"], ["saveBut", ""], [3, "id", "height", "width"], ["canvasBGImage", ""]], template: function DrawingInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "link", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "link", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "svg", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingInputComponent_Template__svg_svg_click_5_listener() { return ctx.openDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingInputComponent_Template_span_click_10_listener() { return ctx.xClose(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingInputComponent_Template_button_click_13_listener() { return ctx.undoClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Undo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DrawingInputComponent_Template_button_click_15_listener() { return ctx.saveClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "canvas", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.regionStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](ctx.styleType);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("id", ctx.setID);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("height", ctx.canvasHeight);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("width", ctx.canvasWidth);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"]], styles: [".canvasImage[_ngcontent-%COMP%]{\n    background-size: contain;\n    text-align: center;\n    \n \n}\n\n.canvas-container[_ngcontent-%COMP%]{\n    margin: 0 auto;\n   \n}\n\n.dialogbuts[_ngcontent-%COMP%]{\n    margin:10px;\n}\n\n.close[_ngcontent-%COMP%] {\n    color: black;\n    float: right;\n\n    font-size: 28px;\n    font-weight: bold;\n  }\n\n.close[_ngcontent-%COMP%]:hover, .close[_ngcontent-%COMP%]:focus {\n    color: grey;\n    text-decoration: none;\n    cursor: pointer;\n  }\n\n.container[_ngcontent-%COMP%] {\n    display: none;\n    position: fixed;\n    z-index: 1;\n    padding-top: 100px;\n    left: 0;\n    top: 0;\n    width: 100%; \n    height: 100%;\n    overflow: auto;\n    background-color: rgba(0,0,0,0.4); \n  }\n\n.content[_ngcontent-%COMP%] {\n    background-color: #fefefe;\n    margin: auto;\n    padding: 20px;\n    border: 1px solid #888;\n    width: 80%;\n  }\n\n.modal[_ngcontent-%COMP%] {\n    display: none; \n    position: fixed; \n    z-index: 1; \n    padding-top: 30px; \n    left: 0;\n    top: 0;\n    width: 100%; \n    height: 100%; \n    overflow: auto; \n    background-color: rgb(0,0,0); \n    background-color: rgba(0,0,0,0.5); \n  }\n\n\n\n.modal-content[_ngcontent-%COMP%] {\n    background-color: rgb(166, 208, 231);\n    margin: auto;\n    padding: 20px;\n    position:relative;\n    border: 1px solid #888;\n    border-radius: 20px;\n    width: 90%;\n    height: 86%; \n    text-align: center;\n    justify-content: center;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZHJhd2luZy1pbnB1dC9kcmF3aW5nLWlucHV0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjs7QUFFdkI7O0FBRUE7SUFDSSxjQUFjOztBQUVsQjs7QUFHQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZOztJQUVaLGVBQWU7SUFDZixpQkFBaUI7RUFDbkI7O0FBRUE7O0lBRUUsV0FBVztJQUNYLHFCQUFxQjtJQUNyQixlQUFlO0VBQ2pCOztBQUNBO0lBQ0UsYUFBYTtJQUNiLGVBQWU7SUFDZixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxNQUFNO0lBQ04sV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QsaUNBQWlDLEVBQUUscUJBQXFCO0VBQzFEOztBQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFVBQVU7RUFDWjs7QUFFQTtJQUNFLGFBQWEsRUFBRSxzQkFBc0I7SUFDckMsZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxVQUFVLEVBQUUsZUFBZTtJQUMzQixpQkFBaUIsRUFBRSx3QkFBd0I7SUFDM0MsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXLEVBQUUsZUFBZTtJQUM1QixZQUFZLEVBQUUsZ0JBQWdCO0lBQzlCLGNBQWMsRUFBRSw0QkFBNEI7SUFDNUMsNEJBQTRCLEVBQUUsbUJBQW1CO0lBQ2pELGlDQUFpQyxFQUFFLHFCQUFxQjtFQUMxRDs7QUFFQSxrQkFBa0I7O0FBQ2xCO0lBQ0Usb0NBQW9DO0lBQ3BDLFlBQVk7SUFDWixhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsdUJBQXVCO0VBQ3pCIiwiZmlsZSI6InNyYy9hcHAvZHJhd2luZy1pbnB1dC9kcmF3aW5nLWlucHV0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FudmFzSW1hZ2V7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAvKiB3aWR0aDonNTAwcHgnOyAqL1xuIFxufVxuXG4uY2FudmFzLWNvbnRhaW5lcntcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgIFxufVxuXG5cbi5kaWFsb2didXRze1xuICAgIG1hcmdpbjoxMHB4O1xufVxuXG4uY2xvc2Uge1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmbG9hdDogcmlnaHQ7XG5cbiAgICBmb250LXNpemU6IDI4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbiAgXG4gIC5jbG9zZTpob3ZlcixcbiAgLmNsb3NlOmZvY3VzIHtcbiAgICBjb2xvcjogZ3JleTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDE7XG4gICAgcGFkZGluZy10b3A6IDEwMHB4O1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlOyBcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwLjQpOyAvKiBCbGFjayB3LyBvcGFjaXR5ICovXG4gIH1cbiAgXG4gIC5jb250ZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XG4gICAgd2lkdGg6IDgwJTtcbiAgfVxuXG4gIC5tb2RhbCB7XG4gICAgZGlzcGxheTogbm9uZTsgLyogSGlkZGVuIGJ5IGRlZmF1bHQgKi9cbiAgICBwb3NpdGlvbjogZml4ZWQ7IC8qIFN0YXkgaW4gcGxhY2UgKi9cbiAgICB6LWluZGV4OiAxOyAvKiBTaXQgb24gdG9wICovXG4gICAgcGFkZGluZy10b3A6IDMwcHg7IC8qIExvY2F0aW9uIG9mIHRoZSBib3ggKi9cbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTsgLyogRnVsbCB3aWR0aCAqL1xuICAgIGhlaWdodDogMTAwJTsgLyogRnVsbCBoZWlnaHQgKi9cbiAgICBvdmVyZmxvdzogYXV0bzsgLyogRW5hYmxlIHNjcm9sbCBpZiBuZWVkZWQgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwwLDApOyAvKiBGYWxsYmFjayBjb2xvciAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC41KTsgLyogQmxhY2sgdy8gb3BhY2l0eSAqL1xuICB9XG4gIFxuICAvKiBNb2RhbCBDb250ZW50ICovXG4gIC5tb2RhbC1jb250ZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTY2LCAyMDgsIDIzMSk7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzg4ODtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgIHdpZHRoOiA5MCU7XG4gICAgaGVpZ2h0OiA4NiU7IFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DrawingInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-drawing-input',
                templateUrl: './drawing-input.component.html',
                styleUrls: ['./drawing-input.component.css'],
            }]
    }], null, { renderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderEl']
        }], Modal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['Modal']
        }], canvasBGImage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['canvasBGImage']
        }], canvas: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], strokeColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], canvasWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], canvasHeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], strokeWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], niceDrawing: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], prevDrawing: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], strokesMade: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], setID: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], styleType: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], regionStyle: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/kh-decompose-number/decompose.ts":
/*!**************************************************!*\
  !*** ./src/app/kh-decompose-number/decompose.ts ***!
  \**************************************************/
/*! exports provided: decomposeNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decomposeNumber", function() { return decomposeNumber; });
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

function decomposeNumber(_els, _setup) {
    let self = {};
    class decomposeClass {
        //#endregion
        constructor(els, setup) {
            this.textSize = 14;
            this.svgns = "http://www.w3.org/2000/svg";
            this.color = "#ff7f50";
            this.animationFinished = false;
            this.assetScale = 3;
            this.yTextOffset = 50;
            this.sliderOpen = false;
            this.max = 999;
            this.min = 0;
            self = this;
            this.els = els;
            this.setup = setup;
            this.refToOne = this.els.getElementById("one");
            this.refToTen = this.els.getElementById("ten");
            this.refToHundred = this.els.getElementById("hundred");
            this.refToThousand = this.els.getElementById("thousand");
            this.drawnElements = this.els.getElementById("drawnElements");
            this.T = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].timeline({ paused: false });
            this.num = this.els.getElementById("num");
            this.sliderControls = this.els.getElementById("sliderControls");
            this.numberDisplay = this.els.getElementById("numberDisplay");
            this.buttons = this.els.getElementById("buttons");
            this.sliderBar = this.els.getElementById("sliderBar");
            this.slider = this.els.getElementById("slider");
            this.maxText = this.els.getElementById("maxText");
            this.goButton = this.els.getElementById("goButton");
            this.init();
        }
        //#region DECOMPOSITION FUNCTIONS
        showObject(object, duration) {
            return self.T.to(object, { opacity: 1, duration: duration });
        }
        hideObject(object, duration) {
            return self.T.to(object, { opacity: 0, duration: duration });
        }
        translateObject(object, xVal, yVal) {
            return self.T.to(object, { x: xVal, y: yVal, delay: 0.05 });
        }
        setDecrementVal(num) {
            if (num > 999) {
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
            let parent = obj.parentElement;
            parent.removeChild(obj);
            parent.appendChild(obj);
        }
        redrawElements() {
            let arr = Array.from(self.drawnElements.children);
            arr.slice().reverse().forEach(element => {
                self.bringToFront(element);
            });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].utils.toArray("text").forEach(element => {
                self.bringToFront(element);
            });
        }
        togglePause() {
            if (this.T.paused()) {
                this.T.resume();
                console.log("resumed");
            }
            else {
                this.T.pause();
                console.log("paused");
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
                    currentAsset = this.refToOne;
                }
                else if (decrementVal == 10) {
                    currentAsset = this.refToTen;
                }
                else if (decrementVal == 100) {
                    currentAsset = this.refToHundred;
                }
                else {
                    currentAsset = this.refToThousand;
                }
                let decrementText = document.createElementNS(this.svgns, "text");
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(decrementText, { attr: { id: 'decrementText' + (decrementNumID), class: "number" }, x: numBBox.x - (numBBox.width / 2), y: numBBox.y + this.yTextOffset, fontFamily: 'Poppins', textContent: decrementVal.toString(), fontSize: this.textSize, opacity: 0, fill: this.color });
                this.drawnElements.appendChild(decrementText);
                let decrementAsset = currentAsset.cloneNode(true);
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(decrementAsset, { attr: { id: 'decrementAsset' + (decrementNumID), x: currentAsset.getBBox().x, y: currentAsset.getBBox().y, width: currentAsset.getBBox().width, height: currentAsset.getBBox().height }, opacity: 0 });
                this.drawnElements.appendChild(decrementAsset);
                let number = document.createElementNS(this.svgns, "text");
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(number, { attr: { id: 'text' + (i), class: 'number' }, x: numBBox.x - (numBBox.width / 2), y: numBBox.y + this.yTextOffset, fontFamily: 'Poppins', textContent: i, fontSize: this.textSize, opacity: 0 });
                this.drawnElements.appendChild(number);
                i -= decrementVal;
                this.num.textContent = String(parseInt(this.num.textContent) - decrementVal);
                decrementVal = this.setDecrementVal(i);
                decrementNumID++;
            }
        }
        decompose(startingNumber) {
            if (!this.animationFinished && this.numValue > 0) {
                if (this.sliderOpen) {
                    this.sliderControls.style.display = "none";
                    this.sliderOpen = false;
                }
                this.goButton.style.display = "none";
                this.generateDecompositionObjects(startingNumber);
                this.num.textContent = String(this.numValue); //set this back to what it was after it was modified from generateDecompostionObjects
                this.showObject('#text' + startingNumber, 1); //fade in starting number
                let yOffset = 100;
                let xOffset = 25;
                let decrementVal = this.setDecrementVal(startingNumber);
                let decrementNumID = 1;
                let assetRowCount = { 100: 0, 10: 0, 1: 0 };
                let yVal = yOffset;
                let xVal = xOffset;
                let maxXVal = 0;
                for (let i = startingNumber; i > decrementVal - 1;) {
                    let decrementText = this.els.getElementById('decrementText' + decrementNumID);
                    let decrementAsset = this.els.getElementById("decrementAsset" + decrementNumID);
                    let currentNum = '#text' + i;
                    let nextNum = '#text' + (i - decrementVal);
                    if (assetRowCount[decrementVal] == 3) { //if we have filled row with 3 objects of unique type then proceed to next row
                        assetRowCount[decrementVal] = 0;
                        yVal += (parseInt(decrementAsset.getAttribute("height")) * this.assetScale) + 10;
                        xVal = xOffset;
                    }
                    this.hideObject(currentNum, 0);
                    this.showObject(decrementText, 0);
                    //show next counter if exists
                    if (i - decrementVal > 0) {
                        this.showObject(nextNum, 0);
                    }
                    this.translateObject(decrementText, xVal, yVal);
                    this.T.to(decrementText, { duration: 0.5, scale: 0.01 }); //scale
                    this.T.set(decrementAsset, { x: xVal, y: yVal, opacity: 1 });
                    this.T.to(decrementAsset, { scale: this.assetScale, duration: 0.5, onComplete: this.redrawElements }, "<");
                    decrementNumID++;
                    xVal += (parseInt(decrementAsset.getAttribute("width"))) * this.assetScale + 10;
                    maxXVal = Math.max(maxXVal, xVal); //keep track of the furthest xValue
                    assetRowCount[decrementVal]++;
                    //decrement and then update rather than update then decrement
                    i -= decrementVal;
                    if (decrementVal != this.setDecrementVal(i)) {
                        decrementVal = this.setDecrementVal(i);
                        //if we are switching to a new asset
                        yVal = yOffset; //reset y value
                        xOffset = maxXVal + 25; //set x to furthest x
                        xVal = xOffset;
                    }
                }
                this.animationFinished = true;
            }
        }
        reset() {
            if (this.T.isActive()) {
                console.log("still active");
                this.T.kill();
                this.T = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].timeline({ paused: false });
                console.log(this.T);
            }
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.sliderControls, { display: "none" });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { display: "none" });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.goButton, { display: "block" });
            Array.from(this.drawnElements.childNodes).forEach(e => e.remove());
            this.animationFinished = false;
            this.sliderOpen = false;
            this.sliderValueHasBeenUpdated(self.min);
        }
        //#endregion
        //#region SLIDER FUNCTIONS
        inputFieldPressed() {
            if (!this.sliderOpen && !this.animationFinished) {
                if (this.num.style.display == "none") {
                    this.num.textContent = String(this.min);
                    this.numValue = this.min;
                    this.num.style.display = "block";
                }
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { x: -(this.num.getBBox().width / 2) });
                this.sliderControls.style.display = "block";
                this.sliderOpen = true;
            }
            else {
                this.sliderControls.style.display = "none";
                this.sliderOpen = false;
            }
        }
        buttonPressed(button) {
            let newNumber = parseInt(this.num.textContent) + parseInt(button.getAttribute("val"));
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
        sliderValueHasBeenUpdated(value) {
            this.num.textContent = value;
            this.numValue = value;
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { x: -(this.num.getBBox().width / 2) });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.slider, { x: this.increment * (value - this.min) });
        }
        addEventListenersAndInteractivity() {
            this.numberDisplay.addEventListener("pointerdown", event => this.inputFieldPressed());
            for (let i = 0; i < this.buttons.children.length; i++) {
                this.buttons.children[i].addEventListener("pointerdown", event => this.buttonPressed(this.buttons.children[i]));
            }
            //Initializing draggables, controller and slider
            var controllerDraggable = gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"].create(this.sliderControls, {
                type: 'x,y',
                bounds: this.els
            });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"].create(this.slider, {
                type: 'x',
                bounds: this.sliderBar,
                cursor: "pointer",
                onPress: function () {
                    //disable controller drag if we are dragging slider
                    controllerDraggable[0].disable();
                },
                onDrag: function () {
                    self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.min));
                },
                onDragEnd: function () {
                    controllerDraggable[0].enable();
                }
            });
            this.goButton.addEventListener("pointerdown", e => this.decompose(this.numValue));
            document.body.addEventListener("keydown", event => {
                if (event.keyCode === 32) {
                    console.log("spacebar");
                    this.togglePause();
                }
            });
            this.els.getElementById("restart").addEventListener("pointerdown", e => this.reset());
        }
        init() {
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].registerPlugin(gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"]);
            //calculating increments for slider
            let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width);
            this.increment = barWidth / (this.max - this.min);
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.sliderControls, { display: "none" });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { display: "none" });
            //setting slider max and mins and repositioning the max
            this.els.getElementById("maxTextInner").textContent = String(this.max);
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.maxText, { x: `-=${this.maxText.getBBox().width}` });
            this.els.getElementById("minTextInner").textContent = String(this.min);
            this.addEventListenersAndInteractivity();
        }
    }
    return new decomposeClass(_els, _setup);
}


/***/ }),

/***/ "./src/app/kh-decompose-number/kh-decompose-number.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/kh-decompose-number/kh-decompose-number.component.ts ***!
  \**********************************************************************/
/*! exports provided: KhDecomposeNumberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KhDecomposeNumberComponent", function() { return KhDecomposeNumberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _decompose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decompose */ "./src/app/kh-decompose-number/decompose.ts");



const _c0 = ["renderEl"];
class KhDecomposeNumberComponent {
    ngAfterViewInit() {
        const setup = {
            startingNumber: this.startingNumber
        };
        const els = this.renderEl.nativeElement;
        const decompose = Object(_decompose__WEBPACK_IMPORTED_MODULE_1__["decomposeNumber"])(els, setup);
    }
}
KhDecomposeNumberComponent.ɵfac = function KhDecomposeNumberComponent_Factory(t) { return new (t || KhDecomposeNumberComponent)(); };
KhDecomposeNumberComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: KhDecomposeNumberComponent, selectors: [["app-kh-decompose-number"]], viewQuery: function KhDecomposeNumberComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.renderEl = _t.first);
    } }, inputs: { startingNumber: "startingNumber" }, decls: 93, vars: 0, consts: [["href", "https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap", "rel", "stylesheet"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 600 500"], ["renderEl", ""], ["id", "outerBox", "width", "578.40613", "height", "443.09464", "x", "10.796928", "y", "27.594814", "rx", "9.9925632", "ry", "13.750541", 2, "fill", "none", "stroke", "#bebebe", "stroke-width", "2.93048", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "restart"], ["id", "path1231", "d", "m 563.5041,41.044875 a 20,20 0 0 1 19.40062,15.665127 20,20 0 0 1 -10.9495,22.402878 20,20 0 0 1 -24.27916,-5.683551 20,20 0 0 1 0.13195,-24.935178", 2, "fill", "none", "stroke", "#000000", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], [0, "sodipodi", "type", "star", "id", "path2956", 0, "inkscape", "flatsided", "true", 0, "sodipodi", "sides", "3", 0, "sodipodi", "cx", "-68.588837", 0, "sodipodi", "cy", "98.789551", 0, "sodipodi", "r1", "16.775583", 0, "sodipodi", "r2", "8.4007263", 0, "sodipodi", "arg1", "1.2292253e-09", 0, "sodipodi", "arg2", "1.0471976", 0, "inkscape", "rounded", "0.02", 0, "inkscape", "randomized", "0", 0, "inkscape", "transform-center-x", "2.750714", 0, "inkscape", "transform-center-y", "0.34139421", "transform", "matrix(-0.73462571,0,0,0.73462571,515.93744,-28.168397)", "d", "m -51.813253,98.789551 c 0,0.581123 -24.660108,14.818639 -25.163375,14.528079 -0.503268,-0.29056 -0.503268,-28.765599 0,-29.056161 0.503267,-0.290561 25.163375,13.946959 25.163375,14.528082 z", 2, "fill", "#000000", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "numberDisplay"], ["id", "displayBox", "width", "88.217819", "height", "41.903465", "x", "255.89108", "y", "5.8811884", "ry", "6.565558", 2, "fill", "#fff2cc", "fill-opacity", "1", "stroke", "#666666", "stroke-width", "1.05833", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], [0, "xml", "space", "preserve", "x", "299.21472", "y", "32.352142", "id", "num", 2, "font-weight", "600", "font-size", "14.8167px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "stroke-width", "0.264583"], [0, "sodipodi", "role", "line", "id", "tspan4252", "x", "299.21472", "y", "32.352142", 2, "font-size", "14.8167px", "stroke-width", "0.264583"], [0, "sodipodi", "type", "star", "id", "goButton", 0, "inkscape", "flatsided", "true", 0, "sodipodi", "sides", "3", 0, "sodipodi", "cx", "595.55298", 0, "sodipodi", "cy", "36.725765", 0, "sodipodi", "r1", "122.63139", 0, "sodipodi", "r2", "65.31691", 0, "sodipodi", "arg1", "2.0946857", 0, "sodipodi", "arg2", "3.1418833", 0, "inkscape", "rounded", "0", 0, "inkscape", "randomized", "0", "d", "m 534.20642,142.90984 0.0617,-212.40379 183.91622,106.255352 z", "transform", "matrix(0.14610363,0,0,0.14610363,278.24675,21.469757)", 0, "inkscape", "transform-center-x", "-4.7715168", 2, "fill", "#3c78d8", "stroke", "#000000", "stroke-width", "6.84446", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "sliderControls"], ["id", "controllerBackground", "width", "191.87375", "height", "56.974003", "x", "204.06313", "y", "105.6554", "ry", "9.4543991", 2, "fill", "#c9daf8", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.842964", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "sliderBar", "width", "182.18196", "height", "20", "x", "208.90903", "y", "139.33348", "ry", "10", 2, "fill", "#e5edfb", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.46116", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g1166", "transform", "translate(2.6293945e-6,284.45898)"], [0, "xml", "space", "preserve", "id", "maxText", "transform", "translate(383.23834,-132.1455)", 2, "font-weight", "600", "font-size", "8px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "white-space", "pre", "shape-inside", "url(#rect3952)", "fill", "#3c78d8", "fill-opacity", "1"], ["x", "0", "y", "0", "id", "maxTextInner"], [0, "xml", "space", "preserve", "id", "minText", "transform", "translate(211.59367,-132.1455)", 2, "font-weight", "600", "font-size", "8px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "white-space", "pre", "shape-inside", "url(#rect3952-1)", "fill", "#3c78d8", "fill-opacity", "1"], ["x", "0", "y", "0", "id", "minTextInner"], ["id", "buttons", "transform", "translate(195.9765,-5.3520234)"], ["id", "smallDec", "val", "-1"], ["id", "rect1216", "width", "20", "height", "20", "x", "70.326515", "y", "114.93417", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.802577", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "-1", "id", "text9162", "transform", "translate(57.393989,0.26262247)", 2, "font-weight", "600", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 23.307176,124.01749 v 1.4986 h -5.3848 v -1.4986 z", "id", "path6337"], ["d", "m 24.881978,121.68069 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6339"], ["id", "largeDec", "val", "-10"], ["id", "rect1216-7", "width", "40", "height", "20", "x", "12.932528", "y", "115.00823", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.13501", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "-10", "id", "text16348", "transform", "translate(-44.060659,0.26262231)", 2, "font-weight", "bold", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 73.062539,124.18047 v 1.4986 h -5.3848 v -1.4986 z", "id", "path6363", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 74.637341,121.84367 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6365", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 79.450634,124.71387 q 0,-2.1971 0.7874,-3.4417 0.8001,-1.2446 2.6416,-1.2446 1.8415,0 2.6289,1.2446 0.8001,1.2446 0.8001,3.4417 0,2.2098 -0.8001,3.4671 -0.7874,1.2573 -2.6289,1.2573 -1.8415,0 -2.6416,-1.2573 -0.7874,-1.2573 -0.7874,-3.4671 z m 5.1054,0 q 0,-0.9398 -0.127,-1.5748 -0.1143,-0.6477 -0.4826,-1.0541 -0.3556,-0.4064 -1.0668,-0.4064 -0.7112,0 -1.0795,0.4064 -0.3556,0.4064 -0.4826,1.0541 -0.1143,0.635 -0.1143,1.5748 0,0.9652 0.1143,1.6256 0.1143,0.6477 0.4826,1.0541 0.3683,0.3937 1.0795,0.3937 0.7112,0 1.0795,-0.3937 0.3683,-0.4064 0.4826,-1.0541 0.1143,-0.6604 0.1143,-1.6256 z", "id", "path6367", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["id", "largeInc", "val", "10"], ["id", "rect1216-7-5", "width", "40", "height", "20", "x", "155.11449", "y", "115.35304", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.13501", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "+10", "id", "text19608", "transform", "translate(44.060648,1.0504888)", 2, "font-weight", "600", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 127.7074,125.2741 h -2.4003 v 2.4638 h -1.6764 v -2.4638 h -2.4003 v -1.5494 h 2.4003 v -2.4638 h 1.6764 v 2.4638 h 2.4003 z", "id", "path6391"], ["d", "m 129.206,121.4006 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6393"], ["d", "m 134.01929,124.2708 q 0,-2.1971 0.7874,-3.4417 0.8001,-1.2446 2.6416,-1.2446 1.8415,0 2.6289,1.2446 0.8001,1.2446 0.8001,3.4417 0,2.2098 -0.8001,3.4671 -0.7874,1.2573 -2.6289,1.2573 -1.8415,0 -2.6416,-1.2573 -0.7874,-1.2573 -0.7874,-3.4671 z m 5.1054,0 q 0,-0.9398 -0.127,-1.5748 -0.1143,-0.6477 -0.4826,-1.0541 -0.3556,-0.4064 -1.0668,-0.4064 -0.7112,0 -1.0795,0.4064 -0.3556,0.4064 -0.4826,1.0541 -0.1143,0.635 -0.1143,1.5748 0,0.9652 0.1143,1.6256 0.1143,0.6477 0.4826,1.0541 0.3683,0.3937 1.0795,0.3937 0.7112,0 1.0795,-0.3937 0.3683,-0.4064 0.4826,-1.0541 0.1143,-0.6604 0.1143,-1.6256 z", "id", "path6395"], ["id", "smallInc", "val", "1"], ["id", "rect1216-2", "width", "20", "height", "20", "x", "117.7205", "y", "114.74561", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.802577", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "+1", "id", "text20888", "transform", "translate(-57.393986)", 2, "font-weight", "bold", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 186.07333,125.62826 h -2.4003 v 2.4638 h -1.6764 v -2.4638 h -2.4003 v -1.5494 h 2.4003 v -2.4638 h 1.6764 v 2.4638 h 2.4003 z", "id", "path6419", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 187.57193,121.75476 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6421", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["id", "slider", "width", "24.686497", "height", "15", "x", "209.05663", "y", "141.83348", "ry", "7.5", 2, "fill", "#3c78d8", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.09866", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "hundred", 2, "opacity", "0"], ["d", "M 0.70502809,0.002863 H 3.0050281 a 0.8,0.8 0 0 1 0.6,0.2 l 0.5,-0.2 h 2.4 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.4999999,0.2 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.6,0.2 0.5,-0.2 h 2.3 l 0.6,0.2 0.5,-0.2 h 2.4 l 0.5,0.2 a 0.8,0.8 0 0 1 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.4 c 0.3,0 1.7,0.7 1.7,1.6 v 2.3 a 0.7,0.7 0 0 1 -0.7,0.6 h -2.3 a 0.6,0.6 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.3 a 0.6,0.6 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.5,-0.3 0.6,0.6 0 0 1 -0.6,0.3 h -2.3 a 0.5,0.5 0 0 1 -0.5,-0.3 l -0.6,0.3 h -2.4 a 0.9,0.9 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.3 a 0.7,0.7 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.3 a 0.6,0.6 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 H 8.5050281 a 0.5,0.5 0 0 1 -0.5,-0.3 0.6,0.6 0 0 1 -0.6,0.3 h -2.3 a 0.5,0.5 0 0 1 -0.5,-0.3 0.9,0.9 0 0 1 -0.6,0.3 h -2.3 a 0.7,0.7 0 0 1 -0.7,-0.6 v -0.3 H 0.70502809 a 0.7,0.7 0 0 1 -0.7,-0.7 v -2.3 a 0.7,0.7 0 0 1 0.7,-0.6 z", "fill", "#88d2ff", "id", "path920"], ["d", "m 0.00502809,30.602863 a 0.7,0.7 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.6,0.6 0 0 1 -0.3,-0.6 v -2.2 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 v -2.2 a 0.7,0.7 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 v -2.2 a 0.7,0.7 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 c 0,-0.2 0.1,-0.3 0.3,-0.5 l 4.30000001,4.4 h -0.1 a 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.6,0.6 0 0 1 0.3,0.6 v 2.2 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.6,0.6 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.6,0.6 0 0 1 0.3,0.6 v 2.2 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.7,0.7 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 c 0,0.4 -0.3,0.6 -0.7,0.6 h -2.3 a 1.9,1.9 0 0 1 -1.80000001,-1.7 z", "fill", "#0054ff", "id", "path922"], ["d", "m 0.90502809,20.502863 v -2.3 a 0.8,0.8 0 0 1 0.20000001,-0.5 l -0.20000001,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.20000001,-0.5 1.4,1.4 0 0 1 -0.20000001,-0.6 v -2.2 a 1.4,1.4 0 0 1 0.20000001,-0.6 0.8,0.8 0 0 1 -0.20000001,-0.5 v -2.3 c 0,-0.2 0.10000001,-0.3 0.20000001,-0.5 a 0.8,0.8 0 0 1 -0.20000001,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.20000001,-0.5 c -0.1,-0.2 -0.20000001,-0.3 -0.20000001,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.80000001,-0.8 h 2.3 l 0.6,0.2 0.5,-0.2 h 2.3 a 1.1,1.1 0 0 1 0.6,0.2 l 0.5,-0.2 h 2.3999999 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.6,0.2 0.5,-0.2 h 2.3 l 0.6,0.2 0.5,-0.2 h 2.4 l 0.5,0.2 0.6,-0.2 h 2.3 l 0.5,0.2 0.6,-0.2 h 2.3 a 0.9,0.9 0 0 1 0.8,0.8 v 2.3 c 0,0.2 -0.1,0.3 -0.2,0.5 a 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 c 0.1,0.2 0.2,0.3 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 l -0.2,0.5 a 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 c 0.1,0.2 0.2,0.3 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.8,0.7 h -2.3 a 0.7,0.7 0 0 1 -0.6,-0.2 c -0.1,0.2 -0.3,0.2 -0.5,0.2 h -2.3 c -0.3,0 -0.5,0 -0.6,-0.2 -0.1,-0.2 -0.3,0.2 -0.5,0.2 h -2.4 c -0.2,0 -0.4,0 -0.5,-0.2 a 0.7,0.7 0 0 1 -0.6,0.2 h -2.3 c -0.2,0 -0.4,0 -0.5,-0.2 a 0.7,0.7 0 0 1 -0.6,0.2 h -2.3 a 0.7,0.7 0 0 1 -0.6,-0.2 c -0.1,0.2 -0.3,0.2 -0.5,0.2 h -2.3 a 0.7,0.7 0 0 1 -0.6,-0.2 c -0.1,0.2 -0.3,0.2 -0.5,0.2 h -2.3 c -0.3,0 -0.5,0 -0.6,-0.2 -0.1,-0.2 -0.3,0.2 -0.5,0.2 H 8.5050281 c -0.2,0 -0.4,0 -0.5,-0.2 -0.1,-0.2 -0.3,0.2 -0.6,0.2 h -2.3 c -0.2,0 -0.4,0 -0.5,-0.2 a 0.7,0.7 0 0 1 -0.6,0.2 h -2.3 a 0.7,0.7 0 0 1 -0.80000001,-0.7 v -2.3 a 0.8,0.8 0 0 1 0.20000001,-0.5 1.4,1.4 0 0 1 -0.20000001,-0.6 v -2.2 a 0.8,0.8 0 0 1 0.20000001,-0.5 1.4,1.4 0 0 1 -0.20000001,-0.6 v -2.2 a 1.4,1.4 0 0 1 0.20000001,-0.6 0.8,0.8 0 0 1 -0.20000001,-0.5 v -2.3 c 0,-0.2 0.10000001,-0.3 0.20000001,-0.5 a 0.8,0.8 0 0 1 -0.20000001,-0.5 z", "fill", "#76c9ff", "id", "path924"], ["d", "m 22.205028,24.502863 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,3.4 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,10 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-16.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-16.6 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 l -0.3,0.3 h -2.4 l -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,13.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 l -0.3,0.3 h -2.4 l -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.4 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-3.3 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,13.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m -3.4,0 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.7 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,0 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,19.9 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 3.4,-23.2 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,23.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 13.7,-20 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m -13.7,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 13.7,13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.4,29.9 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 3.4,-6.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.4,10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.5,13.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.5,-26.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.5,23.2 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,3.4 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.3,0.4 h -2.4 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.5,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m -3.5,-3.3 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m 3.5,0 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -27.3999999,-6.7 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 13.6999999,23.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -10.2999999,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,10 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-13.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.4 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,20 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-20 h 2.3999999 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-3.3 h 2.3999999 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m 0,6.7 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 H 8.5050281 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-6.6 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 H 8.5050281 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -6.8,13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,16.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-16.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,26.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-29.9 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,23.2 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 10.2999999,-16.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,6.6 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m -6.8999999,6.7 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 6.8999999,-10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m -3.4,23.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 3.4,-26.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m -3.4,3.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m -3.4999999,3.4 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.3,0.4 H 8.5050281 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4999999,-6.7 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m -3.4999999,3.3 h 2.3999999 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-3.3 h 2.3999999 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 H 8.5050281 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m 3.4999999,-19.9 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.4999999,29.9 h 2.3999999 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 H 8.5050281 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4999999,-16.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-6.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z", "fill", "#0b88ff", "id", "path926"], ["id", "ten", 2, "opacity", "0"], ["d", "m 0.20502809,0.30168473 a 0.5,0.5 0 0 1 0.5,-0.3 H 3.1050281 c 0.3,0 1.8,0.7 1.8,1.59999997 l -0.2,2.3 a 0.7,0.7 0 0 1 -0.7,0.6 h -2.3 l -0.6,-0.2 z", "fill", "#88d2ff", "id", "path929"], ["d", "m 0.00502809,30.601685 a 0.9,0.9 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.2 a 0.6,0.6 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.6,0.6 0 0 1 -0.3,-0.6 v -2.2 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 v -2.2 a 0.6,0.6 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5000003 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.6,0.6 0 0 1 -0.3,-0.6 v -2.2 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 V 0.70168473 a 0.9,0.9 0 0 1 0.3,-0.6 L 4.6050281,4.5016847 h -0.1 a 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2000003 a 0.7,0.7 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.9,0.9 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.7,0.7 0 0 1 -0.7,0.7 h -2.3 a 2,2 0 0 1 -1.80000001,-1.8 z", "fill", "#0054ff", "id", "path931"], ["d", "m 1.0050281,27.101685 v -2.2 c 0,-0.2 0,-0.4 0.2,-0.5 a 0.7,0.7 0 0 1 -0.2,-0.6 v -2.2 a 0.7,0.7 0 0 1 0.2,-0.6 c -0.2,-0.1 -0.2,-0.3 -0.2,-0.5 v -2.3 c 0,-0.2 0,-0.4 0.2,-0.5 0.2,-0.1 -0.2,-0.3 -0.2,-0.5 v -2.3 c 0,-0.2 0,-0.4 0.2,-0.5 a 0.7,0.7 0 0 1 -0.2,-0.6 v -2.2 c 0,-0.2 0,-0.4 0.2,-0.5 a 0.7,0.7 0 0 1 -0.2,-0.6 V 8.3016847 a 0.7,0.7 0 0 1 0.2,-0.6 c -0.2,-0.1 -0.2,-0.3 -0.2,-0.5 v -2.3 c 0,-0.2 0,-0.4 0.2,-0.5 0.2,-0.1 -0.2,-0.3 -0.2,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.8,-0.79999997 h 2.3 a 0.9,0.9 0 0 1 0.8,0.79999997 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2000003 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.9,0.9 0 0 1 -0.8,0.8 h -2.3 a 0.8,0.8 0 0 1 -0.8,-0.8 v -2.3 c 0,-0.2 0,-0.4 0.2,-0.5 0.2,-0.1 -0.2,-0.3 -0.2,-0.5 v -2.3 c 0,-0.2 0,-0.4 0.2,-0.5 a 0.7,0.7 0 0 1 -0.2,-0.6 z", "fill", "#76c9ff", "id", "path933"], ["d", "m 1.8050281,24.601685 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-13.3000003 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2000003 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 V 8.3016847 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,6.7000003 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-13.3000003 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,10.0000003 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z", "fill", "#0b88ff", "id", "path935"], ["id", "one", 2, "opacity", "0"], ["d", "m 0.10168473,0.3 a 0.9,0.9 0 0 1 0.6,-0.3 H 3.1016847 c 0.3,0 1.7,0.8 1.7,1.7 v 2.2 a 0.7,0.7 0 0 1 -0.7,0.7 h -2.4 a 0.6,0.6 0 0 1 -0.6,-0.3 z", "fill", "#88d2ff", "id", "path938"], ["d", "m 1.4016847,1.2 c 0.1,0.1 3.4,0.3 3.4,0.6 V 4 a 0.7,0.7 0 0 1 -0.7,0.7 h -2.3 A 2,2 0 0 1 0.00168473,3 V 0.7 a 0.5,0.5 0 0 1 0.3,-0.5 z", "fill", "#0054ff", "id", "path940"], ["d", "m 1.7016847,0.9 h 2.4 a 0.8,0.8 0 0 1 0.8,0.7 v 2.3 a 0.9,0.9 0 0 1 -0.8,0.8 h -2.4 A 0.9,0.9 0 0 1 0.90168473,3.9 V 1.6 A 0.8,0.8 0 0 1 1.7016847,0.9 Z", "fill", "#76c9ff", "id", "path942"], ["d", "m 1.7016847,1.3 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 V 1.6 a 0.5,0.5 0 0 1 0.3,-0.3 z", "fill", "#0b88ff", "id", "path944"], ["id", "thousand", 2, "opacity", "0"], ["d", "m 11.902863,7.5000004 h 2.3 a 0.9,0.9 0 0 1 0.6,0.3 0.5,0.5 0 0 1 0.5,-0.3 h 2.3 a 0.6,0.6 0 0 1 0.6,0.3 0.5,0.5 0 0 1 0.5,-0.3 h 2.4 a 0.5,0.5 0 0 1 0.5,0.3 0.6,0.6 0 0 1 0.6,-0.3 h 2.3 a 0.5,0.5 0 0 1 0.5,0.3 0.9,0.9 0 0 1 0.6,-0.3 h 2.3 a 0.9,0.9 0 0 1 0.6,0.3 0.5,0.5 0 0 1 0.5,-0.3 h 2.3 a 0.9,0.9 0 0 1 0.6,0.3 0.5,0.5 0 0 1 0.5,-0.3 h 2.3 a 0.6,0.6 0 0 1 0.6,0.3 0.5,0.5 0 0 1 0.5,-0.3 h 2.4 a 0.5,0.5 0 0 1 0.5,0.3 0.6,0.6 0 0 1 0.6,-0.3 h 2.3 a 0.5,0.5 0 0 1 0.5,0.3 0.9,0.9 0 0 1 0.6,-0.3 h 2.4 c 0.3,0 1.7,0.8 1.7,1.6 V 11.4 a 0.7,0.7 0 0 1 -0.7,0.7 h -2.4 a 0.6,0.6 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.5,-0.3 0.6,0.6 0 0 1 -0.6,0.3 h -2.3 a 0.5,0.5 0 0 1 -0.5,-0.3 0.9,0.9 0 0 1 -0.6,0.3 h -2.3 l -0.6,-0.3 a 0.5,0.5 0 0 1 -0.5,0.3 h -2.3 a 0.9,0.9 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.3 a 0.6,0.6 0 0 1 -0.6,-0.3 0.5,0.5 0 0 1 -0.5,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.5,-0.3 0.6,0.6 0 0 1 -0.6,0.3 h -2.3 a 0.5,0.5 0 0 1 -0.5,-0.3 0.9,0.9 0 0 1 -0.6,0.3 h -2.3 a 0.5,0.5 0 0 1 -0.5,-0.3 0.9,0.9 0 0 1 -0.6,0.3 h -2.3 a 0.7,0.7 0 0 1 -0.7,-0.7 v -0.3 h -0.3 a 0.7,0.7 0 0 1 -0.7,-0.7 V 8.2000004 a 0.7,0.7 0 0 1 0.7,-0.7 z", "fill", "#88d2ff", "id", "path947"], ["d", "m 11.202863,38.1 a 0.5,0.5 0 0 1 0.3,-0.5 0.6,0.6 0 0 1 -0.3,-0.6 v -2.2 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 v -2.2 a 0.7,0.7 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.6,0.6 0 0 1 -0.3,-0.6 v -2.2 a 0.5,0.5 0 0 1 0.3,-0.5 0.9,0.9 0 0 1 -0.3,-0.6 v -2.2 a 0.7,0.7 0 0 1 0.3,-0.6 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.5 0.5,0.5 0 0 1 -0.3,-0.5 l -7.8,-7 c 0,-0.1 -3.8,-2.7 -3.3,-3.2 0.5,-0.5 0.2,-0.1 0.2,-0.1 0,0 4.7,1.6 4.7,1.5 l 10.6,6.5000004 c -0.1,0 0.1,3.7999996 0.1,3.7999996 a 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.7,0.7 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.6,0.6 0 0 1 0.3,0.6 v 2.2 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.7,0.7 0 0 1 -0.3,0.6 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.5,0.5 0 0 1 0.3,0.5 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.5 0.9,0.9 0 0 1 0.3,0.6 v 2.2 a 0.7,0.7 0 0 1 -0.7,0.7 h -2.3 c -1,0 -2.3,-0.7 -2.3,-1.4 z", "fill", "#23a6ff", "id", "path949"], ["d", "m 12.102863,28 v -2.2 a 1.4,1.4 0 0 1 0.2,-0.6 0.8,0.8 0 0 1 -0.2,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.2,-0.5 0.8,0.8 0 0 1 -0.2,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.2,-0.5 1.4,1.4 0 0 1 -0.2,-0.6 v -2.2 a 0.8,0.8 0 0 1 0.2,-0.5 1.4,1.4 0 0 1 -0.2,-0.6 v -2.2 a 1.4,1.4 0 0 1 0.2,-0.6 0.8,0.8 0 0 1 -0.2,-0.5 V 9.1000004 a 0.7,0.7 0 0 1 0.8,-0.7 h 2.3 c 0.2,0 0.4,0 0.5,0.2 a 0.7,0.7 0 0 1 0.6,-0.2 h 2.3 a 0.7,0.7 0 0 1 0.6,0.2 c 0.1,-0.2 0.3,-0.2 0.5,-0.2 h 2.3 c 0.3,0 0.4,0 0.6,0.2 0.2,0.2 0.3,-0.2 0.5,-0.2 h 2.4 c 0.2,0 0.4,0 0.5,0.2 0.1,0.2 0.3,-0.2 0.6,-0.2 h 2.3 c 0.2,0 0.4,0 0.5,0.2 a 0.7,0.7 0 0 1 0.6,-0.2 h 2.3 c 0.2,0 0.4,0 0.5,0.2 a 0.7,0.7 0 0 1 0.6,-0.2 h 2.3 a 0.7,0.7 0 0 1 0.6,0.2 c 0.1,-0.2 0.3,-0.2 0.5,-0.2 h 2.3 c 0.3,0 0.4,0 0.6,0.2 0.2,0.2 0.3,-0.2 0.5,-0.2 h 2.4 c 0.2,0 0.4,0 0.5,0.2 0.1,0.2 0.3,-0.2 0.6,-0.2 h 2.3 a 0.8,0.8 0 0 1 0.8,0.7 V 11.4 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 V 18 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 c 0.1,0.2 0.2,0.3 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 V 28 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.2 a 1.4,1.4 0 0 1 -0.2,0.6 0.8,0.8 0 0 1 0.2,0.5 v 2.3 a 0.8,0.8 0 0 1 -0.2,0.5 0.8,0.8 0 0 1 0.2,0.5 V 38 a 0.8,0.8 0 0 1 -0.2,0.5 1.4,1.4 0 0 1 0.2,0.6 v 2.2 a 0.9,0.9 0 0 1 -0.8,0.8 h -2.3 a 1.1,1.1 0 0 1 -0.6,-0.2 l -0.5,0.2 h -2.4 l -0.5,-0.2 -0.6,0.2 h -2.3 l -0.5,-0.2 -0.6,0.2 h -2.3 l -0.6,-0.2 -0.5,0.2 h -2.3 l -0.6,-0.2 -0.5,0.2 h -2.3 a 1.1,1.1 0 0 1 -0.6,-0.2 l -0.5,0.2 h -2.4 l -0.5,-0.2 -0.6,0.2 h -2.3 l -0.5,-0.2 -0.6,0.2 h -2.3 l -0.6,-0.2 -0.5,0.2 h -2.3 a 0.8,0.8 0 0 1 -0.8,-0.8 v -2.2 a 1.4,1.4 0 0 1 0.2,-0.6 0.8,0.8 0 0 1 -0.2,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.2,-0.5 0.8,0.8 0 0 1 -0.2,-0.5 v -2.3 a 0.8,0.8 0 0 1 0.2,-0.5 1.4,1.4 0 0 1 -0.2,-0.6 v -2.2 a 0.8,0.8 0 0 1 0.2,-0.5 1.4,1.4 0 0 1 -0.2,-0.6 z", "fill", "#76c9ff", "id", "path951"], ["d", "m 33.402863,32.1 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 38 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,9.9 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,-16.6 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 V 28 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 3.4,-16.5999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 11.4 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,13.2999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 V 18 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.4 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,13.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 V 28 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m -3.4,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,0 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,10 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 18 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 3.4,0 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 V 18 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,20 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 3.4,-23.2999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 11.4 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.2999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m -3.4,23.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 13.7,-19.9 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-6.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 18 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -13.7,-6.6999996 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 V 9.1000004 a 0.4,0.4 0 0 1 0.4,-0.3 z M 43.702863,22.1 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-13.2999996 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 V 9.1000004 a 0.4,0.4 0 0 1 0.4,-0.3 z M 40.202863,38.7 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 3.5,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,3.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-9.9 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-3.4 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m -3.5,10 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 z m 0,-10 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m -3.4,13.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 3.4,-26.6 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-3.2999996 h 2.4 l 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 Z M 36.802863,32.1 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 38 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-3.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,0 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.3,0.4 h -2.4 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-13.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 V 18 a 0.4,0.4 0 0 1 -0.3,0.4 h -2.4 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.3 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m -27.3,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 18 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 13.7,23.2 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m -10.3,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 V 28 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 0,10 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 38 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-13.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,19.9 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 3.4,-19.9 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 V 18 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,6.6 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 v 2.3 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 V 18 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-6.6999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 11.4 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,3.2999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m -6.8,13.3 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,-6.6 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-13.2999996 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 V 9.1000004 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,3.2999996 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,16.7 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 3.4,-16.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m -3.4,26.6 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 3.4,-29.8999996 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 11.4 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 a 0.3,0.3 0 0 1 0.3,-0.3 z M 12.902863,32.1 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 3.4,-6.6 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 10.3,-16.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,6.7 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -6.9,6.6 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 V 28 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 6.9,-9.9 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 18 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.5,23.2 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-3.3 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 z m 3.5,-26.5999996 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 V 9.1000004 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,13.2999996 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,13.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 V 38 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.3 a 0.4,0.4 0 0 1 0.4,-0.3 z m 0,-3.3 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.3 v -2.3 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m 0,-6.7 h 2.3 c 0.2,0 0.3,0.2 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.3 c -0.2,0 -0.4,-0.1 -0.4,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.4,-0.4 z m 0,3.4 h 2.3 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 c 0,0.2 -0.1,0.4 -0.3,0.4 h -2.3 a 0.4,0.4 0 0 1 -0.4,-0.4 v -2.2 c 0,-0.2 0.2,-0.3 0.4,-0.3 z m -3.5,3.3 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.5,0.5 0 0 1 -0.3,0.3 h -2.4 a 0.5,0.5 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,3.3 h 2.3 a 0.4,0.4 0 0 1 0.4,0.3 V 38 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-6.6 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.3,0.4 h -2.4 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m -3.4,3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.3 a 0.4,0.4 0 0 1 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-3.3 h 2.3 c 0.2,0 0.4,0.1 0.4,0.3 v 2.2 a 0.4,0.4 0 0 1 -0.4,0.4 h -2.3 c -0.2,0 -0.3,-0.2 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z m 3.4,-19.9999996 h 2.4 l 0.3,0.3 V 11.4 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 V 9.1000004 Z M 19.702863,38.7 h 2.3 a 0.4,0.4 0 0 1 0.4,0.4 v 2.2 c 0,0.2 -0.2,0.3 -0.4,0.3 h -2.3 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 c 0,-0.2 0.1,-0.4 0.3,-0.4 z m 3.4,-16.6 h 2.4 a 0.5,0.5 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.5,0.5 0 0 1 0.3,-0.3 z m 0,3.3 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 V 28 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,-6.6 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 v 2.3 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.3 a 0.3,0.3 0 0 1 0.3,-0.3 z m 0,-6.7 h 2.4 a 0.4,0.4 0 0 1 0.3,0.4 v 2.2 a 0.3,0.3 0 0 1 -0.3,0.3 h -2.4 a 0.3,0.3 0 0 1 -0.3,-0.3 v -2.2 a 0.4,0.4 0 0 1 0.3,-0.4 z m 0,3.4 h 2.4 a 0.3,0.3 0 0 1 0.3,0.3 V 18 a 0.4,0.4 0 0 1 -0.3,0.4 h -2.4 a 0.4,0.4 0 0 1 -0.3,-0.4 v -2.2 a 0.3,0.3 0 0 1 0.3,-0.3 z", "fill", "#0b88ff", "id", "path953"], ["d", "m 11.702863,41.7 c 0,0 0.4,0 0.4,-0.6 v -2.2 a 2.1,2.1 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 v -2.2 a 2.1,2.1 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 v -2.2 a 2.1,2.1 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 V 29 a 1.4,1.4 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 v -2.3 a 1.7,1.7 0 0 0 -0.2,-0.5 0.8,0.8 0 0 0 0.2,-0.5 v -2.3 a 3.9,3.9 0 0 0 -0.2,-0.6 c 0.1,0 0.2,-0.2 0.2,-0.4 V 19 a 2.1,2.1 0 0 0 -0.2,-0.6 c 0.1,0 0.2,-0.2 0.2,-0.4 v -2.3 a 2.1,2.1 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 v -2.2 a 2.1,2.1 0 0 0 -0.2,-0.6 0.6,0.6 0 0 0 0.2,-0.5 V 9.1000004 a 1.3,1.3 0 0 0 -0.3,-0.7 l -0.9,-0.6 h -0.1 a 0.2,0.2 0 0 0 -0.2,-0.2 l -0.8,-0.7 h -0.2 a 0.3,0.3 0 0 1 -0.1,-0.2 L 8.602863,6.1 h -0.2 c 0,-0.1 0,-0.2 -0.1,-0.2 l -0.9,-0.7 h -0.1 l -0.2,-0.2 -0.9,-0.6 h -0.1 l -0.2,-0.2 -0.9,-0.7 h -0.1 c 0,-0.1 -0.1,-0.1 -0.2,-0.2 l -0.8,-0.6 h -0.2 V 2.5 l -0.9,-0.7 h -0.2 V 1.6 l -0.9,-0.6 h -0.1 l -0.2,-0.3 -0.9,-0.6 h -0.1 c -0.1,0 -0.4,0 -0.4,0.5 v 2.3 a 0.8,0.8 0 0 0 0.2,0.6 0.6,0.6 0 0 0 -0.2,0.5 v 2.2000004 a 0.8,0.8 0 0 0 0.2,0.6 0.6,0.6 0 0 0 -0.2,0.5 v 2.2 a 0.8,0.8 0 0 0 0.2,0.5999996 0.6,0.6 0 0 0 -0.2,0.5 v 2.2 a 0.8,0.8 0 0 0 0.2,0.6 0.6,0.6 0 0 0 -0.2,0.5 v 2.2 c 0,0.1 0,0.5 0.2,0.6 a 0.6,0.6 0 0 0 -0.2,0.5 v 2.3 a 1,1 0 0 0 0.2,0.6 c -0.1,0 -0.2,0.2 -0.2,0.4 v 2.3 a 1,1 0 0 0 0.2,0.6 c -0.1,0 -0.2,0.2 -0.2,0.4 v 2.3 a 0.8,0.8 0 0 0 0.2,0.6 c -0.1,0 -0.2,0.2 -0.2,0.4 v 2.3 a 0.8,0.8 0 0 0 0.2,0.6 0.6,0.6 0 0 0 -0.2,0.5 v 2.2 a 1.1,1.1 0 0 0 0.2,0.7 l 0.9,0.6 h 0.2 c 0,0.1 0,0.2 0.1,0.2 l 0.9,0.6 h 0.1 l 0.2,0.2 0.9,0.6 h 0.1 c 0.1,0.1 0.1,0.2 0.2,0.2 l 0.9,0.7 h 0.1 l 0.2,0.2 0.8,0.6 h 0.2 a 0.3,0.3 0 0 0 0.1,0.2 l 0.9,0.7 h 0.2 c 0,0.1 0,0.1 0.1,0.2 l 0.9,0.6 h 0.1 c 0.1,0.1 0.1,0.2 0.2,0.2 l 0.9,0.7 h 0.1 l 0.2,0.2 0.9,0.6 h 0.1 a 0.2,0.2 0 0 0 0.2,0.2 l 0.8,0.7 z", "fill", "#23a6ff", "id", "path957"], ["d", "m 7.302863,28.7 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 V 32 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 29 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,3.3 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,-6.6 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 0,9.9 0.8,0.6 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,-16.5 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 V 22 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 a 0.6,0.6 0 0 1 -0.1,-0.4 V 19 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,3.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 1.2,-15.6999996 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,13.1999996 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,-3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.3 a 0.3,0.3 0 0 1 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,-3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 0,-3.2999996 0.8,0.5999996 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 V 9.9000004 c 0,-0.1 0,-0.2 0.1,-0.2 z m 0,13.2999996 0.8,0.5 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,-7.5 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,-0.9 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,10 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,-3.4 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-3.3 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-6.6 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.5 z m 1.2,0.9 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,-4.1999996 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 V 11.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 V 8.2000004 c 0,-0.1 0.1,-0.3 0.1,-0.2 z m 0,19.8999996 0.8,0.5 a 0.7,0.7 0 0 1 0.1,0.5 v 2.2 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 1.2,-22.4 0.8,0.6 c 0.1,0.1000004 0.1,0.2000004 0.1,0.4000004 v 2.3 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 5.8 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,3.3000004 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 V 12.1 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 9.1000004 c 0,-0.2 0,-0.3 0.1,-0.3 z m -1.2,22.3999996 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,3.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0.1,-0.3 0.1,-0.2 z m 4.7,-16.5 0.8,0.6 a 0.5,0.5 0 0 1 0.2,0.4 v 2.3 a 0.2,0.2 0 0 1 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-6.6 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.5 z m 0,3.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 V 18 l -0.2,0.2 -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 V 15 a 0.4,0.4 0 0 1 0.1,-0.3 z m -4.7,-10 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2000004 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 V 4.9 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 4.7,16.6 0.8,0.6 0.2,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-13.1999996 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 V 11.3 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 V 8.1000004 Z m -1.1,28.9999996 0.8,0.5 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 1.1,-5.8 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,3.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 a 0.3,0.3 0 0 1 0.1,-0.2 z m 0,3.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.3 a 0.3,0.3 0 0 1 0.1,-0.2 z m 0,-9.9 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,-3.3 0.8,0.5 a 0.8,0.8 0 0 1 0.2,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m -1.1,9 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 V 37 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 V 34 c 0,-0.2 0.1,-0.3 0.2,-0.3 z m 0,-9.9 0.8,0.6 a 1,1 0 0 1 0.1,0.4 V 27 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.5,0.5 0 0 1 -0.2,-0.4 V 24 a 0.2,0.2 0 0 1 0.2,-0.2 z m -1.2,12.4 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 1.2,-25.6 0.8,0.5 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 0,-3.3999996 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 V 10.7 l -0.8,-0.6 c -0.1,0 -0.2,-0.1999996 -0.2,-0.3999996 v -2.2 c -0.1,-0.2 0,-0.3 0.1,-0.3 z m -1.2,22.3999996 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.3 0.1,-0.2 z m 1.2,-2.5 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 v 2.3 a 0.3,0.3 0 0 1 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.3 z m -1.2,-4.1 0.8,0.5 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m 1.2,0.8 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.3 a 0.3,0.3 0 0 1 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.3 z m 0,-13.2 0.8,0.5 v 2.7 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.8,0.8 0 0 1 -0.2,-0.4 v -2.3 c 0.1,-0.2 0.2,-0.3 0.3,-0.2 z m 0,3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.8,0.8 0 0 1 -0.2,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 0,3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.5,0.5 0 0 1 -0.2,-0.4 v -2.3 c 0,-0.1 0.1,-0.3 0.2,-0.2 z m -9.5,-13.4999996 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 V 10.3 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.5999996 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 4.7,26.5999996 0.8,0.6 a 0.5,0.5 0 0 1 0.2,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m -3.5,-9.1 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,-6.7 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,10 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 V 31 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 V 28 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,-13.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,-3.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 0,19.9 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m 1.2,-19 0.8,0.5 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.2 z m 0,-3.3999996 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 V 12 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 9.0000004 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,6.6999996 0.8,0.5 a 4.3,4.3 0 0 1 0.1,0.5 v 2.2 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,-7.4999996 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 V 11.1 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 V 8.1000004 c 0,-0.2 0,-0.3 0.1,-0.2 z m 1.2,-5.8000004 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 2.4 c 0,-0.2 0,-0.3 0.1,-0.3 z m 0,3.3 0.8,0.6 c 0,0.1 0.1,0.2000004 0.1,0.4000004 v 2.5 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 V 5.7 c -0.1,-0.2 -0.1,-0.3 0,-0.3 z m -2.4,11.6 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,-6.7 0.8,0.6 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,3.4 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 a 4.3,4.3 0 0 1 -0.1,-0.5 v -2.2 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,-13.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 V 0.4 Z m 0,3.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.3000004 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 V 4 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,16.6 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 1.2,-15.7 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2000004 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 a 0.6,0.6 0 0 1 -0.1,-0.4 V 4.8 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,25.6 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 0,0.2 -0.1,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 1.2,-28.9 0.8,0.5 a 0.6,0.6 0 0 1 0.1,0.4 v 2.3 c 0,0.2 0,0.3 -0.1,0.2 l -0.8,-0.5 a 0.7,0.7 0 0 1 -0.1,-0.5 V 1.5 c 0,-0.2 0,-0.3 0.1,-0.2 z m -1.2,22.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.5 z m 0,3.3 0.8,0.6 c 0.1,0 0.1,0.2 0.1,0.4 v 2.2 c 0,0.2 0,0.3 -0.1,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.5 z m 1.2,-5.8 0.8,0.6 c 0.1,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 0,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 3.5,-13.9999996 0.8,0.6 a 0.5,0.5 0 0 1 0.2,0.4 V 10.4 c 0,0.1 -0.1,0.3 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.3999996 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,6.6999996 0.8,0.5 a 0.8,0.8 0 0 1 0.2,0.4 V 17 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 V 14 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m -2.3,4.9 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.6,0.6 0 0 1 -0.1,-0.4 v -2.3 c 0,-0.2 0,-0.3 0.1,-0.2 z m 2.3,-8.3 0.8,0.6 0.2,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m -1.1,22.4 0.8,0.6 a 1,1 0 0 1 0.1,0.4 V 36 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.5,0.5 0 0 1 -0.2,-0.4 V 33 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 0,-3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.8,0.8 0 0 1 -0.2,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 1.1,-25.7 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.3000004 l -0.2,0.2 -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 V 4.1 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,13.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.3 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,13.2 0.8,0.6 a 0.5,0.5 0 0 1 0.2,0.4 v 2.3 l -0.2,0.2 -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-3.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 a 1,1 0 0 1 -0.1,-0.4 v -2.2 a 0.4,0.4 0 0 1 0.1,-0.3 z m 0,-6.6 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.1,-0.2 z m 0,3.3 0.8,0.6 c 0.1,0 0.2,0.2 0.2,0.4 v 2.2 c 0,0.2 -0.1,0.3 -0.2,0.3 l -0.8,-0.6 c 0,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 a 0.3,0.3 0 0 1 0.1,-0.2 z m -1.1,2.5 0.8,0.5 v 2.7 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.5 a 0.8,0.8 0 0 1 -0.2,-0.5 v -2.2 c 0.1,-0.2 0.2,-0.3 0.3,-0.2 z m -1.2,2.4 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.3 a 0.3,0.3 0 0 1 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 1.2,-5.8 0.8,0.6 c 0,0.1 0.1,0.3 0.1,0.4 v 2.3 c 0,0.2 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.3 z m -1.2,2.5 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.2 0.1,-0.2 z m 0,-3.3 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,-0.1 -0.1,-0.2 -0.1,-0.4 v -2.3 c 0,-0.1 0,-0.3 0.1,-0.2 z m 1.2,-19 0.8,0.5 a 4.3,4.3 0 0 1 0.1,0.5 v 2.2000004 c 0,0.2 -0.1,0.3 -0.1,0.2 L 3.802863,5.9 a 0.8,0.8 0 0 1 -0.2,-0.4 V 3.2 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m -1.2,28.9 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 v 2.3 a 0.3,0.3 0 0 1 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.1,-0.2 -0.1,-0.4 v -2.2 c 0,-0.2 0,-0.3 0.1,-0.3 z m 1.2,-15.7 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.5 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c -0.1,-0.2 0,-0.3 0.1,-0.3 z m 0,3.3 0.8,0.6 c 0,0.1 0.1,0.2 0.1,0.4 v 2.3 c 0,0.1 -0.1,0.3 -0.1,0.2 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.2 c 0,-0.2 0.1,-0.3 0.2,-0.3 z m 0,-6.6 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 c -0.1,0 -0.2,-0.2 -0.2,-0.4 v -2.3 z m 0,-6.5999996 0.8,0.6 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 -0.2,-0.4 v -2.3 c 0,-0.2 0.1,-0.3 0.2,-0.2 z m 0,3.3 0.8,0.5999996 a 1,1 0 0 1 0.1,0.4 v 2.2 a 0.4,0.4 0 0 1 -0.1,0.3 l -0.8,-0.6 a 0.5,0.5 0 0 1 -0.2,-0.4 V 9.8000004 a 0.2,0.2 0 0 1 0.2,-0.2 z", "fill", "#0054ff", "id", "path959"], ["d", "m 42.602863,8.3000004 h 3.4 c 0.1,-0.1 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.3 l -0.9,-0.6 h -0.4 v -0.5 L 42.802863,5.9 h -0.3 a 0.1,0.1 0 0 0 -0.1,-0.1 h 0.1 l -0.9,-0.6 h -0.3 l -0.9,-0.6 h -0.4 V 3.9 l -0.8,-0.5 h -0.5 c 0.1,0 0.2,0 0.1,-0.1 l -0.8,-0.6 h -0.3 c 0.1,0 0.2,-0.1 0.1,-0.1 l -0.8,-0.6 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.9,0.6 h 0.4 a 0.1,0.1 0 0 0 -0.1,0.1 l 0.9,0.6 h 0.4 c -0.1,0 -0.1,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 l 0.8,0.6000004 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.5 z", "fill", "#b5e3ff", "id", "path963"], ["d", "m 39.202863,8.3000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 v -0.4 L 39.402863,5.9 h -0.3 l -0.9,-0.6 h -0.3 l -0.9,-0.6 h -0.3 V 3.9 l -0.8,-0.5 h -0.4 l -0.8,-0.6 h -0.5 c 0.1,0 0.2,-0.1 0.1,-0.1 l -0.8,-0.6 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.9,0.6 h 0.4 a 0.1,0.1 0 0 0 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 l 0.8,0.6000004 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path965"], ["d", "m 35.802863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,-0.1 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.3 L 34.902863,5.6 h -0.3 l -0.9,-0.6 h -0.4 V 3.9 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.8,-0.6 h -0.5 c 0.1,0 0.2,-0.1 0.1,-0.1 l -0.8,-0.6 h -0.3 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.9,0.6 h 0.4 a 0.1,0.1 0 0 0 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 l 0.8,0.6 h 0.4 a 0.1000002,0.1000002 0 0 0 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path967"], ["d", "m 29.002863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,-0.1 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.4 C 29.002863,6.1 29.002863,6.1 28.902863,6 l -0.8,-0.6 h -0.3 l -0.9,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.6 h -0.4 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.8,-0.6 h -0.5 c 0.1,0 0.2,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.4 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0 -0.2,0 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 a 0.1000002,0.1000002 0 0 0 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path969"], ["d", "m 32.402863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,-0.1 0.1,-0.1 0,-0.2 L 32.702863,5.9 h -0.4 V 5.6 l -0.9,-0.6 h -0.3 l -0.9,-0.6 h -0.4 V 3.9 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h 0.1 V 3.1 l -0.8,-0.6 h -0.5 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.8,-0.6 h -0.5 c 0.1,0 0.2,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.6 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 l 0.8,0.6 h 0.4 a 0.1000002,0.1000002 0 0 0 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path971"], ["d", "m 22.202863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.4 C 22.202863,6.1 22.202863,6.1 22.102863,6 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.6 h -0.4 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.9,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.4 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.3 c 0.1,0 0.1,0 0.1,0.1 0,0.1 -0.1,0 0,0.1 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0.1 -0.1,0.1 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path973"], ["d", "m 18.802863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.4 C 18.802863,6.1 18.802863,6.1 18.702863,6 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.6 h -0.3 c 0,-0.1 0,-0.1 -0.1,-0.1 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.9,-0.6 h -0.3 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 h -0.4 c 0.1,-0.1 0.1,-0.1 0.1,-0.2 l -0.8,-0.5 h -3.7 c -0.1,0.1 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.5 h 0.3 c 0.1,0 0.1,0 0.1,0.1 0,0.1 -0.1,0 0,0.1 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0.1000004 -0.1,0.1000004 0,0.2000004 l 0.8,0.5 h 0.3 c 0.1,0 0.1,0 0.1,0.1 0,0.1 -0.1,0 0,0.1 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path975"], ["d", "m 15.402863,8.4000004 h 3.4 c 0.1,0 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.2 L 15.702863,5.9 h -0.4 c 0.1,-0.1 0.1,-0.1 0,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.2 l -0.8,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 -0.2,0 0,-0.1 -0.1,-0.1 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.9,-0.6 h -0.3 l -0.9,-0.6 h -0.4 c 0.1,-0.1 0.1,-0.1 0.1,-0.2 l -0.8,-0.5 h -3.6 c -0.1,0.1 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.5 h 0.3 a 0.1,0.1 0 0 1 0.1,0.1 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6000004 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.5 h 0.3 c 0.1,0 0.1,0 0.1,0.1 0,0.1 -0.1,0 0,0.1 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path977"], ["d", "m 25.602863,8.4000004 h 3.4 c 0.1,0 0.3,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,-0.1 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.4 C 25.602863,6.1 25.602863,6.1 25.502863,6 l -0.8,-0.6 h -0.3 l -0.9,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.6 h -0.3 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.9,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0.1,-0.2 l -0.8,-0.5 h -0.5 c 0.1,-0.1 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -3.7 c -0.1,0 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0 -0.2,0 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.1 l 0.8,0.6 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0.1000004 -0.1,0.1000004 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path979"], ["d", "m 12.002863,8.4000004 h 3.4 c 0.1,0 0.2,-0.1 0.1,-0.2 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.2 l -0.8,-0.5 h -0.4 C 12.002863,6.1 12.002863,6.1 11.902863,6 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 h -0.4 c 0.1,0 0.1,-0.1 0,-0.1 l -0.8,-0.6 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 h -0.1 V 3.1 l -0.9,-0.5 c 0,-0.1 -0.1,-0.1 -0.3,-0.1 -0.2,0 0,-0.1 -0.1,-0.1 a 0.1,0.1 0 0 0 0.1,-0.1 l -0.9,-0.6 h -0.3 l -0.9,-0.6 h -0.3 c 0.1,-0.1 0.1,-0.1 0.1,-0.2 l -0.9,-0.5 h -3.6 c -0.1,0.1 -0.3,0.1 -0.2,0.2 l 0.8,0.6 h 0.5 c -0.1,0 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.5 c -0.1,0.1 -0.2,0.1 -0.1,0.2 l 0.8,0.5 h 0.4 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0.1 -0.1,0.1 0,0.2 l 0.8,0.5 h 0.3 a 0.1,0.1 0 0 1 0.1,0.1 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0 -0.1,0.1 0,0.1 l 0.8,0.6 h 0.4 c 0,0.1000004 -0.1,0.1000004 0,0.2000004 l 0.8,0.5 h 0.4 c 0,0 -0.1,0 0,0.1 l 0.8,0.6 z", "fill", "#b5e3ff", "id", "path981"], ["d", "m 37.302863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 c -0.1,0 0,-0.1 0,-0.1 z m 2.4,1.7000004 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,-0.1 0,-0.1 z M 39.702863,5.8 h 2.3 l 0.6,0.2 0.8,0.5000004 h -3.1 L 39.502863,5.9 h 0.2 z m -8.4,-5.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 1.2,0.9 h 2.9 l 0.8,0.5 c 0.1,0.1 0,0.1 0,0.1 h -3.1 l -0.8,-0.6 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z m 1.2,0.8 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 h 0.2 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z", "fill", "#4fb7ff", "id", "path985"], ["d", "m 33.902863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 c -0.1,0 0,-0.1 0,-0.1 z m 3.6,2.5000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,-0.1 0,-0.1 z m -1.2,-0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z M 36.302863,5.9 h 2.3 l 0.6,0.2 0.8,0.5000004 h -3.1 L 36.102863,6 h 0.2 z m -3.6,-2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -3.6,-2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -1.2,-0.9 h 2.9 l 0.8,0.6 c 0.1,0 0,0 0,0.1 h -3.1 l -0.8,-0.6 h 0.2 z m 3.6,2.5 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 h 0.2 z m -1.2,-0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z", "fill", "#4fb7ff", "id", "path987"], ["d", "m 30.502863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 c -0.1,0 0,0 0,-0.1 z m 1.2,0.9 h 2.9 l 0.8,0.5000004 h -3.1 L 32.702863,5.9 Z m -8.4,-5.9 h 2.9 l 0.8,0.6 c 0.1,0 0,0 0,0.1 h -3.1 l -0.8,-0.6 h 0.2 z m 9.6,6.7000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,-0.1 0,-0.1 z m -6,-4.1000004 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -3.6,-2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z", "fill", "#4fb7ff", "id", "path989"], ["d", "m 23.702863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 4.8,3.3000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,0 0,-0.1 z M 24.902863,5 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 0,0 0,-0.1 z m 2.4,1.7000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z M 26.102863,5.9 h 2.9 l 0.8,0.5000004 h -3.1 L 25.902863,5.8 h 0.2 z m -8.4,-5.9 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 z m 3.6,2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -2.4,-1.7 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z", "fill", "#4fb7ff", "id", "path991"], ["d", "m 28.302863,5 h 2.9 l 0.8,0.6 v 0 c 0,0.1 -0.1,0.1 -0.2,0.1 h -2.9 l -0.8,-0.6 c -0.1,0 0,0 0,-0.1 z m 1.2,0.9 h 2.9 l 0.8,0.5000004 h -3.1 L 29.302863,5.8 h 0.2 z m -2.4,-1.7 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 3.6,2.5000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,0 0,-0.1 z M 21.102863,0 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m 2.4,1.6 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 0,0 0,-0.1 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -2.4,-1.7 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z", "fill", "#4fb7ff", "id", "path993"], ["d", "m 18.102863,5 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m 1.2,0.9 h 2.9 l 0.8,0.5000004 h -3.1 L 19.102863,5.8 h 0.2 z m 2.4,1.6000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,0 0,-0.1 z m -1.2,-0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z M 16.902863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,0 -0.1,-0.1 0,-0.1 z m -6,-4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 h 0.2 z m 2.4,1.7 h 2.9 l 0.8,0.6 h -2.5 a 0.8,0.8 0 0 1 -0.6,-0.2 l -0.8,-0.5 c -0.1,0 0,-0.1 0,-0.1 z m 2.4,1.7 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -3.6,-2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 z m 2.4,1.6 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z", "fill", "#4fb7ff", "id", "path995"], ["d", "m 14.702863,5 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m 1.2,0.9 h 2.9 l 0.8,0.5000004 h -3.1 L 15.702863,5.9 Z m -2.4,-1.7 h 2.9 l 0.8,0.6 h -2.5 a 0.8,0.8 0 0 1 -0.6,-0.2 l -0.8,-0.5 c -0.1,0 -0.1,-0.1 0,-0.1 z m 3.6,2.5000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m -6,-4.1000004 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m -4.8,-3.4 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z", "fill", "#4fb7ff", "id", "path997"], ["d", "m 11.302863,5 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m 1.2,0.9 h 2.9 l 0.8,0.5000004 h -3.1 L 12.302863,5.8 h 0.2 z m 1.2,0.8000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,0 -0.1,-0.1 0,-0.1 z M 10.102863,4.2 h 2.9 l 0.8,0.6 h -2.5 l -0.6,-0.2 -0.8,-0.5 c -0.1,0 -0.1,-0.1 0,-0.1 z m 4.8,3.3000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z M 4.102863,0 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 4.8,3.4 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z m -3.6,-2.5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z", "fill", "#4fb7ff", "id", "path999"], ["d", "m 22.702863,5.9 h 2.9 l 0.8,0.5000004 h -3.1 L 22.502863,5.8 h 0.2 z m -1.2,-0.9 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m -1.2,-0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m 4.8,3.3000004 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,0 0,-0.1 z m -1.2,-0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z M 14.302863,0 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 2.4,1.7 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.5 c -0.1,0 0,-0.1 0,-0.1 z m -1.2,-0.8 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m 2.4,1.6 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0.1,0 0.2,0 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z", "fill", "#4fb7ff", "id", "path1001"], ["d", "m 7.902863,5 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 3.6,2.5000004 h 2.8 l 0.9,0.6 h -3.1 l -0.8,-0.6 v 0 c 0,0 0,0 0.2,0 z M 6.702863,4.2 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 -0.1,-0.1 0,-0.1 z m 3.6,2.5000004 h 2.9 l 0.8,0.6 h -2.6 l -0.5,-0.2 -0.8,-0.5 c -0.1,0 -0.1,-0.1 0,-0.1 z M 9.102863,5.9 h 2.9 l 0.8,0.5000004 h -3.1 L 8.902863,5.8 h 0.2 z m -7.2,-5 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 0,-0.1 0,-0.1 z m -1.2,-0.9 h 2.3 l 0.6,0.2 0.8,0.5 h -3.1 l -0.8,-0.6 h 0.2 z m 2.4,1.7 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 c -0.1,0 0,-0.1 0,-0.1 z m 1.2,0.8 h 2.9 l 0.8,0.6 h -3.1 l -0.8,-0.6 z m 1.2,0.9 h 2.9 l 0.8,0.5 h -3.1 l -0.8,-0.5 c -0.1,-0.1 -0.1,-0.1 0,-0.1 z", "fill", "#4fb7ff", "id", "path1003"], ["id", "drawnElements"]], template: function KhDecomposeNumberComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "rect", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "rect", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "text", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tspan", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "g", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "rect", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "rect", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "g", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "text", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "tspan", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "text", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tspan", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "g", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "g", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "rect", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "g", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "g", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "rect", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "g", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "g", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "rect", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "g", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "path", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "path", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "path", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "g", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "rect", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "g", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "path", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "path", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "rect", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "g", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "path", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "path", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "path", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "path", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "g", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "path", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "path", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "path", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "path", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "g", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "path", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "path", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "path", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "path", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "g", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "path", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "path", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "path", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "path", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "path", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "path", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "path", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "path", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "path", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "path", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "path", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "path", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](78, "path", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "path", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "path", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](81, "path", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "path", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "path", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "path", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "path", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "path", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](87, "path", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "path", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "path", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "path", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "path", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](92, "g", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".number {\r\n    alignment-baseline: text-before-edge;\r\n    text-anchor: start;\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n            user-select: none;\r\n}\r\n\r\n#numberDisplay, #num, #buttons, #slider, #goButton, #restart {\r\n    cursor: pointer;\r\n    pointer-events: bounding-box;\r\n}\r\n\r\n#num, #minText, #maxText {\r\n    -webkit-user-select:none;\r\n       -moz-user-select:none;\r\n            user-select:none\r\n}\r\n\r\nsvg {\r\n    height: auto;\r\n    width:  auto;\r\n    max-width: 700px;\r\n    min-width: 300px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva2gtZGVjb21wb3NlLW51bWJlci9raC1kZWNvbXBvc2UtbnVtYmVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQ0FBb0M7SUFDcEMsa0JBQWtCO0lBQ2xCLHlCQUFpQjtPQUFqQixzQkFBaUI7WUFBakIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLHdCQUFlO09BQWYscUJBQWU7WUFBZjtBQUNKOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAva2gtZGVjb21wb3NlLW51bWJlci9raC1kZWNvbXBvc2UtbnVtYmVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubnVtYmVyIHtcclxuICAgIGFsaWdubWVudC1iYXNlbGluZTogdGV4dC1iZWZvcmUtZWRnZTtcclxuICAgIHRleHQtYW5jaG9yOiBzdGFydDtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcblxyXG4jbnVtYmVyRGlzcGxheSwgI251bSwgI2J1dHRvbnMsICNzbGlkZXIsICNnb0J1dHRvbiwgI3Jlc3RhcnQge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IGJvdW5kaW5nLWJveDtcclxufVxyXG5cclxuI251bSwgI21pblRleHQsICNtYXhUZXh0IHtcclxuICAgIHVzZXItc2VsZWN0Om5vbmVcclxufVxyXG5cclxuc3ZnIHtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIHdpZHRoOiAgYXV0bztcclxuICAgIG1heC13aWR0aDogNzAwcHg7XHJcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xyXG59XHJcbiJdfQ== */"], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](KhDecomposeNumberComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-kh-decompose-number',
                templateUrl: './kh-decompose-number.component.html',
                styleUrls: ['./kh-decompose-number.component.css'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None //https://stackoverflow.com/questions/46403698/css-values-not-applying-on-dynamically-injected-html-div-elements-in-angular-4
            }]
    }], null, { renderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderEl']
        }], startingNumber: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/kh-farm/kh-farm.component.ts":
/*!**********************************************!*\
  !*** ./src/app/kh-farm/kh-farm.component.ts ***!
  \**********************************************/
/*! exports provided: KhFarmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KhFarmComponent", function() { return KhFarmComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _khFarmApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./khFarmApi */ "./src/app/kh-farm/khFarmApi.ts");



const _c0 = ["renderEl"];
class KhFarmComponent {
    constructor() {
        this.width = 500;
        this.height = 500;
        this.plotWidth = 250;
        this.plotHeight = 250;
        this.plotColor = "#fff2cc";
        this.lineColor = "#898989";
    }
    ngAfterViewInit() {
        const setup = {
            width: this.width,
            height: this.height,
            plotWidth: this.plotWidth,
            plotHeight: this.plotHeight,
            plotColor: this.plotColor,
            lineColor: this.lineColor
        };
        const els = this.renderEl.nativeElement;
        const interactive = Object(_khFarmApi__WEBPACK_IMPORTED_MODULE_1__["farmAPI"])(els, setup);
    }
}
KhFarmComponent.ɵfac = function KhFarmComponent_Factory(t) { return new (t || KhFarmComponent)(); };
KhFarmComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: KhFarmComponent, selectors: [["app-kh-farm"]], viewQuery: function KhFarmComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.renderEl = _t.first);
    } }, inputs: { width: "width", height: "height", plotWidth: "plotWidth", plotHeight: "plotHeight", plotColor: "plotColor", lineColor: "lineColor" }, decls: 39, vars: 0, consts: [["viewBox", "0 0 500 500"], ["renderEl", ""], ["id", "farmGroup"], ["id", "plot"], ["id", "fill"], ["id", "border"], ["id", "tens"], ["id", "hundreds"], ["id", "thousands"], ["id", "ui"], ["id", "red", "width", "27.406019", "height", "27.406019", "x", "74.909752", "y", "1.0057381", 1, "color", 2, "fill", "#ff0000", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.0885", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "purple", "width", "27.406019", "height", "27.406019", "x", "102.31577", "y", "1.0057374", 1, "color", 2, "fill", "#800080", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.0885", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "blue", "width", "27.406019", "height", "27.406019", "x", "129.72179", "y", "1.0057381", 1, "color", 2, "fill", "#0000ff", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.0885", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "zoom", 1, "pointer"], ["id", "rect2000", "width", "47.63755", "height", "27.406019", "x", "204.76535", "y", "1.0057374", 2, "fill", "#93c47d", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.08768", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-opacity", "1"], ["aria-label", "zoom", "id", "text4064", "transform", "matrix(2.7406019,0,0,2.7406019,122.54729,1.0057378)", 2, "font-weight", "600", "font-size", "4.7625px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "stroke-width", "0.264583"], ["d", "m 32.871303,5.9501188 h 1.281112 V 6.3073063 H 32.376003 V 5.9501188 l 1.266825,-1.9002374 h -1.2573 v -0.352425 h 1.757362 v 0.352425 z", "id", "path8968", 2, "font-weight", "normal", "-inkscape-font-specification", "poppins"], ["d", "m 35.852627,6.3501688 q -0.366712,0 -0.66675,-0.1666875 -0.295275,-0.1666875 -0.466725,-0.4714875 -0.166687,-0.3095625 -0.166687,-0.714375 0,-0.4000499 0.17145,-0.7048499 0.176212,-0.3095625 0.47625,-0.4714875 0.300037,-0.1666875 0.671512,-0.1666875 0.371475,0 0.671513,0.1666875 0.300037,0.161925 0.471487,0.466725 0.176213,0.3048 0.176213,0.7096124 0,0.4048125 -0.180975,0.714375 -0.176213,0.3048 -0.481013,0.4714875 -0.3048,0.1666875 -0.676275,0.1666875 z m 0,-0.381 q 0.233363,0 0.43815,-0.1095375 0.204788,-0.1095375 0.328613,-0.3286125 0.128587,-0.219075 0.128587,-0.5334 0,-0.3143249 -0.123825,-0.5333999 -0.123825,-0.219075 -0.32385,-0.32385 -0.200025,-0.1095375 -0.433387,-0.1095375 -0.238125,0 -0.43815,0.1095375 -0.195263,0.104775 -0.314325,0.32385 -0.119063,0.219075 -0.119063,0.5333999 0,0.3190875 0.1143,0.5381625 0.119063,0.219075 0.314325,0.3286125 0.195263,0.104775 0.428625,0.104775 z", "id", "path8970", 2, "font-weight", "normal", "-inkscape-font-specification", "poppins"], ["d", "m 38.900625,6.3501688 q -0.366713,0 -0.66675,-0.1666875 Q 37.9386,6.0167938 37.76715,5.7119938 37.600462,5.4024313 37.600462,4.9976188 q 0,-0.4000499 0.17145,-0.7048499 0.176213,-0.3095625 0.47625,-0.4714875 0.300038,-0.1666875 0.671513,-0.1666875 0.371475,0 0.671512,0.1666875 0.300038,0.161925 0.471488,0.466725 0.176212,0.3048 0.176212,0.7096124 0,0.4048125 -0.180975,0.714375 -0.176212,0.3048 -0.481012,0.4714875 -0.3048,0.1666875 -0.676275,0.1666875 z m 0,-0.381 q 0.233362,0 0.43815,-0.1095375 0.204787,-0.1095375 0.328612,-0.3286125 0.128588,-0.219075 0.128588,-0.5334 0,-0.3143249 -0.123825,-0.5333999 -0.123825,-0.219075 -0.32385,-0.32385 -0.200025,-0.1095375 -0.433388,-0.1095375 -0.238125,0 -0.43815,0.1095375 -0.195262,0.104775 -0.314325,0.32385 -0.119062,0.219075 -0.119062,0.5333999 0,0.3190875 0.1143,0.5381625 0.119062,0.219075 0.314325,0.3286125 0.195262,0.104775 0.428625,0.104775 z", "id", "path8972", 2, "font-weight", "normal", "-inkscape-font-specification", "poppins"], ["d", "m 43.948871,3.6498314 q 0.3048,0 0.542925,0.1285875 0.238125,0.123825 0.376238,0.3762375 0.138112,0.2524125 0.138112,0.6143625 v 1.5382874 h -0.428625 v -1.476375 q 0,-0.3905249 -0.195262,-0.5953124 -0.1905,-0.20955 -0.519113,-0.20955 -0.338137,0 -0.538162,0.219075 -0.200025,0.2143125 -0.200025,0.6238874 v 1.438275 h -0.428625 v -1.476375 q 0,-0.3905249 -0.195263,-0.5953124 -0.1905,-0.20955 -0.519112,-0.20955 -0.338138,0 -0.538163,0.219075 -0.200025,0.2143125 -0.200025,0.6238874 v 1.438275 H 40.810384 V 3.6974564 h 0.433387 v 0.3762375 q 0.128588,-0.2047875 0.3429,-0.314325 0.219075,-0.1095375 0.481013,-0.1095375 0.328612,0 0.581025,0.1476375 0.252412,0.1476375 0.376237,0.4333875 0.109538,-0.276225 0.36195,-0.428625 0.252413,-0.1524 0.561975,-0.1524 z", "id", "path8974", 2, "font-weight", "normal", "-inkscape-font-specification", "poppins"], ["id", "plant", 1, "pointer"], ["id", "rect2000-7-0", "width", "47.63755", "height", "27.406019", "x", "157.12781", "y", "1.0057369", 2, "fill", "#93c47d", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.08768", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-opacity", "1"], ["aria-label", "plant", "id", "text10768", "transform", "translate(-20.909607,0.4618969)", 2, "font-size", "13px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins"], ["d", "m 186.84118,11.55585 q 0.351,-0.611 1.04,-1.014 0.702,-0.416 1.625,-0.416 0.949,0 1.716,0.455 0.78,0.455 1.222,1.287 0.442,0.819 0.442,1.911 0,1.079 -0.442,1.924 -0.442,0.845 -1.222,1.313 -0.767,0.468 -1.716,0.468 -0.91,0 -1.612,-0.403 -0.689,-0.416 -1.053,-1.027 v 4.693 h -1.183 v -10.504 h 1.183 z m 4.836,2.223 q 0,-0.806 -0.325,-1.404 -0.325,-0.598 -0.884,-0.91 -0.546,-0.312 -1.209,-0.312 -0.65,0 -1.209,0.325 -0.546,0.312 -0.884,0.923 -0.325,0.598 -0.325,1.391 0,0.806 0.325,1.417 0.338,0.598 0.884,0.923 0.559,0.312 1.209,0.312 0.663,0 1.209,-0.312 0.559,-0.325 0.884,-0.923 0.325,-0.611 0.325,-1.43 z", "id", "path18103"], ["d", "M 195.62919,7.7468499 V 17.36685 h -1.183 V 7.7468499 Z", "id", "path18105"], ["d", "m 197.20219,13.77885 q 0,-1.092 0.442,-1.911 0.442,-0.832 1.209,-1.287 0.78,-0.455 1.729,-0.455 0.936,0 1.625,0.403 0.689,0.403 1.027,1.014 v -1.3 h 1.196 v 7.124 h -1.196 v -1.326 q -0.351,0.624 -1.053,1.04 -0.689,0.403 -1.612,0.403 -0.949,0 -1.716,-0.468 -0.767,-0.468 -1.209,-1.313 -0.442,-0.845 -0.442,-1.924 z m 6.032,0.013 q 0,-0.806 -0.325,-1.404 -0.325,-0.598 -0.884,-0.91 -0.546,-0.325 -1.209,-0.325 -0.663,0 -1.209,0.312 -0.546,0.312 -0.871,0.91 -0.325,0.598 -0.325,1.404 0,0.819 0.325,1.43 0.325,0.598 0.871,0.923 0.546,0.312 1.209,0.312 0.663,0 1.209,-0.312 0.559,-0.325 0.884,-0.923 0.325,-0.611 0.325,-1.417 z", "id", "path18107"], ["d", "m 209.9032,10.11285 q 1.3,0 2.106,0.793 0.806,0.78 0.806,2.262 v 4.199 h -1.17 v -4.03 q 0,-1.066 -0.533,-1.625 -0.533,-0.572 -1.456,-0.572 -0.936,0 -1.495,0.585 -0.546,0.585 -0.546,1.703 v 3.939 h -1.183 v -7.124 h 1.183 v 1.014 q 0.351,-0.546 0.949,-0.845 0.611,-0.299 1.339,-0.299 z", "id", "path18109"], ["d", "m 216.19519,11.21785 v 4.199 q 0,0.52 0.221,0.741 0.221,0.208 0.767,0.208 h 0.871 v 1.001 h -1.066 q -0.988,0 -1.482,-0.455 -0.494,-0.455 -0.494,-1.495 v -4.199 h -0.923 v -0.975 h 0.923 V 8.4488499 h 1.183 V 10.24285 h 1.859 v 0.975 z", "id", "path18111"], ["id", "selectedColor", "width", "43.621784", "height", "43.621784", "x", "0.54425001", "y", "0.54425001", 2, "fill", "#ff0000", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.0885", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "grid"], ["id", "rect871", "width", "27.406021", "height", "27.406019", "x", "252.40291", "y", "1.0057361", 2, "fill", "#93c47d", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "1.0885", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none"], ["id", "g6042", "transform", "translate(230.25246,-66.299168)", 2, "fill", "none", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "0.944882", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "rect5696", "width", "9.4488192", "height", "9.4488192", "x", "25.404364", "y", "70.670319", "rx", "1.8897638", "ry", "1.8897638", 2, "fill", "none", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "0.944882", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "rect5696-9", "width", "9.4488192", "height", "9.4488192", "x", "36.853718", "y", "70.670319", "rx", "1.8897638", "ry", "1.8897638", 2, "fill", "none", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "0.944882", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "rect5696-8", "width", "9.4488192", "height", "9.4488192", "x", "25.404364", "y", "81.89669", "rx", "1.8897638", "ry", "1.8897638", 2, "fill", "none", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "0.944882", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "rect5696-6", "width", "9.4488192", "height", "9.4488192", "x", "36.853718", "y", "81.89669", "rx", "1.8897638", "ry", "1.8897638", 2, "fill", "none", "fill-opacity", "1", "stroke", "#000000", "stroke-width", "0.944882", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"]], template: function KhFarmComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "g", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "g", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "g", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "g", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "g", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "rect", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "rect", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "rect", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "g", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "rect", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "g", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "g", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "rect", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "g", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "rect", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "g", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "rect", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "g", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "rect", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "rect", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "rect", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "rect", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["#farmGroup[_ngcontent-%COMP%] {\r\n    cursor: pointer\r\n}\r\n\r\n.color[_ngcontent-%COMP%], .pointer[_ngcontent-%COMP%], #grid[_ngcontent-%COMP%] {\r\n    cursor:pointer;\r\n    pointer-events: bounding-box;\r\n}\r\n\r\nsvg[_ngcontent-%COMP%] {\r\n    height: auto;\r\n    width: auto;\r\n    max-width: 500px;\r\n    min-width: 300px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva2gtZmFybS9raC1mYXJtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksY0FBYztJQUNkLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2toLWZhcm0va2gtZmFybS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2Zhcm1Hcm91cCB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXJcclxufVxyXG5cclxuLmNvbG9yLCAucG9pbnRlciwgI2dyaWQge1xyXG4gICAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgICBwb2ludGVyLWV2ZW50czogYm91bmRpbmctYm94O1xyXG59XHJcblxyXG5zdmcge1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](KhFarmComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-kh-farm',
                templateUrl: './kh-farm.component.html',
                styleUrls: ['./kh-farm.component.css']
            }]
    }], function () { return []; }, { renderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderEl']
        }], width: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], height: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], plotWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], plotHeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], plotColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], lineColor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/kh-farm/khFarmApi.ts":
/*!**************************************!*\
  !*** ./src/app/kh-farm/khFarmApi.ts ***!
  \**************************************/
/*! exports provided: farmAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "farmAPI", function() { return farmAPI; });
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

function farmAPI(_els, _setup) {
    let self = {};
    class farmClass {
        constructor(els, setup) {
            this.outerLineStrokeWidth = 2;
            this.innerLineStrokeWidth = 1;
            this.isViewingThousands = true;
            this.isViewingHundreds = true;
            this.mousePosition = { x: 0, y: 0 };
            this.flowerColor = "rgb(255, 0, 0)";
            this.isZoomedIn = false;
            this.plotArray = Array.from(Array(20), () => new Array(50));
            self = this;
            this.els = els;
            this.setup = setup;
            this.svgns = "http://www.w3.org/2000/svg";
            this.border = this.els.getElementById("border");
            this.tens = this.els.getElementById("tens");
            this.hundreds = this.els.getElementById("hundreds");
            this.thousands = this.els.getElementById("thousands");
            this.farmGroup = this.els.getElementById("farmGroup");
            this.zoom = this.els.getElementById("zoom");
            this.plant = this.els.getElementById("plant");
            this.ui = this.els.getElementById("ui");
            this.pointerState = this.plant;
            this.previousState = this.plant;
            this.colorDictionary = { "rgb(255, 0, 0)": "red", "rgb(128, 0, 128)": "purple", "rgb(0, 0, 255)": "blue" };
            this.colorCounter = { "red": 0, "purple": 0, "blue": 0 };
            this.init();
        }
        generateLines() {
            //draw outer lines
            for (let i = 0; i < 11; i++) {
                let x = i * this.plotIncrementWidth;
                let y = i * this.plotIncrementHeight;
                let verticalLine = document.createElementNS(this.svgns, "line");
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(verticalLine, { attr: { x1: x, y1: this.plotBBox.y - this.outerLineStrokeWidth / 2, x2: x, y2: this.plotBBox.height + this.outerLineStrokeWidth / 2, stroke: this.setup.lineColor }, strokeWidth: this.outerLineStrokeWidth });
                let horizontalLine = document.createElementNS(this.svgns, "line");
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(horizontalLine, { attr: { x1: this.plotBBox.x, y1: y, x2: this.plotBBox.width, y2: y, stroke: this.setup.lineColor }, strokeWidth: this.outerLineStrokeWidth });
                //append lines to border group if applicable
                if (i == 10 || i == 0) {
                    this.border.appendChild(verticalLine);
                    this.border.appendChild(horizontalLine);
                }
                else {
                    this.tens.appendChild(horizontalLine);
                    this.hundreds.appendChild(verticalLine);
                }
                //we skip drawing inner lines for the last iteration
                if (i < 10) {
                    //draw inner lines
                    for (let j = 1; j < 5; j++) {
                        let innerGridIncrementX = (this.plotIncrementWidth - this.outerLineStrokeWidth) / 5;
                        let innerVerticalLine = document.createElementNS(this.svgns, "line");
                        gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(innerVerticalLine, { attr: { x1: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2, y1: this.plotBBox.y, x2: x + innerGridIncrementX * j + this.outerLineStrokeWidth / 2, y2: this.plotBBox.height, stroke: this.setup.lineColor }, strokeWidth: this.innerLineStrokeWidth });
                        this.thousands.appendChild(innerVerticalLine);
                    }
                    let innerGridIncrementY = this.plotIncrementHeight / 2;
                    let innerHorizontalLine = document.createElementNS(this.svgns, "line");
                    gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(innerHorizontalLine, { attr: { x1: this.plotBBox.x, y1: y + innerGridIncrementY, x2: this.plotBBox.width, y2: y + innerGridIncrementY, stroke: this.setup.lineColor }, strokeWidth: this.innerLineStrokeWidth });
                    this.thousands.appendChild(innerHorizontalLine);
                }
            }
        }
        hitTest(e) {
            if (this.pointerState == this.zoom) {
                this.handleZoom();
            }
            else {
                this.plantOrRemoveFlower(e);
            }
        }
        plantOrRemoveFlower(e) {
            var xVal;
            var yVal;
            var rectWidth;
            var rectHeight;
            var rectID;
            var i;
            var j;
            var existingElementsToBeDeleted = [];
            //Calculate original point
            var pt = this.els.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse());
            //console.log(pt)
            //checks bounds so that rects cannot be placed outside of plot
            if (pt.x < 0) {
                pt.x = 0;
            }
            else if (pt.x > this.setup.plotHeight) {
                pt.x = this.setup.plotHeight - 1;
            }
            if (pt.y < 0) {
                pt.y = 0;
            }
            else if (pt.y > this.setup.plotWidth) {
                pt.y = this.setup.plotWidth - 1;
            }
            let rect = document.createElementNS(this.svgns, "rect");
            let innerGridIncrementX = this.plotIncrementWidth / 5;
            let innerGridIncrementY = this.plotIncrementHeight / 2;
            let yGridQuadrant = Math.floor(pt.y / innerGridIncrementY);
            let xGridQuadrant = Math.floor(pt.x / innerGridIncrementX);
            i = Math.floor(pt.y / innerGridIncrementY);
            j = Math.floor(pt.x / innerGridIncrementX);
            rectID = `thousands${i}-${j}`;
            if (this.plotArray[i][j]) {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.plotArray[i][j][1], { height: 0, duration: 1, onComplete: this.removeElement, onCompleteParams: [this.plotArray, this.plotArray[i][j][1]] });
            }
            else {
                if (this.isViewingThousands) {
                    rectWidth = this.plotIncrementWidth / 5 + 0.1;
                    rectHeight = (this.plotIncrementHeight / 2);
                    xVal = xGridQuadrant * innerGridIncrementX + (0.4 - ((xGridQuadrant % 5) * 0.2));
                    yVal = yGridQuadrant * innerGridIncrementY;
                    if ((xGridQuadrant % 5) == 0) {
                        rectWidth += 0.5;
                        xVal -= 0.4;
                    }
                    if ((xGridQuadrant % 5) == 4) {
                        rectWidth += 0.5;
                    }
                    this.plotArray[i][j] = [this.flowerColor, rect];
                    this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]++;
                }
                else if (this.isViewingHundreds) { //working with hundreds
                    let xGridQuadrant = Math.floor(pt.x / this.plotIncrementWidth);
                    let yGridQuadrant = Math.floor(pt.y / this.plotIncrementHeight);
                    rectWidth = this.plotIncrementWidth + 0.1;
                    rectHeight = this.plotIncrementHeight + 0.5;
                    xVal = xGridQuadrant * this.plotIncrementWidth;
                    yVal = yGridQuadrant * this.plotIncrementHeight;
                    i = Math.floor(pt.y / this.plotIncrementWidth);
                    j = Math.floor(pt.x / this.plotIncrementHeight);
                    rectID = `hundreds${i}-${j}`;
                    for (let index = i * 2; index < (i * 2) + 2; index++) {
                        for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--;
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1]);
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect];
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++;
                        }
                    }
                }
                else { //working with tens
                    let GridQuadrant = Math.floor(pt.y / this.plotIncrementWidth);
                    rectWidth = this.setup.plotHeight - (this.outerLineStrokeWidth);
                    rectHeight = (this.plotIncrementWidth - this.outerLineStrokeWidth);
                    yVal = GridQuadrant * this.plotIncrementWidth + this.outerLineStrokeWidth / 2;
                    xVal = this.outerLineStrokeWidth / 2;
                    i = GridQuadrant;
                    j = 0;
                    rectID = `tens${i}-${j}`;
                    for (let index = i * 2; index < (i * 2) + 2; index++) {
                        for (let jIndex = 0; jIndex < 50; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--;
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1]);
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect];
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++;
                        }
                    }
                }
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: rectWidth, height: 0, fill: this.flowerColor });
                this.els.getElementById("fill").appendChild(rect);
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(rect, { height: rectHeight, duration: 1, onComplete: function () { existingElementsToBeDeleted.forEach(e => { e.remove(); }); } });
            }
            console.log("i = " + i, "j = " + j);
            console.log("filled: ", this.colorCounter);
            console.log(this.plotArray);
        }
        removeElement(arr, element) {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[0].length; j++) {
                    if (arr[i][j] != null && arr[i][j][1] == element) {
                        self.colorCounter[self.colorDictionary[arr[i][j][0]]]--;
                        arr[i][j] = null;
                    }
                }
            }
            element.remove();
        }
        /*
        plantOrRemoveFlower(e) {
            var xVal;
            var yVal;
            var rectWidth;
            var rectHeight;
            var rectID;
            var i;
            var j;
            var existingElementsToBeDeleted = []


            //https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
            //https://stackoverflow.com/questions/35373882/get-the-global-transform-matrix-of-an-svg-element

            //Calculate original point
            var pt = this.els.createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            pt = pt.matrixTransform(this.farmGroup.getScreenCTM().inverse())
            //console.log(pt)

            //checks bounds so that rects cannot be placed outside of plot
            if (pt.x < 0) {
                pt.x = 0
            }
            else if (pt.x > this.setup.plotHeight) {
                pt.x = this.setup.plotHeight - 1
            }
            if (pt.y < 0) {
                pt.y = 0
            }
            else if (pt.y > this.setup.plotWidth) {
                pt.y = this.setup.plotWidth - 1
            }

            //calculating variables for rect
            let rect = document.createElementNS(this.svgns, "rect")
            if (this.isViewingThousands) {//working with thousands

                let innerGridIncrementX = this.plotIncrementWidth / 5;
                let innerGridIncrementY = this.plotIncrementHeight / 2

                let yGridQuadrant = Math.floor(pt.y / innerGridIncrementY)
                let xGridQuadrant = Math.floor(pt.x / innerGridIncrementX)

                i = Math.floor(pt.y / innerGridIncrementY);
                j = Math.floor(pt.x / innerGridIncrementX)

                rectID = `thousands${i}-${j}`

                if (this.pointerState == this.plant) {
                    rectWidth = ((this.plotIncrementWidth - this.outerLineStrokeWidth) / 5) + 0.2
                    rectHeight = (this.plotIncrementHeight / 2)

                    xVal = xGridQuadrant * innerGridIncrementX + (this.outerLineStrokeWidth / 2 - ((xGridQuadrant % 5) * this.innerLineStrokeWidth / 2))
                    //xVal = xGridQuadrant * innerGridIncrementX + this.innerLineStrokeWidth

                    //y value changes depending on 1st or 2nd quad
                    if (yGridQuadrant % 2 == 0) {
                        yVal = yGridQuadrant * innerGridIncrementY
                    }
                    else {
                        //if odd then we only have to offset the y by the inner stroke width instead of the outer.
                        yVal = yGridQuadrant * innerGridIncrementY
                    }

                    //update colorCounter and update plotArray
                    if (this.plotArray[i][j]) {
                        this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]--
                    }
                    this.plotArray[i][j] = [this.flowerColor, rect]
                    this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]++
                    
                }
                else {//remove a flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        if (this.plotArray[i][j] != null) {
                            this.colorCounter[this.colorDictionary[this.plotArray[i][j][0]]]--
                        }
                        this.plotArray[i][j] = null

                    }
                }
            }
            else if (this.isViewingHundreds) {//working with hundreds

                let xGridQuadrant = Math.floor(pt.x / this.plotIncrementWidth)
                let yGridQuadrant = Math.floor(pt.y / this.plotIncrementHeight)

                rectWidth = this.plotIncrementWidth
                rectHeight = this.plotIncrementHeight + 0.5

                xVal = xGridQuadrant * this.plotIncrementWidth
                yVal = yGridQuadrant * this.plotIncrementHeight

                i = Math.floor(pt.y / this.plotIncrementWidth)
                j = Math.floor(pt.x / this.plotIncrementHeight)

                rectID = `hundreds${i}-${j}`

                if (this.pointerState == this.plant) {
                    for (let index = i * 2; index < (i * 2) + 2; index++) {
                        for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }
                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }
                else {//remove a flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        for (let index = i * 2; index < (i * 2) + 2; index++) {
                            for (let jIndex = j * 5; jIndex < (j * 5) + 5; jIndex++) {
                                if (this.plotArray[index][jIndex] != null) {
                                    this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                }
                                this.plotArray[index][jIndex] = null
                            }
                        }

                    }
                }
            }
            else {//working with tens
                let GridQuadrant = Math.floor(pt.x / this.plotIncrementWidth)

                rectWidth = (this.plotIncrementWidth - this.outerLineStrokeWidth);
                rectHeight = this.setup.plotHeight - (this.outerLineStrokeWidth)

                xVal = GridQuadrant * this.plotIncrementWidth + this.outerLineStrokeWidth / 2
                yVal = this.outerLineStrokeWidth / 2

                i = Math.floor(pt.x / this.plotIncrementWidth)
                j = 0

                rectID = `tens${i}-${j}`

                if (this.pointerState == this.plant) {//plant a flower
                    for (let index = 0; index < 20; index++) {
                        for (let jIndex = i * 5; jIndex < (i * 5) + 5; jIndex++) {
                            if (this.plotArray[index][jIndex]) {
                                this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                existingElementsToBeDeleted.push(this.plotArray[index][jIndex][1])
                            }

                            this.plotArray[index][jIndex] = [this.flowerColor, rect]
                            this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]++
                        }
                    }
                }
                else {//remove flower if it exists
                    var element = this.els.getElementById(rectID)
                    if (element) {
                        gsap.to(element, { height: 0, duration: 1, onComplete: function () { element.remove() } })
                        for (let index = 0; index < 20; index++) {
                            for (let jIndex = i * 5; jIndex < (i * 5) + 5; jIndex++) {
                                if (this.plotArray[index][jIndex] != null) {
                                    this.colorCounter[this.colorDictionary[this.plotArray[index][jIndex][0]]]--
                                }
                                this.plotArray[index][jIndex] = null
                            }
                        }
                    }
                }

            }
            //actually create the rect element
            if (this.pointerState == this.plant) {
                existingElementsToBeDeleted.concat(gsap.utils.toArray(`#${rectID}`))
                gsap.set(rect, { attr: { id: rectID }, x: xVal, y: yVal, width: rectWidth, height: 0, fill: this.flowerColor })
                this.els.getElementById("fill").appendChild(rect)
                gsap.to(rect, { height: rectHeight, duration: 1, onComplete: this.removeElement, onCompleteParams: [existingElementsToBeDeleted, rectID] })
            }

            console.log("i = " + i, "j = " + j)
            console.log("filled: ", this.colorCounter)
        }

                removeElement(arr, id) {
            arr.forEach(e => {
                if (e.id == id) {
                    e.remove()
                }
            })
        }
        */
        handleZoom() {
            if (!this.isZoomedIn) {
                let svgBBox = this.els.getBoundingClientRect();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.els, { duration: 1, attr: { viewBox: `${(this.mousePosition.x - 25 - svgBBox.x) * (500 / svgBBox.width)} ${(this.mousePosition.y - 25 - svgBBox.y) * (500 / svgBBox.width)} 50 50` }, });
                this.isZoomedIn = true;
                this.farmGroup.style.cursor = "zoom-out";
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.ui, { x: (this.mousePosition.x - 25 - svgBBox.x) * (500 / svgBBox.width) - 0.5, y: (this.mousePosition.y - 25 - svgBBox.y) * (500 / svgBBox.width) - 0.5, scale: 0.1, duration: 1 });
            }
            else {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.els, { duration: 1, attr: { viewBox: `0 0 500 500` }, });
                this.isZoomedIn = false;
                this.farmGroup.style.cursor = "zoom-in";
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.ui, { x: 0, y: 0, scale: 1, duration: 1 });
            }
        }
        handleGridToggle() {
            if (this.isViewingThousands) {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.thousands, { display: "none" });
                this.isViewingThousands = false;
            }
            else if (this.isViewingHundreds) {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.hundreds, { display: "none" });
                this.isViewingHundreds = false;
            }
            else {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.thousands, { display: "block" });
                this.isViewingThousands = true;
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.hundreds, { display: "block" });
                this.isViewingHundreds = true;
            }
        }
        handleColorChange(element) {
            let fillColor = getComputedStyle(element).fill;
            this.flowerColor = fillColor;
            this.els.getElementById("selectedColor").style.fill = fillColor;
        }
        handlePointerChange(element) {
            this.pointerState = element;
            if (this.pointerState == this.zoom) {
                if (this.isZoomedIn) {
                    this.farmGroup.style.cursor = "zoom-out";
                }
                else {
                    this.farmGroup.style.cursor = "zoom-in";
                }
            }
            else {
                this.farmGroup.style.cursor = "pointer";
            }
            this.previousState.style.fill = "#000000";
            element.style.fill = "#ffffff";
            this.previousState = element;
        }
        init() {
            let farmPlot = document.createElementNS(this.svgns, "rect");
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(farmPlot, { attr: { id: "farmPlot" }, width: this.setup.plotWidth, height: this.setup.plotHeight, fill: this.setup.plotColor });
            this.els.getElementById("plot").appendChild(farmPlot);
            this.plotBBox = this.els.getElementById("farmPlot").getBBox();
            this.plotIncrementWidth = this.plotBBox.width / 10;
            this.plotIncrementHeight = this.plotBBox.height / 10;
            this.generateLines();
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.els, { backgroundColor: "rgb(147,196,125)" });
            this.plant.style.fill = "#ffffff";
            //fill-box allows rotation about center
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.farmGroup, { transformOrigin: "center", transformBox: "fill-box", rotate: 45, skewX: 345, skewY: 345 });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.farmGroup, { x: 100, y: 100 });
            this.farmGroup.addEventListener("pointerdown", e => { this.hitTest(e); });
            document.addEventListener("keydown", event => {
                if (event.keyCode == 32) {
                    this.handleGridToggle();
                }
            });
            this.els.getElementById("grid").addEventListener("pointerdown", e => this.handleGridToggle());
            document.addEventListener("pointermove", e => {
                this.mousePosition.x = e.clientX;
                this.mousePosition.y = e.clientY;
            });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].utils.toArray(".color").forEach(element => element.addEventListener("pointerdown", e => this.handleColorChange(element)));
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].utils.toArray(".pointer").forEach(element => element.addEventListener("pointerdown", e => this.handlePointerChange(element)));
        }
    }
    return new farmClass(_els, _setup);
}


/***/ }),

/***/ "./src/app/kh-slider-input/KhSliderApi.ts":
/*!************************************************!*\
  !*** ./src/app/kh-slider-input/KhSliderApi.ts ***!
  \************************************************/
/*! exports provided: sliderAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliderAPI", function() { return sliderAPI; });
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");

function sliderAPI(_els, _setup) {
    let self = {};
    class sliderClass {
        constructor(els, setup) {
            this.sliderOpen = false;
            this.onAnswerUpdate = (answer) => { };
            self = this;
            this.els = els;
            this.setup = setup;
            this.num = this.els.getElementById("num");
            this.sliderControls = this.els.getElementById("sliderControls");
            this.numberDisplay = this.els.getElementById("numberDisplay");
            this.buttons = this.els.getElementById("buttons");
            this.sliderBar = this.els.getElementById("sliderBar");
            this.slider = this.els.getElementById("slider");
            this.maxText = this.els.getElementById("maxText");
            this.init();
        }
        //#region SLIDER FUNCTIONS
        //When the user taps on the input field open/close it
        inputFieldPressed() {
            if (!this.sliderOpen) {
                if (this.num.textContent == "") {
                    this.num.textContent = String(this.setup.min);
                }
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { x: -(this.num.getBBox().width / 2) });
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
            let newNumber = parseInt(this.num.textContent) + parseInt(button.getAttribute("val"));
            if (newNumber > this.setup.max) {
                newNumber = this.setup.max;
            }
            else if (newNumber < this.setup.min) {
                newNumber = this.setup.min;
            }
            if (newNumber <= this.setup.max && newNumber >= this.setup.min) {
                this.sliderValueHasBeenUpdated(newNumber);
            }
        }
        //When the slider has been updated via buttons or slider itself
        sliderValueHasBeenUpdated(value) {
            this.num.textContent = value;
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.num, { x: -(this.num.getBBox().width / 2) });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.slider, { x: this.increment * (value - this.setup.min) });
        }
        applyAnswer() {
            this.sliderControls.style.display = "block";
            this.sliderOpen = true;
            this.sliderValueHasBeenUpdated(Number(this.setup.startingValue));
        }
        addEventListenersAndInteractivity() {
            this.els.getElementById("numberDisplay").addEventListener("click", event => this.inputFieldPressed());
            for (let i = 0; i < this.buttons.children.length; i++) {
                this.buttons.children[i].addEventListener("click", event => this.buttonPressed(this.buttons.children[i]));
            }
            //Initializing draggables, controller and slider
            var controllerDraggable = gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"].create(this.sliderControls, {
                type: 'x,y',
                bounds: this.els
            });
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"].create(this.slider, {
                type: 'x',
                bounds: this.sliderBar,
                cursor: "pointer",
                onPress: function () {
                    //disable controller drag if we are dragging slider
                    controllerDraggable[0].disable();
                },
                onDrag: function () {
                    self.sliderValueHasBeenUpdated(Math.round(this.x / self.increment) + Number(self.setup.min));
                },
                onDragEnd: function () {
                    controllerDraggable[0].enable();
                }
            });
        }
        init() {
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].registerPlugin(gsap_all__WEBPACK_IMPORTED_MODULE_0__["Draggable"]);
            //setting height and width
            //this.els.setAttribute("width", String(this.setup.width))
            //this.els.setAttribute("height", String(this.setup.height))
            //this.els.setAttribute("viewBox", `0 0 ${this.setup.width} ${this.setup.height}`)
            //calculating increments for slider
            let barWidth = Math.round(this.sliderBar.getBBox().width - this.slider.getBBox().width);
            this.increment = barWidth / (this.setup.max - this.setup.min);
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.sliderControls, { display: "none" });
            this.num.textContent = "";
            //setting slider max and mins and repositioning the max
            this.els.getElementById("maxTextInner").textContent = String(this.setup.max);
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.maxText, { x: `-=${this.maxText.getBBox().width}` });
            this.els.getElementById("minTextInner").textContent = String(this.setup.min);
            if (this.setup.answer) {
                this.applyAnswer();
            }
            if (this.setup.reportMode == false) {
                this.addEventListenersAndInteractivity();
            }
        }
    }
    return new sliderClass(_els, _setup);
}


/***/ }),

/***/ "./src/app/kh-slider-input/kh-slider-input.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/kh-slider-input/kh-slider-input.component.ts ***!
  \**************************************************************/
/*! exports provided: KhSliderInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KhSliderInputComponent", function() { return KhSliderInputComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _KhSliderApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KhSliderApi */ "./src/app/kh-slider-input/KhSliderApi.ts");



const _c0 = ["renderEl"];
class KhSliderInputComponent {
    constructor() {
        this.width = 500;
        this.height = 500;
        this.max = 100;
        this.min = 0;
        this.reportMode = false;
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngAfterViewInit() {
        var _a, _b;
        const setup = {
            startingValue: this.startingValue,
            width: this.width,
            height: this.height,
            max: this.max,
            min: this.min,
            answer: (_a = this.value) === null || _a === void 0 ? void 0 : _a.answer,
            state: (_b = this.value) === null || _b === void 0 ? void 0 : _b.state,
            reportMode: this.reportMode
        };
        const els = this.renderEl.nativeElement;
        const interactive = Object(_KhSliderApi__WEBPACK_IMPORTED_MODULE_1__["sliderAPI"])(els, setup);
        interactive.onAnswerUpdate = (answer) => {
            this.valueChange.emit(answer);
            console.log(answer);
        };
    }
}
KhSliderInputComponent.ɵfac = function KhSliderInputComponent_Factory(t) { return new (t || KhSliderInputComponent)(); };
KhSliderInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: KhSliderInputComponent, selectors: [["app-kh-slider-input"]], viewQuery: function KhSliderInputComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.renderEl = _t.first);
    } }, inputs: { startingValue: "startingValue", width: "width", height: "height", max: "max", min: "min", value: "value", reportMode: "reportMode" }, outputs: { valueChange: "valueChange" }, decls: 44, vars: 0, consts: [["href", "https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap", "rel", "stylesheet"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 500 500"], ["renderEl", ""], ["id", "numberDisplay"], ["id", "displayBox", "width", "88.217819", "height", "41.903465", "x", "52.804455", "y", "0.52916497", "ry", "6.565558", 2, "fill", "#fff2cc", "fill-opacity", "1", "stroke", "#666666", "stroke-width", "1.05833", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], [0, "xml", "space", "preserve", "x", "96.128075", "y", "27.000118", "id", "num", 2, "font-weight", "600", "font-size", "14.8167px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "stroke-width", "0.264583"], [0, "sodipodi", "role", "line", "id", "tspan4252", "x", "96.128075", "y", "27.000118", 2, "font-size", "14.8167px", "stroke-width", "0.264583"], ["id", "sliderControls"], ["id", "controllerBackground", "width", "191.87375", "height", "56.974003", "x", "-1.7749024e-08", "y", "105.6554", "ry", "9.4543991", 2, "fill", "#c9daf8", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.842964", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "sliderBar", "width", "182.18196", "height", "20", "x", "4.8458939", "y", "139.33348", "ry", "10", 2, "fill", "#e5edfb", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.46116", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "buttons", "transform", "translate(-8.0866337,-5.3520234)"], ["id", "smallDec", "val", "-1"], ["id", "rect1216", "width", "20", "height", "20", "x", "70.326515", "y", "114.93417", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.802577", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "-1", "id", "text9162", "transform", "translate(57.393989,0.26262247)", 2, "font-weight", "600", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 23.307176,124.01749 v 1.4986 h -5.3848 v -1.4986 z", "id", "path6337"], ["d", "m 24.881978,121.68069 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6339"], ["id", "largeDec", "val", "-10"], ["id", "rect1216-7", "width", "40", "height", "20", "x", "12.932528", "y", "115.00823", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.13501", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "-10", "id", "text16348", "transform", "translate(-44.060659,0.26262231)", 2, "font-weight", "bold", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 73.062539,124.18047 v 1.4986 h -5.3848 v -1.4986 z", "id", "path6363", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 74.637341,121.84367 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6365", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 79.450634,124.71387 q 0,-2.1971 0.7874,-3.4417 0.8001,-1.2446 2.6416,-1.2446 1.8415,0 2.6289,1.2446 0.8001,1.2446 0.8001,3.4417 0,2.2098 -0.8001,3.4671 -0.7874,1.2573 -2.6289,1.2573 -1.8415,0 -2.6416,-1.2573 -0.7874,-1.2573 -0.7874,-3.4671 z m 5.1054,0 q 0,-0.9398 -0.127,-1.5748 -0.1143,-0.6477 -0.4826,-1.0541 -0.3556,-0.4064 -1.0668,-0.4064 -0.7112,0 -1.0795,0.4064 -0.3556,0.4064 -0.4826,1.0541 -0.1143,0.635 -0.1143,1.5748 0,0.9652 0.1143,1.6256 0.1143,0.6477 0.4826,1.0541 0.3683,0.3937 1.0795,0.3937 0.7112,0 1.0795,-0.3937 0.3683,-0.4064 0.4826,-1.0541 0.1143,-0.6604 0.1143,-1.6256 z", "id", "path6367", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["id", "largeInc", "val", "10"], ["id", "rect1216-7-5", "width", "40", "height", "20", "x", "155.11449", "y", "115.35304", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.13501", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "+10", "id", "text19608", "transform", "translate(44.060648,1.0504888)", 2, "font-weight", "600", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 127.7074,125.2741 h -2.4003 v 2.4638 h -1.6764 v -2.4638 h -2.4003 v -1.5494 h 2.4003 v -2.4638 h 1.6764 v 2.4638 h 2.4003 z", "id", "path6391"], ["d", "m 129.206,121.4006 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6393"], ["d", "m 134.01929,124.2708 q 0,-2.1971 0.7874,-3.4417 0.8001,-1.2446 2.6416,-1.2446 1.8415,0 2.6289,1.2446 0.8001,1.2446 0.8001,3.4417 0,2.2098 -0.8001,3.4671 -0.7874,1.2573 -2.6289,1.2573 -1.8415,0 -2.6416,-1.2573 -0.7874,-1.2573 -0.7874,-3.4671 z m 5.1054,0 q 0,-0.9398 -0.127,-1.5748 -0.1143,-0.6477 -0.4826,-1.0541 -0.3556,-0.4064 -1.0668,-0.4064 -0.7112,0 -1.0795,0.4064 -0.3556,0.4064 -0.4826,1.0541 -0.1143,0.635 -0.1143,1.5748 0,0.9652 0.1143,1.6256 0.1143,0.6477 0.4826,1.0541 0.3683,0.3937 1.0795,0.3937 0.7112,0 1.0795,-0.3937 0.3683,-0.4064 0.4826,-1.0541 0.1143,-0.6604 0.1143,-1.6256 z", "id", "path6395"], ["id", "smallInc", "val", "1"], ["id", "rect1216-2", "width", "20", "height", "20", "x", "117.7205", "y", "114.74561", "ry", "10", 2, "fill", "#4285f4", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.802577", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"], ["aria-label", "+1", "id", "text20888", "transform", "translate(-57.393986)", 2, "font-weight", "bold", "font-size", "12.7px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Bold", "fill", "#ffffff", "stroke-width", "0.264583"], ["d", "m 186.07333,125.62826 h -2.4003 v 2.4638 h -1.6764 v -2.4638 h -2.4003 v -1.5494 h 2.4003 v -2.4638 h 1.6764 v 2.4638 h 2.4003 z", "id", "path6419", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], ["d", "m 187.57193,121.75476 v -1.6383 h 3.0607 v 9.2583 h -1.8288 v -7.62 z", "id", "path6421", 2, "font-weight", "600", "-inkscape-font-specification", "poppins Semi-Bold"], [0, "xml", "space", "preserve", "id", "maxText", "transform", "translate(83.299257,-132.1455)", 2, "font-weight", "600", "font-size", "8px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "white-space", "pre", "shape-inside", "url(#rect3952)", "fill", "#3c78d8", "fill-opacity", "1"], ["x", "98.162109", "y", "284.45898", "id", "maxTextInner"], [0, "xml", "space", "preserve", "id", "minText", "transform", "translate(-88.345406,-132.1455)", 2, "font-weight", "600", "font-size", "8px", "line-height", "1.25", "font-family", "poppins", "-inkscape-font-specification", "poppins Semi-Bold", "white-space", "pre", "shape-inside", "url(#rect3952-1)", "fill", "#3c78d8", "fill-opacity", "1"], ["x", "98.162109", "y", "284.45898", "id", "minTextInner"], ["id", "slider", "width", "24.686497", "height", "15", "x", "4.993494", "y", "141.83348", "ry", "7.5", 2, "fill", "#3c78d8", "fill-opacity", "1", "stroke", "none", "stroke-width", "1.09866", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-opacity", "1"]], template: function KhSliderInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "rect", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tspan", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "rect", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "rect", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "g", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "g", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "rect", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "g", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "g", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "rect", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "g", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "g", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "rect", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "g", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "g", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "rect", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "g", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "path", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "text", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "tspan", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "text", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "tspan", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "rect", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".number[_ngcontent-%COMP%] {\r\n    alignment-baseline: text-before-edge;\r\n    text-anchor: start;\r\n}\r\n\r\n#numberDisplay[_ngcontent-%COMP%], #num[_ngcontent-%COMP%], #buttons[_ngcontent-%COMP%], #sliderBar[_ngcontent-%COMP%] {\r\n    cursor: pointer;\r\n}\r\n\r\n#num[_ngcontent-%COMP%], #minText[_ngcontent-%COMP%], #maxText[_ngcontent-%COMP%] {\r\n    -webkit-user-select:none;\r\n       -moz-user-select:none;\r\n            user-select:none\r\n}\r\n\r\nsvg[_ngcontent-%COMP%] {\r\n    height: auto;\r\n    width: auto;\r\n    max-width: 700px;\r\n    min-width: 300px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva2gtc2xpZGVyLWlucHV0L2toLXNsaWRlci1pbnB1dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0NBQW9DO0lBQ3BDLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx3QkFBZTtPQUFmLHFCQUFlO1lBQWY7QUFDSjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2toLXNsaWRlci1pbnB1dC9raC1zbGlkZXItaW5wdXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5udW1iZXIge1xyXG4gICAgYWxpZ25tZW50LWJhc2VsaW5lOiB0ZXh0LWJlZm9yZS1lZGdlO1xyXG4gICAgdGV4dC1hbmNob3I6IHN0YXJ0O1xyXG59XHJcblxyXG4jbnVtYmVyRGlzcGxheSwgI251bSwgI2J1dHRvbnMsICNzbGlkZXJCYXIge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4jbnVtLCAjbWluVGV4dCwgI21heFRleHQge1xyXG4gICAgdXNlci1zZWxlY3Q6bm9uZVxyXG59XHJcblxyXG5zdmcge1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBtYXgtd2lkdGg6IDcwMHB4O1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](KhSliderInputComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-kh-slider-input',
                templateUrl: './kh-slider-input.component.html',
                styleUrls: ['./kh-slider-input.component.css']
            }]
    }], null, { renderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderEl']
        }], startingValue: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], width: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], height: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], reportMode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], valueChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/moonfactory/moonfactory.component.ts":
/*!******************************************************!*\
  !*** ./src/app/moonfactory/moonfactory.component.ts ***!
  \******************************************************/
/*! exports provided: MoonfactoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoonfactoryComponent", function() { return MoonfactoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");
/* harmony import */ var gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/Draggable */ "./node_modules/gsap/Draggable.js");




class MoonfactoryComponent {
    constructor() { }
    ngAfterViewInit() {
        var meteor = document.getElementById("meteor");
        var moon = document.getElementById("moon");
        var planet = document.getElementById("planet");
        var sun = document.getElementById("sun");
        setup(meteor, moon, planet, sun);
    }
}
MoonfactoryComponent.ɵfac = function MoonfactoryComponent_Factory(t) { return new (t || MoonfactoryComponent)(); };
MoonfactoryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MoonfactoryComponent, selectors: [["app-moonfactory"]], decls: 226, vars: 0, consts: [["viewBox", "0 0 350 160", "version", "1.1", "id", "svg104056", 0, "inkscape", "version", "1.2 (dc2aedaf03, 2022-05-15)", 0, "sodipodi", "docname", "planet-factory-start.svg", 0, "xmlns", "inkscape", "http://www.inkscape.org/namespaces/inkscape", 0, "xmlns", "sodipodi", "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "svg", "http://www.w3.org/2000/svg"], ["id", "defs104053"], [0, "inkscape", "collect", "always", "id", "linearGradient926"], ["offset", "0", "id", "stop922", 2, "stop-color", "#030206", "stop-opacity", "1"], ["offset", "1", "id", "stop924", 2, "stop-color", "#030206", "stop-opacity", "0"], [0, "inkscape", "collect", "always", 0, "xlink", "href", "#linearGradient926", "id", "linearGradient928", "x1", "87.99234", "y1", "82.346176", "x2", "87.958092", "y2", "22.368448", "gradientUnits", "userSpaceOnUse"], [0, "inkscape", "collect", "always", 0, "xlink", "href", "#linearGradient1617", "id", "linearGradient1619", "x1", "54.85815", "y1", "292.35101", "x2", "54.39325", "y2", "155.20563", "gradientUnits", "userSpaceOnUse", "gradientTransform", "matrix(2.3440685,0,0,1.0715743,112.08686,-208.48271)"], [0, "inkscape", "collect", "always", "id", "linearGradient1617"], ["offset", "0", "id", "stop1613", 2, "stop-color", "#000080", "stop-opacity", "1"], ["offset", "1", "id", "stop1615", 2, "stop-color", "#ea0880", "stop-opacity", "0.75166297"], [0, "inkscape", "groupmode", "layer", "id", "layer3", 0, "inkscape", "label", "Layer 0"], ["id", "background", "transform", "matrix(1.5,0,0,1.5,-168.93546,-4.2941552)"], ["id", "rect1457", "width", "233.33333", "height", "106.66666", "x", "112.62364", "y", "2.8627701", 2, "fill", "url(#linearGradient1619)", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.725832", "stroke-dasharray", "1.45165, 1.45165"], [0, "sodipodi", "type", "star", "id", "path1723", 0, "inkscape", "flatsided", "false", 0, "sodipodi", "sides", "4", 0, "sodipodi", "cx", "166.86954", 0, "sodipodi", "cy", "127.64845", 0, "sodipodi", "r1", "6.0275807", 0, "sodipodi", "r2", "2.1155381", 0, "sodipodi", "arg1", "-1.5304533", 0, "sodipodi", "arg2", "-0.68267888", 0, "inkscape", "rounded", "0", 0, "inkscape", "randomized", "0", "transform", "matrix(0.22507942,0,0,0.40135795,91.340093,-31.47695)", "d", "m 167.11264,121.62578 1.39831,4.68804 4.38126,1.57774 -4.68804,1.39831 -1.57774,4.38126 -1.39831,-4.68804 -4.38126,-1.57774 4.68804,-1.39831 z", 2, "opacity", "0.7", "fill", "#ffffff", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "1.74614", "stroke-miterlimit", "4", "stroke-dasharray", "3.49228, 3.49228", "stroke-dashoffset", "0"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079", "transform", "translate(77.42746,42.16648)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-9", "transform", "translate(36.01892,28.25555)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3", "transform", "translate(-2.84162,75.96139)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-1", "transform", "translate(21.410468,62.94946)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-2", "transform", "translate(36.602113,-7.49926)", "width", "100%", "height", "100%", 2, "opacity", "0.7"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-0", "transform", "translate(71.186833,80.15224)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-6", "transform", "translate(7.16223,30.51535)", "width", "100%", "height", "100%", 2, "opacity", "0.4"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-2", "transform", "translate(77.793128,-5.41086)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-27", "transform", "translate(53.253525,11.53315)", "width", "100%", "height", "100%", 2, "opacity", "0.3"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-8", "transform", "translate(-12.47756,18.8366)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4455", "transform", "translate(97.836136,14.611497)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4457", "transform", "translate(139.24492,28.522427)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4459", "transform", "translate(138.66172,64.277237)", "width", "100%", "height", "100%", 2, "opacity", "0.7"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4461", "transform", "translate(128.04543,2.8770742)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4463", "transform", "translate(97.470476,62.188843)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4465", "transform", "translate(122.01024,45.244827)", "width", "100%", "height", "100%", 2, "opacity", "0.3"], [0, "sodipodi", "type", "star", "id", "path7951", 0, "inkscape", "flatsided", "false", 0, "sodipodi", "sides", "4", 0, "sodipodi", "cx", "166.86954", 0, "sodipodi", "cy", "127.64845", 0, "sodipodi", "r1", "6.0275807", 0, "sodipodi", "r2", "2.1155381", 0, "sodipodi", "arg1", "-1.5304533", 0, "sodipodi", "arg2", "-0.68267888", 0, "inkscape", "rounded", "0", 0, "inkscape", "randomized", "0", "transform", "matrix(-0.22507942,0,0,-0.40135795,357.35641,114.09322)", "d", "m 167.11264,121.62578 1.39831,4.68804 4.38126,1.57774 -4.68804,1.39831 -1.57774,4.38126 -1.39831,-4.68804 -4.38126,-1.57774 4.68804,-1.39831 z", 2, "opacity", "0.7", "fill", "#ffffff", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "1.74614", "stroke-miterlimit", "4", "stroke-dasharray", "3.49228, 3.49228", "stroke-dashoffset", "0"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7953", "transform", "rotate(180,206.3389,27.180323)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7955", "transform", "rotate(180,220.76725,26.050423)", "width", "100%", "height", "100%", 2, "opacity", "0.4"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7957", "transform", "rotate(180,230.58715,31.889798)", "width", "100%", "height", "100%"], [0, "inkscape", "label", "Layer 1", 0, "inkscape", "groupmode", "layer", "id", "layer1"], ["id", "planet", "transform", "matrix(0.79713025,0,0,0.79713025,31.645843,124.5447)"], ["d", "m 41.413983,105.42466 c 4.754739,4.75474 4.754739,12.46399 0,17.21873 -4.755092,4.75474 -12.463991,4.75474 -17.219083,0 -4.754739,-4.75474 -4.754739,-12.46399 0,-17.21873 4.755092,-4.75509 12.463991,-4.75509 17.219083,0", "id", "path842", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g844", "transform", "matrix(0.35277777,0,0,-0.35277777,27.639458,103.4878)"], ["d", "m 0,0 c -0.544,0.545 -1.389,0.684 -2.063,0.312 -2.762,-1.527 -5.361,-3.456 -7.704,-5.799 -13.004,-13.004 -13.458,-33.812 -1.367,-47.365 0.676,-0.756 1.846,-0.805 2.565,-0.086 0.645,0.645 0.703,1.692 0.093,2.373 -10.903,12.173 -10.509,30.903 1.188,42.6 2.098,2.098 4.424,3.831 6.897,5.201 1.018,0.564 1.218,1.937 0.394,2.761 z", "id", "path846", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g848", "transform", "matrix(0.35277777,0,0,-0.35277777,39.821333,106.38739)"], ["d", "m 0,0 c 11.971,-11.971 11.971,-31.379 0,-43.35 -11.971,-11.971 -31.379,-11.971 -43.35,0 -11.971,11.971 -11.971,31.379 0,43.35 11.971,11.971 31.379,11.971 43.35,0", "id", "path850", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g852", "transform", "matrix(0.35277777,0,0,-0.35277777,35.060526,108.63755)"], ["d", "m 0,0 c 8.231,-8.231 8.231,-21.577 0,-29.81 -8.232,-8.231 -21.578,-8.231 -29.81,0 -8.231,8.233 -8.231,21.579 0,29.81 8.232,8.231 21.578,8.231 29.81,0", "id", "path854", 2, "fill", "#ff5b52", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g856", "transform", "matrix(0.35277777,0,0,-0.35277777,29.529253,123.58718)"], ["d", "m 0,0 v 0 c -0.254,-1.42 -1.732,-2.235 -3.087,-1.74 -4.084,1.495 -7.915,3.88 -11.184,7.173 -6.416,6.46 -9.364,15.056 -8.842,23.471 0.079,1.195 0.985,2.231 2.179,2.282 0.682,0.028 1.29,-0.232 1.724,-0.667 0.464,-0.463 0.731,-1.108 0.688,-1.817 -0.463,-7.184 2.043,-14.528 7.51,-20.04 C -8.222,5.86 -4.953,3.82 -1.474,2.553 -0.426,2.171 0.196,1.098 0,0", "id", "path858", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["d", "m 39.822003,106.38757 c 4.223103,4.2231 4.223103,11.07017 0,15.29362 -0.434269,0.43392 -0.896761,0.8248 -1.385006,1.16981 3.007431,-4.2231 2.619023,-10.11978 -1.169811,-13.90861 -3.788833,-3.78884 -9.685513,-4.17724 -13.908616,-1.17017 0.345017,-0.48789 0.735542,-0.95038 1.169811,-1.38465 4.223456,-4.2231 11.070167,-4.2231 15.293622,0", "id", "path862", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g864", "transform", "matrix(0.35277777,0,0,-0.35277777,41.309243,116.74177)"], ["d", "m 0,0 c 1.411,-1.412 1.411,-3.701 0,-5.112 -1.412,-1.412 -3.701,-1.412 -5.112,0 -1.412,1.411 -1.412,3.7 0,5.112 1.411,1.411 3.7,1.411 5.112,0", "id", "path866", 2, "fill", "#8c1842", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g868", "transform", "matrix(0.35277777,0,0,-0.35277777,36.700766,106.47283)"], ["d", "m 0,0 c 1.256,-1.256 1.256,-3.292 0,-4.547 -1.255,-1.256 -3.291,-1.256 -4.547,0 -1.256,1.255 -1.256,3.291 0,4.547 1.256,1.256 3.292,1.256 4.547,0", "id", "path870", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g872", "transform", "matrix(0.35277777,0,0,-0.35277777,37.07076,119.18885)"], ["d", "m 0,0 c 0.461,-0.461 0.461,-1.208 0,-1.669 -0.461,-0.461 -1.208,-0.461 -1.669,0 -0.461,0.461 -0.461,1.208 0,1.669 0.461,0.461 1.208,0.461 1.669,0", "id", "path874", 2, "fill", "#ff5b52", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g876", "transform", "matrix(0.35277777,0,0,-0.35277777,28.115743,116.91714)"], ["d", "m 0,0 c 0.647,-0.647 0.647,-1.697 0,-2.344 -0.647,-0.647 -1.697,-0.647 -2.344,0 -0.647,0.647 -0.647,1.697 0,2.344 0.647,0.646 1.697,0.646 2.344,0", "id", "path878", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g880", "transform", "matrix(0.35277777,0,0,-0.35277777,35.340632,120.70297)"], ["d", "m 0,0 c 0.898,-0.898 0.898,-2.355 0,-3.253 -0.898,-0.898 -2.355,-0.898 -3.254,0 -0.898,0.898 -0.898,2.355 0,3.253 0.899,0.898 2.356,0.898 3.254,0", "id", "path882", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g884", "transform", "matrix(0.35277777,0,0,-0.35277777,41.728167,111.41172)"], ["d", "m 0,0 v 0 c 1.42,0.254 2.235,1.731 1.739,3.086 -1.494,4.084 -3.879,7.915 -7.172,11.185 -6.46,6.416 -15.056,9.363 -23.471,8.842 -1.195,-0.08 -2.231,-0.985 -2.282,-2.18 -0.028,-0.681 0.232,-1.289 0.666,-1.724 0.464,-0.463 1.109,-0.731 1.818,-0.688 7.184,0.464 14.528,-2.042 20.039,-7.51 C -5.86,8.221 -3.82,4.952 -2.553,1.473 -2.171,0.426 -1.098,-0.196 0,0", "id", "path886", 2, "fill", "#8c1842", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g888", "transform", "matrix(0.35277777,0,0,-0.35277777,35.225908,123.65576)"], ["d", "m 0,0 c 0.202,-1.202 -0.558,-2.368 -1.753,-2.637 -2.695,-0.618 -5.458,-0.866 -8.205,-0.743 -1.37,0.062 -2.357,1.346 -2.118,2.695 l 0.002,0.007 c 0.201,1.134 1.211,1.932 2.362,1.884 2.334,-0.098 4.683,0.124 6.974,0.648 C -1.471,2.15 -0.232,1.274 0,0", "id", "path890", 2, "fill", "#ff6950", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g892", "transform", "matrix(0.35277777,0,0,-0.35277777,31.468507,108.86389)"], ["d", "m 0,0 c 3.045,-3.045 3.045,-7.982 0,-11.027 -3.045,-3.045 -7.982,-3.045 -11.027,0 -3.045,3.045 -3.045,7.982 0,11.027 C -7.982,3.045 -3.045,3.045 0,0", "id", "path894", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g896", "transform", "matrix(0.35277777,0,0,-0.35277777,31.123844,109.20873)"], ["d", "m 0,0 c 3.045,-3.045 3.045,-7.982 0,-11.027 -3.045,-3.045 -7.982,-3.045 -11.027,0 -3.045,3.045 -3.045,7.982 0,11.027 C -7.982,3.045 -3.045,3.045 0,0", "id", "path898", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g900", "transform", "matrix(0.35277777,0,0,-0.35277777,37.386672,111.22344)"], ["d", "m 0,0 c 2.127,-2.127 2.127,-5.576 0,-7.703 -2.127,-2.126 -5.575,-2.126 -7.702,0 -2.127,2.127 -2.127,5.576 0,7.703 2.127,2.126 5.575,2.126 7.702,0", "id", "path902", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g904", "transform", "matrix(0.35277777,0,0,-0.35277777,37.003238,111.5595)"], ["d", "m 0,0 c 2.127,-2.127 2.127,-5.575 0,-7.702 -2.127,-2.127 -5.575,-2.127 -7.702,0 -2.127,2.127 -2.127,5.575 0,7.702 2.127,2.127 5.575,2.127 7.702,0", "id", "path906", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g908", "transform", "matrix(0.35277777,0,0,-0.35277777,32.451558,115.85228)"], ["d", "m 0,0 c 1.063,-1.063 1.063,-2.788 0,-3.852 -1.063,-1.063 -2.788,-1.063 -3.851,0 -1.064,1.064 -1.064,2.789 0,3.852 1.063,1.063 2.788,1.063 3.851,0", "id", "path910", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g912", "transform", "matrix(0.35277777,0,0,-0.35277777,32.240914,116.09792)"], ["d", "m 0,0 c 1.063,-1.063 1.063,-2.788 0,-3.852 -1.063,-1.063 -2.788,-1.063 -3.851,0 -1.064,1.064 -1.064,2.789 0,3.852 1.063,1.063 2.788,1.063 3.851,0", "id", "path914", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g916", "transform", "matrix(0.35277777,0,0,-0.35277777,23.816264,115.47674)"], ["d", "M 0,0 C -0.675,3.04 -0.791,6.039 -0.416,8.816", "id", "path918", 2, "fill", "none", "stroke", "#fce678", "stroke-width", "5.856", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g920", "transform", "matrix(0.35277777,0,0,-0.35277777,24.472219,109.8771)"], ["d", "M 0,0 C 0.182,0.327 0.373,0.645 0.574,0.954", "id", "path922", 2, "fill", "none", "stroke", "#fce678", "stroke-width", "5.856", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g924", "transform", "matrix(0.35277777,0,0,-0.35277777,43.685696,102.52645)"], ["d", "m 0,0 c -3.104,3.104 -8.583,2.665 -16.277,-1.327 2.268,-1.049 4.451,-2.365 6.485,-3.96 2.098,0.803 3.499,1.028 4.345,1.028 0.578,0 0.887,-0.108 0.995,-0.204 0.224,-0.224 0.514,-1.712 -0.738,-5.073 -0.557,-1.508 -1.424,-3.392 -2.74,-5.704 -3.96,-6.956 -10.434,-15.09 -18.236,-22.881 -7.792,-7.801 -15.925,-14.276 -22.892,-18.247 -1.723,-0.984 -3.2,-1.713 -4.463,-2.247 -4.227,-1.798 -6.046,-1.477 -6.314,-1.22 -0.257,0.267 -0.589,2.162 1.337,6.582 -1.541,2.044 -2.803,4.206 -3.82,6.463 -4.58,-8.347 -5.244,-14.222 -1.969,-17.498 1.359,-1.359 3.178,-2.044 5.426,-2.044 2.975,0 6.731,1.188 11.226,3.564 0.557,0.289 1.124,0.6 1.702,0.932 7.438,4.227 16.042,11.076 24.229,19.253 8.177,8.187 15.016,16.791 19.253,24.229 0.567,0.995 1.081,1.958 1.552,2.89 1.959,3.97 2.943,7.319 2.943,10.038 C 2.044,-3.179 1.359,-1.359 0,0", "id", "path926", 2, "fill", "#fce678", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g928", "transform", "matrix(0.35277777,0,0,-0.35277777,22.861118,121.77542)"], ["d", "M 0,0 C 0.153,0.408 0.33,0.844 0.533,1.311 -1.008,3.354 -2.271,5.517 -3.288,7.774 -4.371,5.8 -5.233,3.965 -5.876,2.271 -6.661,0.2 -5.148,-2.014 -2.935,-2.014 -1.631,-2.014 -0.458,-1.22 0,0", "id", "path930", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g932", "transform", "matrix(0.35277777,0,0,-0.35277777,41.326812,103.21842)"], ["d", "M 0,0 V 0 C 0,2.16 -2.115,3.665 -4.164,2.983 -5.828,2.43 -7.638,1.648 -9.591,0.634 c 2.269,-1.049 4.451,-2.365 6.486,-3.96 0.33,0.127 0.643,0.239 0.939,0.338 C -0.873,-2.556 0,-1.363 0,0", "id", "path934", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g936", "transform", "matrix(0.35277777,0,0,-0.35277777,31.904329,118.36409)"], ["d", "m 0,0 c -3.397,-2.974 -6.769,-5.63 -10,-7.876 -1.523,-1.06 -1.823,-3.184 -0.633,-4.607 1.046,-1.252 2.871,-1.505 4.211,-0.575 3.424,2.376 6.99,5.179 10.562,8.304 1.372,1.199 1.445,3.315 0.156,4.604 L 4.291,-0.145 C 3.123,1.024 1.244,1.089 0,0", "id", "path938", 2, "fill", "#ffffa9", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["d", "m 34.454877,115.97455 -0.173919,0.17357 c -0.482953,0.47589 -0.430389,1.27247 0.117122,1.68028 l 0.0039,0.004 c 0.3302,0.33231 0.861836,0.37465 1.228725,0.0833 0.154164,-0.12206 0.276225,-0.24412 0.398286,-0.36653 0.655109,-0.65511 1.284817,-1.31728 1.883834,-1.9805 0.426861,-0.47237 0.372886,-1.20473 -0.120298,-1.60725 l -0.0039,-0.003 c -0.455083,-0.37147 -1.122186,-0.32561 -1.516944,0.10972 -0.577145,0.63676 -1.184628,1.27458 -1.816806,1.90676", "id", "path942", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g944", "transform", "matrix(0.35277777,0,0,-0.35277777,40.480357,110.53253)"], ["d", "m 0,0 c -1.421,0.95 -3.351,0.475 -4.373,-0.896 -0.523,-0.701 -1.064,-1.407 -1.623,-2.116 -1.064,-1.35 -0.859,-3.302 0.473,-4.388 1.361,-1.112 3.377,-0.889 4.464,0.492 0.639,0.812 1.257,1.618 1.851,2.419 C 1.85,-3.056 1.512,-1.01 0,0", "id", "path946", 2, "fill", "#ffffa9", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "moon", "transform", "matrix(0.53140337,0,0,-0.53133854,3.6409257,248.72838)"], ["id", "g953-9-4", "transform", "translate(66.5576,52.9734)", 2, "fill", "#969696", "fill-opacity", "1"], ["d", "M 0,0 V -0.029 C 0,-0.384 -0.022,-0.739 -0.068,-1.078 -0.114,-1.444 -0.184,-1.8 -0.27,-2.149 -0.367,-2.511 -0.481,-2.866 -0.619,-3.204 -1.886,-6.362 -4.98,-8.598 -8.598,-8.598 c -4.751,0 -8.596,3.852 -8.596,8.598 0,4.751 3.845,8.598 8.596,8.598 3.17,0 5.945,-1.72 7.435,-4.277 C -0.969,3.983 -0.791,3.634 -0.642,3.267 -0.493,2.905 -0.367,2.527 -0.27,2.138 -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path955-1-1", 2, "fill", "#969696", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g957-6-2", "transform", "translate(62.7793,54.865)", 2, "fill", "#aaaaaa", "fill-opacity", "1"], ["d", "m 0,0 c 0,-3.389 -2.747,-6.136 -6.136,-6.136 -3.388,0 -6.135,2.747 -6.135,6.136 0,3.389 2.747,6.135 6.135,6.135 C -2.747,6.135 0,3.389 0,0", "id", "path959-1-3", 2, "fill", "#aaaaaa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g961-1-7", "transform", "translate(66.5576,52.9734)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "M 0,0 V -0.029 C 0,-0.384 -0.022,-0.739 -0.068,-1.078 -0.114,-1.444 -0.184,-1.8 -0.27,-2.149 h -9.646 c -0.596,0 -1.077,0.481 -1.077,1.071 0,0.602 0.481,1.078 1.077,1.078 h 3.33 c 0.597,0 1.084,0.493 1.084,1.083 0,0.596 -0.487,1.083 -1.084,1.083 h -2.04 c -0.596,0 -1.083,0.481 -1.083,1.078 0,0.59 0.487,1.077 1.083,1.077 h 7.463 C -0.969,3.983 -0.791,3.634 -0.642,3.267 -0.493,2.905 -0.367,2.527 -0.27,2.138 -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path963-0-5", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g965-7-5", "transform", "translate(66.5576,52.9734)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 v -0.029 h -1.886 c -0.595,0 -1.077,0.493 -1.077,1.084 0,0.59 0.482,1.083 1.077,1.083 H -0.27 C -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path967-8-5", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g969-7-0", "transform", "translate(64.3691,50.1463)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c -0.372,0 -0.719,-0.19 -0.912,-0.508 -1.129,-1.855 -3.166,-3.096 -5.497,-3.096 -2.053,0 -3.877,0.963 -5.054,2.459 -0.198,0.252 -0.508,0.39 -0.828,0.39 -0.892,0 -1.413,-1.031 -0.862,-1.732 1.57,-1.998 4.004,-3.284 6.744,-3.284 3.106,0 5.823,1.653 7.332,4.125 C 1.363,-0.927 0.844,0 0,0", "id", "path971-1-6", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g973-1-6", "transform", "translate(56.0508,60.6687)", 2, "fill", "#c8c8c8", "fill-opacity", "1"], ["d", "m 0,0 c 0.181,-0.41 -0.032,-0.877 -0.454,-1.026 -2.531,-0.896 -4.394,-3.189 -4.669,-5.953 -0.04,-0.39 -0.367,-0.682 -0.757,-0.682 -0.453,0 -0.807,0.39 -0.762,0.843 0.342,3.36 2.611,6.147 5.684,7.23 C -0.58,0.545 -0.162,0.366 0,0", "id", "path975-3-9", 2, "fill", "#c8c8c8", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g977-1-7", "transform", "translate(51.0527,53.1482)", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-opacity", "1"], ["d", "M 0,0 C 0.221,1.192 0.636,2.285 1.192,3.224", "id", "path979-0-8", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-width", "1.719", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g981-7-8", "transform", "translate(54.1348,58.5555)", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-opacity", "1"], ["d", "M 0,0 C 0.114,0.089 0.231,0.174 0.351,0.255", "id", "path983-0-3", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-width", "1.719", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g985-2-1", "transform", "translate(63.749,46.6267)", 2, "fill", "#646464", "fill-opacity", "1"], ["d", "m 0,0 c -1.226,-1.122 -2.776,-1.891 -4.495,-2.149 -0.636,-0.096 -1.213,0.381 -1.213,1.024 v 0.09 c 0,0.522 0.392,0.947 0.908,1.027 1.265,0.197 2.409,0.761 3.318,1.58 0.386,0.35 0.959,0.392 1.366,0.069 L -0.051,1.588 C 0.453,1.188 0.474,0.435 0,0", "id", "path987-9-1", 2, "fill", "#646464", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g989-4-3", "transform", "translate(60.2861,50.824)", 2, "fill", "#fafafa", "fill-opacity", "1"], ["d", "m 0,0 h -1.919 c -0.596,0 -1.078,0.482 -1.078,1.079 0,0.596 0.482,1.078 1.078,1.078 H 0 C 0.597,2.157 1.079,1.675 1.079,1.079 1.079,0.482 0.597,0 0,0", "id", "path991-0-1", 2, "fill", "#fafafa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g993-8-4", "transform", "translate(57.791,55.114)", 2, "fill", "#9b9b9b", "fill-opacity", "1", "stroke", "none", "stroke-opacity", "1"], ["d", "m 0,0 h -1.919 c -0.596,0 -1.079,0.483 -1.079,1.079 0,0.596 0.483,1.079 1.079,1.079 H 0 C 0.596,2.158 1.079,1.675 1.079,1.079 1.079,0.483 0.596,0 0,0", "id", "path995-7-2", 2, "fill", "#9b9b9b", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-opacity", "1"], ["id", "g997-9-8", "transform", "translate(62.3115,56.1931)", 2, "fill", "#fafafa", "fill-opacity", "1", "stroke", "none", "stroke-opacity", "1"], ["d", "m 0,0 h -0.42 c -0.596,0 -1.079,0.483 -1.079,1.079 0,0.596 0.483,1.079 1.079,1.079 H 0 C 0.596,2.158 1.079,1.675 1.079,1.079 1.079,0.483 0.596,0 0,0", "id", "path999-0-4", 2, "fill", "#fafafa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-opacity", "1"], ["id", "g1001-4-3", "transform", "translate(54.7529,51.2957)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.58 -0.47,-1.05 -1.05,-1.05 -0.58,0 -1.051,0.47 -1.051,1.05 0,0.58 0.471,1.051 1.051,1.051 C -0.47,1.051 0,0.58 0,0", "id", "path1003-1-2", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1005-2-5", "transform", "translate(54.3828,51.4471)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.425 -0.345,-0.77 -0.77,-0.77 -0.424,0 -0.768,0.345 -0.768,0.77 0,0.425 0.344,0.77 0.768,0.77 C -0.345,0.77 0,0.425 0,0", "id", "path1007-8-4", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1009-9-8", "transform", "translate(56.7158,48.7293)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.332 -0.269,-0.601 -0.601,-0.601 -0.331,0 -0.6,0.269 -0.6,0.601 0,0.332 0.269,0.601 0.6,0.601 C -0.269,0.601 0,0.332 0,0", "id", "path1011-3-1", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1013-7-8", "transform", "translate(56.5039,48.8162)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.243 -0.196,-0.44 -0.439,-0.44 -0.244,0 -0.441,0.197 -0.441,0.44 0,0.242 0.197,0.439 0.441,0.439 C -0.196,0.439 0,0.242 0,0", "id", "path1015-5-7", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1017-9-3", "transform", "translate(55.3115,55.114)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.434 -0.352,-0.785 -0.785,-0.785 -0.434,0 -0.786,0.351 -0.786,0.785 0,0.435 0.352,0.786 0.786,0.786 C -0.352,0.786 0,0.435 0,0", "id", "path1019-7-6", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1021-4-4", "transform", "translate(55.0352,55.2273)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.317 -0.258,-0.575 -0.576,-0.575 -0.318,0 -0.575,0.258 -0.575,0.575 0,0.318 0.257,0.575 0.575,0.575 C -0.258,0.575 0,0.318 0,0", "id", "path1023-4-0", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1025-8-3", "transform", "translate(59.3623,58.9558)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.553 -0.448,-1.001 -1.002,-1.001 -0.553,0 -1.001,0.448 -1.001,1.001 0,0.554 0.448,1.002 1.001,1.002 C -0.448,1.002 0,0.554 0,0", "id", "path1027-3-8", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1029-6-6", "transform", "translate(59.0088,59.1004)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.405 -0.328,-0.733 -0.733,-0.733 -0.406,0 -0.734,0.328 -0.734,0.733 0,0.405 0.328,0.733 0.734,0.733 C -0.328,0.733 0,0.405 0,0", "id", "path1031-2-2", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1033-3-5", "transform", "translate(61.0127,48.8162)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.554 -0.449,-1.002 -1.002,-1.002 -0.553,0 -1.002,0.448 -1.002,1.002 0,0.553 0.449,1.001 1.002,1.001 C -0.449,1.001 0,0.553 0,0", "id", "path1035-4-4", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1037-7-3", "transform", "translate(60.6592,48.9597)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.405 -0.328,-0.733 -0.733,-0.733 -0.406,0 -0.734,0.328 -0.734,0.733 0,0.405 0.328,0.733 0.734,0.733 C -0.328,0.733 0,0.405 0,0", "id", "path1039-8-4", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1041-6-5", "transform", "translate(64.9141,52.5877)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.729 -0.591,-1.319 -1.319,-1.319 -0.73,0 -1.321,0.59 -1.321,1.319 0,0.729 0.591,1.319 1.321,1.319 C -0.591,1.319 0,0.729 0,0", "id", "path1043-6-9", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1045-4-4", "transform", "translate(64.4492,52.7771)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.533 -0.434,-0.966 -0.967,-0.966 -0.534,0 -0.967,0.433 -0.967,0.966 0,0.534 0.433,0.967 0.967,0.967 C -0.434,0.967 0,0.534 0,0", "id", "path1047-1-2", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "meteor", "transform", "matrix(0.81432985,0,0,0.81435846,-85.116449,76.13409)", 2, "fill", "#7b3b89", "fill-opacity", "0.01", "stroke", "#b4b4b4", "stroke-width", "0.962516", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.92503, 1.92503", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["d", "m 119.93419,175.53834 c 0.65451,-1.49016 2.64963,-2.30694 4.26245,-2.31466 1.02385,-0.005 1.70847,1.28033 2.71955,1.44343 0.5114,0.0824 1.06607,-0.48751 1.532,-0.2611 0.95526,0.46418 1.52012,2.80021 1.52012,2.80021 0,0 -0.99774,1.9665 -1.82454,2.64923 -0.60828,0.50229 -1.54924,0.45673 -2.1678,0.94944 -0.65793,0.52408 -0.71596,1.76236 -1.51062,2.03011 -1.23327,0.41551 -2.95829,-0.0529 -3.74537,-1.09884 -0.62659,-0.83264 0.0929,-2.10062 -0.0383,-3.13836 -0.13186,-1.04197 -1.1691,-2.09938 -0.74742,-3.05946 z", "id", "path2133", 0, "sodipodi", "nodetypes", "aaaacaaaaaaa", 2, "fill", "#c8b7b7", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.260787px", "stroke-linecap", "butt", "stroke-linejoin", "miter", "stroke-opacity", "1"], ["d", "m 128.04532,177.4501 c 0.31717,-0.62783 -1.04964,-3.43207 0.26355,-2.93143 0.45246,0.17248 0.0807,-0.12433 0.13932,-0.11266 1.04158,0.2076 1.52012,2.80021 1.52012,2.80021 0,0 -0.99774,1.9665 -1.82454,2.64923 -0.60828,0.50229 -1.54924,0.45673 -2.1678,0.94944 -0.65793,0.52408 -0.71596,1.76236 -1.51062,2.03011 -1.23327,0.41552 -2.92698,-0.0874 -3.74537,-1.09884 -0.27947,-0.34539 -0.33522,-1.11023 -0.10007,-1.32913 3.57217,-0.12686 4.91852,1.30673 7.42541,-2.95693 z", "id", "path2133-5", 0, "sodipodi", "nodetypes", "csacaaaacc", 2, "fill", "#ac9393", "fill-opacity", "0.902439", "stroke", "none", "stroke-width", "0.260787px", "stroke-linecap", "butt", "stroke-linejoin", "miter", "stroke-opacity", "1"], ["id", "path8657-4-7", "cx", "124.06939", "cy", "178.76283", "rx", "1.5630589", "ry", "1.4441329", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.312821", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path8657-4-7-6", "cx", "125.27673", "cy", "175.52039", "rx", "1.0046998", "ry", "1.009869", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.209727", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path8657-4-7-6-3", "cx", "121.37298", "cy", "175.85143", "rx", "1.2735393", "ry", "1.2166613", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.259176", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594", "transform", "translate(-2.5008215,-0.23503621)"], ["id", "path2860", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6", "transform", "matrix(0.8,0,0,0.8,25.777735,37.752125)"], ["id", "path2860-26", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6-3", "transform", "matrix(0.8,0,0,0.8,26.327752,35.387587)"], ["id", "path2860-26-9", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3-05", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6-1", "transform", "matrix(-0.13116937,-0.78917336,0.78917336,-0.13116937,1.1501266,296.35998)"], ["id", "path2860-26-0", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3-0", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-7", "transform", "matrix(1.1333333,0,0,1.1333333,-18.494037,-20.906932)"], ["id", "path2860-6", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-0", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g1148-4", "transform", "matrix(-0.01220081,-0.20135456,-0.20582509,-0.0035356,127.81606,174.70482)", 2, "fill", "#6c5353"], ["d", "M 0.37838417,0.40863902 C -0.26961583,0.40863902 -1.254,-0.332 -1.592,-0.886 c -1.969,-3.237 -5.5315395,-4.8587212 -9.598539,-4.8587212 -3.582,0 -6.674735,2.7301857 -8.728735,5.34118579 -0.346,0.44 -3.408056,3.83059781 -3.966056,3.83059781 -1.556,0 -3.225605,-1.4920513 -2.263605,-2.71505131 C -23.409935,-2.7739889 -15.963,-10.068 -11.181,-10.068 c 5.418,0 9.9774378,2.3011024 12.6084378,6.6121024 0.769,1.258 0.4249464,3.86453662 -1.04905363,3.86453662", "id", "path1150-6", 0, "sodipodi", "nodetypes", "ccssscscc", 2, "fill", "#6c5353", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1164-3", "transform", "matrix(0.14793893,0.36395297,0.36077306,-0.13836961,129.74311,185.31532)", 2, "fill", "#241c1c", "stroke-width", "1.00063", "stroke-miterlimit", "4", "stroke-dasharray", "none"], ["d", "m -17.882701,7.7655154 c 1.231629,-1.1037041 2.171032,-2.5818452 2.649142,-4.2957319 0.176923,-0.6337614 -0.198564,-1.2806918 -0.808328,-1.3619649 l -0.08486,-0.011315 c -0.49608,-0.066119 -0.95224,0.2785137 -1.09833,0.7930964 -0.35843,1.2603931 -1.047523,2.351646 -1.949021,3.1715693 -0.383583,0.3483782 -0.500758,0.9243097 -0.249161,1.3792777 l 0.04058,0.073573 c 0.31098,0.5618686 1.023478,0.6781714 1.499984,0.2514891", "id", "path1166-8", 2, "fill", "#241c1c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "1.00063", "stroke-miterlimit", "4", "stroke-dasharray", "none"], ["id", "sun", "transform", "matrix(4.0069956,0.0447624,-0.0447624,4.0069956,-348.16431,-700.00248)"], ["id", "g1132-7-5", "transform", "matrix(0.35277777,0,0,-0.35277777,119.43942,224.31719)", 2, "fill", "#ffad55", "fill-opacity", "1"], ["d", "M 0,0 V -0.05 C 0,-0.67 -0.04,-1.29 -0.12,-1.88 -0.2,-2.52 -0.32,-3.14 -0.471,-3.75 -0.641,-4.38 -0.841,-5 -1.08,-5.59 -3.29,-11.1 -8.69,-15 -15,-15 c -8.29,0 -15,6.72 -15,15 0,8.29 6.71,15 15,15 5.529,0 10.37,-3 12.97,-7.46 C -1.69,6.95 -1.38,6.34 -1.12,5.7 -0.86,5.07 -0.641,4.41 -0.471,3.73 -0.32,3.13 -0.2,2.521 -0.12,1.89 -0.04,1.271 0,0.64 0,0", "id", "path1134-4-6", 2, "fill", "#ffad55", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1136-1-9", "transform", "matrix(0.35277777,0,0,-0.35277777,117.11366,223.15291)", 2, "fill", "#ffda00", "fill-opacity", "1"], ["d", "m 0,0 c 0,-5.912 -4.793,-10.704 -10.704,-10.704 -5.912,0 -10.705,4.792 -10.705,10.704 0,5.912 4.793,10.705 10.705,10.705 C -4.793,10.705 0,5.912 0,0", "id", "path1138-2-5", 2, "fill", "#ffda00", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1144-6-5", "transform", "matrix(0.35277777,0,0,-0.35277777,119.43942,224.31719)", 2, "fill", "#ff512a", "fill-opacity", "1"], ["d", "m 0,0 v -0.05 h -3.29 c -1.04,0 -1.881,0.86 -1.881,1.89 0,1.03 0.841,1.89 1.881,1.89 h 2.819 C -0.32,3.13 -0.2,2.521 -0.12,1.89 -0.04,1.271 0,0.64 0,0", "id", "path1146-2-7", 2, "fill", "#ff512a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1148-5-2", "transform", "matrix(0.35277777,0,0,-0.35277777,118.09205,226.05694)", 2, "fill", "#ff7f2a"], ["d", "m 0,0 c -0.648,0 -1.254,-0.332 -1.592,-0.886 -1.969,-3.237 -5.522,-5.402 -9.589,-5.402 -3.582,0 -6.764,1.68 -8.818,4.291 -0.346,0.44 -0.887,0.68 -1.445,0.68 -1.556,0 -2.465,-1.8 -1.503,-3.023 2.739,-3.486 6.984,-5.728 11.766,-5.728 5.418,0 10.16,2.883 12.791,7.194 C 2.379,-1.616 1.474,0 0,0", "id", "path1150-4-3", 2, "fill", "#ff7f2a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1152-2-6", "transform", "matrix(0.35277777,0,0,-0.35277777,112.9723,219.58069)", 2, "fill", "#ffc455", "fill-opacity", "1"], ["d", "m 0,0 c 0.315,-0.714 -0.056,-1.53 -0.792,-1.791 -4.417,-1.563 -7.666,-5.563 -8.146,-10.385 -0.071,-0.68 -0.64,-1.19 -1.321,-1.19 -0.789,0 -1.409,0.68 -1.33,1.47 0.597,5.863 4.556,10.727 9.917,12.615 C -1.013,0.952 -0.282,0.64 0,0", "id", "path1154-5-1", 2, "fill", "#ffc455", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1156-9-8", "transform", "matrix(0.35277777,0,0,-0.35277777,109.89618,224.20916)", 2, "fill", "#fff555", "fill-opacity", "1", "stroke", "#fff555", "stroke-opacity", "1"], ["d", "M 0,0 C 0.385,2.08 1.108,3.986 2.08,5.624", "id", "path1158-2-6", 2, "fill", "#fff555", "fill-opacity", "1", "stroke", "#fff555", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g1160-5-3", "transform", "matrix(0.35277777,0,0,-0.35277777,111.79271,220.88138)", 2, "stroke", "#fff555", "stroke-opacity", "1"], ["d", "M 0,0 C 0.201,0.156 0.405,0.304 0.612,0.444", "id", "path1162-1-8", 2, "fill", "none", "stroke", "#fff555", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g1164-0-6", "transform", "matrix(0.35277777,0,0,-0.35277777,117.71035,228.22308)", 2, "fill", "#ff512a", "fill-opacity", "1"], ["d", "m 0,0 c -2.139,-1.959 -4.844,-3.3 -7.843,-3.751 -1.109,-0.167 -2.116,0.667 -2.116,1.788 v 0.156 c 0,0.912 0.684,1.653 1.585,1.793 2.207,0.344 4.203,1.326 5.789,2.757 0.674,0.609 1.672,0.682 2.383,0.118 L -0.087,2.77 C 0.791,2.073 0.827,0.758 0,0", "id", "path1166-2-6", 2, "fill", "#ff512a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1168-6-9", "transform", "matrix(0.52726219,0,0,-0.35277777,116.49208,225.6401)", 2, "fill", "#fff555", "fill-opacity", "1"], ["d", "m 0,0 h -3.349 c -1.039,0 -1.881,0.843 -1.881,1.883 0,1.039 0.842,1.882 1.881,1.882 L 0,3.765 C 1.039,3.765 1.882,2.922 1.882,1.883 1.882,0.843 1.039,0 0,0", "id", "path1170-2-8", 2, "fill", "#fff555", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1172-0-8", "transform", "matrix(0.35277777,0,0,-0.35277777,114.04372,222.99927)", 2, "fill", "#ff7f2a", "fill-opacity", "1"], ["d", "m 0,0 h -3.349 c -1.039,0 -1.881,0.843 -1.881,1.882 0,1.04 0.842,1.883 1.881,1.883 L 0,3.765 C 1.039,3.765 1.882,2.922 1.882,1.882 1.882,0.843 1.039,0 0,0", "id", "path1174-6-1", 2, "fill", "#ff7f2a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1176-1-2", "transform", "matrix(0.35277777,0,0,-0.35277777,116.82565,222.33521)", 2, "fill", "#fff555", "fill-opacity", "1"], ["d", "m 0,0 h -0.732 c -1.04,0 -1.883,0.843 -1.883,1.882 0,1.04 0.843,1.883 1.883,1.883 L 0,3.765 C 1.04,3.765 1.883,2.922 1.883,1.882 1.883,0.843 1.04,0 0,0", "id", "path1178-3-9", 2, "fill", "#fff555", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1204-7-8", "transform", "matrix(0.35277777,0,0,-0.35277777,115.01043,220.63453)", 2, "fill", "#ffc455", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.965 -0.782,-1.748 -1.747,-1.748 -0.966,0 -1.748,0.783 -1.748,1.748 0,0.965 0.782,1.748 1.748,1.748 C -0.782,1.748 0,0.965 0,0", "id", "path1206-5-0", 2, "fill", "#ffc455", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "portal", "transform", "matrix(0.63452719,0,0,0.3290595,116.43902,29.665972)"], ["id", "ellipse7459", "cx", "72.415215", "cy", "92.530159", "rx", "12.632149", "ry", "57.184006", 2, "fill", "#310241", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.307489", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "0.307489, 0.922467", "stroke-opacity", "1"], ["id", "path7811", 0, "sodipodi", "type", "arc", 0, "sodipodi", "cx", "92.898201", 0, "sodipodi", "cy", "-74.309357", 0, "sodipodi", "rx", "48.364288", 0, "sodipodi", "ry", "10.625179", 0, "sodipodi", "start", "0", 0, "sodipodi", "end", "3.1476839", 0, "sodipodi", "open", "true", 0, "sodipodi", "arc-type", "arc", "d", "m 141.26249,-74.309357 a 48.364288,10.625179 0 0 1 -24.26724,9.212443 48.364288,10.625179 0 0 1 -48.44908,-0.03242 48.364288,10.625179 0 0 1 -24.01136,-9.244746", "transform", "matrix(-1.7919108e-4,0.99999998,-0.99999997,-2.5128272e-4,0,0)", 2, "fill", "#030206", "fill-opacity", "1", "stroke", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "1, 3", "stroke-opacity", "1"], ["id", "portalOver", 0, "sodipodi", "type", "arc", 0, "sodipodi", "cx", "92.935478", 0, "sodipodi", "cy", "74.307602", 0, "sodipodi", "rx", "48.364513", 0, "sodipodi", "ry", "10.625179", 0, "sodipodi", "start", "0", 0, "sodipodi", "end", "3.1476839", 0, "sodipodi", "open", "true", 0, "sodipodi", "arc-type", "arc", "d", "M 141.29999,74.307602 A 48.364513,10.625179 0 0 1 117.03264,83.520045 48.364513,10.625179 0 0 1 68.583334,83.487628 48.364513,10.625179 0 0 1 44.571862,74.242882", "transform", "matrix(1.7919108e-4,0.99999998,0.99999997,-2.5128272e-4,0,0)", 2, "fill", "url(#linearGradient928)", "fill-opacity", "1", "stroke", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "1, 3", "stroke-opacity", "1"], ["id", "startBtn", "transform", "matrix(0.50377637,0,0,0.50377637,8.0387157,-1.5637735)"], ["id", "rect1154", "d", "m 12.452459,6.7165618 h 26.698 c 1.318841,0 2.380578,1.0617378 2.380578,2.380578 V 20.79514 c 0,1.31884 -1.061737,2.380578 -2.380578,2.380578 h -26.698 c -1.31884,0 -2.380578,-1.061738 -2.380578,-2.380578 V 9.0971398 c 0,-1.3188402 1.061738,-2.380578 2.380578,-2.380578 z", 2, "fill", "#c8c8c8", "stroke", "#b4b4b4", "stroke-width", "0.540845", "stroke-linecap", "round", "stroke-linejoin", "round"], ["aria-label", "Start", "id", "text2190", 2, "font-weight", "600", "font-size", "8.46667px", "line-height", "1.25", "font-family", "Poppins", "-inkscape-font-specification", "Poppins, Semi-Bold", "stroke-width", "0.264583"], ["d", "m 17.192868,17.969076 q -0.618067,0 -1.117601,-0.211667 -0.491066,-0.211667 -0.778933,-0.6096 Q 15.008467,16.749875 15,16.208008 h 1.270001 q 0.0254,0.364067 0.254,0.575734 0.237067,0.211667 0.643467,0.211667 0.414867,0 0.651933,-0.194734 0.237067,-0.2032 0.237067,-0.524933 0,-0.262467 -0.160867,-0.4318 -0.160866,-0.169334 -0.4064,-0.262467 -0.237066,-0.1016 -0.6604,-0.220134 -0.575734,-0.169333 -0.9398,-0.3302 -0.355601,-0.169333 -0.618067,-0.499533 -0.254,-0.338667 -0.254,-0.897467 0,-0.524934 0.262466,-0.914401 0.262467,-0.389466 0.736601,-0.592667 0.474133,-0.211666 1.083733,-0.211666 0.914401,0 1.481668,0.448733 0.575733,0.440267 0.635,1.236134 h -1.303867 q -0.01693,-0.3048 -0.262467,-0.499533 -0.237067,-0.203201 -0.635,-0.203201 -0.347134,0 -0.5588,0.177801 -0.203201,0.1778 -0.203201,0.516466 0,0.237067 0.152401,0.397934 0.160866,0.1524 0.389466,0.254 0.237067,0.09313 0.660401,0.220133 0.575733,0.169334 0.9398,0.338667 0.364067,0.169334 0.626534,0.508 0.262466,0.338667 0.262466,0.889001 0,0.474133 -0.245533,0.880533 -0.245534,0.406401 -0.719667,0.651934 -0.474134,0.237067 -1.126067,0.237067 z", "id", "path6925"], ["d", "m 21.688663,14.192941 v 2.269068 q 0,0.237066 0.110067,0.347133 0.118533,0.1016 0.389467,0.1016 h 0.550333 v 0.999067 h -0.745067 q -1.4986,0 -1.4986,-1.456267 v -2.260601 h -0.5588 v -0.973667 h 0.5588 V 12.05934 h 1.1938 v 1.159934 h 1.049867 v 0.973667 z", "id", "path6927"], ["d", "m 23.288852,15.547608 q 0,-0.7112 0.2794,-1.261534 0.287867,-0.550333 0.770467,-0.846667 0.491067,-0.296333 1.0922,-0.296333 0.524934,0 0.914401,0.211667 0.397933,0.211666 0.635,0.5334 v -0.668867 h 1.193801 v 4.690535 H 26.98032 v -0.6858 q -0.2286,0.3302 -0.635,0.550333 -0.397934,0.211667 -0.922867,0.211667 -0.592667,0 -1.083734,-0.3048 -0.4826,-0.3048 -0.770467,-0.855134 -0.2794,-0.5588 -0.2794,-1.278467 z m 3.691468,0.01693 q 0,-0.431801 -0.169333,-0.736601 -0.169334,-0.313267 -0.4572,-0.474133 -0.287867,-0.169334 -0.618067,-0.169334 -0.330201,0 -0.609601,0.160867 -0.2794,0.160867 -0.4572,0.474134 -0.169333,0.3048 -0.169333,0.728133 0,0.423334 0.169333,0.745067 0.1778,0.313267 0.4572,0.4826 0.287867,0.169334 0.609601,0.169334 0.3302,0 0.618067,-0.160867 0.287866,-0.169333 0.4572,-0.474134 0.169333,-0.313266 0.169333,-0.745066 z", "id", "path6929"], ["d", "m 30.519383,13.947408 q 0.2286,-0.372534 0.592667,-0.584201 0.372534,-0.211666 0.846667,-0.211666 v 1.2446 H 31.64545 q -0.5588,0 -0.846667,0.262467 -0.2794,0.262467 -0.2794,0.9144 v 2.336801 H 29.33405 v -4.690535 h 1.185333 z", "id", "path6931"], ["d", "m 34.134646,14.192941 v 2.269068 q 0,0.237066 0.110067,0.347133 0.118533,0.1016 0.389467,0.1016 h 0.550333 v 0.999067 h -0.745067 q -1.4986,0 -1.4986,-1.456267 v -2.260601 h -0.558801 v -0.973667 h 0.558801 V 12.05934 h 1.1938 v 1.159934 h 1.049867 v 0.973667 z", "id", "path6933"], ["id", "clearBtn", "transform", "matrix(0.50377637,0,0,0.50377637,9.6262158,-1.5637735)"], ["id", "rect1570", "d", "m 47.37748,6.7165618 h 26.698001 c 1.31884,0 2.380578,1.0617376 2.380578,2.3805776 V 20.795138 c 0,1.31884 -1.061738,2.380578 -2.380578,2.380578 H 47.37748 c -1.31884,0 -2.380578,-1.061738 -2.380578,-2.380578 V 9.0971394 c 0,-1.31884 1.061738,-2.3805776 2.380578,-2.3805776 z", 2, "fill", "#c8c8c8", "stroke", "#b4b4b4", "stroke-width", "0.540845", "stroke-linecap", "round", "stroke-linejoin", "round"], ["aria-label", "Clear", "id", "text4232", 2, "font-weight", "600", "font-size", "8.46667px", "line-height", "1.25", "font-family", "Poppins", "-inkscape-font-specification", "Poppins, Semi-Bold", "stroke-width", "0.264583"], ["d", "m 49.376,15.28514 q 0,-0.872067 0.389466,-1.557868 0.397934,-0.694267 1.075268,-1.075267 0.6858,-0.389467 1.532467,-0.389467 0.9906,0 1.735667,0.508001 0.745067,0.508 1.041401,1.405467 h -1.363134 q -0.2032,-0.423334 -0.575734,-0.635 -0.364067,-0.211667 -0.846667,-0.211667 -0.516467,0 -0.922867,0.245533 -0.397933,0.237067 -0.626534,0.677334 -0.220133,0.440267 -0.220133,1.032934 0,0.5842 0.220133,1.032933 0.228601,0.440267 0.626534,0.685801 0.4064,0.237066 0.922867,0.237066 0.4826,0 0.846667,-0.211666 0.372534,-0.220134 0.575734,-0.643467 h 1.363134 q -0.296334,0.905933 -1.041401,1.413934 -0.7366,0.499533 -1.735667,0.499533 -0.846667,0 -1.532467,-0.381 Q 50.1634,17.528807 49.765466,16.843007 49.376,16.157207 49.376,15.28514 Z", "id", "path6937"], ["d", "m 57.3516,11.983138 v 6.265336 h -1.185334 v -6.265336 z", "id", "path6939"], ["d", "m 62.880334,15.801606 q 0,0.254001 -0.03387,0.457201 h -3.429001 q 0.04233,0.508 0.3556,0.795867 0.313267,0.287866 0.770467,0.287866 0.6604,0 0.9398,-0.567266 h 1.278468 q -0.203201,0.677333 -0.778934,1.1176 -0.575734,0.4318 -1.413934,0.4318 -0.677334,0 -1.2192,-0.296333 -0.533401,-0.3048 -0.838201,-0.855134 -0.296333,-0.550334 -0.296333,-1.27 0,-0.728134 0.296333,-1.278468 0.296334,-0.550333 0.829734,-0.846667 0.5334,-0.296333 1.227667,-0.296333 0.668867,0 1.193801,0.287867 0.5334,0.287866 0.821266,0.821267 0.296334,0.524933 0.296334,1.210733 z M 61.652667,15.46294 q -0.0085,-0.457201 -0.3302,-0.728134 -0.321734,-0.2794 -0.787401,-0.2794 -0.440266,0 -0.745067,0.270933 -0.296333,0.262467 -0.364066,0.736601 z", "id", "path6941"], ["d", "m 63.439123,15.886273 q 0,-0.7112 0.279401,-1.261534 0.287866,-0.550333 0.770466,-0.846667 0.491067,-0.296333 1.092201,-0.296333 0.524933,0 0.9144,0.211667 0.397934,0.211666 0.635001,0.5334 v -0.668867 h 1.1938 v 4.690535 h -1.1938 v -0.6858 q -0.228601,0.3302 -0.635001,0.550333 -0.397933,0.211667 -0.922867,0.211667 -0.592667,0 -1.083734,-0.3048 -0.4826,-0.3048 -0.770466,-0.855134 -0.279401,-0.5588 -0.279401,-1.278467 z m 3.691469,0.01693 q 0,-0.431801 -0.169334,-0.736601 -0.169333,-0.313267 -0.4572,-0.474133 -0.287867,-0.169334 -0.618067,-0.169334 -0.3302,0 -0.6096,0.160867 -0.2794,0.160867 -0.4572,0.474134 -0.169334,0.3048 -0.169334,0.728133 0,0.423334 0.169334,0.745067 0.1778,0.313267 0.4572,0.4826 0.287867,0.169334 0.6096,0.169334 0.3302,0 0.618067,-0.160867 0.287867,-0.169333 0.4572,-0.474134 0.169334,-0.313266 0.169334,-0.745066 z", "id", "path6943"], ["d", "m 70.669656,14.286073 q 0.2286,-0.372534 0.592667,-0.584201 0.372533,-0.211666 0.846667,-0.211666 v 1.2446 h -0.313267 q -0.5588,0 -0.846667,0.262467 -0.2794,0.262467 -0.2794,0.9144 v 2.336801 h -1.185334 v -4.690535 h 1.185334 z", "id", "path6945"], ["id", "right", "data-name", "Layer 2", "transform", "matrix(0.07975875,0,0,0.0715708,56.358554,118.60999)"], ["id", "Layer_1-2", "data-name", "Layer 1"], ["x", "66.599998", "y", "40.200001", "width", "16.299999", "height", "8.0799999", "transform", "rotate(180,74.7,44.2)", "fill", "#1b75bb", "id", "rect1351"], ["d", "M 0,77.1 V 22.8 A 14.4,14.4 0 0 1 8.1,10.1 17.8,17.8 0 0 1 24.3,10.2 L 75,37.4 A 14.3,14.3 0 0 1 82.9,49.9 14.4,14.4 0 0 1 75,62.5 L 24.3,89.7 A 17.8,17.8 0 0 1 8.1,89.8 14.4,14.4 0 0 1 0,77.1 Z", "fill", "#1b75bb", "id", "path1353", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 0,68.9 V 14.6 A 14.4,14.4 0 0 1 8.1,1.9 17.6,17.6 0 0 1 24.2,2 L 75,29.2 A 14.4,14.4 0 0 1 82.9,41.8 14.3,14.3 0 0 1 75,54.3 L 24.2,81.5 A 17.6,17.6 0 0 1 8.1,81.6 14.4,14.4 0 0 1 0,68.9 Z", "fill", "#2bbced", "id", "path1355", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "up", "data-name", "Layer 2", "transform", "matrix(0.07939898,-2.0202956e-4,2.0202956e-4,0.07939898,48.951586,113.22312)"], ["id", "Layer_1-2-7", "data-name", "Layer 1"], ["d", "M 81.6,60.4 55.1,16 A 15,15 0 0 0 29.6,16 L 3,60.4 H 0 v 8.9 0 a 15.1,15.1 0 0 0 1.9,7.4 15.1,15.1 0 0 0 12.9,7.3 h 55.1 a 14.8,14.8 0 0 0 12.8,-7.3 14.2,14.2 0 0 0 2,-7.4 v 0 -8.9 z", "fill", "#1b75bb", "id", "path8923", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 14.8,75.1 H 69.9 A 14.8,14.8 0 0 0 82.7,67.8 14.2,14.2 0 0 0 82.6,53.2 L 55.1,7.2 a 14.9,14.9 0 0 0 -25.5,0 l -27.5,46 a 14.4,14.4 0 0 0 -0.2,14.6 15.1,15.1 0 0 0 12.9,7.3 z", "fill", "#2bbced", "id", "path8925", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "left", "data-name", "Layer 2", "transform", "matrix(0.086725,0,0,0.07180546,41.47607,118.61013)"], ["id", "Layer_1-2-2", "data-name", "Layer 1"], ["x", "8.8999996", "y", "41.099998", "width", "14.9", "height", "8.0799999", "fill", "#1b75bb", "id", "rect1436"], ["d", "M 76.2,76.8 V 22.5 A 14.5,14.5 0 0 0 68.8,9.8 15.2,15.2 0 0 0 53.9,9.9 L 7.3,37.1 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#1b75bb", "id", "path1438", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 76.2,68.9 V 14.6 A 14.5,14.5 0 0 0 68.8,1.9 15.2,15.2 0 0 0 53.9,2 L 7.3,29.2 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#2bbced", "id", "path1440", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "blank-meteor-0", "transform", "matrix(2.7409696,0,0,2.7410659,-294.40204,-371.86964)", 2, "fill", "#543b89", "fill-opacity", "0.01", "stroke", "#b4b4b4", "stroke-width", "0.962516", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.92503, 1.92503", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["d", "m 110.88039,173.77746 c 0.18794,-0.42788 0.76082,-0.66241 1.22392,-0.66462 0.29399,-9.8e-4 0.49058,0.36763 0.7809,0.41446 0.14685,0.0236 0.30611,-0.13998 0.4399,-0.0749 0.27429,0.13328 0.43649,0.80406 0.43649,0.80406 0,0 -0.28649,0.56466 -0.52391,0.7607 -0.17466,0.14422 -0.44484,0.13114 -0.62246,0.27262 -0.18891,0.15049 -0.20557,0.50604 -0.43375,0.58293 -0.35413,0.11931 -0.84946,-0.0152 -1.07545,-0.31553 -0.17993,-0.23908 0.0267,-0.60317 -0.011,-0.90115 -0.0379,-0.29919 -0.3357,-0.60282 -0.21462,-0.8785 z", "id", "path4756", 0, "sodipodi", "nodetypes", "aaaacaaaaaaa", 2, "fill", "#543b89", "fill-opacity", "0.01", "stroke", "#bebebe", "stroke-width", "0.0939932", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "0.187986, 0.187986", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "down", "data-name", "Layer 2", "transform", "matrix(0.07765434,0,0,0.07765434,49.0387,123.88264)"], ["id", "Layer_1-2-78", "data-name", "Layer 1"], ["d", "M 69.9,8.9 H 14.8 a 15,15 0 0 0 -11,4.8 H 0 v 9.5 0 a 13.9,13.9 0 0 0 2.1,7.6 l 27.5,46.1 a 15,15 0 0 0 25.5,0 L 82.6,30.8 a 14.8,14.8 0 0 0 2.1,-7.6 v 0 -9.5 h -3.8 a 15,15 0 0 0 -11,-4.8 z", "fill", "#1b75bb", "id", "path9041", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 69.9,0 H 14.8 A 15.1,15.1 0 0 0 1.9,7.3 14.6,14.6 0 0 0 2.1,22 l 27.5,46 a 14.9,14.9 0 0 0 25.5,0 L 82.6,22 A 14.4,14.4 0 0 0 82.7,7.3 14.8,14.8 0 0 0 69.9,0 Z", "fill", "#2bbced", "id", "path9043", 2, "fill", "#faf56f", "fill-opacity", "1"]], template: function MoonfactoryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "defs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "linearGradient", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "stop", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "stop", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "linearGradient", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "linearGradient", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "linearGradient", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "stop", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "stop", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "rect", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "use", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "use", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "use", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "use", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "use", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "use", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "use", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "use", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "use", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "use", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "use", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "use", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "use", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "use", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "use", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "use", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "use", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "use", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "use", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "g", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "g", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "path", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "g", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "path", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "g", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "path", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "g", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "path", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "g", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "path", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "path", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "g", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "path", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "g", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "path", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "g", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "path", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "g", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "path", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "g", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "path", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "g", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "path", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "g", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "path", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "g", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "path", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "g", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "path", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "g", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "path", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "g", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "path", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "g", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "path", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "g", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "path", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "g", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "path", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "g", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "path", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "g", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "path", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "g", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "path", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "g", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](81, "path", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "g", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "path", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "path", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "g", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "path", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "g", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "g", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "path", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "g", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "path", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "g", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "path", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "g", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](95, "path", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "g", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "path", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "g", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "path", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "g", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "path", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "g", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "path", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "g", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "path", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "g", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "path", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "g", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "path", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "g", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](111, "path", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "g", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "path", 113);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "g", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "path", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "g", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "path", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "g", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "path", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "g", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](121, "path", 121);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "g", 122);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "path", 123);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "g", 124);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](125, "path", 125);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "g", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "path", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "g", 128);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](129, "path", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "g", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "path", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "g", 132);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](133, "path", 133);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "g", 134);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](135, "path", 135);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "g", 136);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "path", 137);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](138, "path", 138);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](139, "ellipse", 139);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](140, "ellipse", 140);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](141, "ellipse", 141);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "g", 142);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](143, "circle", 143);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](144, "circle", 144);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "g", 145);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](146, "circle", 146);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](147, "circle", 147);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "g", 148);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](149, "circle", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](150, "circle", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "g", 151);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "circle", 152);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](153, "circle", 153);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "g", 154);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](155, "circle", 155);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](156, "circle", 156);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "g", 157);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](158, "path", 158);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "g", 159);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](160, "path", 160);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "g", 161);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "g", 162);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "path", 163);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "g", 164);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](165, "path", 165);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "g", 166);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](167, "path", 167);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "g", 168);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](169, "path", 169);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "g", 170);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](171, "path", 171);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "g", 172);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](173, "path", 173);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "g", 174);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](175, "path", 175);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "g", 176);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](177, "path", 177);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "g", 178);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](179, "path", 179);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "g", 180);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](181, "path", 181);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "g", 182);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](183, "path", 183);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "g", 184);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](185, "path", 185);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "g", 186);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](187, "ellipse", 187);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "path", 188);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](189, "path", 189);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "g", 190);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](191, "path", 191);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](192, "g", 192);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](193, "path", 193);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](194, "path", 194);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](195, "path", 195);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](196, "path", 196);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](197, "path", 197);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "g", 198);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](199, "path", 199);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "g", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](201, "path", 201);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](202, "path", 202);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](203, "path", 203);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](204, "path", 204);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](205, "path", 205);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "g", 206);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "g", 207);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](208, "rect", 208);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](209, "path", 209);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](210, "path", 210);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "g", 211);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "g", 212);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](213, "path", 213);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](214, "path", 214);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "g", 215);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "g", 216);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](217, "rect", 217);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](218, "path", 218);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](219, "path", 219);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "g", 220);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](221, "path", 221);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "g", 222);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "g", 223);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](224, "path", 224);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](225, "path", 225);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["svg[_ngcontent-%COMP%] {\r\n    height: auto;\r\n    width: auto;\r\n    min-width: 300px;\r\n    max-height: 90%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9vbmZhY3RvcnkvbW9vbmZhY3RvcnkuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9tb29uZmFjdG9yeS9tb29uZmFjdG9yeS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsic3ZnIHtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxuICAgIG1heC1oZWlnaHQ6IDkwJTtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MoonfactoryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-moonfactory',
                templateUrl: './moonfactory.component.html',
                styleUrls: ['./moonfactory.component.css']
            }]
    }], function () { return []; }, null); })();
var totalNumM = 0;
var filledMeteors = [];
var sunArr = [];
var moonArr = [];
var planetArr = [];
function getColCoords(numRows, newX, newY, delta) {
    var col = [];
    for (var i = 0; i < numRows; i++) {
        col.push({ x: newX, y: newY + i * delta });
    }
    return col;
}
var sunCoords = getColCoords(2, 180, -200, 60);
var planetCoords = (getColCoords(5, 200, -90, 30)).concat(getColCoords(4, 230, -90, 30));
var moonCoords = getColCoords(9, 140, -15, 15);
var asteroidColCoords = getColCoords(10, 9, -160, 10).reverse();
var coordsM = getGridCoords(-101.4, -70.5, 10, 10, 10);
function fill(num, filledRects) {
    if (num > 100)
        totalNumM = 100;
    else if (num < 0)
        totalNumM = 0;
    else
        totalNumM = num;
    var index = 0;
    filledRects.forEach(obj => {
        if (obj.on == false && index < totalNumM) {
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "visible" });
            obj.on = true;
        }
        else if (obj.on == true && index >= totalNumM) {
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "hidden" });
            obj.on = false;
        }
        index++;
    });
}
function getGridCoords(newX, newY, numRows, numCols, delta) {
    var coords = [];
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            coords.push({ x: newX + j * delta, y: newY + i * -delta });
        }
    }
    return coords;
}
function setup(meteor, moon, planet, sun) {
    // ARROWS ///////////////////
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    up.addEventListener('click', function () { fill(totalNumM + 10, filledMeteors); });
    down.addEventListener('click', function () { fill(totalNumM - 10, filledMeteors); });
    left.addEventListener('click', function () { fill(totalNumM - 1, filledMeteors); });
    right.addEventListener('click', function () { fill(totalNumM + 1, filledMeteors); });
    const start = document.getElementById("startBtn");
    start.addEventListener('click', function () { play(meteor, moon, planet, sun); });
    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener('click', function () { clear(); });
    // BLOCKS //////////////////
    const blankMeteor = document.getElementById("blank-meteor-0");
    const layer = document.getElementById("layer1");
    var blankMeteors = [];
    //meteors///////////////////
    var index = 0;
    coordsM.forEach(c => {
        var temp = blankMeteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x, y: c.y });
        blankMeteors.push({ el: temp, num: index });
        layer.appendChild(temp);
        index++;
    });
    blankMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledMeteors);
        });
    });
    index = 0;
    coordsM.forEach(c => {
        var temp = meteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x - 9.13, y: c.y - 0.2, visibility: "hidden" });
        filledMeteors.push({ el: temp, num: index, on: false });
        layer.appendChild(temp);
        index++;
    });
    filledMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledMeteors);
        });
    });
}
function play(meteor, moon, planet, sun) {
    var tl = gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].timeline({ paused: true });
    const layer = document.getElementById("layer1");
    const layer0 = document.getElementById("layer3");
    var meteorArr = [];
    for (var i = 0; i < totalNumM; i++) {
        var temp = meteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: coordsM[i].x - 9.13, y: coordsM[i].y - 0.2 });
        meteorArr.push(temp);
        layer.appendChild(temp);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledMeteors[i].el, { visibility: "hidden" });
        filledMeteors[i].on = false;
    }
    var numSuns = Math.floor(totalNumM / 100);
    totalNumM -= numSuns * 100;
    var numPlanets = Math.floor(totalNumM / 10);
    totalNumM -= numPlanets * 10;
    var numMoons = totalNumM;
    //console.log(numSuns, numPlanets, numMoons);
    var moonIndex = 0;
    var meteorPortalX = 40;
    var meteorPortalY = -115;
    var planetPortalX = 142;
    var planetPortalY = -40;
    tl.to(meteor, { duration: 1 });
    if (numSuns > 0) {
        for (var i = 0; i < numSuns; i++) {
            for (var j = 0; j < 100; j++) {
                tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0");
                moonIndex++;
            }
            var tempSun = sun.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempSun, { x: 50, y: -160, scale: 0 });
            layer0.appendChild(tempSun);
            sunArr.push(tempSun);
            tl.to(tempSun, { duration: 0.25 });
            tl.to(tempSun, { x: sunCoords[i].x, y: sunCoords[i].y, scale: 4, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempSun, { duration: 0.25 });
        }
    }
    if (numPlanets > 0) {
        for (var i = 0; i < numPlanets; i++) {
            for (var j = 0; j < 10; j++) {
                tl.to(meteorArr[moonIndex], { x: asteroidColCoords[j].x, y: asteroidColCoords[j].y, duration: 1 }, "<+=0");
                moonIndex++;
            }
            moonIndex -= 10;
            tl.to(meteor, { duration: 0.001 });
            for (var j = 0; j < 10; j++) {
                tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0.15");
                moonIndex++;
            }
            var tempPlanet = planet.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempPlanet, { x: planetPortalX, y: planetPortalY, scale: 0 });
            layer0.appendChild(tempPlanet);
            planetArr.push(tempPlanet);
            tl.to(tempPlanet, { duration: 0.25 });
            tl.to(tempPlanet, { x: planetCoords[i].x, y: planetCoords[i].y, scale: 0.8, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempPlanet, { duration: 0.25 });
        }
    }
    if (numMoons > 0) {
        for (var i = 0; i < numMoons; i++) {
            tl.to(meteorArr[moonIndex], { x: meteorPortalX - 20, y: meteorPortalY, duration: 1 }, "<+=0");
            tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY + 3, scale: 0, duration: 0.5 });
            moonIndex++;
            var tempMoon = moon.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempMoon, { x: 115, y: 14, scale: 0 });
            layer0.appendChild(tempMoon);
            moonArr.push(tempMoon);
            tl.to(tempMoon, { duration: 0.25 });
            tl.to(tempMoon, { x: moonCoords[i].x, y: moonCoords[i].y, scale: 0.55, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempMoon, { duration: 0.25 });
        }
    }
    tl.play();
    totalNumM = 0;
    gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].registerPlugin(gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"]);
    sunArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
    planetArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
    moonArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
}
function clear() {
    sunArr.forEach(el => {
        el.remove();
    });
    planetArr.forEach(el => {
        el.remove();
    });
    moonArr.forEach(el => {
        el.remove();
    });
}


/***/ }),

/***/ "./src/app/planetfactory/planetfactory.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/planetfactory/planetfactory.component.ts ***!
  \**********************************************************/
/*! exports provided: PlanetfactoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanetfactoryComponent", function() { return PlanetfactoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");
/* harmony import */ var gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap/Draggable */ "./node_modules/gsap/Draggable.js");




class PlanetfactoryComponent {
    constructor() { }
    //ngOnInit(): void { }
    ngAfterViewInit() {
        var meteor = document.getElementById("meteor");
        var moon = document.getElementById("moon");
        var planet = document.getElementById("planet");
        var sun = document.getElementById("sun");
        setup(meteor, moon, planet, sun);
    }
}
PlanetfactoryComponent.ɵfac = function PlanetfactoryComponent_Factory(t) { return new (t || PlanetfactoryComponent)(); };
PlanetfactoryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlanetfactoryComponent, selectors: [["app-planetfactory"]], decls: 248, vars: 0, consts: [["viewBox", "0 0 350 160", "version", "1.1", "id", "svg104056", 0, "inkscape", "version", "1.2 (dc2aedaf03, 2022-05-15)", 0, "sodipodi", "docname", "planet-factory-start.svg", 0, "xmlns", "inkscape", "http://www.inkscape.org/namespaces/inkscape", 0, "xmlns", "sodipodi", "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "svg", "http://www.w3.org/2000/svg"], ["id", "defs104053"], [0, "inkscape", "collect", "always", "id", "linearGradient926"], ["offset", "0", "id", "stop922", 2, "stop-color", "#030206", "stop-opacity", "1"], ["offset", "1", "id", "stop924", 2, "stop-color", "#030206", "stop-opacity", "0"], [0, "inkscape", "collect", "always", 0, "xlink", "href", "#linearGradient926", "id", "linearGradient928", "x1", "87.99234", "y1", "82.346176", "x2", "87.958092", "y2", "22.368448", "gradientUnits", "userSpaceOnUse"], [0, "inkscape", "collect", "always", 0, "xlink", "href", "#linearGradient1617", "id", "linearGradient1619", "x1", "54.85815", "y1", "292.35101", "x2", "54.39325", "y2", "155.20563", "gradientUnits", "userSpaceOnUse", "gradientTransform", "matrix(2.3440685,0,0,1.0715743,112.08686,-208.48271)"], [0, "inkscape", "collect", "always", "id", "linearGradient1617"], ["offset", "0", "id", "stop1613", 2, "stop-color", "#000080", "stop-opacity", "1"], ["offset", "1", "id", "stop1615", 2, "stop-color", "#ea0880", "stop-opacity", "0.75166297"], [0, "inkscape", "groupmode", "layer", "id", "layer3", 0, "inkscape", "label", "Layer 0"], ["id", "background", "transform", "matrix(1.5,0,0,1.5,-168.93546,-4.2941552)"], ["id", "rect1457", "width", "233.33333", "height", "106.66666", "x", "112.62364", "y", "2.8627701", 2, "fill", "url(#linearGradient1619)", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.725832", "stroke-dasharray", "1.45165, 1.45165"], [0, "sodipodi", "type", "star", "id", "path1723", 0, "inkscape", "flatsided", "false", 0, "sodipodi", "sides", "4", 0, "sodipodi", "cx", "166.86954", 0, "sodipodi", "cy", "127.64845", 0, "sodipodi", "r1", "6.0275807", 0, "sodipodi", "r2", "2.1155381", 0, "sodipodi", "arg1", "-1.5304533", 0, "sodipodi", "arg2", "-0.68267888", 0, "inkscape", "rounded", "0", 0, "inkscape", "randomized", "0", "transform", "matrix(0.22507942,0,0,0.40135795,91.340093,-31.47695)", "d", "m 167.11264,121.62578 1.39831,4.68804 4.38126,1.57774 -4.68804,1.39831 -1.57774,4.38126 -1.39831,-4.68804 -4.38126,-1.57774 4.68804,-1.39831 z", 2, "opacity", "0.7", "fill", "#ffffff", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "1.74614", "stroke-miterlimit", "4", "stroke-dasharray", "3.49228, 3.49228", "stroke-dashoffset", "0"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079", "transform", "translate(77.42746,42.16648)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-9", "transform", "translate(36.01892,28.25555)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3", "transform", "translate(-2.84162,75.96139)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-1", "transform", "translate(21.410468,62.94946)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-2", "transform", "translate(36.602113,-7.49926)", "width", "100%", "height", "100%", 2, "opacity", "0.7"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-0", "transform", "translate(71.186833,80.15224)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-6", "transform", "translate(7.16223,30.51535)", "width", "100%", "height", "100%", 2, "opacity", "0.4"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-2", "transform", "translate(77.793128,-5.41086)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-27", "transform", "translate(53.253525,11.53315)", "width", "100%", "height", "100%", 2, "opacity", "0.3"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use2079-3-8", "transform", "translate(-12.47756,18.8366)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4455", "transform", "translate(97.836136,14.611497)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4457", "transform", "translate(139.24492,28.522427)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4459", "transform", "translate(138.66172,64.277237)", "width", "100%", "height", "100%", 2, "opacity", "0.7"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4461", "transform", "translate(128.04543,2.8770742)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4463", "transform", "translate(97.470476,62.188843)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use4465", "transform", "translate(122.01024,45.244827)", "width", "100%", "height", "100%", 2, "opacity", "0.3"], [0, "sodipodi", "type", "star", "id", "path7951", 0, "inkscape", "flatsided", "false", 0, "sodipodi", "sides", "4", 0, "sodipodi", "cx", "166.86954", 0, "sodipodi", "cy", "127.64845", 0, "sodipodi", "r1", "6.0275807", 0, "sodipodi", "r2", "2.1155381", 0, "sodipodi", "arg1", "-1.5304533", 0, "sodipodi", "arg2", "-0.68267888", 0, "inkscape", "rounded", "0", 0, "inkscape", "randomized", "0", "transform", "matrix(-0.22507942,0,0,-0.40135795,357.35641,114.09322)", "d", "m 167.11264,121.62578 1.39831,4.68804 4.38126,1.57774 -4.68804,1.39831 -1.57774,4.38126 -1.39831,-4.68804 -4.38126,-1.57774 4.68804,-1.39831 z", 2, "opacity", "0.7", "fill", "#ffffff", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "1.74614", "stroke-miterlimit", "4", "stroke-dasharray", "3.49228, 3.49228", "stroke-dashoffset", "0"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7953", "transform", "rotate(180,206.3389,27.180323)", "width", "100%", "height", "100%"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7955", "transform", "rotate(180,220.76725,26.050423)", "width", "100%", "height", "100%", 2, "opacity", "0.4"], ["x", "0", "y", "0", 0, "xlink", "href", "#path1723", "id", "use7957", "transform", "rotate(180,230.58715,31.889798)", "width", "100%", "height", "100%"], [0, "inkscape", "label", "Layer 1", 0, "inkscape", "groupmode", "layer", "id", "layer1"], ["id", "planet", "transform", "matrix(0.79713025,0,0,0.79713025,31.645843,124.5447)"], ["d", "m 41.413983,105.42466 c 4.754739,4.75474 4.754739,12.46399 0,17.21873 -4.755092,4.75474 -12.463991,4.75474 -17.219083,0 -4.754739,-4.75474 -4.754739,-12.46399 0,-17.21873 4.755092,-4.75509 12.463991,-4.75509 17.219083,0", "id", "path842", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g844", "transform", "matrix(0.35277777,0,0,-0.35277777,27.639458,103.4878)"], ["d", "m 0,0 c -0.544,0.545 -1.389,0.684 -2.063,0.312 -2.762,-1.527 -5.361,-3.456 -7.704,-5.799 -13.004,-13.004 -13.458,-33.812 -1.367,-47.365 0.676,-0.756 1.846,-0.805 2.565,-0.086 0.645,0.645 0.703,1.692 0.093,2.373 -10.903,12.173 -10.509,30.903 1.188,42.6 2.098,2.098 4.424,3.831 6.897,5.201 1.018,0.564 1.218,1.937 0.394,2.761 z", "id", "path846", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g848", "transform", "matrix(0.35277777,0,0,-0.35277777,39.821333,106.38739)"], ["d", "m 0,0 c 11.971,-11.971 11.971,-31.379 0,-43.35 -11.971,-11.971 -31.379,-11.971 -43.35,0 -11.971,11.971 -11.971,31.379 0,43.35 11.971,11.971 31.379,11.971 43.35,0", "id", "path850", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g852", "transform", "matrix(0.35277777,0,0,-0.35277777,35.060526,108.63755)"], ["d", "m 0,0 c 8.231,-8.231 8.231,-21.577 0,-29.81 -8.232,-8.231 -21.578,-8.231 -29.81,0 -8.231,8.233 -8.231,21.579 0,29.81 8.232,8.231 21.578,8.231 29.81,0", "id", "path854", 2, "fill", "#ff5b52", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g856", "transform", "matrix(0.35277777,0,0,-0.35277777,29.529253,123.58718)"], ["d", "m 0,0 v 0 c -0.254,-1.42 -1.732,-2.235 -3.087,-1.74 -4.084,1.495 -7.915,3.88 -11.184,7.173 -6.416,6.46 -9.364,15.056 -8.842,23.471 0.079,1.195 0.985,2.231 2.179,2.282 0.682,0.028 1.29,-0.232 1.724,-0.667 0.464,-0.463 0.731,-1.108 0.688,-1.817 -0.463,-7.184 2.043,-14.528 7.51,-20.04 C -8.222,5.86 -4.953,3.82 -1.474,2.553 -0.426,2.171 0.196,1.098 0,0", "id", "path858", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["d", "m 39.822003,106.38757 c 4.223103,4.2231 4.223103,11.07017 0,15.29362 -0.434269,0.43392 -0.896761,0.8248 -1.385006,1.16981 3.007431,-4.2231 2.619023,-10.11978 -1.169811,-13.90861 -3.788833,-3.78884 -9.685513,-4.17724 -13.908616,-1.17017 0.345017,-0.48789 0.735542,-0.95038 1.169811,-1.38465 4.223456,-4.2231 11.070167,-4.2231 15.293622,0", "id", "path862", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g864", "transform", "matrix(0.35277777,0,0,-0.35277777,41.309243,116.74177)"], ["d", "m 0,0 c 1.411,-1.412 1.411,-3.701 0,-5.112 -1.412,-1.412 -3.701,-1.412 -5.112,0 -1.412,1.411 -1.412,3.7 0,5.112 1.411,1.411 3.7,1.411 5.112,0", "id", "path866", 2, "fill", "#8c1842", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g868", "transform", "matrix(0.35277777,0,0,-0.35277777,36.700766,106.47283)"], ["d", "m 0,0 c 1.256,-1.256 1.256,-3.292 0,-4.547 -1.255,-1.256 -3.291,-1.256 -4.547,0 -1.256,1.255 -1.256,3.291 0,4.547 1.256,1.256 3.292,1.256 4.547,0", "id", "path870", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g872", "transform", "matrix(0.35277777,0,0,-0.35277777,37.07076,119.18885)"], ["d", "m 0,0 c 0.461,-0.461 0.461,-1.208 0,-1.669 -0.461,-0.461 -1.208,-0.461 -1.669,0 -0.461,0.461 -0.461,1.208 0,1.669 0.461,0.461 1.208,0.461 1.669,0", "id", "path874", 2, "fill", "#ff5b52", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g876", "transform", "matrix(0.35277777,0,0,-0.35277777,28.115743,116.91714)"], ["d", "m 0,0 c 0.647,-0.647 0.647,-1.697 0,-2.344 -0.647,-0.647 -1.697,-0.647 -2.344,0 -0.647,0.647 -0.647,1.697 0,2.344 0.647,0.646 1.697,0.646 2.344,0", "id", "path878", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g880", "transform", "matrix(0.35277777,0,0,-0.35277777,35.340632,120.70297)"], ["d", "m 0,0 c 0.898,-0.898 0.898,-2.355 0,-3.253 -0.898,-0.898 -2.355,-0.898 -3.254,0 -0.898,0.898 -0.898,2.355 0,3.253 0.899,0.898 2.356,0.898 3.254,0", "id", "path882", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g884", "transform", "matrix(0.35277777,0,0,-0.35277777,41.728167,111.41172)"], ["d", "m 0,0 v 0 c 1.42,0.254 2.235,1.731 1.739,3.086 -1.494,4.084 -3.879,7.915 -7.172,11.185 -6.46,6.416 -15.056,9.363 -23.471,8.842 -1.195,-0.08 -2.231,-0.985 -2.282,-2.18 -0.028,-0.681 0.232,-1.289 0.666,-1.724 0.464,-0.463 1.109,-0.731 1.818,-0.688 7.184,0.464 14.528,-2.042 20.039,-7.51 C -5.86,8.221 -3.82,4.952 -2.553,1.473 -2.171,0.426 -1.098,-0.196 0,0", "id", "path886", 2, "fill", "#8c1842", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g888", "transform", "matrix(0.35277777,0,0,-0.35277777,35.225908,123.65576)"], ["d", "m 0,0 c 0.202,-1.202 -0.558,-2.368 -1.753,-2.637 -2.695,-0.618 -5.458,-0.866 -8.205,-0.743 -1.37,0.062 -2.357,1.346 -2.118,2.695 l 0.002,0.007 c 0.201,1.134 1.211,1.932 2.362,1.884 2.334,-0.098 4.683,0.124 6.974,0.648 C -1.471,2.15 -0.232,1.274 0,0", "id", "path890", 2, "fill", "#ff6950", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g892", "transform", "matrix(0.35277777,0,0,-0.35277777,31.468507,108.86389)"], ["d", "m 0,0 c 3.045,-3.045 3.045,-7.982 0,-11.027 -3.045,-3.045 -7.982,-3.045 -11.027,0 -3.045,3.045 -3.045,7.982 0,11.027 C -7.982,3.045 -3.045,3.045 0,0", "id", "path894", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g896", "transform", "matrix(0.35277777,0,0,-0.35277777,31.123844,109.20873)"], ["d", "m 0,0 c 3.045,-3.045 3.045,-7.982 0,-11.027 -3.045,-3.045 -7.982,-3.045 -11.027,0 -3.045,3.045 -3.045,7.982 0,11.027 C -7.982,3.045 -3.045,3.045 0,0", "id", "path898", 2, "fill", "#7c133e", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g900", "transform", "matrix(0.35277777,0,0,-0.35277777,37.386672,111.22344)"], ["d", "m 0,0 c 2.127,-2.127 2.127,-5.576 0,-7.703 -2.127,-2.126 -5.575,-2.126 -7.702,0 -2.127,2.127 -2.127,5.576 0,7.703 2.127,2.126 5.575,2.126 7.702,0", "id", "path902", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g904", "transform", "matrix(0.35277777,0,0,-0.35277777,37.003238,111.5595)"], ["d", "m 0,0 c 2.127,-2.127 2.127,-5.575 0,-7.702 -2.127,-2.127 -5.575,-2.127 -7.702,0 -2.127,2.127 -2.127,5.575 0,7.702 2.127,2.127 5.575,2.127 7.702,0", "id", "path906", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g908", "transform", "matrix(0.35277777,0,0,-0.35277777,32.451558,115.85228)"], ["d", "m 0,0 c 1.063,-1.063 1.063,-2.788 0,-3.852 -1.063,-1.063 -2.788,-1.063 -3.851,0 -1.064,1.064 -1.064,2.789 0,3.852 1.063,1.063 2.788,1.063 3.851,0", "id", "path910", 2, "fill", "#fa3548", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g912", "transform", "matrix(0.35277777,0,0,-0.35277777,32.240914,116.09792)"], ["d", "m 0,0 c 1.063,-1.063 1.063,-2.788 0,-3.852 -1.063,-1.063 -2.788,-1.063 -3.851,0 -1.064,1.064 -1.064,2.789 0,3.852 1.063,1.063 2.788,1.063 3.851,0", "id", "path914", 2, "fill", "#ae1f4c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g916", "transform", "matrix(0.35277777,0,0,-0.35277777,23.816264,115.47674)"], ["d", "M 0,0 C -0.675,3.04 -0.791,6.039 -0.416,8.816", "id", "path918", 2, "fill", "none", "stroke", "#fce678", "stroke-width", "5.856", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g920", "transform", "matrix(0.35277777,0,0,-0.35277777,24.472219,109.8771)"], ["d", "M 0,0 C 0.182,0.327 0.373,0.645 0.574,0.954", "id", "path922", 2, "fill", "none", "stroke", "#fce678", "stroke-width", "5.856", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g924", "transform", "matrix(0.35277777,0,0,-0.35277777,43.685696,102.52645)"], ["d", "m 0,0 c -3.104,3.104 -8.583,2.665 -16.277,-1.327 2.268,-1.049 4.451,-2.365 6.485,-3.96 2.098,0.803 3.499,1.028 4.345,1.028 0.578,0 0.887,-0.108 0.995,-0.204 0.224,-0.224 0.514,-1.712 -0.738,-5.073 -0.557,-1.508 -1.424,-3.392 -2.74,-5.704 -3.96,-6.956 -10.434,-15.09 -18.236,-22.881 -7.792,-7.801 -15.925,-14.276 -22.892,-18.247 -1.723,-0.984 -3.2,-1.713 -4.463,-2.247 -4.227,-1.798 -6.046,-1.477 -6.314,-1.22 -0.257,0.267 -0.589,2.162 1.337,6.582 -1.541,2.044 -2.803,4.206 -3.82,6.463 -4.58,-8.347 -5.244,-14.222 -1.969,-17.498 1.359,-1.359 3.178,-2.044 5.426,-2.044 2.975,0 6.731,1.188 11.226,3.564 0.557,0.289 1.124,0.6 1.702,0.932 7.438,4.227 16.042,11.076 24.229,19.253 8.177,8.187 15.016,16.791 19.253,24.229 0.567,0.995 1.081,1.958 1.552,2.89 1.959,3.97 2.943,7.319 2.943,10.038 C 2.044,-3.179 1.359,-1.359 0,0", "id", "path926", 2, "fill", "#fce678", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g928", "transform", "matrix(0.35277777,0,0,-0.35277777,22.861118,121.77542)"], ["d", "M 0,0 C 0.153,0.408 0.33,0.844 0.533,1.311 -1.008,3.354 -2.271,5.517 -3.288,7.774 -4.371,5.8 -5.233,3.965 -5.876,2.271 -6.661,0.2 -5.148,-2.014 -2.935,-2.014 -1.631,-2.014 -0.458,-1.22 0,0", "id", "path930", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g932", "transform", "matrix(0.35277777,0,0,-0.35277777,41.326812,103.21842)"], ["d", "M 0,0 V 0 C 0,2.16 -2.115,3.665 -4.164,2.983 -5.828,2.43 -7.638,1.648 -9.591,0.634 c 2.269,-1.049 4.451,-2.365 6.486,-3.96 0.33,0.127 0.643,0.239 0.939,0.338 C -0.873,-2.556 0,-1.363 0,0", "id", "path934", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g936", "transform", "matrix(0.35277777,0,0,-0.35277777,31.904329,118.36409)"], ["d", "m 0,0 c -3.397,-2.974 -6.769,-5.63 -10,-7.876 -1.523,-1.06 -1.823,-3.184 -0.633,-4.607 1.046,-1.252 2.871,-1.505 4.211,-0.575 3.424,2.376 6.99,5.179 10.562,8.304 1.372,1.199 1.445,3.315 0.156,4.604 L 4.291,-0.145 C 3.123,1.024 1.244,1.089 0,0", "id", "path938", 2, "fill", "#ffffa9", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["d", "m 34.454877,115.97455 -0.173919,0.17357 c -0.482953,0.47589 -0.430389,1.27247 0.117122,1.68028 l 0.0039,0.004 c 0.3302,0.33231 0.861836,0.37465 1.228725,0.0833 0.154164,-0.12206 0.276225,-0.24412 0.398286,-0.36653 0.655109,-0.65511 1.284817,-1.31728 1.883834,-1.9805 0.426861,-0.47237 0.372886,-1.20473 -0.120298,-1.60725 l -0.0039,-0.003 c -0.455083,-0.37147 -1.122186,-0.32561 -1.516944,0.10972 -0.577145,0.63676 -1.184628,1.27458 -1.816806,1.90676", "id", "path942", 2, "fill", "#fdc22c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "0.352778"], ["id", "g944", "transform", "matrix(0.35277777,0,0,-0.35277777,40.480357,110.53253)"], ["d", "m 0,0 c -1.421,0.95 -3.351,0.475 -4.373,-0.896 -0.523,-0.701 -1.064,-1.407 -1.623,-2.116 -1.064,-1.35 -0.859,-3.302 0.473,-4.388 1.361,-1.112 3.377,-0.889 4.464,0.492 0.639,0.812 1.257,1.618 1.851,2.419 C 1.85,-3.056 1.512,-1.01 0,0", "id", "path946", 2, "fill", "#ffffa9", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "moon", "transform", "matrix(0.53140337,0,0,-0.53133854,3.6409257,248.72838)"], ["id", "g953-9-4", "transform", "translate(66.5576,52.9734)", 2, "fill", "#969696", "fill-opacity", "1"], ["d", "M 0,0 V -0.029 C 0,-0.384 -0.022,-0.739 -0.068,-1.078 -0.114,-1.444 -0.184,-1.8 -0.27,-2.149 -0.367,-2.511 -0.481,-2.866 -0.619,-3.204 -1.886,-6.362 -4.98,-8.598 -8.598,-8.598 c -4.751,0 -8.596,3.852 -8.596,8.598 0,4.751 3.845,8.598 8.596,8.598 3.17,0 5.945,-1.72 7.435,-4.277 C -0.969,3.983 -0.791,3.634 -0.642,3.267 -0.493,2.905 -0.367,2.527 -0.27,2.138 -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path955-1-1", 2, "fill", "#969696", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g957-6-2", "transform", "translate(62.7793,54.865)", 2, "fill", "#aaaaaa", "fill-opacity", "1"], ["d", "m 0,0 c 0,-3.389 -2.747,-6.136 -6.136,-6.136 -3.388,0 -6.135,2.747 -6.135,6.136 0,3.389 2.747,6.135 6.135,6.135 C -2.747,6.135 0,3.389 0,0", "id", "path959-1-3", 2, "fill", "#aaaaaa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g961-1-7", "transform", "translate(66.5576,52.9734)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "M 0,0 V -0.029 C 0,-0.384 -0.022,-0.739 -0.068,-1.078 -0.114,-1.444 -0.184,-1.8 -0.27,-2.149 h -9.646 c -0.596,0 -1.077,0.481 -1.077,1.071 0,0.602 0.481,1.078 1.077,1.078 h 3.33 c 0.597,0 1.084,0.493 1.084,1.083 0,0.596 -0.487,1.083 -1.084,1.083 h -2.04 c -0.596,0 -1.083,0.481 -1.083,1.078 0,0.59 0.487,1.077 1.083,1.077 h 7.463 C -0.969,3.983 -0.791,3.634 -0.642,3.267 -0.493,2.905 -0.367,2.527 -0.27,2.138 -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path963-0-5", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g965-7-5", "transform", "translate(66.5576,52.9734)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 v -0.029 h -1.886 c -0.595,0 -1.077,0.493 -1.077,1.084 0,0.59 0.482,1.083 1.077,1.083 H -0.27 C -0.184,1.794 -0.114,1.444 -0.068,1.083 -0.022,0.728 0,0.366 0,0", "id", "path967-8-5", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g969-7-0", "transform", "translate(64.3691,50.1463)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c -0.372,0 -0.719,-0.19 -0.912,-0.508 -1.129,-1.855 -3.166,-3.096 -5.497,-3.096 -2.053,0 -3.877,0.963 -5.054,2.459 -0.198,0.252 -0.508,0.39 -0.828,0.39 -0.892,0 -1.413,-1.031 -0.862,-1.732 1.57,-1.998 4.004,-3.284 6.744,-3.284 3.106,0 5.823,1.653 7.332,4.125 C 1.363,-0.927 0.844,0 0,0", "id", "path971-1-6", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g973-1-6", "transform", "translate(56.0508,60.6687)", 2, "fill", "#c8c8c8", "fill-opacity", "1"], ["d", "m 0,0 c 0.181,-0.41 -0.032,-0.877 -0.454,-1.026 -2.531,-0.896 -4.394,-3.189 -4.669,-5.953 -0.04,-0.39 -0.367,-0.682 -0.757,-0.682 -0.453,0 -0.807,0.39 -0.762,0.843 0.342,3.36 2.611,6.147 5.684,7.23 C -0.58,0.545 -0.162,0.366 0,0", "id", "path975-3-9", 2, "fill", "#c8c8c8", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g977-1-7", "transform", "translate(51.0527,53.1482)", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-opacity", "1"], ["d", "M 0,0 C 0.221,1.192 0.636,2.285 1.192,3.224", "id", "path979-0-8", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-width", "1.719", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g981-7-8", "transform", "translate(54.1348,58.5555)", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-opacity", "1"], ["d", "M 0,0 C 0.114,0.089 0.231,0.174 0.351,0.255", "id", "path983-0-3", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#fafafa", "stroke-width", "1.719", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g985-2-1", "transform", "translate(63.749,46.6267)", 2, "fill", "#646464", "fill-opacity", "1"], ["d", "m 0,0 c -1.226,-1.122 -2.776,-1.891 -4.495,-2.149 -0.636,-0.096 -1.213,0.381 -1.213,1.024 v 0.09 c 0,0.522 0.392,0.947 0.908,1.027 1.265,0.197 2.409,0.761 3.318,1.58 0.386,0.35 0.959,0.392 1.366,0.069 L -0.051,1.588 C 0.453,1.188 0.474,0.435 0,0", "id", "path987-9-1", 2, "fill", "#646464", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g989-4-3", "transform", "translate(60.2861,50.824)", 2, "fill", "#fafafa", "fill-opacity", "1"], ["d", "m 0,0 h -1.919 c -0.596,0 -1.078,0.482 -1.078,1.079 0,0.596 0.482,1.078 1.078,1.078 H 0 C 0.597,2.157 1.079,1.675 1.079,1.079 1.079,0.482 0.597,0 0,0", "id", "path991-0-1", 2, "fill", "#fafafa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g993-8-4", "transform", "translate(57.791,55.114)", 2, "fill", "#9b9b9b", "fill-opacity", "1", "stroke", "none", "stroke-opacity", "1"], ["d", "m 0,0 h -1.919 c -0.596,0 -1.079,0.483 -1.079,1.079 0,0.596 0.483,1.079 1.079,1.079 H 0 C 0.596,2.158 1.079,1.675 1.079,1.079 1.079,0.483 0.596,0 0,0", "id", "path995-7-2", 2, "fill", "#9b9b9b", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-opacity", "1"], ["id", "g997-9-8", "transform", "translate(62.3115,56.1931)", 2, "fill", "#fafafa", "fill-opacity", "1", "stroke", "none", "stroke-opacity", "1"], ["d", "m 0,0 h -0.42 c -0.596,0 -1.079,0.483 -1.079,1.079 0,0.596 0.483,1.079 1.079,1.079 H 0 C 0.596,2.158 1.079,1.675 1.079,1.079 1.079,0.483 0.596,0 0,0", "id", "path999-0-4", 2, "fill", "#fafafa", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-opacity", "1"], ["id", "g1001-4-3", "transform", "translate(54.7529,51.2957)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.58 -0.47,-1.05 -1.05,-1.05 -0.58,0 -1.051,0.47 -1.051,1.05 0,0.58 0.471,1.051 1.051,1.051 C -0.47,1.051 0,0.58 0,0", "id", "path1003-1-2", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1005-2-5", "transform", "translate(54.3828,51.4471)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.425 -0.345,-0.77 -0.77,-0.77 -0.424,0 -0.768,0.345 -0.768,0.77 0,0.425 0.344,0.77 0.768,0.77 C -0.345,0.77 0,0.425 0,0", "id", "path1007-8-4", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1009-9-8", "transform", "translate(56.7158,48.7293)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.332 -0.269,-0.601 -0.601,-0.601 -0.331,0 -0.6,0.269 -0.6,0.601 0,0.332 0.269,0.601 0.6,0.601 C -0.269,0.601 0,0.332 0,0", "id", "path1011-3-1", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1013-7-8", "transform", "translate(56.5039,48.8162)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.243 -0.196,-0.44 -0.439,-0.44 -0.244,0 -0.441,0.197 -0.441,0.44 0,0.242 0.197,0.439 0.441,0.439 C -0.196,0.439 0,0.242 0,0", "id", "path1015-5-7", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1017-9-3", "transform", "translate(55.3115,55.114)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.434 -0.352,-0.785 -0.785,-0.785 -0.434,0 -0.786,0.351 -0.786,0.785 0,0.435 0.352,0.786 0.786,0.786 C -0.352,0.786 0,0.435 0,0", "id", "path1019-7-6", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1021-4-4", "transform", "translate(55.0352,55.2273)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.317 -0.258,-0.575 -0.576,-0.575 -0.318,0 -0.575,0.258 -0.575,0.575 0,0.318 0.257,0.575 0.575,0.575 C -0.258,0.575 0,0.318 0,0", "id", "path1023-4-0", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1025-8-3", "transform", "translate(59.3623,58.9558)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.553 -0.448,-1.001 -1.002,-1.001 -0.553,0 -1.001,0.448 -1.001,1.001 0,0.554 0.448,1.002 1.001,1.002 C -0.448,1.002 0,0.554 0,0", "id", "path1027-3-8", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1029-6-6", "transform", "translate(59.0088,59.1004)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.405 -0.328,-0.733 -0.733,-0.733 -0.406,0 -0.734,0.328 -0.734,0.733 0,0.405 0.328,0.733 0.734,0.733 C -0.328,0.733 0,0.405 0,0", "id", "path1031-2-2", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1033-3-5", "transform", "translate(61.0127,48.8162)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.554 -0.449,-1.002 -1.002,-1.002 -0.553,0 -1.002,0.448 -1.002,1.002 0,0.553 0.449,1.001 1.002,1.001 C -0.449,1.001 0,0.553 0,0", "id", "path1035-4-4", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1037-7-3", "transform", "translate(60.6592,48.9597)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.405 -0.328,-0.733 -0.733,-0.733 -0.406,0 -0.734,0.328 -0.734,0.733 0,0.405 0.328,0.733 0.734,0.733 C -0.328,0.733 0,0.405 0,0", "id", "path1039-8-4", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1041-6-5", "transform", "translate(64.9141,52.5877)", 2, "fill", "#dcdcdc", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.729 -0.591,-1.319 -1.319,-1.319 -0.73,0 -1.321,0.59 -1.321,1.319 0,0.729 0.591,1.319 1.321,1.319 C -0.591,1.319 0,0.729 0,0", "id", "path1043-6-9", 2, "fill", "#dcdcdc", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1045-4-4", "transform", "translate(64.4492,52.7771)", 2, "fill", "#828282", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.533 -0.434,-0.966 -0.967,-0.966 -0.534,0 -0.967,0.433 -0.967,0.966 0,0.534 0.433,0.967 0.967,0.967 C -0.434,0.967 0,0.534 0,0", "id", "path1047-1-2", 2, "fill", "#828282", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "meteor", "transform", "matrix(0.81432985,0,0,0.81435846,-85.116449,76.13409)", 2, "fill", "#7b3b89", "fill-opacity", "0.01", "stroke", "#b4b4b4", "stroke-width", "0.962516", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.92503, 1.92503", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["d", "m 119.93419,175.53834 c 0.65451,-1.49016 2.64963,-2.30694 4.26245,-2.31466 1.02385,-0.005 1.70847,1.28033 2.71955,1.44343 0.5114,0.0824 1.06607,-0.48751 1.532,-0.2611 0.95526,0.46418 1.52012,2.80021 1.52012,2.80021 0,0 -0.99774,1.9665 -1.82454,2.64923 -0.60828,0.50229 -1.54924,0.45673 -2.1678,0.94944 -0.65793,0.52408 -0.71596,1.76236 -1.51062,2.03011 -1.23327,0.41551 -2.95829,-0.0529 -3.74537,-1.09884 -0.62659,-0.83264 0.0929,-2.10062 -0.0383,-3.13836 -0.13186,-1.04197 -1.1691,-2.09938 -0.74742,-3.05946 z", "id", "path2133", 0, "sodipodi", "nodetypes", "aaaacaaaaaaa", 2, "fill", "#c8b7b7", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.260787px", "stroke-linecap", "butt", "stroke-linejoin", "miter", "stroke-opacity", "1"], ["d", "m 128.04532,177.4501 c 0.31717,-0.62783 -1.04964,-3.43207 0.26355,-2.93143 0.45246,0.17248 0.0807,-0.12433 0.13932,-0.11266 1.04158,0.2076 1.52012,2.80021 1.52012,2.80021 0,0 -0.99774,1.9665 -1.82454,2.64923 -0.60828,0.50229 -1.54924,0.45673 -2.1678,0.94944 -0.65793,0.52408 -0.71596,1.76236 -1.51062,2.03011 -1.23327,0.41552 -2.92698,-0.0874 -3.74537,-1.09884 -0.27947,-0.34539 -0.33522,-1.11023 -0.10007,-1.32913 3.57217,-0.12686 4.91852,1.30673 7.42541,-2.95693 z", "id", "path2133-5", 0, "sodipodi", "nodetypes", "csacaaaacc", 2, "fill", "#ac9393", "fill-opacity", "0.902439", "stroke", "none", "stroke-width", "0.260787px", "stroke-linecap", "butt", "stroke-linejoin", "miter", "stroke-opacity", "1"], ["id", "path8657-4-7", "cx", "124.06939", "cy", "178.76283", "rx", "1.5630589", "ry", "1.4441329", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.312821", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path8657-4-7-6", "cx", "125.27673", "cy", "175.52039", "rx", "1.0046998", "ry", "1.009869", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.209727", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path8657-4-7-6-3", "cx", "121.37298", "cy", "175.85143", "rx", "1.2735393", "ry", "1.2166613", 2, "opacity", "0.7", "fill", "#ac9393", "fill-opacity", "0.67184", "stroke", "none", "stroke-width", "0.259176", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "none", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594", "transform", "translate(-2.5008215,-0.23503621)"], ["id", "path2860", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6", "transform", "matrix(0.8,0,0,0.8,25.777735,37.752125)"], ["id", "path2860-26", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6-3", "transform", "matrix(0.8,0,0,0.8,26.327752,35.387587)"], ["id", "path2860-26-9", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3-05", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-6-1", "transform", "matrix(-0.13116937,-0.78917336,0.78917336,-0.13116937,1.1501266,296.35998)"], ["id", "path2860-26-0", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-3-0", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g4594-7", "transform", "matrix(1.1333333,0,0,1.1333333,-18.494037,-20.906932)"], ["id", "path2860-6", "cx", "124.7058", "cy", "176.58275", "r", "0.75", 2, "opacity", "1", "fill", "#e3dbdb", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.442322", "stroke-miterlimit", "4", "stroke-dasharray", "0.884643, 0.884643", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "path2860-2-0", "cx", "124.66313", "cy", "176.48848", "r", "0.57499999", 2, "opacity", "1", "fill", "#241c1c", "fill-opacity", "0.751663", "stroke", "none", "stroke-width", "0.339113", "stroke-miterlimit", "4", "stroke-dasharray", "0.678226, 0.678226", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g1148-4", "transform", "matrix(-0.01220081,-0.20135456,-0.20582509,-0.0035356,127.81606,174.70482)", 2, "fill", "#6c5353"], ["d", "M 0.37838417,0.40863902 C -0.26961583,0.40863902 -1.254,-0.332 -1.592,-0.886 c -1.969,-3.237 -5.5315395,-4.8587212 -9.598539,-4.8587212 -3.582,0 -6.674735,2.7301857 -8.728735,5.34118579 -0.346,0.44 -3.408056,3.83059781 -3.966056,3.83059781 -1.556,0 -3.225605,-1.4920513 -2.263605,-2.71505131 C -23.409935,-2.7739889 -15.963,-10.068 -11.181,-10.068 c 5.418,0 9.9774378,2.3011024 12.6084378,6.6121024 0.769,1.258 0.4249464,3.86453662 -1.04905363,3.86453662", "id", "path1150-6", 0, "sodipodi", "nodetypes", "ccssscscc", 2, "fill", "#6c5353", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1164-3", "transform", "matrix(0.14793893,0.36395297,0.36077306,-0.13836961,129.74311,185.31532)", 2, "fill", "#241c1c", "stroke-width", "1.00063", "stroke-miterlimit", "4", "stroke-dasharray", "none"], ["d", "m -17.882701,7.7655154 c 1.231629,-1.1037041 2.171032,-2.5818452 2.649142,-4.2957319 0.176923,-0.6337614 -0.198564,-1.2806918 -0.808328,-1.3619649 l -0.08486,-0.011315 c -0.49608,-0.066119 -0.95224,0.2785137 -1.09833,0.7930964 -0.35843,1.2603931 -1.047523,2.351646 -1.949021,3.1715693 -0.383583,0.3483782 -0.500758,0.9243097 -0.249161,1.3792777 l 0.04058,0.073573 c 0.31098,0.5618686 1.023478,0.6781714 1.499984,0.2514891", "id", "path1166-8", 2, "fill", "#241c1c", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none", "stroke-width", "1.00063", "stroke-miterlimit", "4", "stroke-dasharray", "none"], ["id", "sun", "transform", "matrix(4.0069956,0.0447624,-0.0447624,4.0069956,-348.16431,-700.00248)"], ["id", "g1132-7-5", "transform", "matrix(0.35277777,0,0,-0.35277777,119.43942,224.31719)", 2, "fill", "#ffad55", "fill-opacity", "1"], ["d", "M 0,0 V -0.05 C 0,-0.67 -0.04,-1.29 -0.12,-1.88 -0.2,-2.52 -0.32,-3.14 -0.471,-3.75 -0.641,-4.38 -0.841,-5 -1.08,-5.59 -3.29,-11.1 -8.69,-15 -15,-15 c -8.29,0 -15,6.72 -15,15 0,8.29 6.71,15 15,15 5.529,0 10.37,-3 12.97,-7.46 C -1.69,6.95 -1.38,6.34 -1.12,5.7 -0.86,5.07 -0.641,4.41 -0.471,3.73 -0.32,3.13 -0.2,2.521 -0.12,1.89 -0.04,1.271 0,0.64 0,0", "id", "path1134-4-6", 2, "fill", "#ffad55", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1136-1-9", "transform", "matrix(0.35277777,0,0,-0.35277777,117.11366,223.15291)", 2, "fill", "#ffda00", "fill-opacity", "1"], ["d", "m 0,0 c 0,-5.912 -4.793,-10.704 -10.704,-10.704 -5.912,0 -10.705,4.792 -10.705,10.704 0,5.912 4.793,10.705 10.705,10.705 C -4.793,10.705 0,5.912 0,0", "id", "path1138-2-5", 2, "fill", "#ffda00", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1144-6-5", "transform", "matrix(0.35277777,0,0,-0.35277777,119.43942,224.31719)", 2, "fill", "#ff512a", "fill-opacity", "1"], ["d", "m 0,0 v -0.05 h -3.29 c -1.04,0 -1.881,0.86 -1.881,1.89 0,1.03 0.841,1.89 1.881,1.89 h 2.819 C -0.32,3.13 -0.2,2.521 -0.12,1.89 -0.04,1.271 0,0.64 0,0", "id", "path1146-2-7", 2, "fill", "#ff512a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1148-5-2", "transform", "matrix(0.35277777,0,0,-0.35277777,118.09205,226.05694)", 2, "fill", "#ff7f2a"], ["d", "m 0,0 c -0.648,0 -1.254,-0.332 -1.592,-0.886 -1.969,-3.237 -5.522,-5.402 -9.589,-5.402 -3.582,0 -6.764,1.68 -8.818,4.291 -0.346,0.44 -0.887,0.68 -1.445,0.68 -1.556,0 -2.465,-1.8 -1.503,-3.023 2.739,-3.486 6.984,-5.728 11.766,-5.728 5.418,0 10.16,2.883 12.791,7.194 C 2.379,-1.616 1.474,0 0,0", "id", "path1150-4-3", 2, "fill", "#ff7f2a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1152-2-6", "transform", "matrix(0.35277777,0,0,-0.35277777,112.9723,219.58069)", 2, "fill", "#ffc455", "fill-opacity", "1"], ["d", "m 0,0 c 0.315,-0.714 -0.056,-1.53 -0.792,-1.791 -4.417,-1.563 -7.666,-5.563 -8.146,-10.385 -0.071,-0.68 -0.64,-1.19 -1.321,-1.19 -0.789,0 -1.409,0.68 -1.33,1.47 0.597,5.863 4.556,10.727 9.917,12.615 C -1.013,0.952 -0.282,0.64 0,0", "id", "path1154-5-1", 2, "fill", "#ffc455", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1156-9-8", "transform", "matrix(0.35277777,0,0,-0.35277777,109.89618,224.20916)", 2, "fill", "#fff555", "fill-opacity", "1", "stroke", "#fff555", "stroke-opacity", "1"], ["d", "M 0,0 C 0.385,2.08 1.108,3.986 2.08,5.624", "id", "path1158-2-6", 2, "fill", "#fff555", "fill-opacity", "1", "stroke", "#fff555", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g1160-5-3", "transform", "matrix(0.35277777,0,0,-0.35277777,111.79271,220.88138)", 2, "stroke", "#fff555", "stroke-opacity", "1"], ["d", "M 0,0 C 0.201,0.156 0.405,0.304 0.612,0.444", "id", "path1162-1-8", 2, "fill", "none", "stroke", "#fff555", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "10", "stroke-dasharray", "none", "stroke-opacity", "1"], ["id", "g1164-0-6", "transform", "matrix(0.35277777,0,0,-0.35277777,117.71035,228.22308)", 2, "fill", "#ff512a", "fill-opacity", "1"], ["d", "m 0,0 c -2.139,-1.959 -4.844,-3.3 -7.843,-3.751 -1.109,-0.167 -2.116,0.667 -2.116,1.788 v 0.156 c 0,0.912 0.684,1.653 1.585,1.793 2.207,0.344 4.203,1.326 5.789,2.757 0.674,0.609 1.672,0.682 2.383,0.118 L -0.087,2.77 C 0.791,2.073 0.827,0.758 0,0", "id", "path1166-2-6", 2, "fill", "#ff512a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1168-6-9", "transform", "matrix(0.52726219,0,0,-0.35277777,116.49208,225.6401)", 2, "fill", "#fff555", "fill-opacity", "1"], ["d", "m 0,0 h -3.349 c -1.039,0 -1.881,0.843 -1.881,1.883 0,1.039 0.842,1.882 1.881,1.882 L 0,3.765 C 1.039,3.765 1.882,2.922 1.882,1.883 1.882,0.843 1.039,0 0,0", "id", "path1170-2-8", 2, "fill", "#fff555", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1172-0-8", "transform", "matrix(0.35277777,0,0,-0.35277777,114.04372,222.99927)", 2, "fill", "#ff7f2a", "fill-opacity", "1"], ["d", "m 0,0 h -3.349 c -1.039,0 -1.881,0.843 -1.881,1.882 0,1.04 0.842,1.883 1.881,1.883 L 0,3.765 C 1.039,3.765 1.882,2.922 1.882,1.882 1.882,0.843 1.039,0 0,0", "id", "path1174-6-1", 2, "fill", "#ff7f2a", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1176-1-2", "transform", "matrix(0.35277777,0,0,-0.35277777,116.82565,222.33521)", 2, "fill", "#fff555", "fill-opacity", "1"], ["d", "m 0,0 h -0.732 c -1.04,0 -1.883,0.843 -1.883,1.882 0,1.04 0.843,1.883 1.883,1.883 L 0,3.765 C 1.04,3.765 1.883,2.922 1.883,1.882 1.883,0.843 1.04,0 0,0", "id", "path1178-3-9", 2, "fill", "#fff555", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "g1204-7-8", "transform", "matrix(0.35277777,0,0,-0.35277777,115.01043,220.63453)", 2, "fill", "#ffc455", "fill-opacity", "1"], ["d", "m 0,0 c 0,-0.965 -0.782,-1.748 -1.747,-1.748 -0.966,0 -1.748,0.783 -1.748,1.748 0,0.965 0.782,1.748 1.748,1.748 C -0.782,1.748 0,0.965 0,0", "id", "path1206-5-0", 2, "fill", "#ffc455", "fill-opacity", "1", "fill-rule", "nonzero", "stroke", "none"], ["id", "portal", "transform", "matrix(0.63452719,0,0,0.3290595,116.43902,29.665972)"], ["id", "ellipse7459", "cx", "72.415215", "cy", "92.530159", "rx", "12.632149", "ry", "57.184006", 2, "fill", "#310241", "fill-opacity", "1", "stroke", "none", "stroke-width", "0.307489", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "0.307489, 0.922467", "stroke-opacity", "1"], ["id", "path7811", 0, "sodipodi", "type", "arc", 0, "sodipodi", "cx", "92.898201", 0, "sodipodi", "cy", "-74.309357", 0, "sodipodi", "rx", "48.364288", 0, "sodipodi", "ry", "10.625179", 0, "sodipodi", "start", "0", 0, "sodipodi", "end", "3.1476839", 0, "sodipodi", "open", "true", 0, "sodipodi", "arc-type", "arc", "d", "m 141.26249,-74.309357 a 48.364288,10.625179 0 0 1 -24.26724,9.212443 48.364288,10.625179 0 0 1 -48.44908,-0.03242 48.364288,10.625179 0 0 1 -24.01136,-9.244746", "transform", "matrix(-1.7919108e-4,0.99999998,-0.99999997,-2.5128272e-4,0,0)", 2, "fill", "#030206", "fill-opacity", "1", "stroke", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "1, 3", "stroke-opacity", "1"], ["id", "portalOver", 0, "sodipodi", "type", "arc", 0, "sodipodi", "cx", "92.935478", 0, "sodipodi", "cy", "74.307602", 0, "sodipodi", "rx", "48.364513", 0, "sodipodi", "ry", "10.625179", 0, "sodipodi", "start", "0", 0, "sodipodi", "end", "3.1476839", 0, "sodipodi", "open", "true", 0, "sodipodi", "arc-type", "arc", "d", "M 141.29999,74.307602 A 48.364513,10.625179 0 0 1 117.03264,83.520045 48.364513,10.625179 0 0 1 68.583334,83.487628 48.364513,10.625179 0 0 1 44.571862,74.242882", "transform", "matrix(1.7919108e-4,0.99999998,0.99999997,-2.5128272e-4,0,0)", 2, "fill", "url(#linearGradient928)", "fill-opacity", "1", "stroke", "none", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-dasharray", "1, 3", "stroke-opacity", "1"], ["id", "startBtn", "transform", "matrix(0.50377637,0,0,0.50377637,8.0387157,-1.5637735)"], ["id", "rect1154", "d", "m 12.452459,6.7165618 h 26.698 c 1.318841,0 2.380578,1.0617378 2.380578,2.380578 V 20.79514 c 0,1.31884 -1.061737,2.380578 -2.380578,2.380578 h -26.698 c -1.31884,0 -2.380578,-1.061738 -2.380578,-2.380578 V 9.0971398 c 0,-1.3188402 1.061738,-2.380578 2.380578,-2.380578 z", 2, "fill", "#c8c8c8", "stroke", "#b4b4b4", "stroke-width", "0.540845", "stroke-linecap", "round", "stroke-linejoin", "round"], ["aria-label", "Start", "id", "text2190", 2, "font-weight", "600", "font-size", "8.46667px", "line-height", "1.25", "font-family", "Poppins", "-inkscape-font-specification", "Poppins, Semi-Bold", "stroke-width", "0.264583"], ["d", "m 17.192868,17.969076 q -0.618067,0 -1.117601,-0.211667 -0.491066,-0.211667 -0.778933,-0.6096 Q 15.008467,16.749875 15,16.208008 h 1.270001 q 0.0254,0.364067 0.254,0.575734 0.237067,0.211667 0.643467,0.211667 0.414867,0 0.651933,-0.194734 0.237067,-0.2032 0.237067,-0.524933 0,-0.262467 -0.160867,-0.4318 -0.160866,-0.169334 -0.4064,-0.262467 -0.237066,-0.1016 -0.6604,-0.220134 -0.575734,-0.169333 -0.9398,-0.3302 -0.355601,-0.169333 -0.618067,-0.499533 -0.254,-0.338667 -0.254,-0.897467 0,-0.524934 0.262466,-0.914401 0.262467,-0.389466 0.736601,-0.592667 0.474133,-0.211666 1.083733,-0.211666 0.914401,0 1.481668,0.448733 0.575733,0.440267 0.635,1.236134 h -1.303867 q -0.01693,-0.3048 -0.262467,-0.499533 -0.237067,-0.203201 -0.635,-0.203201 -0.347134,0 -0.5588,0.177801 -0.203201,0.1778 -0.203201,0.516466 0,0.237067 0.152401,0.397934 0.160866,0.1524 0.389466,0.254 0.237067,0.09313 0.660401,0.220133 0.575733,0.169334 0.9398,0.338667 0.364067,0.169334 0.626534,0.508 0.262466,0.338667 0.262466,0.889001 0,0.474133 -0.245533,0.880533 -0.245534,0.406401 -0.719667,0.651934 -0.474134,0.237067 -1.126067,0.237067 z", "id", "path6925"], ["d", "m 21.688663,14.192941 v 2.269068 q 0,0.237066 0.110067,0.347133 0.118533,0.1016 0.389467,0.1016 h 0.550333 v 0.999067 h -0.745067 q -1.4986,0 -1.4986,-1.456267 v -2.260601 h -0.5588 v -0.973667 h 0.5588 V 12.05934 h 1.1938 v 1.159934 h 1.049867 v 0.973667 z", "id", "path6927"], ["d", "m 23.288852,15.547608 q 0,-0.7112 0.2794,-1.261534 0.287867,-0.550333 0.770467,-0.846667 0.491067,-0.296333 1.0922,-0.296333 0.524934,0 0.914401,0.211667 0.397933,0.211666 0.635,0.5334 v -0.668867 h 1.193801 v 4.690535 H 26.98032 v -0.6858 q -0.2286,0.3302 -0.635,0.550333 -0.397934,0.211667 -0.922867,0.211667 -0.592667,0 -1.083734,-0.3048 -0.4826,-0.3048 -0.770467,-0.855134 -0.2794,-0.5588 -0.2794,-1.278467 z m 3.691468,0.01693 q 0,-0.431801 -0.169333,-0.736601 -0.169334,-0.313267 -0.4572,-0.474133 -0.287867,-0.169334 -0.618067,-0.169334 -0.330201,0 -0.609601,0.160867 -0.2794,0.160867 -0.4572,0.474134 -0.169333,0.3048 -0.169333,0.728133 0,0.423334 0.169333,0.745067 0.1778,0.313267 0.4572,0.4826 0.287867,0.169334 0.609601,0.169334 0.3302,0 0.618067,-0.160867 0.287866,-0.169333 0.4572,-0.474134 0.169333,-0.313266 0.169333,-0.745066 z", "id", "path6929"], ["d", "m 30.519383,13.947408 q 0.2286,-0.372534 0.592667,-0.584201 0.372534,-0.211666 0.846667,-0.211666 v 1.2446 H 31.64545 q -0.5588,0 -0.846667,0.262467 -0.2794,0.262467 -0.2794,0.9144 v 2.336801 H 29.33405 v -4.690535 h 1.185333 z", "id", "path6931"], ["d", "m 34.134646,14.192941 v 2.269068 q 0,0.237066 0.110067,0.347133 0.118533,0.1016 0.389467,0.1016 h 0.550333 v 0.999067 h -0.745067 q -1.4986,0 -1.4986,-1.456267 v -2.260601 h -0.558801 v -0.973667 h 0.558801 V 12.05934 h 1.1938 v 1.159934 h 1.049867 v 0.973667 z", "id", "path6933"], ["id", "clearBtn", "transform", "matrix(0.50377637,0,0,0.50377637,9.6262158,-1.5637735)"], ["id", "rect1570", "d", "m 47.37748,6.7165618 h 26.698001 c 1.31884,0 2.380578,1.0617376 2.380578,2.3805776 V 20.795138 c 0,1.31884 -1.061738,2.380578 -2.380578,2.380578 H 47.37748 c -1.31884,0 -2.380578,-1.061738 -2.380578,-2.380578 V 9.0971394 c 0,-1.31884 1.061738,-2.3805776 2.380578,-2.3805776 z", 2, "fill", "#c8c8c8", "stroke", "#b4b4b4", "stroke-width", "0.540845", "stroke-linecap", "round", "stroke-linejoin", "round"], ["aria-label", "Clear", "id", "text4232", 2, "font-weight", "600", "font-size", "8.46667px", "line-height", "1.25", "font-family", "Poppins", "-inkscape-font-specification", "Poppins, Semi-Bold", "stroke-width", "0.264583"], ["d", "m 49.376,15.28514 q 0,-0.872067 0.389466,-1.557868 0.397934,-0.694267 1.075268,-1.075267 0.6858,-0.389467 1.532467,-0.389467 0.9906,0 1.735667,0.508001 0.745067,0.508 1.041401,1.405467 h -1.363134 q -0.2032,-0.423334 -0.575734,-0.635 -0.364067,-0.211667 -0.846667,-0.211667 -0.516467,0 -0.922867,0.245533 -0.397933,0.237067 -0.626534,0.677334 -0.220133,0.440267 -0.220133,1.032934 0,0.5842 0.220133,1.032933 0.228601,0.440267 0.626534,0.685801 0.4064,0.237066 0.922867,0.237066 0.4826,0 0.846667,-0.211666 0.372534,-0.220134 0.575734,-0.643467 h 1.363134 q -0.296334,0.905933 -1.041401,1.413934 -0.7366,0.499533 -1.735667,0.499533 -0.846667,0 -1.532467,-0.381 Q 50.1634,17.528807 49.765466,16.843007 49.376,16.157207 49.376,15.28514 Z", "id", "path6937"], ["d", "m 57.3516,11.983138 v 6.265336 h -1.185334 v -6.265336 z", "id", "path6939"], ["d", "m 62.880334,15.801606 q 0,0.254001 -0.03387,0.457201 h -3.429001 q 0.04233,0.508 0.3556,0.795867 0.313267,0.287866 0.770467,0.287866 0.6604,0 0.9398,-0.567266 h 1.278468 q -0.203201,0.677333 -0.778934,1.1176 -0.575734,0.4318 -1.413934,0.4318 -0.677334,0 -1.2192,-0.296333 -0.533401,-0.3048 -0.838201,-0.855134 -0.296333,-0.550334 -0.296333,-1.27 0,-0.728134 0.296333,-1.278468 0.296334,-0.550333 0.829734,-0.846667 0.5334,-0.296333 1.227667,-0.296333 0.668867,0 1.193801,0.287867 0.5334,0.287866 0.821266,0.821267 0.296334,0.524933 0.296334,1.210733 z M 61.652667,15.46294 q -0.0085,-0.457201 -0.3302,-0.728134 -0.321734,-0.2794 -0.787401,-0.2794 -0.440266,0 -0.745067,0.270933 -0.296333,0.262467 -0.364066,0.736601 z", "id", "path6941"], ["d", "m 63.439123,15.886273 q 0,-0.7112 0.279401,-1.261534 0.287866,-0.550333 0.770466,-0.846667 0.491067,-0.296333 1.092201,-0.296333 0.524933,0 0.9144,0.211667 0.397934,0.211666 0.635001,0.5334 v -0.668867 h 1.1938 v 4.690535 h -1.1938 v -0.6858 q -0.228601,0.3302 -0.635001,0.550333 -0.397933,0.211667 -0.922867,0.211667 -0.592667,0 -1.083734,-0.3048 -0.4826,-0.3048 -0.770466,-0.855134 -0.279401,-0.5588 -0.279401,-1.278467 z m 3.691469,0.01693 q 0,-0.431801 -0.169334,-0.736601 -0.169333,-0.313267 -0.4572,-0.474133 -0.287867,-0.169334 -0.618067,-0.169334 -0.3302,0 -0.6096,0.160867 -0.2794,0.160867 -0.4572,0.474134 -0.169334,0.3048 -0.169334,0.728133 0,0.423334 0.169334,0.745067 0.1778,0.313267 0.4572,0.4826 0.287867,0.169334 0.6096,0.169334 0.3302,0 0.618067,-0.160867 0.287867,-0.169333 0.4572,-0.474134 0.169334,-0.313266 0.169334,-0.745066 z", "id", "path6943"], ["d", "m 70.669656,14.286073 q 0.2286,-0.372534 0.592667,-0.584201 0.372533,-0.211666 0.846667,-0.211666 v 1.2446 h -0.313267 q -0.5588,0 -0.846667,0.262467 -0.2794,0.262467 -0.2794,0.9144 v 2.336801 h -1.185334 v -4.690535 h 1.185334 z", "id", "path6945"], ["id", "right", "data-name", "Layer 2", "transform", "matrix(0.07975875,0,0,0.0715708,56.358554,118.60999)"], ["id", "Layer_1-2", "data-name", "Layer 1"], ["x", "66.599998", "y", "40.200001", "width", "16.299999", "height", "8.0799999", "transform", "rotate(180,74.7,44.2)", "fill", "#1b75bb", "id", "rect1351"], ["d", "M 0,77.1 V 22.8 A 14.4,14.4 0 0 1 8.1,10.1 17.8,17.8 0 0 1 24.3,10.2 L 75,37.4 A 14.3,14.3 0 0 1 82.9,49.9 14.4,14.4 0 0 1 75,62.5 L 24.3,89.7 A 17.8,17.8 0 0 1 8.1,89.8 14.4,14.4 0 0 1 0,77.1 Z", "fill", "#1b75bb", "id", "path1353", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 0,68.9 V 14.6 A 14.4,14.4 0 0 1 8.1,1.9 17.6,17.6 0 0 1 24.2,2 L 75,29.2 A 14.4,14.4 0 0 1 82.9,41.8 14.3,14.3 0 0 1 75,54.3 L 24.2,81.5 A 17.6,17.6 0 0 1 8.1,81.6 14.4,14.4 0 0 1 0,68.9 Z", "fill", "#2bbced", "id", "path1355", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "up", "data-name", "Layer 2", "transform", "matrix(0.07939898,-2.0202956e-4,2.0202956e-4,0.07939898,48.951586,113.22312)"], ["id", "Layer_1-2-7", "data-name", "Layer 1"], ["d", "M 81.6,60.4 55.1,16 A 15,15 0 0 0 29.6,16 L 3,60.4 H 0 v 8.9 0 a 15.1,15.1 0 0 0 1.9,7.4 15.1,15.1 0 0 0 12.9,7.3 h 55.1 a 14.8,14.8 0 0 0 12.8,-7.3 14.2,14.2 0 0 0 2,-7.4 v 0 -8.9 z", "fill", "#1b75bb", "id", "path8923", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 14.8,75.1 H 69.9 A 14.8,14.8 0 0 0 82.7,67.8 14.2,14.2 0 0 0 82.6,53.2 L 55.1,7.2 a 14.9,14.9 0 0 0 -25.5,0 l -27.5,46 a 14.4,14.4 0 0 0 -0.2,14.6 15.1,15.1 0 0 0 12.9,7.3 z", "fill", "#2bbced", "id", "path8925", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "left", "data-name", "Layer 2", "transform", "matrix(0.086725,0,0,0.07180546,41.47607,118.61013)"], ["id", "Layer_1-2-2", "data-name", "Layer 1"], ["x", "8.8999996", "y", "41.099998", "width", "14.9", "height", "8.0799999", "fill", "#1b75bb", "id", "rect1436"], ["d", "M 76.2,76.8 V 22.5 A 14.5,14.5 0 0 0 68.8,9.8 15.2,15.2 0 0 0 53.9,9.9 L 7.3,37.1 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#1b75bb", "id", "path1438", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 76.2,68.9 V 14.6 A 14.5,14.5 0 0 0 68.8,1.9 15.2,15.2 0 0 0 53.9,2 L 7.3,29.2 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#2bbced", "id", "path1440", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "blank-meteor-0", "transform", "matrix(2.7409696,0,0,2.7410659,-294.40204,-371.86964)", 2, "fill", "#543b89", "fill-opacity", "0.01", "stroke", "#b4b4b4", "stroke-width", "0.962516", "stroke-linecap", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.92503, 1.92503", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["d", "m 110.88039,173.77746 c 0.18794,-0.42788 0.76082,-0.66241 1.22392,-0.66462 0.29399,-9.8e-4 0.49058,0.36763 0.7809,0.41446 0.14685,0.0236 0.30611,-0.13998 0.4399,-0.0749 0.27429,0.13328 0.43649,0.80406 0.43649,0.80406 0,0 -0.28649,0.56466 -0.52391,0.7607 -0.17466,0.14422 -0.44484,0.13114 -0.62246,0.27262 -0.18891,0.15049 -0.20557,0.50604 -0.43375,0.58293 -0.35413,0.11931 -0.84946,-0.0152 -1.07545,-0.31553 -0.17993,-0.23908 0.0267,-0.60317 -0.011,-0.90115 -0.0379,-0.29919 -0.3357,-0.60282 -0.21462,-0.8785 z", "id", "path4756", 0, "sodipodi", "nodetypes", "aaaacaaaaaaa", 2, "fill", "#543b89", "fill-opacity", "0.01", "stroke", "#bebebe", "stroke-width", "0.0939932", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "0.187986, 0.187986", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "down", "data-name", "Layer 2", "transform", "matrix(0.07765434,0,0,0.07765434,49.0387,123.88264)"], ["id", "Layer_1-2-78", "data-name", "Layer 1"], ["d", "M 69.9,8.9 H 14.8 a 15,15 0 0 0 -11,4.8 H 0 v 9.5 0 a 13.9,13.9 0 0 0 2.1,7.6 l 27.5,46.1 a 15,15 0 0 0 25.5,0 L 82.6,30.8 a 14.8,14.8 0 0 0 2.1,-7.6 v 0 -9.5 h -3.8 a 15,15 0 0 0 -11,-4.8 z", "fill", "#1b75bb", "id", "path9041", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 69.9,0 H 14.8 A 15.1,15.1 0 0 0 1.9,7.3 14.6,14.6 0 0 0 2.1,22 l 27.5,46 a 14.9,14.9 0 0 0 25.5,0 L 82.6,22 A 14.4,14.4 0 0 0 82.7,7.3 14.8,14.8 0 0 0 69.9,0 Z", "fill", "#2bbced", "id", "path9043", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "blank-planet-0", "transform", "matrix(0.81267432,0,0,0.81267432,36.819086,91.113475)"], ["d", "m 112.72694,4.4284855 c 4.46588,4.46588 4.46588,11.7067695 0,16.1726395 -4.4662,4.46588 -11.70677,4.46588 -16.17297,0 -4.465876,-4.46587 -4.465876,-11.7067595 0,-16.1726395 4.4662,-4.46620002 11.70677,-4.46620002 16.17297,0", "id", "path11315", 2, "fill", "#3111a5", "fill-opacity", "0.01", "fill-rule", "nonzero", "stroke", "#bebebe", "stroke-width", "0.331098", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "0.662197, 0.662197", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "g11397", "transform", "matrix(0.3313455,0,0,-0.3313455,114.86064,1.7063555)", 2, "fill", "#3111a5", "fill-opacity", "0.01", "stroke", "#bebebe", "stroke-width", "0.999254", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.99851, 1.99851", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["d", "m 0,0 c -3.104,3.104 -8.583,2.665 -16.277,-1.327 2.268,-1.049 4.451,-2.365 6.485,-3.96 2.098,0.803 3.499,1.028 4.345,1.028 0.578,0 0.887,-0.108 0.995,-0.204 0.224,-0.224 0.514,-1.712 -0.738,-5.073 -0.557,-1.508 -1.424,-3.392 -2.74,-5.704 -3.96,-6.956 -10.434,-15.09 -18.236,-22.881 -7.792,-7.801 -15.925,-14.276 -22.892,-18.247 -1.723,-0.984 -3.2,-1.713 -4.463,-2.247 -4.227,-1.798 -6.046,-1.477 -6.314,-1.22 -0.257,0.267 -0.589,2.162 1.337,6.582 -1.541,2.044 -2.803,4.206 -3.82,6.463 -4.58,-8.347 -5.244,-14.222 -1.969,-17.498 1.359,-1.359 3.178,-2.044 5.426,-2.044 2.975,0 6.731,1.188 11.226,3.564 0.557,0.289 1.124,0.6 1.702,0.932 7.438,4.227 16.042,11.076 24.229,19.253 8.177,8.187 15.016,16.791 19.253,24.229 0.567,0.995 1.081,1.958 1.552,2.89 1.959,3.97 2.943,7.319 2.943,10.038 C 2.044,-3.179 1.359,-1.359 0,0", "id", "path11395", 2, "fill", "#3111a5", "fill-opacity", "0.01", "fill-rule", "nonzero", "stroke", "#bebebe", "stroke-width", "0.999254", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-miterlimit", "4", "stroke-dasharray", "1.99851, 1.99851", "stroke-dashoffset", "0", "stroke-opacity", "1"], ["id", "right-2", "data-name", "Layer 2", "transform", "matrix(0.07975875,0,0,0.0715708,138.90873,118.60999)"], ["id", "g396", "data-name", "Layer 1"], ["x", "66.599998", "y", "40.200001", "width", "16.299999", "height", "8.0799999", "transform", "rotate(180,74.7,44.2)", "fill", "#1b75bb", "id", "rect390"], ["d", "M 0,77.1 V 22.8 A 14.4,14.4 0 0 1 8.1,10.1 17.8,17.8 0 0 1 24.3,10.2 L 75,37.4 A 14.3,14.3 0 0 1 82.9,49.9 14.4,14.4 0 0 1 75,62.5 L 24.3,89.7 A 17.8,17.8 0 0 1 8.1,89.8 14.4,14.4 0 0 1 0,77.1 Z", "fill", "#1b75bb", "id", "path392", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 0,68.9 V 14.6 A 14.4,14.4 0 0 1 8.1,1.9 17.6,17.6 0 0 1 24.2,2 L 75,29.2 A 14.4,14.4 0 0 1 82.9,41.8 14.3,14.3 0 0 1 75,54.3 L 24.2,81.5 A 17.6,17.6 0 0 1 8.1,81.6 14.4,14.4 0 0 1 0,68.9 Z", "fill", "#2bbced", "id", "path394", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "up-2", "data-name", "Layer 2", "transform", "matrix(0.07939898,-2.0202956e-4,2.0202956e-4,0.07939898,131.50174,113.22312)"], ["id", "g404", "data-name", "Layer 1"], ["d", "M 81.6,60.4 55.1,16 A 15,15 0 0 0 29.6,16 L 3,60.4 H 0 v 8.9 0 a 15.1,15.1 0 0 0 1.9,7.4 15.1,15.1 0 0 0 12.9,7.3 h 55.1 a 14.8,14.8 0 0 0 12.8,-7.3 14.2,14.2 0 0 0 2,-7.4 v 0 -8.9 z", "fill", "#1b75bb", "id", "path400", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 14.8,75.1 H 69.9 A 14.8,14.8 0 0 0 82.7,67.8 14.2,14.2 0 0 0 82.6,53.2 L 55.1,7.2 a 14.9,14.9 0 0 0 -25.5,0 l -27.5,46 a 14.4,14.4 0 0 0 -0.2,14.6 15.1,15.1 0 0 0 12.9,7.3 z", "fill", "#2bbced", "id", "path402", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "left-2", "data-name", "Layer 2", "transform", "matrix(0.086725,0,0,0.07180546,124.02619,118.61013)"], ["id", "g414", "data-name", "Layer 1"], ["x", "8.8999996", "y", "41.099998", "width", "14.9", "height", "8.0799999", "fill", "#1b75bb", "id", "rect408"], ["d", "M 76.2,76.8 V 22.5 A 14.5,14.5 0 0 0 68.8,9.8 15.2,15.2 0 0 0 53.9,9.9 L 7.3,37.1 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#1b75bb", "id", "path410", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 76.2,68.9 V 14.6 A 14.5,14.5 0 0 0 68.8,1.9 15.2,15.2 0 0 0 53.9,2 L 7.3,29.2 a 14.4,14.4 0 0 0 0,25.1 l 46.6,27.2 a 15.2,15.2 0 0 0 14.9,0.1 14.5,14.5 0 0 0 7.4,-12.7 z", "fill", "#2bbced", "id", "path412", 2, "fill", "#faf56f", "fill-opacity", "1"], ["id", "down-2", "data-name", "Layer 2", "transform", "matrix(0.07765434,0,0,0.07765434,131.58886,123.88264)"], ["id", "g422", "data-name", "Layer 1"], ["d", "M 69.9,8.9 H 14.8 a 15,15 0 0 0 -11,4.8 H 0 v 9.5 0 a 13.9,13.9 0 0 0 2.1,7.6 l 27.5,46.1 a 15,15 0 0 0 25.5,0 L 82.6,30.8 a 14.8,14.8 0 0 0 2.1,-7.6 v 0 -9.5 h -3.8 a 15,15 0 0 0 -11,-4.8 z", "fill", "#1b75bb", "id", "path418", 2, "fill", "#fac721", "fill-opacity", "1"], ["d", "M 69.9,0 H 14.8 A 15.1,15.1 0 0 0 1.9,7.3 14.6,14.6 0 0 0 2.1,22 l 27.5,46 a 14.9,14.9 0 0 0 25.5,0 L 82.6,22 A 14.4,14.4 0 0 0 82.7,7.3 14.8,14.8 0 0 0 69.9,0 Z", "fill", "#2bbced", "id", "path420", 2, "fill", "#faf56f", "fill-opacity", "1"]], template: function PlanetfactoryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "defs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "linearGradient", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "stop", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "stop", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "linearGradient", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "linearGradient", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "linearGradient", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "stop", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "stop", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "rect", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "use", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "use", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "use", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "use", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "use", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "use", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "use", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "use", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "use", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "use", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "use", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "use", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "use", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "use", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "use", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "use", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "use", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "use", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "use", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "g", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "g", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "path", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "g", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "path", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "g", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "path", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "g", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "path", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "g", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "path", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "path", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "g", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "path", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "g", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "path", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "g", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "path", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "g", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "path", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "g", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "path", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "g", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "path", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "g", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "path", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "g", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "path", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "g", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "path", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "g", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "path", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "g", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "path", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "g", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "path", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "g", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "path", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "g", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "path", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "g", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "path", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "g", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "path", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "g", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "path", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "g", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](81, "path", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "g", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "path", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "path", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "g", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "path", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "g", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "g", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "path", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "g", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "path", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "g", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "path", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "g", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](95, "path", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "g", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "path", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "g", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "path", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "g", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "path", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "g", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "path", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "g", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "path", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "g", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "path", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "g", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "path", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "g", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](111, "path", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "g", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "path", 113);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "g", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "path", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "g", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "path", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "g", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "path", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "g", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](121, "path", 121);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "g", 122);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "path", 123);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "g", 124);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](125, "path", 125);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "g", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "path", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "g", 128);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](129, "path", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "g", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "path", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "g", 132);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](133, "path", 133);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "g", 134);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](135, "path", 135);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "g", 136);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "path", 137);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](138, "path", 138);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](139, "ellipse", 139);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](140, "ellipse", 140);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](141, "ellipse", 141);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "g", 142);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](143, "circle", 143);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](144, "circle", 144);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "g", 145);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](146, "circle", 146);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](147, "circle", 147);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "g", 148);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](149, "circle", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](150, "circle", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "g", 151);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "circle", 152);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](153, "circle", 153);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "g", 154);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](155, "circle", 155);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](156, "circle", 156);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "g", 157);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](158, "path", 158);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "g", 159);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](160, "path", 160);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "g", 161);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "g", 162);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "path", 163);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "g", 164);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](165, "path", 165);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "g", 166);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](167, "path", 167);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "g", 168);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](169, "path", 169);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "g", 170);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](171, "path", 171);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "g", 172);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](173, "path", 173);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "g", 174);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](175, "path", 175);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "g", 176);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](177, "path", 177);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "g", 178);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](179, "path", 179);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "g", 180);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](181, "path", 181);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "g", 182);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](183, "path", 183);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "g", 184);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](185, "path", 185);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "g", 186);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](187, "ellipse", 187);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "path", 188);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](189, "path", 189);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "g", 190);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](191, "path", 191);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](192, "g", 192);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](193, "path", 193);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](194, "path", 194);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](195, "path", 195);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](196, "path", 196);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](197, "path", 197);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "g", 198);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](199, "path", 199);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "g", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](201, "path", 201);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](202, "path", 202);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](203, "path", 203);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](204, "path", 204);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](205, "path", 205);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "g", 206);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "g", 207);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](208, "rect", 208);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](209, "path", 209);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](210, "path", 210);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "g", 211);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "g", 212);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](213, "path", 213);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](214, "path", 214);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "g", 215);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "g", 216);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](217, "rect", 217);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](218, "path", 218);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](219, "path", 219);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "g", 220);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](221, "path", 221);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "g", 222);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "g", 223);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](224, "path", 224);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](225, "path", 225);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "g", 226);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](227, "path", 227);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](228, "g", 228);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](229, "path", 229);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](230, "g", 230);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "g", 231);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](232, "rect", 232);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](233, "path", 233);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](234, "path", 234);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "g", 235);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "g", 236);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](237, "path", 237);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](238, "path", 238);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "g", 239);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "g", 240);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](241, "rect", 241);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](242, "path", 242);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](243, "path", 243);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](244, "g", 244);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "g", 245);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](246, "path", 246);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](247, "path", 247);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["svg[_ngcontent-%COMP%] {\r\n    height: auto;\r\n    width: auto;\r\n    min-width: 300px;\r\n    max-height: 90%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGxhbmV0ZmFjdG9yeS9wbGFuZXRmYWN0b3J5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvcGxhbmV0ZmFjdG9yeS9wbGFuZXRmYWN0b3J5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzdmcge1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xyXG4gICAgbWF4LWhlaWdodDogOTAlO1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlanetfactoryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-planetfactory',
                templateUrl: './planetfactory.component.html',
                styleUrls: ['./planetfactory.component.css']
            }]
    }], function () { return []; }, null); })();
var totalNum = 0;
var totalNumM = 0;
var totalNumP = 0;
var filledMeteors = [];
var filledPlanets = [];
var sunArr = [];
var moonArr = [];
var planetArr = [];
function getColCoords(numRows, newX, newY, delta) {
    var col = [];
    for (var i = 0; i < numRows; i++) {
        col.push({ x: newX, y: newY + i * delta });
    }
    return col;
}
var sunCoords = getColCoords(2, 180, -200, 60);
var planetCoords = (getColCoords(5, 200, -90, 30)).concat(getColCoords(4, 230, -90, 30));
var moonCoords = getColCoords(9, 140, -15, 15);
var asteroidColCoords = getColCoords(10, 9, -160, 10).reverse();
var coordsM = getGridCoords(-101.4, -70.5, 10, 10, 10);
var coordsP = getGridCoords(19.4, 91, 5, 2, 20);
function fill(num, filledRects, meteors) {
    if (meteors) {
        if (num > 100)
            totalNumM = 100;
        else if (num < 0)
            totalNumM = 0;
        else
            totalNumM = num;
        var index = 0;
        filledRects.forEach(obj => {
            if (obj.on == false && index < totalNumM) {
                gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "visible" });
                obj.on = true;
            }
            else if (obj.on == true && index >= totalNumM) {
                gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "hidden" });
                obj.on = false;
            }
            index++;
        });
        totalNum = totalNumM + 10 * totalNumP;
    }
    else {
        if (num > 10)
            totalNumP = 10;
        else if (num < 0)
            totalNumP = 0;
        else
            totalNumP = num;
        var index = 0;
        filledRects.forEach(obj => {
            if (obj.on == false && index < totalNumP) {
                gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "visible" });
                obj.on = true;
            }
            else if (obj.on == true && index >= totalNumP) {
                gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledRects[index].el, { visibility: "hidden" });
                obj.on = false;
            }
            index++;
        });
        totalNum = totalNumM + 10 * totalNumP;
    }
}
function getGridCoords(newX, newY, numRows, numCols, delta) {
    var coords = [];
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            coords.push({ x: newX + j * delta, y: newY + i * -delta });
        }
    }
    return coords;
}
function setup(meteor, moon, planet, sun) {
    // ARROWS ///////////////////
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    up.addEventListener('click', function () { fill(totalNumM + 10, filledMeteors, true); });
    down.addEventListener('click', function () { fill(totalNumM - 10, filledMeteors, true); });
    left.addEventListener('click', function () { fill(totalNumM - 1, filledMeteors, true); });
    right.addEventListener('click', function () { fill(totalNumM + 1, filledMeteors, true); });
    const up2 = document.getElementById("up-2");
    const down2 = document.getElementById("down-2");
    const left2 = document.getElementById("left-2");
    const right2 = document.getElementById("right-2");
    up2.addEventListener('click', function () { fill(totalNumP + 2, filledPlanets, false); });
    down2.addEventListener('click', function () { fill(totalNumP - 2, filledPlanets, false); });
    left2.addEventListener('click', function () { fill(totalNumP - 1, filledPlanets, false); });
    right2.addEventListener('click', function () { fill(totalNumP + 1, filledPlanets, false); });
    const start = document.getElementById("startBtn");
    start.addEventListener('click', function () { play(meteor, moon, planet, sun); });
    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener('click', function () { clear(); });
    // BLOCKS //////////////////
    const blankMeteor = document.getElementById("blank-meteor-0");
    const blankPlanet = document.getElementById("blank-planet-0");
    const layer = document.getElementById("layer1");
    var blankPlanets = [];
    var blankMeteors = [];
    //meteors///////////////////
    var index = 0;
    coordsM.forEach(c => {
        var temp = blankMeteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x, y: c.y });
        blankMeteors.push({ el: temp, num: index });
        layer.appendChild(temp);
        index++;
    });
    blankMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledMeteors, true);
        });
    });
    index = 0;
    coordsM.forEach(c => {
        var temp = meteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x - 9.13, y: c.y - 0.2, visibility: "hidden" });
        filledMeteors.push({ el: temp, num: index, on: false });
        layer.appendChild(temp);
        index++;
    });
    filledMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledMeteors, true);
        });
    });
    //planets////////////////////////////////
    index = 0;
    coordsP.forEach(c => {
        var temp = blankPlanet === null || blankPlanet === void 0 ? void 0 : blankPlanet.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x, y: c.y });
        blankPlanets.push({ el: temp, num: index });
        layer.appendChild(temp);
        index++;
    });
    blankPlanets.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledPlanets, false);
        });
    });
    index = 0;
    coordsP.forEach(c => {
        var temp = planet === null || planet === void 0 ? void 0 : planet.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: c.x + 72.4, y: c.y - 101.4, visibility: "hidden" });
        filledPlanets.push({ el: temp, num: index, on: false });
        layer.appendChild(temp);
        index++;
    });
    filledPlanets.forEach(obj => {
        (obj.el).addEventListener('click', function () {
            fill(obj.num + 1, filledPlanets, false);
        });
    });
}
function play(meteor, moon, planet, sun) {
    var tl = gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].timeline({ paused: true });
    const layer = document.getElementById("layer1");
    const layer0 = document.getElementById("layer3");
    var meteorArr = [];
    var planetInputArr = [];
    for (var i = 0; i < totalNumM; i++) {
        var temp = meteor.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: coordsM[i].x - 9.13, y: coordsM[i].y - 0.2 });
        meteorArr.push(temp);
        layer.appendChild(temp);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledMeteors[i].el, { visibility: "hidden" });
        filledMeteors[i].on = false;
    }
    for (var i = 0; i < totalNumP; i++) {
        var temp = planet.cloneNode(true);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(temp, { x: coordsP[i].x + 72.4, y: coordsP[i].y - 101.4 });
        planetInputArr.push(temp);
        layer.appendChild(temp);
        gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(filledPlanets[i].el, { visibility: "hidden" });
        filledPlanets[i].on = false;
    }
    var numSuns = Math.floor(totalNum / 100);
    totalNum -= numSuns * 100;
    var numPlanets = Math.floor(totalNum / 10);
    totalNum -= numPlanets * 10;
    var numMoons = totalNum;
    //console.log(numSuns, numPlanets, numMoons);
    var planetIndex = 0;
    var moonIndex = 0;
    var planetPortalX = 142;
    var planetPortalY = -40;
    var meteorPortalX = 40;
    var meteorPortalY = -115;
    tl.to(meteor, { duration: 0.5 });
    if (numSuns > 0) {
        for (var i = 0; i < numSuns; i++) {
            var startJ = 0;
            if (planetIndex == 0) {
                for (var n = 0; n < totalNumP; n++) {
                    tl.to(planetInputArr[planetIndex], { x: planetPortalX, y: planetPortalY, scale: 0, duration: 1 }, "<+=0");
                    planetIndex++;
                }
                startJ = planetIndex * 10;
            }
            tl.to(moon, { duration: 0.25 });
            for (var j = startJ; j < 100; j++) {
                tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0");
                moonIndex++;
            }
            var tempSun = sun.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempSun, { x: 50, y: -160, scale: 0 });
            layer0.appendChild(tempSun);
            sunArr.push(tempSun);
            tl.to(tempSun, { duration: 0.25 });
            tl.to(tempSun, { x: sunCoords[i].x, y: sunCoords[i].y, scale: 4, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempSun, { duration: 0.25 });
        }
    }
    if (numPlanets > 0) {
        for (var i = 0; i < numPlanets; i++) {
            if (planetIndex < totalNumP) {
                tl.to(planetInputArr[planetIndex], { x: planetPortalX, y: planetPortalY, scale: 0, duration: 1 }, "<+=0");
                planetIndex++;
            }
            else {
                for (var j = 0; j < 10; j++) {
                    tl.to(meteorArr[moonIndex], { x: asteroidColCoords[j].x, y: asteroidColCoords[j].y, duration: 1 }, "<+=0");
                    moonIndex++;
                }
                moonIndex -= 10;
                tl.to(meteor, { duration: 0.001 });
                for (var j = 0; j < 10; j++) {
                    tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY, scale: 0, duration: 1.5 }, "<+=0.15");
                    moonIndex++;
                }
            }
            var tempPlanet = planet.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempPlanet, { x: planetPortalX, y: planetPortalY, scale: 0 });
            layer0.appendChild(tempPlanet);
            planetArr.push(tempPlanet);
            tl.to(tempPlanet, { duration: 0.25 });
            tl.to(tempPlanet, { x: planetCoords[i].x, y: planetCoords[i].y, scale: 0.8, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempPlanet, { duration: 0.25 });
        }
    }
    if (numMoons > 0) {
        for (var i = 0; i < numMoons; i++) {
            tl.to(meteorArr[moonIndex], { x: meteorPortalX - 20, y: meteorPortalY, duration: 1 }, "<+=0");
            tl.to(meteorArr[moonIndex], { x: meteorPortalX, y: meteorPortalY + 3, scale: 0, duration: 0.5 });
            moonIndex++;
            var tempMoon = moon.cloneNode(true);
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].set(tempMoon, { x: 115, y: 14, scale: 0 });
            layer0.appendChild(tempMoon);
            moonArr.push(tempMoon);
            tl.to(tempMoon, { duration: 0.25 });
            tl.to(tempMoon, { x: moonCoords[i].x, y: moonCoords[i].y, scale: 0.55, duration: 1 }); //SCALE 1 NOT WORKING
            tl.to(tempMoon, { duration: 0.25 });
        }
    }
    tl.play();
    totalNum = 0;
    totalNumP = 0;
    totalNumM = 0;
    gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].registerPlugin(gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"]);
    sunArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
    planetArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
    moonArr.forEach(el => {
        gsap_Draggable__WEBPACK_IMPORTED_MODULE_2__["Draggable"].create(el);
    });
}
function clear() {
    sunArr.forEach(el => {
        el.remove();
    });
    planetArr.forEach(el => {
        el.remove();
    });
    moonArr.forEach(el => {
        el.remove();
    });
}


/***/ }),

/***/ "./src/app/spotlight/spotlight.component.ts":
/*!**************************************************!*\
  !*** ./src/app/spotlight/spotlight.component.ts ***!
  \**************************************************/
/*! exports provided: SpotlightComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpotlightComponent", function() { return SpotlightComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _spotlightClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spotlightClass */ "./src/app/spotlight/spotlightClass.ts");



const _c0 = ["lowerRenderEl"];
const _c1 = ["upperRenderEl"];
const _c2 = ["goBtnRenderEl"];
// Where does "State" get fetched? 
class SpotlightComponent {
    constructor() {
        // #region INPUTS
        this.target = null;
        this.min = 0;
        this.max = null;
        this.spotlightWidth = 0.10;
        this.denominator = null;
        // #region Reporting Values
        this.value = ""; // previousy ng-model aka Question.FreeFormAnswers[0]
        this.state = "";
        // #endregion
        this.decimals = null;
        this.tickStepSize = 4;
        this.labelTicks = null;
        this.timeStep = 1;
        this.hints = [];
        this.majorJumps = null;
        this.padding = 0.10;
        this.reduceTicks = false;
        this.zoom = true;
        this.reduceHints = false;
        this.reduceEndpoints = false;
        this.reduceTarget = false;
    }
    // #endregion
    ngAfterViewInit() {
        const setup = {
            target: this.target,
            min: this.min,
            max: this.max,
            spotlightWidth: this.spotlightWidth,
            denominator: this.denominator,
            decimals: this.decimals,
            tickStepSize: this.tickStepSize,
            labelTicks: this.labelTicks,
            timeStep: 1,
            //hints: [60,30], // optional, defaults to null
            majorJumps: this.majorJumps,
            padding: this.padding,
            zoom: this.zoom,
            reduceTicks: this.reduceTicks,
            reduceHints: true,
            reduceEndpoints: false,
            reduceTarget: false,
        };
        //console.log("state",state)
        const els = [this.lowerRenderEl.nativeElement, this.upperRenderEl.nativeElement];
        const puzzle = Object(_spotlightClass__WEBPACK_IMPORTED_MODULE_1__["PuzzleSpotlight"])(els, setup);
        this.goBtnRenderEl.nativeElement.addEventListener("pointerdown", puzzle.goButtonClicked);
        puzzle.onSuccess = () => {
            window.alert("Correct!");
        };
        puzzle.onTryAgain = () => {
            window.alert("Try Again!");
        };
    }
}
SpotlightComponent.ɵfac = function SpotlightComponent_Factory(t) { return new (t || SpotlightComponent)(); };
SpotlightComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpotlightComponent, selectors: [["app-spotlight"]], viewQuery: function SpotlightComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.lowerRenderEl = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.upperRenderEl = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.goBtnRenderEl = _t.first);
    } }, inputs: { target: "target", min: "min", max: "max", spotlightWidth: "spotlightWidth", denominator: "denominator", value: "value", state: "state", decimals: "decimals", tickStepSize: "tickStepSize", labelTicks: "labelTicks", timeStep: "timeStep", hints: "hints", majorJumps: "majorJumps", padding: "padding", reduceTicks: "reduceTicks", zoom: "zoom", reduceHints: "reduceHints", reduceEndpoints: "reduceEndpoints", reduceTarget: "reduceTarget" }, decls: 126, vars: 0, consts: [["viewBox", "0 0 1280 720", 1, "lowerSvg"], ["lowerRenderEl", ""], ["d", "M1280,36C1280,16.131 1263.87,-0 1244,-0L36,-0C16.131,-0 0,16.131 0,36L0,684C0,703.869 16.131,720 36,720L1244,720C1263.87,720 1280,703.869 1280,684L1280,36Z", 2, "fill", "none"], ["id", "_clip1"], ["d", "M1280,36C1280,16.131 1263.87,-0 1244,-0L36,-0C16.131,-0 0,16.131 0,36L0,684C0,703.869 16.131,720 36,720L1244,720C1263.87,720 1280,703.869 1280,684L1280,36Z"], ["id", "_clipShine"], ["id", "clipShine", "d", "M1280,36C1280,16.131 1263.87,-0 1244,-0L36,-0C16.131,-0 0,16.131 0,36L0,684C0,703.869 16.131,720 36,720L1244,720C1263.87,720 1280,703.869 1280,684L1280,36Z"], ["clip-path", "url(#_clip1)"], ["x", "0", "y", "114.387", "width", "1280", "height", "605.613", 2, "fill", "url(#_Radial2)"], ["d", "M399.406,661.853C399.406,659.149 397.21,656.953 394.506,656.953L51.444,656.953C48.74,656.953 46.544,659.149 46.544,661.853L46.544,715.1C46.544,717.804 48.74,720 51.444,720L394.506,720C397.21,720 399.406,717.804 399.406,715.1L399.406,661.853Z", 2, "fill", "rgb(42, 70, 112)"], ["cx", "87.701", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "143.534", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "199.685", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "255.837", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "311.988", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "367.821", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["d", "M1238.86,661.853C1238.86,659.149 1236.66,656.953 1233.96,656.953L890.897,656.953C888.193,656.953 885.997,659.149 885.997,661.853L885.997,715.1C885.997,717.804 888.193,720 890.897,720L1233.96,720C1236.66,720 1238.86,717.804 1238.86,715.1L1238.86,661.853Z", 2, "fill", "rgb(42, 70, 112)"], ["cx", "927.154", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "982.986", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "1039.14", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "1095.29", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "1151.44", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["cx", "1207.27", "cy", "688.447", "rx", "21.695", "ry", "20.203", 2, "fill", "rgb(33, 37, 73)"], ["d", "M1280,155.395L1280,-0L0,-0L0,155.395L11.026,155.395L61.747,202.869L9.766,251.522L11.656,253.291L0,253.291L0,266.855L1280,266.855L1280,253.291L1268.03,253.291L1268.03,250.637L1216.68,202.869L1267.4,155.395L1280,155.395ZM538.715,155.395L497.13,194.318L455.86,155.395L538.715,155.395ZM396.633,155.395L355.048,194.318L313.463,155.395L396.633,155.395ZM254.551,155.395L212.966,194.318L171.381,155.395L254.551,155.395ZM29.299,155.395L112.469,155.395L70.884,194.318L29.299,155.395ZM26.148,253.291L70.884,211.42L115.619,253.291L26.148,253.291ZM131.686,253.291L130.111,253.291L131.686,251.817L131.686,253.291ZM131.686,251.227L80.02,202.869L130.741,155.395L131.686,155.395L131.686,251.227ZM154.999,157.164L203.83,202.869L154.999,248.573L154.999,157.164ZM168.23,253.291L212.966,211.42L257.701,253.291L168.23,253.291ZM273.768,253.291L272.193,253.291L273.768,251.817L273.768,253.291ZM273.768,251.227L222.102,202.869L272.823,155.395L273.768,155.395L273.768,251.227ZM297.081,157.164L345.912,202.869L297.081,248.573L297.081,157.164ZM310.313,253.291L355.048,211.42L399.783,253.291L310.313,253.291ZM415.85,253.291L414.275,253.291L415.85,251.817L415.85,253.291ZM415.85,251.227L364.184,202.869L415.22,155.395L415.85,155.395L415.85,251.227ZM439.163,157.164L487.994,202.869L439.163,248.573L439.163,157.164ZM452.71,253.291L497.13,211.42L541.866,253.291L452.71,253.291ZM558.248,253.291L556.672,253.291L558.248,251.817L558.248,253.291ZM558.248,250.932L506.581,202.869L557.302,155.395L557.933,155.395L558.248,250.932ZM597.942,155.395L680.482,155.395L639.212,194.023L597.942,155.395ZM581.56,157.754L629.761,202.869L581.56,247.984L581.56,157.754ZM594.792,253.291L639.212,211.42L683.633,252.996L594.792,253.291ZM699.7,250.637L648.664,202.869L699.07,155.395L699.7,155.395L699.7,250.637ZM1107.04,155.395L1065.46,194.318L1023.87,155.395L1107.04,155.395ZM964.962,155.395L923.377,194.318L881.792,155.395L964.962,155.395ZM822.88,155.395L781.295,194.318L739.71,155.395L822.88,155.395ZM723.328,157.164L771.843,202.869L723.328,248.573L723.328,157.164ZM736.559,253.291L780.98,211.42L826.03,253.291L736.559,253.291ZM841.782,253.291L840.207,253.291L841.782,251.817L841.782,253.291ZM841.782,251.227L790.431,202.869L841.152,155.395L841.782,155.395L841.782,251.227ZM865.41,157.164L914.241,202.869L865.41,248.573L865.41,157.164ZM878.641,253.291L923.377,211.42L968.112,253.291L878.641,253.291ZM984.179,253.291L982.604,253.291L984.179,251.817L984.179,253.291ZM984.179,250.932L932.513,202.869L983.234,155.395L983.864,155.395L984.179,250.932ZM1007.49,157.164L1056.32,202.869L1007.49,248.573L1007.49,157.164ZM1020.72,253.291L1065.46,211.42L1110.19,253.291L1020.72,253.291ZM1126.26,253.291L1124.69,253.291L1126.26,251.817L1126.26,253.291ZM1126.26,250.932L1074.6,202.869L1125.32,155.395L1126.26,155.395L1126.26,250.932ZM1149.57,157.164L1198.4,202.869L1149.57,248.573L1149.57,157.164ZM1252.28,253.291L1162.81,253.291L1207.54,211.42L1252.28,253.291ZM1207.54,194.318L1165.96,155.395L1249.13,155.395L1207.54,194.318Z", 2, "fill", "rgb(33, 37, 73)", "fill-rule", "nonzero"], ["d", "M197.488,130.431L199.402,128.649L169.093,114.387L146.76,114.387L146.76,142.91L159.202,160.737L197.488,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "159.202", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M197.488,144.693C196.385,151.826 189.752,157.177 182.014,157.177C174.275,157.177 167.643,151.826 166.54,144.693C166.713,136.819 173.717,130.43 182.173,130.431C190.575,130.431 197.488,136.869 197.488,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M153.779,157.468L161.117,157.468L161.117,131.917L153.779,131.917C149.312,131.917 145.484,136.374 145.484,142.019L145.484,147.961C145.803,153.012 149.312,157.468 153.779,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M205.783,157.468L198.764,157.468L198.764,131.917L205.783,131.917C210.568,131.917 214.078,136.374 214.078,142.019L214.078,147.961C214.078,153.012 210.568,157.468 205.783,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M165.583,166.679L165.583,159.845L193.021,159.845L193.021,166.679C193.021,170.838 188.235,174.404 182.493,174.404L176.112,174.404C170.369,174.404 165.583,170.838 165.583,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M193.021,122.706L193.021,129.54L165.583,129.54L165.583,122.706C165.583,118.547 170.369,114.982 176.112,114.982L182.493,114.982C188.235,114.982 193.021,118.547 193.021,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M148.993,130.431L150.588,128.649L120.598,114.387L97.946,114.387L97.946,142.91L110.708,160.737L148.993,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "110.708", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M148.993,144.693C148.995,144.792 148.996,144.891 148.996,144.99C148.996,152.976 141.939,159.548 133.363,159.548C124.787,159.548 117.73,152.976 117.73,144.99C117.73,137.004 124.785,130.433 133.36,130.431C133.466,130.429 133.573,130.428 133.679,130.428C142.08,130.428 148.993,136.866 148.993,144.69C148.993,144.691 148.993,144.692 148.993,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M105.284,157.468L112.622,157.468L112.622,131.917L105.284,131.917C100.818,131.917 96.989,136.374 96.989,142.019L96.989,147.961C96.989,153.012 100.818,157.468 105.284,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M157.288,157.468L149.95,157.468L149.95,131.917L157.288,131.917C161.755,131.917 165.583,136.374 165.583,142.019L165.583,147.961C165.583,153.012 161.755,157.468 157.288,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M117.089,166.679L117.089,159.845L144.526,159.845L144.526,166.679C144.526,170.838 139.741,174.107 133.998,174.107L127.617,174.107C121.874,174.404 117.089,170.838 117.089,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M144.526,122.706L144.526,129.54L117.089,129.54L117.089,122.706C117.089,118.547 121.874,114.982 127.617,114.982L133.998,114.982C139.741,114.982 144.526,118.547 144.526,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M100.179,130.431L102.094,128.649L72.104,114.387L49.452,114.387L49.452,142.91L62.213,160.737L100.179,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "62.213", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M100.179,144.693C100.182,144.793 100.183,144.893 100.183,144.993C100.183,152.653 93.414,158.957 85.188,158.957C85.08,158.957 84.973,158.956 84.865,158.954C76.464,158.954 69.551,152.516 69.551,144.693C69.551,136.869 76.464,130.431 84.865,130.431C84.973,130.429 85.08,130.428 85.188,130.428C93.414,130.428 100.183,136.732 100.183,144.392C100.183,144.492 100.182,144.593 100.179,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M56.79,157.468L64.128,157.468L64.128,131.917L56.79,131.917C52.323,131.917 48.495,136.374 48.495,142.019L48.495,147.961C48.495,153.012 52.323,157.468 56.79,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M108.794,157.468L101.456,157.468L101.456,131.917L108.794,131.917C113.26,131.917 117.089,136.374 117.089,142.019L117.089,147.961C117.089,153.012 113.26,157.468 108.794,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M68.275,166.679L68.275,159.845L96.032,159.845L96.032,166.679C96.032,170.838 91.246,174.107 85.184,174.107L78.804,174.107C73.061,174.404 68.275,170.838 68.275,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M96.032,122.706L96.032,129.54L68.275,129.54L68.275,122.706C68.275,118.547 73.061,114.982 79.123,114.982L85.503,114.982C91.246,114.982 96.032,118.547 96.032,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M51.685,130.431L53.599,128.649L23.609,114.387L0.957,114.387L0.957,142.91L13.719,160.737L51.685,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "13.719", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M51.685,144.693C50.582,151.826 43.95,157.177 36.211,157.177C28.473,157.177 21.84,151.826 20.738,144.693C20.91,136.819 27.914,130.43 36.371,130.431C44.772,130.431 51.685,136.869 51.685,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M8.295,157.468L15.314,157.468L15.314,131.917L8.295,131.917C3.509,131.917 0,136.374 0,142.019L0,147.961C0,153.012 3.509,157.468 8.295,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M60.299,157.468L52.961,157.468L52.961,131.917L60.299,131.917C64.766,131.917 68.275,136.374 68.275,142.019L68.275,147.961C68.275,153.012 64.766,157.468 60.299,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M19.781,166.679L19.781,159.845L47.218,159.845L47.218,166.679C47.218,170.838 42.433,174.107 36.69,174.107L30.309,174.107C24.566,174.404 19.781,170.838 19.781,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M47.218,122.706L47.218,129.54L19.781,129.54L19.781,122.706C19.781,118.547 24.566,114.982 30.309,114.982L36.69,114.982C42.433,114.982 47.218,118.547 47.218,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1076.45,130.431L1074.54,128.649L1104.85,114.387L1127.18,114.387L1127.18,142.91L1114.74,160.737L1076.45,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "1074.54", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M1076.45,144.693C1076.45,144.792 1076.45,144.891 1076.45,144.99C1076.45,152.976 1083.5,159.548 1092.08,159.548C1100.66,159.548 1107.71,152.976 1107.71,144.99C1107.71,137.004 1100.66,130.433 1092.08,130.431L1091.77,130.431C1083.43,130.588 1076.62,136.93 1076.45,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M1120.16,157.468L1112.82,157.468L1112.82,131.917L1120.16,131.917C1124.63,131.917 1128.14,136.374 1128.14,141.722L1128.14,147.664C1128.45,153.012 1124.63,157.468 1120.16,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1068.16,157.468L1075.17,157.468L1075.17,131.917L1068.16,131.917C1063.37,131.917 1059.86,136.374 1059.86,141.722L1059.86,147.664C1059.86,153.012 1063.37,157.468 1068.16,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1108.36,166.679L1108.36,159.845L1080.92,159.845L1080.92,166.679C1080.92,170.838 1085.7,174.107 1091.45,174.107L1097.83,174.107C1103.57,174.404 1108.36,170.838 1108.36,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1080.92,122.706L1080.92,129.54L1108.36,129.54L1108.36,122.706C1108.36,118.547 1103.57,114.982 1097.83,114.982L1091.45,114.982C1085.7,114.982 1080.92,118.547 1080.92,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1124.94,130.431L1123.35,128.649L1153.34,114.387L1175.99,114.387L1175.99,142.91L1163.23,160.737L1124.94,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "1123.35", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M1124.94,144.693C1124.94,144.792 1124.94,144.891 1124.94,144.99C1124.94,152.976 1132,159.548 1140.58,159.548C1149.15,159.548 1156.21,152.976 1156.21,144.99C1156.21,137.004 1149.15,130.433 1140.58,130.431C1140.47,130.429 1140.37,130.428 1140.26,130.428C1131.86,130.428 1124.94,136.866 1124.94,144.69C1124.94,144.691 1124.94,144.692 1124.94,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M1168.65,157.468L1161.32,157.468L1161.32,131.917L1168.65,131.917C1173.12,131.917 1176.95,136.374 1176.95,141.722L1176.95,147.664C1176.95,153.012 1173.12,157.468 1168.65,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1116.65,157.468L1123.67,157.468L1123.67,131.917L1116.65,131.917C1112.18,131.917 1108.36,136.374 1108.36,141.722L1108.36,147.664C1108.36,153.012 1112.18,157.468 1116.65,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1156.85,166.679L1156.85,159.845L1129.41,159.845L1129.41,166.679C1129.41,170.838 1134.2,174.107 1139.94,174.107L1146.32,174.107C1152.06,174.404 1156.85,170.838 1156.85,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1129.41,122.706L1129.41,129.54L1156.85,129.54L1156.85,122.706C1156.85,118.547 1152.06,114.982 1146.32,114.982L1139.94,114.982C1134.2,114.982 1129.41,118.547 1129.41,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1173.76,130.431L1171.84,128.649L1201.83,114.387L1224.49,114.387L1224.49,142.91L1211.73,160.737L1173.76,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "1171.84", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M1173.76,144.693C1173.76,152.516 1180.67,158.954 1189.07,158.954C1197.47,158.954 1204.39,152.516 1204.39,144.693C1204.39,136.869 1197.47,130.431 1189.07,130.431C1188.96,130.429 1188.86,130.428 1188.75,130.428C1180.52,130.428 1173.76,136.732 1173.76,144.392C1173.76,144.492 1173.76,144.593 1173.76,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M1217.15,157.468L1209.81,157.468L1209.81,131.917L1217.15,131.917C1221.62,131.917 1225.44,136.374 1225.44,141.722L1225.44,147.664C1225.44,153.012 1221.62,157.468 1217.15,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1165.14,157.468L1172.48,157.468L1172.48,131.917L1165.14,131.917C1160.68,131.917 1156.85,136.374 1156.85,141.722L1156.85,147.664C1156.85,153.012 1160.68,157.468 1165.14,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1205.34,166.679L1205.34,159.845L1177.91,159.845L1177.91,166.679C1177.91,170.838 1182.69,174.107 1188.75,174.107L1195.13,174.107C1195.57,174.167 1196.01,174.197 1196.45,174.197C1201.03,174.197 1204.9,170.921 1205.34,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1177.91,122.706L1177.91,129.54L1205.34,129.54L1205.34,122.706C1205.34,118.547 1200.88,114.982 1194.82,114.982L1188.43,114.982C1182.69,114.982 1177.91,118.547 1177.91,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1222.25,130.431L1220.34,128.649L1250.33,114.387L1272.98,114.387L1272.98,142.91L1260.22,160.737L1222.25,130.431Z", 2, "fill", "rgb(21, 29, 61)", "fill-rule", "nonzero"], ["x", "1220.34", "y", "128.649", "width", "39.88", "height", "32.118", 2, "fill", "rgb(42, 70, 112)"], ["d", "M1222.25,144.693C1222.25,152.516 1229.17,158.954 1237.57,158.954C1245.97,158.954 1252.88,152.516 1252.88,144.693C1252.88,136.869 1245.97,130.431 1237.57,130.431C1237.46,130.429 1237.35,130.428 1237.25,130.428C1229.02,130.428 1222.25,136.732 1222.25,144.392C1222.25,144.492 1222.25,144.593 1222.25,144.693Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M1265.64,157.468L1258.62,157.468L1258.62,131.917L1265.64,131.917C1270.43,131.917 1273.94,136.374 1273.94,141.722L1273.94,147.664C1273.94,153.012 1270.43,157.468 1265.64,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1213.64,157.468L1220.98,157.468L1220.98,131.917L1213.64,131.917C1209.17,131.917 1205.66,136.374 1205.66,141.722L1205.66,147.664C1205.34,153.012 1209.17,157.468 1213.64,157.468Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1254.16,166.679L1254.16,159.845L1226.72,159.845L1226.72,166.679C1226.72,170.838 1231.51,174.107 1237.25,174.107L1243.63,174.107C1249.37,174.404 1254.16,170.838 1254.16,166.679Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["d", "M1226.72,122.706L1226.72,129.54L1254.16,129.54L1254.16,122.706C1254.16,118.547 1249.37,114.982 1243.63,114.982L1237.25,114.982C1231.51,114.982 1226.72,118.547 1226.72,122.706Z", 2, "fill", "rgb(42, 70, 112)", "fill-rule", "nonzero"], ["id", "SubHeader"], ["cx", "636.969", "cy", "181.423", "rx", "297.667", "ry", "30.008", 2, "fill", "rgb(60, 36, 94)"], ["d", "M636.969,181.423C747.039,181.423 843.39,175.778 896.989,167.161C845.942,157.654 748.634,151.712 636.969,151.712C525.304,151.712 428.315,157.654 377.268,166.864C430.867,175.48 527.218,181.423 636.969,181.423Z", 2, "fill", "rgb(34, 7, 73)", "fill-rule", "nonzero"], ["id", "Light"], ["id", "Flair", "clip-path", "url(#_clipShine)"], ["d", "M659.421,287.9C659.21,287.265 658.451,286.865 657.681,286.984C656.895,287.154 656.35,287.766 656.376,288.45C656.541,289.023 657.155,289.43 657.856,289.43C658.018,289.43 658.179,289.409 658.333,289.366C659.034,289.129 659.475,288.534 659.421,287.9ZM663.553,317.765C663.332,316.629 662.086,315.822 660.726,315.933C659.483,316.011 658.51,316.893 658.51,317.943C658.51,318.068 658.523,318.192 658.551,318.315L658.551,318.682C658.883,319.607 659.902,320.244 661.049,320.244C661.308,320.244 661.566,320.211 661.813,320.147C662.991,319.808 663.724,318.804 663.553,317.765ZM661.813,528.106C661.154,528.166 660.648,528.641 660.648,529.199C660.648,529.327 660.675,529.453 660.726,529.572C660.797,530.128 661.36,530.554 662.023,530.554C662.174,530.554 662.324,530.531 662.466,530.488C663.125,530.428 663.631,529.954 663.631,529.395C663.631,529.268 663.604,529.142 663.553,529.023C663.342,528.388 662.583,527.988 661.813,528.106ZM652.896,246.308C652.026,246.308 651.591,247.041 651.591,247.774C651.756,248.347 652.37,248.755 653.071,248.755C653.233,248.755 653.394,248.733 653.548,248.69C654.418,248.69 654.853,247.957 654.636,247.224C654.565,246.669 654.001,246.243 653.338,246.243C653.187,246.243 653.038,246.265 652.896,246.308ZM662.466,368.335C661.712,368.513 661.237,369.152 661.378,369.801C661.449,370.356 662.012,370.782 662.676,370.782C662.827,370.782 662.976,370.76 663.118,370.717C663.778,370.657 664.283,370.183 664.283,369.624C664.283,369.497 664.257,369.371 664.206,369.251C663.995,368.616 663.236,368.217 662.466,368.335ZM595.041,376.397C594.382,376.457 593.877,376.931 593.877,377.49C593.877,377.617 593.903,377.743 593.954,377.863C594.156,378.525 594.883,378.984 595.694,378.962C596.375,378.823 596.858,378.306 596.858,377.716C596.858,377.579 596.832,377.443 596.781,377.313C596.571,376.678 595.811,376.278 595.041,376.397ZM586.124,494.393C585.465,494.453 584.959,494.928 584.959,495.486C584.959,495.613 584.985,495.739 585.036,495.859C585.247,496.494 586.007,496.894 586.776,496.775C587.53,496.598 588.005,495.958 587.864,495.309C587.867,495.283 587.868,495.257 587.868,495.231C587.868,494.729 587.377,494.315 586.78,494.315C586.629,494.315 586.48,494.342 586.341,494.393L586.124,494.393ZM631.799,404.247C631.045,404.425 630.57,405.064 630.711,405.713C630.922,406.348 631.681,406.748 632.451,406.629C633.11,406.569 633.616,406.095 633.616,405.536C633.616,405.409 633.59,405.283 633.538,405.163C633.467,404.608 632.904,404.182 632.241,404.182C632.09,404.182 631.94,404.204 631.799,404.247ZM643.326,474.422C642.456,474.422 642.021,475.155 642.021,475.888C642.321,476.55 643.152,476.939 643.978,476.804C644.639,476.528 645.061,475.959 645.066,475.338C644.855,474.703 644.096,474.303 643.326,474.422ZM689,403.697C689.701,403.461 690.142,402.866 690.088,402.232C689.877,401.597 689.118,401.197 688.348,401.316C687.689,401.376 687.183,401.85 687.183,402.408C687.183,402.536 687.209,402.662 687.26,402.781C687.26,403.331 688.13,403.697 688.783,403.697L689,403.697ZM688.348,511.433C687.594,511.611 687.12,512.25 687.26,512.899C687.463,513.561 688.189,514.02 689,513.998C689.773,513.744 690.164,513.003 689.87,512.349C689.618,511.821 689.023,511.463 688.348,511.433ZM686.39,266.096C686.109,265.506 685.403,265.134 684.65,265.18C683.991,265.24 683.486,265.714 683.486,266.273C683.486,266.4 683.512,266.526 683.563,266.646C683.563,267.379 684.433,267.745 685.303,267.562C685.962,267.502 686.468,267.028 686.468,266.469C686.468,266.342 686.442,266.216 686.39,266.096ZM687.913,313.368C687.639,312.979 687.14,312.739 686.603,312.739C685.814,312.739 685.149,313.255 685.085,313.918C685.085,314.651 685.955,315.017 686.825,314.834C687.695,314.651 688.13,314.101 687.913,313.368ZM670.078,243.193C669.664,242.393 668.722,241.873 667.685,241.873C666.253,241.873 665.075,242.865 665.075,244.071C665.075,244.084 665.075,244.097 665.076,244.109C665.484,245.202 666.772,245.899 668.121,245.758C669.294,245.618 670.176,244.762 670.176,243.763C670.176,243.57 670.143,243.378 670.078,243.193ZM692.48,350.562C692.259,349.426 691.013,348.619 689.653,348.73C688.41,348.808 687.437,349.691 687.437,350.74C687.437,350.865 687.451,350.99 687.478,351.112L687.478,351.479C687.81,352.404 688.829,353.041 689.976,353.041C690.235,353.041 690.493,353.008 690.74,352.944C691.868,352.552 692.573,351.587 692.48,350.562ZM673.341,271.043C673.341,270.677 672.688,270.31 672.036,270.31C671.601,270.494 671.166,271.043 671.383,271.41C671.601,271.776 672.036,272.143 672.471,272.143C672.906,272.143 673.558,271.593 673.341,271.043ZM668.991,343.783C668.237,343.961 667.762,344.6 667.903,345.249C668.106,345.911 668.832,346.37 669.643,346.348C670.397,346.171 670.871,345.531 670.731,344.883C670.528,344.221 669.802,343.762 668.991,343.783ZM676.821,335.172C676.152,335.419 675.785,336.039 675.951,336.637C676.168,337.37 676.821,337.737 677.473,337.554C678.154,337.415 678.637,336.897 678.637,336.307C678.637,336.17 678.611,336.034 678.561,335.905C678.406,335.428 677.888,335.094 677.301,335.094C677.137,335.094 676.974,335.121 676.821,335.172ZM673.993,317.216C673.968,317.214 673.943,317.214 673.918,317.214C673.202,317.214 672.613,317.71 672.613,318.313C672.613,318.439 672.638,318.563 672.688,318.682C672.899,319.316 673.658,319.716 674.428,319.598C674.453,319.599 674.478,319.599 674.503,319.599C675.219,319.599 675.808,319.103 675.808,318.5C675.808,318.375 675.783,318.25 675.733,318.132C675.662,317.576 675.099,317.151 674.436,317.151C674.285,317.151 674.135,317.173 673.993,317.216Z", 2, "fill", "white", "fill-opacity", "0.3", "fill-rule", "nonzero"], ["d", "M615.753,222.03C617.773,223.765 620.166,225.081 622.772,225.893C617.335,226.958 613.068,230.932 611.924,235.994C610.52,230.958 606.204,227.054 600.758,225.893C606.152,224.455 610.381,220.517 611.924,215.494C612.556,217.95 613.878,220.206 615.753,222.03Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M662.652,233.618C664.021,234.754 665.662,235.569 667.438,235.994C663.755,236.82 660.823,239.436 659.781,242.828C658.989,239.412 656.111,236.731 652.443,235.994C656.195,235.41 659.153,232.655 659.781,229.161C660.423,230.804 661.398,232.317 662.652,233.618Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M633.938,270.459C634.896,271.13 635.977,271.634 637.129,271.945C635.873,272.17 634.742,272.802 633.938,273.727C633.012,274.53 632.348,275.56 632.024,276.699C631.69,275.626 631.149,274.62 630.429,273.727C629.517,272.924 628.428,272.315 627.238,271.945C629.653,271.505 631.552,269.737 632.024,267.488C632.348,268.627 633.012,269.657 633.938,270.459Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M629.153,243.719C629.423,244.303 630.067,244.663 630.748,244.611C629.493,244.903 628.509,245.819 628.195,246.988C628.251,246.354 627.865,245.754 627.238,245.502L625.643,244.611C626.898,244.318 627.881,243.402 628.195,242.234L629.153,243.719Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M659.781,263.923L661.376,264.814L659.781,265.408L658.824,266.894L658.185,265.408L656.59,264.814L658.185,263.923C658.576,263.511 658.802,262.986 658.824,262.437L659.781,263.923Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M605.862,262.437L607.458,263.031L605.862,263.923L604.905,265.408C604.915,264.209 603.95,263.181 602.672,263.031L604.267,262.437C604.586,261.843 604.905,261.546 604.905,260.952L605.862,262.437Z", 2, "fill", "white", "fill-rule", "nonzero"], ["id", "MainCan"], ["d", "M636.81,179.544C642.965,179.194 648.96,177.57 654.357,174.79C651.411,179.83 649.669,185.405 649.252,191.131C649.669,196.857 651.411,202.431 654.357,207.472C643.856,200.928 630.083,200.928 619.581,207.472C622.379,202.375 624.112,196.83 624.686,191.131C624.112,185.432 622.379,179.886 619.581,174.79C624.882,177.528 630.763,179.15 636.81,179.544Z", 2, "fill", "white", "fill-rule", "nonzero"], ["d", "M657.866,140.325C657.87,140.225 657.871,140.124 657.871,140.024C657.871,134.43 653.024,129.787 647.019,129.629L629.791,129.629C623.844,129.774 618.953,134.199 618.624,139.731L616.71,182.812L656.909,170.63L657.866,140.325Z", 2, "fill", "rgb(90, 102, 117)", "fill-rule", "nonzero"], ["d", "M617.029,182.812L657.228,170.63L657.228,163.202L617.667,163.202L617.029,182.812Z", 2, "fill", "rgb(78, 88, 103)", "fill-rule", "nonzero"], ["d", "M610.01,167.956L665.842,167.659L680.518,195.885L593.42,195.29L610.01,167.956Z", 2, "fill", "rgb(90, 102, 117)", "fill-rule", "nonzero"], ["d", "M648.295,167.659L648.295,195.587L680.518,195.885L665.842,167.659L648.295,167.659Z", 2, "fill", "rgb(121, 131, 143)", "fill-rule", "nonzero"], ["x", "633.619", "y", "139.137", "width", "18.824", "height", "3.595", 2, "fill", "rgb(121, 131, 143)"], ["x", "633.619", "y", "146.267", "width", "18.824", "height", "3.595", 2, "fill", "rgb(121, 131, 143)"], ["id", "Shine", "d", "M506.321,530.554L790.907,530.554L680.518,195.496L593.42,195.29", 2, "fill", "rgb(217, 64, 196)", "fill-opacity", "0.5", "fill-rule", "nonzero"], ["id", "Header"], ["d", "M296.391,-0L339.462,181.534C342.333,165.193 474.417,152.12 636.81,152.12C799.202,152.12 931.605,165.193 934.477,181.534L977.547,0.297L296.391,-0Z", 2, "fill", "rgb(124, 43, 167)", "fill-rule", "nonzero"], ["d", "M561.834,105.012C496.093,107.657 430.575,113.907 365.623,123.73C359.561,93.722 353.5,79.758 347.438,49.749C407.099,35.191 486.859,16.77 556.73,14.096L561.834,105.012Z", 2, "fill", "url(#_Linear3)", "fill-rule", "nonzero"], ["d", "M712.423,105.012C778.058,107.672 843.468,113.922 908.315,123.73C914.377,93.722 920.439,79.758 926.5,49.749C866.839,35.191 787.079,16.77 717.208,14.096L712.423,105.012Z", 2, "fill", "url(#_Linear4)", "fill-rule", "nonzero"], ["id", "_Radial2", "cx", "0", "cy", "0", "r", "1", "gradientUnits", "userSpaceOnUse", "gradientTransform", "matrix(827.785,0,0,-993.756,640,417.251)"], ["offset", "0", 2, "stop-color", "rgb(135, 24, 176)", "stop-opacity", "1"], ["offset", "1", 2, "stop-color", "rgb(1, 14, 43)", "stop-opacity", "1"], ["id", "_Linear3", "x1", "0", "y1", "0", "x2", "1", "y2", "0", "gradientUnits", "userSpaceOnUse", "gradientTransform", "matrix(214.269,0,0,199.539,347.406,68.913)"], ["offset", "0", 2, "stop-color", "rgb(255, 134, 255)", "stop-opacity", "1"], ["offset", "0.5", 2, "stop-color", "rgb(255, 68, 255)", "stop-opacity", "0.66"], ["offset", "1", 2, "stop-color", "rgb(255, 0, 255)", "stop-opacity", "0.3"], ["id", "_Linear4", "x1", "0", "y1", "0", "x2", "1", "y2", "0", "gradientUnits", "userSpaceOnUse", "gradientTransform", "matrix(-14009.2,1.5977e-12,-1.71564e-12,-13046.2,62144.2,29543.9)"], ["viewBox", "0 0 1280 720", 1, "upperSvg"], ["upperRenderEl", ""], [1, "goBtn"], ["goBtnRenderEl", ""]], template: function SpotlightComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "clipPath", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "clipPath", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "rect", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "ellipse", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "ellipse", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "ellipse", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "ellipse", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "ellipse", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "ellipse", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "ellipse", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "ellipse", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "ellipse", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "ellipse", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "ellipse", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "ellipse", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "rect", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "rect", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "path", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "path", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "path", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "path", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "path", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "path", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "rect", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "path", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "path", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "path", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "path", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "path", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "path", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "rect", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "path", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "path", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "path", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "path", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "path", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "path", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "rect", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "path", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "path", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "path", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "path", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "path", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "path", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "rect", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "path", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "path", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "path", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "path", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "path", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "path", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "rect", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "path", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "path", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "path", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "path", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "path", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "path", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "rect", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](78, "path", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "path", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "path", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](81, "path", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "path", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "g", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "ellipse", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "path", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "g", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "clipPath", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "g", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "path", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "path", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](92, "path", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "path", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "path", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](95, "path", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](96, "path", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "g", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "path", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "path", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "path", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "path", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "path", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "rect", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "rect", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "path", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "g", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "path", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](108, "path", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "path", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "defs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "radialGradient", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](112, "stop", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "stop", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "linearGradient", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](116, "stop", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "stop", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "linearGradient", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "stop", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "stop", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](121, "stop", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "svg", 113, 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](124, "div", 115, 116);
    } }, styles: [".upperSvg[_ngcontent-%COMP%]{\n    position: absolute;\n    pointer-events: none; \n  }\n  .lowerSvg[_ngcontent-%COMP%]{\n    position: absolute;\n  }\n  .goBtn[_ngcontent-%COMP%] {\n    background-image: url(\"https://res.cloudinary.com/duim8wwno/image/upload/v1644246521/SpotlightGoBtn_eqeyvr.svg\");\n    background-size: cover;\n    width: 8%;\n    padding-bottom: 8%;\n    top: 1%;\n    left: 1%;  \n    position: absolute;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3BvdGxpZ2h0L3Nwb3RsaWdodC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLG9CQUFvQjtFQUN0QjtFQUNBO0lBQ0Usa0JBQWtCO0VBQ3BCO0VBRUE7SUFDRSxnSEFBZ0g7SUFDaEgsc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLFFBQVE7SUFDUixrQkFBa0I7RUFDcEIiLCJmaWxlIjoic3JjL2FwcC9zcG90bGlnaHQvc3BvdGxpZ2h0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXBwZXJTdmd7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyBcbiAgfVxuICAubG93ZXJTdmd7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICB9XG5cbiAgLmdvQnRuIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kdWltOHd3bm8vaW1hZ2UvdXBsb2FkL3YxNjQ0MjQ2NTIxL1Nwb3RsaWdodEdvQnRuX2VxZXl2ci5zdmdcIik7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB3aWR0aDogOCU7XG4gICAgcGFkZGluZy1ib3R0b206IDglO1xuICAgIHRvcDogMSU7XG4gICAgbGVmdDogMSU7ICBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIH0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpotlightComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-spotlight',
                templateUrl: './spotlight.component.html',
                styleUrls: ['./spotlight.component.css']
            }]
    }], null, { lowerRenderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['lowerRenderEl']
        }], upperRenderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['upperRenderEl']
        }], goBtnRenderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['goBtnRenderEl']
        }], target: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], min: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], max: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], spotlightWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], denominator: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], state: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], decimals: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], tickStepSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], labelTicks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], timeStep: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], hints: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], majorJumps: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], padding: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], reduceTicks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], zoom: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], reduceHints: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], reduceEndpoints: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], reduceTarget: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/spotlight/spotlightClass.ts":
/*!*********************************************!*\
  !*** ./src/app/spotlight/spotlightClass.ts ***!
  \*********************************************/
/*! exports provided: PuzzleSpotlight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleSpotlight", function() { return PuzzleSpotlight; });
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ "./src/app/api.ts");


const svgns = "http://www.w3.org/2000/svg";
// #endregion
// #region APPLICATION
function PuzzleSpotlight(els, state) {
    let self = {};
    class PuzzleSpotlightClass {
        // #endregion
        // #region CONSTRUCTOR
        constructor(els, state) {
            this.V = {};
            this.shine = document.getElementById("Shine");
            this.light = document.getElementById("Light");
            this.flair = document.getElementById("Flair");
            this.header = document.getElementById("Header");
            this.fontSize = 30;
            this.rotation = 0;
            this.awaitingInput = true;
            this.width = 1280;
            this.resetBtnURL = "https://res.cloudinary.com/duim8wwno/image/upload/v1647289526/SpotlightRetryBtn_nwcp3o.svg";
            this.goBtnURL = "https://res.cloudinary.com/duim8wwno/image/upload/v1644246521/SpotlightGoBtn_eqeyvr.svg";
            // Object Functions
            // Sent to server "onSubmit"
            this.getSessionState = function () {
                return this.sessionState;
            };
            self = this;
            this.els = els;
            this.gsvg = els[0];
            this.gsvgu = els[1];
            this.state = state;
            this.state.width = 1280;
            this.state.height = 720;
            this.sessionState = {};
            this.sessionState.attempts = [];
            this._numberLineY = 500;
            this.currentShineTarget = 300;
            this.state.numberLineY = 500;
            this.awaitingInput = true;
            this.shineCenter = this.state.width / 2;
            this.pt = this.gsvg.createSVGPoint();
            this.dt = state.timeStep;
            this.FB = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].timeline({
                paused: true,
                onComplete: this.onFeedbackComplete,
            });
            this.V.ticks = [];
            this.V.labels = [];
            // Alert if Invalid
            const attempt = this.validate(this.state);
            if (attempt.valid) {
                //this.generateReport();
                this.init();
            }
            else {
                window.alert(attempt.message);
            }
        }
        // #endregion
        getPointFromUnits(units) {
            const lineInPixels = (1 - this.state.padding) * this.state.width;
            const ratio = units / (this.state.max - this.state.min);
            const point = (this.state.padding / 2) * this.state.width + lineInPixels * ratio;
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
        getNumberOfJumpsForEachSize(value, increments) {
            let reducedValue = value;
            const jumps = increments;
            const majorCount = jumps.major == null
                ? 0
                : (reducedValue - (reducedValue % jumps.major)) / jumps.major;
            reducedValue = reducedValue - jumps.major * majorCount;
            const minorCount = jumps.minor == null
                ? 0
                : (reducedValue - (reducedValue % jumps.minor)) / jumps.minor;
            reducedValue = reducedValue - jumps.minor * minorCount;
            const miniCount = jumps.mini == null
                ? 0
                : (reducedValue - (reducedValue % jumps.mini)) / jumps.mini;
            return {
                miniCount: miniCount,
                minorCount: minorCount,
                majorCount: majorCount,
            };
        }
        // Get point in global SVG space
        cursorPoint(evt) {
            this.pt.x = evt.clientX;
            this.pt.y = evt.clientY;
            return this.pt.matrixTransform(this.gsvg.getScreenCTM().inverse());
        }
        // #endregion
        // #region Event Handlers
        testThis() {
            console.log("thistest", this);
        }
        backgroundPointerDown(e) {
            if (self.awaitingInput) {
                self.currentShineTarget = self.cursorPoint(e).x;
                let dx = self.shineCenter - self.currentShineTarget;
                const theta = Math.atan(dx / self.yFromNumberLineToLight);
                self.rotation = theta;
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(self.light, {
                    transformOrigin: "50% 0%",
                    rotation: (theta * 180) / Math.PI,
                });
                self.drawShine();
                console.log("awaiting input");
            }
            else if (self.FB.isActive()) {
                console.log("pause");
                self.FB.pause();
            }
            else if (self.FB.paused() && !self.feedbackComplete) {
                console.log("play");
                self.FB.play();
            }
        }
        // #endregion
        // #region Drawing
        drawShine() {
            const dx = (this.state.spotlightWidth * this.state.width) / 2;
            const theta = this.rotation;
            const left = this.currentShineTarget - dx;
            const right = this.currentShineTarget + dx;
            this.shineLeft = left;
            this.shineRight = right;
            const H1 = 75;
            const H2 = 80;
            const delta = theta - Math.PI / 5.5;
            const alpha = theta + Math.PI / 5.2;
            const canRightX = this.shineCenter - H1 * Math.sin(delta);
            const canRightY = 129 + H1 * Math.cos(delta);
            const canLeftX = this.shineCenter - H2 * Math.sin(alpha);
            const canLeftY = 129 + H2 * Math.cos(alpha);
            let s = "M " +
                left +
                " " +
                this._numberLineY +
                " L " +
                right +
                " " +
                this._numberLineY +
                " L " +
                canRightX +
                " " +
                canRightY +
                " L " +
                canLeftX +
                " " +
                canLeftY;
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.shine, { attr: { d: s } });
        }
        // #endregion
        // #region DOM Constructors
        getJumpsPath(n, size) {
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
        getTick(h, s) {
            const _d = "M 0 0 L 0 " + h;
            const tO = "0" + " " + h / 2;
            const tick = document.createElementNS(svgns, "path");
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(tick, {
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
        setTick(tick, location) {
            const _x = this.xStart + (location - this.state.min) / this.lineWidthInUnits * this.lineWidthInPixels;
            const _y = this.state.numberLineY - this.tickHeight / 2;
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(tick, { x: _x, y: _y });
        }
        setLabel(label, location) {
            const labelWidth = label.getBBox().width;
            label.width = labelWidth;
            const _x = this.xStart + (location - this.state.min) / this.lineWidthInUnits * this.lineWidthInPixels;
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(label, { x: _x - labelWidth / 2, y: this.state.numberLineY + this.fontSize + this.tickHeight / 2 });
        }
        reduceFraction(n, d) {
            const m = Math.max(n, d);
            let gcf = 1;
            for (let i = 0; i < m; i++) {
                if (d % i == 0 && n % i == 0) {
                    gcf = i;
                }
            }
            return { n: n / gcf, d: d / gcf };
        }
        // #region DOM CONSTRUCTORS
        // numerator/denominator f (font size)
        getLabel(f, num, den, reduce) {
            let n = num;
            let d = den;
            const shouldIReduce = reduce != null ? reduce : true;
            if (shouldIReduce) {
                n = this.reduceFraction(num, den).n;
                d = this.reduceFraction(num, den).d;
            }
            const label = document.createElementNS(svgns, "g");
            if (n != null) {
                const nStringLength = n.toString().length;
                let dWidth;
                const nWidth = 0.6 * nStringLength * f;
                let maxTextWidth = nWidth;
                if (d) {
                    const dl = d.toString().length;
                    dWidth = 0.6 * dl * f;
                    if (n % d == 0) {
                        n = n / d;
                        d = null;
                    }
                }
                maxTextWidth = Math.max(nWidth, dWidth);
                const _n = document.createElementNS(svgns, "text");
                const _d = document.createElementNS(svgns, "text");
                const line = document.createElementNS(svgns, "line");
                const startLabelText = Object(_api__WEBPACK_IMPORTED_MODULE_1__["applyDecimalOffset"])(n, this.state.decimals);
                console.log("f", f);
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(_n, {
                    x: maxTextWidth / 2 - nWidth / 2,
                    y: 0,
                    textContent: startLabelText,
                    fill: "white",
                    fontFamily: "Arial",
                    fontSize: f,
                });
                if (d) {
                    gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(_d, {
                        textContent: d,
                        fill: "white",
                        fontFamily: "Arial",
                        y: f,
                        fontSize: f,
                        x: maxTextWidth / 2 - dWidth / 2,
                    });
                    gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(line, {
                        attr: { x1: 0, y1: f / 10, x2: maxTextWidth, y2: f / 10 },
                        strokeLinecap: "round",
                        stroke: "white",
                        fontFamily: "Arial",
                        strokeWidth: f / 10,
                    });
                    label.appendChild(_d);
                }
                label.appendChild(_n);
                label.appendChild(line);
            }
            return label;
        }
        initJumps() {
            const minorStartX = (this.state.width * this.state.padding) / 2 +
                this.jumps.major.count * this.jumps.major.width;
            const miniStartX = minorStartX + this.jumps.minor.count * this.jumps.minor.width;
            if (this.jumps.major.count != 0) {
                this.V.jumpsMajor = document.createElementNS(svgns, "path");
                const majorJumpPath = this.getJumpsPath(this.jumps.major.count, this.anchorWidth);
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMajor, {
                    attr: { d: majorJumpPath },
                });
                const majorLength = this.V.jumpsMajor.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMajor, {
                    strokeLinecap: "round",
                    fill: "none",
                    strokeWidth: this.anchorStroke,
                    stroke: "white",
                    scale: this.jumps.major.scale / this.expansion,
                    y: this.state.numberLineY,
                    x: (this.state.width * this.state.padding) / 2,
                    strokeDasharray: majorLength,
                    strokeDashoffset: majorLength,
                    transformOrigin: "0% 100%",
                });
                this.gsvg.appendChild(this.V.jumpsMajor);
                // Connecting Data to View HACKY
                this.V.jumpsMajor.data = this.jumps.major;
            }
            else {
                this.V.jumpsMajor = null;
            }
            if (this.jumps.minor.count != 0) {
                this.V.jumpsMinor = document.createElementNS(svgns, "path");
                const minorJumpPath = this.getJumpsPath(this.jumps.minor.count, this.anchorWidth);
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMinor, {
                    attr: { d: minorJumpPath },
                });
                const minorLength = this.V.jumpsMinor.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMinor, {
                    strokeLinecap: "round",
                    fill: "none",
                    strokeWidth: this.anchorStroke,
                    stroke: "white",
                    y: this.state.numberLineY,
                    x: minorStartX,
                    scale: this.jumps.minor.scale / this.expansion,
                    strokeDasharray: minorLength,
                    strokeDashoffset: minorLength,
                    transformOrigin: "0% 100%",
                });
                this.gsvg.appendChild(this.V.jumpsMinor);
                // ALERT: Connecting Data to View, we use this to create our timeline.
                this.V.jumpsMinor.data = this.jumps.minor;
            }
            else {
                this.V.jumpsMinor = null;
            }
            if (this.jumps.mini.count != 0) {
                this.V.jumpsMini = document.createElementNS(svgns, "path");
                const miniJumpPath = this.getJumpsPath(this.jumps.mini.count, this.anchorWidth);
                /* ALERT:
                  ISSUE: We have to set the path attribute first so we can
                  get the length of the path.
                  
                  TODO: Find a way to get the length of a path on it's own.
                */
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMini, {
                    attr: { d: miniJumpPath },
                });
                const miniLength = this.V.jumpsMini.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMini, {
                    strokeLinecap: "round",
                    fill: "none",
                    strokeWidth: this.anchorStroke,
                    scale: this.jumps.mini.scale / this.expansion,
                    stroke: "white",
                    y: this.state.numberLineY,
                    x: miniStartX,
                    strokeDasharray: miniLength,
                    strokeDashoffset: miniLength,
                    transformOrigin: "0% 100%",
                });
                this.gsvg.appendChild(this.V.jumpsMini);
                // Hacky: Connecting Data to View
                this.V.jumpsMini.data = this.jumps.mini;
            }
            else {
                this.V.jumpsMini = null;
            }
        }
        // #endregion
        // #region Animations
        onViewBoxUpdate(a) {
            let tween = this;
            const { animVal } = tween._targets[0].viewBox;
            const _x = animVal.x;
            const _w = animVal.width;
            self.V.ticks.forEach((t, i) => {
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(t, { x: (t.xAnchor - _x) / _w * self.state.width }, "<");
                const l = self.V.labels[i]; // Grabbing the label with index.
                // @ts-ignore
                l && gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(l, { x: (t.xAnchor - _x) / _w * self.state.width - l.width / 2 }, "<");
            });
        }
        initTimeline() {
            const J = [this.V.jumpsMajor, this.V.jumpsMinor, this.V.jumpsMini];
            J.forEach((j, i) => {
                if (j != null) {
                    const length = j.getTotalLength();
                    if (j != this.V.jumpsMajor && this.state.zoom == true) {
                        // No viewbox zoom or stroke adjustment required for jumps major.
                        this.FB.to(this.gsvg, { duration: this.dt, ease: "power1", attr: { viewBox: j.data.viewBox }, onUpdate: this.onViewBoxUpdate });
                        this.V.jumpsMajor &&
                            this.FB.to(this.V.jumpsMajor, { duration: this.dt, strokeWidth: j.data.stroke.major }, "<");
                        this.V.jumpsMinor &&
                            this.FB.to(this.V.jumpsMinor, { duration: this.dt, strokeWidth: j.data.stroke.minor }, "<");
                        this.V.jumpsMini &&
                            this.FB.to(this.V.jumpsMini, { duration: this.dt, strokeWidth: j.data.stroke.mini }, "<");
                    }
                    this.FB.fromTo(j, j.data.count * this.dt, { strokeDashoffset: length }, {
                        strokeDashoffset: 0,
                        ease: "linear",
                        duration: j.data.count * this.dt,
                    });
                }
            });
        }
        checkAnswer() {
            if (this.targetInPixels > this.shineLeft && this.targetInPixels < this.shineRight) {
                this.onSuccess();
                return true;
            }
            else {
                this.onTryAgain();
                return false;
            }
        }
        onFeedbackComplete() {
            const _attemptNumber = self.sessionState.attempts.length + 1;
            const _correct = self.checkAnswer();
            const thisAttempt = { attemptNumber: _attemptNumber, target: self.currentShineTarget, correct: _correct };
            self.feedbackComplete = true;
            self.sessionState.attempts.push(thisAttempt);
        }
        // #endregion
        // #region LifeCycle Methods
        validate(state) {
            let _message = "State validation failed";
            let customIncrementsValid = true;
            const minLessThanMax = this.state.min < this.state.max;
            const spotlightNotTooBig = this.state.spotlightWidth < 1;
            const spotlightNotTooSmall = this.state.spotlightWidth > 0.005;
            const denominatorIsProvided = this.state.denominator || false;
            const denominatorIsInRange = !denominatorIsProvided || this.state.denominator >= 1;
            if (!minLessThanMax) {
                _message += " Invalid Min/Max";
            }
            const _valid = minLessThanMax &&
                spotlightNotTooBig &&
                spotlightNotTooSmall &&
                denominatorIsInRange &&
                customIncrementsValid;
            return { valid: _valid, message: _message };
        }
        // Should probably be resetGame
        reset() {
            const onComplete = () => {
                this.FB.restart();
                this.FB.pause();
                this.resetShine().play();
            };
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].to(this.gsvg, {
                duration: this.dt,
                onComplete: onComplete,
                onUpdate: this.onViewBoxUpdate,
                ease: "linear",
                attr: { viewBox: "0 0 1280 720" },
            });
            // Reset Jumps
            if (this.V.jumpsMajor) {
                const majorLength = this.V.jumpsMajor.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMajor, {
                    strokeDasharray: majorLength,
                    strokeDashoffset: majorLength,
                    strokeWidth: this.anchorStroke,
                });
            }
            if (this.V.jumpsMinor) {
                const minorLength = this.V.jumpsMinor.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMinor, {
                    strokeDasharray: minorLength,
                    strokeDashoffset: minorLength,
                    strokeWidth: this.anchorStroke,
                });
            }
            if (this.V.jumpsMini) {
                const miniLength = this.V.jumpsMini.getTotalLength();
                gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.jumpsMini, {
                    strokeDasharray: miniLength,
                    strokeDashoffset: miniLength,
                    strokeWidth: this.anchorStroke,
                });
            }
        }
        resetShine() {
            const T = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].timeline();
            const onUpdate = () => {
                this.drawShine();
            };
            const onComplete = () => {
                this.awaitingInput = true;
                this.feedbackComplete = false;
            };
            T.to(this, {
                duration: 1,
                ease: "elastic",
                rotation: 0,
                currentShineTarget: this.shineCenter,
                onUpdate: onUpdate,
                onComplete: onComplete
            });
            T.to(this.light, { duration: 1, rotation: 0, ease: "elastic" }, "<");
            return T;
        }
        initNumberLineParams() {
            const start = { location: this.state.min, label: this.state.min, reduce: this.state.reduceEndpoints };
            const end = { location: this.state.max, label: this.state.max, reduce: this.state.reduceEndpoints };
            this.markings = [start];
            if (this.state.tickStepSize) {
                console.log("this.state.tickStepSize", this.state.tickStepSize);
                let sum = this.state.tickStepSize + this.state.min;
                console.log("start sum,this.state.min", sum, this.state.min);
                do {
                    const _label = this.state.labelTicks ? sum : null;
                    this.markings.push({ location: sum, label: _label, reduce: this.state.reduceTicks });
                    sum += this.state.tickStepSize;
                    console.log("sum", sum, this.state.max);
                } while (sum < this.state.max);
            }
            const hints = this.state.hints ? this.state.hints : [];
            const hintMarkings = hints.map(h => {
                return { location: h, label: h, reduce: this.state.reduceHints };
            });
            hintMarkings && this.markings.push(...hintMarkings);
            this.markings.push(end);
        }
        initView() {
            this.markings.forEach(m => {
                const tick = this.getTick(this.tickHeight, this.strokeWidth);
                this.gsvgu.appendChild(tick);
                this.setTick(tick, m.location);
                /* ALERT
                  REASON: we're attaching the original tick location to the tick element
                  to reference later
          
                  TODO: Dynamically calculate it from target value when needed.
                */
                const xA = gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(tick, "x");
                tick.xAnchor = xA;
                this.V.ticks.push(tick);
                // This returns null if there is no m.label provided.
                const label = this.getLabel(this.fontSize, m.label, this.state.denominator, m.reduce);
                this.gsvgu.appendChild(label);
                const isThereALabel = (m.label != null);
                if (isThereALabel) {
                    this.setLabel(label, m.location);
                    label.setAttribute("xAnchor", gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].getProperty(label, "x"));
                }
                /* ALERT
                  REASON: by design, some labels of the view can be null.
          
                  TODO: Nothing at the moment, we want each marking to have a
                  label,tick pair, even if the label is null.
                */
                this.V.labels.push(label);
            });
            this.V.descriptor = this.getLabel(60, this.state.target, this.state.denominator, this.state.reduceTarget);
            this.gsvg.appendChild(this.V.descriptor);
            const w = this.V.descriptor.getBBox().width;
            const h = this.V.descriptor.getBBox().height;
            // HARDCODED
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.descriptor, { y: 140 / 2, x: this.shineCenter - w / 2 });
            this.initJumps();
            // Number Line
            this.V.numberLine = document.createElementNS(svgns, "line");
            console.log("numberlineY", this, this._numberLineY);
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.V.numberLine, {
                attr: {
                    x1: 0,
                    y1: this._numberLineY,
                    x2: this.state.width,
                    y2: this._numberLineY,
                },
                fill: "none",
                strokeWidth: 5,
                stroke: "white",
            });
            this.gsvgu.appendChild(this.V.numberLine);
            // Can we do this before initView so we can put it in updateLayoutParams
            const numberLineY = this.state.numberLineY;
            const lightY = Object(_api__WEBPACK_IMPORTED_MODULE_1__["getBoundingBoxWithTransform"])(this.light).y;
            this.yFromNumberLineToLight = numberLineY - lightY;
            // View
            Object(_api__WEBPACK_IMPORTED_MODULE_1__["bringToFront"])(this.light);
            Object(_api__WEBPACK_IMPORTED_MODULE_1__["bringToFront"])(this.header);
            // Misc.
            const scale = Math.min(1, Math.sqrt(this.state.spotlightWidth / 0.06));
            gsap_all__WEBPACK_IMPORTED_MODULE_0__["gsap"].set(this.flair, { scaleX: scale, transformOrigin: "50% 0%" });
        }
        initLayoutParams() {
            // Legacy name change:
            let steps = { major: 100, minor: 10, mini: 1 };
            // State Variables
            this.feedbackComplete = false;
            this.feedbackRunning = false;
            this.feedbackBegun = false;
            this.awaitingInput = true;
            this.fontSize = 30;
            this.strokeWidth = 5;
            this.xStart = (this.state.width * this.state.padding) / 2;
            this.xEnd = this.state.width * (1 - this.state.padding / 2);
            this.range = this.state.min - this.state.max;
            this.currentShineTarget = this.state.width / 2;
            this.targetInPixels = this.getPointFromUnits(this.state.target - this.state.min);
            this.tickHeight = this.state.width / 50;
            this._numberLineY = this.state.numberLineY;
            const increments = steps;
            const adjustedTarget = this.state.target - this.state.min;
            const counts = this.getNumberOfJumpsForEachSize(adjustedTarget, increments);
            const widthInPixels = (1 - this.state.padding) * this.state.width;
            this.lineWidthInPixels = widthInPixels;
            this.lineWidthInUnits = this.state.max - this.state.min;
            const widthInUnits = this.state.max - this.state.min;
            const majorJumpWidth = (steps.major / widthInUnits) * widthInPixels;
            const minorJumpWidth = (steps.minor / widthInUnits) * widthInPixels;
            const miniJumpWidth = (steps.mini / widthInUnits) * widthInPixels;
            const majorJumpScale = steps.major / widthInUnits;
            const minorJumpScale = steps.minor / widthInUnits;
            const miniJumpScale = steps.mini / widthInUnits;
            // No longer needed.
            this.expansion = 1; // To prevent from fractional stroke widths. Cause: Unknown
            this.aspectRatioHW = this.state.height / this.state.width;
            // Helps for scaling
            this.anchorWidth = (1 - this.state.padding) * this.state.width * this.expansion;
            this.anchorStroke = 5 / majorJumpScale;
            const jumps = {
                major: {
                    viewBox: null,
                    scale: majorJumpScale,
                    width: majorJumpWidth,
                    count: counts.majorCount,
                    stepSize: steps.major,
                    stroke: {
                        major: this.anchorStroke,
                        minor: this.anchorStroke,
                        mini: this.anchorStroke,
                    },
                },
                minor: {
                    viewBox: null,
                    scale: minorJumpScale,
                    width: minorJumpWidth,
                    count: counts.minorCount,
                    stepSize: steps.minor,
                    stroke: {
                        major: this.anchorStroke / (steps.major / steps.minor),
                        minor: this.anchorStroke,
                        mini: this.anchorStroke,
                    },
                },
                mini: {
                    viewBox: null,
                    scale: miniJumpScale,
                    width: miniJumpWidth,
                    count: counts.miniCount,
                    stepSize: steps.mini,
                    stroke: {
                        major: this.anchorStroke / (steps.major / steps.mini),
                        minor: this.anchorStroke / (steps.minor / steps.mini),
                        mini: this.anchorStroke,
                    },
                },
            };
            let head = (this.state.padding / 2) * this.state.width;
            const majorViewBox = [0, 0, this.state.width, this.state.height].join(" ");
            const countMax = Math.max(jumps.minor.count, jumps.mini.count);
            head = head + jumps.major.width * jumps.major.count;
            const minorViewBoxWidth = 1.5 * jumps.minor.width * countMax;
            const minorViewBoxHeight = minorViewBoxWidth * this.aspectRatioHW;
            const minorViewBoxX = head - 0.2 * minorJumpWidth;
            const minorViewBoxY = this.state.numberLineY - this._numberLineY / this.state.height * minorViewBoxHeight;
            console.log("minorViewBoxX", minorViewBoxX);
            const minorViewBox = [
                minorViewBoxX,
                minorViewBoxY,
                minorViewBoxWidth,
                minorViewBoxHeight,
            ].join(" ");
            head = head + jumps.minor.width * jumps.minor.count;
            const miniViewBoxWidth = 1.5 * jumps.mini.width * countMax;
            const miniViewBoxHeight = miniViewBoxWidth * this.aspectRatioHW;
            const miniViewBoxX = head - 0.2 * miniJumpWidth;
            const miniViewBoxY = this.state.numberLineY - this._numberLineY / this.state.height * miniViewBoxHeight;
            const miniViewBox = [
                miniViewBoxX,
                miniViewBoxY,
                miniViewBoxWidth,
                miniViewBoxHeight,
            ].join(" ");
            jumps.major.viewBox = majorViewBox;
            jumps.minor.viewBox = minorViewBox;
            jumps.mini.viewBox = miniViewBox;
            this.jumps = jumps;
            this.initNumberLineParams();
        }
        attachEvents() {
            // Event Listeners
            //this.gsvg.addEventListener("pointerdown", this.backgroundPointerDown);
            this.gsvg.addEventListener("pointerdown", this.backgroundPointerDown);
        }
        generateReport() {
            this.initLayoutParams();
            this.initNumberLineParams();
            this.initView();
            this.drawShine();
        }
        init() {
            this.initLayoutParams();
            this.initView();
            // Animations
            this.initTimeline();
            this.drawShine();
            this.attachEvents();
        }
        // #endregion
        // #region PUBLIC METHODS
        goButtonClicked(e) {
            console.log("this", this);
            console.log("self", self.goBtnURL);
            let btn = this;
            if (self.feedbackComplete) {
                btn.style.backgroundImage = `url(${self.goBtnURL})`;
                self.reset();
            }
            else if (self.awaitingInput) {
                btn.style.backgroundImage = `url(${self.resetBtnURL})`;
                self.awaitingInput = false;
                self.FB.play();
            }
            else {
                console.log("You can't click me!");
            }
        }
        ;
    }
    return new PuzzleSpotlightClass(els, state);
}


/***/ }),

/***/ "./src/app/test/gsap-shockingly-green/minified/MorphSVGPlugin.min.js":
/*!***************************************************************************!*\
  !*** ./src/app/test/gsap-shockingly-green/minified/MorphSVGPlugin.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * MorphSVGPlugin 3.9.1
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * This plugin is a membership benefit of Club GreenSock and is only authorized for use in sites/apps/products developed by individuals/companies with an active Club GreenSock membership. See https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){ true?e(exports):undefined}(this,function(t){"use strict";function m(t){return"string"==typeof t}var x=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,N=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,b=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,n=/(^[#\.][a-z]|[a-y][a-z])/i,B=Math.PI/180,D=Math.sin,E=Math.cos,k=Math.abs,J=Math.sqrt,s=function _isNumber(t){return"number"==typeof t},h=function _round(t){return Math.round(1e5*t)/1e5||0};function reverseSegment(t){var e,r=0;for(t.reverse();r<t.length;r+=2)e=t[r],t[r]=t[r+1],t[r+1]=e;t.reversed=!t.reversed}var A={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"};function convertToPath(t,e){var r,n,a,o,i,s,h,l,g,c,p,u,f,d,_,P,m,v,y,w,M,x,T=t.tagName.toLowerCase(),b=.552284749831;return"path"!==T&&t.getBBox?(s=function _createPath(t,e){var r,n=document.createElementNS("http://www.w3.org/2000/svg","path"),a=[].slice.call(t.attributes),o=a.length;for(e=","+e+",";-1<--o;)r=a[o].nodeName.toLowerCase(),e.indexOf(","+r+",")<0&&n.setAttributeNS(null,r,a[o].nodeValue);return n}(t,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),x=function _attrToObj(t,e){for(var r=e?e.split(","):[],n={},a=r.length;-1<--a;)n[r[a]]=+t.getAttribute(r[a])||0;return n}(t,A[T]),"rect"===T?(o=x.rx,i=x.ry||o,n=x.x,a=x.y,c=x.width-2*o,p=x.height-2*i,r=o||i?"M"+(P=(d=(f=n+o)+c)+o)+","+(v=a+i)+" V"+(y=v+p)+" C"+[P,w=y+i*b,_=d+o*b,M=y+i,d,M,d-(d-f)/3,M,f+(d-f)/3,M,f,M,u=n+o*(1-b),M,n,w,n,y,n,y-(y-v)/3,n,v+(y-v)/3,n,v,n,m=a+i*(1-b),u,a,f,a,f+(d-f)/3,a,d-(d-f)/3,a,d,a,_,a,P,m,P,v].join(",")+"z":"M"+(n+c)+","+a+" v"+p+" h"+-c+" v"+-p+" h"+c+"z"):"circle"===T||"ellipse"===T?(l="circle"===T?(o=i=x.r)*b:(o=x.rx,(i=x.ry)*b),r="M"+((n=x.cx)+o)+","+(a=x.cy)+" C"+[n+o,a+l,n+(h=o*b),a+i,n,a+i,n-h,a+i,n-o,a+l,n-o,a,n-o,a-l,n-h,a-i,n,a-i,n+h,a-i,n+o,a-l,n+o,a].join(",")+"z"):"line"===T?r="M"+x.x1+","+x.y1+" L"+x.x2+","+x.y2:"polyline"!==T&&"polygon"!==T||(r="M"+(n=(g=(t.getAttribute("points")+"").match(N)||[]).shift())+","+(a=g.shift())+" L"+g.join(","),"polygon"===T&&(r+=","+n+","+a+"z")),s.setAttribute("d",rawPathToString(s._gsRawPath=stringToRawPath(r))),e&&t.parentNode&&(t.parentNode.insertBefore(s,t),t.parentNode.removeChild(t)),s):t}function arcToSegment(t,e,r,n,a,o,i,s,h){if(t!==s||e!==h){r=k(r),n=k(n);var l=a%360*B,g=E(l),c=D(l),p=Math.PI,u=2*p,f=(t-s)/2,d=(e-h)/2,_=g*f+c*d,P=-c*f+g*d,m=_*_,v=P*P,y=m/(r*r)+v/(n*n);1<y&&(r=J(y)*r,n=J(y)*n);var w=r*r,M=n*n,x=(w*M-w*v-M*m)/(w*v+M*m);x<0&&(x=0);var T=(o===i?-1:1)*J(x),b=r*P/n*T,S=-n*_/r*T,N=g*b-c*S+(t+s)/2,z=c*b+g*S+(e+h)/2,A=(_-b)/r,R=(P-S)/n,O=(-_-b)/r,j=(-P-S)/n,Y=A*A+R*R,C=(R<0?-1:1)*Math.acos(A/J(Y)),I=(A*j-R*O<0?-1:1)*Math.acos((A*O+R*j)/J(Y*(O*O+j*j)));isNaN(I)&&(I=p),!i&&0<I?I-=u:i&&I<0&&(I+=u),C%=u,I%=u;var V,F=Math.ceil(k(I)/(u/4)),L=[],X=I/F,U=4/3*D(X/2)/(1+E(X/2)),G=g*r,Q=c*r,q=c*-n,H=g*n;for(V=0;V<F;V++)_=E(a=C+V*X),P=D(a),A=E(a+=X),R=D(a),L.push(_-U*P,P+U*_,A+U*R,R-U*A,A,R);for(V=0;V<L.length;V+=2)_=L[V],P=L[V+1],L[V]=_*G+P*q+N,L[V+1]=_*Q+P*H+z;return L[V-2]=s,L[V-1]=h,L}}function stringToRawPath(t){function uc(t,e,r,n){g=(r-t)/3,c=(n-e)/3,s.push(t+g,e+c,r-g,n-c,r,n)}var e,r,n,a,o,i,s,h,l,g,c,p,u,f,d,_=(t+"").replace(b,function(t){var e=+t;return e<1e-4&&-1e-4<e?0:e}).match(x)||[],P=[],m=0,v=0,y=_.length,w=0,M="ERROR: malformed path: "+t;if(!t||!isNaN(_[0])||isNaN(_[1]))return console.log(M),P;for(e=0;e<y;e++)if(u=o,isNaN(_[e])?i=(o=_[e].toUpperCase())!==_[e]:e--,n=+_[e+1],a=+_[e+2],i&&(n+=m,a+=v),e||(h=n,l=a),"M"===o)s&&(s.length<8?--P.length:w+=s.length),m=h=n,v=l=a,s=[n,a],P.push(s),e+=2,o="L";else if("C"===o)i||(m=v=0),(s=s||[0,0]).push(n,a,m+1*_[e+3],v+1*_[e+4],m+=1*_[e+5],v+=1*_[e+6]),e+=6;else if("S"===o)g=m,c=v,"C"!==u&&"S"!==u||(g+=m-s[s.length-4],c+=v-s[s.length-3]),i||(m=v=0),s.push(g,c,n,a,m+=1*_[e+3],v+=1*_[e+4]),e+=4;else if("Q"===o)g=m+2/3*(n-m),c=v+2/3*(a-v),i||(m=v=0),m+=1*_[e+3],v+=1*_[e+4],s.push(g,c,m+2/3*(n-m),v+2/3*(a-v),m,v),e+=4;else if("T"===o)g=m-s[s.length-4],c=v-s[s.length-3],s.push(m+g,v+c,n+2/3*(m+1.5*g-n),a+2/3*(v+1.5*c-a),m=n,v=a),e+=2;else if("H"===o)uc(m,v,m=n,v),e+=1;else if("V"===o)uc(m,v,m,v=n+(i?v-m:0)),e+=1;else if("L"===o||"Z"===o)"Z"===o&&(n=h,a=l,s.closed=!0),("L"===o||.5<k(m-n)||.5<k(v-a))&&(uc(m,v,n,a),"L"===o&&(e+=2)),m=n,v=a;else if("A"===o){if(f=_[e+4],d=_[e+5],g=_[e+6],c=_[e+7],r=7,1<f.length&&(f.length<3?(c=g,g=d,r--):(c=d,g=f.substr(2),r-=2),d=f.charAt(1),f=f.charAt(0)),p=arcToSegment(m,v,+_[e+1],+_[e+2],+_[e+3],+f,+d,(i?m:0)+1*g,(i?v:0)+1*c),e+=r,p)for(r=0;r<p.length;r++)s.push(p[r]);m=s[s.length-2],v=s[s.length-1]}else console.log(M);return(e=s.length)<6?(P.pop(),e=0):s[0]===s[e-2]&&s[1]===s[e-1]&&(s.closed=!0),P.totalPoints=w+e,P}function rawPathToString(t){s(t[0])&&(t=[t]);var e,r,n,a,o="",i=t.length;for(r=0;r<i;r++){for(a=t[r],o+="M"+h(a[0])+","+h(a[1])+" C",e=a.length,n=2;n<e;n++)o+=h(a[n++])+","+h(a[n++])+" "+h(a[n++])+","+h(a[n++])+" "+h(a[n++])+","+h(a[n])+" ";a.closed&&(o+="z")}return o}function y(){return r||"undefined"!=typeof window&&(r=window.gsap)&&r.registerPlugin&&r}function z(t){return"function"==typeof t}function M(t){return console&&console.warn(t)}function O(t){var e,r=t.length,n=0,a=0;for(e=0;e<r;e++)n+=t[e++],a+=t[e];return[n/(r/2),a/(r/2)]}function P(t){var e,r,n,a=t.length,o=t[0],i=o,s=t[1],h=s;for(n=6;n<a;n+=6)o<(e=t[n])?o=e:e<i&&(i=e),s<(r=t[n+1])?s=r:r<h&&(h=r);return t.centerX=(o+i)/2,t.centerY=(s+h)/2,t.size=(o-i)*(s-h)}function Q(t,e){void 0===e&&(e=3);for(var r,n,a,o,i,s,h,l,g,c,p,u,f,d,_,P,m=t.length,v=t[0][0],y=v,w=t[0][1],M=w,x=1/e;-1<--m;)for(r=(i=t[m]).length,o=6;o<r;o+=6)for(g=i[o],c=i[o+1],p=i[o+2]-g,d=i[o+3]-c,u=i[o+4]-g,_=i[o+5]-c,f=i[o+6]-g,P=i[o+7]-c,s=e;-1<--s;)v<(n=((h=x*s)*h*f+3*(l=1-h)*(h*u+l*p))*h+g)?v=n:n<y&&(y=n),w<(a=(h*h*P+3*l*(h*_+l*d))*h+c)?w=a:a<M&&(M=a);return t.centerX=(v+y)/2,t.centerY=(w+M)/2,t.left=y,t.width=v-y,t.top=M,t.height=w-M,t.size=(v-y)*(w-M)}function R(t,e){return e.length-t.length}function S(t,e){var r=t.size||P(t),n=e.size||P(e);return Math.abs(n-r)<(r+n)/20?e.centerX-t.centerX||e.centerY-t.centerY:n-r}function T(t,e){var r,n,a=t.slice(0),o=t.length,i=o-2;for(e|=0,r=0;r<o;r++)n=(r+e)%i,t[r++]=a[n],t[r]=a[1+n]}function U(t,e,r,n,a){var o,i,s,h,l=t.length,g=0,c=l-2;for(r*=6,i=0;i<l;i+=6)h=t[o=(i+r)%c]-(e[i]-n),s=t[1+o]-(e[i+1]-a),g+=_(s*s+h*h);return g}function V(t,e,r){var n,a,o,i=t.length,s=O(t),h=O(e),l=h[0]-s[0],g=h[1]-s[1],c=U(t,e,0,l,g),p=0;for(o=6;o<i;o+=6)(a=U(t,e,o/6,l,g))<c&&(c=a,p=o);if(r)for(reverseSegment(n=t.slice(0)),o=6;o<i;o+=6)(a=U(n,e,o/6,l,g))<c&&(c=a,p=-o);return p/6}function W(t,e,r){for(var n,a,o,i,s,h,l=t.length,g=1e20,c=0,p=0;-1<--l;)for(h=(n=t[l]).length,s=0;s<h;s+=6)a=n[s]-e,o=n[s+1]-r,(i=_(a*a+o*o))<g&&(g=i,c=n[s],p=n[s+1]);return[c,p]}function X(t,e,r,n,a,o){var i,s,h,l,g=e.length,c=0,p=Math.min(t.size||P(t),e[r].size||P(e[r]))*n,u=1e20,f=t.centerX+a,d=t.centerY+o;for(i=r;i<g&&!((e[i].size||P(e[i]))<p);i++)s=e[i].centerX-f,h=e[i].centerY-d,(l=_(s*s+h*h))<u&&(c=i,u=l);return l=e[c],e.splice(c,1),l}function Y(t,e){var r,n,a,o,i,s,h,l,g,c,p,u,f,d,_=0,P=t.length,m=e/((P-2)/6);for(f=2;f<P;f+=6)for(_+=m;.999999<_;)r=t[f-2],n=t[f-1],a=t[f],o=t[f+1],i=t[f+2],s=t[f+3],h=t[f+4],l=t[f+5],g=r+(a-r)*(d=1/((Math.floor(_)||1)+1)),g+=((p=a+(i-a)*d)-g)*d,p+=(i+(h-i)*d-p)*d,c=n+(o-n)*d,c+=((u=o+(s-o)*d)-c)*d,u+=(s+(l-s)*d-u)*d,t.splice(f,4,r+(a-r)*d,n+(o-n)*d,g,c,g+(p-g)*d,c+(u-c)*d,p,u,i+(h-i)*d,s+(l-s)*d),f+=6,P+=6,_--;return t}function Z(t,e,r,n,a){var o,i,s,h,l,g,c,p=e.length-t.length,u=0<p?e:t,f=0<p?t:e,d=0,_="complexity"===n?R:S,m="position"===n?0:"number"==typeof n?n:.8,v=f.length,y="object"==typeof r&&r.push?r.slice(0):[r],w="reverse"===y[0]||y[0]<0,x="log"===r;if(f[0]){if(1<u.length&&(t.sort(_),e.sort(_),u.size||Q(u),f.size||Q(f),g=u.centerX-f.centerX,c=u.centerY-f.centerY,_===S))for(v=0;v<f.length;v++)u.splice(v,0,X(f[v],u,v,m,g,c));if(p)for(p<0&&(p=-p),u[0].length>f[0].length&&Y(f[0],(u[0].length-f[0].length)/6|0),v=f.length;d<p;)u[v].size||P(u[v]),h=(s=W(f,u[v].centerX,u[v].centerY))[0],l=s[1],f[v++]=[h,l,h,l,h,l,h,l],f.totalPoints+=8,d++;for(v=0;v<t.length;v++)o=e[v],i=t[v],(p=o.length-i.length)<0?Y(o,-p/6|0):0<p&&Y(i,p/6|0),w&&!1!==a&&!i.reversed&&reverseSegment(i),(r=y[v]||0===y[v]?y[v]:"auto")&&(i.closed||Math.abs(i[0]-i[i.length-2])<.5&&Math.abs(i[1]-i[i.length-1])<.5?"auto"===r||"log"===r?(y[v]=r=V(i,o,!v||!1===a),r<0&&(w=!0,reverseSegment(i),r=-r),T(i,6*r)):"reverse"!==r&&(v&&r<0&&reverseSegment(i),T(i,6*(r<0?-r:r))):!w&&("auto"===r&&Math.abs(o[0]-i[0])+Math.abs(o[1]-i[1])+Math.abs(o[o.length-2]-i[i.length-2])+Math.abs(o[o.length-1]-i[i.length-1])>Math.abs(o[0]-i[i.length-2])+Math.abs(o[1]-i[i.length-1])+Math.abs(o[o.length-2]-i[0])+Math.abs(o[o.length-1]-i[1])||r%2)?(reverseSegment(i),y[v]=-1,w=!0):"auto"===r?y[v]=0:"reverse"===r&&(y[v]=-1),i.closed!==o.closed&&(i.closed=o.closed=!1));return x&&M("shapeIndex:["+y.join(",")+"]"),t.shapeIndex=y}}function $(t,e,r,n,a){var o=stringToRawPath(t[0]),i=stringToRawPath(t[1]);Z(o,i,e||0===e?e:"auto",r,a)&&(t[0]=rawPathToString(o),t[1]=rawPathToString(i),"log"!==n&&!0!==n||M('precompile:["'+t[0]+'","'+t[1]+'"]'))}function aa(t,e){var r,n,a,o,i,s,h,l=0,g=parseFloat(t[0]),c=parseFloat(t[1]),p=g+","+c+" ";for(r=.5*e/(.5*(a=t.length)-1),n=0;n<a-2;n+=2){if(l+=r,s=parseFloat(t[n+2]),h=parseFloat(t[n+3]),.999999<l)for(i=1/(Math.floor(l)+1),o=1;.999999<l;)p+=(g+(s-g)*i*o).toFixed(2)+","+(c+(h-c)*i*o).toFixed(2)+" ",l--,o++;p+=s+","+h+" ",g=s,c=h}return p}function ba(t){var e=t[0].match(G)||[],r=t[1].match(G)||[],n=r.length-e.length;0<n?t[0]=aa(e,n):t[1]=aa(r,-n)}function ca(e){return isNaN(e)?ba:function(t){ba(t),t[1]=function _offsetPoints(t,e){if(!e)return t;var r,n,a,o=t.match(G)||[],i=o.length,s="";for(r="reverse"===e?(n=i-1,-2):(n=(2*(parseInt(e,10)||0)+1+100*i)%i,2),a=0;a<i;a+=2)s+=o[n-1]+","+o[n]+" ",n=(n+r)%i;return s}(t[1],parseInt(e,10))}}function ea(t,e){for(var r,n,a,o,i,s,h,l,g,c,p,u,f=t.length,d=.2*(e||1);-1<--f;){for(p=(n=t[f]).isSmooth=n.isSmooth||[0,0,0,0],u=n.smoothData=n.smoothData||[0,0,0,0],p.length=4,l=n.length-2,h=6;h<l;h+=6)a=n[h]-n[h-2],o=n[h+1]-n[h-1],i=n[h+2]-n[h],s=n[h+3]-n[h+1],g=w(o,a),c=w(s,i),(r=Math.abs(g-c)<d)&&(u[h-2]=g,u[h+2]=c,u[h-1]=_(a*a+o*o),u[h+3]=_(i*i+s*s)),p.push(r,r,0,0,r,r);n[l]===n[0]&&n[1+l]===n[1]&&(a=n[0]-n[l-2],o=n[1]-n[l-1],i=n[2]-n[0],s=n[3]-n[1],g=w(o,a),c=w(s,i),Math.abs(g-c)<d&&(u[l-2]=g,u[2]=c,u[l-1]=_(a*a+o*o),u[3]=_(i*i+s*s),p[l-2]=p[l-1]=!0))}return t}function fa(t){var e=t.trim().split(" ");return{x:(~t.indexOf("left")?0:~t.indexOf("right")?100:isNaN(parseFloat(e[0]))?50:parseFloat(e[0]))/100,y:(~t.indexOf("top")?0:~t.indexOf("bottom")?100:isNaN(parseFloat(e[1]))?50:parseFloat(e[1]))/100}}function ia(t,e,r,n){var a,o,i=this._origin,s=this._eOrigin,h=t[r]-i.x,l=t[r+1]-i.y,g=_(h*h+l*l),c=w(l,h);return h=e[r]-s.x,l=e[r+1]-s.y,o=function _shortAngle(t){return t!==t%p?t+(t<0?u:-u):t}(a=w(l,h)-c),!n&&I&&Math.abs(o+I.ca)<f&&(n=I),this._anchorPT=I={_next:this._anchorPT,t:t,sa:c,ca:n&&o*n.ca<0&&Math.abs(o)>d?a:o,sl:g,cl:_(h*h+l*l)-g,i:r}}function ja(t){r=y(),a=a||r&&r.plugins.morphSVG,r&&a?(C=r.utils.toArray,a.prototype._tweenRotation=ia,F=1):t&&M("Please gsap.registerPlugin(MorphSVGPlugin)")}var r,C,I,F,a,w=Math.atan2,j=Math.cos,L=Math.sin,_=Math.sqrt,p=Math.PI,u=2*p,f=.3*p,d=.7*p,G=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,q=/(^[#\.][a-z]|[a-y][a-z])/i,H=/[achlmqstvz]/i,K="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",tt={version:"3.9.1",name:"morphSVG",rawVars:1,register:function register(t,e){r=t,a=e,ja()},init:function init(t,e,r,n,a){if(F||ja(1),!e)return M("invalid shape"),!1;var o,i,s,h,l,g,c,p,u,f,d,_,P,m,v,y,w,x,T,b,S,N;if(z(e)&&(e=e.call(r,n,t,a)),"string"==typeof e||e.getBBox||e[0])e={shape:e};else if("object"==typeof e){for(i in o={},e)o[i]=z(e[i])&&"render"!==i?e[i].call(r,n,t,a):e[i];e=o}var A=t.nodeType?window.getComputedStyle(t):{},R=A.fill+"",O=!("none"===R||"0"===(R.match(G)||[])[3]||"evenodd"===A.fillRule),j=(e.origin||"50 50").split(",");if(l="POLYLINE"===(o=(t.nodeName+"").toUpperCase())||"POLYGON"===o,"PATH"!==o&&!l&&!e.prop)return M("Cannot morph a <"+o+"> element. "+K),!1;if(i="PATH"===o?"d":"points",!e.prop&&!z(t.setAttribute))return!1;if(h=function _parseShape(t,e,r){var n,a;return(!("string"==typeof t)||q.test(t)||(t.match(G)||[]).length<3)&&((n=C(t)[0])?(a=(n.nodeName+"").toUpperCase(),e&&"PATH"!==a&&(n=convertToPath(n,!1),a="PATH"),t=n.getAttribute("PATH"===a?"d":"points")||"",n===r&&(t=n.getAttributeNS(null,"data-original")||t)):(M("WARNING: invalid morph to: "+t),t=!1)),t}(e.shape||e.d||e.points||"","d"===i,t),l&&H.test(h))return M("A <"+o+"> cannot accept path data. "+K),!1;if(g=e.shapeIndex||0===e.shapeIndex?e.shapeIndex:"auto",c=e.map||tt.defaultMap,this._prop=e.prop,this._render=e.render||tt.defaultRender,this._apply="updateTarget"in e?e.updateTarget:tt.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(e.precision)?2:+e.precision),this._tween=r,h){if(this._target=t,w="object"==typeof e.precompile,f=this._prop?t[this._prop]:t.getAttribute(i),this._prop||t.getAttributeNS(null,"data-original")||t.setAttributeNS(null,"data-original",f),"d"===i||this._prop){if(f=stringToRawPath(w?e.precompile[0]:f),d=stringToRawPath(w?e.precompile[1]:h),!w&&!Z(f,d,g,c,O))return!1;for("log"!==e.precompile&&!0!==e.precompile||M('precompile:["'+rawPathToString(f)+'","'+rawPathToString(d)+'"]'),(S="linear"!==(e.type||tt.defaultType))&&(f=ea(f,e.smoothTolerance),d=ea(d,e.smoothTolerance),f.size||Q(f),d.size||Q(d),b=fa(j[0]),this._origin=f.origin={x:f.left+b.x*f.width,y:f.top+b.y*f.height},j[1]&&(b=fa(j[1])),this._eOrigin={x:d.left+b.x*d.width,y:d.top+b.y*d.height}),this._rawPath=t._gsRawPath=f,P=f.length;-1<--P;)for(v=f[P],y=d[P],p=v.isSmooth||[],u=y.isSmooth||[],m=v.length,_=I=0;_<m;_+=2)y[_]===v[_]&&y[_+1]===v[_+1]||(S?p[_]&&u[_]?(x=v.smoothData,T=y.smoothData,N=_+(_===m-4?7-m:5),this._controlPT={_next:this._controlPT,i:_,j:P,l1s:x[_+1],l1c:T[_+1]-x[_+1],l2s:x[N],l2c:T[N]-x[N]},s=this._tweenRotation(v,y,_+2),this._tweenRotation(v,y,_,s),this._tweenRotation(v,y,N-1,s),_+=4):this._tweenRotation(v,y,_):(s=this.add(v,_,v[_],y[_]),s=this.add(v,_+1,v[_+1],y[_+1])||s))}else s=this.add(t,"setAttribute",t.getAttribute(i)+"",h+"",n,a,0,ca(g),i);S&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x),s=this.add(this._origin,"y",this._origin.y,this._eOrigin.y)),s&&(this._props.push("morphSVG"),s.end=h,s.endProp=i)}return 1},render:function render(t,e){for(var r,n,a,o,i,s,h,l,g,c,p,u,f=e._rawPath,d=e._controlPT,_=e._anchorPT,P=e._rnd,m=e._target,v=e._pt;v;)v.r(t,v.d),v=v._next;if(1===t&&e._apply)for(v=e._pt;v;)v.end&&(e._prop?m[e._prop]=v.end:m.setAttribute(v.endProp,v.end)),v=v._next;else if(f){for(;_;)i=_.sa+t*_.ca,o=_.sl+t*_.cl,_.t[_.i]=e._origin.x+j(i)*o,_.t[_.i+1]=e._origin.y+L(i)*o,_=_._next;for(n=t<.5?2*t*t:(4-2*t)*t-1;d;)u=(s=d.i)+(s===(a=f[d.j]).length-4?7-a.length:5),i=w(a[u]-a[s+1],a[u-1]-a[s]),c=L(i),p=j(i),l=a[s+2],g=a[s+3],o=d.l1s+n*d.l1c,a[s]=l-p*o,a[s+1]=g-c*o,o=d.l2s+n*d.l2c,a[u-1]=l+p*o,a[u]=g+c*o,d=d._next;if(m._gsRawPath=f,e._apply){for(r="",h=0;h<f.length;h++)for(o=(a=f[h]).length,r+="M"+(a[0]*P|0)/P+" "+(a[1]*P|0)/P+" C",s=2;s<o;s++)r+=(a[s]*P|0)/P+" ";e._prop?m[e._prop]=r:m.setAttribute("d",r)}}e._render&&f&&e._render.call(e._tween,f,m)},kill:function kill(){this._pt=this._rawPath=0},getRawPath:function getRawPath(t){var e,r=(t=m(t)&&n.test(t)&&document.querySelector(t)||t).getAttribute?t:0;return r&&(t=t.getAttribute("d"))?(r._gsPath||(r._gsPath={}),(e=r._gsPath[t])&&!e._dirty?e:r._gsPath[t]=stringToRawPath(t)):t?m(t)?stringToRawPath(t):s(t[0])?[t]:t:console.warn("Expecting a <path> element or an SVG path data string")},stringToRawPath:stringToRawPath,rawPathToString:rawPathToString,normalizeStrings:function normalizeStrings(t,e,r){var n=r.shapeIndex,a=r.map,o=[t,e];return $(o,n,a),o},pathFilter:$,pointsFilter:ba,getTotalSize:Q,equalizeSegmentQuantity:Z,convertToPath:function convertToPath$1(t,e){return C(t).map(function(t){return convertToPath(t,!1!==e)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};y()&&r.registerPlugin(tt),t.MorphSVGPlugin=tt,t.default=tt;if (typeof(window)==="undefined"||window!==t){Object.defineProperty(t,"__esModule",{value:!0})} else {delete t.default}});



/***/ }),

/***/ "./src/app/test/test.component.ts":
/*!****************************************!*\
  !*** ./src/app/test/test.component.ts ***!
  \****************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test */ "./src/app/test/test.ts");



const _c0 = ["renderEl"];
class TestComponent {
    constructor() { }
    ngAfterViewInit() {
        const setup = {
            finished: false
        };
        const els = this.renderEl.nativeElement;
        const test = Object(_test__WEBPACK_IMPORTED_MODULE_1__["testFunction"])(els, setup);
        this.renderEl.nativeElement.addEventListener("click", test.animateViewBox);
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(); };
TestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TestComponent, selectors: [["app-test"]], viewQuery: function TestComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.renderEl = _t.first);
    } }, decls: 28, vars: 0, consts: [["width", "210mm", "height", "297mm", "viewBox", "0 0 210 297", "version", "1.1", "id", "svg36736", 0, "sodipodi", "docname", "morph.svg", 0, "inkscape", "version", "1.1.2 (b8e25be833, 2022-02-05)", 0, "xmlns", "inkscape", "http://www.inkscape.org/namespaces/inkscape", 0, "xmlns", "sodipodi", "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "svg", "http://www.w3.org/2000/svg"], ["renderEl", ""], ["id", "defs36733"], ["x", "52.791767", "y", "507.07882", "width", "191.71747", "height", "127.81165", "id", "rect42218"], [0, "inkscape", "label", "Layer 1", 0, "inkscape", "groupmode", "layer", "id", "layer1"], ["id", "rect1", "d", "M 3.9624617,5.5096201 V 37.120611 H 51.011785 V 5.5096201 Z", 2, "display", "inline", "fill", "#ff0000", "stroke-width", "0.750001"], ["id", "rect2", "d", "M 55.503804,5.5138118 V 37.124803 H 102.55313 V 5.5138118 Z", 2, "display", "inline", "fill", "#ff0000", "stroke-width", "0.750001"], ["id", "rect3", "d", "M 107.2913,5.5117154 V 37.122706 h 47.04932 V 5.5117154 Z", 2, "display", "inline", "fill", "#ff0000", "stroke-width", "0.750001"], ["id", "rect4", "d", "M 158.83264,5.5159071 V 37.126898 h 47.04933 V 5.5159071 Z", 2, "display", "inline", "fill", "#ff0000", "stroke-width", "0.750001"], ["id", "clearRect1", "d", "m 3.4313353,50.722302 v 31.61099 H 50.480658 v -31.61099 z", 1, "hidden", 2, "display", "inline", "fill", "#ffffff", "stroke-width", "0.750001", "fill-opacity", "1", "stroke", "#ff0000", "stroke-opacity", "1"], ["id", "clearRect2", "d", "M 54.972677,50.726494 V 82.337482 H 102.022 V 50.726494 Z", 1, "hidden", 2, "display", "inline", "fill", "#ffffff", "stroke-width", "0.750001", "fill-opacity", "1", "stroke", "#ff0000", "stroke-opacity", "1"], ["id", "clearRect3", "d", "M 106.76017,50.724397 V 82.335392 H 153.8095 V 50.724397 Z", 1, "hidden", 2, "display", "inline", "fill", "#ffffff", "stroke-width", "0.750001", "fill-opacity", "1", "stroke", "#ff0000", "stroke-opacity", "1"], ["id", "clearRect4", "d", "m 158.30152,50.728589 v 31.610993 h 47.04933 V 50.728589 Z", 1, "hidden", 2, "display", "inline", "fill", "#ffffff", "stroke-width", "0.750001", "fill-opacity", "1", "stroke", "#ff0000", "stroke-opacity", "1"], ["id", "line1", "d", "M 32.836649,106.72527 A 23.395958,14.942002 0 0 0 9.4406607,121.66699 H 56.232637 A 23.395958,14.942002 0 0 0 32.836649,106.72527 Z", 1, "hidden", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#ff0000", "stroke-width", "1.00708", "stroke-opacity", "1"], ["id", "line2", "d", "M 79.628625,106.72527 A 23.395958,14.942002 0 0 0 56.232637,121.66699 H 103.02461 A 23.395958,14.942002 0 0 0 79.628625,106.72527 Z", 1, "hidden", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#ff0000", "stroke-width", "1.00708", "stroke-opacity", "1"], ["id", "line3", "d", "m 126.4206,106.72527 a 23.395958,14.942002 0 0 0 -23.39599,14.94172 h 46.79198 A 23.395958,14.942002 0 0 0 126.4206,106.72527 Z", 1, "hidden", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#ff0000", "stroke-width", "1.00708", "stroke-opacity", "1"], ["id", "line4", "d", "m 173.21258,106.72526 a 23.395958,14.942002 0 0 0 -23.39599,14.94173 h 46.79198 a 23.395958,14.942002 0 0 0 -23.39599,-14.94173 z", 1, "hidden", 2, "fill", "#ffffff", "fill-opacity", "1", "stroke", "#ff0000", "stroke-width", "1.00708", "stroke-opacity", "1"], ["d", "m 30.596576,70.672643 h -4.165121 v -0.78549 h 1.60197 v -5.15731 h -1.60197 v -0.70279 q 0.325562,0 0.697632,-0.0517 0.372071,-0.0568 0.563273,-0.1602 0.237712,-0.12919 0.372071,-0.32556 0.139526,-0.20154 0.160197,-0.53743 h 0.800984 v 6.93497 h 1.570964 z", "id", "rectText1", 1, "hidden", 2, "font-size", "40px", "line-height", "1.25", "white-space", "pre", "stroke-width", "0.264583"], ["d", "m 82.863968,70.941835 h -5.20897 v -1.08003 q 0.54261,-0.46509 1.08521,-0.93018 0.54776,-0.46508 1.01802,-0.925 0.99218,-0.96118 1.35908,-1.52445 0.36691,-0.56844 0.36691,-1.22473 0,-0.59944 -0.39791,-0.93534 -0.39274,-0.34106 -1.10071,-0.34106 -0.47025,0 -1.01802,0.16536 -0.54777,0.16537 -1.0697,0.50643 h -0.0517 v -1.0852 q 0.3669,-0.18087 0.97668,-0.33073 0.61495,-0.14986 1.18855,-0.14986 1.18339,0 1.85518,0.57361 0.67179,0.56843 0.67179,1.54512 0,0.43924 -0.11369,0.82165 -0.10852,0.37724 -0.32556,0.7183 -0.20153,0.32039 -0.47542,0.63045 -0.26871,0.31006 -0.65629,0.68729 -0.55293,0.5426 -1.14204,1.0542 -0.58911,0.50643 -1.10071,0.94051 h 4.13927 z", "id", "rectText2", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 132.54468,66.501489 q 0.24805,0.22221 0.40824,0.55811 0.1602,0.33589 0.1602,0.86816 0,0.5271 -0.1912,0.96634 -0.1912,0.43925 -0.53743,0.76481 -0.38758,0.36174 -0.91467,0.53744 -0.52193,0.17053 -1.14722,0.17053 -0.64078,0 -1.2609,-0.15503 -0.62011,-0.14986 -1.01802,-0.33073 v -1.08003 h 0.0775 q 0.43925,0.28938 1.03353,0.48059 0.59428,0.1912 1.14721,0.1912 0.32556,0 0.69246,-0.10852 0.36691,-0.10852 0.59428,-0.3204 0.23771,-0.22737 0.3514,-0.50125 0.11886,-0.27389 0.11886,-0.69247 0,-0.41341 -0.13436,-0.68212 -0.12919,-0.27389 -0.36174,-0.42892 -0.23254,-0.16019 -0.56327,-0.21704 -0.33073,-0.062 -0.71313,-0.062 h -0.46509 v -0.85782 h 0.36174 q 0.78548,0 1.25056,-0.32557 0.47026,-0.33072 0.47026,-0.96117 0,-0.27906 -0.11886,-0.48576 -0.11885,-0.21187 -0.33073,-0.34623 -0.22221,-0.13436 -0.47542,-0.18604 -0.25321,-0.0517 -0.57361,-0.0517 -0.49092,0 -1.04386,0.1757 -0.55293,0.1757 -1.04386,0.49609 h -0.0517 v -1.08003 q 0.3669,-0.18087 0.97668,-0.33073 0.61495,-0.15503 1.18855,-0.15503 0.56327,0 0.99219,0.10335 0.42891,0.10335 0.77514,0.33073 0.37207,0.24804 0.56327,0.59944 0.1912,0.3514 0.1912,0.82166 0,0.64078 -0.45475,1.12137 -0.44958,0.47542 -1.06453,0.59945 v 0.0723 q 0.24805,0.0413 0.56844,0.1757 0.32039,0.12919 0.5426,0.32556 z", "id", "rectText3", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 185.22532,67.673881 h -1.14204 v 2.16523 h -0.99219 v -2.16523 h -3.68452 v -1.18856 l 3.72586,-4.34081 h 0.95085 v 4.70254 h 1.14204 z m -2.13423,-0.82683 v -3.47264 l -2.98172,3.47264 z", "id", "rectText4", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 57.803596,129.38745 h -4.165108 v -0.78548 h 1.601965 v -5.15729 h -1.601965 v -0.7028 q 0.325561,0 0.69763,-0.0517 0.372069,-0.0568 0.563271,-0.16019 0.237711,-0.12919 0.37207,-0.32556 0.139525,-0.20154 0.160196,-0.53744 h 0.800982 v 6.93496 h 1.570959 z", "id", "lineText1", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 105.78525,129.79386 h -5.20897 v -1.08003 q 0.5426,-0.46509 1.0852,-0.93017 0.54777,-0.46509 1.01803,-0.92501 0.99218,-0.96118 1.35908,-1.52445 0.3669,-0.56844 0.3669,-1.22473 0,-0.59944 -0.3979,-0.93534 -0.39274,-0.34106 -1.10071,-0.34106 -0.47025,0 -1.01802,0.16536 -0.54777,0.16537 -1.0697,0.50643 h -0.0517 v -1.0852 q 0.3669,-0.18087 0.97668,-0.33073 0.61495,-0.14986 1.18856,-0.14986 1.18338,0 1.85517,0.57361 0.67179,0.56844 0.67179,1.54512 0,0.43925 -0.11368,0.82165 -0.10852,0.37724 -0.32556,0.7183 -0.20154,0.32039 -0.47543,0.63045 -0.26871,0.31006 -0.65628,0.6873 -0.55294,0.5426 -1.14205,1.05419 -0.58911,0.50643 -1.1007,0.94051 h 4.13927 z", "id", "lineText2", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 152.02612,126.4161 q 0.24805,0.22221 0.40824,0.55811 0.1602,0.33589 0.1602,0.86816 0,0.5271 -0.1912,0.96634 -0.19121,0.43925 -0.53744,0.76481 -0.38757,0.36174 -0.91467,0.53744 -0.52193,0.17053 -1.14721,0.17053 -0.64079,0 -1.2609,-0.15503 -0.62012,-0.14986 -1.01802,-0.33073 v -1.08003 h 0.0775 q 0.43924,0.28938 1.03352,0.48059 0.59428,0.1912 1.14721,0.1912 0.32557,0 0.69247,-0.10852 0.3669,-0.10852 0.59427,-0.3204 0.23771,-0.22737 0.3514,-0.50126 0.11886,-0.27388 0.11886,-0.69246 0,-0.41341 -0.13436,-0.68212 -0.12919,-0.27389 -0.36173,-0.42892 -0.23255,-0.16019 -0.56328,-0.21704 -0.33072,-0.062 -0.71313,-0.062 h -0.46508 v -0.85782 h 0.36173 q 0.78548,0 1.25057,-0.32557 0.47025,-0.33072 0.47025,-0.96117 0,-0.27906 -0.11886,-0.48576 -0.11885,-0.21187 -0.33072,-0.34623 -0.22221,-0.13436 -0.47543,-0.18604 -0.25321,-0.0517 -0.5736,-0.0517 -0.49093,0 -1.04386,0.1757 -0.55294,0.1757 -1.04386,0.49609 h -0.0517 v -1.08003 q 0.3669,-0.18087 0.97668,-0.33073 0.61495,-0.15503 1.18855,-0.15503 0.56327,0 0.99219,0.10335 0.42891,0.10335 0.77514,0.33073 0.37207,0.24804 0.56327,0.59944 0.1912,0.3514 0.1912,0.82166 0,0.64078 -0.45475,1.12137 -0.44958,0.47542 -1.06453,0.59945 v 0.0723 q 0.24805,0.0413 0.56844,0.1757 0.32039,0.12919 0.5426,0.32556 z", "id", "lineText3", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"], ["d", "m 197.72284,127.95605 h -1.14204 v 2.16524 h -0.99219 v -2.16524 h -3.68452 v -1.18855 l 3.72586,-4.34081 h 0.95085 v 4.70254 h 1.14204 z m -2.13423,-0.82682 v -3.47264 l -2.98172,3.47264 z", "id", "lineText4", 1, "hidden", 2, "font-size", "10.5833px", "line-height", "1.25", "stroke-width", "0.264583"]], template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "defs", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "rect", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "path", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".hidden[_ngcontent-%COMP%] {\r\n    visibility:hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC90ZXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC90ZXN0L3Rlc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oaWRkZW4ge1xyXG4gICAgdmlzaWJpbGl0eTpoaWRkZW47XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TestComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-test',
                templateUrl: './test.component.html',
                styleUrls: ['./test.component.css']
            }]
    }], function () { return []; }, { renderEl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['renderEl']
        }] }); })();


/***/ }),

/***/ "./src/app/test/test.ts":
/*!******************************!*\
  !*** ./src/app/test/test.ts ***!
  \******************************/
/*! exports provided: testFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testFunction", function() { return testFunction; });
/* harmony import */ var _gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-shockingly-green/minified/MorphSVGPlugin.min.js */ "./src/app/test/gsap-shockingly-green/minified/MorphSVGPlugin.min.js");
/* harmony import */ var _gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gsap_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap/all */ "./node_modules/gsap/all.js");


function testFunction(els, state) {
    let self = {};
    class testClass {
        constructor(els, state) {
            self = this;
            this.els = els;
            this.state = state;
        }
        animateViewBox(e) {
            gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].registerPlugin(_gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__["MorphSVGPlugin"]); //needed this line or else error would occur
            _gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__["MorphSVGPlugin"].convertToPath("#circ1");
            _gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__["MorphSVGPlugin"].convertToPath("#square");
            _gsap_shockingly_green_minified_MorphSVGPlugin_min_js__WEBPACK_IMPORTED_MODULE_0__["MorphSVGPlugin"].convertToPath("#circ2");
            console.log("clicked");
            let objects = gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].utils.toArray(["#rect1", "#rect2", "#rect3", "#rect4"]);
            console.log(objects);
            var counter = 1;
            objects.forEach(element => {
                var t1 = gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].timeline({ defaults: { duration: 1 } });
                var t2 = gsap_all__WEBPACK_IMPORTED_MODULE_1__["gsap"].timeline({ defaults: { duration: 1 } });
                t1.set(`#${element.id}`, { fill: '#ffffff', stroke: '#ff0000', duration: 0 })
                    .to(`#${element.id}`, { morphSVG: `#clearRect${counter}` })
                    .to(`#${element.id}`, { morphSVG: `#line${counter}`, delay: 1 });
                t2.set(`#rectText${counter}`, { visibility: "visible", delay: 1, duration: 0 })
                    .to(`#rectText${counter}`, { morphSVG: `#lineText${counter}`, delay: 1 });
                counter++;
            });
        }
    }
    return new testClass(els, state);
}


/***/ }),

/***/ "./src/app/tst-dot-connect/tst-dot-connect.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/tst-dot-connect/tst-dot-connect.component.ts ***!
  \**************************************************************/
/*! exports provided: TstDotConnectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TstDotConnectComponent", function() { return TstDotConnectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class TstDotConnectComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.target = 0;
        console.log("element ref in constructor", elementRef.nativeElement);
    }
    ngOnInit() {
    }
}
TstDotConnectComponent.ɵfac = function TstDotConnectComponent_Factory(t) { return new (t || TstDotConnectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
TstDotConnectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TstDotConnectComponent, selectors: [["app-tst-dot-connect"]], inputs: { target: "target" }, decls: 4, vars: 0, consts: [["upperSVG", ""], ["lowerSVG", ""]], template: function TstDotConnectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "svg", null, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "svg", null, 1);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RzdC1kb3QtY29ubmVjdC90c3QtZG90LWNvbm5lY3QuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TstDotConnectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-tst-dot-connect',
                templateUrl: './tst-dot-connect.component.html',
                styleUrls: ['./tst-dot-connect.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { target: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\chris\Desktop\knowledgehook\AngularStarter-master\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!***********************!*\
  !*** jsdom (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************************************************!*\
  !*** jsdom/lib/jsdom/living/generated/utils (ignored) ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!***************************************!*\
  !*** jsdom/lib/jsdom/utils (ignored) ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map