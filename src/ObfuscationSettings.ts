export interface ObfuscationSettings {
	EncryptStrings: boolean;
	EncryptImportantStrings: boolean;
	ControlFlow: boolean;
	BytecodeCompress: boolean;
	// DecryptTableLen: number;
	PreserveLineInfo: boolean;
	Mutate: boolean;
	SuperOperators: boolean;
	// MaxMiniSuperOperators: number;
	// MaxMegaSuperOperators: number;
	// MaxMutations: number;
	EnvFunctions: boolean; // Provide Environment Functions, such as which injector is running, and similar things
	DeadCodeInjection: boolean;
	Memes: boolean;
}

export class ObfuscationSettings implements ObfuscationSettings {
	EncryptStrings = false;
	EncryptImportantStrings = false;
	ControlFlow = true;
	BytecodeCompress = true;
	// DecryptTableLen = 500;
	PreserveLineInfo = false;
	Mutate = true;
	SuperOperators = true;
	// MaxMegaSuperOperators = 120;
	// MaxMiniSuperOperators = 120;
	// MaxMutations = 200;
	EnvFunctions = true;
	DeadCodeInjection = true;
	Memes = true;
}
