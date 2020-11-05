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
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const message_responder_1 = require("./services/message-responder");
const guild_greeter_1 = require("./services/guild-greeter");
let Bot = class Bot {
    constructor(client, token, messageResponder, guildGreeter) {
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
        this.guildGreeter = guildGreeter;
        this.client = client;
        this.token = token;
        this.messageResponder = messageResponder;
    }
    listen() {
        this.client.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot) {
                return;
            }
            console.log(`Message received! Contents: ${message.content}`);
            this.messageResponder.handle(message).then(() => {
                console.log('Ping response sent!');
            }).catch(() => {
            });
            if (message.content === '!join') {
                this.client.emit('guildMemberAdd', message.member ||
                    (yield message.guild.fetchMember(message.author)));
            }
        }));
        this.client.on('guildMemberAdd', (newMember) => {
            console.log('guildMemberAdd emitted');
            this.guildGreeter.handle(newMember).then(() => {
                console.log('New member greeted!');
            }).catch(() => {
                console.log('No greeting sent.');
            });
        });
        return this.client.login(this.token);
    }
};
Bot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Token)),
    __param(2, inversify_1.inject(types_1.TYPES.MessageResponder)),
    __param(3, inversify_1.inject(types_1.TYPES.GuildGreeter)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, message_responder_1.MessageResponder,
        guild_greeter_1.GuildGreeter])
], Bot);
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map