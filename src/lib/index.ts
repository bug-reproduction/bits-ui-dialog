import { writable } from 'svelte/store';

export function createModal() {
	const $state = {
		open: false
	};
	const store = writable($state);

	function open() {
		$state.open = true;
		store.set($state);
	}
	function close() {
		$state.open = false;
		store.set($state);
	}
	return {
		subscribe: store.subscribe,
		close,
		open
	};
}

export const modal = createModal();
