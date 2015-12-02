/// <reference path="Block" />

module Cogneco.Writeup {
	export class EmptyLine extends Block {
		constructor(region: Error.Region) {
			super(region)
		}
		toHtml(variables: { [name: string] : string }): string {
			return ""
		}
		toString(): string {
			return "\n"
		}
		static parse(source: Source): Block {
			var result: Block
			if (source.peek() == "\n") {
				source.read()
				result = new EmptyLine(source.mark())
			}
			return result
		}
	}
	Block.addParser(EmptyLine.parse)
}