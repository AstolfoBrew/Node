export default interface ObfuscationResponse {
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
