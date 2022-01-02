/**
 * @name ObfuscationSettings
 * @description Obfuscation Settings. Please use this instead of passing a new table into the options every time
 *
 * @param {Partial<ObfuscationSettings>} props Properties to write to the ObfuscationSettings Object
 * @class
 */
export class ObfuscationSettings implements ObfuscationSettings {
	EncryptStrings = true;
	EncryptImportantStrings = false;
	ControlFlow = true;
	BytecodeCompress = true;
	PreserveLineInfo = false;
	Mutate = true;
	SuperOperators = true;
	EnvFunctions = true;
	DeadCodeInjection = true;
	Memes = true;
	/**
	 * @param {Partial<ObfuscationSettings>} props Properties to write to the ObfuscationSettings Object
	 */
	constructor(props: Partial<ObfuscationSettings>) {
		for (const k in props) {
			const value = props[k];
			if (typeof this[k] !== 'undefined') this[k] = value;
		}
	}
}
