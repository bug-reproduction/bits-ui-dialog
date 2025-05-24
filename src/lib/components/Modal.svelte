<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import { Dialog, Separator, type WithoutChild } from 'bits-ui';
	import { fade, fly, scale, slide } from 'svelte/transition';

	interface Props {
		openOn: boolean;
		onCancel?: () => void;
		children?: Snippet;
		title?: Snippet;
	}

	let { openOn = false, onCancel, children, title, ...restProps }: Props = $props();

	const overlayCoreClass = `z-[999] fixed inset-0`;
	const contentCoreClass =
		'z-[999] fixed top-[50%] left-[50%] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] p-5 sm:max-w-[490px]';

	let focusedElementWhenOpened: HTMLElement | null = null;
	function onOpenAutoFocus(e: Event) {
		console.log(`onOpenAutoFocus`, e);
		focusedElementWhenOpened = document.querySelector(':focus-visible');
		console.log('focusedElementWhenOpened', focusedElementWhenOpened);

		// TODO assign focus to speicified element (id ? name ? selector ? reference ?)
		// // e.preventDefault();
	}
	function onCloseAutoFocus(e: Event) {
		// ERROR ? not called when closing via open change
		console.log('onCloseAutoFocus', e);
		console.log('focusedElementWhenOpened', focusedElementWhenOpened);
		console.log(
			`document.querySelector(':focus-visible')`,
			document.querySelector(':focus-visible')
		);
		e.preventDefault();

		focusedElementWhenOpened?.focus();
	}

	function onInteractOutside(e: Event) {
		console.log(`interact outside`);
		e.preventDefault();
		onCancel?.();
	}

	// UNCOMMENT THE FOLLOWING TO MAKE IT WORK:
	// $effect(() => {
	// 	// since onCloseAutoFocus is not called when closing via open change
	// 	// we handle it here using tick or setTimeout
	// 	if (!openOn) {
	// 		let element = focusedElementWhenOpened;
	// 		console.log(`closed`, element);
	// 		if (element) {
	// 			// tick().then(() => element.focus()); // no need of tick here actually
	// 			element.focus();
	// 		}
	// 	} else {
	// 		console.log(`oepned`);
	// 	}
	// });
</script>

<Dialog.Root
	open={openOn}
	onOpenChange={(open) => {
		console.log('onOpenChange', open);
		if (!open) {
			onCancel?.();
		}
	}}
	{...restProps}
>
	<Dialog.Portal>
		<Dialog.Overlay class={`${overlayCoreClass} bg-black/80`} />
		<Dialog.Content
			forceMount
			class={`${contentCoreClass} border bg-white `}
			interactOutsideBehavior={onCancel ? 'close' : 'ignore'}
			escapeKeydownBehavior={onCancel ? 'close' : 'ignore'}
			{onInteractOutside}
			{onOpenAutoFocus}
			{onCloseAutoFocus}
		>
			{#snippet child({ props, open })}
				{#if open}
					<div {...props} transition:fly={{ duration: 300, y: '100%' }}>
						{#if title}
							<Dialog.Title
								class="| flex w-full items-center justify-center text-lg font-semibold tracking-tight"
							>
								{@render title()}
							</Dialog.Title>
							<Separator.Root class="| -mx-5 mt-5 mb-6 block h-px bg-gray-200" />
						{/if}

						{@render children?.()}
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
