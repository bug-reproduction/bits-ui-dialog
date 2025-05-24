<script lang="ts">
	import { modal } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
</script>

<h1>Welcome to SvelteKit</h1>

<Button onclick={() => modal.open()}>Click me</Button>

<Modal openWhen={$modal.open} onCancel={() => modal.close()}>
	{#snippet title()}
		Modal
	{/snippet}
	<Button onclick={() => modal.close()}>close</Button>
	<Button onclick={() => modal.close()}>close</Button>
</Modal>
