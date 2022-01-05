const fs = require('fs'),
	AstolfoNode = require('.');
const { ObfuscationSettings } = AstolfoNode,
	AstolfoInstance = AstolfoNode.Astolfo;
const Settings = new ObfuscationSettings(); // Default Settings
const Astolfo = new AstolfoInstance(process.env.Key);

(async () => {
	// Obfuscate Script
	const Response = await Astolfo.ObfuscateScript(
		"print('Hello World!');",
		Settings
	);
	if (!Response.success)
		throw new Error('An error has ocurred while obfuscating: ' + Response);
	console.log(
		'Server Obfuscated a Hello World in ' +
			Response.completedIn +
			'ms (+ proxy & node client time)'
	);
	fs.writeFileSync('HelloWorld.lua', Response.output);
})();
