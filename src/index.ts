//
// Types (because parcel is making me inline them)
//
interface ObfuscationSettings {
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
//
export interface ObfuscationResponse {
	/**
	 * @name success
	 * @description if the operation was successful
	 */
	success: true;
	/**
	 * @name output
	 * @description outputted string
	 */
	output: string;
	/**
	 * @name completedIn
	 * @description Time it took the server to obfuscate in milliseconds
	 */
	completedIn: number;
}

//
// Code
//
import axios from 'axios';
import { ObfuscationSettings as ObfSettings } from './ObfuscationSettings';
const endpoint = 'https://astolfobrew.nora.lgbt';

export const ObfuscationSettings = ObfSettings;

export const ObfuscateScript: (
	Key: string,
	Script: string
) => Promise<ObfuscationResponse> = async (
	Key: string,
	Script: string,
	Settings: ObfSettings = {
		EncryptStrings: true,
		EncryptImportantStrings: false,
		BytecodeCompress: true,
		ControlFlow: true,
		DeadCodeInjection: false,
		EnvFunctions: true,
		Memes: true,
		Mutate: true,
		PreserveLineInfo: false,
		SuperOperators: true,
	}
) => {
	const response = await axios({
		url: endpoint + '/api/v1/obfuscate',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({
			key: Key,
			script: Script,
			settings: Settings,
		}),
	});
	const d = response.data;
	if (!d.success)
		throw new Error(
			'Error while obfuscating:\nCode: ' + d.status + '\nMessage: ' + d.message
		);
	return d;
};
