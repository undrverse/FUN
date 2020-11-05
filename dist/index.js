"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
const bot = inversify_config_1.container.get(types_1.TYPES.Bot);
bot.listen().then(() => {
    console.log('Logged in!');
}).catch((error) => {
    console.log('Oh no! ', error);
});
//# sourceMappingURL=index.js.map