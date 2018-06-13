/*
	This is the DiscordJS Example Bot. Where several features of Discordjs and general NodeJs will
	be displayed for your skill in creation of bots.
	Comments like this one will be displayed around important segments of code to help you understand
	on what is going on.
*/

/* Essentially "gets" a module, which is discord since we are making a Discord.JS Bot.
   Note that to require a module, it has to be installed in your "node_modulus" folder
   and is listed in "dependencies" in package.json.
*/
const Discord = require(`discord.js`);


/* Creates a client for the bot to run on.
   There is a split between programmers calling this "bot" instead of "client". Either of which are fine,
   but remember to change each instance of "client" to "bot" if you choose to call this "bot".
*/
const client = new Discord.Client();

/* Makes an identifible link between your Bot's avatar and the code here.
   In order for this to connect, change "TOKENHERE" to the token of your bot. If you are unsure on how to
   get your token. Read the "README" file. 
*/
client.login(`TOKENHERE`);

/* Creates a Prefix for our bot. This is easily customisable, so you can change it to what ever you like.
   A prefix is the characters that make commands easier to pick out and use. E.g "e!help".
*/
var prefix = "e!";


// Now lets start get some practical things done.


// We will start with what happens if the bot is turned on.

/* It may look slightly complicated with the word "async".
   However, it is just saying "Do this when the bot becomes 'ready'".
*/ 
client.on(`ready`, async () => {

	// Sets the status of the bot. I.E online, idle, dnd (do not disturb) and invisible.
	// Default status is online.
	client.user.setStatus("online");

	// Sets the activity the bot is doing. It's very useful for displaying things like prefixes.
	// "Type" can be changed to "WATCHING" for example.
	client.user.setActivity(`With Examples!`, {type: `PLAYING`});

	// Logs to the console when the bot is on.
	console.log("Online and ready for use!");
});

// Similarly to 'ready', this will activate when a person joins the server.
client.on(`guildMemberAdd`, (member) => {

	// "member.send" sends a DM to the user.
	// In short, this DMs the user as soon he has joined.
	member.send(`Welcome to our server!`);

	/* Want the user to have a role when they join?
	   This adds a role to the person that joined. If you don't know how 
	   to get a role ID, read the "README" file.
	*/
	member.addRole("ROLEID");
});

// This will activate when a person leaves the server.
client.on(`guildMemberRemove`, (member) => {
	// This will send the person that left a message.
	// The "${member}" is the mention of the person that left the server.
	member.send(`Bye Bye ${member}!`);
});

 // This will activate when the bot joins the guild.
client.on("guildCreate", (guild) => {

	/* Sends to the console a message.
	   "${guild.name}" receives the name of the server and respectively "${guild.id}" returns
	   the ID of the server.
	*/
	console.log(`I recently joined ${guild.name} (${guild.id})!`);
};

// This will activate when the bot leaves the guild.
client.on("guildDelete", (guild) => {

	//Same principle with "guildCreate".
	console.log(`I recently left ${guild.name} (${guild.id})!`);
};

/* This will activate when a person sends a message.
   Note that some people like to use "msg" instead of "message" for the arrow function.
   Either are fine, just remember to change each instance of "message" with "msg".
 */
client.on(`message`, message => {

	/* Checks if the person sending the message is a bot. If so, it "returns", or simply stops the
	   code.
	   This is to stop something the community calls "botception", where the bot gets into spam loop
	   due to their own message triggering their command.
	*/
	if (message.author.bot) return;

	// We may also want to ignore messages that don't start with our prefix.
	if (message.content.indexOf(prefix) !== 0) return;

	/* Now we want the commands and the args (arguments) to fully implement commands.
	   For example, a command may be "e!diceroll" and an argument would be "6", giving
	   us "e!diceroll 6".
	*/
	const args = message.content.slice(prefix.length).split(" ");
	const cmd = args[0].toLowerCase();

	// Now that is out of the way, we can start making commands!
	// A first generic one is the "ping" command.

	// "==" due to being a comparative operator, do not mix up "=" with "==".
	if (cmd == "ping") {

		/* "message.channel.send" sends a message to the channel where
			the command was sent from.
		   ":ping_pong:" is an emoji. Emojis are usable in messages. 
		*/
		message.channel.send(":ping_pong: Ping!!!!");
	};

	// Now how about a help command? But we want it to be easy to make and make it look nice.
	// This is where we will be using "Embeds".

	// I suggest creating an array for your commands, so you don't have to list out each one.
	let cmds = ["Ping", "Help"];

	if (cmd == "help") {

		// Creates an instance of an embed.
		embed = new Discord.RichEmbed();

		// Sets the color of the embed, and it can only be hexadecimal strings. E.g #ff0000 gives red.
		// Remember to use the correct spelling for "color" ("colour" doesn't work).
		embed.setColor("#ff0000");

		// Sets the author of the embed. We'll make it the person that sent the message.
		embed.setAuthor(message.author.username);

		// Sets the description of the embed.
		embed.setDescription("The Help Menu!");

		// Sets the thumbnail (the image top-right of the embed).
		// We'll set this to the sender's avatar.
		embed.setThumbnail(message.author.avatarURL);

		/* Adds a new field to the Embed. "Fields" are essentially new lines with two parts to them.
		  "Commands" is the "header" of the field, and the second part is the array joined as a list. 
		*/
		embed.addField("Commands", cmds.join("\n"));

		// Finally, we need to send the embed.
		message.channel.send({embed: embed});
	}
});