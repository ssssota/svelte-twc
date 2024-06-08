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

## Usage

```svelte
<script lang="ts">
	import { twc } from 'svelte-twc';
	const Button = twc.button`bg-blue-500 text-white px-4 py-2 rounded-md`;
	const HoverableButton = twc(Button)`hover:bg-blue-600`;
</script>

<Button onclick={() => alert('hi')}>Click me</Button>
<HoverableButton>Hover me</HoverableButton>
```

## License

MIT
