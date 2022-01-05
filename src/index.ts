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
/**
 * @see https://brewdocs.astolfo.gay/API/Web/Obfuscating/Response.html
 */
export interface ObfuscationResponseSuccess {
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
/**
 * @see https://brewdocs.astolfo.gay/API/Web/Obfuscating/Response.html
 */
export interface ObfuscationResponseFailure {
	/**
	 * @name success
	 * @description if the operation was successful
	 */
	success: false;
	/**
	 * @name message
	 * @description Error Message - show this to the user
	 */
	message: string;
	/**
	 * @name status
	 * @description Status code of the response
	 */
	status?: number;
}

/**
 * @see https://brewdocs.astolfo.gay/API/Web/Obfuscating/Response.html
 */
export type ObfuscationResponse =
	| ObfuscationResponseSuccess
	| ObfuscationResponseFailure;

//
// Imports
//
import axios from 'axios';
import { ObfuscationSettings as ObfSettings } from './ObfuscationSettings';
const endpoint = 'https://brew.astolfo.gay';

export const ObfuscationSettings = ObfSettings;

//
// Legacy: ObfuscateScript
// Used internally
//
const _ObfuscateScript: (
	Key: string,
	Script: string,
	Settings?: ObfSettings,
	_endpoint?: string
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
	},
	_endpoint?: string
) => {
	const response = await axios({
		url: (_endpoint || endpoint) + '/api/v1/obfuscate',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({
			key: Key,
			script: Script,
			settings: Settings,
		}),
	})
		.then(v => v)
		.catch(v => v);
	const d = response.data;
	if (!d.success)
		throw new Error(
			'Error while obfuscating:\nCode: ' + d.status + '\nMessage: ' + d.message
		);
	return d;
};

/**
 * @deprecated Use v2-based OOP API instead.
 *
 * @since 0.1.0
 */
export const ObfuscateScript = _ObfuscateScript;

//
//
//

class _Astolfo {
	key: string;

	/**
	 * @name endpoint
	 * @description The AstolfoBrew API endpoint to use. Only change this if you must.
	 * @warning This will be changed to a string[] in the near future. When it does, it will be looped over to find a non-blocked endpoint.
	 *            If you plan to use this before then, **version-pin astolfonode.**
	 * @stability 0
	 *
	 * @since 0.2.0
	 */
	endpoint: string = endpoint;

	/**
	 * @name getEndpoint
	 * @description Function used to get the best available endpoint.
	 * @stability 1
	 *
	 * @since 0.2.0
	 */
	getEndpoint() {
		return this.endpoint;
	}

	/**
	 * @name ObfuscateScript
	 * @description Obfuscates a script
	 *
	 * @param script Script to obfuscate
	 * @param options Settings to use
	 *
	 * @returns {Promise<ObfuscationResponse>} Response
	 * @stability 2
	 *
	 * @since 0.2.0
	 */
	async ObfuscateScript(
		script: string,
		options: ObfuscationSettings = new ObfuscationSettings()
	): Promise<ObfuscationResponse> {
		await this.GetAuthInformation();
		return await _ObfuscateScript(
			this.key,
			script,
			options,
			this.getEndpoint()
		);
	}

	/**
	 * @name GetAccountInformation
	 * @description returns account information json, as returned by axios.
	 * @returns {Promise<Record<string,number|boolean>>} Account Information
	 * @see https://brew.astolfo.gay/checkAuth/<key>
	 * @stability 2
	 *
	 * @since 0.2.0
	 */
	async GetAuthInformation(): Promise<Record<string, number | boolean>> {
		const auth = await axios({
			url: this.getEndpoint() + '/checkAuth/' + this.key,
		})
			.then(v => v)
			.catch(v => v)
			.then(v => v);
		if (auth.data.status !== 200)
			throw new Error(
				'Cannot get auth data! Response:\n' + JSON.stringify(auth.data, null, 2)
			);
		if (auth.data.isAuthenticated !== true)
			throw new Error('User Account is not authenticated!');
		if (auth.data.isRateLimited !== false) throw new Error('Rate Limited!');
		return auth.data;
	}

	/**
	 * @constructor
	 * @param key AstolfoBrew Key
	 * @stability 2
	 *
	 * @since 0.2.0
	 */
	constructor(key: string) {
		if (!key) throw new Error('No key specified!');
		// Set Key
		this.key = key;
		// Check if user is authenticated
		this.GetAuthInformation();
	}
}
// weird ts stuff workaround
export const Astolfo = _Astolfo;
export default Astolfo;
