import { sveltekit } from '@sveltejs/kit/vite';
import { sveltetwc } from 'svelte-twc/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), sveltetwc()]
});
