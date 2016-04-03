import * as Error from "../U10sil/Error/Region"
import { Node } from "./Node"
import { Block } from "./Block"
import { Inline } from "./Inline"
import { Renderer } from "./Renderer"

export abstract class ContentBlock<T extends Node> extends Block {
	constructor(private content: T[], region: Error.Region) {
		super(region)
	}
	getContent(): T[] { return this.content }
	render(renderer: Renderer): string {
		return this.content.map(c => c.render(renderer)).join("")
	}
	toString(): string {
		return this.content.map(c => c.toString()).join("")
	}
	toObject(): any {
		return { "content": this.content.map(c => c.toObject()) }
	}
}
