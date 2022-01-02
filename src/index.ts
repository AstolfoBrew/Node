import axios from 'axios';
const prefix = 'https://astolfobrew.nora.lgbt';

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

export const ObfuscateScript: (
	Key: string,
	Script: string
) => Promise<ObfuscationResponse> = async (Key: string, Script: string) => {
	const response = await axios({
		url: prefix + '/api/v1/obfuscate',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({
			key: Key,
			script: Script,
		}),
	});
	const d = response.data;
	if (!d.success)
		throw new Error(
			'Error while obfuscating:\nCode: ' + d.status + '\nMessage: ' + d.message
		);
	return d;
};
