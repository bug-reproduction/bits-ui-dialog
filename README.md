# Dialog onCloseAutoFocus not called when closing a modal

```sh
pnpm i
pnpm dev
```

navigate to [http://localhost:5173](http://localhost:5173) (or other port if needed)

press TAB to get the "Click me" button in focus

press ENTER to open the modal

the first Close button should be in focus

(optional : press TAB to get the second Close button in focus)

press ENTER to close the modal

EXPECTED: the "Click me" button should be in focus again, but it is not

Notice that onCloseAutoFocus is not called when closing a modal

if you add the following in [src/lib/components/Modal.svelte](./src/lib/components/Modal.svelte) it works fine

```ts
$effect(() => {
	// since onCloseAutoFocus is not called when closing via open change
	// we handle it here using tick or setTimeout
	if (!openWhen) {
		let element = focusedElementWhenOpened;
		console.log(`closed`, element);
		if (element) {
			// tick().then(() => element.focus()); // no need of tick here actually
			element.focus();
		}
	} else {
		console.log(`oepned`);
	}
});
```
