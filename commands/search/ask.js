const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const Discord = require('discord.js');

const wolfram_alpha_id = process.env.WOLFRAM_ALPHA_APP_ID;

var name = "ask"
module.exports = class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ask',
            aliases: [],
            group: 'search',
            memberName: 'ask',
            description: "Ask Bots anything, and she'll provide an answer from Wolfram|Alpha, an information engine.",
            details: oneLine`
            Ask Bots anything, and she'll provide an answer from Wolfram|Alpha, an information engine.
			`,
            examples: ["ask"]
        });
    }

    async run(msg, args) {
        var text = args;

        if (args.length < 1) {
            msg.reply("Add a question to your command, so I can get an answer for you :eyes:\nEg: `-ask what is the velocity of a Boeing 747`");
        }
        else {

            // Necessary for choosing random colours for rich embeds
            var colour_array = ["121199", "344700", "130897", "167118", "1088163", "160988", "615096"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];

            var question = text;
            console.log(question)
            var url_encoded_question = question.split(" ").join("%20");

            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${url_encoded_question}&output=json`

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have an answer for that question. Try again maybe? :D")
                    }
                    else {
                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;

                        var answer = out.queryresult.pods[1].subpods[0].plaintext;

                        const answerEmbed = new Discord.MessageEmbed()
                        .setColor(randomColour)
                        .setTitle(`${interpretation}`)
                        .setDescription(answer)
                        .setTimestamp()

                        msg.channel.send({
                            embed: answerEmbed
                        });
                    }
                })
                .catch(err => { throw err });

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};