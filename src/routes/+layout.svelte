<script>
	import Toaster from '@components/toast/toaster.svelte';
	import RouterTransition from '@components/transition/router.svelte';
	import { initThem } from '@config';
	import { initLang } from '@translations';

	import './styles.css';

	initLang();
	initThem();
</script>

<div class="app">
	<Toaster />
	<RouterTransition>
		<slot />
	</RouterTransition>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
