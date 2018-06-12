
//Requires everything from the "index.js" file.

const Discord = require("Discord.js");
const client = new Discord.Client();

/* Notice that "../JSON/botsetting.json" has two extra dots at the front.
   When there is one dot, it tells the computer to look for the file/folder in the same directory,
   When there are two dots, it tells the computer to look back a directory,
   When there are three dots, it tells the computer to jump back two directories, and so on.
*/
const bs = require("../JSON/botsettings.json");
const fs = require("fs");

// This is essentially the same as the "client.on(`message`, (message) => {});" but with args added on
// as a component in this function.
module.exports.run = async (client, message, args) => {

	/* "message.channel.send" sends a message to the channel where
		the command was sent from.
		":ping_pong:" is an emoji. Emojis are usable in messages. 
	*/
	message.channel.send(":ping_pong: Ping!!!!");
}

// This gives information to the main file on what the name of the command is.
module.exports.help = {
	name: "ping",
}