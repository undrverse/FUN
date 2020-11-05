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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const arccorp_greeting_1 = require("./greetings/sc/arccorp-greeting");
const types_1 = require("../types");
const Queue = require('promise-queue');
let GuildGreeter = class GuildGreeter {
    constructor(arccorpGreeting) {
        this.arccorpGreeting = arccorpGreeting;
        this.channelName = 'welcome';
        this.queueMaxConcurrent = 1;
        this.queueMaxCount = Infinity;
        this.queue = new Queue(this.queueMaxConcurrent, this.queueMaxCount);
    }
    handle(member) {
        const channel = this.findTextBasedChannel(this.channelName, member);
        if (channel) {
            return this.queue.add(() => {
                return this.arccorpGreeting.generateGreetingAttachment(member);
            })
                .then((attachment) => {
                return channel.send(this.createRichEmbedResponse(member, attachment));
            })
                .catch((err) => {
                console.log(err);
                return Promise.reject();
            });
        }
        return Promise.reject();
    }
    createRichEmbedResponse(member, attachment) {
        const exampleEmbed = new discord_js_1.RichEmbed()
            .setColor('#50a0b3')
            .attachFiles([attachment])
            .setImage('attachment://welcome.gif')
            .setDescription(`Welcome to the corp, ${member}!`);
        return exampleEmbed;
    }
    findTextBasedChannel(channelName, guildMember) {
        const guildChannel = guildMember.guild.channels.find(ch => ch.name === channelName);
        if (!guildChannel)
            return;
        return guildChannel;
    }
};
GuildGreeter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.ArccorpGreeting)),
    __metadata("design:paramtypes", [arccorp_greeting_1.ArccorpGreeting])
], GuildGreeter);
exports.GuildGreeter = GuildGreeter;
//# sourceMappingURL=guild-greeter.js.map