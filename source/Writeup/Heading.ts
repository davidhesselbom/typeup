/// <reference path="ContentBlock" />
/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export class Heading extends ContentBlock {
		constructor(private level: number, content: Inline[], region: Error.Region) {
			super(content, region)
		}
		static parse(source: Source): Block {
			var level = 0
			while (source.peek() == "#") {
				level++
				source.read()
			}
			return level > 0 ? new Heading(level, Inline.parseAll(source), source.mark()) : undefined
		}
	}
	Block.addParser(Heading.parse)
}