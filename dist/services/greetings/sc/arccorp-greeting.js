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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const canvas_1 = require("canvas");
const discord_js_1 = require("discord.js");
const types_1 = require("../../../types");
const canvas_helper_1 = require("../../canvas-helper");
const gifEncoder = require("gif-encoder");
let ArccorpGreeting = class ArccorpGreeting {
    constructor(canvasHelper) {
        this.canvasHelper = canvasHelper;
        this.canvasWidth = 700;
        this.canvasHeight = 205;
        this.gifRepeat = 0;
        this.gifDelay = 42;
        this.gifQuality = 15;
        this.backFrameCount = 44;
        this.backPath = 'src/assets/backgrounds/arccorp/';
        this.backFilePrefix = 'arccorp';
        this.backFileSuffix = '.png';
        this.avatarWidth = 80;
        this.avatarBorderWidth = 2;
        this.backgroundImages = [];
    }
    setupCanvas() {
        this.canvas = canvas_1.createCanvas(this.canvasWidth, this.canvasHeight);
        this.ctx = this.canvas.getContext('2d', { alpha: true });
    }
    preloadBackgroundSequence() {
        return __awaiter(this, void 0, void 0, function* () {
            const countArray = Array
                .apply(null, { length: this.backFrameCount })
                .map(Number.call, Number);
            if (this.backgroundImages.length === 0) {
                for (const i of countArray) {
                    const frame = i.toString().padStart(2, '0');
                    const backgroundFile = `${this.backPath}${this.backFilePrefix}${frame}${this.backFileSuffix}`;
                    const image = yield canvas_1.loadImage(backgroundFile);
                    this.backgroundImages.push(image);
                }
            }
            return true;
        });
    }
    initEncoder() {
        this.encoder = new gifEncoder(this.canvas.width, this.canvas.height);
        this.encoder.setRepeat(this.gifRepeat);
        this.encoder.setDelay(this.gifDelay);
        this.encoder.setQuality(this.gifQuality);
        this.encoder.writeHeader();
    }
    attachmentPromise() {
        const buffers = [];
        const attachment = new Promise((resolve, reject) => {
            this.encoder.on('data', (buffer) => {
                buffers.push(buffer);
            });
            this.encoder.on('end', () => {
                console.log('stream complete!');
                resolve(new discord_js_1.Attachment(Buffer.concat(buffers), 'welcome.gif'));
            });
            this.encoder.on('error', err => {
                console.log(err);
                reject(err);
            });
        });
        return attachment;
    }
    generateGreetingAttachment(member) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupCanvas();
            this.initEncoder();
            const attachment = this.attachmentPromise();
            yield this.preloadBackgroundSequence();
            const avatarImage = yield canvas_1.loadImage(member.user.displayAvatarURL);
            this.captureFrames(member, avatarImage);
            this.encoder.finish();
            return attachment;
        });
    }
    captureFrames(member, avatarImage) {
        const countArray = Array
            .apply(null, { length: this.backFrameCount })
            .map(Number.call, Number);
        console.log(`capturing frames...`);
        for (const i of countArray) {
            this.drawFrame(i, member, avatarImage);
            const pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
            this.encoder.addFrame(pixels);
        }
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBackground(frameNum) {
        this.ctx.drawImage(this.backgroundImages[frameNum], 0, 0, this.canvas.width, this.canvas.height);
    }
    drawBackgroundOverlay() {
        const grd = this.ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
        grd.addColorStop(0.000, 'rgba(30, 70, 81, 0.400)');
        grd.addColorStop(0.348, 'rgba(30, 70, 81, 0.000)');
        grd.addColorStop(0.652, 'rgba(30, 70, 81, 0.000)');
        grd.addColorStop(0.982, 'rgba(30, 70, 81, 0.400)');
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawAvatarBorderOuter() {
        this.ctx.strokeStyle = 'rgba(205,247,247,0.7)';
        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2), (this.avatarWidth / 2) + (this.avatarBorderWidth + 5), 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    drawAvatarBorder() {
        this.ctx.fillStyle = 'rgba(205,247,247,0.7)';
        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2), (this.avatarWidth / 2) + this.avatarBorderWidth, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawAvatarClippingMask() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width / 2), (this.canvas.height / 2), (this.avatarWidth / 2), 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();
    }
    drawAvatar(avatarImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const posX = (this.canvas.width / 2) - (this.avatarWidth / 2);
            const posY = (this.canvas.height / 2) - (this.avatarWidth / 2);
            this.ctx.drawImage(avatarImage, posX, posY, this.avatarWidth, this.avatarWidth);
        });
    }
    drawAvatarGlow() {
        const posX = (this.canvas.width / 2) - (this.avatarWidth / 2);
        const posY = (this.canvas.height / 2) - (this.avatarWidth / 2);
        const grd = this.ctx.createRadialGradient((this.canvas.width / 2), (this.canvas.height / 2), 0, (this.canvas.width / 2), (this.canvas.height / 2), (this.avatarWidth / 2));
        grd.addColorStop(0.6, 'rgba(213, 253, 253, 0.000)');
        grd.addColorStop(1.000, 'rgba(213, 253, 253, 0.400)');
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(posX, posY, this.avatarWidth, this.avatarWidth);
        this.ctx.restore();
    }
    applyText(text, initFontSize) {
        let fontSize = initFontSize;
        do {
            this.ctx.font = `${fontSize -= 10}px Roboto Medium`;
        } while (this.ctx.measureText(text).width > this.canvas.width - 50);
    }
    drawTextLine1(text) {
        this.applyText(text, 40);
        this.ctx.fillStyle = 'rgb(205,247,247)';
        const posX = (this.canvas.width / 2) - (this.ctx.measureText(text).width / 2);
        this.ctx.fillText(text, posX, 35);
    }
    drawTextLine2(text) {
        this.applyText(text, 35);
        this.ctx.fillStyle = 'rgb(205,247,247)';
        const posX = (this.canvas.width / 2) - (this.ctx.measureText(text).width / 2);
        this.ctx.fillText(text, posX, this.canvas.height - 17);
    }
    drawFrame(frameNum, member, avatarImage) {
        this.clearCanvas();
        this.drawBackground(frameNum);
        this.drawBackgroundOverlay();
        this.drawTextLine1(`${member.displayName}`);
        this.drawTextLine2(`Welcome To The Corp!`);
        this.drawAvatarBorderOuter();
        this.drawAvatarBorder();
        this.drawAvatarClippingMask();
        this.drawAvatar(avatarImage);
        this.drawAvatarGlow();
    }
};
ArccorpGreeting = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.CanvasHelper)),
    __metadata("design:paramtypes", [canvas_helper_1.CanvasHelper])
], ArccorpGreeting);
exports.ArccorpGreeting = ArccorpGreeting;
//# sourceMappingURL=arccorp-greeting.js.map