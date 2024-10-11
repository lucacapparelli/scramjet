import { config, decodeUrl } from "../../shared";
import { ScramjetClient } from "../client";

export const enabled = () => self.$scramjet.config.flags.cleanerrors;
export default function (client: ScramjetClient, _self: Self) {
	// v8 only. all we need to do is clean the scramjet urls from stack traces
	const closure = (error, stack) => {
		let newstack = error.stack;

		for (let i = 0; i < stack.length; i++) {
			const url = stack[i].getFileName();

			if (url.endsWith(config.client)) {
				// strip stack frames including scramjet handlers from the trace
				const lines = newstack.split("\n");
				const line = lines.find((l) => l.includes(url));
				lines.splice(line, 1);
				newstack = lines.join("\n");
				continue;
			}

			try {
				newstack = newstack.replaceAll(url, decodeUrl(url));
			} catch {}
		}

		return newstack;
	};
	client.Trap("Error.prepareStackTrace", {
		get(_ctx) {
			// this is a funny js quirk. the getter is ran every time you type something in console
			return closure;
		},
		set(_value) {
			// just ignore it if a site tries setting their own. not much we can really do
		},
	});
}
