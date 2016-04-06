import * as Error from "../../U10sil/Error/Region"
import { Source } from "../Source"
import { Renderer } from "../Renderer"
import { ContentInline } from "./ContentInline"
import { Inline } from "./Inline"
import { Text } from "./Text"

module Cogneco.Typeup {
	export class Link extends ContentInline {
		constructor(private target: string, content: Inline[], region: Error.Region) {
			super(content, region)
		}
		render(renderer: Renderer): string {
			return renderer.render("link", { "target": this.target, "content": super.render(renderer) })
		}
		toObject(): any {
			var result = super.toObject()
			result["type"] = "Link"
			return result
		}
		toString(): string {
			return "[" + this.target + " " + super.toString() + "]"
		}
		static parse(source: Source): Inline[] {
			var result: Inline[]
			if (source.readIf("[")) {
				var target = ""
				while (!source.isEmpty() && !source.peekIs([" ", "]"]))
					target += source.read()
				result = [new Link(target, source.readIf(" ") ? Inline.parse(source.till("]")) : [<Inline>new Text(target, source.mark())], source.mark())]
				if (!source.readIf("]"))
					source.raise("Expected \"]\" as end of link.")
			}
			return result
		}
	}
	Inline.addParser(Link.parse)
}