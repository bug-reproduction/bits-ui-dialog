<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface Props extends HTMLButtonAttributes {}

	let { children, ...restProps }: Props = $props();
</script>

<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" {...restProps}>
	{@render children?.()}
</button>
