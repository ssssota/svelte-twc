# svelte-twc

## Overview

svelte-twc is a Svelte library that provides a way to use Tailwind CSS classes as components, inspired by [TWC](https://react-twc.vercel.app/).

## Motivation

Svelte is a great framework for building web applications, but it is difficult to use a lot of components with Tailwind CSS classes.

With svelte-twc, you can create components with Tailwind CSS classes easily.

## Installation

This library supports only Svelte v5.

```bash
npm install svelte@next # Use Svelte v5
npm install svelte-twc
```

If you are using VSCode, you can use auto-completion.
Please check [TWC](https://react-twc.vercel.app/docs/getting-started#setup-autocompletion-in-your-editor) documentation.

## Setup

Setup tailwind.css in your project yourself.

You need to add the plugin to your Vite config like this:

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltetwc } from 'svelte-twc/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), sveltetwc()]
});
```

## Usage

```svelte
<script lang="ts">
	import { twc } from 'svelte-twc';
	const Button = twc.button`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`;
</script>

<Button>Click me</Button>
```

## License

MIT
