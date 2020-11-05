"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const inversify_1 = require("inversify");
let CanvasHelper = class CanvasHelper {
    constructor() {
        this.registerFonts();
    }
    registerFonts() {
        canvas_1.registerFont('src/assets/fonts/roboto/Roboto-Medium.ttf', { family: 'Roboto Medium' });
        canvas_1.registerFont('src/assets/fonts/roboto/Roboto-MediumItalic.ttf', { family: 'Roboto Medium Italic' });
        canvas_1.registerFont('src/assets/fonts/roboto/Roboto-Regular.ttf', { family: 'Roboto Regular' });
        canvas_1.registerFont('src/assets/fonts/rounded_elegance/Rounded_Elegance.ttf', { family: 'Rounded Elegance' });
    }
};
CanvasHelper = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], CanvasHelper);
exports.CanvasHelper = CanvasHelper;
//# sourceMappingURL=canvas-helper.js.map