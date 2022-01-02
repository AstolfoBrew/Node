import axios from 'axios';
import { ObfuscationResponse } from './ObfuscationResponse';
import { ObfuscationSettings } from './ObfuscationSettings';
const prefix = 'https://astolfobrew.nora.lgbt';

export const ObfuscateScript: (
	Key: string,
	Script: string
) => Promise<ObfuscationResponse> = async (
	Key: string,
	Script: string,
	Settings: ObfuscationSettings = {
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
		url: prefix + '/api/v1/obfuscate',
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
