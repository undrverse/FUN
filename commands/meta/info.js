const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const sqlite = require('sqlite');
sqlite.open("./database.sqlite3");
var name = "info"
module.exports = class InfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: [],
            group: 'meta',
            memberName: 'info',
            description: "Get info on what Undrverse was coded with.",
            details: "Get info on what Undrverse was coded with.",
            examples: ["info"]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["12996", "344703", "130792", "16858", "10863", "160981", "6162"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        // Check Prefix
        var guild_id = msg.channel.guild.id
        var channel_type = msg.channel.type;
        console.log(guild_id)
        var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
        var prefix;


        if (channel_type == "dm") {
            prefix = ""
        }
        else {
            // If undefined, then no special prefixes corresponding to that server were found.
            if (row === undefined) {
                prefix = this.client.commandPrefix;
            }
            else {
                var settings = row.settings;
                var jsonSettings = JSON.parse(settings);
                prefix = jsonSettings.prefix;
            }
        }

        msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    author: {
                        name: this.client.user.username,
                        icon_url: this.client.user.avatarURL
                    },
                    title: `About The Bots`,
                    description: "Undrverse is coded using Node.JS and the DiscordJS library.",
                    fields: [{
                        name: "Command Prefix",
                        value: `Undrverse's custom prefix for this server is ${prefix} or @test 666884221#3848`
                    },
                    {
                        name: "Get Started",
                        value: "To get started, just type `" + prefix + "help`"
                    },
                    // {
                    //     name: "It's Open Source",
                    //     // value: "If you could star Undrverse's GitHub repo, you'd make Silvia's day. :eyes: \n Or, Silvia would really appreciate if you could vote for this bot on discordbots.org, since it'll enable Undrverse to be found on more servers, and to help Silvia keep working on it. "
                    // }
                    ],
                    footer: {
                        icon_url: this.client.user.avatarURL,
                        text: "@test 666884221#3848 <3"
                    }
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};