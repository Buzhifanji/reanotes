<script>
	import Toaster from '@components/toast/toaster.svelte';
	import { initThem } from '@config';
	import { initLang } from '@translations';
	import './styles.css';

	initLang();
	initThem();
</script>

<div class="app">
	<Toaster />

	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
