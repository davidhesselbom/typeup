/// <reference path="Node" />
/// <reference path="Inline" />
/// <reference path="Source" />

module Cogneco.Writeup {
	export abstract class Block extends Node {
		constructor(region: Error.Region) {
			super(region)
		}
		private static parsers: { parse: ((source: Source) => Block), priority: number }[] = []
		static addParser(parser: (source: Source) => Block, priority = 0) {
			Block.parsers.push({ parse: parser, priority: priority})
			Block.parsers = Block.parsers.sort((left, right) => right.priority - left.priority)
		}
		static parse(source: Source): Block {
			var result: Block
			var i = 0
			do
				result = Block.parsers[i++].parse(source)
			while (!result && i < Block.parsers.length)
			return result
		}
		static parseAll(source: Source): Block[] {
			var result: Block[] = []
			var r: Block
			while ((r = Block.parse(source)))
				result.push(r)
			return result
		}
	}
}
