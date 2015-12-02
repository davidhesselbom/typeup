/// <reference path="Level" />
/// <reference path="Type" />
/// <reference path="Region" />
/// <reference path="Message" />
/// <reference path="Handler" />

module Cogneco.Error {
	export class ConsoleHandler implements Handler {
		raise(message: string | Message, level?: Level, type?: Type, region?: Region): void {
			if (!(message instanceof Error.Message))
				message = new Message(<string>message, level, type, region)
			console.log((<string>message).toString())
		}
	}
}
