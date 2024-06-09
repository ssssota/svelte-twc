<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className,
		children,
		...props
	}: Omit<HTMLAttributes<HTMLDivElement>, `on:${string}` | 'contenteditable'> = $props();
</script>

<div class="p-4 {className}" {...props}>{@render children?.()}</div>
