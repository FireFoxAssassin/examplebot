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


//Makes a Discord Collection, which will be useful for the Command Handler later on. 
client.cmds = new Discord.Collection();

/* Makes an identifible link between your Bot's avatar and the code here.
   In order for this to connect, change "TOKENHERE" to the token of your bot. If you are unsure on how to
   get your token. Read the "README" file. 
*/
client.login(`TOKENHERE`);

/* In this we are requiring a JSON file (JavaScript Object Notation). Put simply, JSON files help
   to store information.
*/ 
const bs = require("./JSON/botsettings.json");

/* If you have taken a look in "botsettings.json", you will see that there 
   is a '"prefix": "ei"'. In simplist terms, the prefix is stored as information in the JSON.
   If you want to "get" the piece of information. You would need to do something like:
*/
var prefix = bs.prefix;

// We will require a different module, that doesn't needed to be downloaded in your "node_modulus".
// This will be important later.
const fs = require("fs");

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

 // This will activate when the bot joins the server.
client.on("guildCreate", (guild) => {

	/* Sends to the console a message.
	   "${guild.name}" receives the name of the server and respectively "${guild.id}" returns
	   the ID of the server.
	*/
	console.log(`I recently joined ${guild.name} (${guild.id})!`);
};

// This will activate when the bot leaves the server.
client.on("guildDelete", (guild) => {

	//Same principle with "guildCreate".
	console.log(`I recently left ${guild.name} (${guild.id})!`);
};

/*
  This is where the "fs" module is used.
  "Readdir" is the shortened version of "Read Directory".
  This will look complicated for new programmers, so i'll summarise within
  20 words:
  Reads the "CMDS" file and gets each .js files name and stores them in a list (collection).
*/
fs.readdir("./CMDS/", (err, files) => {

	// It's good practise to "throw" (see what I did there?) one of these in your code.
	// If an error happens, it will display the error in the console. 
	if (err) throw (err);

	// Searches for the files that ends with ".js".
	let jsf = files.filter(f => f.split(".").pop() === "js");

	// Checks if there are no .js files in "CMDS".
	if (jsf.length == 0) return;

	// Sets the Collection with the names of the .js files in "CMDS".
	jsf.forEach((f, i) => {
		let props = require(`./CMDS/${f}`);
		client.cmds.set(props.help.name, props);
	});
});

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
	   For the next three lines of code, I will use this example to show what it will look
	   like.
	*/
	
    // This will be displayed as: ["e!diceroll", "6"].
    let msg = message.content.split(" ");

    // This will be displayed as: "e!diceroll".
    let cmd = msg[0].toLowerCase();

    // And finally, this will be displayed as: "6".
    let args = msg.slice(1);

    // This checks if the command exists and will execute it if it does.
    cmdf = client.cmds.get(cmd.slice(prefix.length));
    if (cmdf) cmdf.run(client, message, args);

});
