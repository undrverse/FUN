const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

var name = "creator"
module.exports = class CreatorCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'creator',
            aliases: [],
            group: 'meta',
            memberName: 'creator',
            description: "Get info. on who coded Undrverse :eyes:",
            details: "Get info. on who coded Undrverse :eyes:",
            examples: ["creator"]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["12196", "34473", "13092", "16158", "10813", "16851", "6152"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

            const embed = new Discord.MessageEmbed()
            .setColor(randomColour)
            .setTitle("About Silvia")
            .setAuthor('Undrverse', this.client.user.avatarURL, 'https://github.com/undrverse')
            .setDescription("The Bots was coded by Undrverse, a Computer Science student. \n If you want to see more of her work, check out her GitHub at https://github.com/undrverse")
            .setThumbnail(this.client.user.avatarURL)
            .addFields(
                { name: 'Give Me A Star', value: "If you could star The Bots GitHub repo, you'd make Undrverse day. :eyes: \n Or, Silvia would really appreciate if you could vote for this bot on discordbots.org, since it'll enable Bots to be found on more servers, and to help Silvia keep working on it. " },
                )
            .setTimestamp()

            msg.channel.send({
                embed: embed
            })

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};