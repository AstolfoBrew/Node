export interface ObfuscationSettings {
	/**
	 * @name EncryptStrings
	 * @description Describes whether to encrypt strings or not. We strongly encourage keeping this at *true*
	 * @default true
	 */
	EncryptStrings: boolean;
	/**
	 * @name EncryptImportantStrings
	 * @description Describes whether to encrypt important strings or not. Provided EncryptStrings is true, this adds another layer of encryption onto important strings.
	 *    Otherwise, it just encrypts only important strings.
	 * @default false
	 */
	EncryptImportantStrings: boolean;
	/**
	 * @name ControlFlow
	 * @description Enables Control Flow. If you don't know what that is, idk how to help you man.
	 * @default true
	 */
	ControlFlow: boolean;
	/**
	 * @name BytecodeCompress
	 * @description Compresses Bytecode.
	 * @default true
	 */
	BytecodeCompress: boolean;
	// DecryptTableLen: number;
	/**
	 * @name PreserveLineInfo
	 * @description Keeps Line information. This is discouraged for anything except debugging.
	 * @default false
	 */
	PreserveLineInfo: boolean;
	/**
	 * @name Mutate
	 * @description Enables Mutations.
	 * @default true
	 */
	Mutate: boolean;
	/**
	 * @name SuperOperators
	 * @description https://en.wikipedia.org/wiki/Superoperator
	 * @default true
	 */
	SuperOperators: boolean;
	// MaxMiniSuperOperators: number; // API ignores this currently
	// MaxMegaSuperOperators: number; // API ignores this currently
	// MaxMutations: number; // API ignores this currently
	/**
	 * @name EnvFunctions
	 * @description Provides Environment functions listed in https://brewdocs.astolfo.gay/Environment/index.html. Disabling this allows support to deny assistance.
	 * @default true
	 */
	EnvFunctions: boolean;
	/**
	 * @name DeadCodeInjection
	 * @description Mostly reserved for future use - currently all scripts have varying quantities of dead code added.
	 * @default true
	 */
	DeadCodeInjection: boolean;
	/**
	 * @name Memes!
	 * @description Making fun of Luraph for being retarded, as usual. Oh and some other memes are also added.
	 *   Increases security, slightly decreases performance.
	 * @default true
	 */
	Memes: boolean;
}

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
