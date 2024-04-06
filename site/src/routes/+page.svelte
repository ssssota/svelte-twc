<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import { twc } from 'svelte-twc';
	import { highlightPlugin } from '../lib/highlight';
	const Header = twc.header`p-4 bg-gray-200 text-gray-800`;
	const HeaderContainer = twc.div`max-w-4xl mx-auto flex items-center justify-between`;
	const H1 = twc.h1`text-2xl font-bold`;
	const Nav = twc.nav`flex items-center gap-4`;
	const NavLink = twc.a`hover:underline`;
	const Container = twc.main`max-w-4xl mx-auto py-4`;

	const plugins: Plugin[] = [
		highlightPlugin,
		{
			renderer: {
				a: twc.a`text-blue-500 hover:underline`,
				h2: twc.h2`text-xl font-bold mt-4 mb-2`,
				p: twc.p`my-2`,
				pre: twc.pre`rounded-md overflow-x-auto border bg-gray-100`,
				// HACK: use blockquote as a button
				blockquote: twc.button`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 [&>p]:my-0`
			}
		}
	];
	const md = `
## Overview

svelte-twc is a Svelte library that provides a way to use Tailwind CSS classes as components, inspired by [TWC](https://react-twc.vercel.app/).

## Motivation

Svelte is a great framework for building web applications, but it is difficult to use a lot of components with Tailwind CSS classes.

With svelte-twc, you can create components with Tailwind CSS classes easily.

## Installation

This library supports only Svelte v5.

\`\`\`bash
npm install svelte@next # Use Svelte v5
npm install svelte-twc
\`\`\`

If you are using VSCode, you can use auto-completion.
Please check [TWC](https://react-twc.vercel.app/docs/getting-started#setup-autocompletion-in-your-editor) documentation.

## Setup

Setup tailwind.css in your project yourself.

You need to add the plugin to your Vite config like this:

\`\`\`js
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltetwc } from 'svelte-twc/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), sveltetwc()]
});
\`\`\`

## Usage

\`\`\`svelte
<script lang="ts">
	import { twc } from 'svelte-twc';
	const Button = twc.button\`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600\`;
<\x2fscript>

<Button>Click me</Button>
\`\`\`

Result:

> Click me
`;
</script>

<Header>
	<HeaderContainer>
		<H1>svelte-twc</H1>
		<Nav>
			<NavLink target="_blank" href="https://github.com/ssssota/svelte-twc">GitHub</NavLink>
			<NavLink target="_blank" href="https://www.npmjs.com/package/svelte-twc">npm</NavLink>
		</Nav>
	</HeaderContainer>
</Header>

<Container>
	<Markdown {md} {plugins} />
</Container>
