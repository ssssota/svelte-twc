import type { Plugin } from 'vite';

const packageName = 'svelte-twc';

export function sveltetwc(): Plugin {
	return {
		name: 'svelte-twc',
		enforce: 'pre',
		resolveId(id, importer, options) {
			if (id !== packageName) return;
			return this.resolve(options.ssr ? 'svelte-twc/server' : 'svelte-twc', importer, options);
		}
	};
}
