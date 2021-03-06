import { Error } from "@cogneco/mend"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { Block } from "./Block"

export class EmptyLine extends Block {
	constructor(region: Error.Region) {
		super(region)
	}
	async render(render: Renderer): Promise<string> {
		return ""
	}
	toObject(): any {
		return { type: "EmptyLine" }
	}
	toString(): string {
		return "\n"
	}
	static parse(source: Source): Block[] | undefined {
		let result: Block[] | undefined
		if (source.peek() == "\n") {
			source.read()
			result = [new EmptyLine(source.mark())]
			const next = Block.parse(source)
			if (next && next.length > 0)
				result = result.concat(next)
		}
		return result
	}
}
Block.addParser(EmptyLine.parse)
Block.addFilter(block => block && !(block instanceof EmptyLine))
